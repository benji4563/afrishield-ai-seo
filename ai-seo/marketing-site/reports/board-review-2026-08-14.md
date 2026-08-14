# AfriShield Board of Advisors — review, 2026-08-14

Twice-weekly scheduled review. Targets chosen per the rotation in the routine
prompt: (a) most recently published blog post, (b) next `queued` keyword in
`content-queue.md`, (c) one site page from the rotation (solutions, pricing,
how-it-works, about, contact — solutions was reviewed in both the 2026-07-31
and 2026-08-04 runs, so this run: **pricing**, next in rotation).

Lenses run: **GEO** (Mike King + Koray Tuğberk Gübür — `board-geo-reviewer`)
on all three targets, **Conversion** (Wes McDowell — `board-conversion-reviewer`)
on the pricing page. Business (Dan Martell) is applied directly below as the
chairman synthesis over the pattern across targets B and C, per the routing
table's "anything strategic" trigger — the recurring enforcement failure this
run surfaces is a systems problem, not a content problem.

---

## Target A — Blog post: `how-long-does-seo-take`

**File:** `app/blog/how-long-does-seo-take/page.tsx` · **Lens:** GEO (King + Koray)
**Verdict: 7/10.**

Solid template execution: every H2 opens with a liftable, direct-answer
sentence; four correct JSON-LD types; good query-fan-out coverage (raw
timeline, indexed/ranked/trafficked distinction, competitive-keyword
variance, when SEO is the wrong tool); three well-framed contextual links
into `what-seo-actually-costs`, `small-business-seo`, and `is-seo-worth-it`.

Three concrete gaps:

1. **Schema/visible-content mismatch.** The `howToJsonLd` block is built from
   `CHECK_STEPS`, but the visible `<ol>` in `check-progress` is hand-typed
   with different wording for all five steps — same meaning, different
   strings. An engine cross-checking schema against the rendered passage sees
   a paraphrase, not a match. Sibling posts map the array directly into the
   `<ol>`; this one should too.
