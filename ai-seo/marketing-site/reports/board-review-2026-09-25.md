# AfriShield Board of Advisors — review, 2026-09-25

Twice-weekly scheduled review. Targets chosen per the routine prompt: (a) the most
recently published/edited blog post, (b) the next `queued` keyword in
`content-queue.md` (reviewed as an upcoming brief), (c) one site page from the
rotation (solutions, pricing, how-it-works, about, contact).

- **Target A:** `/blog/enterprise-geo-launch-africa` — published 2026-08-30, same
  commit as `top-geo-ai-seo-agencies-africa-2026`. The sibling was reviewed on
  2026-09-22; this run covers the other half of that pair, which had not yet been
  board-reviewed.
- **Target B:** `content-queue.md` row 32, `how much does seo cost in nigeria` — the
  first `queued` row in the "Active queue — African commercial intent" table (row 9,
  the previous target, was retired by the board on 2026-09-22).
- **Target C:** `/how-it-works` — rotation is solutions → pricing → how-it-works →
  about → contact. Pricing was reviewed 2026-09-22; how-it-works is next and has no
  prior board-review record, though the 2026-09-22 report explicitly predicted it
  would repeat the same defect pattern.

Lenses run: **GEO** (Mike King + Koray Tuğberk Gübür) on all three targets per the
routing table (blog post = GEO only; queued-keyword brief = GEO only; site page = GEO
**and** Conversion). **Conversion** (Wes McDowell) on Target C. **Business** (Dan
Martell) on the recurring pattern behind Target C — a rule that already exists in the
skill but is not being run against already-published pages is a systems/leverage
question, not just a content one.

---

## Target A — Blog post: `enterprise-geo-launch-africa`

**File:** `app/blog/enterprise-geo-launch-africa/page.tsx`

### GEO (King + Koray) — 6.5/10

Strong King-style retrieval mechanics: a proper BLUF `ShortAnswer`, self-contained
H2 chunks, an honest FAQ, and a "fast facts" entity table. Topical fit against the
sibling pillar guide is good — press/announcement framing vs. analyst comparison,
already cross-linked correctly, no restructuring needed there. But the post ships
genuine entity-consistency defects, exactly the failure mode its own copy warns
against ("Inconsistent facts are the most common reason a model quotes a competitor
instead"):

1. **Duplicate, conflicting `Organization` entity.** `app/layout.tsx` already injects
   the canonical `organizationJsonLd` (has `legalName`/`areaServed`/`telephone`, no
   `founder`) on every page. This post additionally hand-rolls a second
   `organizationEntityJsonLd` at the *same* `@id` (`${SITE_URL}/#organization`) with
   different `areaServed`/`address` and no `legalName`/`telephone`. Two conflicting
   Organization nodes on one page.
2. **Unverifiable founder identity link.** The inline `founder: { name: 'Benjamin
   Njock' }` has no `@id`, so despite a code comment claiming it "matches the
   canonical founderJsonLd," nothing machine-readable ties them together.
3. **Unsubstantiated geographic claim.** Copy asserts "Central, East, and West
   Africa" coverage three times, but only Douala (Central) and Nairobi (East) are
   named hubs — no West African entity or example backs the claim, and the post's own
   `address` array (Cameroon, Kenya) doesn't match the site-wide `areaServed`
   (Nigeria, Ghana, Kenya, South Africa — no Cameroon).
4. **Cross-post FAQ duplication.** The "how quickly does this show results" FAQ
   answer is near-verbatim duplicated in this post and in
   `top-geo-ai-seo-agencies-africa-2026`'s live `FAQPage` schema — two schema blocks
   competing for the same AI citation.

**Systemic:** confirmed real drift in the B.8 GEO-syndication SOP — it lets a post
redeclare an inline Organization node instead of extending the canonical one, and has
no cross-post overlap check for companion pairs. **Fixed at skill level this run** —
see `afrishieldai-seo` SKILL.md B.8, items 6–7 (added 2026-09-25).

---

## Target B — Queued keyword: `how much does seo cost in nigeria` (row 32, cluster N)

**File:** `ai-seo/marketing-site/content-queue.md`

### GEO (King + Koray) — ready to write, with a narrower angle

Verdict: **sound and geo-pivot compliant on paper, but only if the doer actively
narrows the angle.** As stated, it risks restating the existing `what-seo-actually-
costs` post (generic global price ranges) with a Nigeria label bolted on.
`is-seo-worth-it` is ROI/decision-anxiety framed — low overlap, safe to link out to.

Cross-link satisfiability **confirmed**: `lib/cities.ts` lists Lagos and Abuja as
valid `/ai-seo/<city>` slugs. NGN pricing anchor **confirmed**: `app/pricing/page.tsx`
states USD 150/400/900 tiers and its own FAQ already says "invoiced in NGN at the
prevailing rate" — the doer should cite that framing rather than inventing a
hard-coded NGN figure that drifts with FX.

Guidance for the doer:
1. Do **not** reuse `what-seo-actually-costs`'s H2 skeleton (definition → ranges →
   time-to-earn). Make this the Nigeria decision-layer: local price bands from the
   `serp-verified` local-agency set already named in `content-queue.md` (Lagos: TAGET
   Media, Nive Digital, Crank Digital), why Lagos/Abuja pricing differs from smaller
   Nigerian markets, and AfriShield's own tiers as the comparison anchor.
