# AfriShield Board of Advisors — review, 2026-10-06

Twice-weekly scheduled review. Targets chosen per the routine prompt: (a) most
recently published/edited blog post, (b) next `queued` keyword in
`content-queue.md` (reviewed as an upcoming brief), (c) one site page from the
rotation (solutions, pricing, how-it-works, about, contact).

- **Target A:** `/blog/how-much-does-seo-cost-in-nigeria` — published
  2026-09-30 (row 32). Brief-reviewed pre-write on 2026-09-22; this run
  checks whether the shipped post actually satisfies that pre-write brief.
- **Target B:** `content-queue.md` row 33, `how to appear on google maps in
  lagos` — the first `queued` row in the active African-commercial-intent
  queue. Reviewed as an upcoming brief (pre-task mode), not yet written.
- **Target C:** `/about` — rotation is solutions (07-31, 08-04) → pricing
  (09-22) → how-it-works (09-29) → **about** (this run) → contact.

Lenses run: **GEO** (Mike King + Koray — `board-geo-reviewer`) on all three
targets per the routing table. **Conversion** (Wes McDowell —
`board-conversion-reviewer`) on Target C, since an About page's job (build
founder/company trust) is squarely his lens even though it isn't a money
page. **Business** (Dan Martell) applied directly below on a cross-cutting
process finding, not on an individual target.

---

## Target A — Blog post: `how-much-does-seo-cost-in-nigeria`

**File:** `app/blog/how-much-does-seo-cost-in-nigeria/page.tsx`
**Lens:** GEO (King + Koray).

**Verdict: 8.5/10.** Every pre-write concern from the 2026-09-22 brief is
fully satisfied, several exceeded: NGN pricing throughout with consistent
USD conversion math; "Lagos or Abuja" named directly in the `ShortAnswer`;
links to **both** `/ai-seo/lagos` and `/ai-seo/abuja`; the differentiation
delta against the generic parent (`what-seo-actually-costs`) stated
explicitly in-body; named districts (Yaba, Lekki, Ikoyi, Victoria Island,
Ikeja, Surulere, Enugu, Ibadan, Apapa, Kano, Computer Village) that satisfy
Koray's "no city-name swap" rule. All nine H2s open with a direct, liftable
answer sentence; query fan-out covers freelancer/agency/in-house, price
drivers, FX risk, break-even math, cheap-SEO risk, and a 6-item FAQ.
`BlogPosting`/`FAQPage`/`BreadcrumbList`/`HowTo` schema all present and
matched to visible content.

Two gaps, both systemic rather than one-post mistakes:

1. `blogPostingJsonLd` carries no `about`/`mentions` entity field — on
   **every** post, not just this one — despite this post's whole value being
   named entities (Nigeria, Naira, Lagos, Abuja).
2. No `image` set in `lib/posts.ts` for this post, so its social card falls
   back to the generic sitewide `DEFAULT_OG_IMAGE` rather than anything
   Nigeria-specific.

Minor: `howToJsonLd`'s step text in the break-even section paraphrases
rather than mirrors the visible `<ol>` — low risk, tighten for consistency.

---

