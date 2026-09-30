# Dan Martell — ingestion ledger

Tracks processed videoIds so nothing is re-ingested. Verdicts:
`ingested` / `skipped-off-niche` / `skipped-nothing-new`. Depth: `deep` (full
transcript) / `shallow` (title+description fallback).

| Date | videoId | Title | Verdict | Depth |
|---|---|---|---|---|
| 2026-07-29 | l8nwqbZNvdo | I don't care about grades or a report card | skipped-off-niche | shallow |
| 2026-07-29 | vd3uw10S8vo | The best success habits for a young entrepreneur | skipped-off-niche | shallow |
| 2026-07-29 | EdMkn1aNK2o | If you're using this AI tool, use it for... | skipped-nothing-new | shallow |
| 2026-08-05 | UvDgL8ShgXs | You're only 6 months away from changing your entire life | skipped-off-niche | deep |
| 2026-08-05 | xj5gZq159lM | If I Wanted to Make My First $100K/Month, I'd Do This | ingested | deep |
| 2026-08-05 | Bm84BAtOfQw | You're Not Behind (Yet): How to Build Your First AI Agent (Full Guide) | ingested | deep |

Note (2026-07-29, shallow pass): the environment's network policy blocked
direct access to youtube.com, so no auto-transcript could be fetched;
judgment was made from the RSS title + description (fetched via Firecrawl).
That run's 3 newest uploads were short-form clips: one on parenting/education
(off-niche), one generic "success habits" motivational short (off-niche per
the routine's own filter), and one AI-tool short whose description was just
the title repeated back with no extractable detail — no wiki update that run.

Note (2026-08-05, deep pass): full transcripts were available this run. The 3
newest uploads had moved on from the prior run's short-form clips to
longer-form business/AI-leverage content — first wiki update logged this run.

| 2026-08-12 | ClanUPjNFsg | Lessons I learned from exiting my first company | ingested | deep |
| 2026-08-12 | J_RORdJqAeo | How to make money in 2026 with AI automation | ingested | deep |
| 2026-08-12 | _s8ve8O8S-s | Don't say these words in sales | ingested | deep |

Note (2026-08-12 run, depth methodology): direct youtube.com access was
blocked again at the network egress proxy, and the YouTube Data API refuses
caption downloads for videos we don't own. This channel posts ~3x/day, so the
3 newest new videos were all from 2026-08-11, well past the previously-logged
videos. Video understanding used Firecrawl's built-in YouTube post-processor
(whole-video summary, server-side) — logged as `deep` on that basis, though
it is Firecrawl's summary rather than a raw transcript read directly. No raw
transcript/caption text was fetched into or stored in this repo. All 3 were
short-form clips but each carried one concrete, non-overlapping tactical
point (exit-readiness, automation-retainer pricing, sales word-swaps).
