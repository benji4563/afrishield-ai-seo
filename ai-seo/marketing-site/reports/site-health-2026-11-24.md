# AfriShield weekly site-health report — 2026-11-24

**Run:** local desktop routine, Tuesday 2026-11-24, 07:48–08:10 UTC. All ten checks ran and none was skipped.
**Overall status: AMBER**

The site is up and sound. Every route returns 200, the feed is clean, the build passes, and every sitemap URL is 200, indexable and self-canonical. The AMBER items are about the machinery around the site and one set of numbers worth watching:

1. **DNS failures keep killing scheduled runs.** Since 11-03, 18 blog runs, 4 queue top-up runs and 2 health-check runs failed with `ENOTFOUND`. Two blog slots got no post: **Tue 11-10** and **Mon 11-23**.
2. **The weekly health check missed two weeks.** 11-10 failed on DNS. On 11-17 it failed on DNS twice, then ran out of usage credits. So this report covers three weeks, from 11-03 to 11-24.
3. **The queue is at 7 rows** and the top-up failed all four tries on 11-19.
4. **Performance is slower,** past 2× the baseline on `/` and `/blog`. The local network was also slow, so this needs a re-measure.
5. **The GEO audit has 6 new warnings,** plus one transient fail.
6. **The indexation sample fell** from 56 of 57 to 46 of 71.

## Checks

