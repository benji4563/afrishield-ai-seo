# AfriShield weekly site-health report — 2026-11-03

**Run:** local desktop routine, Tuesday 2026-11-03 08:01 WAT. All ten checks ran and none was skipped.
**Overall status: AMBER**

The site itself is healthy: every route, the feed, the build, the GEO audit and indexation pass, and indexation jumped to 56 of 57. Three things are AMBER, and all three are about the machinery that keeps the blog going, not about the site:

1. **The blog queue is down to 2 rows** and the only thing that refills it has failed three Thursdays running.
2. **Two blog slots were missed** since the last report (Tue 10-20 and Tue 10-27).
3. **Last Tuesday's health check (10-27) never ran.** It failed on DNS, so this report covers two weeks.

## Checks

| # | Check | Result | What was measured |
|---|-------|--------|-------------------|
| 1 | Live routes | **PASS** | All 18 paths returned 200. `http://afrishieldai.com` and `https://www.afrishieldai.com` both 308 to `https://afrishieldai.com/`. `http://www.` still takes two hops: a 308 to `https://www.`, then on to the canonical host. That is unchanged. |
| 2 | Publishing throughput | **AMBER** | The newest `published` date in `lib/posts.ts` on `origin/master` is **2026-11-02**, 1 day ago, which on its own is a PASS. Six posts have gone out since 10-20 (dated 10-22, 10-23, 10-26, 10-29, 10-30 and 11-02), taking the total from 30 to 36. `afrishield-blog-post` is `enabled`, with `lastRunAt` 2026-11-02 10:02 UTC. **Two of the eight Mon/Tue/Thu/Fri slots produced no post.** **Tue 10-20:** the run is marked `succeeded`, but its own transcript says it hit the usage limit after the read-only checks and published nothing. **Tue 10-27:** there was no run at all. The same morning this health check failed with `ENOTFOUND`, so the machine was probably offline or without DNS. Two other runs were irregular. The Thu 10-22 10:01 run stayed open until 10-26 and produced the safari post, dated 10-26, which filled Monday's slot. The Thu 10-29 run started at 12:15, not 11:00. No run is marked `failed`. |
| 2b | Distribution (LinkedIn) | **PASS** | The newest entry (`why-is-my-business-not-showing-on-google-maps-nigeria`) has a `linkedin` field. The 11-02 run reports "one LinkedIn post". I did not open LinkedIn to check it myself. |
| 3 | Queue depth | **AMBER** | Only **2 `queued` rows** remain in `content-queue.md` on `origin/master`: #43 `best seo agency in nigeria` and #44 `digital marketing vs seo for nigerian businesses`. There is no third. Today's 11:00 post leaves 1, and Thursday's leaves 0. **`afrishield-queue-topup` is `enabled`, but it has failed three weeks running** (10-15, 10-22 and 10-29), each time with `API Error: Can't reach the API server (ENOTFOUND)`. Its last success was 10-12. Its next run is Thu 11-05 08:12. If that run fails too, Friday 11-06's blog slot has nothing to write. |
| 4 | Feed integrity | **PASS** | `/rss.xml` parses as XML. It has 36 items, matching the 36 posts in `lib/posts.ts` exactly, in newest-first order. All 36 guids are unique and each one equals its link. **Guid drift: none.** All 30 guids in the 10-20 appendix are present and unchanged, plus 6 new ones. The autodiscovery `<link>` is in the `<head>` of both `/` and `/blog`. |
| 5 | Contact and conversion | **PASS** | A GET on `/api/contact` returns 405. `/review` returns 200 and has one `<form>` with a `<textarea>`. |
| 6 | Entity signals | **PASS** | The homepage JSON-LD has `sameAs` on both `Organization` and `ProfessionalService`. It now lists **six** profiles, up from three: LinkedIn, Crunchbase, Facebook, TechBehemoths, Clutch and GoodFirms. `SITE.googleReviewUrl` is set, and `/review` shows the Google review button linking to `https://g.page/r/CYDNL9fSd3mLEBM/review`. **GBP:** a plain web search for "AfriShield AI" Douala Google reviews returned a Crunchbase Douala listing but not the Google profile itself. That is not a fault. |
| 7 | Build integrity | **PASS** | No other `next` process was running (checked 08:06). I built a **clean sparse checkout of `origin/master` (`ad19ac4`)** in a temporary worktree with a fresh `npm ci`. `npx next build` exited 0: compiled in 51s and generated 68 static pages. **All 36 blog slugs were emitted**, and the emitted HTML set matches `lib/posts.ts` exactly. The worktree was removed afterwards. My first attempt failed before building with `Filename too long`, because the scratch path was too deep for Windows. Retrying from a short path fixed it. It was not a site fault. |
| 8 | Performance | **PASS, borderline** | Six samples per path, from two rounds. `/`: TTFB 0.55–0.66s, total 0.92–1.10s. `/blog`: TTFB 0.56–0.66s, total 0.90–1.03s. `/pricing`: TTFB 0.56–0.65s, total 0.74–0.89s. TTFB is at about 1.5× the 0.4s baseline. The homepage total reaches 2× the 0.55s baseline (1.10s) but does not exceed it. **Caveat:** the local connection was slow this morning. `https://www.google.com/` took 3.3s to its first byte in the same minute. So this run cannot separate a site regression from the network. Next week's samples will tell. |
| 9 | GEO and technical audit | **PASS** | `geo_audit.py`: **932 pass, 3 warn, 2 fail across 57 pages**. Last report: 839 / 0 / 2 across 51 pages. The 2 fails are unchanged: `/` reports `LocalBusiness fields — missing: geo coordinates`, and `/pricing` reports `missing: telephone or address, geo coordinates`. There are 3 new warnings, below the 5-warning AMBER threshold: `/case-studies` meta description is 188 chars; `/case-studies` definition block is 32 words (target 40–70); `/blog/agence-seo-cameroun` definition block is 74 words. No fails on `robots.txt`, `sitemap.xml`, JSON-LD or raw-HTML content. No money page or blog post has lost its JSON-LD. |
| 9b | NAP consistency | **PASS** | `business.json`: `+237-688-099-752`. Site: `+237 688 099 752`. JSON-LD `telephone`: `+237688099752`. They agree. The US line `+1 (559) 543-5844` still appears as a separately labelled line, as before. |
| 10 | Indexation coverage | **PASS (rising)** | One `site:afrishieldai.com` search at `limit: 60` returned 58 results. 56 were sitemap URLs. The other two were `eva.afrishieldai.com/privacy` and `/confidentialite`, which are a different subdomain. **56 of 57 sitemap URLs are surfacing, up from 39 of 51.** The only one absent is `/blog/why-is-my-business-not-showing-on-google-maps-nigeria`, published yesterday. All 57 sitemap URLs were fetched. Every one returns 200, none carries `noindex` (meta tag or `X-Robots-Tag`), and every one canonicalises to itself. |

