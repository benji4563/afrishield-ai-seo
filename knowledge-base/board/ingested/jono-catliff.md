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
| 2026-09-02 | M2KJ5-sFbbg | Claude Code SEO Audit: Fix Your Whole Website In 1 Prompt (Steal This) | ingested | shallow |
| 2026-09-02 | -EInjdpjKy0 | Claude Code Google Ads: Automate Everything ($730K Earned) | skipped-nothing-new | shallow |
| 2026-09-02 | jzq3FUrQ-u0 | How To Land Your First AI Client As A Freelancer (100+ Beginners Did This) | ingested | shallow |

Note: `8VyHKDSyCCo` and `LabRBZp2ODk` were first logged 2026-07-29 at `shallow`
depth (both `ingested`); the 2026-08-05 run re-read them at `deep` depth with a
full transcript and produced materially richer wiki entries, so the deep
entries above are what's kept — the shallow duplicates were dropped, not the
underlying videos. `0f3KbpW8TBk` carries the same title as `mGQdB3cMNGE`
(likely a re-upload/duplicate) but is a distinct videoId; the 2026-08-05 run
judged it `ingested` (a routing-rule + agent-safety finding), differing from
the 2026-07-29 run's `skipped-off-niche` call on the other ID — both rows are
kept since they're technically different videoIds.

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
