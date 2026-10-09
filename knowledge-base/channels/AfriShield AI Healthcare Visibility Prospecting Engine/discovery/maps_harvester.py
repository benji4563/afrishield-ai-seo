# discovery/maps_harvester.py
"""
Verified Lead Harvester — Google Maps via Google Places API, Apify or DataForSEO.

Replaces generate_200_cameroon_leads.py and
MetaAdDiscoveryEngine._generate_verified_catalog_prospects(), both of which
FABRICATED leads (random.randint phone numbers, random lead scores, hardcoded
name templates). Every field this module writes comes from a live Google Maps
result and is traceable to a place_id.

Two operating modes:

  1. DIRECT   — queries the source itself (--harvest or --query, with --source).
                google      Google Places API (New) Text Search; needs
                            GOOGLE_PLACES_API_KEY. One request per page of 20.
                apify       Apify Google Maps scraper; needs APIFY_TOKEN. Bills
                            $0.004 per place on the free plan.
                dataforseo  needs DATAFORSEO_LOGIN / DATAFORSEO_PASSWORD.
  2. INGEST   — accepts results captured elsewhere and writes them to the DB:
                DataForSEO `items` JSON (e.g. from the MCP connection) or a
                saved Apify dataset (a JSON list of places).

Nothing here invents a value. If Google Maps does not report a field, it is
stored as NULL and downstream messaging must not claim anything about it.
"""

import json
import os
import re
import sqlite3
import unicodedata
from datetime import datetime, UTC
from pathlib import Path
from typing import Any, Dict, Iterable, List, Optional, Tuple

BASE_DIR = Path(__file__).resolve().parent.parent
DB_PATH = BASE_DIR / "healthcare_prospecting.db"

PROVENANCE = "DATAFORSEO_GOOGLE_MAPS"
PROVENANCE_APIFY = "APIFY_GOOGLE_MAPS"
PROVENANCE_GOOGLE = "GOOGLE_PLACES_API"

GOOGLE_PLACES_URL = "https://places.googleapis.com/v1/places:searchText"
# Exactly these fields: adding any other can move the request to a dearer billing tier.
GOOGLE_FIELD_MASK = ("places.id,places.displayName,places.formattedAddress,places.websiteUri,"
                     "places.nationalPhoneNumber,places.rating,places.userRatingCount,"
                     "places.primaryType,places.types,nextPageToken")
GOOGLE_PAGE_SIZE = 20
GOOGLE_MAX_PAGES = 3             # Text Search returns at most 60 results per query
GOOGLE_FREE_REQUESTS_PER_MONTH = 1000
google_requests_made = 0         # Places API calls in this run
GOOGLE_OPTICAL_TYPES = {"health", "store"}
GOOGLE_NOT_OPTICAL_TYPES = {"pharmacy", "drugstore", "medical_supply_store", "supermarket",
                            "grocery_store", "cosmetics_store", "beauty_salon", "veterinary_care"}

APIFY_ACTOR = "compass/crawler-google-places"
APIFY_COST_PER_PLACE_USD = 0.004
APIFY_MIN_RUN_CAP_USD = 0.50     # Apify rejects a per-run spend cap below this

# ---------------------------------------------------------------------------
# Search plan — health niche first, per Ben's sequencing.
# Real-estate / restaurants / spas / professional services follow.
# ---------------------------------------------------------------------------

SEARCH_PLAN: Dict[str, Dict[str, Any]] = {
    "dental": {
        "campaign_id": "camp_dental_01",
        "keywords_fr": ["clinique dentaire", "cabinet dentaire", "dentiste"],
        "keywords_en": ["dental clinic", "dentist"],
        "accept_category_ids": {"dental_clinic", "dentist", "orthodontist",
                                "dental_implants_periodontist", "cosmetic_dentist"},
    },
    "optical": {
        "campaign_id": "camp_optical_02",
        "keywords_fr": ["optique", "opticien", "ophtalmologue", "centre optique"],
        "keywords_en": ["optician", "optical shop", "eye clinic", "ophthalmologist"],
        "accept_category_ids": {"optician", "optometrist", "eye_care_center",
                                "ophthalmologist", "sunglasses_store", "contact_lenses_supplier"},
    },
    "healthcare_clinic": {
        "campaign_id": "camp_health_03",
        "keywords_fr": ["clinique", "centre medical", "polyclinique", "cabinet medical"],
        "keywords_en": ["medical clinic", "private clinic", "medical center"],
        "accept_category_ids": {"medical_clinic", "medical_center", "general_practitioner",
                                "private_hospital", "hospital", "walk_in_clinic",
                                "pediatrician", "gynecologist", "dermatologist"},
    },
}

