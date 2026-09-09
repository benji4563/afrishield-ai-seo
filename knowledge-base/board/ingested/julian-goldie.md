# Julian Goldie — ingestion ledger

Tracks processed videoIds so nothing is re-ingested. Verdicts:
`ingested` / `skipped-off-niche` / `skipped-nothing-new`. Depth: `deep` (full
transcript) / `shallow` (title+description fallback).

| Date | videoId | Title | Verdict | Depth |
|---|---|---|---|---|
| 2026-07-29 | Zwtorh9Plx0 | Automate Your Entire Lead Pipeline With Hermes | ingested | shallow |
| 2026-07-29 | 3Y0EU6N6ADY | This NEW AI AGENT BEATS CHATGPT 5! | skipped-off-niche | shallow |
| 2026-07-29 | iIU3Daq4LHU | New Gemini Notebook Update is INSANE! | skipped-off-niche | shallow |
| 2026-08-05 | rTSHFy9Lwlg | How I Ranked #1 in 7 Hours with Qwen 3.8 Max (FREE!) | ingested | shallow |
| 2026-08-05 | ut_PeUbmk4c | This NEW Agent Operating System is INSANE! | ingested | shallow |
| 2026-08-05 | PYbBddbflRo | Qwen 3.8 Max is NOW COMPLETELY FREE! Here's How.. | ingested | shallow |
| 2026-09-09 | OzYlM4YVuwg | This AI SEO Agent OS is INSANE (FREE!) | ingested | shallow |
| 2026-09-09 | Wh6_CQKJXwE | Claude AI SEO OS System is INSANE! | ingested | shallow |
| 2026-09-09 | QOivt0EGrpQ | Hermes Agent Just Automated SEO Completely | ingested | shallow |

Note: depth is `shallow` for all entries — the environment's network policy
blocks direct access to youtube.com (yt-dlp/direct curl get a 403 at the
proxy), so no auto-transcript could be fetched in either run. Judgment was
made from the RSS title + full video description + chapter markers (fetched
via Firecrawl, which reaches YouTube through separate infrastructure). This
channel posts several times a day; only the 3 newest were reviewed per run
per the per-advisor cap. No videoId overlap between the 2026-07-29 and
2026-08-05 runs.

2026-09-09 run note: this run's discovery method was degraded versus prior
runs. Firecrawl (`firecrawl_scrape`/`firecrawl_search`) returned HTTP 402
"insufficient credits" on every call regardless of request size, so the
usual channel-videos-tab render and site:youtube.com search were
unavailable. Direct youtube.com/youtu.be access and `python3 -m yt_dlp`
were re-confirmed blocked (403 at the egress proxy), consistent with prior
runs. Fell back to general WebSearch, cross-referencing each candidate
title/videoId pair across at least two independent queries plus matching
mentions on the @JulianGoldieSEO X account (same handle as the channel) to
reduce the risk of a mismatched or hallucinated video ID before trusting
it — one bare video-ID-only query returned an unrelated result, which
looks like normal search behavior for a non-natural-language ID string
rather than evidence the corroborated ID is wrong, but is noted here for
transparency. Exact upload timestamps could not be confirmed, so the three
processed videos are the best-corroborated "newest new" set rather than a
chronologically verified top-3; no reliable relative-recency text was
available to rank them precisely against each other. All three are
distinguishable evolutions of the "Agent OS" / Hermes-automation thread
already tracked in the wiki (see updates log), so only the one or two
details in each that were not already captured were logged, to avoid
re-stating existing doctrine. As always, no transcript was obtainable, so
depth stays shallow.