2. **One-directional topical link.** This post is the deeper, month-by-month
   treatment of a timing claim two *older* posts already make in compressed
   form (`is-seo-worth-it`'s "little visible movement in the first eight to
   twelve weeks" section, `what-seo-actually-costs`'s "add the ramp" section).
   Neither older post links forward to this new, more detailed treatment —
   the link graph resolves one way only.
3. **Zero AI-search framing.** No mention of ChatGPT, Perplexity, Gemini, or
   AI Overviews anywhere in an "expectations" post on AfriShield's own
   AI-SEO site. Reads like it mirrored generic-SEO competitor pages from SERP
   research rather than the site's own AI-answer-visibility positioning —
   `is-seo-worth-it` already sets the precedent with an AI-assistant FAQ
   entry.

**Systemic (fixed at skill level, this PR):** all three recur across future
posts, not just this one. Added to `afrishield-blog/SKILL.md`: (a) render
numbered lists from the same array the schema is built from, not a
hand-typed parallel version; (b) a topical-map backfill step — when a new
post deepens an older post's compressed claim, link back from the old post;
(c) a mandatory AI-search-angle check that doesn't rely on SERP research
alone, since generic-SEO competitors won't surface that angle by
construction.

---

## Target B — Queued keyword: `local seo for small business` (row 8, cluster E)

**Lens:** GEO (King + Koray) — pre-task differentiation check on an
upcoming brief, per the standing content-queue rule.

**Verdict: not safe to write as-is — needed a specific angle, now assigned.**
As a bare head-term post it would substantially restate three live posts in
miniature: the GBP mechanics owned by `google-business-profile-optimization`,
the initial-setup steps owned by `how-to-get-my-business-on-google`, and the
general SMB framing owned by `small-business-seo`. None of them owns the
local-pack ranking system itself (proximity/relevance/prominence), NAP/
citation consistency, cross-platform review strategy, or a budget-prioritized
decision tree — that gap is a real, available angle.

**Angle assigned (written into `content-queue.md` row 8):** own the
ranking-factors/NAP/reviews synthesis layer, link out to the two existing
posts for execution detail rather than re-deriving it, and explicitly do
*not* claim the "what is local SEO" definitional territory.

**Systemic drift caught:** row 9 (`what is local seo`) shares the same
cluster letter and was queued directly behind row 8 with no angle of its own
— it would have collided with whatever row 8 became. Pre-annotated row 9 too
(stay purely definitional, link forward to row 8) and added a standing rule
to both `content-queue.md` and `afrishield-blog/SKILL.md`: whenever two
`queued` rows share a cluster letter, assign angles to both before either is
claimed, not just the one about to be written.

---

## Target C — Site page: `/pricing`

**File:** `app/pricing/page.tsx` · **Lenses:** Conversion (Wes) 6/10, GEO
(King + Koray) 4/10.

The copy itself is the best writing on the site — honest FAQ tone, real
prices, no "contact us" tier, a textbook liftable BLUF block. Both lenses
converge on the same underlying problem from different angles:

**Conversion (Wes) — 6/10:**
1. **Live bug, highest priority:** the closing `CtaDrop`'s hardcoded
   secondary button reads "See pricing" → `/pricing` — the page the visitor
   is already on. A dead click at the exact moment (bottom of funnel) a
   hesitant visitor needs a low-friction alternative to booking. `CtaDrop`
   has no override prop, so no page can fix this without the component
   itself being changed.
2. Zero in-body cross-links to `/solutions` or `/how-it-works` — natural
   anchors already exist in the FAQ and closing copy.
3. No trust/proof signal anywhere on the page (same gap flagged on
   `/solutions` twice already) despite `/case-studies` existing in nav.
4. Identical CTA copy across all three tier cards — a missed
   pricing-psychology beat given the "Most chosen" decoy structure already
   in place.

**GEO (King + Koray) — 4/10:**
1. No `Offer`/`Product` schema for the three tiers — the exact data already
   exists in `lib/structured-data.ts`'s `hasOfferCatalog` but is wired only
   into Home, not the page it's actually about.
2. Zero in-body contextual links (confirmed independently) — same finding as
   Conversion's #2, from the topical-map side.
3. Fan-out gap: "when do results show" is unanswered on the one page where a
   buyer asks it next, despite `how-long-does-seo-take` and `is-seo-worth-it`
   existing to answer it.

**Confirmed systemic, not page-specific:** both reviewers independently
checked `/how-it-works` and found the identical gap — zero in-body links,
incomplete schema. This is the *same* rule the board wrote into
`afrishieldai-seo/SKILL.md` on 2026-08-04 after the first `/solutions`
review. **It has now survived two full review cycles across three separate
pages without a single page being corrected.** The doctrine was right; only
execution failed, twice.

---

## Agreement / disagreement

| Point | GEO (King/Koray) | Conversion (Wes) | Verdict |
|---|---|---|---|
| `/pricing` in-body cross-links | Missing — fan-out/topical-map gap | Missing — same finding | **Full agreement**, two lenses independently confirming the identical gap |
| `/pricing` schema/trust completeness | Missing `Offer` schema | Missing trust/social-proof signal | **Agreement on symptom, different diagnosis** — both read as "this page asserts, it doesn't corroborate"; not a conflict, addressed by separate fixes |
| Priority order on `/pricing` | Would lead with schema (durability) | Would lead with the `CtaDrop` self-link bug (live defect) | **Resolved, not a real disagreement.** The `CtaDrop` bug is a functional defect (a dead click in production), not a tactical judgment call — correctness outranks enhancement regardless of lens per the routing rule, so it goes first on the execution list below; schema and cross-links follow immediately after, both durability-grade fixes. |
| `how-long-does-seo-take` overall quality | 7/10 — solid, three concrete gaps | not reviewed (single-lens target) | n/a |
| `local seo for small business` | Needs an assigned angle before writing | not reviewed (pre-task target) | n/a |

No lens disagreed on direction anywhere this run — the disagreements that
existed were about sequencing, not substance, and are resolved above.

**Business (Dan Martell) — chairman synthesis:** the real finding this run
isn't any one page, it's that a written skill rule survived two board
reviews and zero corrections. That's not a content gap, it's a
delegation-loop failure — the board (quality system) is doing its job,
but the doer agent isn't closing on the resulting to-dos, meaning founder
time is what eventually catches it. Per the buy-back principle, a rule that
requires a human to re-notice it every cycle isn't a system yet. Converted
both open rules (cross-links, Pricing `Offer` schema) from written doctrine
into mechanical, build-blocking checklist items in `SKILL.md` B.7 this run
— the fix for "the rule doesn't get executed" is not writing the rule more
insistently, it's making it fail a check instead of a memory.

---

## Execution to-do (ordered, for the doer agent — highest leverage first)

1. **[Wes — correctness, do first]** Fix `CtaDrop` (`components/home/CtaDrop.tsx`):
   add `secondaryHref`/`secondaryLabel` props, and on `/pricing` pass a
   target that isn't `/pricing` (e.g. "See how it works" → `/how-it-works`).
2. **[King + Koray]** `/pricing`: add `Offer`/`Product` JSON-LD per tier,
   reusing the existing `hasOfferCatalog` data from `lib/structured-data.ts`.
3. **[Koray]** `/pricing`: add ≥2 in-body contextual links — FAQ "why
   cheaper than agency quotes" → `/blog/what-seo-actually-costs`; FAQ "what
   if it's not working after three months" → `/blog/is-seo-worth-it`;
   closing line → `/solutions`.
4. **[Koray]** `/how-it-works`: same cross-link + schema audit — confirmed
   to have the identical gap; do not leave it as the one page nobody
   happened to look at this cycle.
5. **[Wes]** `/pricing`: add one credibility line/link to `/case-studies`
   near the pricing grid or FAQ header.
6. **[Koray]** `/blog/is-seo-worth-it` and `/blog/what-seo-actually-costs`:
   add a one-line backfill link forward to `/blog/how-long-does-seo-take`
   from their compressed timing claims.
7. **[King]** `/blog/how-long-does-seo-take`: render the `check-progress`
   `<ol>` from `CHECK_STEPS` directly instead of hand-typed parallel prose;
   add one sentence/FAQ entry tying the post to AI-search visibility.
8. **[King/Koray]** Auto-poster: when it next claims row 8
   (`local seo for small business`), write to the angle now recorded in
   `content-queue.md` — ranking-factors/NAP/reviews synthesis, linking out
   rather than re-deriving GBP/setup detail.
9. **[Wes]** `/pricing`: vary the three tier CTA labels ("Start with
   Foundation" / "Choose Engine" / "Talk about Operation") instead of
   repeating "Book a call".

---

## Applied this PR (skill-level, systemic)

- `afrishieldai-seo/SKILL.md` — B.3: flagged the cross-link and CTA rules as
  unfixed across three review cycles; added a `CtaDrop` self-link
  prohibition. B.7: added two build-blocking checklist items (money-page
  cross-link grep check, Pricing `Offer` schema check) so these stop being
  rules a human has to re-notice.
- `afrishield-blog/SKILL.md` — added the topical-map backfill rule, the
  AI-search-angle check, the schema/visible-content fidelity rule, and the
  shared-cluster pre-annotation rule.
- `content-queue.md` — row 8 angle assigned; row 9 pre-annotated; new
  standing rule for shared-cluster rows.

Page-level content/code fixes above are **not** applied in this PR — the
board advises, it does not build. They're the doer agent's execution list.

---

## Summary (for the Saturday digest)

Targets: blog post `how-long-does-seo-take` (GEO 7/10), queued keyword
`local seo for small business` (angle assigned, was unsafe as-is), site page
`/pricing` (Conversion 6/10, GEO 4/10). Top actions: fix a live dead-click
bug in the shared `CtaDrop` component on `/pricing`, wire existing `Offer`
schema data into `/pricing`, and add the in-body cross-links every lens
independently flagged as missing on both `/pricing` and `/how-it-works`.
No lens disagreement on substance this run — only a sequencing call
(functional bug before enhancements), resolved above. The headline finding
is systemic: the board's own cross-link/schema rule, written into the skill
on 2026-08-04, went unexecuted across two full review cycles and three
pages — converted this run from a written rule into a build-blocking
checklist check. PR: (see link below).
