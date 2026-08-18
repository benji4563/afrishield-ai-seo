# AfriShield Board of Advisors — review, 2026-08-18

Twice-weekly scheduled review. Targets per the routine's rotation: (a) most
recently published blog post, (b) next `queued` keyword in `content-queue.md`
(reviewed as an upcoming brief), (c) one site page from the rotation
(solutions → pricing → how-it-works → about → contact). `/solutions` was
reviewed twice already (2026-07-31, 2026-08-04) — this run advances the
rotation to **pricing**, its first board review.

Lenses run: **GEO** (Mike King + Koray Tuğberk Gübür — `board-geo-reviewer`),
**Conversion** (Wes McDowell — `board-conversion-reviewer`). Both ran
independently on the pricing page per the routing table's "landing/service
page → both lenses" rule.

---

## Target A — Blog post: `seo-vs-google-ads`

**File:** `app/blog/seo-vs-google-ads/page.tsx` (published 2026-08-18)
**Lens:** GEO (King + Koray) — single-area target.

**Verdict: 8/10.** The cleanest liftable-opener pass the board has seen: all
8 `<h2>` sections answer their heading outright in the first sentence, no
exceptions. Structured data (`blogPostingJsonLd`, `faqPageJsonLd`,
`howToJsonLd`, `breadcrumbJsonLd`) is complete and well-formed, and the
`HowTo` steps match the visible numbered list. Query fan-out (cost, speed,
what happens when you stop paying, compounding, side-by-side, which to fund
first, running both) is genuinely comprehensive, stays in source context,
and is honest against interest about AfriShield's own bias toward selling
the compounding half of the comparison. Cannibalization check against
cluster-B siblings (`answer-engine-optimization`, `how-to-rank-on-chatgpt`)
is clean — different sub-topic, no overlap.

**Concrete fixes:**
1. Zero in-body links to `/pricing` or `/solutions`, despite the post's
   entire framing being "which one should a small business fund first" — a
   decision-stage, budget question. Two sibling decision-stage posts
   (`is-seo-worth-it`, `how-to-reduce-ota-commission`) already do this on
   the writer's own initiative; this post skipped it. Add one link in the
   `best-fit` or `run-together` section.
2. Minor entity gap: the post never uses "paid search" or "PPC" as a
   synonym for "Google Ads" — work it in once to widen embedding-space
   coverage for that phrasing variant.

**Systemic drift → fixed in this PR:** the contextual-links rule in
`afrishield-blog/SKILL.md` only required links to cluster siblings, with no
requirement to link into `/pricing`/`/solutions` on commercial-intent posts
— so this kept depending on individual writers noticing rather than being
structural. Added an explicit rule (see "Skill edits" below).

---

## Target B — Queued keyword: `what is local seo` (row 9, cluster E)

**Source:** `content-queue.md`, the row that had been stuck `queued` since
before 2026-08-17 and was explicitly skipped by the auto-poster on
2026-08-18 pending a board decision.
**Lens:** GEO (King + Koray) — decision brief, not a content review.

