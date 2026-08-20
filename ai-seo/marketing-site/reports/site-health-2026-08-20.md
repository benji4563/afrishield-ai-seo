# AfriShield weekly site-health report — 2026-08-20

**Run type:** weekly check (Monday)
**Overall status: AMBER**

## Checks

| # | Check | Result | Notes |
|---|-------|--------|-------|
| 1 | Live routes | **INFO — not verified** | This session's outbound HTTPS egress to `afrishield-ai-seo.vercel.app` was rejected with a `403` at the agent proxy/gateway level (`CONNECT tunnel failed, response 403` — confirmed org policy denial via `/__agentproxy/status`, not a transient error). Could not check `/`, `/solutions`, `/how-it-works`, `/pricing`, `/about`, `/case-studies`, `/blog`, `/contact`, `/sitemap.xml`, the 17 `/blog/<slug>` pages, or `https://afrishieldai.com/`. DNS for `afrishieldai.com` does resolve (`64.29.17.65`, `64.29.17.1`). This is an environment/network-policy limitation, not evidence the site is down — see "Action needed." |
| 2 | Build integrity | **PASS** | `npm install` (409 packages, 32s, 3 pre-existing vulnerabilities unrelated to this change) then `npx next build` completed with no errors. All expected routes emitted, including all 17 `/blog/<slug>` pages from `lib/posts.ts`, `/sitemap.xml`, and `ƒ /api/contact`. |
| 3 | Content schedule | **PASS** | DUE (campaign dates ≤ 2026-08-20): 12. DONE (posts in `lib/posts.ts` with `published` ≥ 2026-08-03): 13 (`small-business-seo` through `how-to-improve-google-ranking`). Site is on schedule, one post ahead. `content-queue.md` has exactly 4 `queued` rows (#9 `what is local seo`, #13 `how to appear on google maps`, #14 `how to get more website traffic`, #15 `content marketing for small business`) — at the low-queue threshold, not below it, so not flagged, but worth topping up soon. Note: row 9 has now been skipped by the auto-poster on 3 consecutive runs (08-18, 08-19, 08-20) for duplicating `local-seo-for-small-business`'s angle — the queue file itself is asking for a decision (narrow the angle or retire the row). |
| 4 | Internal consistency | **PASS** | All 17 posts in `lib/posts.ts` have a matching `app/blog/<slug>/page.tsx`, and all 17 published slugs appear in `used-keywords.md` as `Live`. No mismatches. |
| 5 | Contact endpoint | **INFO — not verified** | Same network block as Check 1 — could not GET `/api/contact`. Build output confirms the route exists and compiles (`ƒ /api/contact`, dynamic), so it should deploy correctly, but live availability was not confirmed this run. |
| 6 | Performance signal | **INFO — not verified** | Same network block as Check 1 — could not measure TTFB/byte size. |

## Action needed

1. **The network egress block is not new — it has now blocked every live check on every run since at least 2026-07-30** (confirmed recurring in the 07-30, 08-03, 08-06, and this 08-20 reports; no health report exists for 08-10/08-13/08-17, so those runs either didn't fire or hit the same wall silently). This routine's *entire reason to exist* is verifying the live site, the contact endpoint, and performance — three of seven checks have never once returned a real PASS/FAIL. Someone with access to this scheduled routine's environment network policy needs to allow outbound HTTPS to `afrishield-ai-seo.vercel.app` and `afrishieldai.com` for this session, or this routine should be reconfigured to run somewhere with unrestricted egress.
2. Content queue is at exactly 4 `queued` rows (the low-queue threshold) with 3 candidates still awaiting a DataForSEO pass. Recommend queue-keeper adds more vetted rows soon so the poster doesn't run dry.
3. Row 9 (`what is local seo`) in `content-queue.md` has been skipped 3 runs running for the same unresolved duplication — needs a human/queue-keeper decision (narrow the angle or retire it) before it costs a 4th skipped run.
4. No code fix is included in this PR — nothing found this run is a code-level bug; the only action item is environmental (network policy).

## Not covered by this routine

Keyword rank positions, AI-answer presence (ChatGPT/Claude/Perplexity/Gemini), full Lighthouse scores, and true end-to-end contact-form submission need a SERP/DataForSEO connector or a headless browser (Playwright) that this cloud routine does not have; they are tracked separately in interactive sessions and via the planned Playwright + DataForSEO setup.
