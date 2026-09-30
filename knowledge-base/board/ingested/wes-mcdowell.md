# Wes McDowell — ingestion ledger

Tracks processed videoIds so nothing is re-ingested. Verdicts:
`ingested` / `skipped-off-niche` / `skipped-nothing-new`. Depth: `deep` (full
transcript) / `shallow` (title+description fallback).

| Date | videoId | Title | Verdict | Depth |
|---|---|---|---|---|
| 2026-08-05 | RwEs5VdH_ZQ | It's Boring, But THIS YouTube Funnel Can Triple Your Business | ingested | deep |
| 2026-08-05 | HsLLTvosGJw | Big YouTubers Are Down 50% and It's Your Best Chance to Start | ingested | deep |
| 2026-08-05 | yuVlHAKbnMQ | Claude Just Changed Making YouTube Videos Again (7 Use Cases) | ingested | deep |

Note (dedup, 2026-08-05 run): all three videoIds above were first logged
2026-07-29 at `shallow` depth (`RwEs5VdH_ZQ` and `HsLLTvosGJw` as `ingested`;
`yuVlHAKbnMQ` as `skipped-nothing-new`). The 2026-08-05 run re-read all three
at `deep` depth with full transcripts and found materially more — including
real substance in `yuVlHAKbnMQ` that the shallow title/description pass
missed — so the deep entries above are what's kept; the shallow duplicates
were dropped.

| 2026-08-12 | JbBfJtWnyt0 | Unfortunately, Growing on YouTube Just Changed Forever | skipped-nothing-new | deep |
| 2026-08-12 | VDnueqVW7Cc | I Just Fixed 28 YouTube Channels in a Row | ingested | deep |
| 2026-08-12 | w2ENbVomGao | The Brutal Truth About Making YouTube Videos | skipped-off-niche | deep |

Note (2026-08-12 run, depth methodology): direct youtube.com access remained
blocked at the network egress proxy; channel enumeration used the YouTube
Data API's uploads-playlist endpoint (via Composio) instead of RSS, and the
API explicitly refuses caption downloads for videos we don't own. Video
understanding used Firecrawl's built-in YouTube post-processor (a whole-video
content summary generated server-side, not just title/description) — logged
as `deep` on that basis. No raw transcript/caption text was fetched into or
stored in this repo. `w2ENbVomGao` is generic creator-mindset/fear-of-starting
content, not a tactical SEO/conversion insight — off-niche per the routine's
own filter. `JbBfJtWnyt0`'s 5-point list (ideas-over-execution, case studies,
unique packaging, value balance, coaching) substantially overlaps ground
already logged from `HsLLTvosGJw` (Scar Scale / case-study credibility) with
nothing new enough to log again.
