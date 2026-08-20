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
| 2026-08-19 | 6poBPhfB-WY | How To Become Dangerously Self-Educated (with AI) | skipped-off-niche | deep |
| 2026-08-19 | n7t68A0NQQM | How to Make Rich Friends (aka "How to Build a Billion-Dollar Network") | skipped-off-niche | deep |

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

Note (2026-08-19, deep pass): only 2 genuinely-new videos found on the main
@danmartell channel since the last run (channel has been quiet — no upload
between 2026-08-12 and today). Both were reviewed with full transcripts but
judged off-niche under the strict filter: the self-educated one is a
personal-learning/self-education methodology piece (AI-flavored but
education/self-improvement, not agency-scaling or SEO/automation ops), and
the rich-friends one is pure personal networking/relationship-building
advice with no SEO/AI-agency operational takeaway. No wiki update this run.
Also found a text-only blog post ("How To Prepare For A Future You Can't
Predict", danmartell.com, 2026-08-10) with no corresponding /watch?v= video
— per the routine's rule, blog-only content doesn't count as a video and was
not logged.
