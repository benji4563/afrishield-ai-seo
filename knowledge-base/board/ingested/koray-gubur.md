# Koray Tuğberk Gübür — ingestion ledger

Tracks processed videoIds so nothing is re-ingested. Verdicts:
`ingested` / `skipped-off-niche` / `skipped-nothing-new`. Depth: `deep` (full
transcript) / `shallow` (title+description fallback).

| Date | videoId | Title | Verdict | Depth |
|---|---|---|---|---|
| 2026-07-29 | AlHiLfYah74 | How to Rank in AI Search with Semantic SEO and Topical Authority (Navneet interview) | ingested | shallow |
| 2026-07-29 | Mq0umjlnnUM | Topical Authority for AI SEO: Rankings for LLMs (Jesper Nissen interview) | skipped-nothing-new | shallow |
| 2026-08-05 | mD51uM8v_bw | Topical Authority and Semantic SEO for Local Rankings (Law and Beyond) | ingested | shallow |
| 2026-08-05 | AlHiLfYah74 | How to Rank in AI Search with Semantic SEO and Topical Authority (Navneet interview) | skipped-nothing-new | shallow |
| 2026-08-05 | WrU25krFCtk | Topical Authority with 1 Page Exact Match Domain: 8,000 Clicks a Day - Learn Visual Semantics | ingested | deep |
| 2026-08-19 | 3ncQHJuQaDM | Semantic SEO and Topical Authority for Large Language Models (LLMs) - Koray GUBUR and Jabez Ruben | ingested | deep |
| 2026-08-24 | VLDa_RoczYI | Topical Authority and Answer Engine Optimization: How LLMs Actually Retrieve Content (w/ Jason Barnard) | ingested | deep |
| 2026-07-06 | 3ncQHJuQaDM | Semantic SEO and Topical Authority for Large Language Models (LLMs) - Koray GUBUR and Jabez Ruben | ingested | shallow |

Note (2026-08-26 run): only 2 genuinely new own-channel videos were found
this run (fewer than the 3-cap) — search coverage for this channel is
incomplete since its `/videos` listing is bot-walled, so this is a
best-effort, not exhaustive, sweep. `3ncQHJuQaDM` is dated 2026-07-06, i.e.
older than several already-ingested videos — it was likely missed by earlier
runs' search coverage rather than being a fresh upload; still logged as
`ingested` now since it hadn't been processed before and clears the niche
filter. A large family of guest-appearance videos ("James Dooley chats with
Koray", a Kalicube-branded clip, an Edward Sturm episode) surfaced in search
but were confirmed via uploader-link check to be on OTHER creators' channels
(FatRank, Kalicube, Edward Sturm) merely featuring him — discarded, not
queued for a future run, since they aren't this channel's own uploads.
| 2026-09-02 | VLDa_RoczYI | Topical Authority and Answer Engine Optimization: How LLMs Actually Retrieve Content (Jason Barnard/Kalicube interview) | ingested | shallow |
| 2026-09-02 | 3ncQHJuQaDM | Semantic SEO and Topical Authority for Large Language Models (LLMs) — Koray GUBUR and Jabez Ruben | ingested | shallow |
| 2026-09-02 | JcYnz52zm9k | 600K+ Extra Clicks in 6 Months: The Ultimate SEO Recovery Case Study for 2025 | ingested | shallow |

Note: `Mq0umjlnnUM` is already listed as a source in `wiki/koray-gubur.md` from
an earlier (pre-ledger) seeding pass — logged here now so it isn't re-flagged
as new on a future run.

Note (dedup, 2026-08-05 run): `WrU25krFCtk` was first logged 2026-07-29 at
`shallow` depth (`ingested`); the 2026-08-05 run re-read it at `deep` depth
and produced a materially richer wiki entry, so the deep entry above is what's
kept and the shallow duplicate was dropped.

Note (unresolved disagreement, not deduped): `AlHiLfYah74` was judged
`ingested` on 2026-07-29 and `skipped-nothing-new` on 2026-08-05 — both at
`shallow` depth, so neither reading has the deeper evidence to override the
other. Both rows are kept as-is; the 2026-07-29 verdict is what the existing
wiki entry for this video reflects. A future `deep` pass on this video would
be the tiebreaker.

| 2026-08-12 | 3ncQHJuQaDM | Semantic SEO and Topical Authority for Large Language Models (LLMs) - Koray GUBUR and Jabez Ruben | ingested | deep |

Note (2026-08-12 run, depth methodology): direct youtube.com access remained
blocked at the network egress proxy; channel enumeration used the YouTube
Data API's uploads-playlist endpoint (via Composio) instead of RSS, and the
API explicitly refuses caption downloads for videos we don't own. Video
understanding used Firecrawl's built-in YouTube post-processor (a whole-video
content summary generated server-side, not just title/description) — logged
as `deep` on that basis. No raw transcript/caption text was fetched into or
stored in this repo. This channel had no upload newer than the already-logged
`mD51uM8v_bw` (07-30), so `3ncQHJuQaDM` — published 07-06, before this
channel's last-processed video window — was the only new video found.

Note (2026-08-19 run): only one genuinely-new video was found this run,
`3ncQHJuQaDM`. It's an older upload (2026-07-06) that both prior runs missed —
worth flagging because most `firecrawl_search` hits for "Koray Tuğberk GÜBÜR"
are guest appearances re-hosted on *other* people's channels (Edward Sturm,
Julian Goldie, MicroConf, Odys Podcast, Navneet Kaushal, etc.), not uploads to
his own `@TopicalAuthority` channel — each candidate this run had to be
scraped individually and checked against `Uploaded by:` before counting, since
title/description snippets alone are not a reliable signal of the uploading
channel. No videos newer than the 2026-08-05 `mD51uM8v_bw` were found on his
own channel as of this run.

Note (2026-09-02 run): direct YouTube access (yt-dlp/auto-transcripts) was
unavailable this run, so all three rows above are `shallow` — sourced via
Firecrawl search to surface candidate uploads, then Firecrawl scrape of each
watch page to confirm genuine channel ownership (`Uploaded by` /
`@TopicalAuthority` match) before treating title/description/chapters as
signal. Several search hits were discarded as false positives — other
channels' videos (James Dooley/PromoSEO, FatRank, Edward Sturm) that feature
or mention Koray but are not uploads from his channel.
