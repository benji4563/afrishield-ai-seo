# AfriShield Board of Advisors — review, 2026-09-08

Twice-weekly scheduled review. Targets chosen per the routine's rotation:

| # | Target | Why chosen |
|---|---|---|
| A | `/blog/top-geo-ai-seo-agencies-africa-2026` | Most recently published post (2026-08-30, tied with `enterprise-geo-launch-africa`; this is the higher-risk of the pair — a self-published comparison that ranks AfriShield among named competitors). |
| B | `what is local seo` — row 9, `content-queue.md` | The only `queued` row; skipped **six** times running (2026-08-18 → 2026-08-23) with no resolution since. |
| C | `/pricing` | Next in the page rotation (solutions → **pricing** → how-it-works → about → contact). `/solutions` was reviewed 2026-07-31 and 2026-08-04; no page review has landed since. |

Lenses run: **GEO** (Mike King + Koray Tuğberk Gübür — `board-geo-reviewer`) on Target A;
**GEO** (Koray, cannibalization doctrine) + **Business** (Dan Martell) on Target B;
**Conversion** (Wes McDowell — `board-conversion-reviewer`) on Target C. **Business**
(Dan) is also applied as the chairman synthesis over the pattern across all three,
per the routing table's "anything strategic" trigger.

---

## Target A — Blog post: `top-geo-ai-seo-agencies-africa-2026`

**File:** `app/blog/top-geo-ai-seo-agencies-africa-2026/page.tsx`
**Lens:** GEO (King + Koray)

**Verdict: 6/10.** Mechanically strong GEO plumbing — BLUF answer block, HowTo/
FAQPage/ItemList JSON-LD, mostly liftable H2 openers — undercut by a real
credibility problem: it's a self-published "objective" comparison that never lets
a reader or a crawler independently verify the competitors it ranks itself above,
and it never links into the site's own core commercial page for this exact topic.

**Fixes, highest leverage first:**

1. **(King — corroboration)** No competitor has a `url`/`sameAs` in the
   `itemListJsonLd`, or any outbound link in the body/table/profiles — only
   AfriShield does. A comparison that can't be independently checked reads as
   self-serving to both a skeptical reader and a retrieval-grounded answer engine.
   Add `url`/`sameAs` to each competitor entity and an outbound link in each
   profile.
2. **(King/Koray — falsifiability)** AfriShield sits first in every representation
   (ItemList, matrix, profile order) with no visible per-criterion scoring — the
   ranking reads as asserted, not earned. Add an explicit scoring grid (criteria ×
   provider) so the order is falsifiable.
3. **(Koray — core/outer topical map)** The post links only to sibling blog posts,
   never to `/geo-services` — the core commercial page this outer-layer content
   should be funnelling into. Add a contextual link from the AfriShield profile or
   blueprint section.
4. **(Koray — E-E-A-T)** The FAQ explains *why* AfriShield publishes this kind of
   page but never answers the reader's real objection — "why trust a ranking where
   the publisher put itself first?" Add a direct FAQ entry on exactly that,
   pointing at the corroboration links added in fix 1.
5. **(King — passage retrieval, minor)** The `matrix` and `profiles` H2 openers
   describe the section ("The matrix below compares…") instead of leading with the
   takeaway, unlike the rest of the post. Tighten to match.
6. **(Koray — thin entity coverage, minor)** Competitor profiles are ~4 generic
   sentences each with no checkable detail, versus a fuller AfriShield profile.
   Add one concrete, checkable fact per competitor.

**Systemic drift → skill edit made this run.** The `afrishield-blog` skill's
internal-link rule only required 2–4 sibling-post links, so it says nothing about
linking into the cluster's core commercial page, and nothing at all about the
outbound-corroboration standard a comparison/"top X" post needs when it names and
ranks real competitors. **Fixed on this branch:** `afrishieldai-seo/skills/
afrishield-blog/SKILL.md` now requires (a) at least one contextual link into the
cluster's core commercial page, and (b) `url`/`sameAs` + an outbound link for any
named, ranked competitor (or an explicit HTML-comment note if no public URL
exists), so the next comparison post this skill generates doesn't repeat the gap.

---

## Target B — Queued keyword: `what is local seo` (row 9, cluster E)

**Lens:** GEO (Koray — cannibalization) primary; Business (Dan) on the process
failure.

**Verdict: retire the row, don't narrow it.** Row 9 has been checked and skipped
**six times** (2026-08-18, 19, 20, 21, 22, 23) with the identical finding every
time: `/blog/local-seo-for-small-business` (published 2026-08-17) already opens
with an H2 titled "What local SEO actually is" that gives a direct, thorough
definitional answer — including a comparison table against general SEO — for the
exact same audience this keyword would target. I read that section directly
(lines 149–176): it isn't a passing mention, it *is* the definitional answer this
keyword wants.

