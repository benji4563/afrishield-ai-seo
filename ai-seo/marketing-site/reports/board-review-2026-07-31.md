# AfriShield Board of Advisors — review 2026-07-31

Twice-weekly scheduled review. First run since the board was wired up
(2026-07-29), so this is also the first pass through the site-page rotation.

## Targets

| # | Target | Why chosen |
|---|---|---|
| A | `/blog/answer-engine-optimization` | Most recently published/edited blog post (published 2026-07-29; GEO fix applied same day in `e195e80`) |
| B | `small business seo` — content-queue row #1 | Next `queued` keyword; reviewed as an upcoming brief before the auto-poster writes it |
| C | `/solutions` | Site-page rotation start (solutions → pricing → how-it-works → about → contact) |

---

## A. `/blog/answer-engine-optimization` — GEO lens (Mike King + Koray Tuğberk Gübür)

**Verdict: 8/10 — solid, two liftable-opener violations survived the last fix.**

The 2026-07-29 GEO fix rewrote two paragraphs to be liftable but did not sweep
every `<h2>` in the post, so the rule it added to the skill (liftable H2
openers) is not yet fully applied to the post that motivated it.

- **Violation — "What actually changed."** Opens with historical scene-setting
  ("For twenty years the deal was stable…") instead of the claim itself
  ("ranking is now the entry fee, not the prize"), which only appears three
  paragraphs later. An answer engine retrieving this section gets the
  preamble, not the answer.
- **Soft opener — "What does not work."** Opens with a metaphor ("the old
  ones wearing new clothes") before any specific failure mode. Lead with the
  first failure mode instead.
- **Borderline — "How to check if you are being quoted."** Answers indirectly
  ("you do not need a tool") before the concrete method. Acceptable but not
  as sharp as the post's best sections.
- **Koray (semantic/topical):** stays inside source context (AI SEO/AEO), no
  scope drift. Entities are named explicitly and correctly (ChatGPT, Claude,
  Perplexity, Google AI Overview). Two contextual cluster links are present
  (`ai-seo-vs-traditional-seo`, `what-ai-seo-actually-does`) — meets the
  2–4 minimum in the skill but at the low end; a third link into `/solutions`
  would tie the post back into the pillar/service content and strengthen the
  topical map between blog and site pages.

**Fixes (concrete):**
1. Rewrite the "What actually changed" opener to lead with the claim.
2. Rewrite the "What does not work" opener to lead with a failure mode.
3. Add one contextual link to `/solutions` (natural spot: "What actually
   moves the needle").

---

## B. `small business seo` (content-queue #1) — GEO lens, brief review

**Verdict: proceed, but only with a differentiated angle.**

SV~40, LOW competition, commercial — correctly the highest-priority row in
the queue. The risk is not the keyword, it's the angle: cluster **G —
SMB/differentiation** already has two live pages on near-identical territory
(`ai seo services` → `/`, `ai seo solutions` → `/solutions`). A post titled
around "small business seo" that just re-explains what AfriShield does would
duplicate/cannibalize those pages rather than extend the topical map (Koray).

Query fan-out this keyword actually implies (King) — cost, DIY-vs-agency,
timeline, "is it worth it at small-business scale" — is decision-stage
content neither `/` nor `/solutions` covers. That's the angle to write.

**Fix for the brief:** angle the post as the decision-stage companion to `/`
and `/solutions`, not a restatement — `ShortAnswer` should answer "is SEO
worth it / how does SEO work for a small business" concretely — and link
contextually into `/solutions` and `/pricing`.

*(Dan/Business, brief note: correct keyword to prioritize — highest volume,
lowest competition, clearly commercial of the fifteen queued rows. No
objection to keeping it at the top of the queue.)*

---

## C. `/solutions` — GEO + Conversion lenses (rotation start)

**GEO (King): good bones, one gap.** Each pillar already opens with a direct,
liftable claim ("Most keyword exports are mostly junk…", "A post is not
finished when the words are done…", "One page a month…") — this page was
apparently written to the same discipline as the blog posts, even though the
liftable-opener rule is nominally blog-only. The gap: **no FAQPage schema or
FAQ block**, despite the page covering exactly the questions an AI assistant
would field about the service ("what's included in reporting," "how often do
you publish," "do you guarantee rankings"). The blog posts already have the
`faqPageJsonLd` helper wired up; this page doesn't use it and is missing an
easy AI-answer-eligibility win.

**Conversion (Wes): 7/10.** Above-the-fold clarity is fine (eyebrow, H1,
one-sentence blurb). Two gaps against the homepage-blueprint checklist:
- **Single CTA, positioned at the very bottom** — after three pillar sections
  and a technical checklist. A visitor sold by pillar two has nothing to act
  on until the end of a long scroll.
- **No trust signal in the page body** — the page asserts capability
  (research rigor, editing, reporting discipline) but offers nothing that
  isn't self-reported. `/case-studies` exists and is in global nav, but
  isn't referenced from inside this page's argument.

**Fixes (concrete):**
1. Add a short FAQ block (3–5 Qs) with `faqPageJsonLd`, reusing the existing
   helper — dual-purpose: closes the GEO gap and pre-answers Wes's objection-
   handling requirement.
2. Add a lighter secondary CTA/contact link after pillar two or three.
3. Add one credibility line or in-body link to `/case-studies`.

---

## Agreement / disagreement

| Point | GEO (King/Koray) | Conversion (Wes) | Business (Dan) | Verdict |
|---|---|---|---|---|
| AEO post opener fixes | 2 rewrites + 1 link needed | n/a | n/a | single-lens — act |
| "small business seo" angle | Must differentiate from `/` and `/solutions` or risks cannibalization | n/a | Right keyword, keep priority | **agree** — write it, with GEO's differentiated angle |
| `/solutions` FAQ block | Wants it for AI-answer eligibility | Wants it for objection-handling | n/a | **agree, no conflict** — one fix serves both lenses |
| `/solutions` CTA cadence | n/a | Wants a mid-page CTA | n/a | Wes-only — act |

No disagreements this cycle — GEO and Conversion reinforced each other on
`/solutions` rather than pulling in different directions.

---

## Execution to-do (ordered, for the doer agent)

1. **[GEO]** `/blog/answer-engine-optimization`: rewrite the "What actually
   changed" H2 opener to lead with the claim, not the history.
2. **[GEO]** Same post: rewrite the "What does not work" H2 opener to lead
   with a specific failure mode.
3. **[GEO]** Same post: add a third contextual link into `/solutions`.
4. **[GEO + Conversion]** `/solutions`: add a 3–5 question FAQ block wired to
   `faqPageJsonLd`.
5. **[Conversion]** `/solutions`: add a secondary CTA after pillar two or
   three.
6. **[Conversion]** `/solutions`: add a credibility line or in-body link to
   `/case-studies`.
7. **[GEO, for the auto-poster]** When writing `small business seo`: angle as
   the decision-stage companion to `/` and `/solutions` (cost / DIY-vs-agency
   / timeline fan-out), not a redefinition; link contextually into
   `/solutions` and `/pricing`.
8. **[Systemic — skill edit, applied on this branch]** `afrishield-blog`
   SKILL.md gets an explicit liftable-opener self-audit step, since the rule
   existed but wasn't swept across every `<h2>` in the post that motivated it.

Items 1–7 are content/build edits for the doer agent. Item 8 is applied in
this PR directly (see skill diff).
