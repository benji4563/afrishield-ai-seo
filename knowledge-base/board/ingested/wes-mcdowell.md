# Wes McDowell — ingestion ledger

Tracks processed videoIds so nothing is re-ingested. Verdicts:
`ingested` / `skipped-off-niche` / `skipped-nothing-new`. Depth: `deep` (full
transcript) / `shallow` (title+description fallback).

| Date | videoId | Title | Verdict | Depth |
|---|---|---|---|---|
| 2026-08-05 | RwEs5VdH_ZQ | It's Boring, But THIS YouTube Funnel Can Triple Your Business | ingested | deep |
| 2026-08-05 | HsLLTvosGJw | Big YouTubers Are Down 50% and It's Your Best Chance to Start | ingested | deep |
| 2026-08-05 | yuVlHAKbnMQ | Claude Just Changed Making YouTube Videos Again (7 Use Cases) | ingested | deep |
| 2026-09-23 | VXGDHZIGf40 | Your Website Won't Matter in 2027. Prepare Now. | ingested | deep |
| 2026-09-23 | zGfjuwDKrro | ChatGPT Astra Just Changed Making YouTube Videos Forever | ingested | deep |
| 2026-09-23 | i1fLRypxgjU | Hormozi's New YouTube Strategy Is Genius (but Dangerous) | ingested | deep |

Note (dedup, 2026-08-05 run): all three videoIds above were first logged
2026-07-29 at `shallow` depth (`RwEs5VdH_ZQ` and `HsLLTvosGJw` as `ingested`;
`yuVlHAKbnMQ` as `skipped-nothing-new`). The 2026-08-05 run re-read all three
at `deep` depth with full transcripts and found materially more — including
real substance in `yuVlHAKbnMQ` that the shallow title/description pass
missed — so the deep entries above are what's kept; the shallow duplicates
were dropped.

Note (2026-09-23 run): the channel's `/videos` page returned 30 recent
uploads, of which only the 3 above were new since the last run and were
selected (newest-first) for deep analysis — all three had usable full
transcripts via youtubetotranscript.com. All three were on-niche and added
genuinely new material, so all are `ingested`. 24 more videos on the page are
also not yet in this ledger but were left untouched this run (per the "at
most 3 newest" rule) and should be picked up in a future run, newest first:
`JJTFLkD9NxU`, `kjRKGZh7uAE`, `vl6GDCbMi4I`, `JbBfJtWnyt0`, `w2ENbVomGao`,
`VughBZFtHDc`, `lIQ79IkGpjk`, `1ywvAeaFojo`, `BEcIgiXA4M8`, `g3bXPKgvFGM`,
`81bmuO5U6TY`, `C3l5idU0ja0`, `2JGEyK2o0yY`, `T7IfadQ2XLQ`, `DRs5qr7UY28`,
`sZQ9snGyFps`, `Y-wymxSUUAk`, `VxkGExMwZCc`, `9ESpRo379PI`, `AE2M5GyCYho`,
`ibfPT5n_gYw`, `-SfFwE6xtD8`, `lxndWdjOyVM`, `C0foDFGP8JU`.
