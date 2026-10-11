# AfriShield Board of Advisors — review, 2026-09-29

Twice-weekly scheduled review. Targets chosen per the routine prompt: (a) most
recently published/edited blog post, (b) next `queued` keyword in
`content-queue.md` (reviewed as an upcoming brief), (c) one site page from the
rotation (solutions, pricing, how-it-works, about, contact).

- **Target A:** `/blog/enterprise-geo-launch-africa` — published 2026-08-30 in
  the same commit as `top-geo-ai-seo-agencies-africa-2026`. That sibling post
  was already board-reviewed on 2026-09-22 (6.5/10); this run picks the other,
  never-reviewed post from the same commit rather than re-reviewing the one
  already covered.
- **Target B:** `content-queue.md` row 32, `how much does seo cost in
  nigeria` — the first `queued` row (the active African-commercial-intent
  queue added 2026-09-24; row 9 was retired at the last review, and rows
  32-35 localise topics the domain already has GSC impressions on). Reviewed
  as an upcoming brief (pre-task mode), not yet written.
- **Target C:** `/how-it-works` — rotation is solutions (07-31, 08-04) →
  pricing (09-22) → **how-it-works** (this run, first review) → about →
  contact. The 09-22 report explicitly flagged this page as "worth checking
  for the same triad early" before its scheduled turn; nothing acted on that
  flag before today.

Lenses run: **GEO** (Mike King + Koray Tuğberk Gübür — `board-geo-reviewer`)
on all three targets per the routing table. **Conversion** (Wes McDowell) on
Target C, since it is a core-funnel page like `/solutions`/`/pricing`.
**Business** (Dan Martell) on a cross-cutting process finding surfaced by both
Target C lenses independently (see below) — not on an individual target, but
on how the board's own prior "fixed at skill level" claims were verified.

---

## Target A — Blog post: `enterprise-geo-launch-africa`

**File:** `app/blog/enterprise-geo-launch-africa/page.tsx`
**Lens:** GEO (King + Koray).

**Verdict: 6/10.** Strong BLUF/FAQ/chunk discipline and a coherent fan-out for
an announcement-format post. But the page ships a duplicate, divergent
`Organization` entity that undercuts its own "one consistent identity" claim,
skips B.3's entity-linked-schema rule for its three named capabilities, and
inherits the still-open B.8 syndication-logging gap from its sibling's
2026-09-22 review — confirmed still missing one week later, now affecting a
second post.

**Concrete fixes:**
1. **Duplicate, divergent `Organization` node.** `page.tsx:74-93` declares a
   local `organizationEntityJsonLd` with its own `@id`
   (`${SITE_URL}/#organization`), while the sitewide `organizationJsonLd`
   (`lib/structured-data.ts:5-23`, injected on every page via
   `app/layout.tsx`) has **no `@id` at all** and a different shape (no
   `address`/`knowsAbout`, has `telephone`/`areaServed`-as-countries). Two
   un-merged `Organization` nodes for the same brand is the opposite of the
   entity disambiguation this SOP exists to build. Fix: give the root
   `organizationJsonLd` the canonical `@id`, and have this post's block
   extend/reference that same node rather than redeclare a parallel one.
2. **Named capabilities aren't modeled as entities.** The three launch
   capabilities (`page.tsx:173-195`) are prose `<li>`s only — no `Service`
   JSON-LD, which B.3 (`SKILL.md:150-154`) requires for named sub-offerings.
3. **Founder entity is a disconnected stub.** `page.tsx:81` restates
   `{ '@type': 'Person', name: 'Benjamin Njock' }` with no `@id`/`sameAs` back
   to the richer canonical `founderJsonLd` used on `/about`
   (`lib/structured-data.ts:155-163`) — a second, thinner Person node for the
   same founder.
