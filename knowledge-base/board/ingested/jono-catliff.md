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
