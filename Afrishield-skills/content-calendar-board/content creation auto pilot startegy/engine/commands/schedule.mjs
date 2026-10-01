// SCHEDULING — explore initial test windows, then exploit AfriShield's own data.
// Model: PLATFORM × WEEKDAY × HOUR (× objective, once samples allow) → mean learned score.
import { loadDb, saveDb, addHistory, logRun, readJson, resolvePath, todayLocal, isUnknown } from "../lib/core.mjs";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function isoWeekKey(dateIso) {
  const d = new Date(`${dateIso}T12:00:00Z`);
  const day = (d.getUTCDay() + 6) % 7;
  d.setUTCDate(d.getUTCDate() - day + 3);
  const firstThursday = new Date(Date.UTC(d.getUTCFullYear(), 0, 4));
  const week = 1 + Math.round(((d - firstThursday) / 864e5 - 3 + ((firstThursday.getUTCDay() + 6) % 7)) / 7);
  return `${d.getUTCFullYear()}-W${String(week).padStart(2, "0")}`;
}

export function suggest(cfg, { positional, flags }) {
  const [id] = positional;
  const platform = flags.platform;
  if (!id || !platform) throw new Error("Usage: schedule:suggest <content_id> --platform <tiktok|instagram|facebook|linkedin|youtube>");
  const db = loadDb(cfg);
  const item = db.items.find((i) => i.content_id === id);
  if (!item) throw new Error(`No item ${id}`);
  const date = flags.date ?? (isUnknown(item.date) ? todayLocal(cfg.brand.timezone) : item.date);
  const weekday = WEEKDAYS[new Date(`${date}T12:00:00Z`).getUTCDay()];
  const intel = readJson(resolvePath(cfg.paths.intelligence), null);
  const windows = cfg.scheduling.initial_test_windows[platform];
  if (!windows) throw new Error(`No test windows for ${platform}`);

  // Weekly cap for TikTok quality posts.
  if (platform === "tiktok") {
    const week = isoWeekKey(date);
    const booked = db.items.filter((i) => i.publication_data?.schedule?.tiktok && isoWeekKey(i.publication_data.schedule.tiktok.slice(0, 10)) === week && i.content_id !== id).length;
    if (booked >= cfg.production.max_quality_posts_per_week_tiktok) {
      console.log(`TikTok cap reached for ${week} (${booked}/${cfg.production.max_quality_posts_per_week_tiktok}). Suggest another week or publish on the other four platforms only.`);
      return null;
    }
  }

  const hours = intel?.platforms?.[platform]?.dimensions?.hour_bucket ?? {};
  const days = intel?.platforms?.[platform]?.dimensions?.weekday ?? {};
  const min = cfg.scheduling.min_samples_per_bucket;
  const learned = Object.entries(hours).filter(([, v]) => v.n >= min).sort((a, b) => b[1].mean_score - a[1].mean_score);
  const history = db.items.flatMap((i) => Object.entries(i.publication_data ?? {}).filter(([p]) => p === platform).map(([, v]) => v.published_at ?? null)).filter(Boolean);
  const sampledHour = (w) => history.filter((t) => String(t).slice(11, 13) === w.slice(0, 2)).length;

  let pick;
  let reason;
  const explore = learned.length === 0 || Math.random() < cfg.scheduling.exploration_share;
  if (!explore) {
    const [hour, stats] = learned[0];
    pick = hour;
    reason = `learned: ${platform} ${hour} has the best mean score (${stats.mean_score}, n=${stats.n})`;
  } else {
    const ordered = [...windows].sort((a, b) => sampledHour(a) - sampledHour(b) || a.localeCompare(b));
    pick = ordered[0];
    reason = learned.length
      ? `exploring (${Math.round(cfg.scheduling.exploration_share * 100)}% share): least-sampled test window`
      : `no bucket has ≥${min} ${platform} posts yet — rotating hypothesis windows; ${pick} is the least-sampled (${sampledHour(pick)} posts)`;
  }
  const dayNote = days[weekday] ? `${weekday} n=${days[weekday].n}, mean ${days[weekday].mean_score}` : `${weekday} has no ${platform} data yet`;
  const suggestion = { content_id: id, platform, at: `${date}T${pick.length === 5 ? pick : pick.slice(0, 5)}:00`, timezone: cfg.brand.timezone, reason, weekday_note: dayNote };
  console.log(JSON.stringify(suggestion, null, 2));

  if (flags.save) {
    item.publication_data.schedule ??= {};
    item.publication_data.schedule[platform] = suggestion.at;
    addHistory(item, "schedule_slot", { platform, at: suggestion.at, reason });
    saveDb(cfg, db);
    logRun(cfg, "schedule:suggest", suggestion);
  }
  return suggestion;
}
