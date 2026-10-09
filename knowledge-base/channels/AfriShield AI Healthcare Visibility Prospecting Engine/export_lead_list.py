# export_lead_list.py
"""
Exports the verified lead list as a standalone deliverable (CSV + Markdown).

Every row traces to a Google Maps place_id. Nothing is inferred or invented:
a blank cell means Google did not report that field, and outreach copy must not
claim anything about a blank.

Cameroon numbering (used for the reachability split):
  6xx xxx xxx  -> mobile, WhatsApp-capable
  2xx xxx xxx  -> fixed line, NOT WhatsApp-capable
"""

import csv
import re
import sqlite3
from datetime import datetime, UTC
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent
DB_PATH = BASE_DIR / "healthcare_prospecting.db"
OUT_DIR = BASE_DIR / "LEAD_LISTS"

NICHE_LABEL = {
    "dental": "Dental",
    "optical": "Optical / Eye care",
    "healthcare_clinic": "Clinic / Medical centre",
}


def phone_kind(phone: str | None) -> str:
    if not phone:
        return "none"
    d = re.sub(r"[^0-9]", "", phone)
    national = d[3:] if d.startswith("237") else d
    if national.startswith("6"):
        return "mobile"
    if national.startswith("2"):
        return "landline"
    return "unknown"


def pretty_phone(phone: str | None) -> str:
    if not phone:
        return ""
    d = re.sub(r"[^0-9]", "", phone)
    if d.startswith("237") and len(d) == 12:
        n = d[3:]
        return f"+237 {n[0:3]} {n[3:5]} {n[5:7]} {n[7:9]}"
    return phone


def fetch_rows(conn: sqlite3.Connection) -> list[dict]:
    conn.row_factory = sqlite3.Row
    rows = [dict(r) for r in conn.execute(
        """
        SELECT business_name, niche, sub_niche, city, region, public_phone,
               website, domain, google_maps_url, place_id, google_rating,
               reviews_count, website_status, lead_score, lead_score_confidence,
               data_provenance, harvested_at
        FROM businesses
        WHERE quarantined = 0
          AND data_provenance IN ('DATAFORSEO_GOOGLE_MAPS', 'APIFY_GOOGLE_MAPS',
                                  'GOOGLE_PLACES_API')
        ORDER BY lead_score DESC, reviews_count ASC, business_name
        """
    )]
    for r in rows:
        r["phone_kind"] = phone_kind(r["public_phone"])
        r["phone_display"] = pretty_phone(r["public_phone"])
        r["niche_label"] = NICHE_LABEL.get(r["niche"], r["niche"])
        r["has_website"] = "no" if r["website_status"] == "absent" else "yes"
    return rows


def write_csv(rows: list[dict], path: Path) -> None:
    cols = ["business_name", "niche_label", "sub_niche", "city", "region",
            "phone_display", "phone_kind", "has_website", "website",
            "google_rating", "reviews_count", "lead_score",
            "lead_score_confidence", "google_maps_url", "place_id"]
    header = ["Business", "Niche", "Google category", "City", "Address",
              "Phone", "Phone type", "Has website", "Website URL",
              "Google rating", "Reviews", "Gap score", "Score confidence",
              "Google Maps", "place_id"]
    with open(path, "w", newline="", encoding="utf-8-sig") as f:
        w = csv.writer(f)
        w.writerow(header)
        for r in rows:
            w.writerow([r.get(c) if r.get(c) is not None else "" for c in cols])


