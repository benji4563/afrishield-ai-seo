# AfriShield weekly site-health report — 2026-10-08

**Run type:** primary weekly report (Monday)
**Overall status: AMBER**

## Checks

| # | Check | Result | Notes |
|---|-------|--------|-------|
| 1 | Live routes | **INFO — not verified** | This session's outbound HTTPS egress is denied by the environment's network policy for both `afrishield-ai-seo.vercel.app` and `afrishieldai.com` (agent-proxy: `connect_rejected — organization policy`). No HTTP status could be obtained for any of the required paths or the custom domain. This is an environment limitation, not evidence the site is down — see "Action needed." This same gap was first flagged in the 2026-08-06 report and is still unresolved two months later. |
| 2 | Build integrity | **PASS** | `npm install` (409 packages, 21s) then `npx next build` completed with no errors. All expected routes emitted, including all 24 blog slugs from `lib/posts.ts`, `/ai-seo/[city]` static params (lagos, abuja, accra, +3 more), `/api/contact`, `/api/call-summary`, `/sitemap.xml`, and `/llms.txt`. |
| 3 | Content schedule | **PASS** | DUE (campaign dates ≤ 2026-10-08): 15 of 15 (all Aug 2026 dates have passed). DONE (posts in `lib/posts.ts` with `published` ≥ 2026-08-03): 20. Site is ahead of schedule, not behind. `content-queue.md` has 12 `queued` rows in the active African-intent queue (rows 33–44) — well above the 4-row low-queue threshold. |
| 4 | Internal consistency | **FAIL (now fixed on this branch)** | All 24 posts in `lib/posts.ts` have a matching `app/blog/<slug>/page.tsx` (confirmed both by directory listing and by the Next.js build output) — no mismatches there. However, the post `ai-search-visibility-study` (published 2026-08-28, primary keyword `ai search visibility for african businesses`) was missing from `used-keywords.md` — likely never logged when it was published. **Fix included on this branch:** added the missing row to `used-keywords.md` (between the 2026-08-23 and 2026-08-30 entries, status `Live`). No other mismatches found. |
| 5 | Contact endpoint | **INFO — not verified** | Same network block as Check 1 — could not GET `/api/contact`. Build output confirms the route compiles as a dynamic function (`ƒ /api/contact`), so it should deploy correctly, but live availability (405/200 vs 404) was not confirmed this run. |
| 6 | Performance signal | **INFO — not verified** | Same network block as Check 1 — could not measure TTFB or byte size. |

## Action needed

1. **Still blocked: this routine's environment has no outbound HTTPS access to the production hosts.** Checks 1, 5, and 6 could not run at all this run, same as 2026-08-06. Someone with access to this environment's settings needs to add `afrishield-ai-seo.vercel.app` and `afrishieldai.com` to Allowed domains (or raise the network access level) so future runs can actually confirm live routes, the contact endpoint, and performance instead of reporting "unknown."
2. Nothing else outstanding — the `used-keywords.md` gap is fixed on this branch (PR). Content schedule and queue depth are both healthy.

## Not covered by this routine

Keyword rank positions, AI-answer presence (ChatGPT/Claude/Perplexity/Gemini), full Lighthouse scores, and true end-to-end contact-form submission need a SERP/DataForSEO connector or a headless browser (Playwright) that this cloud routine does not have; they are tracked separately in interactive sessions and via the planned Playwright + DataForSEO setup.
