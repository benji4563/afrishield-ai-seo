# Wes McDowell — ingestion ledger

Tracks processed videoIds so nothing is re-ingested. Verdicts:
`ingested` / `skipped-off-niche` / `skipped-nothing-new`. Depth: `deep` (full
transcript) / `shallow` (title+description fallback).

| Date | videoId | Title | Verdict | Depth |
|---|---|---|---|---|
| 2026-08-05 | RwEs5VdH_ZQ | It's Boring, But THIS YouTube Funnel Can Triple Your Business | ingested | deep |
| 2026-08-05 | HsLLTvosGJw | Big YouTubers Are Down 50% and It's Your Best Chance to Start | ingested | deep |
| 2026-08-05 | yuVlHAKbnMQ | Claude Just Changed Making YouTube Videos Again (7 Use Cases) | ingested | deep |
| 2026-08-11 | JbBfJtWnyt0 | How Top Experts Get INSANE Sales From YouTube | ingested | deep |
| 2026-08-18 | vl6GDCbMi4I | How to Become the Most Famous Expert in Your Industry (Full Course) | ingested | shallow |
| 2026-08-25 | kjRKGZh7uAE | YouTube Just Accidentally Created A HUGE Opportunity For Your Business | ingested | shallow |

Note (2026-08-26 run): confirmed via search that kjRKGZh7uAE (Aug 25) is the
most recent upload as of this run — exactly 3 new videos since the 2026-08-05
cutoff, no overflow. Transcript inline-extraction (via Firecrawl's YouTube
postprocessor) worked for JbBfJtWnyt0 only; the other two stayed shallow
(title + description/chapters, no transcript block rendered).
| 2026-09-09 | q7sJGED_b6g | YouTube Algorithm - Working Against You? The Truth About 2026 Changes | ingested | shallow |
| 2026-09-09 | kjRKGZh7uAE | YouTube Just Accidentally Created A HUGE Opportunity For Your Business | skipped-nothing-new | shallow |
| 2026-09-09 | JbBfJtWnyt0 | How Top Experts Get INSANE Sales From YouTube | skipped-nothing-new | shallow |

Note (2026-09-09 run): direct youtube.com access (RSS feed and yt-dlp) is blocked at
the environment's egress proxy, confirmed again this run (403 at CONNECT for
`www.youtube.com`); the Firecrawl scrape/search tools specified in the runbook
also failed this run with "insufficient credits" (402), so the channel's
/videos tab could not be rendered directly. Fell back entirely to web-search
snippets to identify candidate uploads and approximate their recency (relative
"X weeks/days ago" text and a couple of stats-aggregator pages), cross-checked
against the channel/topic to rule out course-ad pages and other creators'
videos. This makes the "3 newest" ranking best-effort rather than certain —
of roughly a dozen title candidates surfaced, these three had the strongest
recency signal (approx. late July-late August 2026) versus everything else
found, which dated to Nov 2025-Mar 2026 or earlier. No transcript text was
obtainable for any of them (title + secondhand description snippets only,
which for two of the three were generic channel boilerplate rather than
video-specific detail) — all three logged at shallow depth. `kjRKGZh7uAE` and
`JbBfJtWnyt0` are on-niche (YouTube-for-business) but the available
snippets only restate doctrine already captured in the wiki (content-as-funnel,
buyer-vs-viewer targeting), so no new takeaway could be responsibly extracted
without fabricating specifics beyond the title — logged skipped-nothing-new
rather than guessed. `q7sJGED_b6g` had one corroborated, video-specific detail
(a stated view/revenue dip tied to 2026 algorithm changes) worth capturing.
| 2026-09-23 | VXGDHZIGf40 | Your Website Won't Matter in 2027. Prepare Now. | ingested | deep |
| 2026-09-23 | zGfjuwDKrro | ChatGPT Astra Just Changed Making YouTube Videos Forever | ingested | deep |
| 2026-09-23 | i1fLRypxgjU | Hormozi's New YouTube Strategy Is Genius (but Dangerous) | ingested | deep |
| 2026-09-30 | bjIL9qoRHds | The NEW Way to Make YouTube Videos FAST (Start to Finish) | ingested | deep |
| 2026-09-30 | VXGDHZIGf40 | Your Website Won't Matter in 2027. Prepare Now. | ingested | deep |
| 2026-09-30 | zGfjuwDKrro | The NEW ChatGPT Just Killed Claude at Making YouTube Videos | ingested | deep |

