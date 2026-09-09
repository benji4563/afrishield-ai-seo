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

Note: `8VyHKDSyCCo` and `LabRBZp2ODk` were first logged 2026-07-29 at `shallow`
depth (both `ingested`); the 2026-08-05 run re-read them at `deep` depth with a
full transcript and produced materially richer wiki entries, so the deep
entries above are what's kept — the shallow duplicates were dropped, not the
underlying videos. `0f3KbpW8TBk` carries the same title as `mGQdB3cMNGE`
(likely a re-upload/duplicate) but is a distinct videoId; the 2026-08-05 run
judged it `ingested` (a routing-rule + agent-safety finding), differing from
the 2026-07-29 run's `skipped-off-niche` call on the other ID — both rows are
kept since they're technically different videoIds.

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