4. **Worth a copy pass, not a hard error:** the post frames this as a fresh
   "launch" (30 August 2026) while explicitly citing `/geo-services` as the
   company's "existing" GEO service (which shipped 2026-08-10, three weeks
   earlier). The post is self-aware about this — it calls `/geo-services`
   "existing" rather than hiding it — so this reads as an enterprise-tier
   service launched alongside a general one, not a factual contradiction. Low
   confidence finding; a one-clause clarification ("expanding our GEO work
   into a dedicated enterprise tier") would remove the ambiguity cheaply.

**Systemic drift — confirmed still live.** `reports/pr-syndication-log.md`
does **not exist**. The 2026-09-22 review required B.8 steps 2-3 (PR-wire
syndication, 48-72h citation benchmark) to be logged there for both posts in
this commit. One week later, still nothing — meaning either the syndication
never ran, or it ran with no checkable record, which is the exact failure
mode the requirement was written to close. Prose-only additions to B.8
already failed once; fixed in this PR by making it a hard precondition (see
Skill edits below).

---

## Target B — Queued keyword (brief review): `how much does seo cost in nigeria`

**Source:** `content-queue.md` row 32, cluster N (Nigeria commercial).
**Lens:** GEO (King + Koray), pre-task mode.

**Verdict: 8/10 readiness — clean, write as-is.** The generic parent post
(`what-seo-actually-costs`, `primaryKeyword: "how much does seo cost"`) was
checked directly: zero mentions of Nigeria, NGN, Lagos, or Africa anywhere in
its body. Row 32 is a genuine geographic localisation, not a restatement —
exactly the "localise the proven performers first" shape the 2026-09-24 pivot
rule calls for, and it inherits real GSC-evidenced demand (the generic parent
holds 26 impressions at position 59). `/ai-seo/lagos` exists in `lib/cities.ts`
as a valid link target for the mandatory city-page cross-link. No
differentiation-angle conflict found against `lib/posts.ts`.

**One thing for the writer to hold:** per the geographic-intent rule, price in
NGN, name Lagos/Abuja explicitly in the `ShortAnswer`, and link to
`/ai-seo/lagos` — the queue row already carries this instruction, this is
just confirmation the brief is sound before the auto-poster claims it.

---

## Target C — Site page: `/how-it-works`

**File:** `app/how-it-works/page.tsx`
**Lenses:** GEO (King + Koray) and Conversion (Wes McDowell).

**GEO verdict: 4/10.** Confirmed all three violations the 09-22 report
predicted, plus two it didn't flag. The one strong point: `howToJsonLd`
(`page.tsx:58`) is generated straight from the same `PROCESS_STEPS` array that
renders the visible `Process` component — copy and schema cannot drift,
exactly what B.3's "entity-linked schema" rule wants. Everything else is
worse than `/pricing` was at its 09-22 review:
1. **Zero in-body contextual links** — `grep -n "href=" app/how-it-works/page.tsx`
   returns nothing at all, not even inside `Process`/`Deliverables`/`Honest
   Timeline`. The only outbound click on the page is the closing `CtaDrop`,
   which the B.7 gate explicitly excludes. Third consecutive occurrence
   (`/solutions` 08-04 → `/pricing` 09-22 → `/how-it-works` today) — and this
   exact page had advance warning in the last report that wasn't acted on.
2. **No BLUF block.** Unlike `/pricing`/`/solutions`, this page never imports
   `Bluf`. The `PageHero` blurb is marketing copy, not a liftable 40-70 word
   factual answer.
3. **No FAQPage schema / no FAQ section at all** — unlike every other core
   page and every blog post. Obvious fan-out queries ("what if nothing
   changes in month one," "can I cancel," "what happens if the audit finds
   nothing") are only partially covered in loose prose, not in citable Q/A
   form.
4. Minor: `DELIVERABLES` rows (`page.tsx:28-33`) are subjectless fragments —
   same low-priority liftability gap already flagged on `/pricing`'s tier
   bullets.

**Conversion verdict: 4/10.** Copy is genuinely good — message-first, handles
the "month one is flat" objection head-on — but the page repeats the fold-six
failure worse than `/solutions` did originally:
1. **No CTA within the first two sections after the hero**, and **no
   mid-scroll checkpoint** across three content sections (Process,
   Deliverables, Honest Timeline) before the single closing `CtaDrop`. A
   visitor reads the entire 90-day explanation with nothing to click until
   the very last section.
2. **Zero trust/proof signal anywhere in the body** — no client count, case
   study, testimonial, or concrete outcome number. Third consecutive
   occurrence (`/solutions` 08-04 → `/pricing` 09-22 → `/how-it-works`
   today).

**Both lenses independently verified the same code-level fact: neither
"fixed at skill level" item from 09-22 actually shipped.** The 09-22 report's
execution to-do marked `PageHero`/`CtaDrop`'s CTA and `proof` props as
`[Applied]` at the skill-doc level. Both agents this run read the component
source directly (`components/ui/PageHero.tsx`, `components/home/CtaDrop.tsx`)
rather than trusting that label, and confirmed: neither component has the
prop. `PageHero` still only takes `eyebrow`/`title`/`blurb`; `CtaDrop` still
only takes `eyebrow`/`title`/`body`/`ctaLabel`. The skill doc's own language
(`SKILL.md:179-191`) still says "candidate for an optional prop" — it was
never a firm commitment, but the prior report's `[Applied]` tag read as if it
were closed. That labeling gap is why the gap survived unnoticed through an
entire review cycle onto a third page.

---

## Agreement / disagreement

| Point | King/Koray (GEO) | Wes (Conversion) | Dan (Business) | Verdict |
|---|---|---|---|---|
| Blog post: duplicate/divergent `Organization` entity | Flags the un-merged node, no shared `@id` | — | — | **Single-lens — act.** Doer fix (item 1 below) + B.3 skill addendum. |
| Blog post: named capabilities not entity-linked | Flags missing `Service` JSON-LD per B.3 | — | — | **Single-lens — act.** Doer fix. |
| Blog post: B.8 syndication log still missing (2nd post affected) | Confirms `pr-syndication-log.md` absent one week after the requirement was written | — | — | **Single-lens, but systemic — prose-only fix already failed once.** Gated mechanically in this PR (see Skill edits). |
| Row 32 keyword readiness | Confirms clean differentiation, GSC-evidenced demand, city-page target exists | — | — | **No conflict — ready to write.** |
| `/how-it-works`: zero in-body cross-links | Confirms 3rd consecutive occurrence of the exact B.7 gate violation | — | — | **Single-lens, but a repeat offense the board already flagged in advance.** Escalated below — doc language alone is not sufficient; needs a mechanical check. |
| `/how-it-works`: no BLUF, no FAQ schema | Flags a doctrine gap — B.2/B.7 contradict each other on which pages need a BLUF, and `/how-it-works` fell through it | — | — | **Single-lens — real doctrine bug, not just execution.** Fixed in skill this PR. |
| `/how-it-works`: no reachable CTA, no mid-scroll checkpoint | — | Confirms fold-six violation, worse than `/solutions`'s original instance | — | **Single-lens — act.** Doer fix. |
| `/how-it-works`: no trust/proof signal | — | Confirms 3rd consecutive occurrence | — | **Single-lens — act.** Doer fix. |
| **CTA prop / proof prop on `PageHero`/`CtaDrop`: claimed `[Applied]` 09-22, never shipped in code** | Independently confirmed absent by reading `PageHero.tsx` | Independently confirmed absent by reading `PageHero.tsx`/`CtaDrop.tsx` | A skill-doc edit that only describes a code change is a task logged, not an outcome delegated — the `[Applied]` tag hid that gap from this same review process for a full cycle | **Agree across all three lenses — highest-priority item this run.** The pattern (write doctrine, mark it "Applied," never verify the code) is the real root cause behind three consecutive page failures, not any one page's oversight. Fixed at the reporting-discipline level this PR (see below) and flagged as the top doer item. |

No true disagreement this run on priority — every finding either stood alone
or multiple lenses converged on the same fact. The one item requiring
priority resolution is implicit: GEO's doctrine-gap fix (BLUF/FAQ scope) and
Conversion's component-prop fix both compete for "highest leverage" on
`/how-it-works`. Per the board's standing rule (correctness/durability from
King/Koray outranks tactics, but conversion/business leverage break ties on
*sequencing*), the component-prop fix goes first — it blocks the identical
failure recurring on `/about` and `/contact` next, which is a wider blast
radius than one page's missing FAQ.

---

## Skill edits applied in this PR

`ai-seo/afrishieldai-seo/skills/afrishieldai-seo/SKILL.md`:
1. **B.7** — added a literal checklist item requiring `PageHero`/`CtaDrop`
   prop claims to be verified against the component source (`grep` the prop
   name in the `.tsx` file) before any future review or skill edit marks a
   component-level fix `[Applied]`. A skill-doc sentence describing an
   intended prop is not evidence the prop exists.
2. **B.7** — turned the money-page cross-link/schema gate from a manual
   checklist bullet into a required build-time script
   (`scripts/verify-money-page-links.sh`, doer-authored) that curls
   `/solutions`, `/pricing`, `/how-it-works` and fails the build step if
   either check is empty — closing the gap that let this recur a third time
   under a documented-but-unenforced rule.
3. **B.2/B.3** — fixed the doctrine self-contradiction: B.2 named only
   "home, solutions, pricing, and each location page" for BLUF; B.7's own
   checklist said "every key page." Reworded B.2 to "every page built on
   `PageHero`" so it matches the CTA-reachability and trust-signal rules,
   which were already scoped that way. Added a `How it works` row to the B.3
   schema table (`HowTo` + `FAQPage` + `BreadcrumbList`).
4. **B.3** — added: announcement/PR-style blog posts must reuse the sitewide
   `organizationJsonLd`'s `@id` rather than declaring a parallel `Organization`
   node, to prevent the duplicate-entity pattern found on Target A.
5. **B.8** — changed the syndication-log requirement from descriptive prose
   to a hard precondition: a pillar guide + companion post cannot be marked
   SOP-complete until `reports/pr-syndication-log.md` has an entry for that
   slug, added as a literal B.7 checklist item (not just B.8 prose, which
   already failed to produce a log entry across two consecutive posts).

---

## Execution to-do (for the doer agent — highest leverage first)

1. **[Doer, urgent]** Add `ctaHref?`/`ctaLabel?` to `PageHero`
   (`components/ui/PageHero.tsx`) and `proof?`/`proofStat?` to `PageHero` and
   `CtaDrop` (`components/home/CtaDrop.tsx`), rendering nothing when omitted.
   Wire `/how-it-works`, `/solutions`, and `/pricing` to actually pass both
   props **in the same change** — a prop nobody's page uses does not close
   the finding. This is the single highest-leverage fix: it is the confirmed
   root cause behind three consecutive page-review failures, not a one-page
   issue.
2. **[Doer]** `/how-it-works`: add real in-body anchors from existing copy —
   `DELIVERABLES` "First monthly report" → `/pricing`; `HONEST_TIMELINE`
   "Months 4–6: Compounding starts" → `/case-studies`; `Process` step
   "Foundation and first pages" → `/solutions`.
3. **[Doer]** `/how-it-works`: add a `<Bluf>` after `<PageHero>` (before
   `<Process />`) stating the four stages, the 90-day timeline, and what
   lands at month one — factual, no adjectives.
4. **[Doer]** `/how-it-works`: add a short FAQ (4-6 Qs covering "what if
   nothing changes in month one," "can I cancel," "what happens if the audit
   finds nothing") + `faqPageJsonLd()` + rendered `<Faq>`.
5. **[Doer]** `enterprise-geo-launch-africa`: give the root `organizationJsonLd`
   a canonical `@id` and have the post's `organizationEntityJsonLd` extend
   that node instead of redeclaring a parallel one; add `Service` JSON-LD for
   the three launch capabilities; reference the founder via `@id` back to the
   canonical `/about` `founderJsonLd`; consider a one-clause "expanding into
   an enterprise tier" clarification near the launch framing.
6. **[Doer]** Author `scripts/verify-money-page-links.sh` per the new B.7
   requirement and wire it into the existing verification step.
7. **[Doer]** Confirm whether B.8 PR-wire syndication actually ran for
   `top-geo-ai-seo-agencies-africa-2026` / `enterprise-geo-launch-africa`; if
   it did, log it in `reports/pr-syndication-log.md` retroactively; if it
   didn't, run it or explicitly stand down and say why.
8. **[Doer, next auto-poster run]** Row 32 (`how much does seo cost in
   nigeria`) is board-cleared to write: NGN pricing, name Lagos/Abuja in the
   `ShortAnswer`, link `/ai-seo/lagos`.
9. **[Note for next rotation]** `/about` and `/contact` are next. Per the
   doctrine-gap fix above, both now formally require a BLUF — check for the
   same triad (cross-links, BLUF, CTA reachability, trust signal) before
   their scheduled turn, the same warning the board gave for `/how-it-works`
   last time that went unactioned.
