# Wes McDowell — ingestion ledger

Tracks processed videoIds so nothing is re-ingested. Verdicts:
`ingested` / `skipped-off-niche` / `skipped-nothing-new` / `skipped-backlog`
(older than 60 days and not reached). Depth: `deep` (full
transcript) / `shallow` (title+description fallback).

| Date | videoId | Title | Verdict | Depth |
|---|---|---|---|---|
| 2026-08-05 | RwEs5VdH_ZQ | It's Boring, But THIS YouTube Funnel Can Triple Your Business | ingested | deep |
| 2026-08-05 | HsLLTvosGJw | Big YouTubers Are Down 50% and It's Your Best Chance to Start | ingested | deep |
| 2026-08-05 | yuVlHAKbnMQ | Claude Just Changed Making YouTube Videos Again (7 Use Cases) | ingested | deep |
| 2026-10-12 | VXGDHZIGf40 | Your Website Won't Matter in 2027. Prepare Now. | ingested | deep |
| 2026-10-12 | auN5ZjQLs6w | If you still have a job, start a YouTube channel before 2027 | skipped-off-niche | shallow |
| 2026-10-12 | bjIL9qoRHds | The NEW Way to Make YouTube Videos FAST (Start to Finish) | skipped-off-niche | shallow |
| 2026-10-12 | zGfjuwDKrro | The NEW ChatGPT Just Killed Claude at Making YouTube Videos | skipped-off-niche | shallow |
| 2026-10-12 | i1fLRypxgjU | Hormozi's New YouTube Strategy Is Genius (but Dangerous) | skipped-off-niche | shallow |
| 2026-10-12 | JJTFLkD9NxU | How 'Everyday Experts' Are Getting Famous on YouTube | skipped-off-niche | shallow |
| 2026-10-24 | mmIWpdXk_wQ | Nobody Wants Your Free Advice on YouTube | ingested | deep |
| 2026-10-24 | MqQAt48v298 | This coach had no time for youtube (so we fixed it) | skipped-nothing-new | deep |

Note (dedup, 2026-08-05 run): all three videoIds above were first logged
2026-07-29 at `shallow` depth (`RwEs5VdH_ZQ` and `HsLLTvosGJw` as `ingested`;
`yuVlHAKbnMQ` as `skipped-nothing-new`). The 2026-08-05 run re-read all three
at `deep` depth with full transcripts and found materially more — including
real substance in `yuVlHAKbnMQ` that the shallow title/description pass
missed — so the deep entries above are what's kept; the shallow duplicates
were dropped.

Note (2026-10-12): the five skipped uploads are about making or growing a YouTube channel, not about a website, conversion or search. `VXGDHZIGf40` read in full from yt-dlp `en-orig` captions (Firecrawl returned no transcript).
