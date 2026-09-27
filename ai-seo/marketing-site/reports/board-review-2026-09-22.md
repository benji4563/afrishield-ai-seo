# AfriShield Board of Advisors — review, 2026-09-22

Twice-weekly scheduled review. Targets chosen per the routine prompt: (a) most
recently published blog post, (b) next `queued` keyword in `content-queue.md`
(reviewed as an upcoming brief), (c) one site page from the rotation (solutions,
pricing, how-it-works, about, contact).

- **Target A:** `/blog/top-geo-ai-seo-agencies-africa-2026` — published
  2026-08-30 (same commit as `enterprise-geo-launch-africa`; this one chosen as
  the heavier, analyst-grade pillar piece and the first live implementation of
  skill B.8's GEO Citation SOP).
- **Target B:** `content-queue.md` row 9, `what is local seo` — the only
  `queued` row, and the only one; it has been skipped by the auto-poster six
  runs running (2026-08-18 → 2026-08-23) without resolution.
- **Target C:** `/pricing` — rotation is solutions → pricing → how-it-works →
  about → contact. Solutions was reviewed on both 2026-07-31 and 2026-08-04
  (the second run mislabelled it "first in rotation"); pricing is next and has
  no prior board-review record.

Lenses run: **GEO** (Mike King + Koray Tuğberk Gübür — `board-geo-reviewer`) on
all three targets per the routing table (blog post = GEO only; queued-keyword
brief = GEO only; site page = GEO **and** Conversion). **Conversion** (Wes
McDowell) on Target C. **Business** (Dan Martell) on the recurring
skip-without-resolution pattern behind Target B, per the routing table's
"anything strategic" trigger — the individual keyword is a GEO call, but a
process that silently re-introduces a human bottleneck is a chairman-level
question.

---

## Target A — Blog post: `top-geo-ai-seo-agencies-africa-2026`

**File:** `app/blog/top-geo-ai-seo-agencies-africa-2026/page.tsx`
**Lens:** GEO (King + Koray).

**Verdict: 6.5/10.** Strong retrieval mechanics — BLUF ShortAnswer, liftable H2
openers, chunked sections, four JSON-LD blocks (`BlogPosting`, `FAQPage`,
`ItemList`, `HowTo`, `Breadcrumb`), and a fan-out-covering FAQ. But the
comparison's third-party entities are too thin to deliver the corroboration
skill B.8 exists to buy, and there's no repo evidence the PR-wire half of the
SOP has actually run.

**Concrete fixes:**
1. `itemListJsonLd` gives AfriShield AI a `url`; the other three `ListItem`s
   (Nairobi Marketing, SEO Smart Limited, Digital 4 Africa) have none, and none
   are hyperlinked anywhere in the visible page either — a model extracting
   this `ItemList` can disambiguate AfriShield but not its "competitors." Add a
   `url`/`sameAs` per competitor.
2. The comparison matrix gives 3 of 4 agencies only `Primary hubs: Nairobi,
   Kenya`, no distinguishing detail (founding year, team size, registration),
   while AfriShield's own sibling post (`enterprise-geo-launch-africa`) gives
   itself a full "fast facts" entity table. An "objective, analyst-style" guide
   needs comparable entity granularity on all four, or the corroboration this
   SOP is for collapses into marketing copy about the author.
3. Confirm the profiled competitors are real, addressable entities before
   syndication — B.8 step 3 cross-checks AI engines against these exact names;
   thin competitor entities make the whole `ItemList` less citable, AfriShield's
   own entry included.
4. This post's `primaryKeyword` (`generative engine optimization agencies
   africa`) sits close to `enterprise-geo-launch-africa`'s
   (`enterprise generative engine optimization africa`) — cross-linked both
   ways already, which mitigates it, but the near-duplicate pair deserves a
   deliberate differentiation note.

**Systemic drift → fixed in this PR.** No artifact anywhere in the repo shows
B.8 step 2 (PR-wire syndication) or step 3 (indexation/citation benchmark) ran
for this post or its same-commit sibling. Added a required
`reports/pr-syndication-log.md` artifact and a comparable-entity-depth rule to
`afrishieldai-seo/SKILL.md` B.8.

---

## Target B — Queued keyword: `what is local seo` (row 9, cluster E)

**Source:** `content-queue.md`, the only `queued` row, reviewed as an upcoming
brief (pre-task mode) — and as the process failure sitting behind it.
**Lenses:** GEO (King + Koray) on the keyword itself; Business (Dan Martell) on
why six skip notes produced no resolution.

**GEO verdict: 2/10 readiness — confirmed duplicate, recommend retire, not
narrow.** `local-seo-for-small-business` still opens (`#what-local-seo-is`)
with a direct, liftable answer to "what is local seo," and its FAQ already
carries "What is local SEO for a small business?" — the two most obvious
fan-out angles row 9 could take. Nothing published since the first flag on
2026-08-18 has narrowed the angle. The fixed post template forces ~8-9 H2s at
1,700-2,200 words; those H2s are exactly the ones `local-seo-for-small-business`
already owns, so a second full post can't avoid restating the core node — it
would dilute cluster E's topical map, not extend it. At SV~10 informational,
the keyword's value no longer clears the six wasted pick-cycles it has already
cost.

**Business verdict: REFINE.** The queue-keeper → auto-poster handoff is
supposed to delegate an *outcome* (Buy Back Principle); in practice it degraded
into a checkpoint nobody is staffed to clear. Row 9 has burned ~3+ weeks and 6
pick-cycles of real analytical work (cross-checking `lib/posts.ts`, writing a
detailed note) that produced zero content — production-grade effort, zero
output. Separately, candidate rows 22-31 have sat unpromoted since 2026-09-11
with no DataForSEO pass scheduled, and the general pool has already gone empty
once waiting on that. Highest-leverage fix: give the routine itself authority
to *resolve*, not just log, after N skips (N=3, not 6); schedule DataForSEO
promotion as a fixed weekly step instead of reactive; treat a sub-floor
`queued` count as a first-class failure signal.

**Both lenses agree: retire row 9 now.** No disagreement to resolve — GEO's
content-quality read and Business's process-efficiency read point at the same
action from two different angles.

**Applied in this PR.** `content-queue.md` row 9 flipped `queued` → `retired`
with the reasoning above logged inline. `afrishield-blog/SKILL.md` gets a
skip-count escalation rule (3 consecutive skips → auto-retire, not a 4th note).
`content-queue.md` gets a note asking the weekly queue-keeper to promote
candidates on a fixed cadence and treat a sub-floor queue as a hard alert.

---

## Target C — Site page: `/pricing`

**File:** `app/pricing/page.tsx`
**Lenses:** GEO (King + Koray) **and** Conversion (Wes) — money page, both
lenses required per the routing table.

**GEO verdict: 5/10.** Strong BLUF and FAQ chunking, but the page fails two of
the skill's own already-documented rules. `afrishieldai-seo/SKILL.md`'s schema
table specs `Pricing → FAQPage (+ Offers with price/currency)`, but the only
`Offer`/`hasOfferCatalog` entities in the repo live in `professionalServiceJsonLd`,
rendered exclusively on `app/page.tsx` — `/pricing`'s own raw HTML shows three
tier names, prices, and feature lists in the visible DOM with **zero matching
JSON-LD**. Separately, `/pricing` has **zero in-body contextual links** — the
tier cards, the BLUF, and all six FAQ answers never link to `/solutions`,
`/how-it-works`, or `/case-studies`; the only `href`s are `/contact` buttons and
the closing `CtaDrop`. This is the identical violation the board flagged on
`/solutions` on 2026-08-04 — the skill has stated the cross-linking rule since
that date, and it recurred anyway on the very next money page reviewed. Minor:
the `includes`/`excludes` bullet fragments ("Four published pages a month")
have no subject if lifted standalone; a one-sentence prose summary per tier
would fix that.

**Conversion verdict: 7/10.** Real, reachable CTAs — every tier card has a
genuine `<Button href="/contact">`, not a dead link, and `PageHero` + `Bluf`
give immediate, plain-language clarity in the first screen (what it is, the
three prices, month-to-month). This page does *not* repeat `/solutions`'
"nothing to click for six screens" failure. But there is **no trust or
social-proof signal anywhere in the body** — no client count, case study,
testimonial, or number backing any claim — a bigger liability here than on
`/solutions`, since pricing is the highest-friction, highest-intent page on the
site.

**Systemic drift → fixed in this PR.** Both lenses independently traced their
findings to the same pattern as 2026-08-04: rules exist in the skill doc but
nothing enforces them at build time, so they recur page after page (`/solutions`
then `/pricing`). Also confirmed: no page shell (`PageHero`, `Bluf`,
`Section`/`SectionHeader`, `CtaDrop`) has a slot for a trust signal at all —
`/solutions` and `/pricing` independently show the identical gap because it's
structural, not a one-off oversight. Added a mechanical B.7 verification gate
(grep every money page for `Offer` schema + at least one in-body cross-link,
fail the build step if either is empty) and a required optional
`proof`/`proofStat` prop on `PageHero`/`CtaDrop` to `afrishieldai-seo/SKILL.md`.

---

## Agreement / disagreement

| Point | King/Koray (GEO) | Wes (Conversion) | Dan (Business) | Verdict |
|---|---|---|---|---|
| Blog post: competitor entities too thin | Flags asymmetric `ItemList` schema + shallow comparison-matrix detail vs. AfriShield's own entry | — | — | **Single-lens — act.** No conflict; fixed at skill level (B.8 entity-depth rule). |
| Blog post: no evidence B.8 syndication ran | Flags missing checkable artifact for steps 2–3 | — | — | **Single-lens — act.** Added `pr-syndication-log.md` requirement. |
| Row 9: retire vs. narrow | Confirms duplication still holds verbatim; recommends retire over narrowing (template forces the same H2s) | — | Confirms 6 skips of wasted effort; recommends the *system* gain auto-retire authority at N=3 | **Agree — retire now**, and fix the mechanism so it can't recur (skip-escalation rule). No priority override needed; both lenses converged on the same action from different reasoning. |
| `/pricing`: missing Offer schema | Flags the skill's own Pricing-row spec ("+ Offers with price/currency") is unmet on the page itself | — | — | **Single-lens — act.** Fixed skill enforcement (B.7 gate) + flagged for the doer. |
| `/pricing`: zero in-body cross-links | Flags identical repeat of the 2026-08-04 `/solutions` finding | — | — | **Single-lens, but recurring — systemic.** Fixed at skill level (mechanical gate, not just a stated rule) since the stated rule alone already failed once. |
| `/pricing`: no trust signal | — | Flags zero social proof on the highest-friction page on the site | — | **Single-lens — act.** Traced to the same structural gap as `/solutions` (2026-08-04); fixed at the component-spec level (`proof` prop requirement) rather than per-page. |

No true disagreement this run — every finding either stood alone or two lenses
independently converged on the same root cause and the same fix. The closest
thing to a tension (GEO wants `/pricing`'s Offer schema and cross-links fixed
immediately; Conversion wants a trust signal added; Business wants the queue
mechanism itself changed) is not a conflict, since all three sit on different
targets/dimensions and none blocks another — resolved by doing all three, not
by picking one.

---

## Execution to-do (for the doer agent — highest leverage first)

Systemic fixes below are **already applied in this PR** (skills + queue file).
Content/component fixes are **not** — the board advises, it does not build;
these are the hand-off for the next `afrishieldai-seo` / `afrishield-blog` run.

1. **[Applied]** `afrishieldai-seo/SKILL.md` B.8 — required
   `reports/pr-syndication-log.md` artifact for PR-wire syndication + citation
   benchmark; comparable-entity-depth rule for profiled competitors.
2. **[Applied]** `afrishieldai-seo/SKILL.md` B.3/B.7 — Pricing row's Offer
   schema clarified as required on the page itself, not just the homepage;
   mechanical build-gate added (grep every money page for `Offer` schema + an
   in-body cross-link, fail if either is missing); trust-signal check added;
   `PageHero`/`CtaDrop` need an optional `proof` prop.
3. **[Applied]** `afrishield-blog/SKILL.md` — 3-consecutive-skip auto-retire
   rule for `queued` rows that keep failing the differentiation-angle check.
4. **[Applied]** `content-queue.md` — row 9 (`what is local seo`) retired with
   reasoning logged; note added asking the weekly queue-keeper to promote
   candidate rows on a fixed cadence and treat a sub-floor queue as a hard
   alert, not a prose note.
5. **[Doer]** `top-geo-ai-seo-agencies-africa-2026`: add `url`/`sameAs` to the
   three competitor `ListItem`s in `itemListJsonLd`; add comparable entity
   detail (founding year/team size/registration) for the three competitors in
   the comparison matrix; run and log the B.8 PR-wire syndication step for this
   post and `enterprise-geo-launch-africa` if it hasn't happened yet.
6. **[Doer]** `/pricing`: add `Offer`/`hasOfferCatalog` JSON-LD generated from
   the `TIERS` array; add in-body contextual links to `/solutions`,
   `/how-it-works`, and `/case-studies` from natural anchor points (e.g. the
   "Book a call" FAQ answer → `/how-it-works`; "Everything in Foundation" →
   the Foundation tier); add one trust/proof line (client count, case study, or
   a concrete number) to the hero, the pricing grid, or the closing `CtaDrop`.
7. **[Doer, next auto-poster run]** With row 9 retired, the queued pool is now
   fully empty — the next run should report "queue empty" honestly unless a
   DataForSEO pass promotes rows 16-31 first. Do not invent a keyword.
8. **[Note for the next rotation]** `/how-it-works` uses the same `PageHero`
   pattern as `/solutions` and `/pricing` — worth checking for the same
   no-reachable-CTA / no-trust-signal / no-cross-link triad early rather than
   waiting for its scheduled turn, since all three prior page reviews found at
   least one of these three.