Koray's doctrine (2026-07-29 update) is explicit that cannibalization still hurts
rankings today — this isn't a stale worry, and the skip-note discipline correctly
caught it every single time. **That part of the system is working.** What isn't:
the row has been re-litigated six times without anyone making the call. The
`content-queue.md` rules assign narrowing/retiring row 9 to the weekly
queue-keeper routine, but no queue-keeper action has landed since the row was
first flagged on 2026-08-18 — confirmed by `git log` on `content-queue.md`,
which shows no commit after `05dbe66` (2026-08-23).

**Fix:** retire row 9 rather than narrow it. A narrower stub (e.g. a short
glossary page) would just split retrieval authority against a comprehensive
sibling for no real gain — Mike King's chunk-retrieval lens says the same thing
from the other direction. Better: let `local-seo-for-small-business` be the
canonical answer and confirm "what is local SEO" is covered as a secondary
entity/FAQ variant there, rather than spend a post slot on it.

**Systemic finding (Business/Dan) — the bigger issue.** The general
`content-queue.md` pool is now **empty** (rows 1–15 all `claimed` except row 9),
and the DataForSEO vetting pass promised on the tourism candidates (rows 16–21,
flagged as needed "before the next run or two" back on 2026-08-21) never
happened. No `content-queue.md` commit since 2026-08-23 — over two weeks with the
queue-driven pipeline effectively stalled. (The two posts published since,
`ai-search-visibility-study` and the 2026-08-30 GEO-citation pair, are one-off
strategic pieces outside the queue — not queue-driven output, so they mask the
stall rather than resolve it.) This is exactly the recurring human-dependency
Dan's Buy Back framework flags: a routine that depends on a manual DataForSEO
pass in an interactive session, with no fallback and no escalation when it
doesn't happen, silently stalls the ≤5%-human pipeline instead of surfacing the
blocker.

**Fixed on this branch:** `content-queue.md`'s poster rules now require the run
report to explicitly flag when any row has been skipped 3+ times or the general
pool has 2 or fewer rows left — so the gap surfaces where a human or the weekly
queue-keeper will actually see it, instead of accumulating silently in skip-notes
nobody re-reads.

---

## Target C — Site page: `/pricing`

**File:** `app/pricing/page.tsx`
**Lens:** Conversion (Wes McDowell)

