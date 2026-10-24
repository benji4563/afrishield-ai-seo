# AfriShield Board of Advisors — Review 2026-10-02

Scheduled twice-weekly review. Targets per the rotation: (a) the most recently
published blog post, (b) the next `queued` keyword in `content-queue.md`
(reviewed as an upcoming brief), (c) one site page from the rotation
(solutions → pricing → how-it-works → **about** → contact).

## Targets

- **Target A (blog post, published):** `how-much-does-seo-cost-in-nigeria`
  (`app/blog/how-much-does-seo-cost-in-nigeria/page.tsx`, published 2026-09-30,
  content-queue row 32) — the first post written under the 2026-09-24
  geographic-pivot rule.
- **Target B (upcoming brief, not yet written):** content-queue row 33, "how to
  appear on google maps in lagos" — next `queued` row after row 32.
- **Target C (site page, rotation):** `/about` (`app/about/page.tsx`).

## Lenses run

- **GEO** (King + Koray) on all three targets.
- **Conversion** (Wes McDowell) on Target C only (per the routing table: blog
  posts/briefs get GEO; site pages get GEO + Conversion).
- **Business** (Dan Martell) applied directly below on one cross-cutting
  finding (not a full target, but a strategic/process issue the review
  surfaced).

---

## Target A — `how-much-does-seo-cost-in-nigeria` (GEO: **8/10**)

Strongest execution of the geo-pivot so far: BLUF names Nigeria/₦ in the first
sentence, every H2 opener passes the liftable-opener test, real Lagos/Abuja
neighborhood entities, both city pages linked, HowTo + FAQ + Breadcrumb +
BlogPosting JSON-LD all present, humor dosage and the "Illustrative composite"
disclosure correctly applied.

**Concrete fixes:**
1. **(King, highest priority)** FAQ #3 ("is SEO worth it vs. ads") is geo-less —
   no "Nigeria," no ₦ — identical in shape to the pre-pivot content the rule
   exists to kill. FAQ answers are independently retrievable chunks via
   `faqPageJsonLd`; add a Nigeria-specific example/₦ figure.
2. **(King)** `howToJsonLd` step text paraphrases rather than matches the
   visible `<ol>` copy — align verbatim.
3. **(King)** The `who-charges-what` opener is a four-clause run-on; split into
   two sentences for cleaner excerptability.
4. **(King)** No coverage of pricing-model sub-questions (retainer vs.
   project-based vs. pay-per-ranking) — a common query-fan-out branch.
5. **(Koray)** Links out mostly to pre-pivot generic siblings for now, which is
   correct since Cluster N's other rows aren't published yet — flagging only so
   the backfill (noted in an HTML comment in the file) is actually executed
   when rows 33/35/43/44 publish, not forgotten.

**Systemic drift — confirmed, skill edited.** The FAQ-answer gap (fix 1) is the
editorial rule's own failure pattern reappearing one level down, in a part of
the template nobody audits. Added to `afrishield-blog/SKILL.md`: extend the
liftable-opener self-audit to FAQ answers for any geo-pivot post.

---

## Target B — row 33, "how to appear on google maps in lagos" (GEO
readiness-to-write: **6/10**)

Not yet drafted — reviewed as a brief. Commercial case is excellent
(gsc-evidenced, near-zero local competition), but as specified the brief
relies on generic rules that don't force the unattended auto-poster past a
surface reskin of the live generic parent (`how-to-appear-on-google-maps`),
which is structured entirely around "relevance, distance, prominence." A
straight reskin would score 2-3/10 on arrival — the same failure pattern that
retired content-queue row 9.

**Required brief (King + Koray), summarized:**
1. BLUF must lead with the Lagos-specific distortion (traffic/"go-slow" makes
   distance a behavioral problem, not just a GPS one), naming Lagos in the
   first 100 words.
2. New macro-structure, not the parent's reskinned: landmark/informal
   addressing, district-level search behavior (real districts from
   `lib/cities.ts`), multi-branch duplicate-listing risk, WhatsApp as a
   prominence signal, review culture + ₦ cost (tied to row 32's established
   bands).
3. Fresh `Scene` composite — not Adaeze's print shop renamed.
4. Lagos-specific FAQ fan-out, reusing `lib/cities.ts`'s existing
   Lagos-vs-Abuja fact rather than contradicting it.
5. Entities/JSON-LD naming Lagos + real districts, consistent with
   `lib/structured-data.ts`'s `AFRICAN_CITIES` entry.
6. Bidirectional internal linking into Cluster N: parent post, `/ai-seo/lagos`,
   placeholders for rows 34/42, and the backlink slot `how-much-does-seo-cost-
   in-nigeria` already reserves for this row.
7. ₦ pricing throughout, consistent with row 32.

