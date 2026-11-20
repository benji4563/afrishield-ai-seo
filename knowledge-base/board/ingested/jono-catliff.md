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

| 2026-10-31 | PvGnb8tKtgw | Claude Code SEO: Steal Your Competitor's Traffic (5 Prompts) | ingested | shallow |
| 2026-10-31 | yjOj5ZFybZI | Claude Code Removed The Last Reason To Use WordPress (And Elementor) | skipped-off-niche | shallow |

Note (2026-10-31): `PvGnb8tKtgw` — Firecrawl returned a 401 on the transcript
endpoint, but the full chaptered description (itself a thorough walkthrough) was
readable and is what the wiki entry is built from; logged `shallow` since no
spoken transcript was read. `yjOj5ZFybZI` is about replacing WordPress page-building
with Claude Code generally — a web-dev/tooling topic, not SEO/GEO specifically.
`M2KJ5-sFbbg` remains unreached.
