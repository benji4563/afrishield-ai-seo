# AfriShield weekly site-health report — 2026-10-12

**Run:** local desktop routine, Monday 2026-10-12 06:17 WAT (the task is scheduled for Tuesdays; this firing came a day early and finished well before the blog routine's 11:00 slot).
**Overall status: AMBER**

AMBER for one reason: the blog has published nothing for 12 days, and the routine meant to fix that has not yet run once. Everything measured on the live site passed.

## Checks

| # | Check | Result | What was measured |
|---|-------|--------|-------------------|
| 1 | Live routes | **PASS** | All 18 paths returned 200: `/`, `/blog`, `/pricing`, `/solutions`, `/how-it-works`, `/contact`, `/review`, `/geo-services`, `/for-lodges-hotels`, `/for-safari-operators`, `/for-tourism-hospitality`, `/ai-seo`, `/ai-seo/lagos`, `/ai-seo/douala`, `/sitemap.xml`, `/rss.xml`, `/robots.txt`, `/llms.txt`. `http://afrishieldai.com` and `https://www.afrishieldai.com` both 308 to `https://afrishieldai.com/`. `http://www.` 308s to `https://www.` first, then on to the canonical host (two hops). |
| 2 | Publishing throughput | **AMBER** | Newest `published` date in `lib/posts.ts` on `origin/master` is **2026-09-30** (`how-much-does-seo-cost-in-nigeria`) — **12 days of silence**. `afrishield-blog-post` is `enabled`, but has **no `lastRunAt` and 0 runs** in `list_task_runs`. Its first slot is today, Mon 2026-10-12 at 11:00. No run has failed, because none has happened; whether the routine works is still unproven. |
| 2b | Distribution (LinkedIn) | **AMBER** | The newest post entry has **no `linkedin` field**. No entry in `lib/posts.ts` has one — the field exists only in the type definition. No LinkedIn copy for the 2026-09-30 post is stored in the repo, so there is nothing to post by hand; it would need writing. |
| 3 | Queue depth | **PASS** | 12 `queued` rows in `content-queue.md` on `origin/master` (rows 33–44). Next three: `how to appear on google maps in lagos`, `how to get more google reviews in nigeria`, `how long does seo take in nigeria`. `afrishield-queue-topup` is `enabled`; one run on record, 2026-10-12 02:04 UTC, status `succeeded`. Queue is above the 8-row top-up threshold. |
| 4 | Feed integrity | **PASS, one part not performed** | `/rss.xml` parses as XML; 24 items, matching 24 posts in `lib/posts.ts`; newest-first; all 24 guids unique and each equal to its link. Autodiscovery `<link>` present in the `<head>` of `/` and `/blog`. **Guid drift since last week: not performed** — no earlier report recorded the guids, so there was nothing to compare against. This week's list is in the appendix as the baseline. |
| 5 | Contact and conversion | **PASS** | GET `/api/contact` returns 405. `/review` returns 200 and contains one `<form>` with a `<textarea>`. |
| 6 | Entity signals | **PASS, GBP still absent** | Homepage JSON-LD carries `sameAs` on both `Organization` and `ProfessionalService` (the LinkedIn company page, one URL each). `SITE.googleReviewUrl` is unset (`NEXT_PUBLIC_GOOGLE_REVIEW_URL` empty), so `/review` shows no Google button and says the Google profile is being set up — expected. A web search for "AfriShield AI" Google Business Profile returned no profile and no reviews. |
| 7 | Build integrity | **PASS** | No other build was running. `npx next build` exited 0 in 29s: compiled, TypeScript clean, 54 static pages generated, all 24 blog slugs emitted. The working tree for the site matched `origin/master`. |
| 8 | Performance | **PASS, slightly slower than baseline** | Three samples each. `/`: TTFB 0.52–0.60s, total 0.70–0.80s (170 KB). `/blog`: TTFB 0.45–0.51s, total 0.57–0.68s (101 KB). `/ai-seo`: TTFB 0.45–0.52s, total 0.56–0.63s (71 KB). Baseline is about 0.4s TTFB and under 0.55s total; the homepage is roughly 35–45% over on total time, not near the 2× flag line. The homepage gained a panoramic hero image on 2026-10-12, which may account for it — not confirmed. |
| 9 | GEO and technical audit | **PASS (unchanged from baseline)** | `geo_audit.py`: **743 pass, 0 warn, 2 fail** across 45 pages — identical to the 2026-10-12 baseline. The two fails are the same check on `/` and `/pricing`: `LocalBusiness fields — missing: telephone or address, geo coordinates`. No fails on `robots.txt` (7 of 7 AI crawlers allowed and named), `sitemap.xml` (45 URLs), JSON-LD presence or raw-HTML content. No money page or blog post has lost its JSON-LD. No earlier report in `reports/` carries a score to compare against; the comparison is to the baseline in the task file. |

`local-seo/business.json` **does not exist** in the marketing site root. It is step 0 of the `local-seo` suite and has to be filled in with Ben; until it exists the Google Business Profile, NAP and review modules cannot run for AfriShield's own site.

## Action needed

1. **Check that today's 11:00 blog run actually publishes.** It is the routine's first ever run. If `lib/posts.ts` on master still shows 2026-09-30 as the newest post this afternoon, the routine is failing and publishing has been stopped for 12 days and counting. At 15 days this report goes RED.
2. **LinkedIn for the 2026-09-30 Nigeria pricing post.** No copy was stored and nothing indicates it was posted. Decide whether to write and post it by hand or let it go.
3. **Business address, phone and coordinates.** The only two audit fails, both waiting on real details from Ben. The same details are needed for `local-seo/business.json` and for a Google Business Profile, which still does not exist.

## Appendix — feed guids at 2026-10-12 (baseline for next week's drift check)

All prefixed `https://afrishieldai.com`, newest first:

```
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
