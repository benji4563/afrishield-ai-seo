# AfriShield Board of Advisors — review, 2026-08-25

Twice-weekly scheduled review. Targets: (a) most recently published blog post,
(b) the next `queued` row in `content-queue.md`, (c) one site page — this run
`/how-it-works`, per the prior board's explicit note (2026-08-04 report, item
8) to check it early rather than wait for its scheduled rotation turn, since
`/solutions` (reviewed twice already) and `/how-it-works` share the same
`PageHero` pattern and the same suspected CTA gap.

Lenses run: **GEO** (Mike King + Koray Tuğberk Gübür), **Conversion** (Wes
McDowell), **Business** (Dan Martell) applied to the cross-target pattern.

---

## Target A — Blog post: `content-marketing-for-small-business`

**File:** `app/blog/content-marketing-for-small-business/page.tsx`
**Lens:** GEO (King + Koray).

**Verdict: 8.5/10 — the first fully clean post against the skill's own
checklist in several review cycles.**

- **Liftable H2 openers:** all 9 `<h2>` sections pass the self-audit — every
  one states its answer in the first sentence (`what-it-is`, `vs-advertising`,
  `what-to-write`, `how-much`, `compare`, `distribution`, `what-fails`,
  `measuring`, `start`). No soft openers, no metaphor lead-ins. This is the
  rule the 2026-07-31 and 2026-08-04 reviews had to repeatedly flag on other
  posts — it held here without a board pass.
- **HowTo schema:** `START_STEPS` is a genuine numbered sequence and
  `howToJsonLd` is wired up correctly. Rule complied.
- **Contextual links:** 4 in-body links to sibling posts (`how-to-do-keyword-
  research`, `seo-vs-google-ads`, `google-business-profile-optimization`,
  `how-long-does-seo-take`) — inside the 2–4 range, descriptive anchors.
- **Differentiation:** cluster F (content strategy) had no prior post; this
  stands as its first, confirmed clean against the rest of `lib/posts.ts`.
- **FAQ:** 6 entries, real question phrasing, correct length.

**Concrete fixes (minor):**
1. The post uses generic "AI assistant" three times but never names ChatGPT,
   Claude, or Perplexity — sibling posts (e.g. `local-seo-for-small-business`)
   name the engines explicitly for entity resolution (King). Add one specific
   mention, e.g. in `measuring` or the `Scene`.
2. Topical-map note for future cluster-F rows: this post now owns "what to
   write, in what order," "how much content," "distribution," and "measuring
   results" — a future cluster-F post must pick a genuinely different slice
   (e.g. a niche-specific content calendar) or it will restate this one.

No systemic drift — this is a validation that the exhaustive liftable-opener
rule (added 2026-08-04 after two prior misses) is working, not a new finding.

---

## Target B — Queued keyword: `what is local seo` (row 9, cluster E)

**Source:** `content-queue.md`, the only `queued` row remaining; reviewed as
a decision, not a fresh brief — the row has been skipped **six** consecutive
auto-poster runs (2026-08-18 through 2026-08-23), every time for the identical
reason, with an explicit standing request in the file: *"Queue-keeper: row 9
needs a decision."* No board review has answered it until now.

**Lens:** GEO (King + Koray) on the content question; Business (Dan) on the
process cost.

**Verdict: RETIRE.** Confirmed by reading `local-seo-for-small-business`
directly: its `ShortAnswer` and its first H2 (`what-local-seo-is`, titled
"What local SEO actually is") already give a complete, liftable definition of
local SEO, and the post goes on to cover ranking factors, NAP, citations,
reviews, and local content — a full topical-map treatment of the term, not a
partial one. A new page whose entire job is to define the same term would not
extend the topical map (Koray) — it would split retrieval signal between two
pages answering the same query (King), which is a worse outcome for AI-answer
eligibility than one authoritative page, not a neutral one.

**Business note (Dan):** six identical skip cycles is six wasted automation
passes re-deriving a conclusion that was correct the first time — a small but
real leverage leak. A `queued` row that cannot clear its own duplication check
after this many passes should not stay in the machine's way; it should be
resolved by a human/board decision once, not re-litigated indefinitely.

**Action taken in this PR:** row 9 marked `retired` in `content-queue.md`
with the rationale above, removed from the active pool the auto-poster reads.
If a bare glossary-style answer to "what is local SEO" is wanted later, the
right shape is an anchor/snippet on the existing post, not a new page.

---

## Target C — Site page: `/how-it-works`

**File:** `app/how-it-works/page.tsx`
**Lenses:** GEO (King + Koray) and Conversion (Wes) — both required per the
routing table for a core service/build page.

