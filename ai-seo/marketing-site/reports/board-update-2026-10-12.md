# Board update — 2026-10-12

**No blog post was published in the last 7 days.** The newest post is
`how-much-does-seo-cost-in-nigeria`, dated 2026-09-30, and it is the only post since
2026-08-30. The cadence is three a week. The queue is not the cause: `content-queue.md`
on `master` holds 12 `queued` rows. The local task `afrishield-blog-post` exists but
has **zero recorded runs**. This matters more than anything else below.

## 1. In one line

8 videos read, 0 rules added, 0 rules retired, 3 proposals.

## 2. Needs Ben

1. **Confirm the blog task actually fires.** `afrishield-blog-post` shows no runs at
   all. The skill was re-pointed at the local routine on 2026-10-12, so it may simply
   not have reached its first slot. If there is still no post by next Saturday, the
   task's schedule or enabled state is the place to look. Expected result: posts
   resume from queue row 33. Job size: a minute to check.
2. **Two small fixes on the Nigeria cost post** (`app/blog/how-much-does-seo-cost-in-nigeria/page.tsx`).
   `geo_audit.py` measured a 205-character meta description (it will be cut off in
   results) and a 37-word definition block against a 40–70 word target. Rests on the
   `local-seo` audit and Mike King's liftable-answer point already in the skill.
   Expected result: a cleaner snippet and a fuller answer block. Job size: ten minutes.
3. **`geo_audit.py` reports a false failure on this site.** It fails any post without
   a link to `/services/...`. This site has no such path; its money pages are
   `/ai-seo`, `/geo-services` and `/pricing`, and the Nigeria post links to `/ai-seo`
   twice and `/pricing` once. Proposal: let the check read the money-page paths from
   `business.json`. This is a change to the `local-seo` template, so it is yours to
   approve. Until then every post here will show one fail that is not real. Job size:
   small.

**One conflict with the settled strategy.** Wes McDowell now argues a service firm
should put its effort into video, with the website reduced to a booking page, because
AI assistants lean on YouTube. That cuts against three blog posts a week. Nothing was
changed; it is your call. Koray Gübür's view this week runs the other way: a steady,
modest publishing rate on one topic is how a young site earns trust.

## 3. Rules added or retired

None. `CHANGELOG.md` has no active rules, so there was nothing to review in part D.

One candidate was held back: "every post carries something only AfriShield could have
written" (own data, a measured result, a real prospect question). It has a deep source
(iPullRank's Angela Clark, https://www.youtube.com/watch?v=6qF8mRrtTms) and a second
advisor behind it (Wes McDowell's "Scar Scale",
https://www.youtube.com/watch?v=HsLLTvosGJw). It stays a note because the first source
is a 15-minute pre-conference interview with a strategist rather than Mike King, and
with no posts going out there is nothing to test it on.

## 4. Posts reviewed

None published this week, so no GEO review was run.

For a baseline only, `geo_audit.py` on the newest post
(`/blog/how-much-does-seo-cost-in-nigeria`): **13 pass, 2 warn, 1 fail.** The two
warnings are in proposal 2; the fail is the false one in proposal 3. One post cannot
show recurring drift.

## 5. Videos

| Advisor | Title | Verdict | Depth |
|---|---|---|---|
| Koray Gübür | Google's Ranking Secret? (Julian Goldie interview, visual semantics) | ingested | deep |
| Koray Gübür | Topical Authority and Answer Engine Optimization | ingested | deep |
| Mike King (iPullRank) | Content Strategy Is Now a Differentiation Problem — Angela Clark | ingested | deep |
| Mike King (iPullRank) | SEO Value Happens After the Click — Brie Anderson | skipped-nothing-new | deep |
| Wes McDowell | Your Website Won't Matter in 2027 | ingested | deep |
| Dan Martell | How to Make AI Sound EXACTLY Like You | ingested | deep |
| Jono Catliff | Claude Code Local SEO Agent | skipped-nothing-new | deep |
| Jono Catliff | Claude Code SEO Agent | skipped-nothing-new | deep |

Not read: 19 videos marked `skipped-off-niche` on title (all 6 from Julian Goldie, 5
from Wes McDowell on making YouTube videos, 5 from Dan Martell, 3 from Jono Catliff on
Google Ads and a general Claude Code course), and 3 April uploads on the iPullRank
channel marked `skipped-backlog`. One Jono Catliff SEO-audit video from 2026-08-30 was
not reached and will come up again next week.

What the ingested ones taught:

- **Koray, visual semantics** — sort each query into "its own page, a heading, or a
  sentence" before it becomes a post; state the main entity and its attributes in the
  first lines; raise publishing volume only as a section ages.
- **Koray, AEO** — an engine spends effort on a source only after it shows some
  impressions and clicks, which supports low-competition Africa-qualified terms as the
  way in; what a brand is "known for" follows how often it is named with the topic
  elsewhere on the web.
- **Angela Clark (iPullRank)** — the test for a topic is whether a competitor could
  publish the same thing; the article is one format among several.
- **Wes McDowell** — answer one buyer question per piece: price, comparison, process,
  timeline, how to choose. The blog covers the first, second and fourth; "how to
  choose" and "what the first month looks like" are gaps.
- **Dan Martell** — a per-channel voice guide built from real samples, and the model
  interviews the founder rather than proposing the topic.

**Not adopted: manipulative.**

- Koray, both videos: rewriting markup and trimming text to evade AI-content
  detection; ageing Reddit accounts through proxies before seeding; secondary
  exact-match domains, book and podcast listings built to manufacture an AI
  "consensus"; a different markdown page served to each AI crawler by user agent;
  backdated documents linked from expired domains; hiding a site from Googlebot as a
  launch trick. All of these deceive an engine or a reader.
- Jono Catliff: the review form that sends only 4–5★ customers to Google. That is
  review gating, against Google's policy and the company rule. The wiki now says so,
  including against the same pipeline recorded on 2026-08-05.

Figures quoted by advisors in these videos (AI-citation shares, trust surveys, traffic
losses) were not checked and are recorded in the wikis as their claims only.

## 6. What could not be done

- **Firecrawl returned no transcript for 4 of 6 scrapes** (both Koray videos, Wes
  McDowell, Jono's local-SEO video): a cached copy of the page with chapters only.
  All four were read from yt-dlp `en-orig` captions instead, and the last two videos
  went straight to yt-dlp. Firecrawl credits used: 6, of which 4 bought nothing.
- Frame passes used: 0. Nothing this week needed the screen.
- All six channels listed without error.
- Search Console: not available in this session — not measured.
- Part D: nothing due.

## 7. Old branches

29 `board/*` branches still sit unmerged on origin (34 exist in total). Not touched.
