# AfriShield weekly site-health report — 2026-09-17

**Run type:** primary weekly report (Monday-equivalent scheduled run)
**Overall status: AMBER**

## Checks

| # | Check | Result | Notes |
|---|-------|--------|-------|
| 1 | Live routes | **INFO — not verified** | This session's outbound HTTPS egress is blocked by org network policy for the target hosts. Confirmed via the agent proxy status endpoint: `CONNECT afrishield-ai-seo.vercel.app:443` and `CONNECT afrishieldai.com:443` both returned `403` (`connect_rejected` — "gateway answered 403 to CONNECT (policy denial)"). Per the proxy's own guidance this is an organization egress policy denial, not something to retry or route around. This is an environment limitation, not evidence the site is down — see "Action needed." All 32 required paths (9 top-level + `/sitemap.xml` + 23 `/blog/<slug>`) were queued for the check but none could be requested. |
| 2 | Build integrity | **PASS** | `npm install` (409 packages, ~17s, 5 pre-existing vulnerabilities unrelated to this run) then `npx next build` (Next.js 16.2.11, Turbopack) completed with no errors — TypeScript checked clean, 44/44 static pages generated. Output includes all 23 expected `/blog/<slug>` routes plus `/`, `/about`, `/ai-visibility-check`, `/api/call-summary`, `/api/contact`, `/blog`, `/case-studies`, `/contact`, `/for-lodges-hotels`, `/for-safari-operators`, `/for-tourism-hospitality`, `/geo-services`, `/how-it-works`, `/llms.txt`, `/pricing`, `/resources/ai-visibility-checklist`, `/sitemap.xml`, `/solutions`, `/thank-you`. |
| 3 | Content schedule | **PASS (on schedule), queue LOW** | DUE (campaign dates ≤ 2026-09-17, all 15 dates from 2026-08-03 through 2026-08-23): 15. DONE (posts in `lib/posts.ts` with `published` ≥ 2026-08-03): 19. Site is ahead of the campaign schedule, not behind. However `content-queue.md` has only **1** row with status `queued` (row 9, "what is local seo" — the same row that's been skipped 6 runs running for duplicating `local-seo-for-small-business`'s opening H2, per the file's own skip-note trail) against the 4-row floor. Rows 16–31 are all still `candidate` (unvetted, no DataForSEO pass) — the general-cluster queue is effectively empty. |
| 4 | Internal consistency | **Mismatch found and fixed** | All 23 posts in `lib/posts.ts` have a matching `app/blog/<slug>/page.tsx` (no orphans either direction). But the post `ai-search-visibility-study` (published 2026-08-28, primary keyword "ai search visibility for african businesses") was missing from `used-keywords.md` — every other published slug was present. This is a safe, mechanical fix (the row-adding convention is unambiguous from the surrounding rows), so it's included on this branch: added the missing row under Cluster B (GEO / AI-search), dated 2026-08-28, between the `content-marketing-for-small-business` and `enterprise-geo-launch-africa` rows to keep the table's chronological order. |
| 5 | Contact endpoint | **INFO — not verified** | Same network block as Check 1 — could not GET `/api/contact` live. Build output confirms the route exists and compiles (`ƒ /api/contact`, dynamic), so it should deploy correctly, but live availability was not confirmed this run. |
| 6 | Performance signal | **INFO — not verified** | Same network block as Check 1 — could not measure TTFB/byte size. |

## Action needed

1. **Network egress to the production hosts is blocked for this scheduled routine.** Both `afrishield-ai-seo.vercel.app` and `afrishieldai.com` return a `403` policy denial at the agent proxy for this session. Checks 1, 5, and 6 could not run at all this run. Someone with access to this environment's network/egress policy should allow outbound HTTPS to those two hosts for this scheduled routine (or confirm the policy intentionally excludes it, in which case this routine cannot fulfill Checks 1/5/6 from the cloud and that scope should be moved to an interactive session with network access).
2. **Content queue is low.** Only 1 `queued` row remains (row 9, stuck on an unresolved duplication flag since 2026-08-18 across 6 skipped runs) and the general-cluster pool (rows 1–15) is fully claimed. Rows 16–31 need a DataForSEO pass to promote from `candidate` to `queued`/`vetted` before the next auto-poster run, or it will report "queue empty." Someone should also make the call on row 9 (narrow the angle or retire it) — it's now blocked six runs in a row.
3. Once network access is restored, re-run Checks 1, 5, and 6 to get real PASS/FAIL confirmation on live routes, the contact endpoint, and performance — this report cannot certify those as healthy, only as "unknown" this run.

## Fix included on this branch

- `ai-seo/marketing-site/used-keywords.md`: added the missing `ai search visibility for african businesses` row for `/blog/ai-search-visibility-study` (Check 4).

## Not covered by this routine

Keyword rank positions, AI-answer presence (ChatGPT/Claude/Perplexity/Gemini), full Lighthouse scores, and true end-to-end contact-form submission need a SERP/DataForSEO connector or a headless browser (Playwright) that this cloud routine does not have; they are tracked separately in interactive sessions and via the planned Playwright + DataForSEO setup.