MARKETS: Dict[str, Dict[str, Any]] = {
    "Cameroon": {"cities": ["Douala", "Yaounde"], "lang": "fr", "dial": "+237", "code": "CM"},
    "Kenya":    {"cities": ["Nairobi", "Mombasa"], "lang": "en", "dial": "+254", "code": "KE"},
    "Tanzania": {"cities": ["Dar es Salaam", "Arusha"], "lang": "en", "dial": "+255", "code": "TZ"},
}


# ---------------------------------------------------------------------------
# Normalisation & validation
# ---------------------------------------------------------------------------

def normalize_name(name: str) -> str:
    s = unicodedata.normalize("NFKD", name or "")
    s = "".join(ch for ch in s if not unicodedata.combining(ch)).lower()
    s = re.sub(r"[^a-z0-9 ]", " ", s)
    for noise in ("cabinet", "clinique", "clinic", "centre", "center", "dr", "docteur",
                  "sarl", "sa", "ltd", "limited", "the"):
        s = re.sub(rf"\b{noise}\b", " ", s)
    return re.sub(r"\s+", " ", s).strip()


PLACEHOLDER_TAILS = re.compile(
    r"(\d)\1{5}$"                      # 111111
    r"|(00|11|22|33|44|55|66|77|88|99){3}$"   # 11 22 33 / 55 66 77
)


def is_real_phone(phone: Optional[str], expected_dial: Optional[str] = None) -> Tuple[bool, str]:
    """
    Rejects the placeholder patterns that contaminated the previous dataset
    (+237 675 11 22 33, +254 722 887 766, ...).
    """
    if not phone:
        return False, "missing"
    d = re.sub(r"[^0-9]", "", phone)
    if len(d) < 9:
        return False, f"too short ({len(d)} digits)"
    if expected_dial and not d.startswith(expected_dial.lstrip("+")):
        return False, f"wrong country code for market (got {d[:3]})"
    tail = d[-6:]
    if PLACEHOLDER_TAILS.search(tail):
        return False, "placeholder pattern"
    if len(set(d[-7:])) <= 2:
        return False, "low-entropy tail"
    a, b, c = int(tail[0:2]), int(tail[2:4]), int(tail[4:6])
    if b - a == 11 and c - b == 11:
        return False, "sequential placeholder"
    return True, "ok"


# ---------------------------------------------------------------------------
# Parsing a DataForSEO maps_search item -> our business record
# ---------------------------------------------------------------------------

def classify_niche(item: Dict[str, Any]) -> Optional[str]:
    """
    Assigns a niche from Google's own category_ids rather than from the search
    keyword. A keyword search for "clinique" also returns opticians and
    hospitals; classifying on the category is what keeps a coworking space from
    being addressed as a clinic with "patients" (which happened in the
    pre-purge dataset).
    """
    cats = set(item.get("category_ids") or [])
    if not cats:
        return None
    for niche, plan in SEARCH_PLAN.items():
        if cats & plan["accept_category_ids"]:
            return niche
    # Google Places has no optician type: an optical shop is typed health + store.
    # Pharmacies carry the same pair, so they are excluded by their own types.
    if (item.get("_provenance") == PROVENANCE_GOOGLE and GOOGLE_OPTICAL_TYPES <= cats
            and not cats & GOOGLE_NOT_OPTICAL_TYPES):
        return "optical"
    return None


def parse_item(item: Dict[str, Any], niche: str, country: str, city: str,
               campaign_id: str) -> Optional[Dict[str, Any]]:
    if item.get("type") != "maps_search":
        return None

    title = (item.get("title") or "").strip()
    if not title:
        return None

    market = MARKETS.get(country, {})
    phone = item.get("phone")
    ok, why = is_real_phone(phone, market.get("dial"))

    rating_obj = item.get("rating") or {}
    addr_info = item.get("address_info") or {}
    website = item.get("url")
    domain = item.get("domain")

    place_id = item.get("place_id")
    cid = item.get("cid")
    maps_url = f"https://www.google.com/maps/place/?q=place_id:{place_id}" if place_id else None

    return {
        "business_name": title,
        "normalized_name": normalize_name(title),
        "niche": niche,
        "sub_niche": item.get("category"),
        "campaign_id": campaign_id,
        "country": country,
        "city": addr_info.get("city") or city,
        "region": item.get("address"),
        "website": website,
        "domain": domain,
        "google_maps_url": maps_url,
        "google_business_profile_status": "present",
        "public_phone": phone if ok else None,
        "public_whatsapp": phone if ok else None,
        "reviews_count": rating_obj.get("votes_count") or 0,
        "google_rating": rating_obj.get("value"),
        # Real, observed signals only:
        "website_status": "present" if website else "absent",
        "ad_status": None,          # no ad observed — Meta Ad Library not wired
        "local_seo_status": None,   # not yet measured
        "geo_status": None,
        "ai_visibility_status": None,
        "lead_score": None,         # computed later from real signals, never random
        "lead_score_confidence": None,
        "pipeline_stage": "DISCOVERED",
        "outreach_status": "pending",
        "is_suppressed": 0,
        "opt_out": 0,
        "uncertain_duplicate": 0,
        "data_provenance": item.get("_provenance") or PROVENANCE,
        "quarantined": 0,
        "quarantine_reason": None,
        # provenance detail
        "_place_id": place_id,
        "_cid": cid,
        "_phone_rejected_reason": None if ok else why,
        "_category_ids": item.get("category_ids") or [],
        "_rank": item.get("rank_absolute"),
    }


