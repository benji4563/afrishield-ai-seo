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
| 2026-08-12 | XDBv_K5cpHU | Free Claude Code + Omniroute is SCARY GOOD! | ingested | deep |
| 2026-08-12 | okELDY1YY9Y | Grok Bot DESTROYS Hermes Agent? | skipped-nothing-new | deep |
| 2026-08-12 | TEwRO4150x0 | Prime Agent AI Just Changed Agents Forever | ingested | deep |
| 2026-08-19 | P8SXk6nQjGA | Claude Mythos 6 is COMING! | skipped-off-niche | deep |
| 2026-08-19 | 4B7xy43hVCQ | How to Rank #1 with DeepSeek Harness AI SEO | ingested | deep |
| 2026-08-19 | 1eJcRkRfEpI | NEW Grok 4.6 Beats GPT 5.6? | skipped-off-niche | deep |
| 2026-08-25 | DY8hs0bZ8CY | Rank #1 on Google FAST With This Claude SEO Skill | ingested | deep |
| 2026-08-24 | XXI3VYNFX90 | NEW Hermes Agent OS JUST Changed AI AGENTS Forever! | skipped-nothing-new | deep |
| 2026-08-23 | -7Gnfd3D9Ds | Run Hermes Agent Free Forever : Here's How! | skipped-nothing-new | deep |
| 2026-09-02 | O3BpnQ8U9LY | Google Just Changed Parasite SEO Forever | ingested | shallow |
| 2026-09-02 | MvgyhFX-ECk | Automate Anything wih Agent OS! | ingested | shallow |
| 2026-09-02 | _OC6lvCCurs | New Hermes Agent OS is Absolutely WILD! | ingested | shallow |
| 2026-09-09 | OzYlM4YVuwg | This AI SEO Agent OS is INSANE (FREE!) | ingested | shallow |
| 2026-09-09 | Wh6_CQKJXwE | Claude AI SEO OS System is INSANE! | ingested | shallow |
| 2026-09-09 | QOivt0EGrpQ | Hermes Agent Just Automated SEO Completely | ingested | shallow |
| 2026-09-23 | jBlNB7f7ogk | GPT-6 Sol + Luna Just Changed AI Agents | skipped-off-niche | deep |
| 2026-09-23 | ktfhWFbDUcE | Claude Opus 5.5 AI Just Changed Everything | ingested | deep |
| 2026-09-23 | 9jKTG3yJWH0 | Run Jev AI For FREE, Here's How! | ingested | deep |
| 2026-09-30 | 5yOO76v6KM0 | Claude Sonnet 5.5 AI SEO: How to Rank #1 in AI! | ingested | deep |
| 2026-09-30 | jzMepimRNng | Sonnet 5.5 DESTROYS GPT-6.1 Sol AI? | skipped-off-niche | deep |
| 2026-09-30 | RJEzrQHv0_o | I Tested OpenAI Dots...Worth it? | skipped-off-niche | deep |

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

Note: depth is `shallow` for the 2026-07-29 and 2026-08-05 entries — the
environment's network policy blocks direct access to youtube.com (yt-dlp/
direct curl get a 403 at the proxy), so no auto-transcript could be fetched.
Judgment was made from the RSS title + full video description + chapter
markers (fetched via Firecrawl, which reaches YouTube through separate
infrastructure). This channel posts several times a day; only the 3 newest
were reviewed per run per the per-advisor cap. No videoId overlap between the
2026-07-29 and 2026-08-05 runs.

Note (2026-08-12 run, depth methodology): direct youtube.com access was
still blocked at the network egress proxy this run too, and the YouTube Data
API (via Composio) explicitly refuses caption downloads for videos we don't
own (403 "only allows downloading captions for videos you own"). Channel
enumeration used the YouTube Data API's uploads-playlist endpoint instead of
RSS (same data, more reliable). For video understanding, used Firecrawl's
built-in YouTube post-processor, which returns a whole-video content summary
server-side (not just title/description) — logged as `deep` since it reflects
the full video's content, though it is Firecrawl's summary rather than a raw
transcript we read ourselves. No raw transcript or caption text was ever
fetched into or stored in this repo.

Note (2026-08-19 run): depth was `shallow` for all entries through 2026-08-05 because the
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

| 2026-09-16 | OI2by3seeNo | How to Run Hermes Agent FREE Forever! | ingested | deep |
| 2026-09-16 | Tna9xRHRHcI | How to Build Your Own Agent OS FREE | ingested | deep |
| 2026-09-16 | lGBYQqZdly0 | This n8n System Runs My Entire AI Community | ingested | deep |

Note (2026-09-16): direct youtube.com access was blocked by the environment's
network policy again this run, but Firecrawl's YouTube postprocessor returned
full transcripts for all 3 candidates — `deep` depth throughout. All 3 verdicts
carry an unverified-claim caveat per this advisor's "signal not gospel" stance.

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

Note (2026-09-30): channel listing was fetched via Firecrawl rawHtml +
`ytInitialData` JSON parse (per updated playbook); 30 uploads were returned,
all newer than the newest ledger entry, all from the last 24 hours — this
channel is now posting very high-frequency, mostly generic AI-model-release
coverage. Full transcripts were obtainable this run (depth=deep) for all 3
selected videos via Firecrawl markdown scrape of the watch page. 2 of 3 were
off-niche generic AI-model comparisons/reviews (GPT-6.1 Sol vs. other models;
an OpenAI "Dots" agent product review) with no SEO/agency angle, so nothing
was folded into the wiki from those two.
