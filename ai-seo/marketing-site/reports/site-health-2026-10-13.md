# AfriShield weekly site-health report — 2026-10-13

**Run:** local desktop routine, Tuesday 2026-10-13 08:02 WAT. All ten checks were performed; none was skipped.
**Overall status: AMBER**

AMBER for one reason only: the phone number in `local-seo/business.json` and the phone number the site displays are different numbers. That is a known open decision of Ben's, not a new fault. Everything else measured this run passed, and last week's AMBER (12 days without a post) has cleared — the blog routine ran for the first time on Monday and published.

## Checks

| # | Check | Result | What was measured |
|---|-------|--------|-------------------|
| 1 | Live routes | **PASS** | All 18 paths returned 200. `http://afrishieldai.com` and `https://www.afrishieldai.com` both 308 to `https://afrishieldai.com/`. `http://www.` 308s to `https://www.` first, then on to the canonical host (two hops, unchanged from last week). |
| 2 | Publishing throughput | **PASS** | Newest `published` date in `lib/posts.ts` on `origin/master` is **2026-10-12** (`how-to-appear-on-google-maps-in-lagos`) — 1 day ago. `afrishield-blog-post` is `enabled`, `lastRunAt` 2026-10-12 10:02 UTC. `list_task_runs` shows 1 run in total: Mon 2026-10-12, `succeeded`. That is the only scheduled slot since the last report, so no slot was missed and no run failed. Next slot: Wed 2026-10-14 11:00. |
| 2b | Distribution (LinkedIn) | **PASS** | The newest entry carries a `linkedin` field. The run's own report says the post was published to the AfriShield AI company page in one call with no retry (`urn:li:share:7515353926859218946`). I did not open LinkedIn to confirm it independently. |
| 3 | Queue depth | **PASS** | 11 `queued` rows in `content-queue.md` on `origin/master` (rows 34–44). Next three: `how to get more google reviews in nigeria`, `how long does seo take in nigeria`, `référencement naturel douala`. `afrishield-queue-topup` is `enabled`; 1 run on record, 2026-10-12 02:04 UTC, `succeeded`. Queue is above the 8-row top-up threshold; next top-up check Thu 2026-10-15. |
| 4 | Feed integrity | **PASS** | `/rss.xml` parses as XML; 25 items, matching 25 posts in `lib/posts.ts`; newest-first; all 25 guids unique and each equal to its link. **Guid drift: none** — all 24 guids from last week's appendix are present unchanged, plus one new guid for Monday's post. Autodiscovery `<link>` present in the `<head>` of `/` and `/blog`. |
| 5 | Contact and conversion | **PASS** | GET `/api/contact` returns 405. `/review` returns 200 and contains one `<form>` with a `<textarea>`. |
| 6 | Entity signals | **PASS, GBP still not found** | Homepage JSON-LD carries `sameAs` on both `Organization` and `ProfessionalService` (the LinkedIn company page). `SITE.googleReviewUrl` is still unset, so `/review` shows no Google button — expected. A web search for an AfriShield AI Google Business Profile returned only the site's own pages: no profile, no reviews. `business.json` records a number as "the number on the Google profile", but its `gbp.profile_url` is blank and no public profile surfaced in search. |
| 7 | Build integrity | **PASS** | No other build was running (the only node processes were MCP servers). `npx next build` exited 0 in 60s: compiled, 55 static pages generated, all 25 blog slugs emitted. The site folder matched `origin/master` when the build started, but see the note below the table: uncommitted edits to three site files landed while it was running, so this build may not be a clean build of master. |
| 8 | Performance | **PASS** | Three samples each. `/`: TTFB 0.38–0.42s, total 0.56–0.60s. `/blog`: TTFB 0.38–0.40s, total 0.52–0.56s. `/pricing`: TTFB 0.39–0.48s, total 0.50–0.56s. In line with the 0.4s / 0.55s baseline and faster than last week's homepage reading (0.70–0.80s total). |
| 9 | GEO and technical audit | **PASS** | `geo_audit.py`: **759 pass, 0 warn, 2 fail** across 46 pages. Last week: 743 / 0 / 2 across 45 pages. The difference is the new blog post (16 passes, 0 warn, 0 fail). No new warnings, no new fails. The two fails are the same as before, on `/` and `/pricing`: `LocalBusiness fields — missing: telephone or address, geo coordinates`. No fails on `robots.txt` (7 of 7 AI crawlers allowed and named), `sitemap.xml` (46 URLs), JSON-LD or raw-HTML content. No money page or blog post has lost its JSON-LD. |
| 9b | NAP consistency | **AMBER** | `business.json` records `+237-688-099-752`. The site displays `+1 (559) 543-5844` as its phone, and the `Organization` JSON-LD carries `+15595435844`. The Cameroon number does appear on the site, but only inside the WhatsApp link (`wa.me/237688099752`), not as the displayed phone or in the structured data. Open decision of Ben's; nothing was changed. |
| 10 | Indexation coverage | **PASS (flat)** | One `site:afrishieldai.com` search returned 31 distinct URLs, all of them in the sitemap: **31 of 46 surfacing — unchanged from the 2026-10-13 baseline**, which was taken earlier today, so no movement was expected. All 46 sitemap URLs were fetched: every one returns 200, none carries `noindex`, every one self-canonicalises. Nothing dropped out. |

