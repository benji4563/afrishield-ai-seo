# Wes McDowell — ingestion ledger

Tracks processed videoIds so nothing is re-ingested. Verdicts:
`ingested` / `skipped-off-niche` / `skipped-nothing-new`. Depth: `deep` (full
transcript) / `shallow` (title+description fallback).

| Date | videoId | Title | Verdict | Depth |
|---|---|---|---|---|
| 2026-08-05 | RwEs5VdH_ZQ | It's Boring, But THIS YouTube Funnel Can Triple Your Business | ingested | deep |
| 2026-08-05 | HsLLTvosGJw | Big YouTubers Are Down 50% and It's Your Best Chance to Start | ingested | deep |
| 2026-08-05 | yuVlHAKbnMQ | Claude Just Changed Making YouTube Videos Again (7 Use Cases) | ingested | deep |
| 2026-08-11 | JbBfJtWnyt0 | How Top Experts Get INSANE Sales From YouTube | ingested | deep |
| 2026-08-18 | vl6GDCbMi4I | How to Become the Most Famous Expert in Your Industry (Full Course) | ingested | shallow |
| 2026-08-25 | kjRKGZh7uAE | YouTube Just Accidentally Created A HUGE Opportunity For Your Business | ingested | shallow |

Note (2026-08-26 run): confirmed via search that kjRKGZh7uAE (Aug 25) is the
most recent upload as of this run — exactly 3 new videos since the 2026-08-05
cutoff, no overflow. Transcript inline-extraction (via Firecrawl's YouTube
postprocessor) worked for JbBfJtWnyt0 only; the other two stayed shallow
(title + description/chapters, no transcript block rendered).

Note (dedup, 2026-08-05 run): all three videoIds above were first logged
2026-07-29 at `shallow` depth (`RwEs5VdH_ZQ` and `HsLLTvosGJw` as `ingested`;
`yuVlHAKbnMQ` as `skipped-nothing-new`). The 2026-08-05 run re-read all three
at `deep` depth with full transcripts and found materially more — including
real substance in `yuVlHAKbnMQ` that the shallow title/description pass
missed — so the deep entries above are what's kept; the shallow duplicates
were dropped.