**Verdict: 7/10.** Genuinely strong salesperson copy — real prices (no "contact
us" anchoring games), clear self-selection lines ("who this is for"), and an FAQ
that pre-empts real objections, including an anti-upsell entry ("who should not
buy the top tier"). Loses points on a dead CTA at the closing moment, zero
in-body links despite an already-adopted skill rule requiring them, and no
trust/proof signal anywhere — the one page where proof matters most.

**Fixes, highest leverage first:**

1. **(Wes — dead CTA)** `CtaDrop`'s secondary button is hardcoded to
   `href="/pricing"`. On the pricing page itself this is a dead click at the
   highest-intent moment of the scroll, and it dilutes the one dominant "Book a
   call" CTA into two competing choices. Add an override prop to `CtaDrop`
   (`secondaryHref`/`secondaryLabel`) and point `/pricing`'s instance at
   `/case-studies` instead — this also doubles as the trust-signal fix below.
2. **(Wes / Koray — internal links)** `afrishieldai-seo/SKILL.md` already
   requires Solutions, Pricing, and How it Works to cross-link each other
   contextually in body copy, but `/pricing` has zero in-body `href`s — every
   link lives inside `Button`/`CtaDrop` boilerplate. Link the tier-grid
   disclaimer line to `/solutions`, and the "not yet published consistently for
   three months" FAQ answer to `/how-it-works` or `/case-studies`.
3. **(Wes — trust/proof)** No client logos, testimonial, or case-study reference
   anywhere on the page, despite a real case study existing at `/case-studies`
   (NJ's Accounting & Tax Services). Add a one-line proof strip between the tier
   grid and the FAQ.
4. **(Wes — message/experience mismatch)** All four CTAs say "Book a call" but
   route to `/contact`, a passive form promising a reply "within a working day" —
   not a calendar. Either rename the CTA to match the real experience, or (bigger,
   cross-page lift) wire an actual booking-calendar widget behind it, consistent
   with the board's own 2026-08-05 doctrine update that bottom-funnel traffic
   should never land on a passive contact form.
5. **(Wes, minor polish)** `PageHero` renders no CTA of its own; low-priority — a
   text-link CTA in the hero for visitors who already know their tier.

No skill edit needed here — the in-body cross-link and CTA-placement rules were
already added to `afrishieldai-seo/SKILL.md` on 2026-08-04; `/pricing` simply
predates enforcement and needs its content retrofitted, which is doer work, not a
doctrine gap.

---

## Agreement / disagreement

| Point | King/Koray (GEO) | Wes (Conversion) | Dan (Business) | Verdict |
|---|---|---|---|---|
| Retire queued row 9 rather than narrow it | Yes — cannibalization risk is real and confirmed | n/a | Yes — a narrowed stub is another cycle spent on a low-leverage decision | **Agree.** Retire. |
| Queue/pipeline stall (empty pool, no vetting pass) | n/a | n/a | Flags it as the run's biggest structural risk | **No counter-view** — resolved by adding the escalation rule to `content-queue.md`. |
| Outbound links to named competitors on Target A | **For** — required for corroboration/E-E-A-T; a comparison nobody can verify isn't trusted by retrieval or readers | Not reviewed on this target, but conversion instinct generally avoids sending traffic to named competitors | Business case for the post (get cited, look credible) depends on the same links | **Disagreement, surfaced and resolved by priority.** Correctness/durability (King, Koray) outranks the tactical instinct to withhold competitor links: an "objective comparison" that can't be independently checked forfeits the retrieval/trust benefit that is the entire reason to publish it, and the referral-traffic cost to three small, named local competitors is marginal next to that. Resolution: add the links (fix A.1), unchanged. |
| Pricing CTA → `/contact` (passive form) vs. its "Book a call" label | n/a | Flags the mismatch as a real conversion leak | Aligns with buy-back logic — a booking widget removes a manual back-and-forth step | **Agree**, on priority: relabel now (cheap), wire a real booking widget later (bigger lift, cross-page). |

No other disagreements surfaced this run — the two content-lens reviews (A, B)
and the one conversion-lens review (C) landed on non-overlapping, individually
high-confidence findings.

---

## Execution to-do (ordered, for the doer agent — highest leverage first)

**Target C — `/pricing` (quick, high-leverage, single/few-file):**
1. Add `secondaryHref`/`secondaryLabel` props to `components/home/CtaDrop.tsx`
   and point `/pricing`'s call site at `/case-studies` instead of the current
   self-referential `/pricing` link. *(Wes — kills a dead CTA at the highest-intent
   moment and adds a proof signal in one edit.)*
2. Add the two in-body contextual links `afrishieldai-seo/SKILL.md` already
   requires: tier-grid disclaimer → `/solutions`; "three months" FAQ answer →
   `/how-it-works` or `/case-studies`. *(Wes / Koray.)*
3. Add a one-line proof strip linking to `/case-studies` between the tier grid
   and the FAQ. *(Wes.)*
4. Relabel the CTA away from "Book a call" to match the real `/contact` form
   experience (or scope wiring an actual booking-calendar widget as a follow-up
   task). *(Wes.)*

**Target B — queue (unblocks the stalled pipeline):**
5. Mark row 9 (`what is local seo`) in `content-queue.md` as retired, with a note
   pointing at `local-seo-for-small-business` as the canonical answer; confirm
   that post covers "what is local SEO" as a secondary entity/FAQ variant. *(Koray
   + Dan.)*
6. Run the overdue DataForSEO vetting pass on tourism candidate rows 16–21 (or
   source fresh general-cluster keywords) to refill the now-empty queue before
   the next scheduled poster run reports "queue empty." *(Dan — highest business
   leverage this cycle; the whole auto-poster pipeline depends on it.)*

**Target A — `top-geo-ai-seo-agencies-africa-2026` (content fix, more effort):**
7. Add `url`/`sameAs` + one outbound link per named competitor, in the JSON-LD and
   the body. *(King.)*
8. Add an explicit criteria × provider scoring grid so the ranking is falsifiable,
   not asserted. *(King/Koray.)*
9. Add one contextual link into `/geo-services` from the post. *(Koray.)*
10. Add a direct FAQ entry on "why trust a self-published ranking," pointing at
    the new competitor links. *(Koray.)*
11. Tighten the `matrix`/`profiles` H2 openers to lead with the takeaway; add one
    concrete checkable detail per competitor profile. *(King/Koray, minor.)*

**Already done on this branch (board, "learn in the repo"):**
- `ai-seo/afrishieldai-seo/skills/afrishield-blog/SKILL.md` — added a core-page
  internal-link requirement and a competitor-corroboration requirement for
  comparison/"top X" posts.
- `ai-seo/marketing-site/content-queue.md` — added an escalation rule: the
  poster's run report must now explicitly flag a row skipped 3+ times or a
  general pool at 2 or fewer rows, instead of letting skip-notes accumulate
  silently.
