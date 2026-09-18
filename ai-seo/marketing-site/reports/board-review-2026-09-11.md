# AfriShield Board of Advisors — review, 2026-09-11

Twice-weekly scheduled review. **Note on cadence:** the last board review on
master is 2026-08-04 — a 38-day gap against a twice-weekly cadence. Flagging
this to Ben as an operational item, not something this review can fix itself
(it can't inspect its own trigger config from inside the checkout).

Targets chosen per the routine prompt: (a) most recently published/edited
blog post, (b) next `queued` keyword in `content-queue.md`, (c) one site page
from the rotation (solutions → pricing → how-it-works → about → contact).
Solutions was reviewed twice already (2026-07-31, 2026-08-04) with no further
rotation progress recorded since, so this run advances to **pricing**.

| # | Target | Why chosen |
|---|---|---|
| A | `/blog/top-geo-ai-seo-agencies-africa-2026` | Most recently published post (2026-08-30, tied with `enterprise-geo-launch-africa` on commit date; this one is first in `POSTS` order and is the higher-stakes target — a comparison guide naming real competitors) |
| B | `what is local seo` — content-queue row #9 | The only `queued` row; stuck 6 skipped runs since 2026-08-18 with the general keyword pool dry since 2026-08-23 as a direct result |
| C | `/pricing` | Site-page rotation, first review (rotation had stalled on solutions) |

Lenses run: **GEO** (Mike King + Koray Tuğberk Gübür — `board-geo-reviewer`)
on A, B, C. **Conversion** (Wes McDowell — `board-conversion-reviewer`) on C.
**Business** (Dan Martell) applied directly below as chairman synthesis over
the pattern across all three, plus the direct resolution of Target B.

---

## A. `/blog/top-geo-ai-seo-agencies-africa-2026` — GEO lens (King + Koray)

**Verdict: 7.5/10.** Before reviewing, the board independently web-verified
that the three named competitors — Nairobi Marketing, SEO Smart Limited,
Digital 4 Africa — are real agencies with real, publicly documented GEO/AI-
search offerings roughly matching what the post says about them. This is
**not** a fabricated-comparison problem; it's a legitimate, defensible
analyst-style pillar page, and the standing GEO-syndication SOP (skill B.8,
added last commit) has its step 1 fully implemented here.

The liftable-opener defect that recurred across the 2026-07-31 and 2026-08-04
reviews **did not recur on this post** — all six H2s open with a direct BLUF
answer, and the three required internal links are present and live. The
differentiation-angle check holds (this is a distinct comparison/decision
layer, not a restatement of `ai-seo-vs-traditional-seo`).

What's left is narrower:
- **Humor-placement violations (King).** `page.tsx:363` fuses a wry aside
  ("skipping the first is the most common way money gets wasted") into the
  same sentence as the blueprint H2's BLUF answer — `humor-writing/SKILL.md`
  forbids humor in the first sentence under an H2. `page.tsx:51` (FAQ answer
  3) closes with "Anyone quoting a fixed number of days is guessing" — humor
  is banned outright in FAQ answers, they're retrieval chunks.
- **Entity consistency (King).** `lib/structured-data.ts` (`organizationJsonLd`,
  site-wide) lists Nigeria/Ghana/Kenya/South Africa in `areaServed` but omits
  Cameroon, despite this post naming Douala as a primary hub and the site's
  own WhatsApp number being a +237 line. `Place: Africa` is already asserted
  generically, so this is real but minor — a knowledge-graph crawler would
  still notice the gap at the country level.
- **Schema/visible-content drift risk (King), low priority.** `BLUEPRINT_STEPS`
  (feeds `howToJsonLd`) is a hand-paraphrase of the visible `<ol>`, not built
  from one shared array — not broken today, will drift silently on the next
  edit to either. Fixed at the skill level below (extends the existing
  HowTo-schema rule, mirroring the pattern the `FAQ` const already uses).
- **Operational gap, not a defect in the post (Business/Dan):** B.8's steps 2–3
  (PR-wire syndication, indexation/benchmark verification) have no evidence
  of execution anywhere in the repo. The pillar page is built; the
  distribution work that makes it pay off is not — see execution to-do #5.

---

## B. Queued keyword — row 9, `what is local seo` — GEO lens (King + Koray), resolved directly

**Verdict at intake: RED — pipeline stalled.** Row 9 has been skipped **six
times** across five weeks (first flagged 2026-08-18, still unresolved as of
the last skip note on 2026-08-23) for the same reason every time: it
duplicates `local-seo-for-small-business`'s opening H2, "What local SEO
actually is" (published 2026-08-17, one day before row 9 was first queued).
The general keyword pool has been **fully dry since 2026-08-23** — rows 1–15
are all claimed except this one — meaning this single unresolved row has
stalled the auto-poster's general-cluster output for roughly three weeks.
Nobody (queue-keeper or board) closed the loop the 2026-08-18 skip note
opened, despite five repeated escalating notes asking for exactly that.

**Board resolution, applied in this PR (Koray: core/outer topical map).**
Retiring the row is unnecessary — the term still has standalone value as an
**outer-layer glossary entry** feeding the `local-seo-for-small-business`
**core** page, which is exactly the shape the 2026-08-18 note already
proposed but nobody locked in. Locked angle, written into `content-queue.md`:
a ≈500–700 word direct-BLUF definition with no restated checklist content,
linking out to `local-seo-for-small-business` (full checklist),
`google-business-profile-optimization` (GBP), and `how-to-appear-on-google-maps`
(ranking factors) instead of re-explaining them. The row is unblocked for the
next auto-poster run; the differentiation-angle re-check no longer needs to
re-litigate this row.

**Separate, real blocker the board cannot clear from here (Business/Dan):**
rows 16–21 (tourism candidates, needed to hit the 60/40 tourism ratio) still
require a DataForSEO pass, which needs the DataForSEO MCP tool this cloud
review session does not have. Once row 9 clears, the general pool goes dry
again unless this happens in an interactive session. Flagged in the summary
below for Ben directly.

---

## C. `/pricing` — GEO lens (King + Koray) and Conversion lens (Wes McDowell)

**GEO verdict: 6/10.** The `<Bluf>` block (`page.tsx:126-132`) is a genuine
positive control — 50 words, states all three prices and terms outright, no
scene-setting, fully liftable. `FAQPage` JSON-LD matches the visible FAQ 1:1,
and one FAQ entry already targets the Lagos/Accra/Nairobi local-currency
fan-out. Below that, the page has zero price-bearing schema (`Offers`,
required by the skill's own table, shipped as an unenforced parenthetical)
and zero in-body links into the topical map — the same cross-link gap the
board caught on `/solutions` on 2026-08-04, recurring on a different page.

**Conversion verdict: 6/10.** Above-the-fold clarity and CTA discipline are
both correct (one CTA type, "Book a call," repeated consistently; no
competing button styles). The FAQ is genuinely Adversity/Reframe-level per
Wes's Scar Scale — "why cheaper than agency quotes," "who should NOT buy the
top tier," "what's not included" are real scar tissue, not marketing hedges.
But there is **zero social proof or trust signal anywhere on the page**,
right where the money objection is sharpest, and the closing `CtaDrop`'s
hardcoded secondary button ("See pricing" → `/pricing`) renders a dead,
circular link on the pricing page itself, at the exact moment an unsure
visitor is looking for help.

**Systemic drift → fixed in this PR.** Three consecutive site-page reviews
(`/solutions` ×2, now `/pricing`) have independently found zero trust/social-
proof signal in the page body, and the cross-link rule written into the skill
after the first `/solutions` finding did not prevent a second instance on
pricing — the rule existed, nothing enforced it before ship. Both fixed at
the skill level below: a new mandatory trust-signal rule, and the cross-link/
schema requirements converted from a rule the author has to remember into a
self-check the author runs before marking the page done.

---

## Agreement / disagreement

| Point | King/Koray (GEO) | Wes (Conversion) | Dan (Business) | Verdict |
|---|---|---|---|---|
| `/pricing`: zero in-body links to sibling pages | Flags it as the missing cross-link rule, same root cause as `/solutions` (08-04) | — | A rule that has to be remembered twice and still fails is a process bug, not a content bug | **Agree.** Fixed at the skill level (self-check, not a rule to recall). |
| `/pricing`: no trust/social-proof element | — | Flags it as the sharpest gap at the highest-stakes objection point (money) | Third consecutive page with this gap — pattern, not coincidence | **Agree.** New skill rule added (didn't exist before; the CTA/cross-link rules didn't cover it). |
| `/pricing`: should tier cards name AI-citation tracking explicitly | Wants an explicit AI-visibility bullet per tier + a `/geo-services` link — the flagship claim is absent from the one page buyers compare tiers on | Wants tier cards to stay scannable and plain — more bullets works against clarity-first design | Buyer decision speed (Wes) matters more at checkout than one more keyword surface (King) — but the fact is real and worth stating once | **Minor tension, resolved by combining.** Fold the AI-citation claim into the existing "Competitor position tracking" bullet (`page.tsx:56` → "Competitor + AI-citation tracking") and link it to `/geo-services`, instead of adding a new bullet per tier. No new copy density, both lenses satisfied. |
| Row 9 (`what is local seo`): stalled queue | Flags the duplication and proposes the outer-layer/glossary resolution | — | A single unresolved row silently costing three weeks of pipeline output is exactly the kind of thing the Buy-Back Principle says shouldn't need a human to notice | **Agree, and resolved in this PR** rather than logged as advice. The queue-keeper routine should also gain an escalation step (see to-do #7) so a row stuck past 2–3 skips surfaces automatically instead of accumulating skip notes indefinitely. |

No disagreement required a priority override beyond the tier-card point
above, which resolved by combining rather than choosing.

---

## Execution to-do (for the doer agent — highest leverage first)

Systemic fixes below are **already applied in this PR** (skills + queue
file). Content fixes are **not** — the board advises, it does not rewrite
pages; these are the hand-off for the next `afrishield-blog` /
`afrishieldai-seo` site-build run.

1. **[Applied]** `afrishieldai-seo/SKILL.md` — Pricing schema requirement
   hardened from an optional parenthetical to a named `pricingOfferJsonLd`
   helper requirement; cross-link rule extended with a mandatory pre-publish
   self-check (grep for `href=`, confirm 2+ contextual sibling links and
   every schema-table cell actually implemented); new trust-signal rule
   (board: Wes) for every `PageHero` page with 2+ sections; new `CtaDrop`
   self-link check.
2. **[Applied]** `afrishield-blog/SKILL.md` — HowTo-schema rule extended to
   require one shared source array feeding both the visible `<ol>` and
   `howToJsonLd`, mirroring the existing `FAQ` const pattern.
3. **[Applied]** `content-queue.md` — row 9 unblocked with a locked glossary
   angle (see Target B); the "claimed" bookkeeping table backfilled with row
   15, which was claimed in the main table but missing from that list.
4. **[Doer]** `top-geo-ai-seo-agencies-africa-2026`: split the fused
   BLUF/humor sentence at `page.tsx:363`; rewrite the FAQ-3 closing clause at
   `page.tsx:51` to a plain factual close; add Cameroon to
   `organizationJsonLd.areaServed` in `lib/structured-data.ts`.
5. **[Doer]** Execute GEO-syndication SOP (skill B.8) steps 2–3 for
   `top-geo-ai-seo-agencies-africa-2026` — PR-wire syndication and an
   indexation/benchmark verification pass — the built pillar page is not yet
   paying off without distribution.
6. **[Doer, next auto-poster run]** Write row 9 (`what is local seo`) to the
   locked angle now in `content-queue.md` — no further differentiation check
   needed, the angle is the brief.
7. **[Doer/queue-keeper]** Run a DataForSEO pass on rows 16–21 (tourism
   candidates) in an interactive session with the DataForSEO MCP tool before
   the general pool runs dry again post-row-9. Consider adding an
   auto-escalation step to the queue-keeper routine so a row stuck past 2–3
   skipped runs surfaces on its own instead of accumulating skip notes.
8. **[Doer]** `/pricing`: add `Offers` schema via the new
   `pricingOfferJsonLd` helper sourced from `TIERS` (`page.tsx:30-79`); add a
   trust element (`TrustStrip` or a `/case-studies` link) between the tier
   grid and FAQ (`page.tsx:178-184`); fix `CtaDrop`'s hardcoded `/pricing`
   secondary link (add `secondaryHref`/`secondaryLabel` props, point
   elsewhere on the pricing page itself); add in-body links from Foundation's
   "Technical audit and fixes" (`page.tsx:37`) to `/solutions` and from the
   Operation FAQ's "the loop" (`page.tsx:96`) to `/how-it-works`; fold an
   AI-citation-tracking mention into the existing "Competitor position
   tracking" bullet (`page.tsx:56`) linked to `/geo-services`; add a 7th FAQ
   entry on mobile-money/Paystack/Flutterwave payment methods; add a
   one-line self-select caption near the tier grid (e.g. "Most first calls
   end with us recommending Foundation or Engine, not Operation").
9. **[Note for next rotation]** `/how-it-works` is next in the site-page
   rotation and, per the 2026-08-04 report, likely has the same
   no-reachable-CTA and no-cross-link pattern `/solutions` and `/pricing`
   both had — worth a quick check regardless of when its scheduled turn
   lands, since the new self-check rules should catch it proactively going
   forward.

---

## Summary

**Targets:** most recent post (`top-geo-ai-seo-agencies-africa-2026`), the
one queued brief (`what is local seo`), and `/pricing` (rotation resumed
after stalling twice on `/solutions`). **Lenses:** GEO on all three,
Conversion added on `/pricing`. **Scores:** post 7.5/10 (liftable-opener
discipline held this time; two narrow humor-placement fixes and an entity
gap remain), pricing 6/10 GEO / 6/10 Conversion (strong BLUF and honest FAQ,
but no price schema, no in-body links, no trust signal). **Top actions:**
fix the two humor-placement slips and the Cameroon entity gap on the post;
add pricing/Offers schema, a trust element, and cross-links to `/pricing`;
execute the GEO-syndication SOP's distribution steps that the post itself
skipped. **Disagreement:** GEO wanted an explicit AI-citation bullet per
pricing tier, Conversion wanted tier cards to stay lean — resolved by folding
the claim into an existing bullet rather than adding one. **Systemic:** the
cross-link rule from 08-04 didn't stop a repeat on `/pricing` — rules now
converted to a pre-publish self-check; a new trust-signal rule was added
after three straight pages lacked one; row 9's five-week stall was resolved
directly rather than logged again. **Also flagging to Ben directly:** this
review's own cadence slipped 38 days (last run 2026-08-04) — worth checking
the trigger; and rows 16–21 need a DataForSEO pass in an interactive session
or the queue goes dry again shortly. **PR:** branch
`board/review-2026-09-11`, opened against `master`.
