# AfriShield — AI SEO Service (Template)

> Place at `AfriShield/02-Services/ai-seo/CLAUDE.md`.

## Scope of this folder — READ CAREFULLY

This folder is the **generic, reusable AI SEO product template**, not any
one client's website.

History: this template originated from the AI website + SEO build done for
NJ's Accounting & Tax Services. That original build has now been split in
two:
- **This folder (`ai-seo/`)** — the stripped-down, reusable version. No NJ
  branding, content, credentials, or live config should exist here.
- **`../../03-Clients/nj-accounting-tax/`** — NJ's actual live deployment,
  which may reference or have originally copied from this template but is
  now allowed to diverge for their specific needs.

## Hard rule for the agent

**Never assume work happening in a client folder (e.g. `nj-accounting-tax/`)
should be applied here, and never assume changes here should be pushed to a
client folder.** These are two different things:

| This folder (`ai-seo/`)        | Client folders (`03-Clients/*`)         |
|---------------------------------|------------------------------------------|
| Generic, reusable product        | Specific client's live deployment        |
| No client branding/content/data | Client's actual branding/content/config  |
| Changes affect the product line  | Changes affect only that one client      |

If a change made for a client looks like it should become part of the
general product (a genuine improvement, not a client-specific tweak), flag
this explicitly to the user and ask before promoting it into this template.

## What belongs here

- Core AI SEO engine/logic (keyword research, rank tracking, content
  generation, etc.)
- Generic UI/site template components
- Documentation for onboarding a *new* client onto this service

## What does NOT belong here

- Any client's actual content, credentials, domain config, or brand assets
- Cyber Security or AI PEA code — those are sibling services
