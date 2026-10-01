import React from "react";
import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { color, SAFE, type Position, type Tone, toneColor } from "./tokens";
import { mono } from "./fonts";

export const CLAMP = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
export const EASE_OUT = Easing.bezier(0.16, 1, 0.3, 1);

// Entrance spring + timed exit, shared by every overlay so motion stays consistent.
export function useEnter(durationInFrames: number, { delay = 0, enter = 12, exit = 8 } = {}) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const inP = spring({ frame: frame - delay, fps, config: { damping: 200 }, durationInFrames: enter });
  const outP = interpolate(frame, [durationInFrames - exit, durationInFrames], [1, 0], CLAMP);
  return { frame, fps, inP, opacity: Math.min(inP, outP), y: (1 - inP) * 36 };
}

export const progress = (frame: number, start: number, length: number) =>
  interpolate(frame, [start, start + Math.max(1, length)], [0, 1], { ...CLAMP, easing: EASE_OUT });

export const Placed: React.FC<{ position?: Position; children: React.ReactNode; style?: React.CSSProperties }> = ({
  position = "upper",
  children,
  style,
}) => {
  const { width, height } = useVideoConfig();
  const vertical = height > width * 1.5;
  const pad = vertical
    ? { top: SAFE.y0, bottom: height - SAFE.y1, left: SAFE.x0, right: width - SAFE.x1 }
    : { top: 96, bottom: 96, left: 96, right: 96 };
  const justify = { top: "flex-start", upper: "flex-start", center: "center", lower: "flex-end", full: "stretch" }[position];
  return (
    <AbsoluteFill
      style={{
        boxSizing: "border-box",
        paddingTop: pad.top + (position === "upper" ? 110 : 0),
        paddingBottom: pad.bottom,
        paddingLeft: pad.left,
        paddingRight: pad.right,
        justifyContent: justify,
        ...style,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

export const cardStyle = (ground: "ink" | "bone" = "ink"): React.CSSProperties => ({
  backgroundColor: ground === "ink" ? "rgba(20,20,15,0.94)" : color.bone,
  border: `2px solid ${ground === "ink" ? color.inkLine : color.boneLine}`,
  borderRadius: 28,
  padding: "36px 42px",
  boxShadow: "0 28px 70px rgba(0,0,0,0.45)",
  boxSizing: "border-box",
});

export const Tag: React.FC<{ children: React.ReactNode; tone?: Tone; style?: React.CSSProperties }> = ({ children, tone = "signal", style }) => (
  <div
    style={{
      alignSelf: "flex-start",
      fontFamily: mono,
      fontWeight: 700,
      fontSize: 26,
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      color: tone === "white" || tone === "mute" ? color.ink : color.ink,
      backgroundColor: toneColor(tone),
      padding: "8px 16px",
      borderRadius: 999,
      ...style,
    }}
  >
    {children}
  </div>
);

// Every piece of proof carries its provenance on screen.
export const SourceLine: React.FC<{ source?: string; illustration?: boolean; ground?: "ink" | "bone" }> = ({ source, illustration, ground = "ink" }) => {
  if (!source && !illustration) return null;
  return (
    <div style={{ display: "flex", gap: 14, alignItems: "center", marginTop: 18 }}>
      {illustration ? <Tag tone="warn">Illustration</Tag> : null}
      {source ? (
        <div style={{ fontFamily: mono, fontSize: 24, color: ground === "ink" ? color.mute : color.slate, letterSpacing: "0.02em" }}>{source}</div>
      ) : null}
    </div>
  );
};

export const norm = (w: string) => w.toLowerCase().replace(/[^\p{L}\p{N}%$]/gu, "");
export const isEmphasis = (word: string, emphasis: string[] = []) => emphasis.some((e) => norm(e) === norm(word));
