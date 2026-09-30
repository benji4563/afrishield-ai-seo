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

| 2026-08-12 | aUshhde15Kw | SEO Week 2026-ClickBait Ep 4 | skipped-off-niche | deep |
| 2026-08-12 | zEvikHPR_dA | SEO Week 2026-ClickBait Ep 3 | skipped-off-niche | deep |
| 2026-08-12 | 60OLPnCqYT0 | SEO Week 2026-ClickBait Ep 2 | skipped-off-niche | deep |

Note (2026-08-12 run): channel enumeration via the YouTube Data API's
uploads-playlist endpoint (Composio) found no upload newer than the
already-logged `dTHuLMWDFWo`; the next three unprocessed videos were a
short-form "ClickBait" interview-clip series from SEO Week 2026 (crowd
sentiment on AI and job anxiety/personalization ethics) — personal-identity/
psychology content in the same vein as the already-skipped `N4Mdv5t5upc`, not
a tactical SEO/GEO insight, so all three are off-niche. Video understanding
used Firecrawl's built-in YouTube post-processor (whole-video summary,
server-side) since direct youtube.com access and YouTube Data API caption
downloads (owner-only) were both unavailable this run; logged as `deep` on
that basis. No raw transcript/caption text was fetched into or stored in this
repo.
