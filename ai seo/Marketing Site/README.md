# afrishieldai.com — AI SEO marketing site

The public sales site for AfriShield's AI SEO service. It sells the service; it
is not the service. Nothing here is copied from `../engine/` or from any client
folder under `03-Clients/`.

## Run it

```bash
npm install
```

```bash
npm run dev
```

```bash
npm run build
```

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind · Framer Motion.

> The build brief called for Next.js 14. The entire 14.x line carries unpatched
> high-severity advisories and npm's only offered remedy is Next 16, so this
> ships on 16. `npm audit` reports zero vulnerabilities; the `overrides` block
> in `package.json` forces patched `postcss` and `sharp` and should be re-checked
> on every Next upgrade.

## Layout

```
app/            routes — home, solutions, how-it-works, pricing,
                case-studies, blog (+3 posts), contact, thank-you,
                sitemap.xml, api/contact
components/
  home/         the 11 home sections, in AgentFlow's measured order
  blog/         post shell, card, TOC, related posts
  layout/       Nav (scroll-reactive), Footer
  signature/    SignalNode — the brand mark, drawn live. The hero.
  ui/           Button, Section, Faq, PageHero
lib/            site config, posts registry, JSON-LD helpers
docs/           specs, brand, clone extraction, deployment, image slots
used-keywords.md   one row per claimed keyword. Check before writing.
```

## Read these before changing anything

| File | Why |
|---|---|
| `docs/project_specs.md` | Every decision and its reason, including what was left out |
| `docs/brand-guidelines.md` | Palette and type, and the one deviation from company rules |
| `docs/research/AGENTFLOW-CLONE-SPEC.md` | The measured values this layout reproduces |
| `used-keywords.md` | A keyword appears once, ever |

## House rules this codebase enforces

- **No invented client outcomes.** `/case-studies` publishes build facts only
  and says plainly why the results section is empty.
- **No fabricated metrics.** No search volumes or KD figures anywhere — no
  export was supplied, and backfilling from memory poisons the audit trail.
- **No content hidden behind animation.** Nothing renders `opacity:0` into the
  server HTML. Motion is an enhancement; if it never runs, the page still reads.
- **No testimonials until real ones exist.** Blog opening scenes are labelled
  illustrative composites in the markup itself.
- **Green is never a full-bleed background** — company brand rule.

## Verified at build time

13 routes returning 200 · JSON-LD on every page · canonicals on the apex ·
sitemap matching the real route list · no horizontal overflow at 390 / 768 /
1440 · mobile nav, solution tabs and FAQ accordion all keyboard-operable ·
`npm audit` clean.