**Systemic drift — confirmed, skill edited.** The differentiation-angle check
in `content-queue.md`/the blog skill only catches title/description overlap —
a title-level dedupe, not a structural one. A city-qualified row can pass that
check while still being an 80%-identical reskin of its generic parent. This
applies to every row in the African-commercial cluster (33–48), not just this
one. Added a geo-localization structural check to `afrishield-blog/SKILL.md`.

---

## Target C — `/about` (GEO: **6.5/10**, Conversion: **5/10**)

**GEO:** Clear structural wins — it's the first page in this rotation to ship
with a working BLUF and canonical JSON-LD (`aboutPageJsonLd`/`founderJsonLd`)
out of the box, matching the exact pattern the 09-29 review asked other pages
to reference by `@id`. Weaknesses: H2 sections open on pronouns/connectives
that don't resolve standalone (hurts passage-level retrieval); named entities
(Tataachi Network Insurance, Optimere) are folded into a prose `description`
instead of modeled as discrete `affiliation` nodes; no `foundingDate`; only one
in-body link (`/how-it-works`) — better than `/solutions`/`/pricing` (zero),
but still under-serves the topical map (no link to `/solutions` or
`/case-studies`).

**Conversion:** Authentic founder narrative carries real credibility, but the
hero headline is clever, not clear (zero signal on what AfriShield does, no
hero CTA), the entire six-paragraph story section has no CTA until the very
end, the one in-body CTA that exists points laterally to `/how-it-works`
instead of `/pricing`/`/contact` at the reader's peak-intent moment, and there
is zero client-facing trust/social-proof signal (only self-reported founder
credibility).

**Agreement between GEO and Conversion:** both flag the page's single in-body
link as misplaced/insufficient — GEO wants more topical-map links
(`/solutions`, `/case-studies`), Conversion wants the existing link redirected
toward conversion (`/contact`/`/pricing`). **Resolved, no real conflict:** add
the GEO-recommended `/solutions` and `/case-studies` links at the anchors GEO
already identified, and move the Beliefs-section button from `/how-it-works`
to `/contact` — `/how-it-works` is better served from the "losses at the same
size as the wins" anchor GEO already proposed, so nothing is lost, and the
peak-intent CTA now points at conversion instead of further education.

**Systemic drift — confirmed, skill edited (two findings):**
1. **(Koray)** The founder `Person` entity itself has the same "named entity
   folded into prose" gap B.3 already bans for sub-offerings. Added an
   explicit `founderJsonLd` affiliation/`sameAs` requirement to
   `afrishieldai-seo/SKILL.md`.
2. **(Wes, confirmed recurrence — not new).** This is the **same** CTA-
   reachability/trust-signal gap the board flagged on `/solutions` (08-04) and
   `/pricing` (09-22), marked `[Applied]` on 09-22, found **still unshipped in
   code** on 09-29 (`/how-it-works`), and **confirmed unshipped again today**
   on `/about` — the fourth consecutive page. Verified directly:
   `components/ui/PageHero.tsx` still has no `ctaHref`/`proofStat` props;
   `components/home/CtaDrop.tsx` has `ctaLabel` but the button target is still
   hard-coded to `/contact`, and there is no `proof`/`proofStat` prop at all.
   `/about` doesn't even use `PageHero` (bespoke hero), so the fix needs to
   reach custom-hero pages too, not just `PageHero` consumers.

---

## Business lens (Dan Martell) — on the recurring "[Applied]" failure

Not a target review, but this cross-cutting finding is strategic, not
cosmetic: a fix that gets **described** in a skill doc but never **shipped**
in code, across three review cycles (09-22 → 09-29 → 10-02) and four pages
(`/solutions`, `/pricing`, `/how-it-works`, `/about`), is exactly the failure
mode Buy Back Your Time warns against — a system the founder can't trust
without personally re-auditing it defeats the point of delegating to the board
and the builder agents in the first place. The rule itself is already written
correctly (B.7, 2026-09-29); the gap is enforcement. This is now escalated in
`afrishieldai-seo/SKILL.md` from a checklist reminder to a blocking
requirement: the next PR touching `PageHero.tsx`, `CtaDrop.tsx`, or any page
using either must ship the actual props before being marked done.

---

## Agreement / disagreement table

| Point | King/Koray (GEO) | Wes (Conversion) | Dan (Business) | Verdict |
|---|---|---|---|---|
| Target A overall quality | 8/10, strong pivot execution | — (not run) | — | High confidence: ship as-is, fix FAQ #3 |
| Target B readiness | 6/10, real risk of a reskin | — (not run) | — | Must tighten brief before writing (done, skill edited) |
| `/about`'s one in-body link | Wants it diversified into the topical map (`/solutions`, `/case-studies`) | Wants it redirected toward conversion (`/contact`) | — | **Apparent disagreement, resolved:** add the GEO links at new anchors, retarget the existing one to `/contact` — both get what they asked for, nothing traded off |
| `/about` entity modeling | Founder affiliations should be discrete JSON-LD nodes | — | Agrees in spirit: an unmodeled entity is a smaller version of the same "claims not in the system" gap | Fix now (skill edited) |
| CTA/trust-signal props still unshipped | Not this lens's finding | **Confirms 4th recurrence**, names exact missing props | **Escalates**: doc-only fixes don't buy back time, this is a process failure | No disagreement — unanimous, escalated to blocking in skill |

