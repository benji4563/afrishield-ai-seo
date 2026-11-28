# Mike King (iPullRank) — ingestion ledger

Tracks processed videoIds so nothing is re-ingested. Verdicts:
`ingested` / `skipped-off-niche` / `skipped-nothing-new` / `skipped-backlog`
(older than 60 days and not reached). Depth: `deep` (full
transcript) / `shallow` (title+description fallback).

| Date | videoId | Title | Verdict | Depth |
|---|---|---|---|---|
| 2026-07-29 | Rqe_4g2cWA8 | SEO Week 2026 \| Zach Chahalis — Why You Need A Relevance Engineer Driving The Car | ingested | shallow |
| 2026-07-29 | fmN6Sw0un7w | SEO Week 2026 \| Garrett Sussman — Run Persona Run | ingested | shallow |
| 2026-07-29 | N4Mdv5t5upc | SEO Week 2026 \| Angela Clark — I Have a Degree for This | skipped-off-niche | shallow |
| 2026-08-05 | JjPfPT37li0 | Your Inbox Might Be the Next AI Search Signal | ingested | deep |
| 2026-08-05 | dTHuLMWDFWo | Search 2026 Halftime Show: What Happened and What's Next (w/ Mike King) | ingested | deep |
| 2026-08-05 | cDuoGFq0hj8 | AI Personalization: How Your Gmail Now Shapes Search Results | skipped-nothing-new | deep |
| 2026-10-12 | 578yMDdaGEA | SEO Value Happens After the Click - Brie Anderson - Inside SEO Week | skipped-nothing-new | deep |
| 2026-10-12 | 6qF8mRrtTms | Content Strategy Is Now a Differentiation Problem - Angela Clark - Inside SEO Week | ingested | deep |
| 2026-10-12 | VBH9Od_OL1Q | Training Data Is Quietly Deciding Winners in AI Search - Inside SEO Week - Metehan Yesilyurt | skipped-backlog | shallow |
| 2026-10-12 | BAf-PuMVVrs | AI Search Sentiment Might Matter More Than Rankings - Inside SEO Week - Ilana Gershteyn | skipped-backlog | shallow |
| 2026-10-12 | _TxSBJ-__WA | Your Content Has a Mathematical Footprint - Scott Stouffer - Inside SEO Week | skipped-backlog | shallow |
| 2026-11-28 | aNhNZmz5Twg | Agentic Marketing for CMOs: Where to Start, What to Build, and How to Measure It | skipped-off-niche | shallow |
| 2026-11-28 | NVcLF2reldk | The GEO Operating System | ingested | deep |
| 2026-11-28 | 95pZgi3Ax3U | How Do We Move Forward if the SERP Is Generative? | ingested | deep |
| 2026-11-28 | 9WA6u0rdEqE | The Next SEO Advantage Is Empathy - Angela Skane - Inside SEO Week | skipped-backlog | shallow |

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

Note (2026-10-12): the two newest unread uploads were read in full (Firecrawl transcripts). Both are short pre-conference interviews from April 2026. The three older April uploads are marked `skipped-backlog` unread: older than 60 days and outside this run's cap.

Note (2026-11-28, local weekly task): the two GEO videos read in full from yt-dlp `en-orig` captions. `aNhNZmz5Twg` is about staffing an enterprise marketing department with agents, judged from the title. `9WA6u0rdEqE` is an April Inside SEO Week clip, older than 60 days.

| 2026-11-28 | aNhNZmz5Twg | Agentic Marketing for CMOs: Where to Start, What to Build, and How to Measure It | ingested | deep |

Note (2026-11-28, this check): `aNhNZmz5Twg` re-read in full via Firecrawl
(not just the title) and reclassified `ingested`/`deep`, overriding the local
automation's same-day `skipped-off-niche`/`shallow` row above — both rows are
kept rather than overwritten, since the automation's row reflects a real
(title-only) pass and the disagreement itself is worth keeping visible. See
the wiki entry for why this is squarely on-niche.
