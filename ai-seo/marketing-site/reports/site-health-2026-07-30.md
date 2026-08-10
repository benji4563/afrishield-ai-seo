# AfriShield weekly site-health report - 2026-07-30

_Mid-week check (Thursday run). Monday's run is the primary weekly report._

**Overall status: RED** — not because a route or the build failed, but because
this run's sandboxed environment cannot reach either production host at all
(network egress policy), so the three checks that actually verify the live
site (routes, contact endpoint, performance) could not execute. Everything
that *could* be checked from inside the repo (build, content schedule,
internal consistency) is clean. See "Action needed" below — this is an
environment/session fix, not a site fix.

## Per-check results

1. **Live routes — BLOCKED (not FAIL).** Every request to
   `https://afrishield-ai-seo.vercel.app/*` returned curl exit code 56 /
   HTTP code `000`. The agent egress proxy's own status log
   (`$HTTPS_PROXY/__agentproxy/status`) shows 17 consecutive
   `connect_rejected` entries for `afrishield-ai-seo.vercel.app:443` and
   `afrishieldai.com:443` around 09:05 UTC today, each annotated "gateway
   answered 403 to CONNECT (policy denial or upstream failure)". Per the
   proxy's own guidance, 403 at this layer means the destination host is not
   allow-listed for this session's egress policy — it is not evidence the
   site itself is down, and retrying/routing around it is explicitly the
   wrong move. Custom domain `https://afrishieldai.com/` hit the same 403
   policy block, so its resolution status is also unknown from this run
   (would have been reported as INFO either way, per the routine's own
   rules, since it may not be provisioned yet).
2. **Build integrity — PASS.** `npm install` succeeded (109 packages, 0
   vulnerabilities). `npx next build` succeeded: compiled in 5.3s, TypeScript
   checked clean, all 17 routes generated (`/`, `/solutions`,
   `/how-it-works`, `/pricing`, `/about`, `/case-studies`, `/blog` + 4 post
   pages, `/contact`, `/thank-you`, `/sitemap.xml`, `/api/contact` as a
   dynamic route, plus `/_not-found`).
3. **Content schedule — PASS.** Today is 2026-07-30; none of the 15 campaign
   publish dates (earliest 2026-08-03) are `<=` today, so DUE = 0 and DONE =
   0 — not behind. Queue check: `content-queue.md` has 15 rows with status
   `queued` (well above the 4-row low-queue threshold).
4. **Internal consistency — PASS.** All 4 posts in `lib/posts.ts`
   (`answer-engine-optimization`, `what-ai-seo-actually-does`,
   `what-seo-actually-costs`, `ai-seo-vs-traditional-seo`) have a matching
   `app/blog/<slug>/page.tsx`, and all 4 published slugs appear in
   `used-keywords.md`. No mismatches.
5. **Contact endpoint — BLOCKED (not FAIL).** Same network policy block as
   check 1; `GET /api/contact` could not be reached from this environment.
   The build (check 2) confirms the route exists and compiles as a dynamic
   API route, which is a good sign, but that is not a substitute for an
   actual live 200/405 check.
6. **Performance signal — BLOCKED (not FAIL).** Same network policy block;
   no ttfb/total/bytes numbers available this run.

## Action needed

- **Fix the environment's network egress policy** so this routine's session
  can reach `afrishield-ai-seo.vercel.app` and `afrishieldai.com` over
  HTTPS. Until that's allow-listed, checks 1, 5, and 6 cannot run in any
  future firing of this routine, weekly or mid-week — this is a recurring
  blocker, not a one-off. (Check `$HTTPS_PROXY/__agentproxy/status` in a
  future run to confirm whether the policy has been updated.)
- Once egress is fixed, re-run (or wait for) the next scheduled firing to get
  a real read on routes/contact/perf — nothing else in this report indicates
  a problem.
- No fix was made to site code — nothing here was reachable to verify, so
  nothing here was risky to touch.

## Not covered by this routine

Keyword rank positions, AI-answer presence (ChatGPT/Claude/Perplexity/
Gemini), full Lighthouse scores, and true end-to-end contact-form submission
need a SERP/DataForSEO connector or a headless browser (Playwright) that
this cloud routine does not have; they are tracked separately in interactive
sessions and via the planned Playwright + DataForSEO setup.
