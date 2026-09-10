# AfriShield weekly site-health report — 2026-09-10

**Run type:** primary weekly report (Monday)
**Overall status: AMBER**

## Checks

| # | Check | Result | Notes |
|---|-------|--------|-------|
| 1 | Live routes | **INFO — not verified** | This session's outbound HTTPS egress to `afrishield-ai-seo.vercel.app` and `afrishieldai.com` is blocked by org network policy (403 `connect_rejected` at the proxy/gateway for every request, confirmed via `/__agentproxy/status`). Not evidence the site is down — this is an environment limitation. This is the same gap reported on 2026-08-06 and it does not appear to have been resolved since. |
| 2 | Build integrity | **PASS** | `npm install` (409 packages, 23s) then `npx next build` (Next.js 16.2.11, Turbopack) completed with no errors. All 44 routes generated, including all 23 blog posts in `lib/posts.ts`, `/api/contact`, `/api/call-summary`, `/sitemap.xml`, `/llms.txt`, and the tourism landing pages. |
| 3 | Content schedule | **PASS, with a queue-low flag** | DUE (campaign dates ≤ 2026-09-10): 15 (all dates 2026-08-03 through 2026-08-23 have passed). DONE (posts in `lib/posts.ts` with `published` ≥ 2026-08-03): 19. Site is ahead of the campaign schedule, not behind. **However**, `content-queue.md` has only **1** `queued` row (row 9, "what is local seo") — below the 4-row low-queue threshold. 6 `candidate` rows (16–21, tourism cluster) remain unvetted pending a DataForSEO pass. Row 9 itself has been skipped 6 consecutive runs (2026-08-18 → 2026-08-23) on an unresolved duplication flag against `local-seo-for-small-business` and still needs a decision (narrow the angle or retire it). The general-keyword pool is now effectively empty — the next poster run is likely to report "queue empty" without intervention. |
| 4 | Internal consistency | **1 mismatch found (fixed on this branch)** | All 23 posts in `lib/posts.ts` have a matching `app/blog/<slug>/page.tsx` — no mismatches there. But `ai-search-visibility-study` (published 2026-08-28, primary keyword "ai search visibility for african businesses") was never logged in `used-keywords.md` — every other published slug is. This branch adds the missing row; no code or content changes. |
| 5 | Contact endpoint | **INFO — not verified** | Same network block as Check 1 — could not GET `/api/contact` live. Build output confirms the route exists and compiles (`ƒ /api/contact`, dynamic), so it should deploy correctly, but live availability was not confirmed this run. |
| 6 | Performance signal | **INFO — not verified** | Same network block as Check 1 — could not measure TTFB/byte size. |

## Action needed

1. **The network/environment gap from the 2026-08-06 report is still open.** This routine has had no outbound HTTPS access to the site's own hosts for at least a month across multiple runs. Checks 1, 5, and 6 cannot produce a real PASS/FAIL until someone with access to the environment's egress policy allows `afrishield-ai-seo.vercel.app` and `afrishieldai.com`. This is now a recurring, not one-off, gap and is worth escalating directly rather than re-flagging weekly.
2. **Content queue needs restocking.** Only 1 `queued` row remains and it has been skipped 6 times running; the 6 tourism `candidate` rows need a DataForSEO pass (requires an interactive session) before the poster runs dry.
3. **Row 9 ("what is local seo") needs a decision** — narrow its angle or retire it — it has cost 6 skipped auto-poster runs.
4. Missing `used-keywords.md` entry for `ai-search-visibility-study` fixed on this branch (see diff) — safe, data-only change.
5. Once network access is restored, re-run Checks 1, 5, and 6 to get real confirmation on live routes, the contact endpoint, and performance.

## Not covered by this routine

Keyword rank positions, AI-answer presence (ChatGPT/Claude/Perplexity/Gemini), full Lighthouse scores, and true end-to-end contact-form submission need a SERP/DataForSEO connector or a headless browser (Playwright) that this cloud routine does not have; they are tracked separately in interactive sessions and via the planned Playwright + DataForSEO setup.