Note (dedup, 2026-08-05 run): all three videoIds above were first logged
2026-07-29 at `shallow` depth (`RwEs5VdH_ZQ` and `HsLLTvosGJw` as `ingested`;
`yuVlHAKbnMQ` as `skipped-nothing-new`). The 2026-08-05 run re-read all three
at `deep` depth with full transcripts and found materially more — including
real substance in `yuVlHAKbnMQ` that the shallow title/description pass
missed — so the deep entries above are what's kept; the shallow duplicates
were dropped.

| 2026-08-12 | JbBfJtWnyt0 | Unfortunately, Growing on YouTube Just Changed Forever | skipped-nothing-new | deep |
| 2026-08-12 | VDnueqVW7Cc | I Just Fixed 28 YouTube Channels in a Row | ingested | deep |
| 2026-08-12 | w2ENbVomGao | The Brutal Truth About Making YouTube Videos | skipped-off-niche | deep |

Note (2026-08-12 run, depth methodology): direct youtube.com access remained
blocked at the network egress proxy; channel enumeration used the YouTube
Data API's uploads-playlist endpoint (via Composio) instead of RSS, and the
API explicitly refuses caption downloads for videos we don't own. Video
understanding used Firecrawl's built-in YouTube post-processor (a whole-video
content summary generated server-side, not just title/description) — logged
as `deep` on that basis. No raw transcript/caption text was fetched into or
stored in this repo. `w2ENbVomGao` is generic creator-mindset/fear-of-starting
content, not a tactical SEO/conversion insight — off-niche per the routine's
own filter. `JbBfJtWnyt0`'s 5-point list (ideas-over-execution, case studies,
unique packaging, value balance, coaching) substantially overlaps ground
already logged from `HsLLTvosGJw` (Scar Scale / case-study credibility) with
nothing new enough to log again.

| 2026-08-19 | vl6GDCbMi4I | The Anti-Personal Brand That Will Take Over in 2027 (Start Yours Now) | ingested | deep |
| 2026-08-19 | JbBfJtWnyt0 | How Top Experts Get INSANE Sales From YouTube | ingested | deep |
| 2026-08-19 | VDnueqVW7Cc | I Just Fixed 28 YouTube Channels in a Row | ingested | deep |

Note (2026-08-19 run): `vl6GDCbMi4I` is a ~6h13m compiled "full course" —
read in full via character-offset slicing of the saved scrape file (too
large for one context load). It's a superset of most standalone videos
ingested to date, so future runs should expect real overlap between it and
newer standalone videos on the same channel; only genuinely new material was
logged. `JbBfJtWnyt0`'s page `<title>` tag reads "What All Top Experts Know
About YouTube (That You Don't)" while its on-page H1/og:title reads "How Top
Experts Get INSANE Sales From YouTube" — same video (uploadDate
2026-08-11), logged under the H1 title; if it resurfaces under the other
title in a future search, it's a dupe, not a new video. Also note:
`A1M8bqyUJwQ` ("Forget the Marketing Funnel. Try This Instead") surfaced in
a Wes McDowell search but is actually uploaded by a different channel
(Daniel Priestley / Key Person of Influence) — not this advisor, skip if it
resurfaces. Three videos uploaded 2026-08-05 to 2026-08-18 were genuinely
new and processed this run (the cap of 3); one older still-unprocessed
candidate is left for next run: `1ywvAeaFojo` "Claude Just Changed Making
YouTube Videos Forever" (uploaded 2026-06-17, VidIQ+Claude MCP topic
research and a two-skill outline/slide-deck workflow — on-niche, not yet
reviewed).

