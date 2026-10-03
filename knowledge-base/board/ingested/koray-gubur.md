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
| 2026-09-30 | VLDa_RoczYI | Topical Authority and Answer Engine Optimization: How LLMs Actually Retrieve Content | ingested | deep |
| 2026-09-30 | 3ncQHJuQaDM | Semantic SEO and Topical Authority for Large Language Models (LLMs) - Koray GUBUR and Jabez Ruben | ingested | deep |
| 2026-09-30 | R15AekSxmW4 | Holistic SEO Mastermind: Invite-only Private Gathering for SEO Business People [Kusadasi/Turkey] | skipped-off-niche | shallow |

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

Note (2026-09-30 run): channel listing (newest-first) had 5 videos ahead of the
next not-yet-ingested one, all already in the ledger (`mD51uM8v_bw`,
`AlHiLfYah74`, `WrU25krFCtk`, `Mq0umjlnnUM`), so the 3 selected were the next 3
new videoIds after those: `VLDa_RoczYI`, `3ncQHJuQaDM`, `R15AekSxmW4`.
`R15AekSxmW4` is a ~1-minute event-recap/promo clip for an invite-only
mastermind with no substantive transcript (just music/applause), so it was
judged off-niche/promotional from title+description alone.
