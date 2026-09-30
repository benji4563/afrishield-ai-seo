# AfriShield weekly site-health report - 2026-09-21

**Run type:** primary weekly report (Monday)
**Overall status: AMBER**

## Checks

| # | Check | Result | Notes |
|---|-------|--------|-------|
| 1 | Live routes | **INFO — not verified** | This session's outbound HTTPS egress is blocked by org network policy for the target hosts. `curl` returned `connect_rejected` / gateway 403 on CONNECT for every request to `afrishield-ai-seo.vercel.app` and `afrishieldai.com`, and `WebFetch` independently returned `EGRESS_BLOCKED` for the same host. Confirmed via `/__agentproxy/status`. This is an environment limitation, not evidence of a site outage — no route was confirmed up or down this run. **This is the same block reported on 2026-08-03 and 2026-08-06 and has now gone unresolved for at least 7 weeks across multiple runs.** |
| 2 | Build integrity | **PASS** | `npm install` (409 packages, 17s) then `npx next build` (Next.js 16.2.11, Turbopack) completed with no errors. TypeScript passed. All 44 pages generated, including all 23 blog posts, `/sitemap.xml`, `/llms.txt`, and both API routes (`ƒ /api/contact`, `ƒ /api/call-summary`) compiled as dynamic. |
| 3 | Content schedule | **PASS (queue LOW)** | DUE (campaign dates ≤ 2026-09-21): 15/15 — every scheduled date has passed. DONE (posts in `lib/posts.ts` with `published` ≥ 2026-08-03): 19. DONE ≥ DUE, so the site is **not** behind schedule — it's ahead. However `content-queue.md` has only **1 `queued` row** (row 9, "what is local seo"), below the 4-row floor, so the queue is flagged **LOW**. Row 9 itself has been skipped 6 runs in a row (2026-08-18 through 2026-08-23) due to an unresolved duplication against `local-seo-for-small-business` and still needs a human decision (narrow the angle or retire it) — the general keyword pool is otherwise fully claimed (rows 1–15) and rows 16–31 remain `candidate`, awaiting a DataForSEO pass before they can be queued. |
| 4 | Internal consistency | **FAIL → fixed in this PR** | All 23 posts in `lib/posts.ts` have a matching `app/blog/<slug>/page.tsx` (verified directory-by-directory). However, `ai-search-visibility-study` (published 2026-08-28, primary keyword "ai search visibility for african businesses") had **no entry in `used-keywords.md`** — every other published slug does. Fixed on this branch by appending the missing row; its cluster is marked "TBD — needs mapping" since this is an original-research post with no existing cluster letter in `keyword-map.md`, and inventing a cluster classification is outside what this routine should decide. |
| 5 | Contact endpoint | **INFO — not verified** | Same network block as Check 1 — could not GET `/api/contact` live. Build output confirms the route exists and compiles (`ƒ /api/contact`, dynamic), so it should deploy correctly, but live availability was not confirmed this run. |
| 6 | Performance signal | **INFO — not verified** | Same network block as Check 1 — could not measure TTFB/byte size. |

## Action needed

1. **Escalate the network egress block.** This is not a one-off — it has now blocked Checks 1, 5, and 6 on every run where it was reported (2026-08-03, 2026-08-06, and again today, 2026-09-21). Someone with access to the environment's network policy needs to allow-list `afrishield-ai-seo.vercel.app` and `afrishieldai.com` for this scheduled routine, or these three checks — the actual "is the site up" checks — will keep reporting INFO/unverified indefinitely.
2. **Decide on content-queue row 9** ("what is local seo") — it has cost 6 skipped auto-poster runs. Either narrow it to a distinct angle or retire it, per the queue-keeper's repeated flags in `content-queue.md`.
3. **Refill the queue.** Only 1 general-cluster row remains queued; rows 16–31 (tourism + general candidates) need a DataForSEO pass in an interactive session to promote them before the auto-poster runs dry.
4. **Merge this PR** to record the missing `ai-search-visibility-study` keyword in `used-keywords.md` (prevents future duplicate targeting) — cluster classification for "Original research" posts is left for a human/interactive session to decide.
5. Once network access is restored, re-run Checks 1, 5, and 6 for real PASS/FAIL confirmation on live routes, the contact endpoint, and performance — this report cannot certify those as healthy, only as "unknown."

## Not covered by this routine

Keyword rank positions, AI-answer presence (ChatGPT/Claude/Perplexity/Gemini), full Lighthouse scores, and true end-to-end contact-form submission need a SERP/DataForSEO connector or a headless browser (Playwright) that this cloud routine does not have; they are tracked separately in interactive sessions and via the planned Playwright + DataForSEO setup.
