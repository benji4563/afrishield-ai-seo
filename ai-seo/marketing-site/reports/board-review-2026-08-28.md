# AfriShield Board of Advisors — review, 2026-08-28

Twice-weekly scheduled review. Targets chosen per the routine's rotation: the most
recently published blog post, the next `queued` keyword in `content-queue.md`
(reviewed as an upcoming brief, not a draft), and one site page rotated in after
`/solutions` (reviewed 2026-07-31 and 2026-08-04) — next in the rotation is
`/pricing`.

| # | Target | Why chosen |
|---|---|---|
| A | Blog post — `/blog/content-marketing-for-small-business` | Most recently published post (2026-08-23) |
| B | Queued keyword — row 9, `what is local seo` (cluster E) | Sitting `queued`, skipped by the auto-poster 6 consecutive runs (2026-08-18–2026-08-23) over an unresolved duplication flag |
| C | Site page — `/pricing` | Next in the site-page rotation after two prior reviews of `/solutions` |

---

## Target A — Blog post: `content-marketing-for-small-business`

**Lens: GEO (Mike King + Koray Tuğberk Gübür).** Per the routing table, a blog post
gets the GEO lens only.

**Score: 7/10.** The pipeline is working as designed at the sentence level — a real
BLUF, every H2 opens with a liftable, self-contained answer, FAQ/HowTo/Breadcrumb
JSON-LD all match visible content, and the topic is genuinely distinct from its
closest sibling (`small-business-seo`). It loses points on the topical-map side: the
post launched as an orphan node with zero inbound links from the rest of the site,
it shipped with no hero image (breaking the JSON-LD `image` field), and it misses an
obvious tie-in to the site's own answer-engine-optimization content.

**Fixes (ranked, highest leverage first):**

1. **Orphan node (Koray).** No other page links to this post. `how-to-get-more-website-traffic`
   (published one day earlier) already gestures at content as a traffic channel
   without naming it — add a real in-body link there (and ideally from
   `small-business-seo`) now that the target exists.
2. **Missed entity/link tie-in (King).** The post claims twice that content gets
   "quoted by an AI assistant" but never names ChatGPT/Claude/Perplexity or links to
   `/blog/answer-engine-optimization`, the post that actually explains that
   mechanism — a free, on-topic anchor left on the table.
3. **Missing hero image (King).** `post.image` is unset in `lib/posts.ts`, so
   `blogPostingJsonLd`'s `image` field is omitted and OG/Twitter fall back to the
   generic site image — a real Search Console loose end.
4. **No direct FAQ answer for "content marketing vs. social media marketing"** —
   the draft only touches it obliquely; a one-line FAQ entry closes a cheap
   query-fan-out gap.
5. **Benefits scattered, not a retrievable chunk (Koray)** — trust, compounding
   traffic, and lower cost-per-lead are each implied in different sections but
   never stated together as one quotable "why this matters" passage.
6. **Only one worked example.** A short beat naming 2–3 more business types
   (salon, mechanic, guesthouse) would broaden entity coverage.

**Systemic drift — confirmed, not speculative (see skill edits below):**

- **Hero images silently stopped shipping.** Every post published 2026-08-10
  through 2026-08-23 (10 in a row, this one included) is missing `image` in
  `lib/posts.ts`. Root cause: `afrishield-blog/SKILL.md` had two flatly
  contradictory instructions — step 3 said posts are "text-only, no per-post hero
  image field," while a later mandatory `### Hero image` section said the
  opposite. Recent runs were clearly following the stale line. **Fixed on this
  branch** (see below); backfilling the 10 affected posts' images is a standing
  to-do for the doer.
- **No mechanism to backfill inbound links.** The skill's internal-links rule only
  covered outbound links at write time and left an HTML comment "to back-fill on
  publish" with no step that ever swept back to honor it. **Fixed on this branch**
  — step 4 ("Register it") now includes a mandatory backfill pass.

---

## Target B — Queued keyword: `what is local seo` (row 9, cluster E)

**Lens: GEO (Mike King + Koray Tuğberk Gübür).** Reviewed as an upcoming brief, not
a draft — the question was whether this row should ever become a post.