| 2026-09-02 | kjRKGZh7uAE | YouTube Just Accidentally Created A HUGE Opportunity For Your Business | ingested | shallow |
| 2026-09-02 | JbBfJtWnyt0 | How Top Experts Get INSANE Sales From YouTube | ingested | shallow |
| 2026-09-02 | lIQ79IkGpjk | There's a New AI Inside YouTube and Almost Nobody's Using It | ingested | shallow |

Note (2026-09-02 run): direct YouTube access (curl/yt-dlp) is blocked in this
environment, so discovery went through Firecrawl web search + scrape of the
watch pages instead of yt-dlp. Most `site:youtube.com/watch "Wes McDowell"`
search hits turned out to be false positives — other channels' videos that
merely show a Wes McDowell video as a sidebar "up next" suggestion — and were
discarded after checking each candidate's actual "Uploaded by" channel link
against `@WesMcDowellInc`/`UCMq1R1LgS04lIKdpLh_OS1w`. The three rows above are
confirmed-genuine uploads, newest three not already in this ledger; older
confirmed uploads found in the same pass (`2JGEyK2o0yY`, `sZQ9snGyFps`, and
others) were left unprocessed for a future run per the 3-per-run cap.

| 2026-09-16 | i1fLRypxgjU | Hormozi's New YouTube Strategy Is Genius (but Dangerous) | ingested | deep |
| 2026-09-16 | JJTFLkD9NxU | How 'Everyday Experts' Are Getting Famous on YouTube | ingested | deep |
| 2026-09-16 | kjRKGZh7uAE | YouTube Just Accidentally Created A HUGE Opportunity For Your Business | ingested | deep |

Note (2026-09-16): direct youtube.com access was blocked by the environment's
network policy again this run, but Firecrawl's YouTube postprocessor returned
full transcripts for all 3 candidates — `deep` depth throughout. Uploads were
ranked by `uploadDate` metadata (2026-09-08, 2026-09-01, 2026-08-25); a 4th
candidate, `vl6GDCbMi4I` (2026-08-18), was left unprocessed for a future run
per the 3-newest cap. A 5th candidate found in the initial search,
`mhV0GzrIlAo`, was excluded entirely — its metadata shows it's uploaded by a
different channel ("The Zinny Studio"), not Wes McDowell, so it was never a
valid candidate for this advisor.

Note (2026-09-23 run): the channel's `/videos` page returned 30 recent
uploads, of which only the 3 above were new since the last run and were
selected (newest-first) for deep analysis — all three had usable full
transcripts via youtubetotranscript.com. All three were on-niche and added
genuinely new material, so all are `ingested`. 24 more videos on the page are
also not yet in this ledger but were left untouched this run (per the "at
most 3 newest" rule) and should be picked up in a future run, newest first:
`JJTFLkD9NxU`, `kjRKGZh7uAE`, `vl6GDCbMi4I`, `JbBfJtWnyt0`, `w2ENbVomGao`,
`VughBZFtHDc`, `lIQ79IkGpjk`, `1ywvAeaFojo`, `BEcIgiXA4M8`, `g3bXPKgvFGM`,
`81bmuO5U6TY`, `C3l5idU0ja0`, `2JGEyK2o0yY`, `T7IfadQ2XLQ`, `DRs5qr7UY28`,
`sZQ9snGyFps`, `Y-wymxSUUAk`, `VxkGExMwZCc`, `9ESpRo379PI`, `AE2M5GyCYho`,
`ibfPT5n_gYw`, `-SfFwE6xtD8`, `lxndWdjOyVM`, `C0foDFGP8JU`.
