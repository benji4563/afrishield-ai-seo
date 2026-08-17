# AfriShield weekly site-health report — 2026-08-17

**Run type:** weekly check (Monday — primary report)
**Overall status: AMBER**

## Checks

| # | Check | Result | Notes |
|---|-------|--------|-------|
| 1 | Live routes | **INFO — not verified** | This session's outbound HTTPS egress is blocked by the environment's network policy for external hosts. Confirmed via both `curl` (proxy returned `403 Forbidden` on the CONNECT tunnel, logged as `connect_rejected` by the agent proxy) and `WebFetch` (`EGRESS_BLOCKED` error) against `https://afrishield-ai-seo.vercel.app/`. This is an environment limitation, not evidence the site is down — see "Action needed." This is the same restriction observed in the 2026-08-06 report; it has not been lifted since. |
| 2 | Build integrity | **PASS** | `npm install` (409 packages, 19s) then `npx next build` (Next.js 16.2.11, Turbopack) completed with no errors — TypeScript checked clean, all 34 pages generated. Routes emitted include all required paths: `/`, `/solutions`, `/how-it-works`, `/pricing`, `/about`, `/case-studies`, `/blog`, `/contact`, `/sitemap.xml`, `/api/contact` (dynamic), plus all 14 `/blog/<slug>` posts and several extra tourism/GEO landing pages. |
| 3 | Content schedule | **PASS** | DUE (campaign dates ≤ 2026-08-17): 9 (2026-08-03, 05, 07, 10, 11, 12, 13, 14, 17). DONE (posts in `lib/posts.ts` with `published` ≥ 2026-08-03): 10. Site is on schedule (one post ahead, `local-seo-for-small-business` published today). `content-queue.md` has 7 `queued` rows — above the 4-row low-queue threshold, so the queue is healthy. |
| 4 | Internal consistency | **PASS** | All 14 posts in `lib/posts.ts` have a matching `app/blog/<slug>/page.tsx` (14 directories, exact match). All 14 published `primaryKeyword` values appear in `used-keywords.md` marked `Live`. No mismatches. |
| 5 | Contact endpoint | **INFO — not verified** | Same network block as Check 1 — could not GET `/api/contact`. Build output confirms the route exists and compiles (`ƒ /api/contact`, dynamic), so it should deploy correctly, but live availability was not confirmed this run. |
| 6 | Performance signal | **INFO — not verified** | Same network block as Check 1 — could not measure TTFB/byte size. |

## Action needed

1. **The network/environment gap from 2026-08-06 is still open.** This scheduled routine's session has no outbound HTTPS access to `afrishield-ai-seo.vercel.app` (confirmed blocked by both `curl`-via-proxy and `WebFetch`, both returning explicit egress-policy denials rather than a timeout). Checks 1, 5, and 6 could not run at all, for the second consecutive report. Someone with access to this environment's network policy should allow this routine's egress to `afrishield-ai-seo.vercel.app` and `afrishieldai.com`, or this routine will keep reporting AMBER on infrastructure it cannot actually check.
2. Content schedule and internal consistency are both healthy — no action needed there.
3. Once network access is restored, re-run Checks 1, 5, and 6 to get real PASS/FAIL confirmation on live routes, the contact endpoint, and performance.

## Not covered by this routine

Keyword rank positions, AI-answer presence (ChatGPT/Claude/Perplexity/Gemini), full Lighthouse scores, and true end-to-end contact-form submission need a SERP/DataForSEO connector or a headless browser (Playwright) that this cloud routine does not have; they are tracked separately in interactive sessions and via the planned Playwright + DataForSEO setup.
