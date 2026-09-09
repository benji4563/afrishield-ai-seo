# Wes McDowell — ingestion ledger

Tracks processed videoIds so nothing is re-ingested. Verdicts:
`ingested` / `skipped-off-niche` / `skipped-nothing-new`. Depth: `deep` (full
transcript) / `shallow` (title+description fallback).

| Date | videoId | Title | Verdict | Depth |
|---|---|---|---|---|
| 2026-08-05 | RwEs5VdH_ZQ | It's Boring, But THIS YouTube Funnel Can Triple Your Business | ingested | deep |
| 2026-08-05 | HsLLTvosGJw | Big YouTubers Are Down 50% and It's Your Best Chance to Start | ingested | deep |
| 2026-08-05 | yuVlHAKbnMQ | Claude Just Changed Making YouTube Videos Again (7 Use Cases) | ingested | deep |
| 2026-09-09 | q7sJGED_b6g | YouTube Algorithm - Working Against You? The Truth About 2026 Changes | ingested | shallow |
| 2026-09-09 | kjRKGZh7uAE | YouTube Just Accidentally Created A HUGE Opportunity For Your Business | skipped-nothing-new | shallow |
| 2026-09-09 | JbBfJtWnyt0 | How Top Experts Get INSANE Sales From YouTube | skipped-nothing-new | shallow |

Note (2026-09-09 run): direct youtube.com access (RSS feed and yt-dlp) is blocked at
the environment's egress proxy, confirmed again this run (403 at CONNECT for
`www.youtube.com`); the Firecrawl scrape/search tools specified in the runbook
also failed this run with "insufficient credits" (402), so the channel's
/videos tab could not be rendered directly. Fell back entirely to web-search
snippets to identify candidate uploads and approximate their recency (relative
"X weeks/days ago" text and a couple of stats-aggregator pages), cross-checked
against the channel/topic to rule out course-ad pages and other creators'
videos. This makes the "3 newest" ranking best-effort rather than certain —
of roughly a dozen title candidates surfaced, these three had the strongest
recency signal (approx. late July-late August 2026) versus everything else
found, which dated to Nov 2025-Mar 2026 or earlier. No transcript text was
obtainable for any of them (title + secondhand description snippets only,
which for two of the three were generic channel boilerplate rather than
video-specific detail) — all three logged at shallow depth. `kjRKGZh7uAE` and
`JbBfJtWnyt0` are on-niche (YouTube-for-business) but the available
snippets only restate doctrine already captured in the wiki (content-as-funnel,
buyer-vs-viewer targeting), so no new takeaway could be responsibly extracted
without fabricating specifics beyond the title — logged skipped-nothing-new
rather than guessed. `q7sJGED_b6g` had one corroborated, video-specific detail
(a stated view/revenue dip tied to 2026 algorithm changes) worth capturing.

Note (dedup, 2026-08-05 run): all three videoIds above were first logged
2026-07-29 at `shallow` depth (`RwEs5VdH_ZQ` and `HsLLTvosGJw` as `ingested`;
`yuVlHAKbnMQ` as `skipped-nothing-new`). The 2026-08-05 run re-read all three
at `deep` depth with full transcripts and found materially more — including
real substance in `yuVlHAKbnMQ` that the shallow title/description pass
missed — so the deep entries above are what's kept; the shallow duplicates
were dropped.
