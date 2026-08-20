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
| 2026-08-19 | P8SXk6nQjGA | Claude Mythos 6 is COMING! | skipped-off-niche | deep |
| 2026-08-19 | 4B7xy43hVCQ | How to Rank #1 with DeepSeek Harness AI SEO | ingested | deep |
| 2026-08-19 | 1eJcRkRfEpI | NEW Grok 4.6 Beats GPT 5.6? | skipped-off-niche | deep |

Note: depth was `shallow` for all entries through 2026-08-05 because the
environment's network policy blocks direct access to youtube.com (yt-dlp/
direct curl get a 403 at the proxy). As of the 2026-08-19 run, Firecrawl's
per-video scrape reliably returned a full "## Transcript" section (not just
title+description), so all 3 videos reviewed this run got `deep` analysis —
first deep run for this channel. This channel posts several times a day;
only the 3 newest were reviewed per run per the per-advisor cap. No videoId
overlap with prior runs. Both off-niche skips this run were generic AI
model/industry news (a withheld Anthropic model, a Grok vs GPT benchmark
comparison) with no SEO/agency-specific angle beyond boilerplate "use AI in
your business" framing — consistent with the off-niche bar in CHANNELS.md.