## Target B — Queued keyword (brief review): `how to appear on google maps
in lagos` (row 33, cluster N)

**Lens:** GEO (King + Koray).

**Verdict: ready to write, with a mandatory narrowing step before
drafting.** The generic parent `how-to-appear-on-google-maps` (233
impressions at position 69, UK/AUS traffic) covers the three abstract
ranking factors — relevance, distance, prominence — with zero geography.
That leaves room for row 33, but only if it localises those factors through
real Lagos detail, not a city-name reskin. `lib/cities.ts`'s Lagos entry
already has the needed material: named districts (Victoria Island/Ikoyi,
Lekki Phase 1, Ikeja/Computer Village, Yaba, Surulere, Apapa), "go-slow"
traffic-driven proximity search behaviour, WhatsApp as the real contact
channel, NGN pricing.

**Recommended angle:** reframe the three ranking factors through Lagos
specifics — *distance* (buyers search by district, not city, because of
traffic: "accountant in Lekki," not "in Lagos"), *prominence* (dense
competitor clusters like Computer Village make prominence harder to win) —
plus one new H2 the generic parent never has: **GBP address verification
without formal postal addressing**, a genuine Lagos pain point (landmark-based
addresses, not street numbers).

**Must-haves:** name "Lagos, Nigeria" in the `ShortAnswer`; link
`/ai-seo/lagos` plus a cluster-N link to the now-published
`how-much-does-seo-cost-in-nigeria`; NGN pricing if money comes up, matching
the `/ai-seo/lagos` page's figures; named districts sourced from
`lib/cities.ts`, not invented; `HowTo` schema if the fix-list is numbered.
Watch overlap with row 42 (`why is my business not showing on google maps
nigeria`) — keep the split explicit (ranking-factor guide vs. troubleshooting
diagnostic) and cross-link rather than duplicate.

---

## Target C — Site page: `/about`

**File:** `app/about/page.tsx`
**Lenses:** GEO (King + Koray) **and** Conversion (Wes McDowell).

### GEO — 6/10

Breaks the cross-link streak that hit `/solutions` → `/pricing` →
`/how-it-works` three times running, but only barely: `grep -n "href="
app/about/page.tsx` returns exactly one hit (`/how-it-works`, buried in the
closing section), with no link anywhere to `/solutions`, `/pricing`, or
`/case-studies` despite natural anchor points in the founder-story prose.
`/about` isn't one of the three pages the strict B.7 money-page gate names,
so this isn't a repeat rule violation — just weak topical-map integration.
BLUF is present and correct; `/about` does **not** repeat `/how-it-works`'s
missing-BLUF gap.

Concrete fixes:
1. `founderJsonLd` (`lib/structured-data.ts`) has no `@id` and no `sameAs` —
   this makes the 09-29 review's own prescribed fix ("reference the canonical
   `founderJsonLd` by `@id`") unexecutable, since the canonical node itself
   has nothing to reference.
2. `organizationJsonLd.areaServed` omits Cameroon while `/about` markets
   directly to Douala and `SERVED_CITIES` already lists it — the site's own
   entity data contradicts its own prose.
3. Tataachi Network Insurance and Optimere are named, central to founder
   credibility, and have zero structured representation.
4. Weave 2-3 in-body links into the narrative prose, not just one `Button`
   at the bottom.

### Conversion — 6/10

Genuinely good founder-specific narrative, and unlike the last three pages
reviewed, it actually has a CTA mid-scroll plus a closing `CtaDrop` — the
"fold-six dead end" is **not** present here. But it stays on the Scar
Scale's Competence rung when it has the material to climb to Adversity, and
the trust it builds has nowhere concrete to land.

Concrete fixes (highest leverage first):
1. **"The gap he could not unsee" section describes the industry's failure
   pattern generically** — no named claim, no number, no specific mistake
   Benjamin made and fixed. Replace one paragraph with a specific, checkable
   incident. Single highest-leverage edit on the page.
2. **No link from trust to proof** — the page builds credibility (18 years,
   two companies, 40+ countries) but never points to `/case-studies`, so a
   now-convinced visitor has no evidence the product works. (Independently
   flagged by the GEO lens too — see fix 4 above; both lenses converged on
   the same gap from different angles.)
3. Closing CTA copy is generic money-page language reused verbatim; a
   founder-voiced CTA ("Talk to Benjamin") would cash in the person-to-person
   trust just built. The page already overrides `title`/`body` with
   founder-flavoured copy, so this is a small tightening, not a rewrite.
4. The one Reframe-level line in the piece (the closing blockquote) is
   currently styled as plain `<blockquote>` and is doing more work than
   anything around it — promote it visually (pull-quote styling).

---

## Agreement / disagreement

| Point | GEO (King/Koray) | Conversion (Wes) | Verdict |
|---|---|---|---|
| `/about` trust has no path to proof | Flags missing link to `/case-studies` as a topical-map/cross-link gap | Flags the identical missing link as "trust with no path to proof" | **Agreement — two lenses, two reasons, same fix.** Single highest-confidence item: link the founder-story section to `/case-studies`. |
| `/about` narrative depth vs. schema | Found founder entity (`founderJsonLd`) structurally incomplete (`@id`/`sameAs`) | Found founder *narrative* structurally shallow (Competence, not Adversity) | **No conflict — different layers of the same page, both real.** Resolved by doing both: the Conversion fix (specific incident) is content; the GEO fix (`@id`) is schema. Neither substitutes for the other. |
| Cross-link streak on `/about` | Breaks the strict 3-page streak (only 1 of the 3 named pages); scores it a partial pass | Independently confirms the "fold-six dead end" pattern (no CTA reachability problem) is absent | **Agreement.** `/about` is cleaner than `/solutions`/`/pricing`/`/how-it-works` were, but not clean. |
| No disagreement surfaced this run | — | — | — |

No lens contradicted another this cycle — unusual for three consecutive
reviews that each surfaced a disagreement. Both `/about` lenses independently
landed on the identical score (6/10) for different, non-overlapping reasons,
which the board reads as corroboration rather than coincidence.

---

## Business lens (Dan Martell) — cross-cutting process finding

Not scored against an individual target; applied to a pattern across this
and the last two reviews. The "doc says fix it, code doesn't ship it" drift
first caught on 2026-09-29 (CTA/trust props described in `SKILL.md` but
absent from `PageHero`/`CtaDrop`) has now recurred a second time, on a
different field: `founderJsonLd`'s missing `@id` makes a fix the board
*already specified in writing* on 2026-09-29 impossible to execute, and
nobody caught that until this review re-read the actual object. Per the Buy
Back Principle: a fix that depends on a reviewer remembering to grep the
right file every two weeks is manual labour disguised as doctrine. This
review adds a second mechanical B.7 gate (`@id`/`sameAs` grep) alongside the
one already queued from 09-29 (`verify-money-page-links.sh`, still
unauthored as of this review — flagged again below). The leverage move is
building both checks once, not re-discovering the same class of gap by hand
every cycle.

---

## Skills edited this run (systemic fixes — see diff on this branch)

1. **`afrishieldai-seo/SKILL.md` (B.3)** — extended the money-page cross-link
   rule to cover `/about`; added entity-markup requirements for
   `blogPostingJsonLd` (`about`/`mentions`); added founder/org entity
   completeness requirements (`@id`, `sameAs`, Cameroon in `areaServed`,
   affiliated-entity representation for Tataachi/Optimere); added an
   About-page narrative-depth requirement (at least one falsifiable incident,
   not only credentials).
2. **`afrishieldai-seo/SKILL.md` (B.7)** — added a mechanical `@id`/`sameAs`
   completeness grep to the verification checklist, mirroring the existing
   money-page link/schema gate.
3. **`afrishield-blog/SKILL.md`** — added a city-qualified-keyword grounding
   step: before drafting any city-localised keyword, read the matching
   `lib/cities.ts` entry and weave at least two genuinely distinguishing
   local details into non-swappable H2 content, closing the city-name-reskin
   risk flagged on Target B.

---

## Execution to-do (for the doer agent — highest leverage first)

1. **[Doer]** `/about`: replace "the gap he could not unsee" with a specific,
   checkable incident (a number, a named-but-anonymized outcome, a mistake
   made and fixed). Highest-leverage single edit this cycle.
2. **[Doer]** `/about`: add an in-body contextual link from the "Why
   AfriShield AI exists" section to `/case-studies` (or a results page), and
   one more into `/solutions` from the "customers already searching" line —
   both lenses flagged this independently.
3. **[Doer]** `lib/structured-data.ts`: give `founderJsonLd` an `'@id':
   abs('/about#founder')` and a `sameAs` array (real profile URLs); add
   Cameroon to `organizationJsonLd.areaServed`; add minimal `affiliation`
   entities for Tataachi Network Insurance and Optimere.
4. **[Doer]** `lib/structured-data.ts`: extend `blogPostingJsonLd` to accept
   an optional `about`/`mentions` entity array; backfill it on
   `how-much-does-seo-cost-in-nigeria` (Nigeria, Naira, SEO pricing) as the
   first instance.
5. **[Doer]** `lib/posts.ts`: add an `image` entry for
   `how-much-does-seo-cost-in-nigeria` via the existing `pull-pexels.mjs`
   pipeline so its OG/social card isn't the generic homepage band.
6. **[Doer]** `/about`: tighten the closing `CtaDrop` copy toward
   founder-voiced language; promote the closing blockquote to pull-quote
   styling.
7. **[Doer, next auto-poster run]** Row 33 (`how to appear on google maps in
   lagos`) is board-cleared to write, on the narrowed angle above — district-
   level distance/prominence framing + the GBP-address-without-formal-
   addressing H2 — not a straight city-name reskin of the generic parent.
8. **[Still open from 2026-09-29, re-flagged]** `scripts/verify-money-page-links.sh`
   has still not been authored. Per the Business-lens note above, this is now
   two mechanical gates owed (that one, plus the new `@id`/`sameAs` grep
   added this run) — author both together rather than one at a time.
9. **[Note for next rotation]** `/contact` is next and closes the site-page
   rotation's first full pass. Check for the same triad (cross-links, BLUF,
   trust signal, narrative depth where applicable) before its scheduled turn.

---

## Summary (for the Saturday digest)

Targets: published post `how-much-does-seo-cost-in-nigeria` (GEO, 8.5/10,
pre-write brief fully satisfied); queued keyword `how to appear on google
maps in lagos` (GEO brief, ready to write with a Lagos-district-specific
angle, not a city-name reskin); `/about` (GEO 6/10, Conversion 6/10, both
lenses independently converged on the same missing `/case-studies` link).
No cross-lens disagreement this cycle — both `/about` lenses corroborated
each other from different angles. Top actions: rewrite the About page's one
generic-failure paragraph into a specific incident; link founder trust to
case-study proof; fix `founderJsonLd`'s missing `@id`/`sameAs` (which blocked
a fix the board already specified on 09-29). Business lens flagged a second
instance of doc-specified-but-unshipped fixes and tied it to the still-missing
verification script from the last review. Three skill files edited on this
branch for systemic drift. PR: see branch `board/review-2026-10-06`.
