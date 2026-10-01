# AFRISHIELD SIGNAL STYLE — Visual System

**Core idea:** REAL PERSON + REAL PROOF + ANIMATED EXPLANATION + DATA SIGNALS + SPEECH-SYNCHRONIZED CAPTIONS.

Implemented in `signal-editor/` (Remotion 4.0.520). Tokens live in `signal-editor/src/signal/tokens.ts` — this guide and that file must match.

## What we took from the research, and what we did not

`AI_SEO_GEO_Creator_Style_Reference.docx` (five AI-SEO creators) showed five repeatable principles: heavy display type, one consistent accent, two-colour split headlines, curiosity headlines, burst captions. We adopt the **principles**, not any creator's look:

| Principle | Their version | Ours |
|---|---|---|
| One accent colour | Ahrefs lime, Neil Patel orange, Backlinko teal | AfriShield company green `#5CBE91` (green.300) — already the brand on afrishieldai.com |
| Receipts as B-roll | Screenshots with circles/arrows | `ProofFlash`, `Screenshot`, `BrowserFrame`, `CircleHighlight` — proof always beats stock |
| Burst captions | Pill captions, highlighted word | `BurstCaption`: 2–5 words, key word on a green signal bar |
| Signature element | Mascots, 3D icons, lime border | **The Signal** — a pulse travelling along a path between nodes (`SignalPath`). Mirrors the `signal-travel` / `node-pulse` animations on our website |
| Thumbnail formulas | Binary questions, giant numerals | Three templates below, with our type and colour |

Do not copy a creator's layout, border frame, mascot, or colour.

## Tokens

| Token | Value | Use |
|---|---|---|
| `ink` | `#14140F` | Dark ground (default for video overlays, carousels) |
| `inkSoft` | `#1D1D17` | Cards on ink |
| `bone` | `#F4F3EE` | Light ground (LinkedIn carousels, quote cards) |
| `signal` | `#5CBE91` (green.300) | THE accent on dark: key words, signal pulse, success, CTA |
| `signalDeep` | `#0F7248` (green.600) | Accent on light grounds |
| `signalGlow` | `#93D8B7` (green.200) | Pulse glow, highlights |
| `white` | `#FFFFFF` | Primary text on video |
| `mute` | `#8B8A80` | Secondary text |
| `warn` | `#F2A93B` | Warnings only (video-semantic, not a brand colour) |
| `danger` | `#E5484D` | Errors / "invisible" states only (video-semantic) |

**Type:** Sora 800 (display, uppercase for headlines/captions, tracking −1%) · Inter 500/700 (body, UI) · JetBrains Mono 600 (data labels, metrics, URLs). Sora and Inter are the website's fonts.

**Rule of one:** one accent per frame. Red/amber appear only when the narration names a problem.

## The Signal (signature device)

Whenever information moves through a system — USER → SEARCH → AI → SOURCE → BUSINESS, or AD → CLICK → CHECKOUT → PURCHASE → DATA — draw nodes and send a pulse along the path **as each node is named**. The pulse represents information, attention, money or a customer. A broken path (danger-coloured gap) represents a leak. It is the recognizable AfriShield motif; use it at least once in any explainer, never as decoration.

## Captions (`BurstCaption`)

- 2–5 words per burst, driven by word timestamps from the real recording (whisper.cpp). Never full sentences.
- Sora 800, 80px at 1080w, white, 6px ink stroke via text-shadow.
- The emphasis word gets the signal-green bar behind it (from the script's `emphasis` list, else the longest content word).
- Position: lower third, centred, top of text block at y≈1300 — above platform UI, below the face.
- A burst appears on the first word's start and leaves when the next burst starts (max 1.4s). No leftovers.

## Motion

- Entrances: spring (damping 200), 8–12 frames. Exits: 6–8 frames. No CSS transitions.
- A visual appears **when its word is spoken** and leaves when the narration moves on. Typical hold 1.5–4s.
- Pattern breaks (hard cut / proof flash) at ~8s and ~25s on TikTok cuts.
- Camera: subtle 1.00→1.04 push on the talking head during tension; never shake.

## Proof-first editing

When the narration says *look at this / here's what I found / I checked / the data shows / I tested*, the next frame is the real evidence (`ProofFlash` → `Screenshot`/`BrowserFrame`/`AIChat`/`SearchResult`/`Dashboard`), full-width, within 0.3s. Stock footage never replaces available proof. AI chat or search results are **screen recordings of real sessions** — the components frame them, they do not fake them. If a mock-up is used for teaching, label it `ILLUSTRATION` on screen.

## Safe zones (1080×1920)

| Platform | Keep clear |
|---|---|
| TikTok | bottom 380px (caption/UI), right 140px (action rail), top 150px |
| Instagram Reels | bottom 420px, right 120px, top 220px |
| YouTube Shorts | bottom 360px, right 130px, top 160px |
| Facebook Reels | bottom 400px, right 120px |

Composite safe area used by `SafeArea`: x 90–940, y 230–1500. Key text never leaves it.

## Component map (narration trigger → component)

| Trigger in narration | Component |
|---|---|
| Opening line (0–3s) | `Hook` |
| Every spoken word | `BurstCaption` |
| A claim worth a headline | `Headline` (two-tone: setup white, key word signal) |
| "look at this", "here's the proof" | `ProofFlash` then `Screenshot` / `BrowserFrame` |
| Naming a website | `BrowserFrame` |
| "I asked ChatGPT/Perplexity…" | `AIChat` (real transcript text) |
| Google results | `SearchResult` |
| Analytics, numbers over time | `Dashboard`, `MetricCounter` |
| "before / after", "old way / new way" | `BeforeAfter`, `Comparison` |
| Information flowing | `SignalPath`, `ProcessFlow` |
| Pointing at a detail | `Arrow`, `CircleHighlight`, `Callout` |
| Problem named | `Warning` |
| Fix confirmed | `Success` |
| A real story beat | `StoryCard` |
| The one joke | `HumorCard` |
| A quote (real, attributed) | `QuoteCard` |
| News | `NewsCard` (source + date required) |
| Closing ask | `CTA` |

## Stills: carousels & thumbnails

**Instagram carousel** (1080×1350, 6–10 slides, ink ground): `CarouselSlide` variants — `cover` (hook ≤8 words, Sora 800 96px, key word signal), `stakes`, `proof` (real screenshot framed), `point` (one idea, ≤25 words), `signal` (SignalPath diagram), `compare`, `takeaway`, `cta` (save/share/comment). Slide counter `03/08` top-right in mono; swipe cue on slide 1 only; 96px margins.

**LinkedIn document carousel** (1080×1350 PDF, 7–12 slides, **bone ground**, signalDeep accent): same variants, denser (≤40 words/slide), a data or framework slide mandatory, source line on every data slide.

**Thumbnails / covers** (use the frame the platform shows):
- **A — Face + card:** real founder frame, rounded ink card lower-left, two-tone headline ≤5 words.
- **B — Proof + circle:** real screenshot, `CircleHighlight` on the one number/name, 3-word headline.
- **C — Giant word:** one word filling the top third (Sora 800), 2-line subline with one signal word.

Headline formulas (for covers/titles, not spoken hooks): `X or Y?` · `$number + outcome` (only real numbers) · `Keyword + reaction`. Never promise what the video doesn't show.
