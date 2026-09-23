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
| 2026-09-23 | VLDa_RoczYI | Topical Authority and Answer Engine Optimization: How LLMs Actually Retrieve Content | ingested | deep |
| 2026-09-23 | 3ncQHJuQaDM | Semantic SEO and Topical Authority for Large Language Models (LLMs) - Koray GUBUR and Jabez Ruben | ingested | deep |
| 2026-09-23 | R15AekSxmW4 | Holistic SEO Mastermind: Invite-only Private Gathering for SEO Business People [Kusadasi/Turkey] | skipped-off-niche | shallow |

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

Note (2026-09-23 run): the channel's videos-tab listing returned 30 distinct
videoIds, of which 26 were not yet in this ledger — well above the 3-per-run
cap. Only the 3 newest (by tab order) were deep-analysed this run; the
remaining 23 new videoIds are left untouched for future runs: `WzVgS-LtiW8`,
`qWLhHwX4HMs`, `xh5rJlAbw5A`, `FAJonNdKqw0`, `OEDjYFRN_vU`, `K8g9QW2QkIE`,
`AdqgkIUXZb8`, `K_7bxnU2GNk`, `PCNnLSCjSMc`, `ww7yHUSX5Ak`, `bvjZsMZt5oI`,
`JcYnz52zm9k`, `QAycJMP5tyo`, `bvHYprsU9Vs`, `bWjlnI4gXxo`, `5QAO4rEZf5Y`,
`oOEpvuntvVE`, `c_GIu-DBpu0`, `5PAoIhyalsg`, `2eRoYcuXwzU`, `kA2JmdJ7bUE`,
`T2_PZQbOQ-8`, `X_ou1eO28gE`. Of these, `5PAoIhyalsg` is already cited as a
source in `wiki/koray-gubur.md` from the original pre-ledger seeding pass
(same situation as `Mq0umjlnnUM` above) — a future run can likely mark it
`skipped-nothing-new` without a full deep re-analysis.

Note (2026-09-23, content judgment on `3ncQHJuQaDM`): this video's transcript
also covered aggressive black/gray-hat off-page manipulation tactics —
bulk-purchased Gmail/social accounts run through antidetect-browser proxy
farms, deliberately backdated "aged" domains and news sites, subreddit
vote/karma manipulation, and altering a private individual's Google Knowledge
Panel. These were deliberately excluded from the wiki takeaways as unsuitable
to operationalize for a legitimate client-facing agency; only the
attribute-targeting and listicle-citation-economics points (which need no
deception or ToS-violating automation) were carried into the doctrine.

Note (2026-09-23, `R15AekSxmW4`): the transcript tool returned only
music/applause, no real spoken content. The YouTube watch-page description
showed this is a ~59-second recap/trailer for an invite-only in-person
mastermind event, referencing already-known topics (topical authority,
topical maps, automation) with no new substantive claims of its own — treated
as an off-niche promo per the niche filter rather than educational content.
