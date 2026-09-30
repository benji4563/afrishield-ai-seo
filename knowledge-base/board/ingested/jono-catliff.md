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