2. BLUF must open by naming Nigeria explicitly with a real NGN-denominated range, not
   "SEO costs vary."
3. Link up to `/blog/what-seo-actually-costs` and `/blog/is-seo-worth-it` (outer
   layer) and down to `/ai-seo/lagos` / `/ai-seo/abuja` (core commercial pages) — the
   core/outer topical-map shape Koray's doctrine calls for.
4. Real Lagos/Abuja business-type examples, per the pivot rule.

**Systemic finding — fixed at skill level this run.** The 2026-09-24 geographic-pivot
rules (must name market in BLUF, local-currency framing, city-page link, local
examples) lived only as prose in `content-queue.md` — a grep of `afrishield-blog`
SKILL.md for "geographic|pivot|NGN" returned zero hits, unlike the differentiation-
angle check, which is mirrored in both places. Added a "Geographic-pivot compliance"
step to `afrishield-blog` SKILL.md (2026-09-25) so the poster's own skill enforces it
rather than depending on a human noticing the queue-file banner.

---

## Target C — Site page: `/how-it-works`

**File:** `app/how-it-works/page.tsx`

### GEO (King + Koray) — 3.5/10, worse than `/pricing`'s 5/10 on 2026-09-22

Confirmed: no `faqPageJsonLd` at all (only `howToJsonLd` + `breadcrumbJsonLd`), zero
in-body `<a>` links (only the closing `CtaDrop`'s two buttons), one CTA reachable
only after four full sections. Worse than `/pricing`: with no FAQ chunk, the page has
zero AI-answer-eligible passages beyond four terse process-step sentences, which
answer "what happens" but not the actual questions a buyer asks an assistant ("how
long until I see results," "what do I get in month one," "how much does this cost").

Top fixes: add a real FAQ (sourced straight from the page's own `DELIVERABLES` and
`HONEST_TIMELINE` data — it's already written, just not in Q&A form) with
`faqPageJsonLd`; add in-body links at the natural anchors already in the copy (Week 2
"clustered by intent" → `/solutions`; Week 1 "read your three closest competitors" →
`/case-studies`; "internal links begin doing real work" → `/geo-services`); move a CTA
up per B.3's own "reachable before fold-six" rule.

**Critically: this is not new drift.** The fix already exists in the skill — B.3's
cross-link rule and the B.7 money-page gate (added 2026-09-22) both name
`/how-it-works` by name. It was simply never run against the already-published page.
One genuine skill-doc gap did surface: the B.3 schema-coverage table had rows for
every other core page but no row for "How it Works" despite the cross-link rule
calling it a core money page. **Fixed this run** — added `How it Works → HowTo +
FAQPage + BreadcrumbList` to the table.

### Conversion (Wes McDowell) — 5/10

Confirms the same structural gap independently: `PageHero` → `Process` → Deliverables
→ Honest Timeline → one `CtaDrop`, with no CTA reachable for 3+ screens. The
candid "Month 1: almost nothing moves... this is the month people quit" line is
strong Adversity/Reframe-level content per Wes's doctrine — the kind of honesty that
builds trust — **but as written it plants doubt with no proof point nearby to resolve
it.** That's the single highest-leverage fix on the page: one sentence + a
`/case-studies` link right next to the Honest Timeline section. Also flags `PageHero`
has no CTA prop at all — confirmed by reading the component.

**Systemic — a 3-for-3 pattern now, not three separate notes.** `/solutions`
(2026-08-04, no reachable CTA), `/pricing` (2026-09-22, zero cross-links + no trust
signal), `/how-it-works` (2026-09-25, both). B.3/B.7 already name the fix
(`PageHero`/`Section` proof + CTA slots); the gap is that nothing runs the check
proactively.

### Agreement / disagreement

| Point | GEO (King/Koray) | Conversion (Wes) | Verdict |
|---|---|---|---|
| Zero in-body cross-links | Kills retrieval — no anchor for `/solutions`/`/geo-services` | Kills credibility — no path to `/case-studies` proof | **Agree** — one set of links (Process step 1 → `/case-studies`, Week 2 → `/solutions`, Timeline → `/geo-services`) serves both lenses at once. |
| CTA reachable before fold-six | B.3's own rule, unmet | Wants an early/secondary CTA after `Process` | **Agree**, same fix, same location. |
| Missing FAQ | Top GEO fix — zero AI-answer-eligible passages | Not flagged | **Single-lens** — GEO-only, act on it. |
| "Month 1... people quit" needs a proof counterweight | Not flagged | Top Conversion fix — doubt planted with no resolution nearby | **Single-lens** — Conversion-only, but high-leverage; sequence right after the FAQ fix since it's a live conversion risk, not just a retrieval gap. |
| Root cause: this is skill drift needing a new rule | No — the rule already exists (B.3/B.7, named this page explicitly) | No — same conclusion independently | **Both lenses agree there is no new rule to write.** The real defect is process: a written gate that never runs against already-shipped pages. Escalated to Business below. |

No real disagreement on priority order between the two lenses this run — both point at
the same two structural fixes (links, CTA) and add one lens-specific fix each (FAQ;
proof counterweight). Sequenced by King/Koray's durability-first tie-break where it
applies, Wes's conversion-risk urgency where it's the more time-sensitive fix (the
Honest Timeline doubt is live on a production page right now).

### Business (Dan Martell) — on the recurring pattern, not the page itself

The finding under the finding: this is the third page in a row where a rule already
written into the skill (B.3 cross-links, B.7 money-page gate) did not get applied
until a human board review caught it manually. That is a buy-back failure in
miniature — the system is documented but not self-enforcing, so founder/reviewer time
is spent rediscovering the same defect instead of a mechanical check catching it
before publish. The fix is not a fourth page-level note; it's making B.7 actually run
(as part of the build-verification step, or as a fixed step in every board rotation
review) rather than living as a checklist a person has to remember to execute. Logged
as an execution item below rather than a further skill-doc edit, since the rule text
itself is already correct — it just needs to actually run.

---

## Skill edits made on this branch

1. **`afrishieldai-seo/skills/afrishield-blog/SKILL.md`** — added a "Geographic-pivot
   compliance (board, 2026-09-25)" step mirroring the differentiation-angle check, so
   the 2026-09-24 pivot rule is enforced from the poster's own skill, not only from
   prose in `content-queue.md`.
2. **`afrishieldai-seo/skills/afrishieldai-seo/SKILL.md`** —
   - B.3 schema-coverage table: added the missing "How it Works → HowTo + FAQPage +
     BreadcrumbList" row.
   - B.8 SOP: added item 6 (reuse the canonical `organizationJsonLd`, never redeclare
     an `Organization` node at the same `@id`; give `founderJsonLd` a stable `@id`)
     and item 7 (diff companion-post `FAQ` arrays for overlap before publishing),
     both sourced from Target A's findings above.

---

## Execution to-do (for the doer/builder agent) — highest leverage first

1. **[Business]** Run the B.7 money-page gate (already written, 2026-09-22) against
   `/solutions`, `/pricing`, and `/how-it-works` now, and fix whichever still fail —
   `/how-it-works` does. This closes three outstanding findings at once instead of
   three more page-by-page notes, and is the actual root-cause fix, not the content
   changes below.
2. **[GEO]** `/how-it-works`: add a real FAQ (from the existing `DELIVERABLES` /
   `HONEST_TIMELINE` data, reframed as Q&A: "How long until I see results?", "What do
   I get in the first 30 days?", "Do I approve the keyword map first?", "How much does
   this cost?") with `faqPageJsonLd`.
3. **[Conversion]** `/how-it-works`: add one sentence + a `/case-studies` link
   immediately after "Month 1: almost nothing moves... this is the month people
   quit" — the honesty is a strength per Wes's doctrine, but only with a proof point
   next to it.
4. **[GEO + Conversion]** `/how-it-works`: add in-body links at the anchors already
   present in the copy — Week 1 "read your three closest competitors" → `/case-
   studies`; Week 2 "clustered by intent" → `/solutions`; "internal links begin doing
   real work" → `/geo-services`.
5. **[Conversion]** `/how-it-works`: add an early/secondary CTA immediately after the
   `Process` section (e.g. "See what this costs" → `/pricing`), so a CTA is reachable
   before the Deliverables/Timeline scroll, not only at the very bottom.
6. **[GEO]** `enterprise-geo-launch-africa`: replace the hand-rolled
   `organizationEntityJsonLd` with the canonical `organizationJsonLd` (imported from
   `lib/structured-data.ts`), layering `founder`/`knowsAbout` on top; give
   `founderJsonLd` a stable `@id` and reference it by `@id` here.
7. **[GEO]** `enterprise-geo-launch-africa`: either back the "Central, East, and West
   Africa" claim with a real West African example/hub, or narrow the copy to "Central
   and East Africa" (what the post can actually substantiate) until a West African
   hub exists.
8. **[GEO]** Differentiate the near-duplicate "how quickly does this show results" FAQ
   answer between `enterprise-geo-launch-africa` and
   `top-geo-ai-seo-agencies-africa-2026`, or keep it on one post and link to it from
   the other.
9. **[GEO]** When row 32 (`how much does seo cost in nigeria`) is written: follow the
   narrowed angle above (Nigeria decision-layer, not a re-derived cost breakdown),
   name Nigeria in the BLUF, cite AfriShield's own USD-tiers-invoiced-in-NGN framing,
   and link to `/ai-seo/lagos` / `/ai-seo/abuja` plus the two outer-layer cost/ROI
   posts.

---

## Summary

**Targets:** blog post `enterprise-geo-launch-africa` (6.5/10, GEO), queued keyword
row 32 "how much does seo cost in nigeria" (ready to write with a narrowed angle),
site page `/how-it-works` (3.5/10 GEO, 5/10 Conversion). **Top actions:** run the
already-written B.7 money-page gate against `/how-it-works` (and re-verify
`/solutions`/`/pricing`), add a FAQ + proof-point counterweight + in-body links to
`/how-it-works`, and fix the duplicate/conflicting Organization schema on the blog
post. **Disagreement:** none real this run — GEO and Conversion independently
converged on the same root cause for `/how-it-works` (a written rule never run
against a shipped page), which the board escalated to a Business-lens finding rather
than a fourth skill-doc patch. **Skill edits:** `afrishield-blog` SKILL.md
(geographic-pivot compliance) and `afrishieldai-seo` SKILL.md (B.3 table row; B.8
canonical-entity + FAQ-overlap rules) — both opened on this branch. **PR:** see
branch `board/review-2026-09-25`.
