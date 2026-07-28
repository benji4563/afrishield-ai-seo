# Project Specs — afrishieldai.com

Source of truth for every decision on this build. Written before any `.tsx` file
(ai-seo-website-builder Phase 0 / ground rule 1).

## 1. What this is

The public marketing site for **AfriShield's AI SEO service**. It sells the
service; it is not the service. The engine lives in `../engine/`, client
deployments live in `03-Clients/*`. Nothing from either folder is copied here.

## 2. Answers to the Phase 0 discovery questions

| Question | Answer | Source |
|---|---|---|
| Business + industry | AfriShield AI SEO — AI-run search visibility for African businesses | root CLAUDE.md |
| Positioning promise | Search visibility run by agents, reported in plain numbers, priced for African businesses | derived from brand positioning |
| Voice | Direct, jargon-free, evidence-first. No "AI-powered solution" language | brand guidelines (banned phrase) |
| Palette | AfriShield green scale + Neutral 900/100, dark-surface variant | `00 Knowledge/brand-assets/AfriShield_Brand_Guidelines.html` |
| Domain | **afrishieldai.com** (apex canonical, www → 308) | user instruction, 2026-07-24 |
| Target cities | None in this pass — city pages are Phase 7, deferred | scope decision |
| Keyword source | No Ahrefs export supplied. Keywords chosen by intent-cluster reasoning; volumes not asserted | see §5 |
| Reference site to clone | **AgentFlow** (`agentflow.framer.ai`) — structural clone, AfriShield skin | user instruction |
| Content ambition | Brochure + blog (3 launch posts) | user instruction |
| Deployment target | Vercel (not executed in this pass — see §7) | skill default |

### Domain note — deviation on record

`ai-seo-marketing-site-CLAUDE.md` names the site `ai-seo.afrishield.com`.
The user specified **afrishieldai.com** on 2026-07-24. This build uses
afrishieldai.com everywhere (`SITE_URL`, canonicals, OG, sitemap, robots).
The folder CLAUDE.md should be updated to match — flagged, not silently changed.

## 3. Clone approach — what "clone" means here

AgentFlow is a commercial Framer template by another designer. This build clones
its **structure**: section topology, vertical rhythm, container widths,
interaction models, component inventory, and type scale. It does **not** copy:

- Its prose (all copy on this site is original — ground rule 2)
- Its images or proprietary assets
- Its brand colours or typefaces (swapped for AfriShield's own)

The result is a site that carries AgentFlow's structural quality and pacing
while being unmistakably AfriShield. Exact extracted values are in
`docs/research/AGENTFLOW-CLONE-SPEC.md`.

## 4. Routes

| Route | Purpose | Schema |
|---|---|---|
| `/` | Home — full 13-section AgentFlow topology | `ProfessionalService` + `hasOfferCatalog` |
| `/solutions` | The three service pillars in depth | `Service` |
| `/how-it-works` | The 4-stage engagement, week by week | `HowTo` |
| `/pricing` | Three transparent tiers, USD | `FAQPage` |
| `/case-studies` | NJ's Accounting build, written as a build log | `Article` |
| `/blog` | Post index | `Blog` |
| `/blog/<slug>` | 3 launch posts | `BlogPosting` + `FAQPage` + `BreadcrumbList` |
| `/contact` | Form → API route | `ContactPage` |
| `/thank-you` | Post-submit, `noindex` | — |

Root layout carries `Organization` on every page.

## 5. Keyword targets

No Ahrefs export was supplied, so **no search volumes or KD figures are asserted
anywhere in this repo** — inventing them would poison the audit trail. Primaries
were chosen by commercial intent against the KEEP cluster taxonomy (Phase 3
clusters A, D, G). Each is claimed once in `used-keywords.md`.

| Cluster | Primary keyword | Page |
|---|---|---|
| G (differentiation) | ai seo services | `/` |
| A (hire a provider) | ai seo agency for small business | `/blog/what-ai-seo-actually-does` |
| D (pricing anxiety) | how much does seo cost | `/blog/what-seo-actually-costs` |
| B (education) | ai seo vs traditional seo | `/blog/ai-seo-vs-traditional-seo` |

Run a real export before the next content batch and reconcile.

## 6. Case-study data policy

`/case-studies` describes the NJ's Accounting & Tax Services build. Per the
folder CLAUDE.md, client metrics are read-only reference and must be cleared
before publishing. **This build therefore publishes only build facts that are
verifiable from this repo's own history** (stack, schema coverage, what shipped,
the one-day build window) and **asserts no traffic, ranking, or revenue
outcomes.** Placeholders are marked `TODO(ben): clear with NJ` in the source.

## 7. Out of scope for this pass — stated plainly

Delivered: full site, all routes, SEO foundation, 3 posts, verified build.
Not delivered, and why:

- **Deployment.** Needs a GitHub repo the user creates and a Vercel account
  login. Documented step-by-step in `docs/DEPLOYMENT.md`; not executed.
- **Generated imagery.** Hero/blog art would consume Higgsfield credits on the
  user's account. Every image slot is built and styled with a CSS-drawn
  placeholder that looks intentional; swap paths are listed in
  `docs/IMAGE-SLOTS.md`.
- **HubSpot lead capture.** The folder CLAUDE.md calls for it; no API key is
  present. `/api/contact` validates and logs, and skips the HubSpot call
  gracefully when `HUBSPOT_TOKEN` is unset. Wiring is one env var away.
- **French (FR) locale.** The folder CLAUDE.md calls for EN/FR. This pass ships
  EN only; copy is isolated in content constants so FR is a translation pass,
  not a rebuild.
- **City landing pages.** Phase 7, deferred by scope decision above.
