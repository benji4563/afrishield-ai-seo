---
name: social-contact-links
description: >
  Wire a client's real contact channels into their AfriShield-built site:
  WhatsApp click-to-chat (floating button + prefilled greeting), Facebook and
  Instagram links, phone tel: links, and the matching sameAs / contactPoint
  JSON-LD. Every value is client-supplied and verified before shipping — never
  fabricate a handle or number. Trigger on "add WhatsApp", "link Facebook /
  Instagram", "social links", "contact channels", or "set up the WhatsApp
  number". Argument is an optional client name or domain.
argument-hint: "<client domain or name>"
user-invocable: true
---

# Social & WhatsApp Contact Links

> **Template copy (per AfriShield CLAUDE.md).** Client-agnostic. **No real
> number or handle lives here** — those come from the client's onboarding CSV /
> secrets file. Reference implementation: `afrishieldai.com`
> (`components/layout/WhatsAppFloat.tsx`, `lib/site.ts`).

## Why this is its own skill

In African markets WhatsApp is the **primary** sales channel — often ahead of
the contact form (see the build SOP, Part B.4: "WhatsApp is a first-class
CTA"). Getting these links right, verified, and consistent with the JSON-LD is
a per-client job with real pitfalls, so it is a checklist, not an afterthought.

## Inputs to collect from the client (human step)

| Value | Example | Notes |
|---|---|---|
| WhatsApp number, international format, digits only | `15595550199` | Must be the number **registered in WhatsApp**, ideally WhatsApp Business |
| Facebook page URL | `https://facebook.com/<page>` | The *page*, not a personal profile |
| Instagram profile URL | `https://instagram.com/<handle>` | Business/creator account preferred |
| (Optional) LinkedIn, TikTok, X, YouTube | full URLs | Only channels the client actually maintains |

The human's job ends at supplying these. Everything below is agent work.

**Golden rule: verify every value before it ships.**
- WhatsApp: `https://wa.me/<number>` must resolve (curl a `200`); a number not
  on WhatsApp renders a "phone number shared via url is invalid" page to the
  customer.
- Social URLs: `curl -sIL` each one; a 404 handle on a live site is worse than
  no link. If a channel doesn't exist yet, **leave it out** — never link a
  placeholder or a guessed handle.

## Step 1 — Site config (single source of truth)

Add to `lib/site.ts` (env-overridable, empty-safe), following the phone pattern
already there:

```ts
whatsapp: `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP ?? ''}`,
whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP ?? '',
social: {
  facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL ?? '',
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? '',
},
```

Every UI element renders **conditionally** on these being non-empty, so the
template ships clean and each client switches on only what they have.

## Step 2 — WhatsApp touch points

- **Floating button** — copy `components/layout/WhatsAppFloat.tsx`: fixed
  bottom-right, WhatsApp green `#25D366`, official glyph SVG, `target="_blank"
  rel="noopener noreferrer"`, accessible `aria-label`. Mount once in
  `app/layout.tsx`. Gate on `SITE.whatsappNumber`.
- **Prefilled greeting** — always append
  `?text=${encodeURIComponent("Hi <Business> — I found you on <domain> and I have a question about <service>.")}`.
  It removes the blank-chat friction and tells the owner which site the lead
  came from.
- **Inline CTAs** — contact page and meta descriptions may reference WhatsApp
  (B.4), but keep **one** persistent entry point (the float) rather than five
  competing buttons.
- **Do not** also use the number as a `tel:` link unless the client takes
  voice calls on it — the AI voice line (see `../ai-voice-agent/SKILL.md`) is
  usually a different number.

## Step 3 — Facebook / Instagram touch points

- **Footer** — icon links beside the email/phone block; same conditional
  rendering. Header social icons are noise on B2B sites — footer only.
- **`sameAs` in the Organization JSON-LD** (`lib/structured-data.ts`) — this is
  how answer engines reconcile the entity. Add only verified URLs:

```ts
sameAs: [SITE.social.facebook, SITE.social.instagram].filter(Boolean),
```

- NAP consistency: whatever name/handle the channels use should match the
  site's `Organization.name` — citations and AI entity matching depend on it
  (build SOP, B.5).

## Step 4 — Verify

- [ ] `curl` the built page: wa.me link includes the prefilled `?text=`
- [ ] Every social URL returns 200 and lands on the client's real page/profile
- [ ] JSON-LD `sameAs` contains exactly the verified URLs, no empties
- [ ] Float doesn't cover content at 390px width and stays behind the mobile
      nav drawer (z-index check)
- [ ] No fabricated or "coming soon" links anywhere

## Human-in-the-loop checkpoints (the only ones)

- **Supplying the real numbers/handles** — the agent never invents or guesses.
- **WhatsApp Business app setup** on the client's phone (profile photo,
  hours, catalog) — done by the client; AfriShield advises.
- **Creating the Facebook/Instagram pages** if they don't exist — account
  creation is a human step; the agent can draft the bios and first post.

## Related

- `../ai-voice-agent/SKILL.md` — the AI inbound call line; configure together,
  and keep the WhatsApp number and voice number distinct.
- `../afrishieldai-seo/SKILL.md` — B.4 (WhatsApp as first-class CTA) and B.5
  (off-page signals, NAP consistency).
- `../client-ops-automation/SKILL.md` — per-client runbook; these env vars ride
  the same Vercel env API step.
