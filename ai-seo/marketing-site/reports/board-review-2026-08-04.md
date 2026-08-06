# AfriShield Board of Advisors — review, 2026-08-04

Twice-weekly scheduled review. Targets chosen per the rotation in the routine
prompt: (a) most recently edited blog post, (b) next `queued` keyword in
`content-queue.md`, (c) one site page from the rotation (solutions, pricing,
how-it-works, about, contact — this run: **solutions**, first in rotation, no
prior board-review record found for any page).

Lenses run: **GEO** (Mike King + Koray Tuğberk Gübür — `board-geo-reviewer`),
**Conversion** (Wes McDowell — `board-conversion-reviewer`). Business (Dan
Martell) is applied directly below as the chairman synthesis over the
recurring pattern across all three targets, per the routing table's "anything
strategic" trigger — no single target here was itself a strategy/pricing/
process decision, but the *pattern across them* is.

> **Post-merge addendum (2026-08-05):** the blog auto-poster claimed and
> published `small business seo` on master while this PR was still in review,
> so it never saw the angle recorded in Target B below. Checked the published
> post (`/blog/small-business-seo`) against the recommendation anyway: it
> independently landed on almost the same angle (SMB-vs-enterprise structural
> differences, not a rehash), links out to `what-seo-actually-costs`,
> `what-ai-seo-actually-does`, and `answer-engine-optimization` for the
> granular detail, and every H2 opens with a direct answer. No rework needed.
> Row 1 in `content-queue.md` is now marked `claimed` to match master; the
> angle-check rule stays in place for the next queued row. This is a good
> sign the underlying voice/skill discipline holds even without the board's
> note landing in time — not a reason to skip the check going forward, since
> this run got lucky on timing, not guaranteed by it.

---

## Target A — Blog post: `answer-engine-optimization`

**File:** `app/blog/answer-engine-optimization/page.tsx`
**Lens:** GEO (King + Koray) — single-area target, one lens per the routing
table.

**Verdict: 7/10.** The prior board fix (commit `e195e80`) holds for the two
sections it touched (`how-answers-chosen`, `african-angle`) and the two
contextual in-body links it added satisfy the skill's link rule. But the fix
was partial, not exhaustive.

**Concrete fixes:**
1. Three more H2s still open soft instead of BLUF — `what-changed` (real
   answer doesn't land until 3 paragraphs down), `what-fails` ("old ones
   wearing new clothes" answers nothing), `what-works` (buries the actual
   answer in a bulleted list). `check-yours` is borderline (answers an
   adjacent question, not the literal heading).
2. `check-yours` is a 4-step `<ol>` and a matching `howToJsonLd` block
   (already exported, unused) is missing — free retrieval surface left on
   the table.
3. FAQ answer 5 ("Can I pay to appear…") is the natural anchor for
   `/blog/what-seo-actually-costs`, which exists and isn't linked in-body
   anywhere on this page.
4. Topical-map flag for later: the queued keyword "how to rank on chatgpt"
   (cluster B, same cluster as this post) substantially overlaps
   `how-answers-chosen` / `check-yours`. Whoever writes it must scope
   narrower (ChatGPT-specific mechanics) or it cannibalises this post.
5. Minor entity gap: no mention of AI-crawler access (GPTBot/ClaudeBot/
   PerplexityBot, `robots.txt`) — a real sub-query in the AEO fan-out,
   currently uncovered anywhere on the site.

**Systemic drift → fixed in this PR:** the board's own prior fix patched only
the sections a human/agent happened to look at, not all of them. Added an
exhaustive-self-check requirement and the HowTo-schema rule to
`afrishield-blog/SKILL.md` (see "Skill edits" below) so this can't recur.

---

## Target B — Queued keyword: `small business seo` (row 1, cluster G)

**Source:** `content-queue.md`, next `queued` row, reviewed as an upcoming
brief (pre-task mode).
**Lens:** GEO (King + Koray).

**Verdict: 5/10 readiness — not ready to write as-is.** The keyword itself is
fine (low comp, on-brand, right cluster). The brief has no differentiation
angle, and the site now has four live posts (`what-ai-seo-actually-does`,
`what-seo-actually-costs`, `ai-seo-vs-traditional-seo`,
`answer-engine-optimization`) a generic "small business SEO" post would
restate in miniature — thin/scattered content Koray's doctrine flags, and
sections that can't be lifted cleanly (King) because better versions of the
same sentences already exist elsewhere on the same site.

