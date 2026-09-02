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

| 2026-09-02 | kjRKGZh7uAE | YouTube Just Accidentally Created A HUGE Opportunity For Your Business | ingested | shallow |
| 2026-09-02 | JbBfJtWnyt0 | How Top Experts Get INSANE Sales From YouTube | ingested | shallow |
| 2026-09-02 | lIQ79IkGpjk | There's a New AI Inside YouTube and Almost Nobody's Using It | ingested | shallow |

Note (2026-09-02 run): direct YouTube access (curl/yt-dlp) is blocked in this
environment, so discovery went through Firecrawl web search + scrape of the
watch pages instead of yt-dlp. Most `site:youtube.com/watch "Wes McDowell"`
search hits turned out to be false positives — other channels' videos that
merely show a Wes McDowell video as a sidebar "up next" suggestion — and were
discarded after checking each candidate's actual "Uploaded by" channel link
against `@WesMcDowellInc`/`UCMq1R1LgS04lIKdpLh_OS1w`. The three rows above are
confirmed-genuine uploads, newest three not already in this ledger; older
confirmed uploads found in the same pass (`2JGEyK2o0yY`, `sZQ9snGyFps`, and
others) were left unprocessed for a future run per the 3-per-run cap.
