# AfriShield Board of Advisors — review, 2026-08-21

Twice-weekly scheduled review. Targets: (a) most recently published blog post,
(b) the next `queued` keyword in `content-queue.md` (reviewed as a brief), (c)
one site page from the rotation (solutions, pricing, how-it-works, about,
contact). Solutions has now been reviewed twice (2026-07-31, 2026-08-04) with
no other page touched yet, so this run advances the rotation to **pricing**.

## Targets

| # | Target | Why chosen |
|---|---|---|
| A | `/blog/how-to-appear-on-google-maps` | Most recently published post (2026-08-21, commit `1bab3bf`) |
| B | `what is local seo` — content-queue row 9 | Next `queued` row; has now been skipped **four** consecutive auto-poster runs (2026-08-18 → 2026-08-21) as a duplicate, unresolved |
| C | `/pricing` | Next in the site-page rotation after solutions |

> **Merge-conflict addendum (2026-08-23, updated after a second conflict):**
> while this PR sat in draft, the blog auto-poster ran on master twice more —
> 2026-08-22 (row 9's fifth skip, row 14 `how to get more website traffic`
> taken) and 2026-08-23 (row 9's **sixth** skip, row 15 `content marketing for
> small business` taken) — each time hitting row 9 again before this review's
> retirement had landed, and each time producing a real conflict in
> `content-queue.md` against this branch's retirement note. Both resolved by
> merging master in and keeping every note in order. After the second run, the
> general `queued` pool is now empty (rows 1–15 are all `claimed` except row
> 9) — the cost of this PR sitting in draft went from wasted auto-poster runs
> to the poster having nothing left to publish until either row 9 resolves or
> the queue-keeper adds fresh rows. The underlying point stands and got
> considerably sharper: waiting on draft-PR review to close a confirmed-
> duplicate row costs real runs while it sits — six now, not four, and the
> pool is dry.

Lenses run: **GEO** (Mike King + Koray Tuğberk Gübür) on A and B, **Conversion**
(Wes McDowell) and **Business** (Dan Martell) on C, **Business** (Dan Martell)
also on B for the process failure underneath the duplication.

---

## A. `/blog/how-to-appear-on-google-maps` — GEO lens (King + Koray)

**Verdict: 6.5/10 — clean chunk discipline, but a real duplication the
auto-poster's own differentiation check missed.**

**What's good (King):** every H2 opens with the direct claim, not a warm-up —
"A business is invisible on Google Maps for one of four reasons…", "The
primary category is the single most influential field…", "Review count,
rating, and how recently reviews arrived are the strongest prominence
signal…". This is the liftable-opener discipline the 2026-08-04 review had to
push for; it now holds across all nine H2s in a fresh post, not just the ones
touched by that fix. All three JSON-LD blocks (`BlogPosting`, `FAQPage`,
`HowTo`) are present and the `HowTo` steps match the numbered list in the
"fix, step by step" section — exactly the free retrieval surface the skill
asks for. Three contextual internal links land inside the 2–4 range.

**What's wrong (Koray — cannibalization):** the H2 "The three factors Google
Maps actually uses" restates `/blog/google-business-profile-optimization`'s
H2 "The three factors that decide local ranking" almost sentence-for-sentence
— same three bullets (relevance / distance / prominence), same claim that
distance "cannot be gamed" / "is the one lever nobody gets to touch", same
closing line that everything else is an attempt to move relevance or
prominence. Compare:

> Maps post: *"Google has stated plainly that Maps ranks local results on
> relevance, distance, and prominence… A business cannot out-write its way
> past geography… Most of the practical advice in local SEO… is an attempt
> to move prominence or relevance, since distance is fixed…"*
>
> GBP post: *"Google ranks a profile in the local pack on three factors —
> relevance, distance, and prominence… Distance is fixed by the searcher's
> location and cannot be gamed… Almost everything covered below is an
> attempt to move relevance or prominence, because distance is the one
> lever nobody gets to touch."*

This is exactly the failure mode Koray's wiki update (2026-08-05) warns
about: cannibalization has not stopped mattering just because two posts have
different card titles. Two live pages now carry the same passage for the
same underlying claim ("Google's three local-ranking factors"), which splits
whatever authority either page would build on that sub-topic and gives an
answer engine two near-duplicate passages to choose between instead of one
strong one.

**Why the auto-poster missed it:** the differentiation-angle check in
`afrishield-blog/SKILL.md` (added 2026-08-04, the row-9 skip notes cite it
too) only compares the new post's angle against sibling posts' `cardTitle`/
`description` — a whole-post, topic-level check. It has no step for
section-level overlap between posts that *are* legitimately differentiated
at the page level (post-setup GBP maintenance vs. Maps ranking factors) but
still happen to need the same evergreen mini-topic (the three ranking
factors) explained along the way. This is a skill gap, not a one-off
drafting mistake — see the systemic fix below.

**Fix (not blocking — the post is live and otherwise sound):** rewrite the
"three factors" section in one of the two posts to stop re-deriving the
factors and instead state them in one or two sentences and link out to
whichever post is the canonical home for the explainer (`/blog/google
-business-profile-optimization` is the natural owner — it is the earlier,
broader post). Do not retract or unpublish the Maps post over this; it is a
content-edit fix on the next pass, not a structural failure.

---

## B. Content-queue row 9 (`what is local seo`) — GEO/Koray + Business/Dan

**Verdict: retire the row. Board resolves it directly rather than leaving it
for a fifth skip.**

Row 9 has been checked and skipped four times running (2026-08-18, -19, -20,
-21), each run reconfirming the same finding: `/blog/local-seo-for-small
-business` already has an H2 "What local SEO actually is" and an FAQ entry
"What is local SEO for a small business?" that directly answer this exact
query. Re-reading that post confirms the skip notes are correct — the
definitional ground is fully covered, in a post that itself ranks the
identical DataForSEO volume band (SV~10, SA/en) as row 9's own keyword.

**Koray (semantic):** at SV~10 for both terms in the same market, a second,
narrower "glossary" page (the option the 2026-08-18 skip note floated) is not
worth the cannibalization risk — it would compete with, not complement, the
existing post for the same query, splitting a thin volume pool further
rather than compounding topical authority. Retiring the row and keeping the
one comprehensive post as the canonical answer is the topical-authority-
correct move.

**Dan (business/process — the real finding here):** the content is a
symptom; the process failure is the actual problem. The auto-poster has
correctly identified the same duplication four times and has no authority to
act on its own finding — each run just re-writes the same skip note and
waits on "the queue-keeper," which has not touched row 9 across three of its
own runs since the first flag. That is four wasted check-cycles on a
decision that was clear after the first one. Per the DRIP framing: this is a
**Replacement**-tier decision (a rule, not a person, should close it), not
something that should sit in a human/queue-keeper inbox indefinitely. Left
as-is, the same pattern will recur on the next duplicate keyword and cost
another four runs before anyone acts.

**Action taken this review:** row 9 is marked `retired` in `content-queue.md`
on this branch (see diff), with a note pointing to this report. The skill fix
below prevents the next occurrence from taking four runs to resolve.

---

## C. `/pricing` — Conversion lens (Wes) + Business lens (Dan)

**Verdict: 7.5/10 conversion, sound business logic, one clear gap.**

**Wes — what's working:** above-the-fold clarity is strong — the hero states
the offer, the cadence, and the no-lock-in promise before any tier is shown,
and the BLUF block restates all three prices in plain text (a nice
cross-lens win: the same block that helps a scanning visitor also gives an
answer engine a liftable pricing chunk, King's territory, for free). Each
tier has exactly one CTA ("Book a call"), no competing actions. The
excludes-shown-with-strikethrough treatment and the FAQ's blunt answers
("Why is this cheaper than the agency quotes we have had?", "Who should not
buy the top tier?") are exactly the honest-against-interest, objection-
handling content Wes's Scar-Scale update calls out as what actually converts
— this page already does the thing most competitors' pricing pages avoid.

**Wes — the gap:** there is no social proof anywhere on the page. Three
price points and an honest FAQ ask a visitor to trust the claims on copy
alone, with no testimonial, logo, result, or link to `/case-studies` (which
exists on the site but is never referenced here) at the exact moment the
visitor is deciding whether the price is justified. This is the single
highest-leverage fix on this page: one proof point — a result, a quote, or a
"see how this worked for X" link into case studies — placed between the
tier cards and the FAQ, where the objection-handling scroll currently jumps
straight from price to "why is this cheaper."

**Dan — pricing structure:** the $150 / $400 / $900 spread (~6x top to
bottom) doesn't match the decoy-tier pattern from his 2026-08-05 update (a
cheap DIY entry point, a core volume tier, and a ~10x white-glove tier that
makes the core tier look cheap by comparison) — there's no true low-friction
entry tier below Foundation. This is a strategic question the board flags
for consideration, not a directive: we don't have close-rate data to know
whether a cheaper DIY/audit-only tier would pull in more top-of-funnel leads
to nurture toward Foundation, or just discount the entry point without
adding volume. Worth a deliberate pricing experiment, not a reflexive
change.

**Dan — everything else checks out:** the tier deliverables map cleanly onto
his AGENT framework already cited in the FAQ almost verbatim ("agents do the
repetitive volume… a human still sets strategy and edits every published
word") — the page is honest about what's actually being sold, which is the
leverage story AfriShield is built on.

---

## Agreement / disagreement

| Point | GEO (King/Koray) | Conversion (Wes) | Business (Dan) | Verdict |
|---|---|---|---|---|
| Maps post ranking-factors section duplicates the GBP post | Flag — real cannibalization | — | — | Acted: content-edit fix queued, not blocking |
| Row 9 (`what is local seo`) | Retire — cannibalizes existing post at same volume | — | Retire — four wasted check-cycles, a process failure | **Agree** — retired this review |
| Pricing page needs a fix | — | Add social proof (top priority) | Consider decoy-tier restructure (lower priority, needs data) | No disagreement — different fixes, not competing ones; Wes's fix is higher-leverage and ships now, Dan's is a flagged experiment for later |
| Differentiation-angle check in `afrishield-blog` skill | Insufficient — page-level only, misses section-level overlap | — | — | Acted: skill edit on this branch |

No genuine disagreement surfaced this run — the three findings above are
complementary, not conflicting. Flagging that plainly rather than manufacturing
tension: this run's board was in agreement across every target.

---

## Execution to-do (for the doer agent, highest-leverage first)

1. **[Business/Dan, process fix — done this PR]** `content-queue.md` row 9
   marked `retired`; no further auto-poster runs should check it.
2. **[GEO/Koray, skill fix — done this PR]** `afrishield-blog/SKILL.md`'s
   differentiation-angle check extended to cover recurring section-level
   sub-topics (e.g. "the three Google local-ranking factors"), not just
   whole-post `cardTitle`/`description` overlap, so the next Maps-post-style
   duplication is caught before publish.
3. **[Conversion/Wes, content edit]** Add one social-proof element to
   `/pricing` between the tier grid and the FAQ — a result, quote, or a link
   into `/case-studies` — the single highest-leverage open item from this
   review.
4. **[GEO/Koray, content edit]** Rewrite the "three factors" section in
   `/blog/how-to-appear-on-google-maps` to state the factors briefly and link
   to `/blog/google-business-profile-optimization` as the canonical
   explainer, instead of re-deriving it. Not blocking; next content pass.
5. **[Business/Dan, flagged for consideration — no action taken]** Evaluate
   whether a cheap DIY/audit-only entry tier below Foundation would grow the
   pipeline, per the decoy-tier pattern. Needs close-rate data before acting;
   raised here, not decided here.

---

## Summary (for the Saturday digest)

Targets: `/blog/how-to-appear-on-google-maps` (GEO), content-queue row 9
`what is local seo` (GEO+Business), `/pricing` (Conversion+Business). Scores:
Maps post 6.5/10 — clean liftable-chunk discipline but a real section-level
duplication with the GBP-optimization post that the auto-poster's own
differentiation check couldn't catch; pricing 7.5/10 — strong honest-FAQ
conversion path, missing social proof at the price-decision moment. Row 9
retired outright: four consecutive skipped auto-poster runs on the same
confirmed duplicate is a process failure, not a content one, and the board
closed it directly rather than waiting on a fifth run. No lens disagreement
this round — GEO, Conversion, and Business converged on complementary fixes.
Two systemic fixes shipped on this branch: `content-queue.md` row 9 retired,
and the `afrishield-blog` differentiation check extended to section-level
overlap. PR: opened from `board/review-2026-08-21`, link below.
