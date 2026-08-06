---
name: humor-writing
description: >
  Standing source material for adding humor to AfriShield AI-SEO content.
  Distilled from "Writing Humor: The Art of Making Readers Laugh"
  (hireawriter.us) and calibrated to the AfriShield voice (dry, plain, honest,
  anti-hype). Apply on EVERY blog post written by the afrishield-blog pipeline —
  including the scheduled blog auto-poster routine — and on client-site content,
  where it is dialled one notch drier. Load this whenever writing, editing, or
  reviewing a blog post, article, or marketing copy that should carry the
  AfriShield wit. Not a pipeline: it never writes a post by itself.
user-invocable: false
---

# humor-writing — the AfriShield humor reference

Source material, distilled and locked in. Every post the blog pipeline writes —
for afrishieldai.com or a client site — draws on this file. It exists so the
humor stays consistent no matter which agent or routine does the writing.

> **Origin:** [Writing Humor: The Art of Making Readers Laugh](https://www.hireawriter.us/creative/writing-humor-the-art-of-making-readers-laugh)
> (Hire a Writer). The five principles below are faithful to that article; the
> calibration sections adapt it to AfriShield's voice, SEO/AEO constraints, and
> African-market audiences. When this file and the article disagree, this file
> wins — the article is inspiration, this is policy.

## The five principles (from the source article)

1. **Be yourself.** Humor only works when it is authentic to the voice behind
   it — readers detect performed jokes instantly. For AfriShield the "self" is
   already defined: dry, plain, honest, faintly self-deprecating, anti-hype.
   Do not adopt a zanier persona for a joke; the wry register *is* the humor.
2. **Keep it light-hearted.** Jokes in commercial copy are a wild card — the
   client's business and reputation ride on every post. Stay away from
   controversial topics entirely: no politics, religion, ethnicity, or
   charged current events. The more charged the comment, the more likely it
   alienates a slice of the audience.
3. **Use universal references.** Avoid hyper-specific jokes that only one
   subculture gets. The wider the shared experience, the safer the laugh.
   (See the calibration below — "universal" for us means universal across
   Lagos, Accra, Nairobi, Johannesburg *and* an international reader.)
4. **Use audience-appropriate jokes.** Nothing above PG-13, ever — a single
   off-colour line can lose a client. Also respect life-experience gaps: our
   readers are African SMB owners, marketers, and founders, not US pop-culture
   fans. Think about who reads the piece before the joke goes in.
5. **Sprinkle it on.** Humor is seasoning, not sauce. Used sparingly it creates
   the memorable moments that make a post stand out from the million other
   articles on the internet; slathered on, it loses readers and cheapens the
   expertise. If everything is a joke, nothing is believed.

The article's closing advice — don't be afraid to fail — applies to **drafts,
not published copy**. In our own drafting, try the joke. At edit time, if a
joke might miss, cut it: a published bomb costs a client trust. Even
professional comedians bomb; we just do not ship the bombs.

## AfriShield calibration — where humor may and may not live

SEO/AEO structure beats jokes. Answer engines lift straight sentences, so every
quotable sentence stays straight:

- **Never** in the `ShortAnswer` block — it is the featured-snippet / AI-citation
  target and must answer the keyword outright, plainly.
- **Never** in the first sentence under an `<h2>` — the liftable opener (BLUF
  discipline from the blog skill). Humor goes in the sentences *after* the
  answer sentence.
- **Never** in FAQ answers — they are retrieval chunks and People-also-ask bait.
- **Never** in metadata, `PostMeta` fields, TOC labels, or JSON-LD strings.
- **Welcome** in: the `Scene` opening, section bodies after the opener, the
  honest-against-interest passage (dry understatement lands best there), and —
  at most once — a comparison-table cell.

Register rules:

- **Punch at the industry, never down.** The legitimate targets are SEO hype,
  "guaranteed page one" merchants, jargon, and ourselves. The reader and their
  business are never the butt of the joke.
- **Ratio:** about one light touch per 400–500 words. A ~2,000-word post
  carries three to five moments. Under is fine; over is not. When torn between
  two jokes, keep the drier one.
- The measured register survives: **minimise contractions** even in jokes (blog
  skill rule). Dry understatement works without them — forced casualness is
  what breaks the voice.
- Humor must never dilute an answer, soften a true claim, or add hype. If a
  sentence only works because of the joke, rewrite it straight.

African-market reference bank (safe, shared, clearly-composite per brand rules):

- Patchy data and mid-range Android realities; the page that will not load on
  one bar of signal.
- Load shedding and the generator hum during a client call.
- "WhatsApp is the real CRM" — the business that runs on voice notes.
- Danfo / keke / matatu commutes; the shop owner who checks rankings between
  customers.
- The cousin who "knows computers" and built the last website.

Do **not** use: US/EU-centric pop culture (the article's own Nickelback joke is
the cautionary example — it does not travel), ethnic or national stereotypes,
politicians, or anything city-vs-city (Lagos vs Nairobi ribbing included).

## Client-site calibration

The same principles, one notch drier by default — it is the client's reputation,
not ours:

- Match the client's brand guidelines first; where they define a tone, it wins
  over this file.
- Regulated or high-trust verticals (insurance, legal, medical, finance,
  security) run at near-zero humor: one faint wry aside per post at most.
- Never joke about the client's customers' pain points — a shop owner reading
  their own blog should feel understood, not roasted.
- When in doubt for a client, cut the joke. Their candour and numbers carry
  the trust; humor is a bonus, never the vehicle.

## Pre-publish checklist

- [ ] No humor in ShortAnswer, H2 opener sentences, FAQ answers, or metadata.
- [ ] 3–5 light touches in a ~2,000-word post (fewer on client sites), each one
      dry and industry-aimed.
- [ ] Every reference lands for a reader in Lagos, Accra, Nairobi, *and* London.
- [ ] PG-13 ceiling respected; zero politics, religion, ethnicity, controversy.
- [ ] Every quotable sentence survives being lifted without the jokes around it.
- [ ] Any joke you hesitated on got cut at edit time.

## Used by

- `../afrishield-blog/SKILL.md` — the blog pipeline, step 3 (Write the post);
  this file is its standing humor reference on every run, including the
  scheduled **blog auto-poster** cloud routine (see the pipeline's Scope
  section) and the **weekly queue-keeper**'s audits.
- `../afrishieldai-seo/SKILL.md` — the build & optimise SOP, content-pipeline
  phase, for client deployments.
