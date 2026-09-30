# Jono Catliff — ingestion ledger

Tracks processed videoIds so nothing is re-ingested. Verdicts:
`ingested` / `skipped-off-niche` / `skipped-nothing-new`. Depth: `deep` (full
transcript) / `shallow` (title+description fallback).

| Date | videoId | Title | Verdict | Depth |
|---|---|---|---|---|
| 2026-07-29 | mGQdB3cMNGE | Anthropic Just Dropped Fable 5: Everything You Need To Know | skipped-off-niche | shallow |
| 2026-08-05 | 8VyHKDSyCCo | Claude Code Local Google Ads: Automate Everything ($730K Earned) | ingested | deep |
| 2026-08-05 | LabRBZp2ODk | Claude Code WordPress SEO: Automate Everything ($500K+ Earned) | ingested | deep |
| 2026-08-05 | 0f3KbpW8TBk | Anthropic Just Dropped Fable 5: Everything You Need To Know | ingested | deep |
| 2026-08-19 | akhKWlfCMSg | Claude Code Local Google Ads: Automate Everything ($730K Earned) | skipped-nothing-new | shallow |
| 2026-09-02 | M2KJ5-sFbbg | Claude Code SEO Audit: Fix Your Whole Website In 1 Prompt (Steal This) | ingested | shallow |
| 2026-09-02 | -EInjdpjKy0 | Claude Code Google Ads: Automate Everything ($730K Earned) | skipped-nothing-new | shallow |
| 2026-09-02 | jzq3FUrQ-u0 | How To Land Your First AI Client As A Freelancer (100+ Beginners Did This) | ingested | shallow |
| 2026-09-23 | j1tcmbOHYZY | Claude Code Google Ads Audit: Fix Your Account In 1 Prompt (Steal This) | ingested | deep |
| 2026-09-23 | _0wKlt1vHLY | Claude Code SEO Agent: Automate Everything ($500K+ Earned) | ingested | deep |
| 2026-09-23 | M2KJ5-sFbbg | Claude Code SEO Audit: Fix Your Whole Website In 1 Prompt (Steal This) | ingested | deep |

Note: `8VyHKDSyCCo` and `LabRBZp2ODk` were first logged 2026-07-29 at `shallow`
depth (both `ingested`); the 2026-08-05 run re-read them at `deep` depth with a
full transcript and produced materially richer wiki entries, so the deep
entries above are what's kept — the shallow duplicates were dropped, not the
underlying videos. `0f3KbpW8TBk` carries the same title as `mGQdB3cMNGE`
(likely a re-upload/duplicate) but is a distinct videoId; the 2026-08-05 run
judged it `ingested` (a routing-rule + agent-safety finding), differing from
the 2026-07-29 run's `skipped-off-niche` call on the other ID — both rows are
kept since they're technically different videoIds.

| 2026-08-12 | -EInjdpjKy0 | Claude Code Google Ads: Automate Everything ($730K Earned) | skipped-nothing-new | deep |
| 2026-08-12 | jzq3FUrQ-u0 | How To Land Your First AI Client As A Freelancer (100+ Beginners Did This) | ingested | deep |
| 2026-08-12 | aHI8OG6gODA | Make Claude Code Write EXACTLY Like You (Free Templates) | ingested | deep |

Note (2026-08-12 run, depth methodology): direct youtube.com access remained
blocked at the network egress proxy; the YouTube Data API refuses caption
downloads for videos we don't own. Video understanding used Firecrawl's
built-in YouTube post-processor (whole-video summary, server-side) — logged
as `deep` on that basis. No raw transcript/caption text was fetched into or
stored in this repo. `-EInjdpjKy0` ("Claude Code Google Ads") covers the same
SKAG-structure + Claude-Code-automation + remarketing content already logged
in depth from `8VyHKDSyCCo` ("Claude Code Local Google Ads") — an earlier cut
of essentially the same masterclass, so nothing new to add.

Note (2026-08-19): `akhKWlfCMSg` is an **unlisted** re-upload of the already-
ingested `8VyHKDSyCCo` — identical title, description, chapter timestamps, and
near-identical runtime (1:22:54 vs 1:23:13), only 32 views. Uploaded
2026-07-01 (predates even the 2026-07-29 run) but wasn't surfaced by search
until this run, likely because it's unlisted. Verdict `skipped-nothing-new`
since its content is the same Google Ads/Claude Code system already captured
in the wiki from `8VyHKDSyCCo`; depth marked `shallow` because the call was
made from the matching description/chapter markers rather than re-reading the
duplicate's full transcript. No other new-to-ledger videos were found this
run — extensive search (site:youtube.com queries, his "Claude Code" and "SEO"
playlists, recency-filtered searches) turned up nothing genuinely new since
the 2026-08-05 batch; most search hits are *other* creators' similarly-titled
videos ("How I Use Claude Code for SEO...") that merely get recommended
alongside his flagship, not his own uploads — verify `Uploaded by` on every
candidate before treating it as his.