def score_lead(rec: Dict[str, Any]) -> Tuple[int, float]:
    """
    Lead score from OBSERVED signals only. Higher = bigger visibility gap
    = better fit for AfriShield. Confidence reflects how much we actually know.
    """
    score, known = 0, 0

    # No website is the strongest, most verifiable gap.
    if rec["website_status"] == "absent":
        score += 40
    else:
        score += 8
    known += 1

    reviews = rec.get("reviews_count") or 0
    if reviews == 0:      score += 25
    elif reviews < 10:    score += 20
    elif reviews < 30:    score += 13
    elif reviews < 80:    score += 7
    else:                 score += 2
    known += 1

    rating = rec.get("google_rating")
    if rating is not None:
        if rating < 4.0:   score += 15
        elif rating < 4.5: score += 9
        else:              score += 4
        known += 1

    # Reachability is required to act on the lead at all.
    if rec.get("public_phone"):
        score += 20
        known += 1

    confidence = round(known / 4.0, 2)
    return min(score, 100), confidence


# ---------------------------------------------------------------------------
# Persistence
# ---------------------------------------------------------------------------

def _connect() -> sqlite3.Connection:
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def ensure_columns(conn: sqlite3.Connection) -> None:
    cols = {r[1] for r in conn.execute("PRAGMA table_info(businesses)")}
    for col, typ in [("data_provenance", "TEXT"), ("quarantined", "INTEGER DEFAULT 0"),
                     ("quarantine_reason", "TEXT"), ("place_id", "TEXT"), ("cid", "TEXT"),
                     ("source_rank", "INTEGER"), ("harvested_at", "TIMESTAMP")]:
        if col not in cols:
            conn.execute(f"ALTER TABLE businesses ADD COLUMN {col} {typ}")
    conn.execute("CREATE UNIQUE INDEX IF NOT EXISTS idx_biz_place_id "
                 "ON businesses(place_id) WHERE place_id IS NOT NULL")


def upsert_leads(records: Iterable[Dict[str, Any]], max_new: Optional[int] = None) -> Dict[str, int]:
    conn = _connect()
    ensure_columns(conn)
    stats = {"inserted": 0, "dup_place_id": 0, "dup_phone": 0, "no_phone": 0, "suppressed": 0}
    now = datetime.now(UTC).isoformat()

    seen_place = {r["place_id"] for r in
                  conn.execute("select place_id from businesses where place_id is not null")}
    seen_phone = {re.sub(r"[^0-9]", "", r["public_phone"]) for r in
                  conn.execute("select public_phone from businesses where public_phone is not null")}
    suppressed = {re.sub(r"[^0-9]", "", r["identifier_value"]) for r in
                  conn.execute("select identifier_value from suppression_list")}

    for rec in records:
        if max_new is not None and stats["inserted"] >= max_new:
            break
        pid = rec.pop("_place_id", None)
        cid = rec.pop("_cid", None)
        rank = rec.pop("_rank", None)
        rec.pop("_category_ids", None)
        phone_reject = rec.pop("_phone_rejected_reason", None)

        if pid and pid in seen_place:
            stats["dup_place_id"] += 1
            continue

        if not rec["public_phone"]:
            stats["no_phone"] += 1
            # Still store it: website-less clinics with no listed phone are
            # reachable later via their Maps profile. Just not outreach-ready.
        else:
            pdigits = re.sub(r"[^0-9]", "", rec["public_phone"])
            if pdigits in seen_phone:
                stats["dup_phone"] += 1
                continue
            if pdigits in suppressed:
                stats["suppressed"] += 1
                continue
            seen_phone.add(pdigits)

        score, conf = score_lead(rec)
        rec["lead_score"], rec["lead_score_confidence"] = score, conf

        biz_id = f"biz_{(pid or rec['normalized_name'])[:24].replace(' ', '_')}"
        biz_id = re.sub(r"[^A-Za-z0-9_]", "", biz_id)[:40]

        cols = ["business_id"] + list(rec.keys()) + ["place_id", "cid", "source_rank",
                                                     "harvested_at", "created_at", "updated_at"]
        vals = [biz_id] + list(rec.values()) + [pid, cid, rank, now, now, now]
        placeholders = ",".join("?" * len(cols))
        try:
            conn.execute(f"INSERT INTO businesses ({','.join(cols)}) VALUES ({placeholders})", vals)
            if pid:
                seen_place.add(pid)
            stats["inserted"] += 1
        except sqlite3.IntegrityError:
            stats["dup_place_id"] += 1

    conn.execute("INSERT INTO system_logs (timestamp, action, result) VALUES (?,?,?)",
                 (now, "verified_harvest", json.dumps(stats)))
    conn.commit()
    conn.close()
    return stats


