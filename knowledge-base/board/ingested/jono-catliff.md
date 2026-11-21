# Jono Catliff — ingestion ledger

Tracks processed videoIds so nothing is re-ingested. Verdicts:
`ingested` / `skipped-off-niche` / `skipped-nothing-new` / `skipped-backlog`
(older than 60 days and not reached). Depth: `deep` (full
transcript) / `shallow` (title+description fallback).

| Date | videoId | Title | Verdict | Depth |
|---|---|---|---|---|
| 2026-07-29 | mGQdB3cMNGE | Anthropic Just Dropped Fable 5: Everything You Need To Know | skipped-off-niche | shallow |
| 2026-08-05 | 8VyHKDSyCCo | Claude Code Local Google Ads: Automate Everything ($730K Earned) | ingested | deep |
| 2026-08-05 | LabRBZp2ODk | Claude Code WordPress SEO: Automate Everything ($500K+ Earned) | ingested | deep |
| 2026-08-05 | 0f3KbpW8TBk | Anthropic Just Dropped Fable 5: Everything You Need To Know | ingested | deep |
| 2026-10-12 | vwzV-YsVswA | Claude Code Local SEO Agent: Automate Everything ($500K+ Earned) | skipped-nothing-new | deep |
| 2026-10-12 | _0wKlt1vHLY | Claude Code SEO Agent: Automate Everything ($500K+ Earned) | skipped-nothing-new | deep |
| 2026-10-12 | G2evmgrxIGQ | Claude Code Google Ads Agent: Automate Everything ($730K Earned) | skipped-off-niche | shallow |
| 2026-10-12 | R3mx8XHX8ns | FULL CLAUDE CODE MASTERCLASS: Beginner To Expert In 2 Hours (2026) | skipped-off-niche | shallow |
| 2026-10-12 | j1tcmbOHYZY | Claude Code Google Ads Audit: Fix Your Account In 1 Prompt (Steal This) | skipped-off-niche | shallow |

Note: `8VyHKDSyCCo` and `LabRBZp2ODk` were first logged 2026-07-29 at `shallow`
depth (both `ingested`); the 2026-08-05 run re-read them at `deep` depth with a
full transcript and produced materially richer wiki entries, so the deep
entries above are what's kept — the shallow duplicates were dropped, not the
underlying videos. `0f3KbpW8TBk` carries the same title as `mGQdB3cMNGE`
(likely a re-upload/duplicate) but is a distinct videoId; the 2026-08-05 run
judged it `ingested` (a routing-rule + agent-safety finding), differing from
the 2026-07-29 run's `skipped-off-niche` call on the other ID — both rows are
kept since they're technically different videoIds.

Note (2026-10-12): both SEO videos read in full from yt-dlp `en-orig` captions. They walk through the same commands that already exist here as the `local-seo` suite, so nothing new. The Google Ads videos and the general Claude Code masterclass are outside the SEO/GEO niche. `M2KJ5-sFbbg` (SEO audit, 2026-08-30) was not reached and is left unlogged for the next run.

| 2026-11-21 | 35UOT2I9dz0 | Claude Video Generation Makes Your Site Look Like $10,000 | skipped-off-niche | shallow |
| 2026-11-21 | UkM5Ty5HScc | Fix Ugly Claude Code Website Design With 4 Free Tools | skipped-off-niche | shallow |
| 2026-11-21 | XxB7IGUyJHg | Over 1,100 Passwords Leaked in Claude Code GitHub Repos | skipped-off-niche | shallow |
| 2026-11-21 | OkW90jcYUuk | 6 AI Apps Better Than ChatGPT, One Clones Your Voice | skipped-off-niche | shallow |
| 2026-11-21 | oewrREL3-Sco | Reverse Engineer Any Website in 4 Steps With Claude Code | skipped-off-niche | shallow |

Note (2026-11-21): five newest uploads are web-design/dev tooling (site design
fixes, website reverse-engineering, video generation for sites), a security-
news item, and a general AI-apps roundup — web-dev tooling, not SEO/GEO
specifically, consistent with the WordPress/Elementor skip pattern from
2026-10-31. `M2KJ5-sFbbg` still unreached.
