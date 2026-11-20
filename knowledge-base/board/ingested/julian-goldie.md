# Julian Goldie — ingestion ledger

Tracks processed videoIds so nothing is re-ingested. Verdicts:
`ingested` / `skipped-off-niche` / `skipped-nothing-new` / `skipped-backlog`
(older than 60 days and not reached). Depth: `deep` (full
transcript) / `shallow` (title+description fallback).

| Date | videoId | Title | Verdict | Depth |
|---|---|---|---|---|
| 2026-07-29 | Zwtorh9Plx0 | Automate Your Entire Lead Pipeline With Hermes | ingested | shallow |
| 2026-07-29 | 3Y0EU6N6ADY | This NEW AI AGENT BEATS CHATGPT 5! | skipped-off-niche | shallow |
| 2026-07-29 | iIU3Daq4LHU | New Gemini Notebook Update is INSANE! | skipped-off-niche | shallow |
| 2026-08-05 | rTSHFy9Lwlg | How I Ranked #1 in 7 Hours with Qwen 3.8 Max (FREE!) | ingested | shallow |
| 2026-08-05 | ut_PeUbmk4c | This NEW Agent Operating System is INSANE! | ingested | shallow |
| 2026-08-05 | PYbBddbflRo | Qwen 3.8 Max is NOW COMPLETELY FREE! Here's How.. | ingested | shallow |
| 2026-10-12 | k07iVkL1et8 | NEW Gemini Agent is Absolutely WILD! | skipped-off-niche | shallow |
| 2026-10-12 | eW1YKawY66Q | NEW Hermes Kanban Agent is CRAZY GOOD! | skipped-off-niche | shallow |
| 2026-10-12 | CmvFxu5aoUQ | Antigravity Just Built an Android App From ONE Prompt | skipped-off-niche | shallow |
| 2026-10-12 | uRw7zRiKmpg | Google Gemini NEW Updates Are CRAZY! | skipped-off-niche | shallow |
| 2026-10-12 | J3QsCAiIvOY | Perplexity Just Dropped Its New Embedding Models | skipped-off-niche | shallow |
| 2026-10-12 | 67LTrHDt8bA | Free Claude Code + OmniRoute is WILD! | skipped-off-niche | shallow |

Note: depth is `shallow` for all entries — the environment's network policy
blocks direct access to youtube.com (yt-dlp/direct curl get a 403 at the
proxy), so no auto-transcript could be fetched in either run. Judgment was
made from the RSS title + full video description + chapter markers (fetched
via Firecrawl, which reaches YouTube through separate infrastructure). This
channel posts several times a day; only the 3 newest were reviewed per run
per the per-advisor cap. No videoId overlap between the 2026-07-29 and
2026-08-05 runs.

Note (2026-10-12, local weekly task): all six newest uploads are AI-tool launch or agent-demo videos, filtered on title before any credit was spent. Nothing read.

| 2026-11-07 | M532DfwIVnY | Grok Bot Limits? Move Your Bots to Hermes! | skipped-off-niche | shallow |
| 2026-11-07 | G0WqLjlSXNo | DeepSeek + REA Is INSANE | skipped-off-niche | shallow |
| 2026-11-07 | yvRLyJk_VTU | DeepSeek Harness Creator Mode Is Actually INSANE! | skipped-off-niche | shallow |
| 2026-11-07 | y11eideTqE8 | NEW Google AI Just Got Massive Upgrades! | skipped-off-niche | shallow |
| 2026-11-07 | 0Cog6GN26w4 | Google Genie 4 Can Now Create Interactive AI Worlds! | skipped-off-niche | shallow |

Note (2026-11-07): this channel posts multiple times a day; the 5 newest at
check time are all general AI-tool/model-launch news (Grok/Hermes, DeepSeek,
Google AI, Genie 4) with no SEO/GEO angle, filtered before spending a read.
Last run's `tCwbbgGaPt0` ("hidden keyword" method) is not re-listed here — it
is logged in this same file on the `board/ingest-2026-10-31` branch (PR #101,
still open); this branch was cut from master before that PR merged.
