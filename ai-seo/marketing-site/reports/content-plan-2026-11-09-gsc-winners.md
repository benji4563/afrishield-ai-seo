# afrishieldai.com content plan from Search Console winners (9 Nov 2026)

**Source:** Search Console screenshots from Ben, 9 Nov 2026 (~3 months; 173 queries, 59 pages). Keyword volumes: company engine (`keyword_orchestrator.py`, Apify), runs `afri-ng-maps-2026-11-09` (ng/en) and `afri-cm-fr-2026-11-09` (cm/fr), ~$1.20 total. Added to `content-queue.md` as rows 63–67 on 2026-11-10.

## What wins

| Page | Clicks | Impressions |
|---|---|---|
| / (homepage) | 5 | 94 |
| /blog/top-geo-ai-seo-agencies-africa-2026 | 2 | 37 |
| /ai-seo/douala | 2 | 23 |
| /blog/how-to-appear-on-google-maps-in-lagos | 1 | 29 |
| /about | 1 | 27 |
| /blog/ai-search-visibility-study | 1 | 18 |

**Seen but never clicked:** `/blog/how-to-appear-on-google-maps` 527 impressions, `/blog/how-long-does-seo-take` 315, `/blog/ai-seo-vs-traditional-seo` 110, `/blog/how-to-get-more-website-traffic` 72. Earlier queue notes put the first two around positions 69–75, with UK/AU demand: unwinnable global terms.

**Pattern:** narrow + local wins (Douala, Lagos, Africa-qualified). The 24 Sep pivot to city-qualified posts is confirmed. Google Maps visibility is the site's biggest demand signal: 6 of the top 10 queries (~300 impressions).

## Next posts, in order

| # | Post | Evidence | Links |
|---|---|---|---|
| 1 | **How to put your business on Google Maps in Nigeria** (setup + verification, not ranking) | ng/en: "how do i put my business on google map" 210 CI 3 · "how do you put your business on google maps" 210 · "how can i put my business on google" 210 · list/register/add variants 40–70 each | Lagos maps, Nigeria not-showing, GBP optimization, Nigeria reviews |
| 2 | **Créer sa fiche d'établissement Google au Cameroun** (FR; merges queue row 47) | cm/fr: "fiche d'établissement google" 50 · "fiche google my business" 20 · "google my business créer un compte" 20 · ~8 variants at 10 | /ai-seo/douala, référencement naturel douala, agence seo cameroun. Example: Niss Optique, public facts only |
| 3 | **Référencement naturel / agence SEO à Yaoundé** (FR) | No measurable volume; justified by Cameroon French pages being the best performers (Douala page 2 clicks) | Douala posts, Cameroon fiche post |
| 4 | **How to rank on Google Maps in Abuja** (queue row 55, top-up branch) | Localizes the Lagos winner; "seo company in abuja" 10 CI 0 | Lagos maps, Nigeria setup (#1) |
| 5 | **AI SEO vs traditional SEO for African businesses** | Generic page has 110 impressions, 0 clicks; localize per the proven-performer rule. Volume unverified | Generic post, homepage |

## Quick wins on existing pages (no new posts)

- **DONE 2026-11-12:** Add a prominent "In Nigeria / au Cameroun / in Kenya" box linking to the city versions on `/blog/how-to-appear-on-google-maps` (527 impressions) and `/blog/how-long-does-seo-take` (315), so the traffic Google already sends finds the pages that win.
- Query "google maps visibility tool" (32 impressions): consider a Google Maps check on `/ai-visibility-check`. A product decision for Ben.


## Update 12 Nov 2026 (Search Console with positions, from Ben)

- **Generic posts rank 62–70 worldwide:** Google Maps 69.1 (529 impressions), how long SEO takes 68.1 (316), AI SEO vs traditional 69.5 (112), rank on ChatGPT 62.1 (84). Top generic queries sit at 49–88. All 0 clicks.
- **Local and brand pages are on page 1:** /about 5.2, homepage 7.2, Lagos Maps 7.5, top agencies Africa 9.9. Near misses: /blog/ai-search-visibility-study 16.0, /ai-seo/douala 36.0 (2 clicks).
- **By country:** US + UK + AU + CA = 1,025 impressions at 56–70, 0 clicks. Cameroon 9 clicks / 112 impressions at 16.1; Nigeria 1 / 87 at 36.9; South Africa 51 at 62.9.
- **Cameroon queries** (country filter): only 6 listed, ~11 impressions, 0 clicks; buyer terms rank 61–91 ("seo services in cameroon" 91, "local seo cameroon" 61). The 9 Cameroon clicks come from searches Google hides for privacy, so their source is not known. A query filter for "afrishield" returned 0, which does not settle it (query filters drop hidden searches). Next check: Pages tab with Country = Cameroon.
- **Cameroon search demand is tiny** (~10 impressions in 3 months on SEO terms), so leads there will come from Maps/GBP, Bing Places, directories, social and referrals; Nigeria carries the search demand.

**Actions taken 12 Nov:**
1. `components/blog/LocalVersions.tsx` added; the box "Reading from Africa? Start with your market." now sits under the Short answer on `/blog/how-to-appear-on-google-maps` and `/blog/how-long-does-seo-take`, linking Nigeria, Cameroon (FR), Kenya, Ghana and South Africa pages.
2. `content-queue.md` queued rows re-ordered to rotate markets (63 Nigeria Maps first); Tanzania (68) and South Africa Maps (69) added as candidates.
3. **Blocked:** the Apify token for the keyword engine was rejected on 12 Nov, so Tanzania/South Africa volumes could not be checked. Renew the token in `00 Knowledge/Keyword Finder/.env`, then promote 68/69.
4. Every new local post that goes live gets added to the box on the matching generic post.
