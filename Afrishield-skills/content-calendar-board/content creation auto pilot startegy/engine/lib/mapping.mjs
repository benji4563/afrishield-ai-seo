// Maps every known calendar source into the common content object.
// Rule: copy what the source says; anything the source does not say is UNKNOWN.

import { UNKNOWN, orUnknown, isUnknown, nowIso } from "./core.mjs";

export const CALENDAR_COLUMNS = [
  "Date", "Day", "Month", "Week", "Industry", "Niche/Sub-niche", "Content Pillar", "Content Series", "Content Type", "Hook",
  "Story Angle", "Main Topic", "Key Lesson", "Video/Demo Idea", "DIY Steps", "CTA", "TikTok Idea", "Instagram Reel Idea",
  "Facebook Reel Idea", "YouTube Short Idea", "YouTube Long-form Idea", "LinkedIn Post Angle", "Instagram Story",
  "Facebook Story", "Caption", "SEO Keywords", "Hashtags", "Status", "Asset Link", "Performance", "Views", "Engagement", "Leads",
];

// Fields that enrichment agents own. If an agent has filled one, a changed source row
// must not overwrite it silently.
export const ENRICHABLE = [
  "title", "objective", "problem", "insight", "proof", "structure", "visual_strategy", "remotion_template", "real_story", "humor", "claims",
];

const base = () => ({
  created_at: nowIso(),
  updated_at: nowIso(),
  scheduled_at: null,
  published_at: null,
  review_flag: null,
  idea_score: null,
  score_breakdown: null,
  score_band: null,
  title: UNKNOWN,
  objective: UNKNOWN,
  problem: UNKNOWN,
  insight: UNKNOWN,
  proof: UNKNOWN,
  structure: UNKNOWN,
  visual_strategy: UNKNOWN,
  remotion_template: UNKNOWN,
  real_story: { evaluated: false, story_id: null, kind: UNKNOWN, note: "" },
  humor: { evaluated: false, level: UNKNOWN, type: UNKNOWN, angle: UNKNOWN, line: UNKNOWN },
  claims: [],
  flags: [],
  approvals: { calendar: null, publish: null },
  qa: null,
  publication_data: {},
  performance: {},
  links: {},
  history: [],
});

export function mapCalendarRow(row, file, cfg) {
  const legacy = row.Status || "Not Started";
  const status = cfg.legacy_status_map[legacy] ?? "APPROVED";
  const views = Number(row.Views) || 0;
  return {
    ...base(),
    source: { type: "calendar-csv", file, row_key: `csv:${file}:${row.Day}` },
    status,
    production_status: orUnknown(legacy),
    publication_status: status === "PUBLISHED" ? "Published" : "Unpublished",
    lane: "primary",
    date: orUnknown(row.Date),
    day_label: orUnknown(row.Day),
    week: orUnknown(row.Week),
    month_theme: orUnknown(row.Month),
    topic: orUnknown(row["Main Topic"]),
    core_idea: orUnknown(row["Main Topic"]),
    pillar: orUnknown(row["Content Pillar"]),
    series: isUnknown(row["Content Series"]) ? "General" : row["Content Series"].trim(),
    format: orUnknown(row["Content Type"]),
    industry: orUnknown(row.Industry),
    audience: orUnknown(row["Niche/Sub-niche"]),
    hook: orUnknown(row.Hook),
    context: orUnknown(row["Story Angle"]),
    lesson: orUnknown(row["Key Lesson"]),
    cta: orUnknown(row.CTA),
    visual_concept: orUnknown(row["Video/Demo Idea"]),
    diy_steps: orUnknown(row["DIY Steps"]),
    platform_versions: {
      tiktok: orUnknown(row["TikTok Idea"]),
      instagram_reel: orUnknown(row["Instagram Reel Idea"]),
      facebook_reel: orUnknown(row["Facebook Reel Idea"]),
      youtube_short: orUnknown(row["YouTube Short Idea"]),
      youtube_long: orUnknown(row["YouTube Long-form Idea"]),
      linkedin: orUnknown(row["LinkedIn Post Angle"]),
      instagram_story: orUnknown(row["Instagram Story"]),
      facebook_story: orUnknown(row["Facebook Story"]),
      // Not in the original 33 columns — written by platform-adaptation.
      instagram_carousel: UNKNOWN,
      linkedin_carousel: UNKNOWN,
      threads: UNKNOWN,
    },
    caption: orUnknown(row.Caption),
    seo_keywords: orUnknown(row["SEO Keywords"]),
    hashtags: orUnknown(row.Hashtags),
    publication_data: isUnknown(row["Asset Link"]) ? {} : { asset_link: row["Asset Link"] },
    performance: views || row.Performance ? { views, engagement: row.Engagement, leads: row.Leads, note: row.Performance } : {},
  };
}

