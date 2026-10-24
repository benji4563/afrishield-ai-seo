# AfriShield Board of Advisors — review, 2026-09-04

Twice-weekly scheduled review. Targets chosen per the rotation in the routine
prompt: (a) most recently published blog post, (b) next `queued` keyword in
`content-queue.md`, (c) one site page from the rotation (solutions, pricing,
how-it-works, about, contact — this run: **pricing**, second in rotation;
`/solutions` was the target of both the 2026-07-31 and 2026-08-04 reviews and
no other page has been reviewed since).

Lenses run: **GEO** (Mike King + Koray Tuğberk Gübür — `board-geo-reviewer`),
**Conversion** (Wes McDowell — `board-conversion-reviewer`). Business (Dan
Martell) is applied directly below as the chairman synthesis over the
recurring pattern across all three targets, per the routing table's
"anything strategic" trigger and to break one explicit tie the GEO lens
punted upward.

---

## Target A — Blog posts: `top-geo-ai-seo-agencies-africa-2026` (+ companion `enterprise-geo-launch-africa`)

**File:** `app/blog/top-geo-ai-seo-agencies-africa-2026/page.tsx`
**Lens:** GEO (King + Koray) — published 2026-08-30 as the pair implementing
the new B.8 GEO Citation SOP.

**Verdict: AMBER (5.5/10).** Mechanically strong retrieval engineering
(BLUF, TOC, `HowTo`/`ItemList`/`FAQPage` schema, cluster links to the
companion post and `answer-engine-optimization`) undercut by a real
corroboration gap: the `itemListJsonLd` names three competitor
`Organization`s — Nairobi Marketing, SEO Smart Limited, Digital 4 Africa —
that appear **nowhere else in the repo**, with no `url`/`sameAs`, while
AfriShield alone gets a real `url`. Publishing `schema.org/Organization`
markup for entities that cannot be corroborated is precisely the kind of
thing that tanks trust once a model or a human cross-checks it, and turns an
"objective comparison" into something closer to a fabricated field.

**Concrete fixes (ranked):**
1. Add real `url`/`sameAs` for the three competitor Organizations from
   actual public sources, or explicitly relabel them as illustrative
   composites in both copy and schema — as shipped this is a corroboration
   liability, not just a bias-optics one.
2. The self-serving-bias disclosure ("we have a stake and say so plainly")
   is one sentence; AfriShield still sits at position 1 with the longest
   profile and none of the five ranking criteria are actually scored
   per-agency. Add a visible per-criterion rating across all four so
   "objective" is checkable.
