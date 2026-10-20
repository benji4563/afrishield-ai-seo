# AfriShield weekly site-health report — 2026-10-20

**Run:** local desktop routine, Tuesday 2026-10-20 08:01 WAT. All ten checks ran. None was skipped.
**Overall status: GREEN**

Every check passed. Last week's only AMBER, the phone-number mismatch, is gone: `business.json`, the JSON-LD `telephone` and the site's main displayed number are all now `+237 688 099 752`. There are two things to watch, listed at the end, but nothing failed.

## Checks

| # | Check | Result | What was measured |
|---|-------|--------|-------------------|
| 1 | Live routes | **PASS** | All 18 paths returned 200. `http://afrishieldai.com` and `https://www.afrishieldai.com` both 308 to `https://afrishieldai.com/`. `http://www.` still takes two hops: a 308 to `https://www.`, then on to the canonical host. That is unchanged. |
| 2 | Publishing throughput | **PASS** | The newest `published` date in `lib/posts.ts` on `origin/master` is **2026-10-19**, 1 day ago. Five posts went out since the last report, taking the total from 25 to 30. `afrishield-blog-post` is `enabled`, with `lastRunAt` 2026-10-19 10:01 UTC. Every scheduled slot since the last report has a successful run: Wed 10-14, Fri 10-16 and Mon 10-19 (the schedule changed to Mon/Tue/Thu/Fri on 10-17). No run failed and no slot was missed. Two of the three posts dated 10-19 (the Cameroon barometer and the October visibility study) came from an interactive session, not the routine. |
| 2b | Distribution (LinkedIn) | **PASS** | The newest entry (`referencement-naturel-douala`) has a `linkedin` field. The run's own report says it was posted once to company page 146729948 (`urn:li:share:7517954970894356480`, `PUBLISHED`). I did not open LinkedIn to check it myself. |
| 3 | Queue depth | **PASS, with a note** | 8 `queued` rows in `content-queue.md` on `origin/master` (rows 37–44). The next three are `agence seo cameroun` (French), `seo agency nairobi cost` and `how to get a safari company recommended by ai`. `afrishield-queue-topup` is `enabled`, but its **last run on Thu 2026-10-15 failed** with `ENOTFOUND` (DNS: it could not reach the API server). The queue had 11 rows that day, so the run would not have spent anything anyway. The queue is at 8, not under 8, so by the rule this is not AMBER. It will drop to 7 after today's 11:00 post, so Thursday's top-up is the first run that actually needs to work. |
| 4 | Feed integrity | **PASS** | `/rss.xml` parses as XML. It has 30 items, matching the 30 posts in `lib/posts.ts`, in newest-first order. All 30 guids are unique and each one equals its link. **Guid drift: none.** All 25 guids in last week's appendix are present and unchanged, plus 5 new ones. The autodiscovery `<link>` is in the `<head>` of both `/` and `/blog`. |
| 5 | Contact and conversion | **PASS** | A GET on `/api/contact` returns 405. `/review` returns 200 and has one `<form>` with a `<textarea>`. |
| 6 | Entity signals | **PASS** | The homepage JSON-LD has `sameAs` on both `Organization` and `ProfessionalService`. It now lists three profiles: LinkedIn, Crunchbase and Facebook. `SITE.googleReviewUrl` is set on the live site, and `/review` shows the Google review button linking to `https://g.page/r/CYDNL9fSd3mLEBM/review`. That link answers with a 302 (it resolves; it is not a 404). **GBP:** `business.json` now records a profile URL (`maps?cid=10050195790891044224`) and a review link. A plain web search for "AfriShield AI" Douala Google reviews brought up the site's own pages and a Sortlist agency listing, but not the Google profile. That is normal for a new profile, and it is not a fault. |
| 7 | Build integrity | **PASS** | No other `next` build was running. The blog routine's next slot is 11:00 today. To keep the many uncommitted edits in the working tree out of the build, I built a **clean sparse checkout of `origin/master`** (`4451db6`) in a temporary worktree with a fresh `npm ci`. `npx next build` exited 0: compiled in 2.4 minutes, 62 static pages generated, and **all 30 blog slugs emitted**, matching `lib/posts.ts` exactly. The temporary worktree was removed afterwards. |
| 8 | Performance | **PASS** | Three samples each. `/`: TTFB 0.40–0.55s, total 0.62–0.93s. `/blog`: TTFB 0.40–0.49s, total 0.57–0.65s. `/pricing`: TTFB 0.43–0.44s, total 0.52–0.56s. All are within 2× the 0.4s / 0.55s baseline. One homepage sample took 0.93s in total, and the other two took 0.62s and 0.74s. |
| 9 | GEO and technical audit | **PASS** | `geo_audit.py`: **839 pass, 0 warn, 2 fail across 51 pages**. Last week it was 759 / 0 / 2 across 46 pages, and the 5 new pages account for the difference. No new warnings and no new fails. The two fails are on the same pages as before, but one has narrowed. On `/` it is now `LocalBusiness fields — missing: geo coordinates` only, so telephone and address are fixed there. On `/pricing` it is still `missing: telephone or address, geo coordinates`. No fails on `robots.txt`, `sitemap.xml`, JSON-LD or raw-HTML content. No money page or blog post has lost its JSON-LD. |
| 9b | NAP consistency | **PASS (was AMBER)** | `business.json`: `+237-688-099-752`. Site header and footer: `+237 688 099 752`, labelled Cameroon. `Organization` JSON-LD `telephone`: `+237688099752`. WhatsApp: `wa.me/237688099752`. They all agree. The US number `+1 (559) 543-5844` still appears in the footer as a separate line "answered 24/7", which is fine because it is labelled as a separate line. |
| 10 | Indexation coverage | **PASS (rising)** | One `site:afrishieldai.com` search at `limit: 60` returned 40 results. 39 were sitemap URLs, and the other was `eva.afrishieldai.com/privacy`, a different subdomain. **39 of 51 sitemap URLs surfacing, up from 31 of 46.** All 51 sitemap URLs were fetched. Every one returns 200, none carries `noindex` (meta tag or header), and every one canonicalises to itself. See the note below about pages that dropped out. |