# ---------------------------------------------------------------------------
# Mode 1: DIRECT (needs DATAFORSEO_LOGIN / DATAFORSEO_PASSWORD)
# ---------------------------------------------------------------------------

def has_direct_credentials() -> bool:
    return bool(os.getenv("DATAFORSEO_LOGIN") and os.getenv("DATAFORSEO_PASSWORD"))


def fetch_direct(keyword: str, country: str, lang: str, depth: int = 20) -> List[Dict[str, Any]]:
    import base64
    import requests
    auth = base64.b64encode(
        f"{os.environ['DATAFORSEO_LOGIN']}:{os.environ['DATAFORSEO_PASSWORD']}".encode()
    ).decode()
    resp = requests.post(
        "https://api.dataforseo.com/v3/serp/google/maps/live/advanced",
        headers={"Authorization": f"Basic {auth}", "Content-Type": "application/json"},
        json=[{"keyword": keyword, "location_name": country, "language_code": lang,
               "device": "desktop", "os": "windows", "depth": depth}],
        timeout=120,
    )
    resp.raise_for_status()
    return extract_items(resp.json())


# ---------------------------------------------------------------------------
# Mode 1: DIRECT via Apify (needs APIFY_TOKEN)
# ---------------------------------------------------------------------------

def env_value(name: str) -> Optional[str]:
    """
    A credential from the environment, else from this engine's git-ignored
    .env, else from AfriShield's shared keyword tooling .env
    (`00 Knowledge/Keyword Finder/.env`) found by walking up from this file.
    """
    if os.getenv(name):
        return os.getenv(name)
    here = Path(__file__).resolve()
    candidates = [BASE_DIR / ".env"] + [parent / "00 Knowledge" / "Keyword Finder" / ".env"
                                        for parent in here.parents]
    for env in candidates:
        if env.is_file():
            for line in env.read_text(encoding="utf-8").splitlines():
                key, sep, value = line.strip().partition("=")
                value = value.strip().strip("\"'")
                if sep and key.strip() == name and value:
                    return value
    return None


def apify_token() -> Optional[str]:
    return env_value("APIFY_TOKEN")


def website_host(website: Optional[str]) -> Optional[str]:
    return re.sub(r"^www\.", "", website.split("//")[-1].split("/")[0].lower()) if website else None


def category_id(name: str) -> str:
    """'Walk-in clinic' -> 'walk_in_clinic', the form Google's category ids take."""
    return re.sub(r"[^a-z0-9]+", "_", (name or "").lower()).strip("_")


def apify_to_item(place: Dict[str, Any]) -> Dict[str, Any]:
    """
    Reshapes one Apify Google Maps place into the maps_search item parse_item()
    reads, so both providers share one parsing and validation path. Fields
    Google Maps did not report stay None.
    """
    website = place.get("website") or None
    categories = place.get("categories") or ([place["categoryName"]] if place.get("categoryName") else [])
    return {
        "type": "maps_search",
        "title": place.get("title"),
        "phone": place.get("phoneUnformatted") or place.get("phone") or None,
        "rating": {"value": place.get("totalScore"), "votes_count": place.get("reviewsCount")},
        "address_info": {"city": place.get("city")},
        "address": place.get("address"),
        "url": website,
        "domain": website_host(website),
        "place_id": place.get("placeId"),
        "cid": place.get("cid"),
        "category": place.get("categoryName"),
        "category_ids": [category_id(c) for c in categories],
        "rank_absolute": place.get("rank"),
        "_provenance": PROVENANCE_APIFY,
    }


