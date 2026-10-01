// AFRISHIELD SIGNAL STYLE tokens. Must match guides/visual-system.md.
// Brand values come from the afrishieldai.com palette (green scale, ink, bone).
export const color = {
  ink: "#14140F",
  inkSoft: "#1D1D17",
  inkLine: "#2E2E26",
  bone: "#F4F3EE",
  boneLine: "#DEDCD2",
  signal: "#5CBE91", // green.300 — THE accent on dark grounds
  signalDeep: "#0F7248", // green.600 — accent on light grounds
  signalGlow: "#93D8B7", // green.200
  signalDark: "#073F27", // green.800
  white: "#FFFFFF",
  mute: "#8B8A80",
  slate: "#5B5A52",
  warn: "#F2A93B", // video-semantic only
  danger: "#E5484D", // video-semantic only
} as const;

export type Tone = "signal" | "warn" | "danger" | "white" | "mute";
export const toneColor = (t: Tone = "signal") =>
  ({ signal: color.signal, warn: color.warn, danger: color.danger, white: color.white, mute: color.mute })[t];

export const VIDEO = { width: 1080, height: 1920, fps: 30 } as const;
export const CAROUSEL = { width: 1080, height: 1350 } as const;

// Composite safe area across TikTok / Reels / Shorts / FB Reels (see visual-system.md).
export const SAFE = { x0: 90, x1: 940, y0: 230, y1: 1500 } as const;

export const STROKE =
  "-4px -4px 0 #14140F, 4px -4px 0 #14140F, -4px 4px 0 #14140F, 4px 4px 0 #14140F, 0 4px 0 #14140F, 0 10px 28px rgba(0,0,0,0.85)";

export type Position = "top" | "upper" | "center" | "lower" | "full";
export type BaseProps = { durationInFrames: number; position?: Position };
