# AfriShield weekly site-health report - 2026-08-31

**Run type:** Monday primary WEEKLY report
**Overall status: AMBER**

Build integrity is clean and the content schedule is comfortably ahead. Two
things need attention: a published post was never logged in
`used-keywords.md` (fixed on this branch), and the content queue's general
keyword pool has run dry (1 `queued` row left). This cloud sandbox also had
zero outbound HTTPS access again this run, so the live-route, contact-endpoint,
and performance checks could not be verified — this is the same unresolved
environment/network-policy gap reported in every prior run since at least
2026-07-30 (07-30, 08-03, 08-06, and now 08-31).

## Checks

| # | Check | Result | Notes |
|---|-------|--------|-------|
| 1 | Live routes | **INFO — not verified** | This session's outbound HTTPS egress was blocked by the environment's proxy for *every* external host tested, including a neutral control (`https://example.com/` also returned `403` on CONNECT — `gateway answered 403 to CONNECT (policy denial or upstream failure)`, confirmed via `/__agentproxy/status`). `https://afrishield-ai-seo.vercel.app/` and `https://afrishieldai.com/` failed the same way. Per the proxy's own guidance, policy denials are reported, not retried or worked around. This is an environment limitation, not evidence of a site outage — no route was confirmed up or down this run. |
| 2 | Build integrity | **PASS** | `npm install` (409 packages, 0 blocking errors) then `npx next build` (Next.js 16.2.11, Turbopack) completed cleanly: TypeScript passed, all 44 pages generated. All 23 blog slugs from `lib/posts.ts` emitted a static route, plus `/`, `/about`, `/pricing`, `/solutions`, `/how-it-works`, `/case-studies`, `/contact`, `/sitemap.xml`, `/llms.txt`, the tourism/GEO segment pages, and both `/api/contact` and `/api/call-summary` as dynamic routes. |
| 3 | Content schedule | **PASS (ahead)**, with a **low-queue flag** | DUE (campaign dates ≤ 2026-08-31): 15 of 15. DONE (posts in `lib/posts.ts` with `published` ≥ 2026-08-03): 19. Site is ahead of the campaign schedule, not behind. `content-queue.md`, however, has only **1 `queued` row** left (row 9, `what is local seo` — itself stuck: skipped 6 runs in a row, 2026-08-18 through 2026-08-23, over an unresolved duplication with `local-seo-for-small-business`) — below the 4-row low-queue threshold. Rows 16–21 (tourism-cluster candidates) still have no DataForSEO pass, so there is no ready fallback pool. |
| 4 | Internal consistency | **FAIL → fixed on this branch** | All 23 slugs in `lib/posts.ts` have a matching `app/blog/<slug>/page.tsx` — no mismatch there. But `ai-search-visibility-study` (published 2026-08-28, primary keyword "ai search visibility for african businesses") was missing from `used-keywords.md` entirely — never logged despite being live. Added the missing row on this branch (see diff); no other slugs were missing. |
| 5 | Contact endpoint | **INFO — not verified** | Same network block as Check 1 — could not `GET /api/contact`. The build output confirms the route exists and compiles (`ƒ /api/contact`, dynamic), consistent with prior runs, but live availability was not confirmed this run. |
| 6 | Performance signal | **INFO — not verified** | Same network block as Check 1 — could not measure ttfb/total/bytes for `/`. |

## Action needed

1. **Escalate the environment network-policy gap.** This is now the 4th consecutive tracked run (07-30, 08-03, 08-06, 08-31) where this routine's cloud sandbox had zero outbound HTTPS access to *any* external host, not just the target site. Checks 1, 5, and 6 — the actual "is the site up" checks — have never once returned a real PASS/FAIL from this routine. Someone with access to the environment's egress policy needs to allow-list `afrishield-ai-seo.vercel.app` and `afrishieldai.com` (or confirm general web egress is intended for this scheduled routine at all); until then this report can only certify build/content health, not live site health.
2. **Content queue needs replenishing.** Only 1 general-cluster row remains `queued` (row 9, and it is stuck on an unresolved duplication flag — 6 skipped runs since 2026-08-18). The tourism candidates (rows 16–21) still need a DataForSEO pass before they can be promoted to `queued`. Without either action, the next scheduled post run will report "queue empty."
3. Row 9 (`what is local seo`) needs a decision independent of the queue-empty risk: either narrow its angle away from `local-seo-for-small-business`'s existing "What local SEO actually is" section, or retire it — it has cost 6 skipped auto-poster runs.
4. Fixed this run: `used-keywords.md` was missing the `ai-search-visibility-study` row — added on this branch.
5. Once network access is restored, re-run Checks 1, 5, and 6 to get real confirmation on live routes, the contact endpoint, and performance.

## Not covered by this routine

Keyword rank positions, AI-answer presence (ChatGPT/Claude/Perplexity/Gemini), full Lighthouse scores, and true end-to-end contact-form submission need a SERP/DataForSEO connector or a headless browser (Playwright) that this cloud routine does not have; they are tracked separately in interactive sessions and via the planned Playwright + DataForSEO setup.
