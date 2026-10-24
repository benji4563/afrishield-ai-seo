# AfriShield weekly site-health report — 2026-09-28

**Overall status: AMBER**

This is the primary Monday weekly report. The headline issue is not a broken
site — it's that this run's cloud container could not reach the site host at
all, so CHECK 1, CHECK 5, and CHECK 6 (which all depend on live HTTPS access)
are **UNVERIFIED**, not confirmed passing. Everything checkable from inside
the repo (build, content schedule, internal consistency) is healthy, with one
small data-hygiene fix applied.

## Checks

1. **LIVE ROUTES — INFO (unverified, not FAIL)**
   Every `curl`/WebFetch attempt to `https://afrishield-ai-seo.vercel.app/*`
   and `https://afrishieldai.com/` returned `EGRESS_BLOCKED` / HTTP 403 from
   this session's own network egress proxy — both `curl` and the `WebFetch`
   tool were refused at the proxy/CONNECT layer, before ever reaching Vercel.
   This is a **container network-policy block**, not a site outage signal:
   this environment's outbound HTTPS allowlist does not currently include
   `afrishield-ai-seo.vercel.app` or `afrishieldai.com`. None of the 9 static
   paths, the 23 blog slugs, or the custom domain could be checked this run.
   **Fix isn't code** — it's widening this cloud environment's network access
   (or adding those two hosts to its allowlist) in the environment's Network
   access settings. Until that's done, this routine cannot confirm the site
   is actually live.

2. **BUILD INTEGRITY — PASS**
   `npm install` (409 packages, 25s) then `npx next build` both succeeded
   cleanly on commit `83fb288` (2026-09-24). TypeScript passed, 51/51 static
   pages generated, all 23 blog posts, all 6 `/ai-seo/[city]` pages, and both
   `/api/contact` and `/api/call-summary` compiled as dynamic routes with no
   errors.

3. **CONTENT SCHEDULE — PASS (with a staleness flag)**
   DUE (campaign dates ≤ 2026-09-28): 15/15. DONE (posts in `lib/posts.ts`
   published ≥ 2026-08-03): 19. 19 ≥ 15, so the site is **ahead** of the
   campaign schedule, not behind — PASS.
   Queue health: `content-queue.md` has **13 `queued` rows** (32–44), well
   above the 4-row floor — PASS, not low.
   **Flag (not a defined FAIL condition, but worth Ben's attention):** the
   most recent post published is `enterprise-geo-launch-africa` /
   `top-geo-ai-seo-agencies-africa-2026`, both dated **2026-08-30** — no new
   post has gone out in the **29 days** since, despite 13 vetted, queued,
   African-commercial-intent rows sitting ready (added by the 2026-09-24
   geographic-pivot rewrite of the queue). The auto-poster does not appear
   to have run since the pivot landed. Worth checking whether the scheduled
   blog auto-poster routine is still firing.

4. **INTERNAL CONSISTENCY — PASS (1 mismatch fixed)**
   All 23 posts in `lib/posts.ts` have a matching `app/blog/<slug>/page.tsx`
   — no missing pages. One mismatch found and fixed on this branch: the
   `ai-search-visibility-study` post (published 2026-08-28, primary keyword
   "ai search visibility for african businesses") was live but had no row in
   `used-keywords.md`. Added the missing row (dated 2026-08-28, marked
   "— original research" since it isn't a queue-sourced keyword) so the
   keyword ledger matches what's actually published. No other posts were
   missing from the ledger.

5. **CONTACT ENDPOINT — INFO (unverified, not FAIL)**
   Could not GET `/api/contact` live — same network block as CHECK 1.
   Indirect confirmation from CHECK 2: `npx next build` compiled
   `/api/contact` as a dynamic (`ƒ`) route with no errors, so the route
   exists in the deployed code as of commit `83fb288`. That's not the same
   as confirming it responds correctly in production.

6. **PERFORMANCE SIGNAL — INFO (unverified, not FAIL)**
   Could not run the `curl -w 'ttfb=...'` probe — same network block as
   CHECK 1. No numbers to report this run.

## Action needed

- **Widen this cloud environment's network egress** to allow
  `afrishield-ai-seo.vercel.app` and `afrishieldai.com` (Network access in
  the environment's settings), or this routine will keep being unable to
  verify checks 1, 5, and 6 every run.
- **Check whether the blog auto-poster is still firing** — 29 days with no
  new post despite 13 ready `queued` rows in `content-queue.md`.
- Merge the one-line `used-keywords.md` fix on this branch (adds the missing
  `ai-search-visibility-study` row) — safe, no code/behavior change.
- Once network access is restored, re-run this routine (or check manually)
  to confirm live routes, the contact endpoint, and TTFB before treating this
  week as fully GREEN.

## Not covered by this routine

Keyword rank positions, AI-answer presence (ChatGPT/Claude/Perplexity/
Gemini), full Lighthouse scores, and true end-to-end contact-form submission
need a SERP/DataForSEO connector or a headless browser (Playwright) that this
cloud routine does not have; they are tracked separately in interactive
sessions and via the planned Playwright + DataForSEO setup.
