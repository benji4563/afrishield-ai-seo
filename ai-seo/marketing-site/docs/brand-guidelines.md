# Brand guidelines — afrishieldai.com (site-level)

Derived from `00 Knowledge/brand-assets/AfriShield_Brand_Guidelines.html` v1.0.
This document records how the company system is applied to *this* site and
where it deviates.

## Palette

Company scale, used verbatim — no invented hex values.

| Token | Hex | Use on this site |
|---|---|---|
| `green.50` | `#EAF7F1` | Light-surface tint blocks |
| `green.100` | `#C7EBDA` | Hover fills on light |
| `green.200` | `#93D8B7` | Accent text/eyebrows on dark |
| `green.300` | `#5CBE91` | **Primary CTA fill on dark**, accent rules, node glow |
| `green.400` | `#34A374` | Chart/meter fills |
| `green.500` | `#1D8A5C` | Hover state for green.600 |
| `green.600` | `#0F7248` | **Primary CTA fill on light**, links, logo |
| `green.700` | `#0A5936` | Body text on green.50 |
| `green.800` | `#073F27` | Deep accents |
| `green.900` | `#04271A` | — |
| `neutral.100` | `#F4F3EE` | Light section surface |
| `neutral.900` | `#14140F` | Dark section surface |
| `red.600` | `#D9364A` | **Not used.** Product-status only |

### Deviation on record — dark surfaces

The company Application rule reads: *"Website: Neutral 100 background, Green 600
for every CTA."* This site alternates Neutral 100 with **Neutral 900** sections,
because the user specified AgentFlow — a dark template — as the clone target.

This is a deviation, and it is compatible with the rest of the system rather
than a break from it: the Color rules already sanction stops 700–900 for
"dark-mode surfaces," and the Logo rules already specify a white mark on Neutral
900. What we hold to strictly:

- **Green is never a full-bleed background** (explicit company prohibition — it
  reads as a status screen). Green appears only as CTA fills, hairlines,
  eyebrows, and sub-10%-opacity glows.
- **Threat red never appears.** It is reserved for a real in-product catch.
- CTAs are Green 600 on light surfaces and Green 300 on dark, so the CTA is
  always the highest-contrast element on its own surface.

## Typography

| Role | Family / weight | Size |
|---|---|---|
| Hero / H1 | Sora 700 | `clamp(38px, 6vw, 56px)` / lh 1.06 |
| H2 | Sora 700 | `clamp(30px, 4.6vw, 48px)` / lh 1.08 |
| H3 | Sora 600 | 20–22px |
| Body | Inter 400 | 16px / lh 1.65 |
| Caption | Inter 500 | 13px |
| Eyebrow / button / data | JetBrains Mono 500 | 12px, `.1em` tracking, uppercase |

Two weights per family, never a third — company rule.

## Voice

Company rules carry over unchanged. On this site they mean:

- ✓ "Six posts live, twelve keywords claimed, one page ranking. Month one."
- ✗ "AI-powered SEO solution" — **explicitly banned phrase**
- ✓ "We'll show you the keyword list before we write a word."
- ✗ "Guaranteed page-one rankings" — overpromising, trust-destroying
- ✓ Names the actual work: keyword clustering, schema markup, rank tracking
- ✗ "leverage", "holistic", "synergy", "unlock", "empower", "solution"

Register on this site is the **institutional pitch** register: confident,
numbers-forward, never apologetic about pricing, evidence before hypotheticals.

Blog posts run one notch warmer — the consumer-social register — because
storytelling and humour are the brief. The rule that survives the register
change: **no invented client outcomes.** Opening scenes use named characters
explicitly framed as composites, never as testimonials.

## Visual signature

**The signal node, drawn live.** The company mark is a central node with four
radiating links (locked direction B in the company guidelines). On this site it
becomes the hero graphic: the centre node is the site, the outer nodes are
search surfaces — Google, Maps, AI answers, referrals — and the links pulse
outward on a stagger as the page loads.

It earns its place: it is the company's own mark, it encodes what the service
actually does (one source, many surfaces), and it replaces the generic
dashboard-screenshot hero that every SaaS template ships with. One signature,
executed once, then everything else stays quiet.

Reduced motion is respected — the pulse resolves to its final state instantly
under `prefers-reduced-motion`.