**Verdict: retire.** `local-seo-for-small-business` (published 2026-08-17)
already carries a fully self-contained, quotable chunk for this exact query
— the `ShortAnswer` block plus the FAQ entry "What is local SEO for a small
business?" (with matching `faqPageJsonLd`) — and that same post's FAQ
already answers the cost, timeline, address-requirement, and
DIY-feasibility fan-out for this term. A second page targeting the same
head term would compete for the same query vector, not extend it (King),
and at SV~10 the cannibalization risk (Koray: "cannibalization still hurts
rankings today," per his 2026-07-29 doctrine update) outweighs the volume.
No overlap risk from `google-business-profile-optimization` — its FAQ
covers a genuinely distinct sub-entity (ongoing profile maintenance, not
local SEO as a whole).

The one angle that would be a legitimate, distinct semantic unit — a true
glossary with `DefinedTerm` entries (NAP, prominence, service-area
business, map pack, etc.), not a narrative "what is local SEO" H2/
`ShortAnswer` — is defensible in principle under Koray's topical-map
doctrine but not worth building for SV~10 right now; pipeline capacity is
better spent on rows 11–15.

**Systemic drift → fixed in this PR:** `content-queue.md` row 9 marked
`retired` (was `queued`) with the reasoning above, so the auto-poster never
revisits it and the queue-keeper doesn't need to re-litigate the decision.
Revisit only if SV rises or a future cluster-E core post creates a genuine
definitional gap.

---

## Target C — Site page: `/pricing`

**File:** `app/pricing/page.tsx`
**Lenses:** GEO (King + Koray) and Conversion (Wes) — landing/service page,
both required. First board review of this page.

**GEO verdict: 6/10.** The `Bluf` block leads with the number, no soft
opener, and the FAQ (6 questions) covers currency/market, contract term,
exclusions, and who-shouldn't-buy-top-tier well. Two real gaps:

1. **No Offer/Product structured data.** `afrishieldai-seo/SKILL.md`'s own
   schema table already specifies `Pricing | FAQPage (+ Offers with price/
   currency)`, and `lib/structured-data.ts` already exports a reusable
   `professionalServiceJsonLd` with a fully-formed `hasOfferCatalog` of the
   three tiers — but it's wired into the home page only. `/pricing` ships
   with `FAQPage` + `BreadcrumbList` and no machine-readable price entity
   of its own, on the one page whose entire job is answering "how much does
   this cost."
2. **Zero in-body contextual links** — only `/contact` buttons and the
   closing `CtaDrop`. This is the identical defect the board found on
   `/solutions` on 2026-08-04, just never checked on `/pricing` until this
   cycle, despite the skill already stating Solutions/Pricing/How-it-Works
   "must link each other contextually from within the page content."

Minor: no FAQ entry on what happens to existing content/rankings if a
client cancels — a natural objection-fan-out question currently uncovered.

**Conversion verdict: 6/10.** Above-the-fold clarity is the strongest part
of the page (eyebrow, title, blurb pre-empt the "contact us" pricing
objection immediately), and per-tier CTAs plus the closing `CtaDrop` mean
this page structurally satisfies the CTA-placement rule the board wrote
after `/solutions` failed it — a genuine improvement, no drift there. But:

1. **Zero trust signals** — no testimonial, client count, or `/case-studies`
   link anywhere on the page. This is the exact same gap `/solutions`
   shipped with on 2026-07-31/08-04, and the fix written into the skill
   that time (CTA-placement + cross-links) never covered trust signals, so
   it recurred untouched on the very next money page reviewed.
2. **CTAs lose context.** All three tier "Book a call" buttons point to the
   same generic `/contact` with no tier parameter — a visitor who
   deliberates between Foundation/Engine/Operation has that decision
   discarded at the exact conversion moment and re-explains it on a blank
   form.
3. **Self-referential closing CTA bug.** The page's `CtaDrop` uses the
   component's hardcoded default secondary button, "See pricing" →
   `/pricing` — a dead link, since the visitor is already there. `CtaDrop`
   has no prop to override it.
4. Multi-currency FAQ says invoicing happens in local currency "just ask on
   the call" but never names the payment mechanism (bank transfer, card,
   mobile money) — a real purchase-blocking question for the target market,
   deferred rather than answered.

**Systemic drift → fixed in this PR:** trust-signal absence is now a
missing rule at the skill level (was never written down after `/solutions`)
— added a standing "Trust checkpoint" rule. Offer/Product schema is now
explicitly required on `/pricing`, not just implied by the schema table.
Cross-link requirement is now a checked-at-build-time checklist item, not
only prose in the SOP body. The `CtaDrop` self-referential-link bug and the
tier-context-loss on CTAs are page/component-level fixes, left for the doer
(see execution to-do).

---

## Agreement / disagreement

