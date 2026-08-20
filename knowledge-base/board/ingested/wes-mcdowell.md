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

| 2026-08-19 | vl6GDCbMi4I | The Anti-Personal Brand That Will Take Over in 2027 (Start Yours Now) | ingested | deep |
| 2026-08-19 | JbBfJtWnyt0 | How Top Experts Get INSANE Sales From YouTube | ingested | deep |
| 2026-08-19 | VDnueqVW7Cc | I Just Fixed 28 YouTube Channels in a Row | ingested | deep |

Note (2026-08-19 run): `vl6GDCbMi4I` is a ~6h13m compiled "full course" —
read in full via character-offset slicing of the saved scrape file (too
large for one context load). It's a superset of most standalone videos
ingested to date, so future runs should expect real overlap between it and
newer standalone videos on the same channel; only genuinely new material was
logged. `JbBfJtWnyt0`'s page `<title>` tag reads "What All Top Experts Know
About YouTube (That You Don't)" while its on-page H1/og:title reads "How Top
Experts Get INSANE Sales From YouTube" — same video (uploadDate
2026-08-11), logged under the H1 title; if it resurfaces under the other
title in a future search, it's a dupe, not a new video. Also note:
`A1M8bqyUJwQ` ("Forget the Marketing Funnel. Try This Instead") surfaced in
a Wes McDowell search but is actually uploaded by a different channel
(Daniel Priestley / Key Person of Influence) — not this advisor, skip if it
resurfaces. Three videos uploaded 2026-08-05 to 2026-08-18 were genuinely
new and processed this run (the cap of 3); one older still-unprocessed
candidate is left for next run: `1ywvAeaFojo` "Claude Just Changed Making
YouTube Videos Forever" (uploaded 2026-06-17, VidIQ+Claude MCP topic
research and a two-skill outline/slide-deck workflow — on-niche, not yet
reviewed).
