# AfriShield weekly site-health report - 2026-08-27

**Run type:** primary weekly report (Monday cadence; this run fired same-week as
the last recorded run since no site-health report exists for 08-10, 08-13,
08-17, 08-20, or 08-24 — see "Action needed" #1)

**Overall status: AMBER**

Two things need attention: this cloud sandbox still cannot reach the live
site at all (Checks 1, 5, 6 — the same environment/network-policy block first
reported on 2026-07-30 and repeated on 2026-08-03 and 2026-08-06, now
unresolved for four consecutive reports spanning almost a month), and the
content queue is critically low (Check 3). Build integrity and internal
content consistency both pass cleanly.

## Checks

| # | Check | Result | Notes |
|---|-------|--------|-------|
| 1 | Live routes | **INFO — not verified** | Every request to `https://afrishield-ai-seo.vercel.app/*` and `https://afrishieldai.com/` failed at the sandbox's outbound proxy with `403 Forbidden` on the HTTPS CONNECT tunnel (`gateway answered 403 to CONNECT (policy denial or upstream failure)`), confirmed via both `curl` and the `WebFetch` tool, and cross-checked against `/__agentproxy/status`. This is an environment/network-policy limitation of this cloud routine, not a confirmed site outage — no route was confirmed up or down this run. This is the **fourth** consecutive site-health run reporting this exact block (07-30, 08-03, 08-06, 08-27), unresolved. |
| 2 | Build integrity | **PASS** | `npm install` (409 packages, 18s, 3 vulnerabilities — 2 moderate/1 high, pre-existing and unrelated to this check) then `npx next build` completed with no errors. All 37 routes generated cleanly, including all 20 blog post pages, `/api/contact` and `/api/call-summary` (dynamic), `/sitemap.xml`, `/thank-you`, and the tourism/niche pages. |
| 3 | Content schedule | **PASS (on schedule), but queue LOW** | DUE (campaign dates ≤ 2026-08-27): 15 of 15. DONE (posts in `lib/posts.ts` with `published` ≥ 2026-08-03): 17. Site is not behind. **However, `content-queue.md` has only 1 `queued` row** (row 9, `what is local seo`) — below the 4-row low-queue threshold. That one row has now been skipped **six** consecutive auto-poster runs (2026-08-18 through 2026-08-23) for duplicating the opening H2 of the live `local-seo-for-small-business` post, and is explicitly flagged in the file itself as needing a decision. The general keyword pool (rows 1–15) is otherwise fully claimed; tourism-cluster rows 16–21 remain unvetted `candidate` status pending a DataForSEO pass. |
| 4 | Internal consistency | **PASS** | All 20 posts in `lib/posts.ts` have a matching `app/blog/<slug>/page.tsx`, and all 20 published primary keywords appear as `Live` in `used-keywords.md`. No mismatches. |
| 5 | Contact endpoint | **INFO — not verified** | Same network block as Check 1 — could not GET `/api/contact` live. Build output confirms the route exists and compiles (`ƒ /api/contact`, dynamic), which is a good sign, but that is not confirmation it is live and responding. |
| 6 | Performance signal | **INFO — not verified** | Same network block as Check 1 — no ttfb/total/bytes numbers obtainable this run. |

## Action needed

1. **This routine appears to have gone quiet for ~3 weeks.** The trigger is
   configured `0 9 * * 1,4` (Mon/Thu) and was not modified since creation on
   2026-07-29, yet no `site-health-*.md` report or `health/report-*` PR exists
   between 08-06 and today (a gap covering 08-10, 08-13, 08-17, 08-20, and
   08-24 — five expected runs). This report cannot determine from inside the
   repo whether those runs fired and came back clean without a PR, fired and
   silently failed, or did not fire at all. Worth checking the trigger's run
   history/logs directly.
2. **Get this cloud routine's environment allow-listed for outbound HTTPS to
   `afrishield-ai-seo.vercel.app` and `afrishieldai.com`.** This is the fourth
   report to flag the identical 403-on-CONNECT policy block (first reported
   2026-07-30). Until it's fixed, Checks 1, 5, and 6 — the actual "is the site
   up" checks — cannot run from this routine and will report INFO/unverified
   every time, which defeats the purpose of an automated live-health check.
3. **Resolve content-queue.md row 9 (`what is local seo`).** It has blocked
   six consecutive auto-poster runs on the same duplication finding against
   `local-seo-for-small-business`. Either narrow its angle (e.g. a short
   glossary-style page linking out to the existing checklist post) or retire
   the row.
4. **Run a DataForSEO pass on queue rows 16-21** (tourism-cluster candidates:
   safari/lodge/hotel keywords) or add fresh general-cluster keywords. With
   row 9 stuck and rows 1-15 fully claimed, the queue is down to a single
   contested row — the next auto-poster run is at real risk of reporting
   "queue empty" with nothing left to publish.
5. No code fix is included in this PR: there is nothing in the repo to safely
   patch for issues #1, #2, or #4 above (trigger diagnostics, environment
   network policy, and DataForSEO access are outside this repo). Issue #3
   is a content-strategy decision, not a safe mechanical fix a health-monitor
   routine should make unilaterally.

## Not covered by this routine

Keyword rank positions, AI-answer presence (ChatGPT/Claude/Perplexity/
Gemini), full Lighthouse scores, and true end-to-end contact-form submission
need a SERP/DataForSEO connector or a headless browser (Playwright) that this
cloud routine does not have; they are tracked separately in interactive
sessions and via the planned Playwright + DataForSEO setup.