def write_markdown(rows: list[dict], path: Path) -> None:
    total = len(rows)
    mobile = [r for r in rows if r["phone_kind"] == "mobile"]
    landline = [r for r in rows if r["phone_kind"] == "landline"]
    nophone = [r for r in rows if r["phone_kind"] == "none"]
    nosite = [r for r in rows if r["has_website"] == "no"]

    L: list[str] = []
    L.append("# AfriShield — Verified Healthcare Lead List (Cameroon)\n")
    L.append(f"**Generated:** {datetime.now(UTC).strftime('%Y-%m-%d %H:%M UTC')}  ")
    L.append("**Source:** Google Maps via DataForSEO — every row traces to a `place_id`  ")
    L.append("**Markets:** Douala + Yaoundé  ")
    L.append("**Niches:** Dental · Optical / Eye care · Clinics & medical centres\n")

    L.append("## Summary\n")
    L.append("| Metric | Count |")
    L.append("|---|---|")
    L.append(f"| Total verified businesses | **{total}** |")
    L.append(f"| Mobile number (WhatsApp-capable) | {len(mobile)} |")
    L.append(f"| Fixed line only (not WhatsApp) | {len(landline)} |")
    L.append(f"| No phone listed on Maps | {len(nophone)} |")
    L.append(f"| **No website at all** | **{len(nosite)}** |")
    L.append(f"| Has a website | {total - len(nosite)} |\n")

    L.append(f"The headline finding: **{len(nosite)} of {total} "
             f"({round(100 * len(nosite) / total)}%) have no website whatsoever** — "
             "they are running on a Google Maps listing alone. That is a gap you can "
             "state as fact, with the Maps link as proof, without claiming anything "
             "you have not observed.\n")

    L.append("### Blank cells are deliberate\n")
    L.append("A blank means Google did not report that field. It does **not** mean the "
             "business lacks it. Outreach copy must not assert anything about a blank — "
             "that is exactly what produced the invented claims in the previous dataset.\n")

    L.append("---\n")

    for niche in ("dental", "optical", "healthcare_clinic"):
        group = [r for r in rows if r["niche"] == niche]
        if not group:
            continue
        g_nosite = len([r for r in group if r["has_website"] == "no"])
        L.append(f"## {NICHE_LABEL[niche]} — {len(group)} businesses "
                 f"({g_nosite} with no website)\n")
        L.append("| # | Business | City | Phone | Type | Site | Rating | Reviews | Gap |")
        L.append("|---|---|---|---|---|---|---|---|---|")
        for i, r in enumerate(group, 1):
            L.append("| {} | [{}]({}) | {} | {} | {} | {} | {} | {} | {} |".format(
                i,
                r["business_name"].replace("|", "/"),
                r["google_maps_url"] or "",
                r["city"] or "",
                r["phone_display"] or "—",
                r["phone_kind"] if r["phone_kind"] != "none" else "—",
                "—" if r["has_website"] == "no" else "yes",
                r["google_rating"] if r["google_rating"] is not None else "—",
                r["reviews_count"] if r["reviews_count"] is not None else "—",
                r["lead_score"] if r["lead_score"] is not None else "—",
            ))
        L.append("")

    L.append("---\n")
    L.append("## How the gap score works\n")
    L.append("Built only from signals Google actually reported — no random values:\n")
    L.append("| Signal | Weight | Why |")
    L.append("|---|---|---|")
    L.append("| No website | +40 | Strongest, most provable gap |")
    L.append("| Few or no reviews | +2 to +25 | Thin local proof |")
    L.append("| Rating below 4.5 | +4 to +15 | Reputation headroom |")
    L.append("| Reachable by phone | +20 | You can actually act on it |\n")
    L.append("`Score confidence` is the share of those four signals Google reported "
             "for that business. A score of 95 at confidence 1.0 rests on four "
             "observed signals; the same score at 0.75 rests on three.\n")

    path.write_text("\n".join(L), encoding="utf-8")


def main() -> None:
    OUT_DIR.mkdir(exist_ok=True)
    conn = sqlite3.connect(DB_PATH)
    rows = fetch_rows(conn)
    conn.close()
    if not rows:
        raise SystemExit("No verified leads in the database. Run the harvester first.")

    stamp = datetime.now(UTC).strftime("%Y-%m-%d")
    csv_path = OUT_DIR / f"AfriShield-Cameroon-Healthcare-Leads-{stamp}.csv"
    md_path = OUT_DIR / f"AfriShield-Cameroon-Healthcare-Leads-{stamp}.md"
    write_csv(rows, csv_path)
    write_markdown(rows, md_path)

    nosite = len([r for r in rows if r["has_website"] == "no"])
    mobile = len([r for r in rows if r["phone_kind"] == "mobile"])
    print(f"{len(rows)} leads exported  |  {nosite} with no website  |  {mobile} mobile numbers")
    print(f"  {csv_path}")
    print(f"  {md_path}")


if __name__ == "__main__":
    main()
