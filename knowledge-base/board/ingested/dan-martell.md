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
| 2026-09-02 | f5aDPccdHHw | "What was your best investment?" | skipped-off-niche | shallow |
| 2026-09-02 | 0rkUYeyUjzQ | Best bang for your buck marketing strategy | ingested | shallow |
| 2026-09-02 | 3Q6TCIEwHiA | Your bank account cannot surpass your self belief | skipped-off-niche | shallow |

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

Note (2026-09-02, shallow pass): direct youtube.com access (curl/yt-dlp) is
blocked again, so this run used Firecrawl search + scrape against the watch
pages directly (title, description, page metadata, on-page transcript where
YouTube exposed one) rather than an RSS feed. Several search hits were
false positives — either a *different* channel ("Dan Martell Daily",
@DanMartellDaily) that reuses his name/likeness, or unrelated creators'
videos that merely surface his channel as a "related" suggestion — all were
verified against the uploader link/channel_id (UCA-mWX9CvCTVFWRMb9bKc9w) and
discarded when they didn't match. Of the 3 newest confirmed genuine uploads,
two were short-form personal/mindset clips (off-niche) and one was a
short-form outbound-marketing tactic (on-niche, ingested). A longer-form,
clearly on-niche upload ("How to start a 1-person business with AI (ask
these 3 questions)", 1BApLicRt1w, 2026-08-26) was seen but is older than the
3 selected and was intentionally left unprocessed per the recency cap — it
should surface again in a future run if upload volume slows.
