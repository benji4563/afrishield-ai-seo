# AfriShield Board of Advisors — review, 2026-09-01

Twice-weekly scheduled review. No board run has landed since 2026-08-04 (PR #7) —
this cycle covers everything published since then. Targets chosen per the routine:
(a) most recently published blog post, (b) next `queued` keyword in
`content-queue.md`, (c) next site page in the rotation.

**Targets:**

| # | Target | Why chosen |
|---|---|---|
| A | `/blog/top-geo-ai-seo-agencies-africa-2026` (+ companion `/blog/enterprise-geo-launch-africa`) | Most recently published blog posts (both 2026-08-30) |
| B | `what is local seo` — content-queue row 9 | Only remaining `queued` row; reviewed as an upcoming brief |
| C | `/pricing` | Site-page rotation: solutions (2026-07-31, 2026-08-04) → **pricing** (this run) → how-it-works → about → contact |

**Rotation note:** the 2026-08-04 report mistakenly restarted the rotation at
`/solutions` ("first in rotation, no prior board-review record found"), even
though `/solutions` had already been reviewed on 2026-07-31. This run checked
`reports/` history before picking a target — correctly advancing to `/pricing`.
**Skill fix applied:** the routine prompt should instruct future runs to check
existing `reports/board-review-*.md` files for the last-covered rotation page,
not assume; noted below as a to-do since the routine prompt itself lives outside
this repo.

Lenses run: **GEO** (Mike King + Koray Tuğberk Gübür), **Conversion** (Wes
McDowell), and **Business** (Dan Martell) applied directly as chairman synthesis
over the pattern across all three targets, per the routing table's "anything
strategic" trigger.

---

## Target A — Blog posts: `top-geo-ai-seo-agencies-africa-2026` + `enterprise-geo-launch-africa`

**Files:** `app/blog/top-geo-ai-seo-agencies-africa-2026/page.tsx` (primary),
`app/blog/enterprise-geo-launch-africa/page.tsx` (companion, same publish date,
heavily cross-linked)
**Lens:** GEO (King + Koray), Business (Dan) on the finding below.

**Verdict: 6/10.** Solid GEO mechanics — BLUF `ShortAnswer`, a full four-schema
stack, honest self-interest disclosure in the copy ("We have a stake in the
answer and say so plainly"), decent query fan-out. Undercut by one real problem
and one serious one.

**Concrete fixes:**
1. Two H2 openers fail the liftable-opener rule via *self-referential deixis*
   rather than soft scene-setting — `matrix` ("The matrix below compares…") and
   `profiles` ("Each profile below reads…") only work in-page; lifted alone into
   an AI answer they say nothing. Rewrite both to state the actual comparative
   conclusion in sentence one.
2. The AfriShield `ListItem` in `itemListJsonLd` has no `@id`, so it doesn't
   merge with the canonical `${SITE_URL}/#organization` node the companion post
   defines — a knowledge-graph consumer can't tell they're the same entity.
3. Missing links to `ai-search-visibility-study` (published two days prior, same
   category, directly corroborating data) and `/geo-services`.
4. FAQ entry explaining the comparison-guide tactic this explicitly, sitting
   right next to a self-ranking-first `ItemList`, is worth a tone check (minor).

**Serious finding — fabricated competitor entities (King, escalated by Dan
Martell/business lens).** The `itemListJsonLd` block asserts three "competitor"
agencies — **Nairobi Marketing, SEO Smart Limited, Digital 4 Africa** — as
`Organization` schema entities with specific descriptions and hub cities. A grep
across the entire repo (research notes, `content-queue.md`, `used-keywords.md`)
turns up **zero references to any of the three anywhere else** — no SERP result,
no sourcing trail, nothing (independently re-verified, not just the subagent's
claim). This directly violates B.8's own existing requirement ("3–4 *legitimate*
regional competitors") — the SOP was right, nothing enforced it.

This is not a style nitpick. Publishing named, specific-sounding businesses as
machine-readable "fact," with zero verification, is a real reputational and
possible-legal liability (if the names happen to collide with real companies)
and a direct contradiction of the post's own thesis that "corroboration is what
turns a page into a source." It shipped straight to master (commit `8f78fb7`,
2026-08-30) without a board pass — the B.8 citation-syndication track runs
outside the queue-driven pipeline this board normally reviews pre-publish.

**Recommendation (urgent, top of execution to-do below):** either replace the
three names with real, sourced competitors, or — if they are meant as
illustrative composites — strip the `Organization`/`ItemList` schema for them
entirely and add a visible disclosure matching the site's existing `Scene`
convention ("Illustrative composite"). This should happen before the next
scheduled board cycle, not wait for it.

**Systemic drift → fixed in this PR:** added a non-negotiable competitor-
sourcing rule to both `afrishield-blog/SKILL.md` and `afrishieldai-seo/
SKILL.md` (B.7 checklist + B.8 SOP), and a self-referential-deixis note to the
liftable-opener rule. **Policy recommendation (not yet applied — needs a human
call):** B.8 GEO-citation posts assert facts about third-party companies, a
different risk class than an ordinary blog post; consider requiring board
pre-publish review specifically for B.8-format posts, not only post-hoc audit.

---

## Target B — Queued keyword: `what is local seo` (row 9, cluster E)

**Source:** `content-queue.md`, the only remaining `queued` row, reviewed as an
upcoming brief.
**Lens:** GEO (Koray) + Business (Dan).

**Verdict: retire, not narrow.** This is the seventh time this row has been
checked (six prior skips, 2026-08-18 → 2026-08-23, all logged in
`content-queue.md`). The duplication is real and directly verified this run:
`local-seo-for-small-business` opens its `what-local-seo-is` H2 with "What local
SEO actually is" — the identical question row 9 targets. Cluster E already has
**four** live posts (`how-to-get-my-business-on-google`,
`google-business-profile-optimization`, `how-to-appear-on-google-maps`,
`local-seo-for-small-business`); a fifth definitional post adds little marginal
topical value (Koray) even narrowed.

**Business lens (Dan):** seven skipped runs on one decision is a real
automation-cost failure — exactly the kind of repetitive, rule-based call the
system should have resolved on its own by round two or three, not left open for
two weeks. Retired the row directly in this PR rather than kicking it further.

**Bigger finding: the queue pipeline is stalled.** With row 9 retired, rows
1–15 are now all `claimed` or `retired` and rows 16–21 (tourism candidates) are
still un-vetted (`candidate`, no DataForSEO pass). The scheduled auto-poster has
almost certainly been reporting "queue empty" since row 15 was claimed
(2026-08-23) — the three posts published since then came from a separate
interactive/DataForSEO track (the B.8 GEO-citation SOP), not this queue. The
scheduled pipeline this queue exists to feed has likely been idle for over a
week without anyone flagging it as down.

**Systemic drift → fixed in this PR:** row 9 marked `retired` with the decision
logged in `content-queue.md`. **Not fixable by the board:** promoting rows
16–21 needs a DataForSEO pass, which requires an interactive session — flagged
as the top operational to-do below.

---

## Target C — Site page: `/pricing`

**File:** `app/pricing/page.tsx`
**Lenses:** GEO (King + Koray) and Conversion (Wes) — landing/money page, both
lenses required per the routing table.

**GEO verdict: 6/10.** Strong BLUF and a genuinely good, entity-dense FAQ
(city-specific pricing, honest "who should not buy the top tier" answer). But
the page ships only half of its own schema spec — `FAQPage` + `BreadcrumbList`,
no `Offer`/price schema on the page itself (the `hasOfferCatalog` block with
real tier prices exists in `lib/structured-data.ts` but is wired only into the
homepage) — and **zero in-body links** to any sibling page, the identical gap
the board found on `/solutions` on 2026-08-04, now recurring on the very next
page in rotation.

**Conversion verdict: 6.5/10.** Better than `/solutions` was: a clickable "Book
a call" CTA sits in the first content section (the tier cards), not six screens
down, satisfying the CTA-placement rule the board wrote into the skill after the
last review. But `PageHero` itself still renders no CTA at all — flagged as a
fix candidate on 2026-08-04, confirmed unimplemented on every page built on it
since — and the page has zero trust/social-proof signal; `/case-studies` exists
on the site and isn't linked from here, the highest-intent page on the site. The
closing `CtaDrop`'s default secondary button ("See pricing") is also dead —
it's the page the visitor is already on.

**Concrete fixes for the doer (not applied in this PR — the board advises, it
does not build):**
1. Link to `/case-studies` from the intro `Bluf` or the FAQ ("who should not buy
   the top tier" is the natural anchor).
2. Add `Offer` schema (3 tiers, price + currency) scoped to `/pricing` itself,
   generated from the same `TIERS` array that renders the cards — not
   maintained separately from `lib/structured-data.ts`.
3. Add optional `ctaLabel`/`ctaHref` props to `PageHero` and wire them into
   pricing, solutions, how-it-works, and the vertical landing pages.
4. Convert the `forWho` tier copy into a scannable "Start here if:" trigger line
   — the page's own closing copy admits people mis-guess their tier today.
5. Override the closing `CtaDrop`'s secondary CTA to point at `/case-studies` or
   `/how-it-works` instead of the page itself.
6. In-body links: "the technical work" → `/how-it-works`; the "full website
   rebuild" exclusion → `/solutions`.

**Systemic drift → fixed in this PR:** `afrishieldai-seo/SKILL.md` B.7 gets
three new checklist items (cross-link check, on-page Offer check, competitor-
sourcing check) and a "real proof point" requirement for high-intent pages; the
`PageHero` CTA gap is now flagged as a required fix (second consecutive miss),
not a suggestion.

---

## Agreement / disagreement

| Point | King/Koray (GEO) | Wes (Conversion) | Dan (Business) | Verdict |
|---|---|---|---|---|
| GEO-citation post: fabricated competitor entities | Flags as a corroboration/verifiability failure that violates B.8's own "legitimate" rule | — | Flags as a reputational/legal liability, escalates urgency and recommends board pre-publish review for this content type | **Agree, Dan escalates.** Fixed the skill rule; urgent content fix recommended, not yet applied (editorial call). |
| `/pricing`: no in-body cross-links, thin schema | Flags missing `Offer` schema on-page and zero cross-links — identical gap to `/solutions` | — | Two consecutive misses on the same rule is a process failure, not a content one | **Agree.** Added enforcement checklist items to B.7 so this stops recurring page-by-page. |
| `/pricing`: `PageHero` CTA gap | — | Flags the hero itself as a dead zone, though tier CTAs one section down partly mitigate it | Recommended fix twice now (2026-08-04, 2026-09-01) with zero action — should be a required fix, not a suggestion | **Agree.** Upgraded from "candidate prop" language to a required fix in the skill. |
| `/pricing`: no trust signal | — | Flags zero proof/social-proof content, `/case-studies` unlinked | Consistent with buy-back philosophy: don't rebuild this each rotation cycle, make it structural | **Agree.** Added a proof-point requirement to the skill, not just a one-off content fix. |
| Row 9 (`what is local seo`) | Confirms the duplication directly against `local-seo-for-small-business` | — | Seven skipped runs is a real automation-cost failure; retire rather than keep deferring | **Agree.** Retired in this PR. |

No priority-override disagreements this cycle — every finding either stood
alone or reinforced a finding from another lens pointing at the same root
cause. The one point requiring judgment (fabricated entities) had King and Dan
reinforcing each other, not conflicting.

---

## Execution to-do (for the doer agent — highest leverage first)

1. **[Urgent, doer/human — Target A]** Fix the live `top-geo-ai-seo-agencies-
   africa-2026` post: replace the three unsourced competitor names with real,
   sourced ones, or strip their `Organization`/`ItemList` schema and add a
   visible "illustrative" disclosure if they must stay as composites. Do not
   wait for the next scheduled cycle — this is already live and asserting
   unverifiable facts as structured data.
2. **[Applied]** `afrishieldai-seo/SKILL.md` — B.7 gets cross-link, on-page
   Offer, and competitor-sourcing checklist items; B.3 strengthens the
   `PageHero` CTA note into a required fix; B.8 requires a logged sourcing
   trail for every named competitor.
3. **[Applied]** `afrishield-blog/SKILL.md` — self-referential-deixis added to
   the liftable-opener rule; competitor-entity verification rule added,
   cross-referencing B.8.
4. **[Applied]** `content-queue.md` — row 9 retired with the decision logged;
   general-cluster pool exhaustion flagged.
5. **[Doer, next post]** Fix the two self-referential H2 openers (`matrix`,
   `profiles`) in `top-geo-ai-seo-agencies-africa-2026`; add the missing `@id`
   to AfriShield's `ListItem`; link to `ai-search-visibility-study` and
   `/geo-services`.
6. **[Doer]** `/pricing`: add `Offer` schema on-page, link to `/case-studies`,
   add `PageHero` CTA props (reused across pricing/solutions/how-it-works),
   convert `forWho` copy to a scannable trigger line, fix the closing
   `CtaDrop`'s dead secondary button, add the two in-body cross-links noted
   above.
7. **[Operational — needs an interactive session with DataForSEO]** The queue
   pipeline is now empty at the general-cluster level. Run a DataForSEO pass on
   content-queue rows 16–21 (tourism candidates) or source fresh general-cluster
   keywords before the next scheduled auto-poster run, or it will report "queue
   empty."
8. **[Policy — needs a human decision, not applied]** Consider requiring board
   pre-publish review specifically for B.8 GEO-citation posts (they assert
   third-party facts, a different risk class than ordinary content), rather
   than only catching problems on the twice-weekly post-hoc audit.
9. **[Note for next rotation]** `/how-it-works` is next in the site-page
   rotation and, per the 2026-08-04 report, likely has the same `PageHero`
   CTA gap — worth checking early rather than waiting for its scheduled turn,
   especially since the underlying component fix (item 6) should close it
   everywhere at once if landed first.