| # | Check | Result | What was measured |
|---|-------|--------|-------------------|
| 1 | Live routes | **PASS** | All 18 paths returned 200. `http://afrishieldai.com/` and `https://www.afrishieldai.com/` both return 308 to `https://afrishieldai.com/`. |
| 2 | Publishing throughput | **AMBER** | The newest `published` date in `lib/posts.ts` on `origin/master` (`67e25a4`) is **2026-11-23**, 1 day ago, which on its own is a PASS. There are 47 posts now, up from 36, with 11 added since 11-03. `afrishield-blog-post` is **`enabled`**, with `lastRunAt` 2026-11-23 11:05 UTC; that run failed. **Slots since the last report:** 11-03 ✓ (best-seo-agency, dated 11-04) · 11-05 ✓ · 11-06 ✓ · 11-09 ✓, on the 4th try · **11-10 ✗**, 4 runs all `failed` with `ENOTFOUND` · 11-12 ✓ · 11-13 ✓ · 11-16 ✓ · 11-17 ✓, on the 4th try (opticien-douala, dated 11-18) · 11-19 ✓ late: three runs failed, then a fourth that started 18:59 UTC stayed open until 11-23 02:12 UTC and committed `ai-visibility-for-opticians-in-lagos` (`30d5654`, dated 11-23) · 11-20 ✓, on the 2nd try · **11-23 ✗**, 4 runs all `failed` with `ENOTFOUND`. That is **18 `failed` runs in total**. `africa-safari-hotel-ai-visibility-index-2026` (commit 11-17 03:23) does not match any blog-routine run, so it looks like a manual publish. Today's 11:00 slot has not fired yet. |
| 2b | Distribution (LinkedIn) | **PASS, not fully verified** | The newest entry (`ai-visibility-for-opticians-in-lagos`) has a `linkedin` field. The run that committed it does not say in its summary whether the LinkedIn post went out, and I did not open LinkedIn. If it was not posted, the copy is in the `linkedin` field of that entry in `lib/posts.ts`. The runs for 11-20, 11-16, 11-12 and 11-09 each report the LinkedIn post as published. |
| 3 | Queue depth | **AMBER** | **7 `queued` rows** in `content-queue.md` on `origin/master`. That is above the 4-row floor but under the top-up's 8. Next three in line: **#73** `seo for safari companies in tanzania`, **#78** `hotel marketing in arusha: getting found on google and ai`, **#72** `marketing digital pour clinique au cameroun`. `afrishield-queue-topup` is **`enabled`**. Its last success was 11-12, when it stopped because the queue held 8. **All four tries on 11-19 failed** with `ENOTFOUND`. Next run: Thu 11-26. Housekeeping: row 71 is still marked `claimed`, but its post (`visibilite-google-opticien-douala`) has been live since 11-18. |
| 4 | Feed integrity | **PASS** | `/rss.xml` parses as XML. It has 47 items, and the guid set matches the 47 slugs in `lib/posts.ts` exactly. Items are newest-first. All 47 guids are unique and each one equals its link. **Guid drift: none.** All 36 guids in the 11-03 appendix are present and unchanged, plus 11 new ones. The autodiscovery `<link>` is in the `<head>` of `/` and of `/blog`. |
| 5 | Contact and conversion | **PASS** | A GET on `/api/contact` returns **405**. `/review` returns 200 and has 1 `<form>` with a `<textarea>`. |
| 6 | Entity signals | **PASS** | The homepage JSON-LD has `sameAs` on both `Organization` and `ProfessionalService`, now **7 profiles each**, up from 6. `SITE.googleReviewUrl` is set, and `/review` shows the Google review button linking to `g.page/r/CYDNL9fSd3mLEBM/review`. **GBP:** `business.json` records a profile at `google.com/maps?cid=10050195790891044224`, and that URL returns 200. A plain web search for `"AfriShield AI" Douala Google reviews` returned no results this week, so the profile still does not surface in ordinary search. |
| 7 | Build integrity | **PASS** | No other `next build` was running. Two `next start` servers were up, and neither was a build. I built a clean sparse worktree of `origin/master` (`67e25a4`) with a fresh `npm ci`. `npx next build` exited 0: it compiled in 2.1 min and generated 93 static pages. **All 47 blog slugs were emitted**, and the emitted set matches `lib/posts.ts` exactly. The worktree was removed afterwards. |
| 8 | Performance | **AMBER, network-confounded** | Four samples per path. **`/`:** TTFB 0.79–1.12s, total 1.16–1.53s. **`/blog`:** TTFB 0.83–1.01s, total 1.20–1.40s. **`/pricing`:** TTFB 0.83–0.92s, total 1.00–1.15s. The baseline is about 0.4s TTFB and under 0.55s total, so `/` and `/blog` are past 2× on both measures. Last report's range was 0.55–0.66s TTFB. **Caveat:** in the same minute `google.com` took 0.65s to its first byte and `vercel.com` took 1.7s, so a large share of this is probably the local link, not the site. It has now been borderline-to-over for two reports running, so it deserves one measurement from a different network. |
| 9 | GEO and technical audit | **AMBER** | `geo_audit.py`: **1137 pass, 9 warn, 3 fail across 71 pages**. Last report: 932 / 3 / 2 across 57. **Fails:** `/` reports `LocalBusiness fields — missing: geo coordinates` (unchanged). `/pricing` reports `missing: telephone or address, geo coordinates` (unchanged). **New:** `/blog/referencement-naturel-douala` reports `HTTP no response`. I re-fetched it three times right after the audit and got 200 each time (about 1.2s), so this is a transient timeout on a slow connection, not a page fault. **Warnings:** 6 new, at the AMBER threshold. `/contact` title is 61 chars, its meta description is 175 chars, and its definition block is 23 words. The definition blocks in `/blog/visibilite-ia-coworking-yaounde` (71 words), `/blog/visibilite-google-opticien-douala` (72) and `/blog/creer-sa-fiche-etablissement-google-au-cameroun` (72) are all just over the 70-word target. Still open from last time: `/case-studies` meta description is 188 chars and its definition block is 32 words; `/blog/agence-seo-cameroun` definition block is 74 words. No fails on `robots.txt`, `sitemap.xml`, JSON-LD or raw-HTML content. **No money page or blog post lost its JSON-LD.** `local-seo/output/` was not committed. |
| 9b | NAP consistency | **PASS** | `business.json` phone: `+237-688-099-752`. Site: `+237 688 099 752`. Organization JSON-LD `telephone`: `+237688099752`. They agree. The US line `+1 (559) 543-5844` still shows as a separately labelled second line, unchanged from 11-03. |
| 10 | Indexation coverage | **AMBER (falling sample)** | One `site:afrishieldai.com` search at `limit: 60` returned 55 rows: **46 distinct URLs, all in the sitemap**. **46 of 71 sitemap URLs are surfacing, down from 56 of 57.** All 71 sitemap URLs were fetched. Every one returns 200, none carries `noindex` in a meta tag or `X-Robots-Tag`, and every one canonicalises to itself. The homepage canonical omits the trailing slash, which is equivalent. **No RED.** |