| Point | King/Koray (GEO) | Wes (Conversion) | Dan (Business) | Verdict |
|---|---|---|---|---|
| `seo-vs-google-ads`: missing commercial link | Flags zero link to `/pricing`/`/solutions` on a funding-decision post | — | A rule that depends on individual writers noticing is not a system | **Agree.** Fixed the skill (explicit rule for decision-stage posts), not just this post. |
| `what is local seo`: retire vs. narrow | Retrieval + cannibalization both argue retire over a low-SV glossary rebuild | — | SV~10 doesn't justify the build-time cost of a differentiated glossary page right now | **Agree.** Retired in `content-queue.md`. |
| `/pricing`: missing Offer schema | Flags the skill's own spec (`FAQPage (+ Offers)`) was never implemented on this page | — | — | **GEO-only, act.** Fixed the skill (explicit build-time checklist item). |
| `/pricing`: zero in-body links | Flags identical defect to `/solutions` (2026-08-04), never checked here until now | Independently flagged the same zero-link finding as a topical-map / objection-handling gap | Second consecutive money page to fail a rule already written down — the rule wasn't enforced, only stated | **Agree, and a repeat.** Fixed the skill (checklist item, not just prose). |
| `/pricing`: zero trust signals | — | Flags identical defect to `/solutions`; the prior fix never covered it | Founder/ops time wasted re-discovering the same gap on every money page instead of it being structural | **Agree — the real disagreement worth naming: the 2026-08-04 fix under-scoped the problem.** That review wrote a CTA-placement rule but not a trust-signal rule, so this recurred untouched. Resolved by adding the missing rule now rather than re-litigating scope after the fact. |
| `/pricing` CTA cadence | — | Confirms structurally compliant (per-tier CTA + closing block) but flags context loss (`/contact` with no tier) and a self-referential `CtaDrop` link bug | — | **Wes-only, act.** Both are page/component fixes for the doer. |

No priority override was needed this cycle (King/Koray outranking tactics,
Wes/Dan breaking ties on order) — every finding either stood alone or
reinforced a finding from another lens pointing at the same root cause. The
one point worth naming plainly as a process gap, not a lens conflict: the
2026-08-04 review fixed `/solutions`'s CTA and cross-link problems but not
its trust-signal problem, and that gap silently carried into `/pricing`
until this cycle caught it. Fixed now at the skill level so it can't repeat
a third time on `/how-it-works`, `/about`, or `/contact`.

---

## Execution to-do (for the doer agent — highest leverage first)

Systemic fixes below are **already applied in this PR** (skills + queue
file). Content/component fixes are **not** — the board advises, it does not
build; these are the hand-off for the next `afrishieldai-seo` / site-build
or `afrishield-blog` run.

1. **[Applied]** `afrishieldai-seo/SKILL.md` — added the "Trust checkpoint
   before or at first CTA" rule (board: Wes), an explicit Offer/Product
   requirement for `/pricing` sourced from the same tier data as the visible
   cards (board: King), and three new B.7 build-time checklist items
   (in-body cross-link on every core money page, trust signal at first CTA,
   Offer entity on `/pricing`) so these are checked per-page, not only
   discovered at first board review.
2. **[Applied]** `afrishield-blog/SKILL.md` — contextual-links rule now
   requires a `/pricing` or `/solutions` link on decision/commercial-intent
   posts (cluster D, comparison/ROI posts), citing `is-seo-worth-it` and
   `how-to-reduce-ota-commission` as the existing good examples.
3. **[Applied]** `content-queue.md` — row 9 (`what is local seo`) marked
   `retired` with full reasoning; retirement note replaces the stale skip
   note.
4. **[Doer]** `/pricing`: add an Offer/Product JSON-LD entity per tier,
   sourced from the `TIERS` array already rendering the cards.
5. **[Doer]** `/pricing`: add a trust element — a short line + link to
   `/case-studies` near the tier grid or FAQ header (note: `/case-studies`
   currently withholds hard metrics pending client-data clearance, so this
   buys process-transparency credibility, not number-backed proof, until
   that clears).
6. **[Doer]** `/pricing`: add in-body cross-links — "the technical work"
   line → `/solutions`; the publishing-cadence FAQ answer → `/how-it-works`.
7. **[Doer]** `/pricing`: fix the self-referential closing `CtaDrop`
   (defaults to "See pricing" → `/pricing` while already on that page) —
   add an optional `secondaryHref`/`secondaryLabel` prop to `CtaDrop` and
   point it at `/case-studies` or `/how-it-works` here.
8. **[Doer]** `/pricing`: carry tier selection into the CTA (e.g.
   `/contact?tier=engine`) so a visitor's choice isn't discarded at the
   conversion moment; name the payment mechanism (bank transfer / card /
   mobile money) in the multi-currency FAQ instead of deferring to the call.
9. **[Doer]** `seo-vs-google-ads`: add one in-body link to `/pricing` or
   `/solutions` in the `best-fit` or `run-together` section; work "paid
   search"/"PPC" in once as a synonym for "Google Ads."
10. **[Note for next rotation]** `/how-it-works` and `/about` have not been
    checked against the new trust-checkpoint and cross-link checklist items
    — worth an early look rather than waiting for their scheduled turn,
    since `/pricing` just demonstrated the gap repeats silently otherwise.