### Check 10 detail

**Not surfacing this week (12):**

```
/blog/ai-search-visibility-study-october-2026      new, 10-19
/blog/how-long-does-seo-take-in-nigeria            new, 10-16
/blog/how-to-get-more-google-reviews-in-nigeria    new, 10-14
/blog/how-to-appear-on-google-maps-in-lagos        absent last week too
/blog/how-to-reduce-ota-commission                 absent last week too
/blog/content-marketing-for-small-business         surfaced last week
/blog/how-to-appear-on-google-maps                 surfaced last week
/blog/how-to-do-keyword-research                   surfaced last week
/blog/how-to-get-hotel-cited-by-chatgpt            surfaced last week
/blog/how-to-get-more-website-traffic              surfaced last week
/blog/how-to-get-my-business-on-google             surfaced last week
/blog/top-geo-ai-seo-agencies-africa-2026          surfaced last week
```

**Newly surfacing since last week (15):** 13 of last week's 15 absent pages (`/ai-seo` and all six city pages, `/ai-visibility-check`, `/about`, `/case-studies`, `/contact`, `/blog/enterprise-geo-launch-africa` and `/blog/answer-engine-optimization`), plus two of this week's new posts (`/blog/referencement-naturel-douala` and `/blog/barometre-ia-cameroun-2026`). The arithmetic: 31 − 7 dropped + 15 new = 39.

**The seven "surfaced last week" posts are worth a look, but they are not yet a finding.** The total count went up, and a `site:` search returns a sample rather than a full list of indexed pages. The sample also shifts from week to week: 13 pages that were absent last week, including all of `/ai-seo/*`, appear this week. So these seven most likely fell outside this week's sample rather than out of Google's index. Next week's search is the second reading. If the same posts are still missing, open one in Search Console's URL Inspection to confirm. All seven return 200, are `index, follow` and canonicalise to themselves, so nothing on the site is blocking them.

### `local-seo/business.json` — still blank

`address.street`, `opening_hours`, `gbp.profile_url` and `gbp.review_link` **are now filled in** (by someone other than this routine). Still blank: **`geo` (lat and lng)** and **`address.postal_code`**. The missing coordinates are the cause of both remaining audit fails. Nothing was filled in by this run.

## Action needed

1. **Supply AfriShield's office coordinates** (`geo.lat` / `geo.lng` in `business.json`). It is the last missing field behind the two audit fails. `/pricing` also still reports a missing telephone or address in its LocalBusiness block, even though `/` no longer does, so it is worth checking whether `/pricing` uses the same structured-data source as the homepage once the coordinates go in.

Nothing else needs a human this week.

## Things to keep an eye on

- **The blog routine now runs on Tuesdays (11:00).** This routine was scheduled for Tuesday 08:00 so it would not overlap the blog run's build. Today's build finished well before 11:00, but if this run is ever delayed by about three hours, the two builds could collide. Moving this check to Wednesday would remove the risk.
- **The queue top-up failed on DNS on 10-15.** This is the same DNS problem that killed two of the client blog runs in October. At four posts a week, the 8 queued rows last two weeks. Thursday 10-22 is the first top-up that will actually need to add keywords (the queue will be at 7 after today's post).
- **French posts render English UI labels.** The 10-19 blog run flagged that `PostLayout.tsx` prints "Short answer:", "On this page" and the call-to-action box in English on French posts. Row 37 (`agence seo cameroun`) is French and is next in the queue, so it publishes today at 11:00 with the same English labels unless that is fixed first.

## Appendix — feed guids at 2026-10-20 (baseline for next week's drift check)

All prefixed `https://afrishieldai.com`, newest first:

```
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
