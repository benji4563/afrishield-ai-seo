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
| 2026-08-19 | 1MMqPTiWfSc | These AI Hacks Will Get You Ridiculously Ahead of Most People (Q&A) | ingested | deep |
| 2026-08-05 | 6poBPhfB-WY | How To Become Dangerously Self-Educated (with AI) | ingested | shallow |
| 2026-08-20 | 72DxhqI_50I | Should you skip, read, or study these books if you're a young entrepreneur? | skipped-nothing-new | shallow |

Note (2026-08-26 run): direct youtube.com access is still blocked by the
environment's network policy (confirmed again via yt-dlp — 403 at the proxy),
so no yt-dlp transcript fetch was possible. However, Firecrawl's scrape tool
now returns a YouTube-specific postprocessed result for some watch pages that
includes a full auto-caption transcript inline (no separate download step) —
`1MMqPTiWfSc` got this treatment and is logged `deep` on that basis; the other
two candidates only returned the standard page (rich description, no
transcript section), so they're `shallow`. This postprocessor's availability
seems inconsistent across videos/re-fetches, not tied to video length alone.
`72DxhqI_50I` is a 1:24 YouTube Short whose only text is the title itself
repeated as the description — no extractable substance beyond the (already
off-niche-adjacent, generic "should you read books" prompt) title, so
`skipped-nothing-new`. `6poBPhfB-WY` was published 2026-08-05, the same date
as the prior run, but was not one of the 3 videos that run selected — it's
genuinely new to this run. No videoId overlap with the 2026-08-05 run's own
selections.

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
