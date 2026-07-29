# AfriShield Board of Advisors — knowledge base

The board is a set of **advisory lenses** (not builders). Each advisor is a real
external expert whose doctrine we have distilled into a wiki here. Board **agents**
load the relevant wiki and use it to review, score, and advise on the doers'
output — and to keep the doctrine current.

## Structure

```
00 Knowledge/board/
  README.md              ← this file: roster + protocol
  wiki/<person-slug>.md  ← per-advisor synthesis: sources, core ideas,
                            vocabulary, stances, recurring stories, how we apply it
```

Each wiki is a **transformative synthesis** — our own summary of the advisor's
thinking, with links to the source material. We do not store copyrighted
transcripts or articles verbatim; we link them and summarise.

## Roster

| Seat | Advisor | Wiki |
|---|---|---|
| Chairman — Business | Dan Martell | [dan-martell](wiki/dan-martell.md) |
| AI-SEO news + off-page | Julian Goldie | [julian-goldie](wiki/julian-goldie.md) |
| Automated & local SEO (Claude Code) | Jono Catliff | [jono-catliff](wiki/jono-catliff.md) |
| GEO / AI-search science | Mike King (iPullRank) | [mike-king](wiki/mike-king.md) |
| Semantic / on-page / topical authority | Koray Tuğberk Gübür | [koray-gubur](wiki/koray-gubur.md) |
| Website build + conversion + local | Wes McDowell | [wes-mcdowell](wiki/wes-mcdowell.md) |

## The protocol — how agents use this base

**Consult inside first → then the web → then reconcile.**

1. **Internal first.** Before an agent does research for a build/content/SEO/GEO
   decision, it reads the relevant advisor wiki(s) here. This doctrine is the
   default source of truth.
2. **Web only when thin.** If the internal doctrine does not cover the question
   or looks out of date, the agent goes to the open web (Firecrawl / search).
3. **Reconcile, don't just adopt.** New web findings are checked *against* the
   board's doctrine. Conflicting or hype-y tactics (esp. anything sourced from a
   single volume-first creator) must survive the more rigorous lenses
   (Mike King, Koray) before use.
4. **Learn in the repo.** When a reconciliation produces a durable new insight,
   the agent opens a **PR** updating the advisor wiki here (or the affected skill).
   The system's knowledge lives in git, not in anyone's head.

## Board-review loop (for drafts)

A board-review agent takes a draft (post, page, or plan), loads its lens's
wiki, and returns: a **score**, a list of **concrete fixes**, and any **recurring
drift** worth turning into a skill edit (opened as a PR). See
`02 Services ai seo/.claude/agents/board-geo-reviewer.md` for the first lens.

## Status

Wikis are seeded from verified public sources (channels, talks, articles) and our
own synthesis. Depth grows over time via the learn-in-the-repo protocol. The
general-SEO seat is filled by Jono Catliff (automation/local); a separate
Brand & Editorial and Risk/Compliance lens can be added as internal agents.
