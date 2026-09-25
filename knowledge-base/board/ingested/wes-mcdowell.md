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

| 2026-09-16 | i1fLRypxgjU | Hormozi's New YouTube Strategy Is Genius (but Dangerous) | ingested | deep |
| 2026-09-16 | JJTFLkD9NxU | How 'Everyday Experts' Are Getting Famous on YouTube | ingested | deep |
| 2026-09-16 | kjRKGZh7uAE | YouTube Just Accidentally Created A HUGE Opportunity For Your Business | ingested | deep |

Note (2026-09-16): direct youtube.com access was blocked by the environment's
network policy again this run, but Firecrawl's YouTube postprocessor returned
full transcripts for all 3 candidates — `deep` depth throughout. Uploads were
ranked by `uploadDate` metadata (2026-09-08, 2026-09-01, 2026-08-25); a 4th
candidate, `vl6GDCbMi4I` (2026-08-18), was left unprocessed for a future run
per the 3-newest cap. A 5th candidate found in the initial search,
`mhV0GzrIlAo`, was excluded entirely — its metadata shows it's uploaded by a
different channel ("The Zinny Studio"), not Wes McDowell, so it was never a
valid candidate for this advisor.
