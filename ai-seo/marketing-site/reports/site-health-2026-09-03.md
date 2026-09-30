# AfriShield weekly site-health report — 2026-09-03

**Run type:** mid-week check (Thursday)
**Overall status: AMBER**

## Checks

| # | Check | Result | Notes |
|---|-------|--------|-------|
| 1 | Live routes | **INFO — not verified** | This session's outbound HTTPS egress is blocked by org network policy for *all* external hosts. Confirmed via both `curl` (through the configured agent proxy) and `WebFetch`: `https://afrishield-ai-seo.vercel.app/` → `CONNECT tunnel failed, response 403`; `https://afrishieldai.com/` → same; `https://www.google.com/` (neutral control) → same. This is an environment limitation, not evidence the site is down — this exact gap was already flagged in the 2026-08-06 report and is still unresolved almost a month later. See "Action needed." |
| 2 | Build integrity | **PASS** | `npm install` (409 packages, 27s) then `npx next build` (Next.js 16.2.11, Turbopack) completed with no errors. TypeScript check passed. All 41 routes generated, including all 23 `/blog/<slug>` pages and `/api/contact` (dynamic), `/sitemap.xml`, `/llms.txt`. |
| 3 | Content schedule | **PASS (ahead of schedule), queue LOW** | DUE (campaign dates ≤ 2026-09-03, all 15 dates in the list): 15. DONE (posts in `lib/posts.ts` with `published` ≥ 2026-08-03): 19. Site is ahead of the campaign schedule, not behind. However `content-queue.md` has only **1** row with status `queued` (row 9, `what is local seo` — itself stuck for 6 straight skipped runs on an unresolved duplication flag against `local-seo-for-small-business`), well under the 4-row low-queue threshold. The general-keyword pool is effectively empty; rows 16–21 (tourism-cluster candidates) still need a DataForSEO pass before they can be queued. |
| 4 | Internal consistency | **FAIL → fixed on this branch** | All 23 posts in `lib/posts.ts` have a matching `app/blog/<slug>/page.tsx` — no mismatch there. But `blog/ai-search-visibility-study` (published 2026-08-28, the 5-city AI-answer study) was **missing from `used-keywords.md`** — it was written and published without its primary keyword (`ai search visibility for african businesses`) ever being logged, breaking the "one row per claimed keyword, always" rule the queue system depends on. Fixed on this branch: added the missing row (see diff) in chronological position between the 2026-08-23 and 2026-08-30 entries. |
| 5 | Contact endpoint | **INFO — not verified** | Same network block as Check 1 — could not GET `/api/contact` live. Build output confirms the route compiles and is emitted as a dynamic function (`ƒ /api/contact`), so it should deploy correctly, but live availability was not confirmed this run. |
| 6 | Performance signal | **INFO — not verified** | Same network block as Check 1 — could not measure TTFB/byte size. |

## Action needed

1. **Fix the network/environment gap.** This routine's session again had zero outbound HTTPS access (every external host tested returned 403 at the proxy, including a neutral control site) — Checks 1, 5, and 6 could not run at all, for the second reported occurrence in a row (first flagged 2026-08-06). Someone with access to the environment's network egress policy should allowlist `afrishield-ai-seo.vercel.app` and `afrishieldai.com` for this routine, and confirm whether general web egress is intended to be available to it at all. Until that's fixed, this routine cannot actually confirm the live site is up — it can only certify the build and the content data.
2. **Content queue is nearly dry.** Only 1 `queued` row remains, and it's been skipped 6 runs running over an unresolved duplication call. Either resolve row 9 (narrow its angle or retire it) or get a DataForSEO pass done on the tourism candidates (rows 16–21) or fresh general-cluster keywords — otherwise the next auto-poster run reports "queue empty."
3. Once network access is restored, re-run Checks 1, 5, and 6 to get real PASS/FAIL confirmation on live routes, the contact endpoint, and performance.
4. This branch includes the `used-keywords.md` fix for the missing `ai-search-visibility-study` row (Check 4) — safe, data-only change, no site behavior affected.

## Not covered by this routine

Keyword rank positions, AI-answer presence (ChatGPT/Claude/Perplexity/Gemini), full Lighthouse scores, and true end-to-end contact-form submission need a SERP/DataForSEO connector or a headless browser (Playwright) that this cloud routine does not have; they are tracked separately in interactive sessions and via the planned Playwright + DataForSEO setup.
