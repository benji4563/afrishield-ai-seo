# discovery/maps_harvester.py
"""
Verified Lead Harvester — Google Maps via DataForSEO.

Replaces generate_200_cameroon_leads.py and
MetaAdDiscoveryEngine._generate_verified_catalog_prospects(), both of which
FABRICATED leads (random.randint phone numbers, random lead scores, hardcoded
name templates). Every field this module writes comes from a live Google Maps
result and is traceable to a place_id.

Two operating modes:

  1. DIRECT   — if DATAFORSEO_LOGIN / DATAFORSEO_PASSWORD are in the
                environment, queries the API itself. Use for unattended cron.
  2. INGEST   — accepts DataForSEO `items` JSON captured by an authenticated
                caller (e.g. the MCP connection) and writes it to the DB.
                Use when no raw credentials are stored on the host.

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
        "data_provenance": PROVENANCE,
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


def upsert_leads(records: Iterable[Dict[str, Any]]) -> Dict[str, int]:
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
# Mode 2: INGEST (items JSON supplied by an authenticated caller / MCP)
# ---------------------------------------------------------------------------

def extract_items(payload: Any) -> List[Dict[str, Any]]:
    """
    Pulls maps_search items out of a DataForSEO payload, accepting either shape
    the API returns:

      * AI-optimized subset -> {"items": [...]}
      * full response schema -> {"tasks": [{"result": [{"items": [...]}]}]}

    The full schema arrives whenever the caller disables the AI-optimized subset
    (noAiMode), so both must ingest identically. Returning [] here is what makes
    a payload "empty"; callers are expected to say so rather than skip quietly.
    """
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
                 city: str) -> Dict[str, int]:
    """
    `niche` may be None, in which case each item is classified from its own
    Google category_ids. Items that match no target niche are skipped.
    """
    recs, skipped = [], 0
    for it in items:
        resolved = classify_niche(it) or niche
        if resolved not in SEARCH_PLAN:
            skipped += 1
            continue
        plan = SEARCH_PLAN[resolved]
        rec = parse_item(it, resolved, country,
                         (it.get("address_info") or {}).get("city") or city,
                         plan["campaign_id"])
        if rec:
            recs.append(rec)
    stats = upsert_leads(recs)
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


def main() -> None:
    import argparse
    ap = argparse.ArgumentParser(description="Verified Google Maps lead harvester")
    ap.add_argument("--ingest", metavar="FILE", help="Ingest a harvest manifest JSON")
    ap.add_argument("--ingest-dir", metavar="DIR",
                    help="Ingest every DataForSEO maps payload in DIR, self-classifying by category")
    ap.add_argument("--harvest", action="store_true", help="Direct API harvest (needs credentials)")
    ap.add_argument("--niche", default="dental", choices=list(SEARCH_PLAN))
    ap.add_argument("--country", default="Cameroon", choices=list(MARKETS))
    ap.add_argument("--depth", type=int, default=20)
    args = ap.parse_args()

    if args.ingest:
        print(json.dumps(ingest_file(args.ingest), indent=2))
        return

    if args.ingest_dir:
        print(json.dumps(ingest_dir(args.ingest_dir, args.country), indent=2))
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