### Check 10 detail

All 12 pages that were absent on 10-20 now surface, including the seven older posts that had dropped out of that week's sample. As that report suspected, they had fallen outside the sample, not out of Google's index, so no URL Inspection follow-up is needed. Five of the six new posts are already surfacing.

### `local-seo/business.json` — still blank

Still blank: **`geo.lat` / `geo.lng`** (both `null`) and **`address.postal_code`**. The missing coordinates are the cause of both remaining audit fails. Nothing was filled in by this run.

## Action needed

1. **Make sure Thursday's queue top-up works, or refill the queue by hand.** There are 2 rows left and the top-up has failed on DNS three weeks in a row. You can run `afrishield-queue-topup` manually before Thursday, while the connection is up, or add rows to `content-queue.md` directly. Otherwise Friday 11-06's post has no keyword. More broadly, the recurring `ENOTFOUND` failures (the top-up three times, the 10-27 health check, and the missed 10-27 blog slot) point to the machine's network or DNS on those mornings. It is the same problem the client blog routines hit in October.
2. **Supply AfriShield's office coordinates** (`geo.lat` / `geo.lng` in `business.json`). This is unchanged from the last report and is the only thing behind the two audit fails.

## Things to keep an eye on

- **A run marked `succeeded` that published nothing.** The 10-20 blog run ran out of usage and stopped cleanly, but the scheduler still shows it as succeeded. This check caught it only by reading the transcript, so it is worth knowing that a green run status does not mean a post went out.
- **Performance** is at the 2× line on the homepage total, but on a slow network morning. Re-measure next week.
- **The blog routine still runs on Tuesdays at 11:00**, three hours after this check. Today's build finished well before then.

## Appendix — feed guids at 2026-11-03 (baseline for next week's drift check)

All prefixed `https://afrishieldai.com`, newest first:

```
/blog/why-is-my-business-not-showing-on-google-maps-nigeria
/blog/seo-company-accra-ghana
/blog/how-to-check-if-chatgpt-recommends-your-business-in-africa
/blog/how-to-get-a-safari-company-recommended-by-ai
/blog/seo-agency-nairobi-cost
/blog/agence-seo-cameroun
/blog/referencement-naturel-douala
/blog/barometre-ia-cameroun-2026
/blog/ai-search-visibility-study-october-2026
/blog/how-long-does-seo-take-in-nigeria
/blog/how-to-get-more-google-reviews-in-nigeria
/blog/how-to-appear-on-google-maps-in-lagos
/blog/how-much-does-seo-cost-in-nigeria
/blog/top-geo-ai-seo-agencies-africa-2026
/blog/enterprise-geo-launch-africa
/blog/ai-search-visibility-study
/blog/content-marketing-for-small-business
/blog/how-to-get-more-website-traffic
/blog/how-to-appear-on-google-maps
/blog/how-to-improve-google-ranking
/blog/how-to-do-keyword-research
/blog/seo-vs-google-ads
/blog/local-seo-for-small-business
/blog/how-long-does-seo-take
/blog/is-seo-worth-it
/blog/how-to-rank-on-chatgpt
/blog/google-business-profile-optimization
/blog/how-to-get-hotel-cited-by-chatgpt
/blog/how-to-reduce-ota-commission
/blog/what-is-schema-markup
/blog/how-to-get-my-business-on-google
/blog/small-business-seo
/blog/answer-engine-optimization
/blog/what-ai-seo-actually-does
/blog/what-seo-actually-costs
/blog/ai-seo-vs-traditional-seo
```