**Why it's a good opportunity if scoped right:** cluster G currently has only
the money pages (`/`, `/solutions`) — no supporting post yet. This can be the
first outer-section post feeding that core, exactly Koray's topical-map
structure, *if* the angle is genuinely differentiating.

**Recommended angle (now written into `content-queue.md` row 1):** what makes
SEO structurally different for a small business vs. an enterprise — budget/
time constraints, fewer/sharper keywords over broad coverage, single-location
scope, DIY-feasibility threshold. Written as the synthesis/decision layer
that links out to the four existing posts for granular detail (cost, method,
AI-vs-traditional, AEO) rather than re-deriving it, and cross-links `/` and
`/solutions` as the in-cluster core pages.

**Query fan-out to cover:** what SMB SEO means specifically; how it differs
from enterprise SEO; DIY vs. hire; cost (BLUF one line, link out); timeline
(BLUF one line, link out — hold detailed arithmetic for the future
`is-seo-worth-it`/`how-long-does-seo-take` rows); AI/automation at SMB scale;
light-touch AI-answer-visibility relevance.

**Systemic drift → fixed in this PR:** `content-queue.md` rows carried a
cluster + vetting stats but no angle/duplication check, and the poster has no
DataForSEO to catch semantic overlap on its own. Added a differentiation-
angle rule to both `content-queue.md`'s poster rules and `afrishield-blog/
SKILL.md` step 1 (cheap check: skim `lib/posts.ts` titles/descriptions before
drafting).

---

## Target C — Site page: `/solutions`

**File:** `app/solutions/page.tsx`
**Lenses:** GEO (King + Koray) **and** Conversion (Wes) — landing/service page
per the routing table, both lenses required.

**GEO verdict: 6/10.** Complies with the skill's own spec (`servicesJsonLd` +
`breadcrumbJsonLd`) but the spec itself under-serves the page: `servicesJsonLd`
is one flat `Service` object with a prose `description` string covering all
three pillars together (no discrete entities a machine can pull "keyword and
SERP intelligence" out of), there's no `FAQPage` schema or FAQ block at all
(unlike `/pricing`, which has both), and — confirmed by grep — **zero in-body
contextual links** to any other page on the site; the only `href`s are the
boilerplate `CtaDrop` buttons to `/contact` and `/pricing`. The `TECHNICAL`
list's Google Business Profile bullet never ties back to the BLUF's explicit
"Google Maps" promise.

**Conversion verdict: 5/10.** Copy is genuinely strong, clear, message-first —
no complaints on the writing itself. But the conversion path is broken:
**zero clickable CTA between the hero and the closing `CtaDrop`**, six-plus
mobile screens later, after three pillars and an 8-item technical checklist.
`PageHero` (used here) renders no button at all, unlike the homepage `Hero`
component, which has "Book a call" + a secondary CTA immediately above the
fold. The `TECHNICAL` list ("Core Web Vitals and mobile weight budgets,"
"Canonical tags, one per route") is agency-speak that breaks the page's own
message-first discipline — an SMB owner has no framework to evaluate it, and
it sits as unexplained jargon right before the only CTA on the page. No
social proof or trust signal anywhere on the page either.

**Concrete fixes for the doer (page content — not applied in this PR, see
"Execution to-do" below):** hero-level CTA button; a lightweight CTA/link
after Pillar 3; per-pillar sub-service JSON-LD entities; an FAQ block +
`faqPageJsonLd`; framing sentences tying each pillar's bullet list together;
in-body links from Pillar Three to `/pricing`, from the "weekly publishing"
claim to `/how-it-works`, from the technical section to `/case-studies`; trim
or plain-language the `TECHNICAL` list and tie its GBP bullet back to the
BLUF's Maps claim.

**Systemic drift → fixed in this PR:** both lenses independently traced their
findings to the same root cause — `afrishieldai-seo/SKILL.md`'s schema table
specs `Solutions → Service` only (no `FAQPage`, unlike Pricing), and nothing
in the skill requires cross-linking between money pages or a CTA within reach
of the hero. This will recur on every future page built from this skill
(`/how-it-works` already has the same "nothing to click for six screens"
problem). Fixed at the skill level — see below.

---

## Agreement / disagreement

| Point | King/Koray (GEO) | Wes (Conversion) | Dan (Business) | Verdict |
|---|---|---|---|---|
| AEO post: partial H2 fix | Flags 3/6 sections still soft-opening despite the prior board fix | — | Ad hoc, per-section fixes don't scale; need an exhaustive rule | **Agree.** Fixed the skill (exhaustive self-check), not just this post. |
| `small business seo` brief: no angle | Flags duplication risk against 4 live posts | — | An angle-less queue row risks wasted automated writing hours (rework cost) | **Agree.** Added angle to the queue rules + this row. |
| `/solutions`: thin schema, no FAQ, zero in-body links | Flags missing `FAQPage`, flat non-entity schema, zero contextual links | — | — | **Agree with itself** — both findings trace to the same skill-spec gap. Fixed at the skill level. |
| `/solutions`: no reachable CTA | — | Flags zero clickable CTA before the closing block, six+ screens down | Founder/ops time is wasted re-litigating CTA placement per page instead of it being structural | **Agree.** Fixed the skill (CTA-placement rule + `PageHero` prop suggestion), not just this page. |
| `/solutions`: `TECHNICAL` checklist | Wants it tied back to the BLUF's Google Maps claim via a linking sentence | Wants it trimmed/plain-language, since it reads as unexplained jargon before the only CTA | — | **Minor tension, not a real conflict.** King's durability point (close the semantic loop) and Wes's clarity point (don't bury the reader in jargon) are both satisfied by the same fix: keep the list, add one plain-language framing sentence per item, and explicitly tie the GBP bullet to the Maps promise. No priority call needed — resolved by combining, not choosing. |

No disagreement required a priority override this run (King/Koray outranking
tactics, Wes/Dan breaking ties) — every finding either stood alone or
reinforced a finding from another lens pointing at the same root cause.

---

## Execution to-do (for the doer agent — highest leverage first)

Systemic fixes below are **already applied in this PR** (skills + queue file).
Content fixes are **not** — the board advises, it does not write pages; these
are the hand-off for the next `afrishield-blog` / site-build run.

1. **[Applied]** `afrishield-blog/SKILL.md` — exhaustive Liftable-H2-opener
   self-check before publish (replaces spot-fixing), HowTo-schema rule for
   numbered sequences, differentiation-angle check before drafting.
2. **[Applied]** `afrishieldai-seo/SKILL.md` — Solutions schema spec now
   requires `FAQPage` + entity-linked per-pillar `Service` schema (not a flat
   prose description); added cross-link requirement between Solutions/
   Pricing/How-it-works; added CTA-placement rule for every `PageHero` page.
3. **[Applied]** `content-queue.md` — added the differentiation-angle rule
   and the recommended angle for row 1 (`small business seo`).
4. **[Doer, next post]** Write `small business seo` using the angle now
   logged in `content-queue.md` row 1 — SMB-vs-enterprise structural
   differences, synthesis/decision layer, link out rather than re-derive.
5. **[Doer]** Fix `answer-engine-optimization`: rewrite the three soft H2
   openers (`what-changed`, `what-fails`, `what-works`) to answer outright in
   the first sentence; add a `howToJsonLd` block for the `check-yours` steps;
   add one in-body link from FAQ answer 5 to `/blog/what-seo-actually-costs`.
6. **[Doer]** Rebuild `/solutions` schema as per-pillar entities +
   `FAQPage`; add a hero-level CTA and a post-Pillar-3 checkpoint CTA/link;
   add in-body cross-links (Pillar Three → `/pricing`, weekly-publishing
   claim → `/how-it-works`, technical section → `/case-studies`); reframe the
   `TECHNICAL` list in plain language with a sentence tying the GBP bullet to
   the BLUF's Google Maps claim; consider adding a proof/trust-signal element.
7. **[Note for future queue rows]** When "how to rank on chatgpt" (cluster B)
   is picked up, scope it narrower than `answer-engine-optimization` already
   covers, or it will cannibalise that post.
8. **[Note for future rotation]** `/how-it-works` likely has the same
   no-reachable-CTA problem as `/solutions` did (uses the same `PageHero`
   pattern with no compensating mid-page `Button`) — worth an early check
   next rotation rather than waiting for its scheduled turn.
