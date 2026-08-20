# Mike King (iPullRank) — ingestion ledger

Tracks processed videoIds so nothing is re-ingested. Verdicts:
`ingested` / `skipped-off-niche` / `skipped-nothing-new`. Depth: `deep` (full
transcript) / `shallow` (title+description fallback).

| Date | videoId | Title | Verdict | Depth |
|---|---|---|---|---|
| 2026-07-29 | Rqe_4g2cWA8 | SEO Week 2026 \| Zach Chahalis — Why You Need A Relevance Engineer Driving The Car | ingested | shallow |
| 2026-07-29 | fmN6Sw0un7w | SEO Week 2026 \| Garrett Sussman — Run Persona Run | ingested | shallow |
| 2026-07-29 | N4Mdv5t5upc | SEO Week 2026 \| Angela Clark — I Have a Degree for This | skipped-off-niche | shallow |
| 2026-08-05 | JjPfPT37li0 | Your Inbox Might Be the Next AI Search Signal | ingested | deep |
| 2026-08-05 | dTHuLMWDFWo | Search 2026 Halftime Show: What Happened and What's Next (w/ Mike King) | ingested | deep |
| 2026-08-05 | cDuoGFq0hj8 | AI Personalization: How Your Gmail Now Shapes Search Results | skipped-nothing-new | deep |

Note (2026-07-29, shallow pass): the environment's network policy blocks
direct access to youtube.com, so no auto-transcript could be fetched;
judgment was made from the RSS title + full description + chapter markers
(fetched via Firecrawl). `N4Mdv5t5upc` is about professional identity/
psychology under AI disruption, not a niche SEO/GEO tactic. See CHANNELS.md
for a channel-id correction made this run (the `@iPullRank` handle resolves
to Mike King's old personal channel, not the iPullRank company channel where
his current SEO Week / GEO content is actually posted).

Note (2026-08-05, deep pass): `cDuoGFq0hj8` is a short promotional excerpt of
the same Gmail-personalization experiment covered in full in `JjPfPT37li0` —
no new content beyond what's already logged there. No videoId overlap with
the 2026-07-29 run.

| 2026-08-19 | 578yMDdaGEA | SEO Value Happens After the Click - Brie Anderson - Inside SEO Week | ingested | deep |
| 2026-08-19 | 6qF8mRrtTms | Content Strategy Is Now a Differentiation Problem - Angela Clark - Inside SEO Week | ingested | deep |
| 2026-08-19 | VBH9Od_OL1Q | Training Data Is Quietly Deciding Winners in AI Search - Inside SEO Week - Metehan Yeşilyurt | ingested | deep |

Note (2026-08-19): this run turned up a large back-catalog of "Inside SEO
Week" pre-conference interview episodes on the iPullRank channel
(@iPullRankSEO), uploaded Feb–Apr 2026 ahead of the April 27–30 SEO Week
conference, which earlier runs' searches hadn't surfaced. Verified upload
dates (channel confirmed via scrape metadata) for the ones checked this run,
newest first: `578yMDdaGEA` 2026-04-23, `6qF8mRrtTms` 2026-04-22,
`VBH9Od_OL1Q` 2026-04-21, `BAf-PuMVVrs` 2026-04-17, `9WA6u0rdEqE` 2026-04-14,
`P-xIHhdZUPQ` 2026-03-31, `Pnx2pBunwDo` 2026-03-06, `WlOnSQ21qrI` 2026-03-03,
`mr4xAJZgu4w` 2026-02-03. Only the 3 newest were processed per the 3-per-run
cap; `BAf-PuMVVrs`, `9WA6u0rdEqE`, `P-xIHhdZUPQ`, `Pnx2pBunwDo`,
`WlOnSQ21qrI`, and `mr4xAJZgu4w` are confirmed on-channel, not yet logged,
and are candidates for the next run(s), roughly in that date order. Also
still unchecked from the same "Inside SEO Week" batch (title/date not yet
verified): `ZMtR0HJKbHs` (Jeff Coyle), `_TxSBJ-__WA` (Scott Stouffer),
`2le9gQ1X13U`, `sihcDRmyrEE` — worth a channel/date check before processing.

Also note (2026-08-19): extensive search this run for recent Mike-King
content mostly surfaced videos NOT on the iPullRank company channel —
uploaded instead by SUSO Digital (`4uCqqAMkIXc`, `s8RTiyMZLOI`, and the
`dTHuLMWDFWo` webinar's own channel), Search With Sean (`DptW_u5qXEw`),
Market Brew (`0PX_lAiHxYQ`), Harry Clarkson-Bennett (`S7wGXYDdRSE`), Wix,
Profound, Semrush, buzzstream, Instagram, etc. — guest appearances by Mike
King/iPullRank staff on other people's channels. Per CHANNELS.md scope
(iPullRank company channel only, `UCttOymj_FLE8d7xA7rEbsTw`), none of these
were logged or ingested even though several are on-topic and very recent;
future runs should keep filtering search results by uploader/channel before
treating a hit as a candidate.
