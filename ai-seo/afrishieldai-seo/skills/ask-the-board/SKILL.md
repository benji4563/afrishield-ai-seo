---
name: ask-the-board
description: >
  Run the AfriShield Board of Advisors over a task or question. Routes the target to
  the relevant advisor lenses (GEO/semantic = Mike King + Koray; conversion = Wes
  McDowell; business/strategy = Dan Martell; off-page/AI-news = Julian Goldie;
  automation/local = Jono Catliff), collects each lens's review, flags where they
  AGREE and DISAGREE, synthesises a single execution to-do list for the doer agent,
  and writes a short summary. Use it on demand ("ask the board about X", "board-review
  this page/post/plan") and as the automatic pre/post gate around every blog post,
  website build, SEO/GEO/technical/on-page/storytelling task. Argument is a target
  file/URL or a question.
argument-hint: "<file, task, or question for the board>"
user-invocable: true
---

# ask-the-board — the board review orchestrator

The board are **advisory lenses**, not builders (see `knowledge-base/board/README.md`).
This skill runs them over a target and turns their advice into an execution plan.
Consult the in-repo doctrine first; only go to the web if it is thin; reconcile before
acting.

## 1. Classify the target → pick the lenses

| Target / task | Lenses to run |
|---|---|
| Blog post, on-page SEO, GEO, technical analysis | **GEO** (`board-geo-reviewer` — King + Koray) |
| Landing / service / city page, full website build | **GEO** + **Conversion** (`board-conversion-reviewer` — Wes) |
| Storytelling / voice / editorial | **GEO** (Koray semantic) + the `voice-and-humor` spec (+ Brand lens when it exists) |
| Strategy, new skill/routine, pricing, process | **Business** (`board-business-reviewer` — Dan) |
| Off-page / links / "newest AI-SEO tactic" question | consult `knowledge-base/board/wiki/julian-goldie.md`, reconcile vs. King + Koray |
| Automation / local-SEO execution | consult `knowledge-base/board/wiki/jono-catliff.md` |
| A general question (no artifact) | route by topic to the wikis above; answer from doctrine, web only if thin |

Always run **at least two lenses** where the target touches more than one area, so
agreement/disagreement is meaningful.

## 2. Run each chosen lens

For an artifact review, dispatch each lens as its subagent (Task / Agent tool) with the
target path. For a plain question, read the relevant wiki(s) and answer in that lens's
voice. Each lens returns a score/verdict + concrete fixes + any systemic drift.

## 3. Flag agreement and disagreement

Build a short table:

| Point | King/Koray (GEO) | Wes (Conversion) | Dan (Business) | Verdict |
|---|---|---|---|---|
| … | … | … | … | agree / disagree → how resolved |

- **Agreements** = high-confidence: do them.
- **Disagreements** = surface them explicitly and resolve by priority: correctness/
  durability (King, Koray) outrank tactics (Julian); conversion (Wes) and business
  leverage (Dan) break ties on *what to do first*. Never bury a disagreement.

## 4. Synthesise the execution to-do

Produce one ordered checklist of concrete actions **for the doer/execution agent** —
each action attributable to a lens, highest-leverage first, and each independently
shippable and build-verifiable. This is the hand-off; the doer does not re-derive it.

## 5. Learn in the repo

If a fix would recur on every task of this type, open a **PR** against the relevant
skill (as the GEO reviewer did for `afrishield-blog`). If a lens surfaces a durable new
principle, open a PR updating that advisor's wiki. Knowledge grows in git.

## 6. Summarise

End with a 5–8 line summary: target, lenses run, the score/verdict, the top 3 actions,
any disagreement and how it resolved, and any PR opened. This summary is what feeds the
weekly Saturday board digest.

## Modes
- **On-demand:** `ask-the-board <file|question>` — run steps 1–6 and report.
- **Pre-task (before a build/post):** run the relevant lens over the *brief/plan* and
  return the execution to-do the doer should follow.
- **Post-task (before publish):** run the relevant lens over the *draft*; block publish
  on any RED finding; apply fixes; then ship.
- **Scheduled:** the twice-weekly board routine runs this over the week's artifacts;
  the Saturday digest rolls up the summaries.