Note: the 2026-09-02 run was network-restricted to Firecrawl search/scrape
only (no yt-dlp/transcripts), so all three rows this run are `shallow`
depth. Search results for this channel carry a heavy rate of false
positives — other channels' videos that merely show "Jono Catliff" as a
YouTube sidebar suggestion — so every candidate was scraped and its
`Uploaded by` field checked against the channel before inclusion; several
apparent hits (a SEMrush-tutorial spam channel, an Instagram-lead-scraping
video, a "Julian Goldie SEO" video, all riding the same "Claude Code SEO"
keywords) were confirmed false positives and discarded without being
logged here. `-EInjdpjKy0` (2026-06-07) is the original/foundational
Google Ads masterclass that `8VyHKDSyCCo` ("...Local Google Ads...",
logged 2026-08-05) appears to build on and localize — its core tactics
(single-keyword ad groups, city×service matrix) are already captured in
the 2026-08-05 wiki entry, hence `skipped-nothing-new` rather than a
duplicate write-up.

Note (2026-09-09 run): no rows added — video discovery could not be completed
this run, so nothing was ingested. `firecrawl_scrape`/`firecrawl_search` (the
documented discovery path for this channel) returned "insufficient credits"
(HTTP 402) on every attempt; direct `youtube.com` and `yt-dlp` were blocked as
expected per the environment's known network policy; and `WebFetch` was
blocked by the egress proxy for every external domain tried, including
unrelated non-YouTube sites, so it could not substitute. Falling back to plain
web search surfaced a handful of candidate titles/videoIds, but the ones where
a publish date could be pinned down (an "AI search & SEO" optimisation video
and a WordPress/Claude-Code-related post) turned out to date from
March-to-June 2026 — well before the 2026-08-05 cutoff — not new uploads from
the ~5-week gap, and the rest carried no reliable date signal at all. Given
the no-fabrication rule, no videoId was added to this table on that shaky a
basis. Next run should retry the Firecrawl-based discovery once
credits/access are restored; if the channel genuinely posted nothing new
since 2026-08-05, that will also become clear once real discovery works
again.

| 2026-09-16 | 4IyJm1i__ag | Claude Code SEO: How I Got 50,000 Clicks Per Month (Steal This) | ingested | deep |
| 2026-09-16 | Gt8tT-xf6g4 | How I Built INSANE WordPress Websites In 20 Minutes (Claude Code) | ingested | deep |
| 2026-09-16 | M2KJ5-sFbbg | Claude Code SEO Audit: Fix Your Whole Website In 1 Prompt (Steal This) | skipped-nothing-new | deep |

Note (2026-09-16): direct youtube.com access was blocked by the environment's
network policy again this run, but Firecrawl's YouTube postprocessor returned
full transcripts for all 3 candidates — `deep` depth throughout. `M2KJ5-sFbbg`
is a repackaged, more generalized version of the already-logged Semrush-audit
auto-fix workflow (same consolidated on-page/technical/GEO approach); its
website-builder compatibility caveat and duplicate-city-page flagging are
minor elaborations, not a materially new technique.

Note (2026-09-23 run): the channel/videos page listed 30 videos, of which 27
had not been seen before (3 were the already-ledgered `8VyHKDSyCCo`,
`LabRBZp2ODk`, `0f3KbpW8TBk`). Per the routine's cap, only the 3 newest new
uploads (`j1tcmbOHYZY`, `_0wKlt1vHLY`, `M2KJ5-sFbbg`) were deep-analysed and
ledgered this run; all three had full, usable transcripts (depth `deep`). The
remaining 24 new videoIds were left untouched for a future run (newest-first
as seen on the channel page): `-EInjdpjKy0`, `jzq3FUrQ-u0`, `aHI8OG6gODA`,
`BTnU_cCx36Y`, `Gt8tT-xf6g4`, `2Gda_ZvV1V4`, `daXxItfCfR4`, `ru7fWKD4cyw`,
`4IyJm1i__ag`, `2TgOyMdQGFQ`, `GPCF1XKYiD8`, `xYv4_cTOSNM`, `vnSGv8UmfCo`,
`mtN2PdQ2V28`, `g1ip5LmiZMQ`, `3tsQf03U-j8`, `7nP2wjGcIXs`, `-IozMG9x0dI`,
`bcVcIXwAH-o`, `9FH0mG-0fEE`, `jhIV97AZ45M`, `YQ50E59YJ6U`, `DHGFV6BqF-A`,
`Q_OJ26E5_74`.
