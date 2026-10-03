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
| 2026-09-30 | 5yOO76v6KM0 | Claude Sonnet 5.5 AI SEO: How to Rank #1 in AI! | ingested | deep |
| 2026-09-30 | jzMepimRNng | Sonnet 5.5 DESTROYS GPT-6.1 Sol AI? | skipped-off-niche | deep |
| 2026-09-30 | RJEzrQHv0_o | I Tested OpenAI Dots...Worth it? | skipped-off-niche | deep |

Note: depth is `shallow` for all entries through 2026-08-05 — the environment's
network policy blocked direct access to youtube.com (yt-dlp/direct curl get a
403 at the proxy), so no auto-transcript could be fetched in those runs.
Judgment was made from the RSS title + full video description + chapter
markers (fetched via Firecrawl, which reaches YouTube through separate
infrastructure). This channel posts several times a day; only the 3 newest
were reviewed per run per the per-advisor cap. No videoId overlap between the
2026-07-29 and 2026-08-05 runs.

Note (2026-09-30): channel listing was fetched via Firecrawl rawHtml +
`ytInitialData` JSON parse (per updated playbook); 30 uploads were returned,
all newer than the newest ledger entry, all from the last 24 hours — this
channel is now posting very high-frequency, mostly generic AI-model-release
coverage. Full transcripts were obtainable this run (depth=deep) for all 3
selected videos via Firecrawl markdown scrape of the watch page. 2 of 3 were
off-niche generic AI-model comparisons/reviews (GPT-6.1 Sol vs. other models;
an OpenAI "Dots" agent product review) with no SEO/agency angle, so nothing
was folded into the wiki from those two.
