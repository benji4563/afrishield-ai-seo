# AfriShield weekly site-health report - 2026-08-13

**Overall status: AMBER**

This is the Monday primary weekly report. Content schedule, build integrity,
and internal content consistency all pass cleanly this week. The one
recurring problem: this cloud routine's sandbox still cannot reach the live
site at all (Checks 1, 5, 6) — outbound HTTPS to `vercel.app` and
`afrishieldai.com` is rejected by the environment's egress policy. This is
the same infrastructure gap flagged in the 2026-08-03 report and it has not
been fixed in the 10 days since.

## Checks

1. **Live routes — INFO (unverified, not FAIL).** Every request to
   `https://afrishield-ai-seo.vercel.app/*` and `https://afrishieldai.com/`
   failed at the sandbox's outbound proxy with `403 Forbidden` on the HTTPS
   CONNECT tunnel (`gateway answered 403 to CONNECT (policy denial or
   upstream failure)`), confirmed via `/__agentproxy/status`. A WebFetch
   attempt against both hosts independently returned `EGRESS_BLOCKED`. Per
   the proxy's own guidance, policy denials (403/407) must be reported, not
   retried or routed around. This is an environment/tooling limitation of
   this specific cloud routine run, not a confirmed site outage — no route
   was confirmed up or down this run.
2. **Build integrity — PASS.** `npm install` (409 packages, 0 vulnerabilities
   blocking) then `npx next build` both succeeded. Turbopack compiled
   cleanly in 5.5s, TypeScript passed, and all 31 routes generated,
   including all 12 blog post pages, `/api/contact` and `/api/call-summary`
   (dynamic), and `/sitemap.xml` (static).
3. **Content schedule — PASS.** Of the 15 scheduled campaign publish dates, 7
   are due as of 2026-08-13. `lib/posts.ts` has 8 posts with
   `published >= 2026-08-03` (`is-seo-worth-it` 08-13, `how-to-rank-on-chatgpt`
   08-12, `google-business-profile-optimization` 08-11,
   `how-to-get-hotel-cited-by-chatgpt` 08-10, `how-to-reduce-ota-commission`
   08-10, `what-is-schema-markup` 08-10, `how-to-get-my-business-on-google`
   08-10, `small-business-seo` 08-05). DUE=7, DONE=8 → on schedule, one post
   ahead. `content-queue.md` has 9 rows at `status: queued` (well above the
   4-row low-queue threshold), so the queue is healthy.
4. **Internal consistency — PASS.** All 12 slugs in `lib/posts.ts` have a
   matching `app/blog/<slug>/page.tsx`, and all 12 corresponding primary
   keywords are recorded as `Live` in `used-keywords.md`. No mismatches
   found.
5. **Contact endpoint — INFO (unverified, not FAIL).** Same network-policy
   block as Check 1 — `GET /api/contact` never reached the host (proxy 403).
   The local build confirms the route exists and compiles as a dynamic API
   route (`ƒ /api/contact`), which is a good sign, but that is not the same
   as confirming it is live and responding.
6. **Performance signal — INFO (unverified).** Same network-policy block;
   `curl` never established a connection to the vercel.app host, so no
   ttfb/total/bytes numbers were obtainable this run.

## Action needed

- **Get this cloud routine's environment allow-listed for outbound HTTPS to
  `afrishield-ai-seo.vercel.app` and `afrishieldai.com`.** This is the second
  consecutive weekly report (2026-08-03 and now 2026-08-13) where Checks 1,
  5, and 6 — the actual "is the site up" checks — could not run from this
  scheduled routine. Until the egress policy allow-lists these hosts, this
  automated live-health check cannot do its core job and will keep reporting
  INFO/unverified every run. Worth escalating to whoever manages the
  environment's network policy.
- No code fix is included in this PR: there is nothing in the repo to
  safely patch — this is environment/infra configuration outside the repo.

## Not covered by this routine

Keyword rank positions, AI-answer presence (ChatGPT/Claude/Perplexity/
Gemini), full Lighthouse scores, and true end-to-end contact-form submission
need a SERP/DataForSEO connector or a headless browser (Playwright) that
this cloud routine does not have. They're tracked separately in interactive
sessions and via the planned Playwright + DataForSEO setup.