**GEO verdict: 6/10.** Good bones: `howToJsonLd(PROCESS_STEPS)` is correctly
used for a genuine 4-step sequence (the code comment even justifies why
numbered markers are used only here), and the `HONEST_TIMELINE` rows are
excellent liftable chunks — each "reality" cell states its claim in the first
words ("Almost nothing moves.", "Compounding starts.") with no scene-setting.
Two gaps: **no `FAQPage` schema or FAQ block at all**, despite the page
implicitly answering exactly the questions an owner or an AI assistant would
ask ("what happens week 1," "do you guarantee rankings," "how long until it
works" — the honest-timeline section is already 80% of an FAQ in list form);
and **zero in-body links to `/solutions` or `/pricing`**, a direct repeat of
the cross-link violation the 2026-08-04 review found on `/solutions` and
which the skill now explicitly names How-it-Works as one of the three money
pages that must cross-link.

**Conversion verdict: 4/10 — worse than `/solutions`'s original finding.**
`PageHero` renders no CTA. After it, three full sections run — the Process
grid, the Deliverables grid, and the Honest Timeline — before the single
`CtaDrop` at the very bottom of the page. A visitor convinced by the Process
section (genuinely strong, honest copy) has nothing clickable for several
mobile screens. This is the exact "fold-six problem" the CTA-reachability
rule was written to prevent on 2026-08-04, on the page that review predicted
would have it. No trust/proof element either — `/case-studies` exists and is
in nav but isn't referenced from this page's argument.

**Concrete fixes for the doer:** add an FAQ block (3–5 Qs pulled straight
from the Honest Timeline's implicit questions) wired to `faqPageJsonLd`; add
a CTA reachable within two sections of the hero plus a mid-scroll checkpoint
after Process or Deliverables; add in-body links (the "keyword map" mention →
`/solutions`, a pricing/timeline mention → `/pricing`); add one line
referencing `/case-studies` as proof.

---

## Agreement / disagreement

| Point | King/Koray (GEO) | Wes (Conversion) | Dan (Business) | Verdict |
|---|---|---|---|---|
| Blog post: liftable-opener rule | Confirms full compliance, first time in 3 review cycles | — | Evidence the exhaustive-audit rule (added 08-04) is working as a system, not a one-off fix | **Agree.** No action needed — noted as validation. |
| `what is local seo`: retire vs. narrow | Retire — the term is already fully, better covered elsewhere; a second page splits retrieval signal | — | Six skipped runs is a leverage leak; decide once, stop re-litigating | **Agree.** Retired in this PR. |
| `/how-it-works`: no FAQ, no cross-links | Flags both as the same skill-spec gap already named for `/solutions` | — | — | **Agree with itself** — same root cause, second confirmed instance. |
| `/how-it-works`: no reachable CTA | — | Flags it as worse than `/solutions` (3 sections before any CTA, vs. `/solutions`'s 3 pillars) | The skill already proposed a structural fix (`PageHero` `ctaHref`/`ctaLabel` prop) on 08-04 and it still hasn't landed on the component or on either page it was flagged for | **Agree — and escalated.** See below. |

**Disagreement:** none this cycle. The one tension worth surfacing is not
between lenses but between the board and the doer pipeline: the 2026-08-04
review already proposed the structural fix (a `PageHero` CTA prop) and rated
it correctly as the highest-leverage change, but three weeks and one full
rotation later, neither `/solutions` (the page that motivated it) nor
`/how-it-works` (the page predicted to share it) has been fixed, and the
component itself still has no CTA prop. Per the routing table's priority
rule, King/Koray's durability findings and Wes's conversion findings both
point at the same unresolved fix — nothing to arbitrate between lenses, but
the board is flagging that documentation alone did not produce execution.
Escalated in this PR's skill edit (see below) and called out explicitly in
the execution to-do as the top item.

---

## Execution to-do (for the doer agent — highest leverage first)

1. **[Business/Dan — structural, do first]** Add an optional `ctaHref` /
   `ctaLabel` prop to `components/ui/PageHero.tsx` and wire it on every page
   that uses `PageHero` (10 pages currently: solutions, how-it-works,
   pricing, case-studies, geo-services, blog index, the 3 tourism-niche
   pages, the AI-visibility-checklist resource page). One component change
   fixes the CTA-reachability gap everywhere at once instead of the two
   failed page-by-page attempts so far.
2. **[GEO + Conversion]** `/how-it-works`: add a 3–5 question FAQ block
   (source: the Honest Timeline's implicit questions) wired to
   `faqPageJsonLd`; add in-body links to `/solutions` and `/pricing`; add a
   mid-scroll CTA checkpoint after the Process section (in addition to item 1
   once the prop exists); add a one-line reference to `/case-studies`.
3. **[Carried over, still open]** `/solutions`: the 2026-08-04 to-do (FAQ
   block, per-pillar entity schema, hero/mid-page CTA, cross-links to
   `/pricing` and `/how-it-works`, `/case-studies` reference) has not been
   applied — re-flagging since it is now the second page needing the same
   fix set.
4. **[GEO, cosmetic]** `content-marketing-for-small-business`: name a
   specific AI engine (ChatGPT/Claude/Perplexity) at least once instead of
   only "AI assistant," for entity-resolution parity with sibling posts.
5. **[Applied]** `content-queue.md` — row 9 (`what is local seo`) marked
   `retired` with rationale; no longer blocks the auto-poster's queue scan.
6. **[Applied]** `afrishieldai-seo/SKILL.md` — escalated the `PageHero` CTA
   rule from "candidate for a prop" to a named, prioritized structural fix,
   citing both confirmed instances.

Items 2–4 are content/build edits for the doer agent, not applied in this PR
(the board advises, it does not build). Items 5–6 are applied directly.
