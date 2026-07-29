# AfriShield — AI SEO Marketing Site

> Place at `AfriShield/02-Services/ai-seo/marketing-site/CLAUDE.md`.

## Scope of this folder

This is the **public-facing sales/marketing website for the AI SEO service**
— `ai-seo.afrishield.com`. It sells the service. It is not the service.

This is a sibling to `../engine/` (the reusable AI SEO product itself), not
a part of it, and it is not a client deployment.

| This folder (`marketing-site/`)         | `../engine/`                        | `03-Clients/*`                        |
|-------------------------------------------|----------------------------------------|------------------------------------------|
| Sells the AI SEO service                  | Delivers the AI SEO service             | Runs the AI SEO service for one client   |
| AfriShield's own brand/copy               | Generic, reusable product logic         | Client's brand/content/config            |
| Next.js site, EN/FR, HubSpot lead capture | Keyword research/rank tracking/content  | Live deployment for one specific client  |

## Hard rule for the agent

**Never pull code, content, or config from `../engine/` or from any
`03-Clients/*` folder into this site, and never assume changes made here
apply anywhere else.** This site *talks about* the product and *references*
NJ's Accounting as a case study (with data explicitly approved for public
use) — it does not contain the product's engine code, and it does not
contain any other client's actual content or credentials.

If a case study needs real metrics from `03-Clients/nj-accounting-tax/`,
treat that as read-only reference material to summarize, not something to
copy wholesale — and confirm which numbers are cleared for public use before
publishing.

## What belongs here

- Next.js app: home, `/for-professional-services`, `/for-ecommerce`,
  `/how-it-works`, `/case-studies`, `/pricing`, `/contact` — EN + FR
- HubSpot API route for lead capture (contact form + both landing pages,
  tagged by source page)
- PostHog wiring for per-page conversion tracking
- Marketing copy, brand assets specific to this site

## What does NOT belong here

- AI SEO engine/product code — that's `../engine/`
- Any other service's code (Cyber Security, AI PEA) — those are
  `../../cyber-security/` and `../../ai-pea/`
- Client-specific content, credentials, or live config — those are
  `../../../03-Clients/*`
- Company-wide docs — those are `../../../00-Knowledge/`

## Working directory convention

Launch Claude Code sessions from this exact folder
(`02-Services/ai-seo/marketing-site/`) when building the site. Company-wide
context still loads via upward recursion from the root CLAUDE.md — you lose
nothing by being specific, you only avoid bleeding context from the engine,
other services, or client folders.
