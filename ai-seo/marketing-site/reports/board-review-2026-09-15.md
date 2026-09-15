# AfriShield Board of Advisors — review, 2026-09-15

## Operational flag first (Business/Dan) — read this before the content findings

**Four consecutive twice-weekly board-review PRs are sitting unmerged**, dating
back six weeks: `board/review-2026-09-01` (#38), `board/review-2026-09-04`
(#41), `board/review-2026-09-08` (#47), `board/review-2026-09-11` (#50) — plus
`board/doctrine-update-2026-09-12` (#51), `board/ingest-2026-09-09` (#48),
`board/ingest-2026-09-02` (#39), and every site-health (#37, #40, #44, #49,
#54) and dependency-audit (#36, #43, #53) PR since 2026-08-06. **Zero of them
are merged.** This PR checked out from `origin/master` at `e710f4e`, whose
`reports/` folder still only contains through 2026-08-06 — everything the last
four board cycles found and fixed never took effect.

The consequence, verified directly against the unmerged branches before
writing this report: **the same two targets got independently reviewed three
and four times each**, with near-identical findings restated fresh every
cycle because no fix from the previous cycle ever landed to check against —
`top-geo-ai-seo-agencies-africa-2026` (09-01, 09-04, 09-08, 09-11) and
`/pricing` (09-04, 09-08, 09-11). A trust-signal skill rule was "added" three
separate times in three separate unmerged PRs. `PageHero`'s missing CTA prop
was recommended as a required fix in 09-01 and is *still* missing today. This
is not a content-quality problem — the board's analysis across those cycles
was sound and consistent — it is a **review-approval bottleneck**: the
routine keeps doing the work, but nothing consumes the output.

**This run does not re-review `/pricing` or re-open a fifth review of the
same blog post from scratch.** Instead: (1) it picks `/how-it-works`, the
next untouched page in rotation, as the site-page target; (2) it runs a
*verification* pass on the blog post, checking what those four unmerged
reviews found against the file as it exists today (nothing merged, so most
of it is still live); (3) the skill/queue fixes below are applied directly on
this branch rather than re-proposed, since re-proposing already-correct fixes
a fifth time has no value — merging is the actual blocker.

**Recommendation to Ben, not something this review can do itself:** triage
the open PR queue. At minimum, merge `board/review-2026-09-11` (#50) — the
most recent, most complete prior cycle — or explicitly close the stale ones
if their findings are superseded by this PR (this PR's skill edits fold in
everything from #50 that was still correct and unimplemented: the trust-
signal rule and the `PageHero` CTA escalation). Left as-is, every future
cycle repeats this exact diagnosis.

---

## Targets

| # | Target | Why chosen |
|---|---|---|
| A | `/blog/top-geo-ai-seo-agencies-africa-2026` | Most recently published post (2026-08-30). Reviewed independently four times already (unmerged); this run verifies current state rather than re-deriving from scratch. |
| B | `what is local seo` — content-queue row 9 | The only `queued` row on master, unresolved since 2026-08-18 across six skip notes and two prior (unmerged) board attempts to close it. Resolved directly in this PR. |
| C | `/how-it-works` | Site-page rotation (solutions → pricing → **how-it-works** → about → contact). Solutions (×2) and pricing (×3) are already thoroughly reviewed in unmerged branches; how-it-works is the first genuinely new page this cycle, and three prior reports independently predicted it has the same defects as solutions/pricing. |

Lenses run: **GEO** (Mike King + Koray Tuğberk Gübür — `board-geo-reviewer`)
on A and C. **Conversion** (Wes McDowell — `board-conversion-reviewer`) on C.
**Business** (Dan Martell) applied directly above as the chairman finding
this cycle, and below on Target B's resolution.

---

## Target A — Blog post: `top-geo-ai-seo-agencies-africa-2026` (verification pass)

**Verdict: 6.5/10.** Checked every claim from the four unmerged reviews
(09-01, 09-04, 09-08, 09-11) directly against the file as it exists today.

**CONFIRMED still live** (none of the prior fixes ever merged):
- Two self-referential-deixis H2 openers, not liftable in isolation:
  `page.tsx:261` ("The matrix below compares…") and `page.tsx:313` ("Each
  profile below reads…"). *(King)*
- Humor fused into the BLUF sentence under an `<h2>`: `page.tsx:364-365`
  ("...skipping the first is the most common way money gets wasted"),
  violating `humor-writing/SKILL.md`'s "never in H2 opener sentences" rule.
  *(King)*
- Humor closing a FAQ answer: `page.tsx:51` ("Anyone quoting a fixed number
  of days is guessing") — FAQ answers are retrieval chunks, humor is banned
  there outright. **The identical phrase also appears in the companion post**
  `enterprise-geo-launch-africa/page.tsx:65` — not a one-off, a repeated
  pattern. *(King)*
- `organizationJsonLd.areaServed` (`lib/structured-data.ts:16-22`) lists
  Nigeria/Ghana/Kenya/South Africa but omits Cameroon, despite this post
  naming Douala as a primary hub and `SERVED_CITIES` elsewhere in the same
  file already including it — an internal inconsistency, not just an
  omission. *(King)*
- Competitor `ListItem`s (`page.tsx:88-117`) still have no `url`/`sameAs`.
  *(King)*
- No `@id` anywhere linking AfriShield's own `ListItem` (`page.tsx:78-86`),
  the site-wide `organizationJsonLd` (`structured-data.ts:5-23`), and the
  companion post's `organizationEntityJsonLd` (which *does* have an `@id`,
  `enterprise-geo-launch-africa/page.tsx:77`) — three inconsistent
  representations of the same entity across the site. *(King)*
- No visible per-criterion scoring backing the "objective" comparison claim
  (`page.tsx:189, 219-308` are prose criteria with no scored grid). *(Koray)*
- No in-body link to `/geo-services`, the core commercial page this
  outer-layer comparison should funnel into (only sibling-blog-post links
  exist: `page.tsx:193, 195, 396`). *(Koray)*

**RESOLVED, no longer an issue:** the earlier "fabricated competitor
entities" concern (09-01's most severe finding, escalated as a reputational/
legal liability) — 09-11 independently web-verified Nairobi Marketing, SEO
Smart Limited, and Digital 4 Africa are real agencies with real, roughly-
matching GEO/AI-search offerings. This review does not re-flag that as
urgent; the residual `url`/`sameAs`/`@id` gaps above are now an entity-
disambiguation issue (real but lower-stakes), not a fabrication one.

**Fixes, ranked:**
1. Add a per-criterion score grid across all four agencies (falsifiability). *(Koray)*
2. Link to `/geo-services` and `/blog/ai-search-visibility-study` in-body. *(Koray)*
3. Rewrite the two self-referential H2 openers to state the conclusion directly. *(King)*
4. Split the humor from the BLUF sentence at `page.tsx:364-365`; rewrite the
   FAQ-3 closer at `page.tsx:51` **and** the identical line in
   `enterprise-geo-launch-africa/page.tsx:65`. *(King)*
5. Add `url`(+`sameAs` where findable) to the three competitor `ListItem`s;
   give `organizationJsonLd`, this post's AfriShield `ListItem`, and the
   companion post's org entity a **shared** `@id` so they resolve to one
   canonical node. *(King)*
6. Add `Country: Cameroon` to `organizationJsonLd.areaServed`. *(King)*

**Systemic drift → fixed in this PR.** The liftable-opener and no-humor-in-
FAQ rules already exist in prose (`afrishield-blog/SKILL.md`,
`humor-writing/SKILL.md`) and have now survived **four** review cycles
unfixed on this exact file — a prose rule alone isn't gating publish. Added
a mandatory "Humor-placement self-audit" to `afrishield-blog/SKILL.md`
(mirrors the existing liftable-opener self-audit): paste every H2 opener and
every FAQ answer into working notes and confirm none carry a joke or wry
closer before registering the post.

---

## Target B — Queued keyword: `what is local seo` (row 9) — resolved directly

**Verdict: retire, not narrow.** Independently re-verified (not just trusted
from prior review notes): `local-seo-for-small-business/page.tsx:149` opens
an H2 titled "What local SEO actually is" with a direct, complete definition,
and its FAQ (`page.tsx:44`) directly answers "What is local SEO for a small
business?" Row 9 has been skipped six times (2026-08-18 → 2026-08-23) with
the identical diagnosis every time, and two prior unmerged board cycles
already reached this same conclusion (09-01, 09-04, 09-08 said retire; only
09-11 dissented — see disagreement table below).

**Applied in this PR:** `content-queue.md` row 9 status set to `retired`,
with a resolution note explaining the decision and its evidence. **Also
flagged:** retiring row 9 leaves the general-cluster pool at **zero**
`queued` rows (1–15 are `claimed`/`retired`; 16–31 are all `candidate`, none
vetted) — the next scheduled auto-poster run will report "queue empty"
unless a DataForSEO pass promotes some of rows 16–31 first. That pass needs
an interactive session with the DataForSEO MCP tool, which this cloud review
does not have — logged as an execution to-do for a human/interactive run,
not something the board can clear itself.

---

## Target C — Site page: `/how-it-works`

**File:** `app/how-it-works/page.tsx`. **Lenses:** GEO (King + Koray) and
Conversion (Wes) — first review of this page.

**GEO verdict: 5/10.** What's right: `howToJsonLd(PROCESS_STEPS)` reuses the
exact array the page renders (`page.tsx:58`, `lib/structured-data.ts:226-241`)
— schema and visible content can't drift apart, a pattern worth copying
elsewhere. `breadcrumbJsonLd` is correct. The Deliverables/Honest-Timeline
sections are genuinely good query-fan-out coverage for "when do I see
results."

What's missing: **no `Bluf` block at all** — every other key page
(`/solutions`, `/pricing`) opens with one; this page has none (`page.tsx:1-9,
66-72`). Higher-leverage than it sounds, because it's a reusable component
with zero new pattern needed. **The page never names its own entity** — `grep
-n "AfriShield"` returns nothing in `page.tsx`; every reference is "us"/"we"/
"you," so a passage retrieved out of context carries no attributable brand.
No geography mentioned anywhere either, breaking consistency with the rest
of the site's source context. **No `FAQPage` schema/FAQ block**, despite this
page being the natural home for "what if month one shows nothing," "do you
guarantee rankings," "does cadence differ by tier" — questions an AI
decomposition of "how does this work" would ask. **Zero in-body cross-links**
to `/solutions` or `/pricing` — the only sibling-page links are inside
`CtaDrop`, which the skill's own cross-link rule already says doesn't count.

**Conversion verdict: 4/10.** The copy itself is strong, message-first
writing — Honest Timeline pre-empts the "nothing happens month 1" objection
before the visitor has to ask it. The problem is structural. `PageHero`
(`components/ui/PageHero.tsx:1-21`) takes no CTA prop at all — confirmed,
same root cause as the `/solutions` finding from 2026-08-04. Below it: Hero
→ Process (4 items, no CTA) → Deliverables (6-item grid, no CTA) → Honest
Timeline (4 items, no CTA) → `CtaDrop` — **14 combined list/grid rows with
zero clickable action** before the first CTA, a worse cadence than
`/solutions` had at its 5/10 review. (Mobile has two always-visible floating
icon buttons — WhatsApp and a voice-AI call button — which are real tap
targets but unlabeled and don't match the funnel's stated CTA, so they're a
weak substitute, not a fix.) **Zero trust/proof signal anywhere** — and
there is no reusable proof/testimonial component anywhere in `components/`
at all, so this isn't a one-page content gap, the template has nothing to
drop in. Minor: the closing `CtaDrop`'s `title`/`body` are overridden to
"Start with the audit" but `ctaLabel` isn't, so the button still reads the
generic default "Book a call" instead of echoing the headline.

**Systemic drift → fixed in this PR.** This is the **third** page in
rotation (`/solutions`, `/pricing`, now `/how-it-works`) hitting the same
`PageHero`-no-CTA and zero-trust-signal shape, and the **second** time the
`PageHero` CTA-prop fix has been "recommended" (2026-08-04, then again here)
without shipping, because the board advises and does not commit code. Added
to `afrishieldai-seo/SKILL.md`: (1) the BLUF requirement list now names
`how-it-works` and `about` explicitly instead of relying on "every key page"
to be read broadly enough; (2) a `HowTo`+`FAQPage`+`BreadcrumbList` schema
row added for How it works; (3) the cross-link rule converted into a literal
`grep` check in the B.7 pre-publish checklist; (4) the `PageHero` CTA-prop
fix upgraded to "required build fix," explicitly naming both `/solutions`
and `/how-it-works` as pages to wire once the prop exists, so it can't land
on the component but miss the pages that motivated it; (5) a new trust/
proof-signal rule requiring one instance per landing page, since none of
`/solutions`, `/pricing`, or `/how-it-works` has one and no reusable
component exists yet to satisfy it.

---

## Agreement / disagreement

| Point | King/Koray (GEO) | Wes (Conversion) | Dan (Business) | Verdict |
|---|---|---|---|---|
| `/how-it-works`: no BLUF, no entity naming, no FAQ, zero cross-links | Flags all four as the core GEO gap | — | Same root cause as `/solutions`/`/pricing` — a scaffolding gap, not a per-page mistake | **Agree.** Fixed at the skill level (explicit page list, schema-table row, grep-checkable cross-link rule). |
| `/how-it-works`: `PageHero` CTA gap, zero trust signal | Corroborates via missing entity/BLUF (retrieval chunks need a self-contained answer, which a CTA-less hero also fails to deliver as a "next step") | Flags both as the top two conversion leaks | Second consecutive cycle recommending the same `PageHero` fix with nothing shipped — an advisor→doer handoff failure, not a content failure | **Agree**, and escalated: `PageHero` CTA prop is now a required build fix, not a suggestion; a reusable proof component is now required, not page-by-page content. |
| Row 9 (`what is local seo`): retire vs. narrow to an outer-layer glossary entry | Confirms cannibalization is real and current (re-verified directly this run) | — | Retire — SV~10, zero incremental value, six skipped runs already spent | **Disagreement with the unmerged 09-11 branch, resolved by priority.** 09-11 proposed unblocking it as a glossary/outer-layer page; three earlier cycles (09-01, 09-04, 09-08) and this run's independent re-verification say retire. Correctness/durability (the duplication is real and confirmed against the live post, not speculative) outranks the throughput argument for keeping the row alive — retired. |
| Target A's still-live defects (H2 openers, humor placement, entity `@id`/`url` gaps) — fix now vs. fix the PR bottleneck first | Wants the content fixed now — it's a live, published page with retrievability and entity-consistency defects | — | Wants the merge bottleneck fixed first — a fifth correct content fix that also doesn't merge accomplishes nothing, and four rounds of correct analysis have already failed to ship for reasons unrelated to their correctness | **Resolved by priority — business leverage breaks the tie on what to do first.** Both are right; sequencing decides it. The execution to-do below lists the PR-backlog triage first, the content fixes second — content fixes are real and ready to apply the moment a PR of this shape actually merges. |

---

## Execution to-do (highest leverage first)

1. **[Human — Ben, blocks everything else]** Triage the open PR queue: merge
   this PR and `board/review-2026-09-11` (#50) at minimum (or close #50 as
   superseded — its still-valid fixes are folded into this PR's skill
   edits), and clear or close the rest of the backlog (#36–#54). Until PRs
   merge, every future board/health/audit cycle re-diagnoses this same
   problem instead of building on the last one.
2. **[Applied]** `afrishieldai-seo/SKILL.md` — BLUF page list now names
   how-it-works/about explicitly; How-it-works schema row added; cross-link
   rule converted to a literal grep check; `PageHero` CTA prop escalated to
   required; new trust/proof-signal rule + B.7 checklist lines.
3. **[Applied]** `afrishield-blog/SKILL.md` — mandatory humor-placement
   self-audit added, mirroring the existing liftable-opener audit.
4. **[Applied]** `content-queue.md` — row 9 retired with resolution note;
   empty-general-pool status flagged.
5. **[Doer]** `/how-it-works`: add `ctaHref`/`ctaLabel` to `PageHero`
   (`components/ui/PageHero.tsx`) and wire it here *and* on `/solutions`;
   add a `Bluf` block naming AfriShield + Africa geography; add
   `FAQPage`/`faqPageJsonLd` (candidate questions: month-one expectations,
   ranking guarantees, cadence-by-tier); build a reusable proof/trust
   component (e.g. `components/home/ProofStrip.tsx`) and place one instance
   here (and on `/solutions`, `/pricing`); add in-body links — Deliverables'
   cadence row → `/pricing` (tier-specific cadence lives there), the
   "internal links begin doing real work" line → `/solutions`; set
   `ctaLabel="Book the audit"` on the closing `CtaDrop`.
6. **[Doer]** `top-geo-ai-seo-agencies-africa-2026`: apply the six ranked
   fixes in Target A above (scoring grid, `/geo-services` + study links,
   two H2 rewrites, humor-placement fixes in both this post and the
   companion post, competitor `url`/`sameAs` + shared `@id`, Cameroon in
   `areaServed`).
7. **[Doer/queue-keeper — needs an interactive session with DataForSEO]**
   Vet rows 16–31 in `content-queue.md` to refill the now-empty general
   pool before the next scheduled auto-poster run reports "queue empty."
8. **[Note for next rotation]** `/about` is next in the page rotation.
   Given three consecutive pages have now shown the identical
   `PageHero`/cross-link/trust-signal gaps, check whether items 5's
   component-level fixes (once built) already cover `/about` for free
   before doing a from-scratch review — and re-verify `/solutions` and
   `/pricing` once the PR backlog clears, since their previously-proposed
   fixes never actually shipped either.

---

## Summary

**Targets:** verification pass on the most recent post
(`top-geo-ai-seo-agencies-africa-2026`, 6.5/10 — 8 defects confirmed still
live because four prior fix PRs never merged), the one queued keyword
(`what is local seo`, retired directly — six skipped runs, duplication
reconfirmed), and `/how-it-works` (first review — GEO 5/10, Conversion
4/10). **Lenses:** GEO + Conversion on the post and the page; Business
applied as the chairman finding on the operational problem below.
**Top actions:** ship the `PageHero` CTA prop + a reusable trust component
(now required, third page to need both); add a BLUF/FAQ/entity-naming pass
to `/how-it-works`; fix the two H2 openers and humor-placement violations on
the live blog post (both duplicated into its companion post too).
**Disagreement:** one unmerged branch (09-11) wanted row 9 unblocked as a
glossary page instead of retired — resolved by priority toward retirement,
confirmed independently this run. **Systemic:** trust-signal, cross-link,
and `PageHero`-CTA rules are now enforceable checklist items instead of
prose, and a humor-placement self-audit was added to the blog skill.
**Biggest finding this cycle, flagged directly to Ben:** four board-review
PRs and a dozen health/audit/doctrine PRs, six weeks deep, are unmerged —
the routine is producing correct, consistent analysis every cycle but
nothing is landing, so the same defects get rediscovered instead of fixed.
**PR:** branch `board/review-2026-09-15`, opened against `master`.
