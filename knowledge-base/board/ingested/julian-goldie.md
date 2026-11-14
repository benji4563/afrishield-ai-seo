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

| 2026-11-14 | 6ixnrldW84w | Google AI Mode Just Got Hydrogen (SEO Is Changing) | ingested | shallow |

Note (2026-11-14): `6ixnrldW84w` — Firecrawl returned a 401 on the transcript
endpoint, but the full chapter list, description and cited sources were
readable and are what the wiki entry is built from; logged `shallow` since no
spoken transcript was read. `CkjWtplSWdU` ("AI SEO Full Course: 98% of It in 20
Minutes") was attempted but returned no transcript and no usable description —
left unreached and unlogged for a future run, same treatment as `M2KJ5-sFbbg`
on the Jono Catliff ledger. The other four newest uploads at check time
(Grok/Hermes routing, Higgsfield, a Gemini update, Fable+Blender) are general
AI-tool news with no SEO/GEO angle.