def fetch_apify(keywords: List[str], city: str, country: str, depth: int = 20,
                max_cost: float = 1.00) -> List[Dict[str, Any]]:
    """
    One actor run per city covering every keyword. Results are requested in
    English so category names match Google's category ids whatever language
    the keywords are in.
    """
    from datetime import timedelta
    from decimal import Decimal
    from apify_client import ApifyClient

    token = apify_token()
    if not token:
        raise SystemExit("APIFY_TOKEN not set (environment or 00 Knowledge/Keyword Finder/.env).")
    client = ApifyClient(token)
    run = client.actor(APIFY_ACTOR).call(
        run_input={"searchStringsArray": keywords, "locationQuery": f"{city}, {country}",
                   "maxCrawledPlacesPerSearch": depth, "language": "en", "skipClosedPlaces": True},
        max_total_charge_usd=Decimal(str(max(max_cost, APIFY_MIN_RUN_CAP_USD))),
        run_timeout=timedelta(seconds=900),
        logger=None,
    )
    status = getattr(run, "status", None)
    status = getattr(status, "value", status)
    if status != "SUCCEEDED":
        raise RuntimeError(f"Apify run ended with status {status}")
    places = client.dataset(run.default_dataset_id).list_items(clean=True).items
    return [apify_to_item(p) for p in places]


# ---------------------------------------------------------------------------
# Mode 1: DIRECT via Google Places API (New) (needs GOOGLE_PLACES_API_KEY)
# ---------------------------------------------------------------------------

def international_phone(national: Optional[str], dial: Optional[str]) -> Optional[str]:
    """
    Places returns the number in national format ('6 93 92 77 66'). The rest of
    the engine validates and dedupes on the international form, so the market's
    dial code is prefixed when the number does not already carry it.
    """
    digits = re.sub(r"[^0-9]", "", national or "")
    if not digits:
        return None
    if not dial or (national or "").strip().startswith("+"):
        return f"+{digits}"
    code = dial.lstrip("+")
    return f"+{digits}" if digits.startswith(code) else f"+{code}{digits.lstrip('0')}"


def google_to_item(place: Dict[str, Any], rank: int, dial: Optional[str]) -> Dict[str, Any]:
    """Reshapes one Places API (New) place into the maps_search item parse_item() reads."""
    website = place.get("websiteUri") or None
    primary = place.get("primaryType")
    return {
        "type": "maps_search",
        "title": (place.get("displayName") or {}).get("text"),
        "phone": international_phone(place.get("nationalPhoneNumber"), dial),
        "rating": {"value": place.get("rating"), "votes_count": place.get("userRatingCount")},
        "address_info": {},
        "address": place.get("formattedAddress"),
        "url": website,
        "domain": website_host(website),
        "place_id": place.get("id"),
        "cid": None,
        "category": primary,
        # primaryType is broad (an optician is a 'store'); types carries the specific ones.
        "category_ids": list(dict.fromkeys(([primary] if primary else []) + (place.get("types") or []))),
        "rank_absolute": rank,
        "_provenance": PROVENANCE_GOOGLE,
    }


def fetch_google(keyword: str, city: str, limit: int = 20,
                 dial: Optional[str] = None) -> List[Dict[str, Any]]:
    """Text Search for '<keyword> in <city>', following nextPageToken for up to 3 pages."""
    global google_requests_made
    import requests

    key = env_value("GOOGLE_PLACES_API_KEY")
    if not key:
        raise SystemExit("GOOGLE_PLACES_API_KEY not set (environment or this engine's .env).")
    headers = {"Content-Type": "application/json", "X-Goog-Api-Key": key,
               "X-Goog-FieldMask": GOOGLE_FIELD_MASK}
    body: Dict[str, Any] = {"textQuery": f"{keyword} in {city}", "pageSize": GOOGLE_PAGE_SIZE}

    places: List[Dict[str, Any]] = []
    for _ in range(GOOGLE_MAX_PAGES):
        resp = requests.post(GOOGLE_PLACES_URL, headers=headers, json=body, timeout=60)
        google_requests_made += 1
        if not resp.ok:
            try:
                message = (resp.json().get("error") or {}).get("message")
            except ValueError:
                message = resp.reason
            raise RuntimeError(f"Places API {resp.status_code}: {message}")
        payload = resp.json()
        places += payload.get("places") or []
        token = payload.get("nextPageToken")
        if not token or len(places) >= limit:
            break
        body["pageToken"] = token
    return [google_to_item(p, rank, dial) for rank, p in enumerate(places[:limit], 1)]