**Uncommitted work in progress, seen during this run.** At 08:07, while this routine was running, another session edited `lib/site.ts`, `components/layout/Footer.tsx` and `app/contact/page.tsx` in the working tree. The edits switch the displayed business phone to `+237 688 099 752` and keep the US number as a separately labelled AI call line — in other words, the fix for the check 9b mismatch. They are **not committed and not live**: the live site still showed the US number when measured. This routine did not touch, commit or build-verify them. Once they ship, check 9b should clear.

**Check 10 method note.** The search tool errored three times at `limit: 60` and succeeded at `limit: 50`. It returned 31 results, below the limit, so the count is not truncated and is comparable with the baseline.

**Not surfacing (15), by path** — the same 15 as the baseline:

```
/ai-seo
/ai-seo/lagos
/ai-seo/abuja
/ai-seo/accra
/ai-seo/nairobi
/ai-seo/johannesburg
/ai-seo/douala
/ai-visibility-check
/about
/case-studies
/contact
/blog/how-to-appear-on-google-maps-in-lagos
/blog/enterprise-geo-launch-africa
/blog/how-to-reduce-ota-commission
/blog/answer-engine-optimization
```

**`local-seo/business.json` — fields still blank, all Ben's to supply:** `address.street`, `geo` (lat and lng), `opening_hours`, `gbp.profile_url`, `gbp.review_link`. `address.postal_code` is also empty. None was filled in.

## Action needed

1. **Decide which phone number is AfriShield's public number.** The site and its structured data say `+1 (559) 543-5844`; `business.json` says `+237 688 099 752`. Directories and a Google profile need one number used everywhere. This stays AMBER each week until the two agree.
2. **Supply the street address, coordinates, opening hours and Google profile and review links.** They are the cause of the only two audit fails and they hold back the Google button on `/review`.
3. **Confirm whether a Google Business Profile exists.** None is visible in search. If one has been created, its URL belongs in `business.json`.

Nothing else needs a human this week. The 15 pages not yet in Google are a matter of crawl time on a young domain, not a fault in the site.

## One thing to keep an eye on

Monday's blog run reported that the machine ran short of memory mid-run (93 MB free) and recovered before the build. Today's build had no trouble, but a low-memory morning could make a future blog run fail at the build step. Wednesday's run is the next test.

## Appendix — feed guids at 2026-10-13 (baseline for next week's drift check)

All prefixed `https://afrishieldai.com`, newest first:

```
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
