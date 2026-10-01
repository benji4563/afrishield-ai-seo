# AfriShield weekly site-health report - 2026-10-01

**Overall status: AMBER**

Live-route, contact-endpoint, and performance checks could not be executed
this run because this session's outbound network access is fully blocked
(even control requests to unrelated hosts like `example.com` were denied by
the environment's egress proxy with `403 connect_rejected`). That is an
environment/network-policy condition, not a confirmed site outage, so those
checks are reported as INFO/BLOCKED rather than FAIL. A content-consistency
gap was found and fixed on this branch, and a possible committed-secret file
was found and is flagged for manual review below.

## Per-check results

1. **Live routes** — INFO / BLOCKED. Could not reach
   `https://afrishield-ai-seo.vercel.app` or `https://afrishieldai.com` (or
   any external host at all) from this container: the agent egress proxy
   returned `403` on every CONNECT attempt, including to `example.com`,
   confirming this is a network-policy block for this session rather than a
   site-specific problem. None of the 29 required paths (home, solutions,
   how-it-works, pricing, about, case-studies, blog, contact, sitemap.xml,
   and all 24 `/blog/<slug>` pages) could be checked live this run. Needs a
   run from a session with outbound network access, or the environment's
   allowed-domains list updated to include `afrishield-ai-seo.vercel.app`
   and `afrishieldai.com`.

2. **Build integrity** — PASS. `npm install` then `npx next build`
   (Next.js 16.3.8, Turbopack) completed with exit code 0. All 24 blog
   posts, the 6 `/ai-seo/[city]` pages, static marketing pages, and the
   `/api/contact` and `/api/call-summary` dynamic routes compiled and
   prerendered successfully. No TypeScript or build errors.

3. **Content schedule** — PASS. Of the 15 campaign publish dates
   (2026-08-03 through 2026-08-23), all 15 are `<=` today (2026-10-01), so
   DUE = 15. `lib/posts.ts` has 20 posts with `published >= 2026-08-03`
   (24 posts total), so DONE = 20 `>=` DUE = 15 — site is on schedule, not
   behind. `content-queue.md` has 27 rows marked `queued`, well above the
   4-row low-queue threshold.

4. **Internal consistency** — FAIL (fixed on this branch). All 24 posts in
   `lib/posts.ts` have a matching `app/blog/<slug>/page.tsx` (no mismatches).
   However, the published post `ai-search-visibility-study`
   (published 2026-08-28, primary keyword "ai search visibility for african
   businesses") had no corresponding row in `used-keywords.md` — a gap in
   the keyword-tracking ledger that could lead to this term being
   accidentally re-targeted in a future post. **Fix included on this
   branch:** added the missing row to `used-keywords.md`.

5. **Contact endpoint** — INFO / BLOCKED (same network block as Check 1).
   Could not GET `https://afrishield-ai-seo.vercel.app/api/contact` live.
   Indirect evidence from Check 2: `npx next build` confirms `/api/contact`
   exists as a compiled dynamic (`ƒ`) route in the current codebase, so the
   route is present in what will be deployed — but this does not confirm
   it is actually live and responding on Vercel.

6. **Performance signal** — INFO / BLOCKED (same network block). No TTFB/
   byte-size numbers available this run.

## Additional finding (outside the standard checklist)

**Possible committed secret file.** The repo tracks a file at
`ai-seo/marketing-site/~$.env.local` (git-tracked, ~162 bytes, last touched
2026-10-01 07:09 UTC). `.gitignore` excludes `.env`, `.env.local`, and
`.env*.local`, but the `~$` prefix on this filename doesn't match any of
those glob patterns, so it was committed despite the intent to exclude
local env files. This session's permission policy blocked reading its
contents (credential-materialization guard), so its contents are unverified
here — it may be an innocuous leftover (e.g. an editor/Office-style lock
file) or it may contain real secrets. **Recommended action:** a human with
repo access should open and inspect
`ai-seo/marketing-site/~$.env.local` directly, delete it from the repo if
it holds credentials, rotate any exposed credentials, and add a `~$*`
pattern to `.gitignore` to prevent recurrence. Not fixed on this branch
since it requires a human to actually view and judge the contents.

## Action needed

- Re-run Checks 1, 5, and 6 from a session/environment with outbound
  network access (or add `afrishield-ai-seo.vercel.app` and
  `afrishieldai.com` to this environment's allowed domains), since this
  run could not confirm the live site, the contact endpoint, or
  performance numbers at all.
- Manually inspect and, if needed, remove/rotate
  `ai-seo/marketing-site/~$.env.local` (see above) — this session could
  not read it.
- Review and merge the `used-keywords.md` fix on this branch (adds the
  missing `ai-search-visibility-study` row).

## Not covered by this routine

Keyword rank positions, AI-answer presence (ChatGPT/Claude/Perplexity/
Gemini), full Lighthouse scores, and true end-to-end contact-form
submission need a SERP/DataForSEO connector or a headless browser
(Playwright) that this cloud routine does not have; they are tracked
separately in interactive sessions and via the planned Playwright +
DataForSEO setup.