**Verdict: retire — do not narrow, do not write.** `local-seo-for-small-business`
already retrieval-owns this exact query: its opening H2 (`id="what-local-seo-is"`,
"What local SEO actually is") and its first FAQ entry ("What is local SEO for a
small business?", wrapped in `faqPageJsonLd`) both answer it as a self-contained,
citable chunk, and the natural fan-out (how it differs from general SEO, does it
need a physical address, how it differs from GBP optimization) is already covered
in that post's body and FAQ. Every plausible narrowing angle was checked against
that post and found to already be covered — a glossary framing, a "local SEO vs.
GBP optimization" framing, and an audience-qualification framing all restate
material that already exists. A second page targeting this query would cannibalize
the first rather than extend the topical map — Koray's own doctrine already flags
cannibalization as a live ranking risk, not a solved problem.

**Applied on this branch:** row 9 marked `retired — duplicate of
/blog/local-seo-for-small-business` in `content-queue.md`, with a resolution note
closing out the 6-run skip thread.

**Systemic drift — the queue-keeper is a phantom routine.** It's referenced by name
three times across the repo (`content-queue.md`, `afrishield-blog/SKILL.md`,
`humor-writing/SKILL.md`) as the process responsible for auditing and resolving
exactly this kind of flagged duplicate, but no dedicated skill file defines its
behavior. The auto-poster did its job correctly every run (skip-and-flag per the
differentiation check); nothing downstream ever closed the loop, which is why the
identical note got appended six times instead of the row being resolved after the
first flag. **Fixed on this branch:** added an explicit auto-retire-after-2-skips
rule to `content-queue.md`'s rules section, so this stops depending on a
not-yet-written skill.

---

## Target C — Site page: `/pricing`

**Lenses: GEO (King + Koray) + Conversion (Wes McDowell) + Business (Dan Martell).**
Per the routing table a landing/service page gets GEO + Conversion; pricing pages
specifically are also called out under the Business lens (strategy/pricing/process),
and this page's tier structure is exactly that kind of decision.

### GEO — score 5.5/10

Strong BLUF and quotable FAQ answers meet King's retrieval bar, but the page is
missing structured data its own build SOP already mandates, and has zero in-body
links into the topical map — the same violation the board found on `/solutions`
three weeks ago.

1. **Missing Offer/PriceSpecification schema (King).** The page injects only
   `faqPageJsonLd` and `breadcrumbJsonLd`; the SOP's own schema table calls for
   `FAQPage (+ Offers with price/currency)` on pricing. `lib/structured-data.ts`
   already has a `professionalServiceJsonLd.hasOfferCatalog` block with the
   identical three tiers, wired into the homepage and `/solutions` but not
   `/pricing` — the fix is nearly free.
2. **Zero in-body links to any sibling page (Koray)** — a verbatim recurrence of
   the exact finding from the 2026-08-04 `/solutions` review. "Technical audit and
   fixes" should link to `/solutions`; "monthly report/call" should link to
   `/how-it-works`.
3. **Tier inclusions are prose-only, never modeled as discrete entities (King)** —
   the SOP already names this rule; it isn't applied here.
4. **Two obvious fan-out FAQ questions missing:** "what's the difference between
   the tiers" and "can I upgrade or downgrade later."
5. Minor: fold the `forWho` differentiator copy into the Offer `description` so it
   survives outside the visual card layout.

**Systemic drift — confirmed twice now.** The B.3 schema table and the
"cross-link the core money pages" rule in `afrishieldai-seo/SKILL.md` are prose
guidance with no build-time check, and have now been silently skipped on the two
highest-value money pages in a row (`/solutions` 2026-08-04, `/pricing` today).
**Fixed on this branch:** added an explicit "Step 5.5 — Money-page checklist" to
that skill, to be walked before every publish of Home/Solutions/Pricing/How it
Works, rather than relying on memory of prose rules.

### Conversion — score 7/10

Strong message-first copy and unusually honest objection handling (the FAQ is the
standout — the "who should NOT buy the top tier" self-disqualifying line is exactly
Wes's clarity-over-cleverness doctrine in practice), but a real bug and a missing
trust layer cost real conversions at the highest-intent moment.

1. **Circular closing CTA — a genuine bug, not a style note.** `CtaDrop`
   hardcodes its secondary button to `href="/pricing"` ("See pricing"). On the
   pricing page itself this renders a dead, self-referential click in the page's
   final CTA slot.
2. **Tier selection isn't carried into the CTA.** All three "Book a call" buttons
   point to the same generic `/contact` regardless of which tier the visitor just
   evaluated — friction at the moment of highest intent.
3. **No trust signal on the money page.** No client count, testimonial, or logo
   anywhere on `/pricing` — trust here is tone-only.
4. **`forWho` copy requires reading a full clause to self-qualify** — tighten to a
   scannable fragment for a distracted phone visitor.
5. Minor: no CTA cue above the fold; no price-to-output anchor near the entry tier.

**Systemic drift — flagged in the same skill edit as GEO's finding above** (the
`CtaDrop`-circularity note is now part of Step 5.5's checklist), plus a lighter note
that high-intent pages (pricing, contact) should carry at least one non-copy trust
signal.

### Business — verdict REFINE

Not a decoy structure — it's a linear, cost-plus ladder — and the top tier ($900,
the "most serious" buyers) sells the *most* human time of any tier: "direct line to
the person doing the work" and an open-ended quarterly strategy review, both
scaling roughly 1:1 with client count. That runs directly against the ≤5%-human
buy-back-your-time thesis the business is built on — success at selling Operation
would *degrade* founder leverage, not increase it.

1. **Cap the human-time SKUs.** Replace "direct line to the person doing the work"
   with a bounded touchpoint (e.g. one scheduled 30-min call/month, agent-handled
   async otherwise). This is the single highest-leverage fix — Operation cannot be
   sold in volume today without breaking the model.
2. **Fix the decoy math.** $150 → $400 → $900 is a flat ~2.5x/2.25x ladder, not
   the cheap-DIY / core / ~10x-anchor structure Dan's own recent doctrine
   describes. Either widen Operation toward a true anchor price (~$2,500–4,000+,
   framed as bespoke/SLA-backed) or explicitly keep its deliverables agent-heavy
   so a higher price doesn't imply more human hours.
3. **Add a prepay/annual option at every tier** (e.g. 10–15% off for annual
   prepay) — month-to-month-only is good for conversion trust but is a standing
   cash-flow and re-sell tax against founder time.
4. **Make cadence items read as agent-first, human-optional** in copy ("agent-
   prepared briefing, human call on request").
5. Keep the "Most chosen" badge on Engine — correctly aligned with core-tier-volume
   intent — but only once #1 and #2 are addressed, so growth into Engine doesn't
   create upsell pressure into a human-heavy tier that can't scale.

**Systemic drift.** "Direct line to the person doing the work" reads like a
specific-client promise, possibly inherited from the original NJ Accounting build
during the AfriShield/NJ template split (see `CLAUDE.md`'s scope rule) rather than a
deliberately agent-scalable product tier — worth confirming with the user before it
propagates to future client deployments. **Added on this branch:** a new
`knowledge-base/board/playbooks/tier-pricing-audit.md` checklist to run against any
future tier/pricing page, own or client.

---

## Agreement / disagreement

| Point | GEO (King/Koray) | Conversion (Wes) | Business (Dan) | Verdict |
|---|---|---|---|---|
| `/pricing` needs real fixes before its next publish | Yes — schema + links | Yes — CTA bug + trust | Yes — tier structure | **Agree.** All three lenses independently flagged real, non-overlapping gaps on the same page — no lens found it clean. |
| The "Most chosen" badge on Engine | Not addressed | Approves — a legible decoy-effect play | Approves, conditionally — keep it, but only after the underlying price ladder and human-time caps are fixed | **Agree, with sequencing.** Business's condition doesn't contradict Conversion's approval; it says *do the pricing-math fix first* so the badge sits on a structure that actually works. |
| Row 9 (`what is local seo`) | Retire — cannibalization risk outranks the SV~10 volume case | n/a (not this lens's target) | n/a | No disagreement — single-lens call, applied directly. |
| Sequencing: which `/pricing` fix ships first | Schema/link fix is mechanical and free; recommends it "nearly free" | CTA bug is a correctness bug, not a style note; recommends fixing first as it's currently live-broken | Pricing-structure change is the highest-*leverage* fix but is a business decision, not a mechanical one — should not auto-ship | **Resolved by priority, per the routine's own rule:** durability/correctness (GEO's schema gap, Wes's live CTA bug) outrank tactics and ship as code fixes for the doer; Business's tier-repricing is flagged prominently for Ben's decision rather than auto-implemented, since it changes what customers are charged. |

No disagreement was buried: every lens's finding appears above and in the
execution to-do below, including the one item (pricing-tier restructuring) this
review is deliberately *not* resolving on its own authority.

---

## Execution to-do (ordered, for the doer/builder agent — highest leverage first)

**On `/pricing` (site page, `app/pricing/page.tsx` + `components/home/CtaDrop.tsx`):**

1. Fix the circular closing CTA — give `CtaDrop` an overridable secondary
   href/label (or auto-suppress when it matches the current route), and set
   `/pricing`'s instance to something other than "See pricing → /pricing".
   *(Conversion — live bug, ship first.)*
2. Add `Offers`/`PriceSpecification` JSON-LD to `/pricing`, reusing the existing
   `professionalServiceJsonLd.hasOfferCatalog` data already wired into the
   homepage and `/solutions`. *(GEO — mechanical, free.)*
3. Add ≥2 in-body links from `/pricing` to `/solutions` and `/how-it-works` with
   descriptive anchors. *(GEO/Koray — closes the second recurrence of this
   finding.)*
4. Model each tier's `includes` list as discrete JSON-LD entities, not prose.
   *(GEO/King.)*
5. Carry the selected tier into the `/contact` link (query param or similar) so
   the contact page can acknowledge which tier the visitor evaluated.
   *(Conversion.)*
6. Add one non-copy trust signal (client count, testimonial, or logo) to the
   page. *(Conversion.)*
7. Add the two missing FAQ entries ("difference between tiers", "can I
   upgrade/downgrade"). *(GEO — fan-out.)*
8. **Escalate to Ben, do not auto-implement:** the tier-pricing restructuring
   (cap "direct line to the person doing the work" with a bounded touchpoint;
   widen the Operation/Foundation price ratio toward a true decoy anchor; add a
   prepay/annual option). Run `knowledge-base/board/playbooks/tier-pricing-audit.md`
   against any proposed new structure before it ships. *(Business — this changes
   what customers are charged; needs founder sign-off, not a builder decision.)*

**On the blog (`app/blog/content-marketing-for-small-business` + neighbors):**

9. Generate and wire a hero image for `content-marketing-for-small-business` (and
   note: 9 other posts published 2026-08-10–2026-08-22 need the same backfill —
   worth a dedicated pass rather than doing it piecemeal). *(GEO/King.)*
10. Add an in-body link to `content-marketing-for-small-business` from
    `how-to-get-more-website-traffic` (and ideally `small-business-seo`).
    *(GEO/Koray.)*
11. Add a named-entity link from `content-marketing-for-small-business` to
    `/blog/answer-engine-optimization` where the post already claims AI assistants
    quote the content. *(GEO/King.)*
12. Add the missing FAQ entry distinguishing content marketing from social media
    marketing. *(GEO — fan-out.)*

**Queue:** row 9 is retired — no action needed; the queue-keeper's next run should
simply pick the next `queued`/vetted row (the general pool needs a fresh
DataForSEO pass or the tourism-cluster candidates promoted — see the standing note
already in `content-queue.md`).

---

## Skill / doctrine edits made on this branch (Step 5 — learn in the repo)

- `ai-seo/afrishieldai-seo/skills/afrishield-blog/SKILL.md` — removed the
  contradictory "posts are text-only" line; added a mandatory link-backfill step
  to "4. Register it".
- `ai-seo/afrishieldai-seo/skills/afrishieldai-seo/SKILL.md` — added the
  `CtaDrop` circularity warning and a new "Step 5.5 — Money-page checklist" gate
  (schema, in-body links, entity schema, CTA circularity) ahead of every
  Home/Solutions/Pricing/How-it-Works publish.
- `ai-seo/marketing-site/content-queue.md` — retired row 9 with a resolution
  note; added an auto-retire-after-2-skips rule for the queue-keeper.
- `knowledge-base/board/playbooks/tier-pricing-audit.md` — new playbook
  distilling Dan Martell's tier-design doctrine into a repeatable checklist for
  any future pricing page, own or client.

## Summary (feeds the Saturday digest)

Reviewed 3 targets: blog post `content-marketing-for-small-business` (GEO, 7/10),
queued keyword `what is local seo` (GEO ruling: **retire**, ending a 6-run skip
loop), and site page `/pricing` (GEO 5.5/10, Conversion 7/10, Business: REFINE).
Top actions: fix `/pricing`'s circular closing CTA (live bug), add missing
Offer schema + in-body links to `/pricing` (2nd recurrence of a 2026-08-04
finding), and — flagged for Ben, not auto-shipped — cap the Operation tier's
unbounded human-time promise, which currently runs against the ≤5%-human model.
No disagreement between lenses on any target; Business's pricing-structure
condition on the "Most chosen" badge was sequencing, not conflict. Fixed 2
systemic doctrine bugs in-repo (contradictory hero-image instructions that broke
10 posts; a phantom queue-keeper routine) and added a money-page publish gate
and a tier-pricing-audit playbook. PR: see branch `board/review-2026-08-28`.
