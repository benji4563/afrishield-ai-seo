# AgentFlow — extraction spec

Extracted 2026-07-24 from `https://agentflow.framer.ai/` via browser MCP
(`getComputedStyle`, DOM walk). Values below are measured, not estimated.

> Note: `agentflow.framer.website` serves a *different* template ("Orbit").
> The live AgentFlow preview is `agentflow.framer.ai`.

## Global tokens (measured)

| Token | AgentFlow value | AfriShield replacement | Why |
|---|---|---|---|
| Dark surface | `#000000` | `#14140F` Neutral 900 | Brand's own dark stop; pure black isn't in our palette |
| Light surface | `#FAFAFA` | `#F4F3EE` Neutral 100 | Brand's light stop, per Application rule "Website: Neutral 100 background" |
| Accent | `#9FF690` | `#5CBE91` Green 300 | Closest bright stop in our scale; survives on Neutral 900 |
| Accent (muted/glow) | `rgba(159,246,144,0.05–0.2)` | `rgba(92,190,145,0.05–0.2)` | Same treatment, our hue |
| Body text on dark | `#FFFFFF`, `rgba(255,255,255,.6)` | identical | — |
| Display face | Schibsted Grotesk | **Sora** | Brand display face |
| Body face | Cabin / Inter | **Inter** | Brand body face |
| Mono face | Geist Mono | **JetBrains Mono** | Brand data face |

## Type scale (measured)

| Role | AgentFlow | This build |
|---|---|---|
| H1 | 56px / lh 61.6px (1.1) / weight 400 | Sora **700** @ clamp(38px, 6vw, 56px) / lh 1.06 |
| H2 | 52px / lh 57.2px (1.1) / weight 400 | Sora 700 @ clamp(30px, 4.6vw, 48px) / lh 1.08 |
| Body | 16px / lh 25.6px (1.6) | Inter 400 @ 16px / lh 1.65 |
| Eyebrow / button label | 12px, uppercase | JetBrains Mono 500 @ 12px, `letter-spacing .1em`, uppercase |

Weight deviation is deliberate: AgentFlow sets its display at weight 400, but
the brand guidelines specify Sora **700** for hero and H1. Brand wins.

## Layout system (measured)

- Container max-width **1264px**, outer padding `30px`, inner `40px`
- Section vertical padding **120px** (hero: `152px` top / `80px` bottom;
  final CTA: `140px`)
- Buttons: height **40px**, padding `9px 24px 7px`, **`border-radius: 0`**
- Header: `position: fixed`, `top: 0`, `z-index: 10`, height **68px**,
  transparent background at scroll 0

## Section topology (measured scroll offsets, 1264px viewport)

| # | Section | Offset | Height | Surface |
|---|---|---|---|---|
| 1 | Hero | 0 | 1022 | dark |
| 2 | Trust strip | ~942 | — | dark |
| 3 | Challenge — 3 problem cards | 1131 | 967 | light |
| 4 | Solution — 3 tabbed panels | 2098 | 2122 | dark |
| 5 | Features / capabilities | 4220 | 1538 | light |
| 6 | Process — 01/02/03 | 5758 | 984 | light |
| 7 | Testimonials + stat counters | 6742 | 1272 | dark |
| 8 | Security — 3 cards | 8014 | 581 | light |
| 9 | Blog — 3 cards | 8594 | 1129 | light |
| 10 | FAQ accordion | 9724 | 838 | light |
| 11 | Final CTA | 10562 | 589 | dark |
| 12 | Footer | 11151 | 622 | dark |

The rhythm is the point: **dark → light → dark → light**, each block a full
1000px-ish beat. Reproduced 1:1 in `app/page.tsx`.

## Interaction models (observed, per clone-skill principle 6)

| Component | Model | Mechanism |
|---|---|---|
| Header | scroll-driven | transparent at 0 → solid + hairline border past ~40px |
| Solution tabs | **click-driven** | 3 buttons (h=56px), panel swaps with opacity/translate |
| Button labels | hover-driven | label duplicated in DOM (`get startedget started`) — one copy slides out, the duplicate slides in on `translateY` |
| Capability chips | time-driven | infinite marquee, two rows, opposing directions |
| Stat counters | scroll-driven | count up when the block enters the viewport |
| FAQ | click-driven | accordion, one open at a time |

The duplicated button text in the extracted DOM is the tell for the text-swap
hover — reproduced in `components/ui/Button.tsx` as two stacked spans.

## What was deliberately not cloned

Prose, imagery, iconography, colour, and typefaces. AgentFlow is a commercial
template by another designer; this build takes structure and pacing only.
Every string on afrishieldai.com is written for this site.
