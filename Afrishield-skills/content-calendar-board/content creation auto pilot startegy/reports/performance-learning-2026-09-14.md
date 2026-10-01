# Performance learning — 2026-09-14

Observations: **6**. Metrics available: reach, shares, comments. **Missing:** retention, follows, saves, keyword_comments, dms, clicks, leads, conversions.

> Scores are per-platform percentile blends weighted by each item's objective (config.analytics.objective_weights), renormalized over the metrics that exist. With missing retention/saves/leads data, the model is an engagement proxy — do not treat it as a conversion model.

## tiktok — 6 posts

**duration_bucket**

| Value | n | Mean score | Lift | Avg views | Avg comments | Confidence |
|---|---|---|---|---|---|---|
| 61–90s | 1 | 0.492 | -0.008 | 118 | 2 | anecdotal |
| 8–29s | 1 | 0.492 | -0.008 | 124 | 0 | anecdotal |
| >90s | 1 | 0.856 | 0.356 | 139 | 4 | anecdotal |
| 30–60s | 3 | 0.386 | -0.114 | 117 | 1 | emerging |

**weekday**

| Value | n | Mean score | Lift | Avg views | Avg comments | Confidence |
|---|---|---|---|---|---|---|
| Wed | 2 | 0.333 | -0.167 | 112 | 1.5 | anecdotal |
| Sun | 2 | 0.439 | -0.061 | 123 | 1 | anecdotal |
| Sat | 1 | 0.856 | 0.356 | 139 | 4 | anecdotal |
| Fri | 1 | 0.598 | 0.098 | 125 | 0 | anecdotal |

**hour_bucket**

| Value | n | Mean score | Lift | Avg views | Avg comments | Confidence |
|---|---|---|---|---|---|---|
| 08:00 | 1 | 0.492 | -0.008 | 118 | 2 | anecdotal |
| 11:00 | 1 | 0.492 | -0.008 | 124 | 0 | anecdotal |
| 21:00 | 1 | 0.856 | 0.356 | 139 | 4 | anecdotal |
| 04:00 | 1 | 0.174 | -0.326 | 105 | 1 | anecdotal |
| 23:00 | 1 | 0.386 | -0.114 | 122 | 2 | anecdotal |
| 19:00 | 1 | 0.598 | 0.098 | 125 | 0 | anecdotal |

**product_first_opener**

| Value | n | Mean score | Lift | Avg views | Avg comments | Confidence |
|---|---|---|---|---|---|---|
| no | 5 | 0.48 | -0.02 | 122 | 1.8 | emerging |
| yes | 1 | 0.598 | 0.098 | 125 | 0 | anecdotal |

**inline_hashtags**

| Value | n | Mean score | Lift | Avg views | Avg comments | Confidence |
|---|---|---|---|---|---|---|
| no | 2 | 0.674 | 0.174 | 129 | 3 | anecdotal |
| yes | 4 | 0.413 | -0.087 | 119 | 0.8 | emerging |

**story_signal**

| Value | n | Mean score | Lift | Avg views | Avg comments | Confidence |
|---|---|---|---|---|---|---|
| yes | 2 | 0.674 | 0.174 | 129 | 3 | anecdotal |
| no | 4 | 0.413 | -0.087 | 119 | 0.8 | emerging |

## Findings (emerging/reliable)

- tiktok: duration_bucket = 30–60s scores below average (lift -0.114, n=3). — emerging

## Hypotheses to test (anecdotal)

- tiktok: duration_bucket = >90s scores above average (lift 0.356, n=1).
- tiktok: weekday = Wed scores below average (lift -0.167, n=2).
- tiktok: weekday = Sat scores above average (lift 0.356, n=1).
- tiktok: hour_bucket = 21:00 scores above average (lift 0.356, n=1).
- tiktok: hour_bucket = 04:00 scores below average (lift -0.326, n=1).
- tiktok: hour_bucket = 23:00 scores below average (lift -0.114, n=1).
- tiktok: inline_hashtags = no scores above average (lift 0.174, n=2).
- tiktok: story_signal = yes scores above average (lift 0.174, n=2).

## Rules in tension with data

- **afrishield-tiktok-video-script: runtime 52–60s, never over 60s** — Posts over 60s: 61–90s n=1 mean 0.492, avg comments 2; >90s n=1 mean 0.856, avg comments 4. 30–60s: n=3 mean 0.386. → Anecdotal — keep the rule, but A/B test one 75–90s story cut before treating 60s as a hard cap.

## Qualitative observations (cited)

- Every product-first opener (Elodie, AfriShield, 'AI solutions') stayed in the ~100–150-view first FYP bucket. _(../deliverables/tiktok-analysis/obi2026-tiktok-hook-retention-analysis.md)_
- The story-led White House Douala post drew the most comments of the batch. _(../deliverables/tiktok-analysis/obi2026-tiktok-hook-retention-analysis.md)_
- Typos in on-screen text and inline hashtags inside caption sentences correlated with the weakest posts. _(../deliverables/tiktok-analysis/obi2026-tiktok-hook-retention-analysis.md)_