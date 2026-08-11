# AfriShield Board of Advisors — review, 2026-08-11

Twice-weekly scheduled review. Targets: (a) most recently published blog post,
(b) next `queued` keyword in `content-queue.md` reviewed as an upcoming brief,
(c) one site page from the rotation (solutions → pricing → how-it-works →
about → contact). Rotation note: the 2026-07-31 and 2026-08-04 runs both
landed on `/solutions` (the second run mis-tracked rotation state — its
"first in rotation, no prior record found" premise was wrong, `/solutions`
had already been reviewed). This run honors the 2026-08-04 execution to-do's
explicit flag ("`/how-it-works` likely has the same no-reachable-CTA problem
… worth an early check next rotation") and targets **`/how-it-works`**
rather than strict list order, since the board's own prior note called it out
by name.

Lenses run: **GEO** (Mike King + Koray Tuğberk Gübür), **Conversion** (Wes
McDowell). **Business** (Dan Martell) is applied as the chairman synthesis
over a pattern that cuts across all three targets this cycle — see
"Standing finding" below — not because any one target was itself a pricing/
strategy decision.

---

## Standing finding, read this first (Business — Dan Martell)

Two board cycles in a row (2026-07-31, 2026-08-04) logged concrete, specific
fixes against `answer-engine-optimization` (three H2 openers, a missing
`howToJsonLd` block, one missing FAQ link) and against `/solutions` (schema,
CTA placement, cross-linking). **None of it has landed.** This cycle's
`/how-it-works` review found the *exact same* CTA and cross-link problems the
board already wrote a fix for a week ago — because the fix was written into
the skill file but never applied to the pages, and the shared `PageHero`
component was never given the CTA prop the skill note said it should get.

This is not a content-quality problem, it is a delegation problem: the board
produces an execution to-do every cycle, and nothing in the pipeline turns
that to-do into scheduled work. Per Dan's own doctrine, an agent (or a board)
that documents outcomes nobody executes is not buying back anyone's time —
it is generating a growing backlog that looks like progress in the report and
is invisible everywhere else. Fixed partially this cycle: both
`afrishieldai-seo/SKILL.md` and `afrishield-blog/SKILL.md` now say explicitly
that an unswept rule is an open item, not a closed one, and name the specific
pages/posts still owing a fix. That is a paper fix, not a systems fix — the
real fix is a step in the queue-keeper or blog pipeline that checks open
board findings before writing new content. Recommending this as next cycle's
business-lens target rather than doing it unilaterally here, since it is a
pipeline change, not a content fix.

---

## Target A — Blog post: `google-business-profile-optimization`

**File:** `app/blog/google-business-profile-optimization/page.tsx`
**Lens:** GEO (King + Koray).

**Verdict: 9/10 — the cleanest post on the site against every rule the board
has written so far.** Every one of the nine `<h2>` sections opens with a
direct, liftable claim (King) — including `what-fails`, the exact section
type that failed on the AEO post twice. `howToJsonLd` is wired for the
five-step monthly check (Koray/King's numbered-sequence rule). Four in-body
contextual links, inside the 2–4 range, to genuinely different sibling posts
(`how-to-get-my-business-on-google` for setup, `answer-engine-optimization`
for the AI-answer exception, `what-is-schema-markup`, `small-business-seo`).
Two `{/* Cluster sibling */}` placeholder comments correctly flag future
links instead of forcing them. The angle (optimization, as the ongoing job
*after* setup) is genuinely distinct from the setup-focused sibling post —
extends the topical map (cluster E) rather than restating it.

**Remaining gaps (minor):**
1. The `qa-messaging` H2 opener states context ("sits directly under the
   contact buttons…") before the actual claim — borderline liftable, weaker
   than the other eight.
2. No mention of AI-crawler access (GPTBot/ClaudeBot/PerplexityBot,
   `robots.txt`) — flagged as a sitewide entity gap on 2026-08-04 and still
   uncovered anywhere on the site. Not this post's job specifically, but
   worth a home for it (candidate: a future technical-SEO post, or an
   addition to `what-is-schema-markup`).

---

## Target B — Queued keyword: `how to rank on chatgpt` (row 5, cluster B)

**Source:** `content-queue.md`, next `queued` row, reviewed as an upcoming
brief (pre-task mode).
**Lens:** GEO (King + Koray).

**Verdict: 3/10 readiness — do not write as-is; row moved to `hold` in
`content-queue.md`.** At the 2026-08-04 review, this row was flagged as a
future cannibalization risk against one live post
(`answer-engine-optimization`). It is now queued to be written into a
cluster that holds **three** live posts covering materially the same
ground: the AEO explainer (already names ChatGPT/Claude/Perplexity as
entities), `how-to-get-hotel-cited-by-chatgpt` (ChatGPT-citation angle,
tourism-scoped), and `how-to-get-my-business-on-google` (AI answers as its
third pillar). A generic "how do I rank on ChatGPT" post would restate the
AEO post's own `how-answers-chosen`/`check-yours` sections — self-competing
for retrieval (King), not extending the map (Koray).

**Path to a real angle, if this row is picked up:** narrow hard to
ChatGPT-specific mechanics none of the three existing posts cover — Browse/
live-search grounding vs. training-cutoff answers, GPT Store/custom-GPT
discovery, or the persona/account-context variance Mike King's own wiki
logged 2026-08-05 (AI Mode answers vary by the asker's Gmail/Google-ecosystem
signals, not just by page content — unused anywhere on the site so far, and
a genuinely differentiated hook). Written this way it would link out to
`answer-engine-optimization` for the general framework instead of
re-deriving it. Otherwise, skip to the next un-cannibalized `queued` row
(`is seo worth it` or `local seo for small business` are both clean).

---

## Target C — Site page: `/how-it-works`

**File:** `app/how-it-works/page.tsx`
**Lenses:** GEO (King + Koray) and Conversion (Wes) — process/service page
per the routing table.

**GEO verdict: 6/10.** `howToJsonLd` (from the shared `PROCESS_STEPS`) and
`breadcrumbJsonLd` are present and correct. Two gaps:
1. **No `FAQPage` schema, and the page-type isn't even in the skill's schema
   table** — a plain oversight, fixed in this PR (table now lists
   `How it works → HowTo + FAQPage + BreadcrumbList`). The page already
   answers FAQ-shaped questions in prose ("what do I get and when," "does
   month one show results") that a 3–5 question FAQ block would make
   directly retrievable, the same fix `/solutions` got flagged for on
   2026-07-31.
2. **Zero in-body contextual links** — confirmed by `grep -n "href="
   app/how-it-works/page.tsx`, which returns nothing. The explicit
   cross-linking rule the board wrote into `afrishieldai-seo/SKILL.md` on
   2026-08-04 ("Solutions, Pricing, and How it Works must link each other
   contextually") is not applied here, or — checked while here — on
   `/solutions` or `/pricing` either. All three core pages still have zero
   contextual cross-links, one week after the rule was written.

**Conversion verdict: 5/10.** The honest-timeline section is a genuinely
strong execution of Wes's own "Scar Scale" doctrine (logged 2026-08-05) —
stating plainly that month one looks flat is exactly the Adversity-level
honesty his research ties to higher credibility than a polished
all-upside process page. That content should not change.

The conversion path, though, has the identical structural problem
`/solutions` had on 2026-07-31 and 2026-08-04: **zero clickable CTA between
the hero and the closing `CtaDrop`**, three sections and several mobile
screens down. This is not a page-authoring miss — `PageHero`, the shared
component both pages use, still takes no `ctaHref`/`ctaLabel` prop, exactly
as the 2026-08-04 review anticipated it should ("`PageHero` is a candidate
for an optional prop"). No trust signal or social-proof element anywhere on
the page either (same gap flagged for `/solutions`); `/case-studies` exists
sitewide and isn't linked from here.

**Systemic drift → addressed in this PR (skill level, not yet the pages
themselves):** `afrishieldai-seo/SKILL.md`'s cross-link and CTA rules now
explicitly say a rule is not closed until it's been applied to every existing
page it governs, and name `/solutions`, `/pricing`, `/how-it-works` as still
outstanding. The actual component/page fix (add the `PageHero` prop, wire
real cross-links) is content/build work for the doer, listed below.

---

## Agreement / disagreement

| Point | King/Koray (GEO) | Wes (Conversion) | Dan (Business) | Verdict |
|---|---|---|---|---|
| `google-business-profile-optimization` quality | 9/10, every rule applied | — | Proof the pipeline works *going forward* | **Agree** — no fixes needed, cite as the reference post. |
| `how to rank on chatgpt` cannibalization | Flags 3-post overlap, recommends hold or hard-narrow angle | — | An angle-less/cannibalizing row wastes automated writing hours | **Agree.** Row moved to `hold` with a scoped-angle path. |
| `/how-it-works` missing FAQPage | Wants it for AI-answer eligibility | Wants it for objection-handling (same content already exists in prose) | — | **Agree, no conflict** — one fix serves both, same as the `/solutions` finding on 2026-07-31. |
| `/how-it-works` no reachable CTA | — | Flags zero CTA before the closing block | Founder time is wasted re-flagging the same structural gap page by page instead of it being fixed once at the component level | **Agree.** Root-caused to `PageHero` lacking a CTA prop — fix the component, not each page. |
| Prior fixes not applied (AEO post, `/solutions`) | Both lenses' 2026-07-31/08-04 findings still open | Same | This *is* the finding — a system that documents but doesn't execute | **Agree, escalated.** See "Standing finding" above — the cycle's top-priority item. |

No disagreements requiring a priority override this run — every finding
either stood alone or reinforced a finding from another lens pointing at the
same root cause (mostly: rules written into the skill a week ago, applied to
zero existing pages).

---

## Execution to-do (for the doer agent — highest leverage first)

1. **[Doer — component fix, unblocks two pages at once]** Add
   `ctaHref`/`ctaLabel` (optional) to `PageHero`; wire it on `/solutions`,
   `/pricing`, `/how-it-works` so each has a real button within the first two
   sections after the hero, plus one mid-scroll checkpoint on `/how-it-works`
   (3+ sections before `CtaDrop`).
2. **[Doer]** Add real in-body contextual links on all three core pages —
   `/solutions` → `/pricing`, `/how-it-works`; `/pricing` → `/solutions`,
   `/how-it-works`; `/how-it-works` → `/solutions`, `/pricing`, and at least
   one blog post (e.g. the Honest Timeline's AI-answer mention could link
   `answer-engine-optimization`).
3. **[Doer]** Add a 3–5 question `FAQPage` block to `/how-it-works` (reuse
   `faqPageJsonLd`) — draw from the questions the page already answers in
   prose (deliverable timing, whether month one shows results, what a
   guarantee looks like).
4. **[Doer]** Apply the still-open `answer-engine-optimization` fixes from
   2026-07-31/2026-08-04: rewrite `what-changed`/`what-fails`/`what-works`
   H2 openers to lead with the claim; add `howToJsonLd` for the `check-yours`
   steps; link FAQ answer 5 to `/blog/what-seo-actually-costs`.
5. **[Doer, next post]** If `how to rank on chatgpt` is picked up, use the
   narrowed angle now logged in `content-queue.md` row 5 (ChatGPT-specific
   mechanics / persona variance) — otherwise take the next un-cannibalized
   `queued` row.
6. **[Process — recommended, not applied here]** Give the queue-keeper or
   blog/build pipeline a step that checks this report's (and prior reports')
   open execution items before starting new work, so board findings stop
   silently expiring. Candidate for next cycle's Business-lens target.
7. **[Applied in this PR]** `afrishieldai-seo/SKILL.md` — added
   `How it works` to the schema table; strengthened the cross-link and CTA
   rules with a named list of pages still owing the fix; added a standing
   "retrofit sweep" rule (a page-level rule isn't closed until every page it
   governs has been checked, not just the one that triggered it).
8. **[Applied in this PR]** `afrishield-blog/SKILL.md` — logged the standing
   gap that `answer-engine-optimization`'s two-cycle-old fixes are still
   unapplied, and pointed at `google-business-profile-optimization` as proof
   the rule works for newly-written posts.
9. **[Applied in this PR]** `content-queue.md` — row 5 moved to `hold` with
   the cannibalization note and narrowed-angle guidance.
