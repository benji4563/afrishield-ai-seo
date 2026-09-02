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
| 2026-09-02 | O3BpnQ8U9LY | Google Just Changed Parasite SEO Forever | ingested | shallow |
| 2026-09-02 | MvgyhFX-ECk | Automate Anything wih Agent OS! | ingested | shallow |
| 2026-09-02 | _OC6lvCCurs | New Hermes Agent OS is Absolutely WILD! | ingested | shallow |

Note: depth is `shallow` for all entries — the environment's network policy
blocks direct access to youtube.com (yt-dlp/direct curl get a 403 at the
proxy), so no auto-transcript could be fetched in either run. Judgment was
made from the RSS title + full video description + chapter markers (fetched
via Firecrawl, which reaches YouTube through separate infrastructure). This
channel posts several times a day; only the 3 newest were reviewed per run
per the per-advisor cap. No videoId overlap between the 2026-07-29 and
2026-08-05 runs.

2026-09-02 run: `site:youtube.com/watch "Julian Goldie SEO"` (tbs qdr:w) surfaced
~20 results; most were "Go to channel Julian Goldie SEO" suggestions on OTHER
creators' watch pages (e.g. videos about Hermes/Claude/Gemini from unrelated
channels that merely link to his channel) and were discarded as false
positives after scrape-confirming the uploader on each watch page. 4 genuinely
his (channel = UCGpsgNbzdF7BECCVbB1COHw) and not already in the known list were
found; the 3 newest (by `uploadDate` metadata, Aug 30–31) were processed. A
4th confirmed-genuine upload, "NEW GLiNER2.5 Just Dropped!" (juUZVyC02SM,
2026-08-26), was newer than the prior known set but older than the 3 selected
here — left unprocessed for a future run per the per-run cap.
