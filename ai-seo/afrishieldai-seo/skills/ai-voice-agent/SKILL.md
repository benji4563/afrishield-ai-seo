---
name: ai-voice-agent
description: >
  End-to-end setup of an AI inbound-call line for an AfriShield client (or
  AfriShield itself): Twilio phone number -> Vapi voice assistant -> Next.js
  webhook -> HubSpot lead, plus surfacing the number across the site (Nav,
  Footer, contact page, JSON-LD telephone). API-first and idempotent; the only
  human steps are paying for the Twilio number and handing over provider
  credentials. Trigger on "set up AI calls", "inbound voice agent", "AI
  receptionist", "answer calls with AI", or "add a phone number to the site".
  Argument is an optional client name or domain.
argument-hint: "<client domain or name>"
user-invocable: true
---

# AI Voice Agent — Inbound Call Line

> **Template copy (per AfriShield CLAUDE.md).** This is the canonical,
> client-agnostic version. **No client-specific value — phone number, Vapi key,
> assistant ID, webhook secret — ever lives here.** Those belong in the client's
> gitignored `~/.afrishield-secrets/ops.env` and onboarding CSV. An improvement
> proven on one client flows back here; a client tweak does not.
>
> Reference implementation: `afrishieldai.com` (assistant "Elodie",
> `app/api/call-summary/route.ts` in the marketing-site repo).

## The 80/20 split

**~80% agent-automated:** assistant creation/tuning, webhook code, phone-number
linking, website UI, env vars, redeploy, test calls — all API, no browser.

**~20% human (the client or Ben):**
1. **Buy the Twilio number** and keep the Twilio account paid. Numbers,
   accounts, and payments are ownership-level — the agent never holds a credit
   card or creates accounts.
2. **Hand over credentials** (paste into chat or the client's secrets file):
   Vapi **private** API key, Twilio Account SID + Auth Token (only if the
   number still needs importing into Vapi).
3. **One live test call** at the end to confirm the experience feels right.

Everything else is scripted below.

## Architecture (one paragraph)

The AI agent lives entirely in Vapi; the website's only jobs are to **publish
the number** and **receive the end-of-call webhook**. Twilio owns the number;
Vapi imports it and answers with the assistant; when the call ends Vapi POSTs
an `end-of-call-report` to the site's `/api/call-summary` route, which
normalises it and creates a HubSpot contact with the summary and structured
data (name, email, interest). No telephony code runs on Vercel.

## Inputs to collect before starting

| Value | Env var / where kept | Source |
|---|---|---|
| Phone number, E.164 (`+15595550199`) | `NEXT_PUBLIC_PHONE` (display form) | Human buys in Twilio |
| Vapi **private** API key | `VAPI_API_KEY` in secrets file | Vapi dashboard → API Keys |
| Vapi assistant ID (or create one) | `VAPI_ASSISTANT_ID` in secrets file | Vapi dashboard, or `POST /assistant` |
| Twilio SID + Auth Token | `TWILIO_ACCOUNT_SID` / `TWILIO_AUTH_TOKEN` | Only if importing the number |
| Webhook shared secret | `CALL_WEBHOOK_SECRET` | Agent generates: `openssl rand -hex 32` |

**Pitfall — validate credentials before use.** Keys pasted through Word/Docs
arrive truncated (smart quotes, dropped characters). A Vapi key is a 36-char
UUID — count it. A `401 Invalid Key` from `api.vapi.ai` with a well-formed UUID
means the public key was pasted instead of the private one.

## Step 1 — Website webhook (code, once per client site)

Copy the reference route `app/api/call-summary/route.ts` from the
marketing-site repo. Contract it guarantees:

- Accepts **both** Vapi's `{message:{type:"end-of-call-report",…}}` shape and a
  flat `{caller,name,email,summary,…}` shape; ignores other Vapi event types
  with `200 {lead:false}` so Vapi does not retry them.
- Auth: shared secret checked against `x-call-webhook-secret` **or** Vapi's
  native `x-vapi-secret` header. Unset → accept with a warning (never silently
  fail open in prod — set the secret before launch).
- HubSpot forward mirrors `/api/contact`: never lose a lead to a CRM outage —
  log and return `ok:true, forwarded:false`.
- Reads `analysis.structuredData.{name,email}` — requires the assistant's
  `analysisPlan` from Step 2.

## Step 2 — Vapi assistant (API)

Fetch first, mutate, PATCH back. **Use `curl`, not Python `urllib`** —
Cloudflare in front of api.vapi.ai blocks urllib's signature with a bare
`403 error code: 1010`; curl passes.

```bash
curl -s -H "Authorization: Bearer $VAPI_API_KEY" \
  https://api.vapi.ai/assistant/$VAPI_ASSISTANT_ID -o assistant.json
```

Checklist for the PATCH (all verified on the reference build):

- [ ] **Brand sweep** — Vapi templates ship with another company's copy. Grep
      the assistant JSON for stale names in `firstMessage`, `voicemailMessage`,
      `endCallMessage` (the reference build had "Riley from Wellness Partners"
      left in two of them).
- [ ] **firstMessage is spoken verbatim by TTS** — no stage directions,
      markdown, or "(wait for response)" parentheticals; one clean sentence.
- [ ] **System prompt** — services/pricing written from the client's actual
      site copy; guardrail "never invent information"; email capture before
      closing ("ask for their email so a specialist can follow up" — the
      webhook forwards it); languages line matching the market (for EN/FR:
      `transcriber.language: "multi"` on Deepgram nova-3 + a multilingual
      ElevenLabs voice + "mirror the caller's language" in the prompt).
- [ ] **`serverUrl`** → `https://<domain>/api/call-summary` and
      **`serverUrlSecret`** → `$CALL_WEBHOOK_SECRET` (Vapi then sends it as the
      `x-vapi-secret` header — the webhook already accepts it).
- [ ] **`serverMessages` includes `end-of-call-report`** — without it the
      webhook never fires.
- [ ] **`analysisPlan`**: `summaryPlan.enabled` + `structuredDataPlan` with
      schema properties `name, email, company, interest, followUpRequested`.

## Step 3 — Link the number to the assistant (API)

```bash
curl -s -H "Authorization: Bearer $VAPI_API_KEY" https://api.vapi.ai/phone-number
curl -s -X PATCH -H "Authorization: Bearer $VAPI_API_KEY" -H "Content-Type: application/json" \
  --data "{\"assistantId\":\"$VAPI_ASSISTANT_ID\",\"server\":null}" \
  https://api.vapi.ai/phone-number/<phone-number-id>
```

Two traps seen in production: a phone number with **no `assistantId`** answers
nothing, and a phone-number-level **`server.url` pointing at the site homepage**
silently breaks call routing — always set `server:null` when linking. If the
number isn't in Vapi yet, import it (`POST /phone-number` with
`provider:"twilio"`, the number, SID, and auth token) — that's when the human's
Twilio credentials are needed.

