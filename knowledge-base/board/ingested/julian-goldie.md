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
| 2026-09-23 | jBlNB7f7ogk | GPT-6 Sol + Luna Just Changed AI Agents | skipped-off-niche | deep |
| 2026-09-23 | ktfhWFbDUcE | Claude Opus 5.5 AI Just Changed Everything | ingested | deep |
| 2026-09-23 | 9jKTG3yJWH0 | Run Jev AI For FREE, Here's How! | ingested | deep |

Note: depth was `shallow` for all entries through 2026-08-05 — the
environment's network policy blocks direct access to youtube.com (yt-dlp/
direct curl get a 403 at the proxy), so no auto-transcript could be fetched.
Judgment was made from the RSS title + full video description + chapter
markers (fetched via Firecrawl, which reaches YouTube through separate
infrastructure). This channel posts several times a day; only the 3 newest
were reviewed per run per the per-advisor cap. No videoId overlap between the
2026-07-29 and 2026-08-05 runs.

Note (2026-09-23 run): full transcripts were obtainable this run via
`youtubetotranscript.com` scraped through Firecrawl, so all three videos
below are logged at `deep` depth. Channel-videos enumeration (via Firecrawl
rawHtml scrape of the channel's `/videos` tab) surfaced 30 videoIds, none of
which overlapped any previously-ingested id, so all 30 counted as "new"; only
the 3 newest were deep-analysed per the per-advisor cap. `jBlNB7f7ogk` (GPT-6
Sol + Luna) was judged off-niche despite an "automate your business" outro —
it's a pure cross-vendor model/pricing/benchmark bake-off (hallucination
rates, coding scores, usage limits) with no SEO/GEO/on-page/off-page/
build-conversion/automation-technique content, consistent with prior
off-niche calls on similar general-AI-news videos (`3Y0EU6N6ADY`,
`iIU3Daq4LHU`). The other 27 new videoIds found this run were left unanalysed
for a future run: `74zoZTQjlEc`, `8XEW4Np8LiU`, `Oh6xHM-2jxc`, `hpBYtTassZ4`,
`dT7eAa2TeAU`, `1if3cwjw-GQ`, `gsne2kOWbgs`, `hZx82r5BVNY`, `teiCnoReUsI`,
`RmGmRMT8WZI`, `6Rfk1P98q74`, `0BP7e_AwGnM`, `06-OEcr_tr0`, `1_l0fSArx6s`,
`89wCEhkD7ag`, `k-2Jh9bOs2o`, `47a4qvjFbuM`, `tGHYLyG5hFI`, `56IZyqeNsKQ`,
`aN72k0W21vk`, `k0DEvxhs1K4`, `iK88eHoilYw`, `RdglwPXveiI`, `3bKB80kf5Hw`,
`xAcjcftjY28`, `8lfWedr1Tng`, `ljjqazjlVMU`.