def log_google_requests() -> None:
    """Records this run's Places API calls and prints the month-to-date total."""
    if not google_requests_made:
        return
    now = datetime.now(UTC)
    conn = _connect()
    conn.execute("INSERT INTO system_logs (timestamp, action, result) VALUES (?,?,?)",
                 (now.isoformat(), "google_places_requests",
                  json.dumps({"requests": google_requests_made})))
    conn.commit()
    month = sum(json.loads(r["result"])["requests"] for r in conn.execute(
        "select result from system_logs where action = 'google_places_requests' "
        "and timestamp >= ?", (now.strftime("%Y-%m-01"),)))
    conn.close()
    print(f"Google Places API requests: {google_requests_made} this run, {month} this month "
          f"logged in this database (free tier: {GOOGLE_FREE_REQUESTS_PER_MONTH}/month).")


# ---------------------------------------------------------------------------
# Mode 2: INGEST (items JSON supplied by an authenticated caller / MCP)
# ---------------------------------------------------------------------------

def extract_items(payload: Any) -> List[Dict[str, Any]]:
    """
    Pulls maps_search items out of a saved payload, accepting:

      * DataForSEO AI-optimized subset -> {"items": [...]}
      * DataForSEO full response schema -> {"tasks": [{"result": [{"items": [...]}]}]}
      * a saved Apify dataset -> [{"placeId": ..., "title": ...}, ...]

    The full schema arrives whenever the caller disables the AI-optimized subset
    (noAiMode), so both must ingest identically. Returning [] here is what makes
    a payload "empty"; callers are expected to say so rather than skip quietly.
    """
    if isinstance(payload, list):
        return [apify_to_item(p) for p in payload if isinstance(p, dict) and p.get("placeId")]
    if not isinstance(payload, dict):
        return []
    items = payload.get("items")
    if items:
        return items
    collected: List[Dict[str, Any]] = []
    for task in (payload.get("tasks") or []):
        if not isinstance(task, dict):
            continue
        for result in (task.get("result") or []):
            if isinstance(result, dict):
                collected.extend(result.get("items") or [])
    return collected


def ingest_items(items: List[Dict[str, Any]], niche: Optional[str], country: str,
                 city: str, max_new: Optional[int] = None,
                 only_niche: Optional[str] = None) -> Dict[str, int]:
    """
    `niche` may be None, in which case each item is classified from its own
    Google category_ids. Items that match no target niche are skipped.
    `only_niche` keeps just the items whose own category places them in that
    niche, with no fallback to the searched niche.
    """
    recs, skipped = [], 0
    for it in items:
        resolved = classify_niche(it) if only_niche else classify_niche(it) or niche
        if resolved not in SEARCH_PLAN or (only_niche and resolved != only_niche):
            skipped += 1
            continue
        plan = SEARCH_PLAN[resolved]
        rec = parse_item(it, resolved, country,
                         (it.get("address_info") or {}).get("city") or city,
                         plan["campaign_id"])
        if rec:
            recs.append(rec)
    stats = upsert_leads(recs, max_new)
    stats["off_niche_skipped"] = skipped
    return stats


def ingest_dir(directory: str, country: str = "Cameroon") -> Dict[str, int]:
    """
    Ingests every DataForSEO maps payload in a directory, self-classifying each
    result. Used when the harvest was driven through the authenticated MCP
    connection and the raw payloads were written to disk.
    """
    import glob
    total: Dict[str, int] = {}
    paths = sorted(glob.glob(str(Path(directory) / "*.json")) +
                   glob.glob(str(Path(directory) / "*.txt")))
    for path in paths:
        try:
            raw = json.loads(Path(path).read_text(encoding="utf-8"))
        except json.JSONDecodeError:
            print(f"  {Path(path).name}: not JSON, skipped")
            continue
        # Accept either a bare payload or the MCP envelope [{"text": "<json>"}]
        if isinstance(raw, list) and raw and isinstance(raw[0], dict) and "text" in raw[0]:
            payload = json.loads(raw[0]["text"])
        else:
            payload = raw
        items = extract_items(payload)
        if not items:
            print(f"  {Path(path).name}: no maps items in payload, skipped")
            continue
        s = ingest_items(items, None, country, "")
        print(f"  {Path(path).name}: {s}")
        for k, v in s.items():
            total[k] = total.get(k, 0) + v
    return total


