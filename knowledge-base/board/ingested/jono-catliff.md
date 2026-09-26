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
| 2026-08-30 | M2KJ5-sFbbg | Claude Code SEO Audit: Fix Your Whole Website In 1 Prompt (Steal This) | ingested | shallow |
| 2026-09-06 | _0wKlt1vHLY | Claude Code SEO Agent: Automate Everything ($500K+ Earned) | ingested | shallow |

Note: `8VyHKDSyCCo` and `LabRBZp2ODk` were first logged 2026-07-29 at `shallow`
depth (both `ingested`); the 2026-08-05 run re-read them at `deep` depth with a
full transcript and produced materially richer wiki entries, so the deep
entries above are what's kept — the shallow duplicates were dropped, not the
underlying videos. `0f3KbpW8TBk` carries the same title as `mGQdB3cMNGE`
(likely a re-upload/duplicate) but is a distinct videoId; the 2026-08-05 run
judged it `ingested` (a routing-rule + agent-safety finding), differing from
the 2026-07-29 run's `skipped-off-niche` call on the other ID — both rows are
kept since they're technically different videoIds.

Note (2026-09-12 run): `M2KJ5-sFbbg` and `_0wKlt1vHLY` were judged from RSS
title/description only (`shallow`) — direct youtube.com access and yt-dlp
transcript fetch are both blocked in this environment, per the note already
on file in `julian-goldie.md` and `mike-king.md`. The 3-newest-per-advisor cap
was applied; the third-newest video at scan time (`8VyHKDSyCCo`, 2026-07-01
upload) was already in this ledger, so only these two required a fresh
verdict.