3. `##matrix` and `##profiles` H2 openers are meta-descriptive ("The matrix
   below compares…"), not answers — not liftable in isolation per King's
   chunk-retrieval doctrine.
4. All four competitor profiles use an identical scaffold with no
   differentiated, falsifiable detail (dates, HQ specifics, a case example)
   — close to templated filler under Koray's content-effort doctrine.
5. No direct in-body link to `/geo-services` from the site's highest
   commercial-value comparison page — conversion currently routes through
   another blog post first.
6. FAQ skips the fan-out question a skeptical reader/model would ask given
   self-inclusion: "how were these agencies selected/verified."

**Systemic drift → fixed in this PR.** The B.8 SOP (`afrishieldai-seo/
SKILL.md`) instructed an "objective comparison ... alongside 3–4 legitimate
regional competitors" with no verification/sourcing step. Added a
**competitor-verification gate** to B.8 requiring real `url`/`sameAs` or an
explicit composite label, plus a required selection-methodology FAQ entry.

---

## Target B — Queued keyword: `what is local seo` (row 9, cluster E)

**Source:** `content-queue.md`, the only `queued` row (all others `claimed`
or `candidate`), reviewed as an upcoming brief.
**Lens:** GEO (King + Koray), resolved by Business (Dan Martell) below.

**Verdict: AMBER on the keyword, RED on process.** The keyword has genuine
standalone intent, but it cannot run as a standard full post — the opening
chunk would re-derive `local-seo-for-small-business`'s existing H2 ("What
local SEO actually is") almost verbatim, and Koray's doctrine is explicit
that cannibalization still hurts. The far bigger problem: **six** auto-poster
runs (2026-08-18 → 2026-08-23) hit this row, filed an identical diagnosis,
and asked the queue-keeper to act — five times, verbatim. Nothing happened,
because **no `queue-keeper` skill file exists anywhere in the repo** despite
being named three times in `content-queue.md`'s own rules. This is an unowned
automation gap, not a content problem, and it's compounding: the same skip
notes show the general pool ran dry and the tourism candidates (rows 16–21)
are stuck un-vetted for the identical reason.

**Business/chairman resolution (tie-break — see disagreement table):**
**retired**, not narrowed to a glossary page. `local-seo-for-small-business`'s
FAQ already answers "What is local SEO for a small business?" verbatim —
sufficient standalone-retrievable coverage of the definitional query at
SV~10, zero incremental commercial value. Spending a write-cycle on a new
400–600-word glossary page for that volume is negative leverage; folding
the intent into schema the site already has is the buy-back-time move.
**Applied in this PR:** row 9 status set to `retired` in `content-queue.md`.

**Systemic fixes, ranked:**
1. **[Applied]** Escalation rule added to `content-queue.md`: a row skipped
   twice by the differentiation-angle check now goes `blocked`, not another
   silent `queued` skip — a human/interactive pass must resolve it.
2. **[Applied]** Row 9 resolved (retired) so it stops costing runs.
3. **[Flagged, not built this PR]** A real `queue-keeper` skill still needs
   to exist — it's referenced in doctrine but has no artifact. Building a
   full new automation skill is bigger than a twice-weekly review's scope;
   flagging explicitly to the user rather than bolting it on here. The
   `blocked`-status rule above is a stopgap, not a replacement.
4. Same root cause explains the unmet 60/40 tourism ratio — bundle into the
   same fix rather than treating as a separate incident.

---

## Target C — Site page: `/pricing`

**File:** `app/pricing/page.tsx`
**Lens:** Conversion (Wes McDowell) — landing/money page per the routing
table; rotation slot after `/solutions`.

**Verdict: AMBER (7/10).** Above-the-fold + BLUF pass the what/who/what-next
test fast, and — unlike `/solutions` pre-fix — the CTA cadence already
complies with the 2026-08-04 CTA-placement rule: three "Book a call" buttons
sit in the first content section, plus the closing `CtaDrop`. The
excludes-lists / "who should not buy the top tier yet" / no-lock-in framing
is exactly the honest-failure pattern the doctrine cites as scoring higher
on credibility than polished-only copy. **No new CTA-cadence rule is needed
for this page.**

**Concrete fixes (ranked):**
1. **Zero trust/social-proof signal anywhere on the page** — no client
   count, logo, testimonial, or case-study link, in the hero, beside the
   tiers, or in the FAQ. For a page whose job is booking a call around a
   specific dollar figure, this is the single highest-friction gap.
2. "Who should not buy the top tier?" talks a buyer out of Operation but
   gives them nothing to click — add an in-line link back to Foundation or
   `/how-it-works`.
3. The "Most chosen" badge on Engine has no backing number or stated
   rationale — substantiate it or drop it.
4. All three tiers use identical CTA copy ("Book a call" × 3), flattening
   the visual hierarchy the featured-tier styling is trying to create.
5. No stated next step after "Book a call" (length, format, who they'll
   talk to) — one sub-line would lower activation-energy friction.
6. Minor: "Every tier includes the technical work" is unlinked plain text —
   a natural cross-link to `/solutions`.

**Systemic drift → fixed in this PR.** `/solutions` (2026-08-04) was flagged
for the identical zero-trust-signal gap and it was only logged in that
report, never elevated to a skill rule. `/pricing` independently repeating
it is the pattern threshold. **Added** a "trust signal, minimum one per
page" rule to `afrishieldai-seo/SKILL.md` (B.3) covering every
landing/money page.

---

## Agreement / disagreement

| Point | King/Koray (GEO) | Wes (Conversion) | Dan (Business) | Verdict |
|---|---|---|---|---|
| Comparison post: unverifiable competitor entities in schema | Flags as the single highest-risk item on the page | — | A live public page presenting unverifiable businesses as real is brand/accuracy risk compounding the longer it stays up — automation that creates liability isn't leverage | **Agree — top priority.** Skill-level gate added now; page fix is the doer's next action, not deferred. |
| Row 9 resolution: narrow to a glossary page vs. retire | Proposes narrow-to-glossary as the durability/fan-out-coverage option, explicitly defers the final call to business | — | Retire — SV~10, zero incremental commercial value, and the live FAQ already covers the query; spending a run on a low-value new page while six runs already burned on indecision is the opposite of buying back time | **Disagreement, resolved.** Business breaks the tie per the routing table (conversion/business break ties on *what to do first* — this is a resource-allocation call, not a correctness dispute). Retired. |
| Queue-keeper missing / six skipped runs with no action | Flags as a RED process failure, recommends `blocked`-status escalation | — | Confirms — classic Buy-Back-Your-Time delegation failure: a routine keeps escalating and nothing built ever answers it | **Agree.** Escalation rule applied now; full `queue-keeper` skill flagged to the user as separate, larger scope. |
| Trust-signal gap on `/pricing` (recurring from `/solutions`, 2026-08-04) | Koray's corroboration/content-effort doctrine reinforces it indirectly | Flags zero social proof as the #1 leverage fix on this page | Two independent pages hitting the identical gap is a pattern, not a coincidence — belongs at the skill level, not caught page-by-page by the board | **Agree.** Promoted to a repo-wide skill rule this run. |
| `/pricing` CTA cadence | — | Confirms it already complies with the 2026-08-04 CTA-placement fix | Good — the prior systemic fix is holding without a repeat review catching a regression | **Agree, no action needed.** |

---

## Execution to-do (for the doer agent — highest leverage first)

Systemic fixes below are **already applied in this PR** (skills + queue
file). Content fixes are **not** — the board advises, it does not write
pages; these are the hand-off for the next `afrishield-blog` / site-build
run.

1. **[Doer — urgent, live page]** Fix `top-geo-ai-seo-agencies-africa-2026`'s
   `itemListJsonLd`: add real `url`/`sameAs` for Nairobi Marketing, SEO
   Smart Limited, and Digital 4 Africa, or explicitly relabel them as
   illustrative composites in copy and schema. This is on a published page
   right now — highest urgency of anything in this review.
2. **[Applied]** `afrishieldai-seo/SKILL.md` B.8 — competitor-verification
   gate + required selection-methodology FAQ entry for every future
   comparison-guide post.
3. **[Applied]** `afrishieldai-seo/SKILL.md` B.3 — trust-signal-minimum rule
   for every landing/money page.
4. **[Applied]** `content-queue.md` — row 9 retired; two-skip → `blocked`
   escalation rule added.
5. **[Doer]** Add a visible per-criterion rating across all four agencies in
   the comparison table; rewrite the `##matrix`/`##profiles` H2 openers to
   answer directly; add one differentiated, checkable fact per competitor
   profile; add a direct in-body CTA/link to `/geo-services`.
6. **[Doer]** `/pricing`: add one concrete trust element near the BLUF or
   Engine card; link the "who should not buy the top tier" answer back to
   Foundation/`/how-it-works`; substantiate or drop the "Most chosen" badge;
   differentiate the three CTA labels; add a one-line "what the call is"
   note; link "the technical work" mention to `/solutions`.
7. **[Flag to user — separate scope]** Build the missing `queue-keeper`
   skill (promote `candidate`→`vetted` via DataForSEO on schedule; resolve
   `blocked` rows). It's named in doctrine three times but has never
   existed as an artifact — that's why five prior escalations produced zero
   action.
8. **[Note for next rotation]** `/how-it-works` shares `/solutions`'s
   `PageHero` pattern and was flagged back in 2026-08-04 as likely to have
   the same no-reachable-CTA problem — it's next in the page rotation
   anyway, worth confirming then.
