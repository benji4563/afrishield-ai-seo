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
| 2026-08-25 | DY8hs0bZ8CY | Rank #1 on Google FAST With This Claude SEO Skill | ingested | deep |
| 2026-08-24 | XXI3VYNFX90 | NEW Hermes Agent OS JUST Changed AI AGENTS Forever! | skipped-nothing-new | deep |
| 2026-08-23 | -7Gnfd3D9Ds | Run Hermes Agent Free Forever : Here's How! | skipped-nothing-new | deep |

Note (2026-08-26 run): this run got full transcripts (Firecrawl's YouTube
postprocessor) for all 3 videos checked — a `deep` run, unlike the prior two
`shallow` runs. `XXI3VYNFX90` and `-7Gnfd3D9Ds` both restate the same
Agent OS blueprint already logged from the 2026-08-05 `ut_PeUbmk4c` entry (a
free/local-model running-cost angle is the only variation), hence
`skipped-nothing-new` despite being on-niche. Several other candidates from
this channel between 2026-08-19 and 2026-08-22 (Ornith-1.5, Hermes Computer
Agent, DeepSeek Harness vs Hermes — generic model/tool news) are newer than
the last-ingested-before-this-run cutoff but past the 3-per-run cap; left for
a future run. Also confirmed several search hits (e.g. "How I Use Claude Code
for SEO to Rank #1 in 7 minutes") are from a different creator (Tim The SEO
Guru) merely covering similar topics, not this channel — discarded.

Note: depth is `shallow` for all entries — the environment's network policy
blocks direct access to youtube.com (yt-dlp/direct curl get a 403 at the
proxy), so no auto-transcript could be fetched in either run. Judgment was
made from the RSS title + full video description + chapter markers (fetched
via Firecrawl, which reaches YouTube through separate infrastructure). This
channel posts several times a day; only the 3 newest were reviewed per run
per the per-advisor cap. No videoId overlap between the 2026-07-29 and
2026-08-05 runs.