export function mapFreestylePost(post, file) {
  return {
    ...base(),
    source: { type: "freestyle", file, row_key: `freestyle:${post.id}` },
    status: "APPROVED",
    production_status: "Not Started",
    publication_status: "Unpublished",
    lane: "secondary",
    date: UNKNOWN,
    day_label: UNKNOWN,
    week: UNKNOWN,
    month_theme: "Freestyle Content Lab",
    title: orUnknown(post.title),
    topic: orUnknown(post.title),
    core_idea: orUnknown(post.title),
    pillar: UNKNOWN,
    series: "Freestyle",
    format: orUnknown(post.format),
    industry: "Cross-Industry",
    audience: orUnknown(post.searchIntent),
    hook: orUnknown(post.hookSpoken),
    on_screen_hook: orUnknown(post.hookText),
    context: orUnknown(post.searchIntent),
    insight: Array.isArray(post.breakdown) && post.breakdown.length ? post.breakdown.join(" | ") : UNKNOWN,
    lesson: orUnknown(post.payoff),
    cta: post.cta ? `Comment ${post.cta}` : UNKNOWN,
    cta_line: orUnknown(post.ctaLine),
    visual_concept: orUnknown(post.receipt),
    diy_steps: UNKNOWN,
    platform_versions: {
      tiktok: UNKNOWN, instagram_reel: UNKNOWN, facebook_reel: UNKNOWN, youtube_short: UNKNOWN,
      youtube_long: UNKNOWN, linkedin: UNKNOWN, instagram_story: UNKNOWN, facebook_story: UNKNOWN,
      instagram_carousel: UNKNOWN, linkedin_carousel: UNKNOWN, threads: UNKNOWN,
    },
    caption: UNKNOWN,
    seo_keywords: Array.isArray(post.searchQueries) ? post.searchQueries.join(", ") : UNKNOWN,
    hashtags: orUnknown(post.hashtags),
  };
}

// Back to the 33-column calendar shape (+ living-DB columns) for export.
export function toCalendarRow(item) {
  const v = (x) => (isUnknown(x) ? "" : x);
  const p = item.platform_versions ?? {};
  const pv = (k) => (typeof p[k] === "object" && p[k] !== null ? p[k].summary ?? "" : v(p[k]));
  return {
    Date: v(item.date), Day: v(item.day_label), Month: v(item.month_theme), Week: v(item.week), Industry: v(item.industry),
    "Niche/Sub-niche": v(item.audience), "Content Pillar": v(item.pillar), "Content Series": item.series === "General" ? "—" : v(item.series),
    "Content Type": v(item.format), Hook: v(item.hook), "Story Angle": v(item.context), "Main Topic": v(item.topic), "Key Lesson": v(item.lesson),
    "Video/Demo Idea": v(item.visual_concept), "DIY Steps": v(item.diy_steps) || "—", CTA: v(item.cta),
    "TikTok Idea": pv("tiktok"), "Instagram Reel Idea": pv("instagram_reel"), "Facebook Reel Idea": pv("facebook_reel"),
    "YouTube Short Idea": pv("youtube_short"), "YouTube Long-form Idea": pv("youtube_long") || "—", "LinkedIn Post Angle": pv("linkedin"),
    "Instagram Story": pv("instagram_story"), "Facebook Story": pv("facebook_story"), Caption: v(item.caption), "SEO Keywords": v(item.seo_keywords),
    Hashtags: v(item.hashtags), Status: item.production_status && !isUnknown(item.production_status) ? item.production_status : item.status,
    "Asset Link": item.publication_data?.asset_link ?? "", Performance: item.performance?.note ?? "",
    Views: item.performance?.views ?? "", Engagement: item.performance?.engagement ?? "", Leads: item.performance?.leads ?? "",
    content_id: item.content_id, db_status: item.status, lane: item.lane ?? "", idea_score: item.idea_score ?? "", score_band: item.score_band ?? "",
    review_flag: item.review_flag ?? "", open_flags: (item.flags ?? []).filter((f) => !f.resolved).map((f) => f.type).join("; "),
    story_id: item.real_story?.story_id ?? "", humor_level: item.humor?.level ?? "", source: item.source?.row_key ?? "",
  };
}
