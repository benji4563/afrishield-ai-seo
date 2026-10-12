# Dan Martell — ingestion ledger

Tracks processed videoIds so nothing is re-ingested. Verdicts:
`ingested` / `skipped-off-niche` / `skipped-nothing-new` / `skipped-backlog`
(older than 60 days and not reached). Depth: `deep` (full
transcript) / `shallow` (title+description fallback).

| Date | videoId | Title | Verdict | Depth |
|---|---|---|---|---|
| 2026-07-29 | l8nwqbZNvdo | I don't care about grades or a report card | skipped-off-niche | shallow |
| 2026-07-29 | vd3uw10S8vo | The best success habits for a young entrepreneur | skipped-off-niche | shallow |
| 2026-07-29 | EdMkn1aNK2o | If you're using this AI tool, use it for... | skipped-nothing-new | shallow |
| 2026-08-05 | UvDgL8ShgXs | You're only 6 months away from changing your entire life | skipped-off-niche | deep |
| 2026-08-05 | xj5gZq159lM | If I Wanted to Make My First $100K/Month, I'd Do This | ingested | deep |
| 2026-08-05 | Bm84BAtOfQw | You're Not Behind (Yet): How to Build Your First AI Agent (Full Guide) | ingested | deep |
| 2026-10-12 | wtaRjOFqdyU | How to Make AI Sound EXACTLY Like you | ingested | deep |
| 2026-10-12 | 8R4rmc9NYpA | Brutal Life Lessons I Wish I Knew in My 20s | skipped-off-niche | shallow |
| 2026-10-12 | aPSbZbOzB4s | These Are the Best AI Tools in 2026 | skipped-off-niche | shallow |
| 2026-10-12 | 4_urJ17Rx8s | Give me 57 sec... I'll DELETE your need for perfection | skipped-off-niche | shallow |
| 2026-10-12 | _rBsOP658YA | You're only 6 months away from living your dream life | skipped-off-niche | shallow |
| 2026-10-12 | gfSVNJZgbOo | Change Your Entire Life In 20 Minutes (with AI) | skipped-off-niche | shallow |

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

Note (2026-10-12): `wtaRjOFqdyU` read in full from yt-dlp `en-orig` captions and kept because it bears on producing content for this service. The other five are motivation or tool round-ups.