No genuine cross-lens disagreement surfaced this cycle beyond the one
resolved above (both inputs were compatible, not contradictory).

---

## Execution to-do list (for the doer agent)

**Target A — `how-much-does-seo-cost-in-nigeria` (small, fast):**
1. (King) Rewrite FAQ #3 to name Nigeria and a ₦ figure.
2. (King) Align `howToJsonLd` step text verbatim with the visible `<ol>` copy.
3. (King) Split the `who-charges-what` opener into two sentences.
4. (King) Add a pricing-model sub-question (retainer/project/pay-per-ranking)
   as a 7th FAQ or a line in `what-drives-price`.

**Target B — row 33 brief, before the next auto-poster run drafts it:**
1. (Koray) Write from the new macro-structure in the brief above, not the
   generic parent's H2 sequence — verify against `lib/cities.ts` district data.
2. (King) BLUF names Lagos + the traffic/distance distortion in the first 100
   words.
3. (Koray) Fresh `Scene`, Lagos-specific FAQ fan-out, bidirectional Cluster N
   linking, ₦ pricing throughout.
4. (Process) Apply the new skill-level geo-localization structural check
   before registering the post.

**Target C — `/about`:**
1. (Wes, highest leverage) Rewrite the hero: state the offer plainly near the
   H1/lede, add a hero-level CTA pair (Book a call / See pricing).
2. (Wes) Insert one contextual CTA mid-story-section (after "The gap he could
   not unsee," before "Why AfriShield AI exists").
3. (Wes + Koray, resolved together) Retarget the Beliefs-section button from
   `/how-it-works` to `/contact`; add new in-body links to `/solutions` and
   `/case-studies` at the anchors GEO identified; keep one link to
   `/how-it-works` at the "losses at the same size as wins" anchor.
4. (Wes) Add one concrete trust signal (client count, case-study reference, or
   number) near Beliefs or the closing `CtaDrop`.
5. (King) Open each flagged H2 with a self-sufficient first sentence (restate
   who/what/when before continuing the narrative voice).
6. (King) Add `affiliation`/`alumniOf`/`sameAs` to `founderJsonLd`; add
   `foundingDate` to `organizationJsonLd` if a real date is available (never
   fabricate).

**Cross-cutting, highest leverage of the whole review:**
1. **Ship `ctaHref`/`proofStat` on `PageHero` and a real `ctaHref`/`proofStat`
   on `CtaDrop`** (rendering nothing when omitted), and wire them into
   `/about`'s bespoke hero too. This single change closes findings from four
   separate review cycles across four pages. Treat as blocking on the next PR
   touching either component.

## Skill edits made on this branch

- `ai-seo/afrishieldai-seo/skills/afrishield-blog/SKILL.md` — added the
  FAQ-answer geo-audit extension and the geo-localization structural check for
  city-qualified rows.
- `ai-seo/afrishieldai-seo/skills/afrishieldai-seo/SKILL.md` — added the
  `founderJsonLd` entity-linking requirement; escalated the CTA/trust-signal
  props gap from a checklist reminder to a blocking requirement (4th
  recurrence, confirmed still unshipped in code); extended the money-page
  gate's scope to include `/about`.

## Summary (feeds the Saturday digest)

Targets: `how-much-does-seo-cost-in-nigeria` (published post), row 33 "how to
appear on google maps in lagos" (upcoming brief), `/about` (site-page
rotation). Lenses: GEO (King+Koray) on all three, Conversion (Wes) on `/about`,
Business (Dan) on one cross-cutting process finding. Scores: Target A 8/10,
Target B 6/10 readiness-to-write, `/about` GEO 6.5/10 / Conversion 5/10. Top
actions: fix the geo-less FAQ on the Nigeria-cost post; rewrite row 33's brief
so the auto-poster can't reskin the generic Google-Maps parent; fix `/about`'s
hero/CTA/trust gaps and entity schema. One apparent GEO-vs-Conversion
disagreement on `/about`'s single link resolved cleanly (add + retarget, no
tradeoff). Biggest finding: the CTA/trust-signal component props have now been
"fixed" in a skill doc three times (09-22, 09-29, today) without ever shipping
in code — confirmed unshipped a fourth time on `/about` — now escalated to a
blocking requirement. PR: see branch `board/review-2026-10-02`.