def ingest_file(path: str) -> Dict[str, int]:
    """
    Ingests a harvest manifest:
      [{"niche": "...", "country": "...", "city": "...", "items": [...]}, ...]
    """
    payload = json.loads(Path(path).read_text(encoding="utf-8"))
    total = {"inserted": 0, "dup_place_id": 0, "dup_phone": 0, "no_phone": 0, "suppressed": 0}
    for block in payload:
        s = ingest_items(block["items"], block["niche"], block["country"], block["city"])
        for k in total:
            total[k] += s.get(k, 0)
    return total


ADHOC_COLUMNS = ["rank", "business_name", "category", "address", "phone", "website",
                 "rating", "review_count", "place_id", "niche", "source"]


def country_of(city: str, default: str) -> str:
    """The configured market a city belongs to, else the --country given."""
    for country, market in MARKETS.items():
        if city.lower() in (c.lower() for c in market["cities"]):
            return country
    return default


def run_query(args, niche: Optional[str] = None) -> None:
    """
    One free-text search (--query / --location). Every result goes to a CSV;
    only results in a configured niche are also written to the lead database.
    Places reports broad types (an optician is a 'store'), so pass --niche to
    file results the category alone cannot place.
    """
    import csv
    country = country_of(args.location, args.country)
    dial = MARKETS[country]["dial"]
    if args.provider == "google":
        items = fetch_google(args.query, args.location, args.limit, dial)
    elif args.provider == "apify":
        items = fetch_apify([args.query], args.location, country, args.limit, args.max_cost)[:args.limit]
    else:
        if not has_direct_credentials():
            raise SystemExit("DATAFORSEO_LOGIN / DATAFORSEO_PASSWORD not set.")
        items = fetch_direct(f"{args.query} {args.location}", country,
                             MARKETS[country]["lang"], args.limit)[:args.limit]

    rows = [{"rank": it.get("rank_absolute"), "business_name": it.get("title"),
             "category": it.get("category"), "address": it.get("address"),
             "phone": it.get("phone"), "website": it.get("url"),
             "rating": (it.get("rating") or {}).get("value"),
             "review_count": (it.get("rating") or {}).get("votes_count"),
             "place_id": it.get("place_id"), "niche": classify_niche(it) or "",
             "source": it.get("_provenance") or PROVENANCE} for it in items]

    slug = re.sub(r"[^a-z0-9]+", "-", f"{args.query} {args.location}".lower()).strip("-")
    out = Path(args.csv) if args.csv else (
        BASE_DIR / "LEAD_LISTS" / f"query-{slug}-{datetime.now(UTC):%Y-%m-%d}.csv")
    out.parent.mkdir(parents=True, exist_ok=True)
    with out.open("w", newline="", encoding="utf-8-sig") as f:
        w = csv.DictWriter(f, fieldnames=ADHOC_COLUMNS)
        w.writeheader()
        w.writerows(rows)

    print(f"\n{len(rows)} result(s) for '{args.query} in {args.location}' via {args.provider}:")
    for r in rows:
        print(f"  {r['rank']:>2}. {r['business_name']} | {r['category'] or '-'} | "
              f"{r['phone'] or 'no phone'} | {r['website'] or 'no website'} | "
              f"{r['rating'] or '-'} ({r['review_count'] or 0})")
    print(f"CSV written: {out}")
    stats = ingest_items(items, niche, country, args.location)
    print(f"Database ({DB_PATH.name}): {stats}")


