# AfriShield weekly site-health report — 2026-10-05

**Run type:** weekly (Monday)
**Overall status: AMBER**

## Checks

| # | Check | Result | Notes |
|---|-------|--------|-------|
| 1 | Live routes | **INFO — not verified** | This session's outbound HTTPS egress is denied by the environment's network policy for both `https://afrishield-ai-seo.vercel.app/*` and `https://afrishieldai.com/` — every request returned a `connect_rejected` / 403-at-gateway result (confirmed via the agent-proxy status endpoint, not just a single curl failure). None of the 29 required paths (home, `/solutions`, `/how-it-works`, `/pricing`, `/about`, `/case-studies`, `/blog`, `/contact`, `/sitemap.xml`, and all 24 blog slugs) could be checked. This is an environment limitation, not evidence the site is down — see "Action needed." This is the second occurrence of this exact block (also hit on the 2026-08-06 run). |
| 2 | Build integrity | **PASS** | `npm install` (409 packages, ~29s) then `npx next build` completed with no errors. All expected routes emitted, including all 24 posts in `lib/posts.ts`, the 6 `/ai-seo/[city]` pages, `/api/contact`, `/api/call-summary`, `/sitemap.xml`, `/llms.txt`, and the tourism/GEO landing pages. `npm install` flagged 7 high-severity advisories (`npm audit` for detail) — not a build blocker, but worth a look in an interactive session. |
| 3 | Content schedule | **PASS** | DUE (campaign dates ≤ 2026-10-05): 15 of 15 (all dates from 2026-08-03 through 2026-08-23 have passed). DONE (posts in `lib/posts.ts` with `published` ≥ 2026-08-03): 20. Site is ahead of the campaign schedule, not behind. `content-queue.md` has 12 `queued` rows (33–44) — well above the 4-row low-queue floor. |
| 4 | Internal consistency | **FAIL → fixed this run** | All 24 posts in `lib/posts.ts` have a matching `app/blog/<slug>/page.tsx` (confirmed by both directory listing and the build output rendering all 24 routes). But `ai-search-visibility-study` (primary keyword "ai search visibility for african businesses", published 2026-08-28, status Live) was missing from `used-keywords.md` — every other published slug since 2026-07-24 is tracked there except this one. **Fixed on this branch:** added the missing row to `used-keywords.md` (chronologically between the 2026-08-23 and 2026-08-30 entries) so the ledger matches what's actually live. No other mismatches found. |
| 5 | Contact endpoint | **INFO — not verified** | Same network block as Check 1 — could not GET `/api/contact` live. Build output confirms the route exists and compiles (`ƒ /api/contact`, dynamic), so it should deploy correctly, but live availability (405/200 vs. 404) was not confirmed this run. |
| 6 | Performance signal | **INFO — not verified** | Same network block as Check 1 — could not measure TTFB or payload size. |

## Action needed

1. **Fix the network/environment gap — now a repeat issue.** This routine's outbound HTTPS access to `afrishield-ai-seo.vercel.app` and `afrishieldai.com` was blocked on 2026-08-06 and is blocked again on this run. Checks 1, 5, and 6 — half the checklist — have now been unable to run on at least two separate occasions. Someone with access to the environment's network settings should add both hosts to the allowed domains (Custom network access, per the environment's settings in the session title bar), or confirm this routine is meant to run in a more permissive environment. Until that's done, this routine cannot certify live routes, the contact form, or performance as healthy — only as "unknown."
2. Internal-consistency gap (Check 4) is fixed on this branch — no further action needed there, but worth noting the queue-keeper/auto-poster scripts should cross-check `used-keywords.md` completeness as part of their own publish step so a Live post can't silently fall out of the ledger again.
3. Once network access is restored, re-run Checks 1, 5, and 6 for a real PASS/FAIL on live routes, the contact endpoint, and performance.

## Not covered by this routine

Keyword rank positions, AI-answer presence (ChatGPT/Claude/Perplexity/Gemini), full Lighthouse scores, and true end-to-end contact-form submission need a SERP/DataForSEO connector or a headless browser (Playwright) that this cloud routine does not have; they are tracked separately in interactive sessions and via the planned Playwright + DataForSEO setup.
