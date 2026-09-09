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

Note (2026-09-09 run — no rows added, discovery failed): could not identify
any new videoIds this run, so nothing was processed and no table rows were
added. Direct YouTube access (yt-dlp, WebFetch) is blocked by the environment
egress proxy as expected. Firecrawl — the documented workaround — was
unavailable: `firecrawl_scrape` on the channel's `/videos` page and two
`firecrawl_search` attempts all failed with `402 Insufficient credits`
(account-level exhaustion, not a transient error). Fell back to generic
`WebSearch`, but its index only surfaced videos already known from
Jan–Jul 2026 and did not even return `mD51uM8v_bw` or `WrU25krFCtk` (both
confirmed real uploads from the 2026-08-05 run), showing it lags too far
behind to reliably tell "new since 2026-08-05" from "old." Rather than risk
mis-dated or misattributed entries, no ledger/wiki content was added this
run. Next run should retry Firecrawl-based discovery and, since this run
found nothing, should treat the full 2026-08-05 → next-run-date span as the
gap to cover (not just since 2026-09-09).
