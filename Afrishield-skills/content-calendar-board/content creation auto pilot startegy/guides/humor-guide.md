# Humor Guide

Humor makes content easier to read, easier to watch, more human, more memorable. It must never make AfriShield look unserious, and it must never create a false fact.

Policy source: master brief §6. This guide operationalizes it.

## Every item is evaluated; not every item gets a joke

`humor.level`:

| Level | When | Density |
|---|---|---|
| `NO_HUMOR` | Sensitive topics (scams, fraud victims, health, bereavement, money lost by named people), conversion posts for corporate buyers, news of harm | none |
| `LIGHT` | Default for professional services, LinkedIn, case studies, tutorials | one dry line or visual beat |
| `MODERATE` | Tourism/SMB awareness content, myths, Threads | one punchline + one light visual gag |
| `STRONG` | Pure awareness memes/carousels on universal pain, founder self-deprecation | built around the joke — still one core insight |

Until performance learning says otherwise: humor for **awareness and engagement**; drier for **lead generation and conversion**. `learn` will revise this with data.

## Types (with AfriShield-shaped examples)

| Type | Example |
|---|---|
| Observational | "Every business in Douala has a WhatsApp Business account. Nobody knows who checks it." |
| Irony | "The lodge has 2,000 five-star reviews. AI has never heard of it." (only if that lodge/state is real, or framed hypothetically) |
| Exaggeration (obvious) | "You can have 10,000 followers and still have ChatGPT asking, 'So… what exactly do you sell?'" |
| Contrast | "Google gave me ten links. AI gave me two names. Guess which one got the booking." |
| Business humor | "That's not marketing. That's rent." |
| AI humor | "AI read the website. AI got confused. AI recommended the competitor. AI has no regrets." |
| Self-aware | "We're an AI visibility company. AI can't find us either. Yet. Day 1 of fixing that." (true: 2026-08-30 baseline) |
| Situational | The generator kicking in mid-take — keep it if it happened |
| Visual | `HumorCard` beat, a deadpan zoom, the tombstone slide |
| Deadpan | "Nobody leaves voicemails. Nobody." |
| Light sarcasm | At the industry only: "Guaranteed page one. Also guaranteed: the invoice." |

## Comedic framing vs factual claim — the test

Ask: *would a reasonable viewer take this line as a report of something that happened or a measurement?*

- If **no** (obvious exaggeration, personification, hypothetical) → it is `HUMOR` and may run.
- If **yes** → it is a factual claim and needs evidence like any other claim.

| ✅ Framing | ❌ Fabricated evidence |
|---|---|
| "You can have 10,000 followers and still have ChatGPT asking what you sell." | "I checked ChatGPT and it literally told me your business was invisible." (unless it did, on record) |
| "AI apparently needed an introduction." | "The owner told me he cried when he saw the report." |
| "OTAs: the only business partner that sends a thank-you note and keeps 18%." | "Booking.com took $14,000 from this hotel." (needs the real hotel + data) |

Humor claims are recorded as `HUMOR` in the factuality gate and can never be used as testimonials, results or proof.

## Rules

1. The joke is on the industry, dead tactics, algorithms, or us — never the viewer, never a named business or competitor.
2. One punchline per video/post. The proof is the payoff.
3. Universal African business references land in Lagos, Nairobi, Douala, Arusha *and* London: WhatsApp as CRM, one bar of signal, the generator hum, the cousin who built the website, the OTA payout email.
4. No politics, religion, ethnicity, tribe, gender jokes. PG-13 ceiling.
5. Professional services: one notch drier. Understatement over punchline.
6. Never force a joke into serious or sensitive content — `NO_HUMOR` is a legitimate, often correct, output.
7. Authentic accidents beat written jokes: video-analysis keeps a genuinely funny unscripted moment if it doesn't undercut the point.

## ADD HUMOR LAYER — output shape

```json
"humor": {
  "evaluated": true,
  "level": "LIGHT",
  "type": "contrast",
  "angle": "ten blue links vs two names",
  "line": "Google gave me ten links. AI gave me two names.",
  "placement": "after the proof, before the lesson",
  "claim_category": "HUMOR",
  "risk_note": "none — framing, no factual assertion"
}
```