### Check 10 detail

**Dropped out since 11-03** (14 URLs that existed and surfaced then, absent now): `/ai-seo/abuja`, `/ai-seo/lagos`, `/resources/ai-visibility-checklist`, `/blog/agence-seo-cameroun`, `/blog/barometre-ia-cameroun-2026`, `/blog/enterprise-geo-launch-africa`, `/blog/how-to-do-keyword-research`, `/blog/how-to-get-more-website-traffic`, `/blog/how-to-improve-google-ranking`, `/blog/referencement-naturel-douala`, `/blog/seo-vs-google-ads`, `/blog/small-business-seo`, `/blog/what-is-schema-markup`, `/blog/what-seo-actually-costs`.

**New since 11-03 and not yet surfacing** (10): `/ai-seo/buea`, `/ai-seo/yaounde`, `/blog/ai-visibility-for-opticians-in-lagos`, `/blog/best-seo-agency-in-nigeria`, `/blog/digital-marketing-vs-seo-for-nigerian-businesses`, `/blog/how-to-put-your-business-on-google-maps-in-nigeria`, `/blog/marketing-agencies-in-nairobi`, `/blog/seo-company-in-kenya`, `/blog/visibilite-google-opticien-douala`, `/blog/visibilite-ia-coworking-yaounde`. Also still absent: `/blog/why-is-my-business-not-showing-on-google-maps-nigeria`.

**How to read this.** The search returned only 55 rows, and 9 of them were duplicate URLs with different titles. The tool is capping its sample, not listing the index. On 10-20, seven older posts seemed to drop out the same way, and all of them were back on 11-03. So the drop is probably the sample, not deindexation. Every URL is technically clean, so there is nothing to fix in the repo. If you want certainty, check *Pages → Indexed* in Search Console, or run URL Inspection on `/ai-seo/lagos` and `/blog/what-seo-actually-costs`.

### `local-seo/business.json` — still blank

Still blank: **`geo.lat` / `geo.lng`** (both `null`; `map_pin` reads `UNSET`) and **`address.postal_code`**, which is empty on purpose according to the file's own note. `address.street`, `opening_hours`, `gbp.review_link` and `gbp.profile_url` are now filled in. Missing coordinates still cause both standing audit fails. The file's notes also say they block Bing Places from publishing the listing. Nothing was filled in by this run.

## Action needed

1. **Fix the morning DNS dropouts on the machine that runs the routines.** This is the one root cause behind every AMBER on the routines. Since 11-03 it caused 24 failed runs, two empty blog slots, a failed queue top-up and two missed health checks. The same problem was flagged on 11-03 and is getting worse, not better.
2. **Run `afrishield-queue-topup` by hand, or make sure Thursday's run gets through.** The queue is at 7 and today's post takes it to 6. Last week's top-up never got through.
3. **Supply AfriShield's office coordinates** (`geo.lat` / `geo.lng` in `business.json`). This is unchanged and is the only thing behind the two standing audit fails.
4. **Optional:** confirm the 11-23 opticians-in-Lagos post reached LinkedIn. Its copy is in the `linkedin` field of that entry in `lib/posts.ts`.

## Things to keep an eye on

- **Performance:** if next week's samples are still past 2× on a normal network, it is a real regression.
- **Indexation sample:** if `/ai-seo/lagos` and the older guides are still missing next week, check Search Console instead of relying on the `site:` sample.
- **New warnings** on the French posts are definition blocks running 1–4 words over 70. The blog routine's French drafts are landing just over the target.

## Appendix — feed guids at 2026-11-24 (baseline for next week's drift check)

All prefixed `https://afrishieldai.com`, newest first:

```
/blog/ai-visibility-for-opticians-in-lagos
/blog/visibilite-ia-coworking-yaounde
/blog/visibilite-google-opticien-douala
/blog/africa-safari-hotel-ai-visibility-index-2026
/blog/creer-sa-fiche-etablissement-google-au-cameroun
/blog/how-to-put-your-business-on-google-maps-in-nigeria
/blog/seo-company-in-kenya
/blog/marketing-agencies-in-nairobi
/blog/agence-marketing-digital-douala
/blog/digital-marketing-vs-seo-for-nigerian-businesses
/blog/best-seo-agency-in-nigeria
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