## Step 4 — Surface the number on the website

Reference pattern (marketing-site repo): `lib/site.ts` holds `phone` (display
form) and `phoneHref` (`tel:` with formatting stripped) as the single source of
truth, env-overridable via `NEXT_PUBLIC_PHONE`. Everything renders
**conditionally** — no number configured, no phone UI anywhere. Touch points:

- Nav (desktop + mobile drawer), Footer, contact page ("answered 24/7 by our
  AI" block beside the email block).
- `lib/structured-data.ts`: `telephone` on the `Organization` JSON-LD **only
  when a real number exists** — E.164 from `phoneHref`, never display
  formatting, and never a fabricated number (house rule).
- Env docs: `NEXT_PUBLIC_PHONE` + `CALL_WEBHOOK_SECRET` in `.env.example` and
  the deployment runbook.

## Step 5 — Deploy, verify, test

1. Set `CALL_WEBHOOK_SECRET` (and `HUBSPOT_TOKEN`) via the Vercel env API
   (see `../client-ops-automation/SKILL.md` Step 2), then **redeploy** — env
   changes only bake into a new build.
2. Webhook smoke test against production, four cases: flat payload, Vapi
   end-of-call-report, non-lead Vapi event, wrong/missing secret → expect
   `lead:true`, `lead:true`, `lead:false`, `401`.
3. Human places one real call to the number (EN, and FR if bilingual); confirm
   the HubSpot contact appears with summary + structured data.
4. Soft-launch 2 weeks with the number on the contact page only; review every
   transcript in the Vapi dashboard; tune the prompt; then promote to Nav/Hero.

## Human-in-the-loop checkpoints (the only ones)

- **Buying/porting the Twilio number** and any account creation or payment.
- **Pasting provider secrets** (Vapi private key, Twilio SID/token) — the agent
  references `$VARS`, never stores literals in the repo.
- **The final listening test call** — tone is a human judgement.

## Related

- `../client-ops-automation/SKILL.md` — the per-client Ops runbook this plugs
  into (Vercel env API, redeploys, DNS).
- `../afrishieldai-seo/SKILL.md` — the build SOP that produces the site this
  number is published on (see its no-fabricated-NAP rule).
- `../social-contact-links/SKILL.md` — WhatsApp/social channels; the voice line
  and WhatsApp number are configured together per client.
