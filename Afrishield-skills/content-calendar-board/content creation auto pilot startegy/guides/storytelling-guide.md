# Storytelling Guide

Storytelling is a core system, not a writing style. Its job is to make the lesson memorable. **Truthfulness beats storytelling quality, every time.**

## The absolute rule

**Never invent a story and present it as real.** No invented clients, results, revenue, conversations, reactions, experiments, failures, screenshots, business situations, statistics or testimonials.

- ✅ "Imagine a lodge owner in Arusha who pays 18% on every OTA booking…" (clearly hypothetical)
- ❌ "Last week a lodge owner called me…" — unless the story bank holds that event with evidence.

## Evidence ladder (`real_story.kind`)

Use the highest rung that is actually available. Record which one you used.

| Kind | Requirement | Example |
|---|---|---|
| `REAL_STORY` | Story-bank entry with evidence + permission | "Our first five TikToks all stalled at ~120 views. Here's what the one that didn't did differently." |
| `DOCUMENTED_CASE` | Public, citable case about a real business (accurate, non-negative) | The White House Douala video |
| `EXPERIMENT` | A test the founder performs **on camera**; the recording shows the real result, whatever it is | "I asked ChatGPT for the best safari operators in Arusha." |
| `OBSERVATION` | Something we noticed in our own data or research, stated as observation | "44 of the 45 West African businesses we researched had no website." |
| `ANALOGY` | A comparison that teaches, clearly not an event | "Social media is rented land." |
| `HYPOTHETICAL_LABELED` | Opens with *Imagine / Say / Picture / Let's say* and stays hypothetical | "Say a guest calls at 11pm…" |
| `NONE` | Pure explanation — allowed but must still pass the anti-AI-garbage test | |

## The eight questions (ask before writing)

1. What actually happened? 2. Who was involved? 3. What was the expectation? 4. What went wrong or right? 5. What was surprising? 6. What was discovered? 7. What changed? 8. What can the audience learn?

If you cannot answer 1 from evidence, you do not have a real story — go down the ladder.

## Story-first sequence

REAL EVENT → TENSION → DISCOVERY → EXPLANATION → LESSON. The lesson is the point; the story is the delivery vehicle.

Instead of: "Here are five GEO strategies." Prefer: "I checked how AI described this business, and one thing immediately stood out." Then teach.

## Structures (pick one per item — do not force one shape on everything)

| Structure | Use when | Must contain |
|---|---|---|
| HOOK → STORY → LESSON → CTA | A real event carries the lesson | Evidence for the event |
| HOOK → PROBLEM → DISCOVERY → SOLUTION | A diagnosis / audit | The receipt by ~8s |
| HOOK → CONTRARIAN CLAIM → PROOF → EXPLANATION | Myths, hot takes | Proof that justifies the contrarian claim |
| HOOK → EXPERIMENT → RESULT → LESSON | On-camera tests | The unedited result — including "it didn't work" |
| HOOK → HUMOR → PROBLEM → INSIGHT | Awareness content on familiar pain | One joke, then the real problem |
| HOOK → CASE STUDY → BREAKDOWN → TAKEAWAY | Documented cases, Report Day | Permission + numbers from the source |
| HOOK → NEWS → WHAT CHANGED → WHY IT MATTERS | Real AI/search news | Source + date on screen |
| HOOK → DEMONSTRATION → EXPLANATION → RESULT | Tutorials, builds | The real screen |

Consistency comes from the voice and Signal Style — not identical scripts.

## Combining story + humor + insight (the AfriShield signature)

```
HOOK      "I thought the problem was traffic."
CONTEXT   "So I checked the website and…"           ← must be true
HUMOR     "Google knew the business existed. AI needed an introduction."  ← comedic framing
DISCOVERY "The problem wasn't traffic. It was…"
LESSON    "That's why AI visibility needs…"
CTA       "Comment AI if you want to see…"
```

## Reusing stories

One real story can feed many posts, **from different angles** (the lesson, the mistake, the data, the tool, the customer's view). Record each use with `node engine/cli.mjs story:use <story_id> <content_id> --angle "..."` — the engine refuses the same angle twice.

## Permission & sensitivity

- `OWN_WORK` — our own builds, tests, failures: free to use.
- `PUBLIC_RECORD` — public businesses/events: accurate and fair portrayal only; never mock.
- `GRANTED` — written OK from the person/business, noted in the entry.
- `PENDING` / `NOT_GRANTED` — cannot be named or quantified. `ANONYMIZE_ONLY` — describe without identifying details (sector + region at most).
- Sensitivity HIGH (fraud victims, health, money losses of named people) → no humor, anonymize, founder review.

## The existing calendar's flagged rows

The 2026-09-14 gap analysis flagged calendar rows that narrate events with no evidence (e.g. "A hotel owner showed me his analytics"). For each, before scripting, choose one and record it:
1. **Link** a real story from the story bank that matches (change details to match reality, not the other way round).
2. **Perform** it: turn it into an on-camera EXPERIMENT.
3. **Re-frame** as `HYPOTHETICAL_LABELED` ("Imagine a hotel owner looking at his analytics…").
4. **Replace** with an OBSERVATION from our real data.

Then `node engine/cli.mjs resolve-flag <id> STORY_EVIDENCE_NEEDED --note "<what you did>"`.

## FIND STORY OPPORTUNITIES — where real stories come from

Build-in-public is the main source. Whenever the founder builds, tests, fails, fixes, discovers, launches, audits, automates, experiments or measures, that is a candidate. `node engine/cli.mjs story:scan` lists recently changed work files; open them, confirm what happened, and add evidenced entries with `story:add`. The autopilot's own reports (gap analyses, learning reports) are legitimate stories too.
