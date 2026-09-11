# Koray Tuğberk Gübür — ingestion ledger

Tracks processed videoIds so nothing is re-ingested. Verdicts:
`ingested` / `skipped-off-niche` / `skipped-nothing-new`. Depth: `deep` (full
transcript) / `shallow` (title+description fallback).

| Date | videoId | Title | Verdict | Depth |
|---|---|---|---|---|
| 2026-07-29 | AlHiLfYah74 | How to Rank in AI Search with Semantic SEO and Topical Authority (Navneet interview) | ingested | shallow |
| 2026-07-29 | Mq0umjlnnUM | Topical Authority for AI SEO: Rankings for LLMs (Jesper Nissen interview) | skipped-nothing-new | shallow |
| 2026-08-05 | mD51uM8v_bw | Topical Authority and Semantic SEO for Local Rankings (Law and Beyond) | ingested | shallow |
| 2026-08-05 | AlHiLfYah74 | How to Rank in AI Search with Semantic SEO and Topical Authority (Navneet interview) | skipped-nothing-new | shallow |
| 2026-08-05 | WrU25krFCtk | Topical Authority with 1 Page Exact Match Domain: 8,000 Clicks a Day - Learn Visual Semantics | ingested | deep |
| 2026-08-24 | VLDa_RoczYI | Topical Authority and Answer Engine Optimization: How LLMs Actually Retrieve Content (Jason Barnard interview) | ingested | shallow |

Note: `Mq0umjlnnUM` is already listed as a source in `wiki/koray-gubur.md` from
an earlier (pre-ledger) seeding pass — logged here now so it isn't re-flagged
as new on a future run.

Note (dedup, 2026-08-05 run): `WrU25krFCtk` was first logged 2026-07-29 at
`shallow` depth (`ingested`); the 2026-08-05 run re-read it at `deep` depth
and produced a materially richer wiki entry, so the deep entry above is what's
kept and the shallow duplicate was dropped.

Note (unresolved disagreement, not deduped): `AlHiLfYah74` was judged
`ingested` on 2026-07-29 and `skipped-nothing-new` on 2026-08-05 — both at
`shallow` depth, so neither reading has the deeper evidence to override the
other. Both rows are kept as-is; the 2026-07-29 verdict is what the existing
wiki entry for this video reflects. A future `deep` pass on this video would
be the tiebreaker.

Note (gap + off-cycle run, 2026-09-07): the weekly ingestion routine had not
run since 2026-08-05/08-10 — roughly a month gap, discovered while answering
an ad hoc user request to check for doctrine drift, not by a scheduled run.
`VLDa_RoczYI` above was judged from RSS title/description plus a web-search
summary (no yt-dlp transcript attempted this pass) — logged `shallow` per the
existing convention. Mike King and Wes McDowell were also checked this pass:
no new in-window upload from Mike King (last new video 2026-06-29; one
company-news blog post 2026-08-11, not doctrine-relevant); Wes McDowell had
four new uploads (08-11 to 09-01) but all are YouTube-channel-growth/personal-
brand content, tangential to on-site conversion doctrine — not ingested. This
run does not replace a real weekly pass across all six advisors; a
`queue-keeper`-style automation gap for this routine should be flagged
alongside the one already noted in `board-review-2026-09-04.md` for the
content queue.