def main() -> None:
    global DB_PATH
    import argparse
    ap = argparse.ArgumentParser(description="Verified Google Maps lead harvester")
    ap.add_argument("--ingest", metavar="FILE", help="Ingest a harvest manifest JSON")
    ap.add_argument("--ingest-dir", metavar="DIR",
                    help="Ingest every DataForSEO maps payload in DIR, self-classifying by category")
    ap.add_argument("--harvest", action="store_true", help="Direct API harvest (needs credentials)")
    ap.add_argument("--provider", "--source", dest="provider", default="google",
                    choices=["google", "places", "apify", "dataforseo"],
                    help="Source for --harvest / --query: google (alias places) = Google Places "
                         "API (New), apify, or dataforseo (default google)")
    ap.add_argument("--query", help="Free-text search, e.g. \"tax consultants\" (use with --location)")
    ap.add_argument("--location", help="City for --query, e.g. Douala")
    ap.add_argument("--limit", type=int, default=20, help="Max results for --query (default 20, max 60)")
    ap.add_argument("--csv", metavar="FILE", help="CSV path for --query (default: LEAD_LISTS/query-...csv)")
    ap.add_argument("--db", metavar="FILE", help="Use this SQLite database instead of the live one")
    ap.add_argument("--niche", default=None, choices=list(SEARCH_PLAN),
                    help="--harvest: niche to search (default dental). --query: niche to file "
                         "results under when their own category matches none")
    ap.add_argument("--country", default="Cameroon", choices=list(MARKETS))
    ap.add_argument("--depth", type=int, default=20, help="Places per keyword per city (default 20)")
    ap.add_argument("--target-new", type=int, metavar="N",
                    help="google --harvest: stop once N new leads of --niche are stored")
    ap.add_argument("--cities", nargs="+", metavar="CITY",
                    help="google --harvest: search these cities instead of the market's defaults")
    ap.add_argument("--max-cost", type=float, default=1.00,
                    help="apify: refuse to start if the estimate exceeds this, in USD (default 1.00)")
    args = ap.parse_args()
    query_niche, args.niche = args.niche, args.niche or "dental"
    if args.provider == "places":
        args.provider = "google"
    if args.db:
        DB_PATH = Path(args.db)

    if args.query:
        if not args.location:
            raise SystemExit("--query needs --location (the city to search in).")
        run_query(args, query_niche)
        log_google_requests()
        return

    if args.harvest and args.provider == "google":
        market = MARKETS[args.country]
        plan = SEARCH_PLAN[args.niche]
        kws = plan["keywords_fr"] if market["lang"] == "fr" else plan["keywords_en"]
        grand: Dict[str, int] = {}
        cities = args.cities or market["cities"]
        for city, kw in ((c, k) for c in cities for k in kws):
            left = None if args.target_new is None else args.target_new - grand.get("inserted", 0)
            if left is not None and left <= 0:
                break
            items = fetch_google(kw, city, args.depth, market["dial"])
            # With a target, only leads Google itself places in the niche count toward it.
            s = ingest_items(items, args.niche, args.country, city, left,
                             args.niche if args.target_new is not None else None)
            print(f"  {kw} / {city}: {len(items)} places -> {s}")
            for k, v in s.items():
                grand[k] = grand.get(k, 0) + v
        print(json.dumps(grand, indent=2))
        log_google_requests()
        return

    if args.ingest:
        print(json.dumps(ingest_file(args.ingest), indent=2))
        return

    if args.ingest_dir:
        print(json.dumps(ingest_dir(args.ingest_dir, args.country), indent=2))
        return

    if args.harvest and args.provider == "apify":
        market = MARKETS[args.country]
        plan = SEARCH_PLAN[args.niche]
        kws = plan["keywords_fr"] if market["lang"] == "fr" else plan["keywords_en"]
        estimate = len(market["cities"]) * len(kws) * args.depth * APIFY_COST_PER_PLACE_USD
        print(f"Apify harvest: {len(kws)} keyword(s) x {len(market['cities'])} city(ies) x "
              f"{args.depth} places, estimated cost up to ${estimate:.2f}")
        if estimate > args.max_cost:
            raise SystemExit(f"Estimate exceeds --max-cost ${args.max_cost:.2f}; "
                             "lower --depth or raise --max-cost.")
        grand: Dict[str, int] = {}
        for city in market["cities"]:
            items = fetch_apify(kws, city, args.country, args.depth,
                                args.max_cost / len(market["cities"]))
            s = ingest_items(items, args.niche, args.country, city)
            print(f"  {city}: {len(items)} places -> {s}")
            for k, v in s.items():
                grand[k] = grand.get(k, 0) + v
        print(json.dumps(grand, indent=2))
        return

    if args.harvest:
        if not has_direct_credentials():
            raise SystemExit(
                "DATAFORSEO_LOGIN / DATAFORSEO_PASSWORD not set.\n"
                "Either add them to .env for unattended runs, or drive the harvest through "
                "the authenticated DataForSEO MCP connection and ingest with --ingest FILE."
            )
        market = MARKETS[args.country]
        plan = SEARCH_PLAN[args.niche]
        kws = plan["keywords_fr"] if market["lang"] == "fr" else plan["keywords_en"]
        grand = {"inserted": 0, "dup_place_id": 0, "dup_phone": 0, "no_phone": 0, "suppressed": 0}
        for city in market["cities"]:
            for kw in kws:
                items = fetch_direct(f"{kw} {city}", args.country, market["lang"], args.depth)
                s = ingest_items(items, args.niche, args.country, city)
                print(f"  {kw} / {city}: {s}")
                for k in grand:
                    grand[k] += s.get(k, 0)
        print(json.dumps(grand, indent=2))
        return

    ap.print_help()


if __name__ == "__main__":
    main()
