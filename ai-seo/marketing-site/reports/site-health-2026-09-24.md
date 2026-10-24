# AfriShield weekly site-health report — 2026-09-24

**Run type:** mid-week check (Thursday)
**Overall status: AMBER**

## Checks

| # | Check | Result | Notes |
|---|-------|--------|-------|
| 1 | Live routes | **INFO — not verified** | This session's outbound HTTPS egress is blocked by org network policy for the destination hosts. Confirmed via the agent proxy status endpoint: `CONNECT afrishield-ai-seo.vercel.app:443` and `CONNECT afrishieldai.com:443` both returned `403` (`connect_rejected`, "gateway answered 403 to CONNECT — policy denial"). This is an environment limitation, not evidence the site is down — see "Action needed." |
| 2 | Build integrity | **PASS** | `npm install` (409 packages, 16s) then `npx next build` completed with no errors — TypeScript checked clean. All 44 routes generated, including all 23 blog slugs currently in `lib/posts.ts`. |
| 3 | Content schedule | **PASS** (with a queue warning) | DUE (campaign dates ≤ 2026-09-24): 15/15 dates have passed. DONE (posts in `lib/posts.ts` with `published` ≥ 2026-08-03): 19. Site is **not** behind schedule. `content-queue.md` has only **1** row with status `queued` (row 9, "what is local seo") — below the 4-row floor. **Flagging as low queue.** |
| 4 | Internal consistency | **FAIL (fixed on this branch)** | All 23 posts in `lib/posts.ts` have a matching `app/blog/<slug>/page.tsx` — no mismatch there. But the slug `ai-search-visibility-study` (published 2026-08-28, primary keyword "ai search visibility for african businesses") was missing from `used-keywords.md` — it looks like this original-research post was written outside the normal keyword-queue process and never logged. **Fix included on this branch:** added the missing row to `used-keywords.md` in chronological order, matching the file's existing format/cluster convention (cluster B — service education AEO/GEO, claimed 2026-08-28, status Live). |
| 5 | Contact endpoint | **INFO — not verified** | Same network block as Check 1 — could not GET `/api/contact` live. Build output confirms the route exists and compiles (`ƒ /api/contact`, dynamic), so it should deploy correctly, but live availability was not confirmed this run. |
| 6 | Performance signal | **INFO — not verified** | Same network block as Check 1 — could not measure TTFB/byte size for `/`. |

## Action needed

1. **Recurring: allow-list this routine's environment for outbound HTTPS to `afrishield-ai-seo.vercel.app` and `afrishieldai.com`.** This is the third consecutive report (after 2026-08-03 and 2026-08-06) where Checks 1, 5, and 6 — the actual "is the site up" checks — could not run because the session's egress policy denies these hosts (confirmed 403 at the proxy/gateway level, not a site-side failure). Fix: in the cloud environment's settings (environment menu → Edit → Network access), either broaden the access level or add these two hosts to the allowed domains. Until that's done, this routine cannot certify live routes, the contact endpoint, or performance as healthy — only "unknown."
2. **Content queue is low.** Only 1 `queued` row remains in `content-queue.md` (below the 4-row floor), even though publishing is currently ahead of the campaign schedule. Worth running the next keyword-vetting/DataForSEO pass soon so the queue doesn't run dry.
3. Fixed on this branch: `used-keywords.md` was missing the `ai-search-visibility-study` post's keyword row — added.
4. Once network access is restored, re-run Checks 1, 5, and 6 to get real PASS/FAIL confirmation on live routes, the contact endpoint, and performance.

## Not covered by this routine

Keyword rank positions, AI-answer presence (ChatGPT/Claude/Perplexity/Gemini), full Lighthouse scores, and true end-to-end contact-form submission need a SERP/DataForSEO connector or a headless browser (Playwright) that this cloud routine does not have; they are tracked separately in interactive sessions and via the planned Playwright + DataForSEO setup.
