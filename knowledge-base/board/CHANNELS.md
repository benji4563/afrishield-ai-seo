# Board channels — sources for the evolving-knowledge ingestion

> **Updated 2026-10-12.** Ingestion now runs in the local scheduled task
> `afrishield-board-update` (Saturdays), not in a cloud routine. From that PC the RSS
> feeds below return 404, so new uploads are listed with
> `yt-dlp --flat-playlist --playlist-end 6 --print "%(id)s | %(duration_string)s | %(title)s" https://www.youtube.com/channel/<channel_id>/videos`.
> Transcripts come from a Firecrawl scrape of the watch URL (yt-dlp `en-orig`
> captions as fallback), and on-screen material from the `/watch` skill, for a
> chosen section only. Changes are committed to `master` directly — no PR branch.
> The channel ids, the ledger and the copyright rule below are unchanged.

The original design read each member's latest uploads via the YouTube
**RSS feed** (curl-fetchable, no API key):

```
https://www.youtube.com/feeds/videos.xml?channel_id=<CHANNEL_ID>
```

If a `channel_id` below is `RESOLVE`, the routine resolves it first by fetching the
channel/handle page and extracting the id:

```bash
curl -sL "https://www.youtube.com/@<handle>" | grep -oE '"channelId":"UC[^"]+"' | head -1
```

| Advisor | Wiki slug | Handle | channel_id |
|---|---|---|---|
| Julian Goldie | julian-goldie | @JulianGoldieSEO | `UCGpsgNbzdF7BECCVbB1COHw` |
| Koray Tuğberk Gübür | koray-gubur | @TopicalAuthority | `UCXTg_CjVldLQ1RH8jxTTqiw` |
| Wes McDowell | wes-mcdowell | @WesMcDowellInc | `UCMq1R1LgS04lIKdpLh_OS1w` |
| Mike King (iPullRank) | mike-king | @iPullRank (see note) | `UCttOymj_FLE8d7xA7rEbsTw` |
| Dan Martell | dan-martell | @DanMartell | `UCA-mWX9CvCTVFWRMb9bKc9w` |
| Jono Catliff | jono-catliff | @jonocatliff | `UCnzxPyNnn8jk4bHFk3JUBhA` |

When a `RESOLVE` is turned into a real id, the routine updates this table on its PR
branch so the lookup is cached next time.

**Note on Mike King / iPullRank (resolved 2026-07-29):** the `@iPullRank`
handle itself resolves to Mike King's old personal YouTube channel (dormant
since ~2021, no SEO content — camera tests, one-off clips). His current SEO
Week talks / GEO content are posted on the separate **iPullRank company
channel**, handle `@iPullRank` shown on ipullrank.com but a different
underlying channel ID (`UCttOymj_FLE8d7xA7rEbsTw`, channel name "iPullRank").
The table above has been pointed at the company channel since that's where
the actual doctrine-relevant content lives.

## Ledger

Each processed video is recorded in `knowledge-base/board/ingested/<slug>.md` (video
id + date + verdict: ingested / skipped-off-niche / skipped-nothing-new) so nothing is
ingested twice.

## Depth
The routine does **full-video analysis**: it fetches each new video's auto-transcript
(via `yt-dlp`) to a temp dir **outside the repo** (`/tmp/caps`), reads the whole thing
to understand it, extracts the new ideas, then **deletes the transcript**. Only the
distilled takeaways are kept. RSS title+description is the fallback if a transcript
cannot be obtained (marked `depth=shallow` in the ledger).

## Copyright rule (non-negotiable)
A transcript/caption is **ephemeral working input only** — read it, paraphrase it,
delete it. Store **only original-wording, transformative takeaways** (the new idea and
why it matters to our niche, a sentence or two, with the source link). **Never** write
transcripts, captions, or verbatim/near-verbatim excerpts into the repo, wiki, ledger,
or PR. If the only way to capture a point is to copy wording, paraphrase it or skip it.
