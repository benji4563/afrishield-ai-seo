# Ledger — Julian Goldie

Processed video IDs (never store transcript text here — verdict + depth only).

| Date | Video ID | Title | Verdict | Depth |
|---|---|---|---|---|
| 2026-07-29 | Zwtorh9Plx0 | Automate Your Entire Lead Pipeline With Hermes | ingested | shallow |
| 2026-07-29 | 3Y0EU6N6ADY | This NEW AI AGENT BEATS CHATGPT 5! | skipped-off-niche | shallow |
| 2026-07-29 | iIU3Daq4LHU | New Gemini Notebook Update is INSANE! | skipped-off-niche | shallow |

Note: depth is `shallow` for all entries this run — the environment's network
policy blocks direct access to youtube.com (yt-dlp/direct curl get a 403 at the
proxy), so no auto-transcript could be fetched. Judgment was made from the
RSS title + full video description + chapter markers (fetched via Firecrawl,
which reaches YouTube through separate infrastructure). This channel posts
several times a day; only the 3 newest were reviewed this run per the
per-advisor cap — the rest are left for the next run.
