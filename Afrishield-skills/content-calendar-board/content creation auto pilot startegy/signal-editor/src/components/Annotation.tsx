import React from "react";
import { AbsoluteFill, useVideoConfig } from "remotion";
import { color, toneColor, type BaseProps, type Tone } from "../signal/tokens";
import { display, body } from "../signal/fonts";
import { progress, useEnter } from "../signal/primitives";

type Pt = { x: number; y: number };

// Coordinates are composition pixels (1080×1920 for vertical video).

// ---------------------------------------------------------------- Arrow
export type ArrowProps = BaseProps & { from: Pt; to: Pt; label?: string; curve?: number; tone?: Tone };

export const Arrow: React.FC<ArrowProps> = ({ from, to, label, curve = 0.25, tone = "signal", durationInFrames }) => {
  const { frame, opacity } = useEnter(durationInFrames, { enter: 6 });
  const { width, height } = useVideoConfig();
  const mx = (from.x + to.x) / 2 - (to.y - from.y) * curve;
  const my = (from.y + to.y) / 2 + (to.x - from.x) * curve;
  const draw = progress(frame, 0, 14);
  const head = progress(frame, 12, 6);
  const angle = Math.atan2(to.y - my, to.x - mx);
  const L = 44;
  const c = toneColor(tone);
  return (
    <AbsoluteFill style={{ opacity, pointerEvents: "none" }}>
      <svg width={width} height={height}>
        <path d={`M${from.x},${from.y} Q${mx},${my} ${to.x},${to.y}`} fill="none" stroke={c} strokeWidth={12} strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - draw} />
        <path
          d={`M${to.x - L * Math.cos(angle - 0.5)},${to.y - L * Math.sin(angle - 0.5)} L${to.x},${to.y} L${to.x - L * Math.cos(angle + 0.5)},${to.y - L * Math.sin(angle + 0.5)}`}
          fill="none"
          stroke={c}
          strokeWidth={12}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={head}
        />
      </svg>
      {label ? (
        <div style={{ position: "absolute", left: from.x, top: from.y, translate: "-50% -120%", fontFamily: display, fontWeight: 800, fontSize: 48, color: c, textTransform: "uppercase", textShadow: "0 6px 18px rgba(0,0,0,0.9)", whiteSpace: "nowrap", opacity: draw }}>
          {label}
        </div>
      ) : null}
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- CircleHighlight
export type CircleHighlightProps = BaseProps & { x: number; y: number; w: number; h: number; label?: string; tone?: Tone };

export const CircleHighlight: React.FC<CircleHighlightProps> = ({ x, y, w, h, label, tone = "signal", durationInFrames }) => {
  const { frame, opacity } = useEnter(durationInFrames, { enter: 6 });
  const { width, height } = useVideoConfig();
  const draw = progress(frame, 0, 16);
  const c = toneColor(tone);
  const rx = w / 2 + 24;
  const ry = h / 2 + 20;
  // Slightly open, overshooting stroke reads as hand-drawn.
  const d = `M ${x + rx} ${y} A ${rx} ${ry} 0 1 1 ${x + rx * 0.96} ${y - ry * 0.28}`;
  return (
    <AbsoluteFill style={{ opacity, pointerEvents: "none" }}>
      <svg width={width} height={height}>
        <path d={d} fill="none" stroke={c} strokeWidth={10} strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - draw} transform={`rotate(-4 ${x} ${y})`} />
      </svg>
      {label ? (
        <div style={{ position: "absolute", left: x, top: y + ry + 18, translate: "-50% 0", backgroundColor: c, color: color.ink, fontFamily: display, fontWeight: 800, fontSize: 40, padding: "8px 20px", borderRadius: 14, textTransform: "uppercase", opacity: draw, whiteSpace: "nowrap" }}>
          {label}
        </div>
      ) : null}
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- Callout
export type CalloutProps = BaseProps & { x: number; y: number; text: string; side?: "left" | "right"; tone?: Tone };

export const Callout: React.FC<CalloutProps> = ({ x, y, text, side = "right", tone = "signal", durationInFrames }) => {
  const { frame, opacity, fps } = useEnter(durationInFrames);
  const line = progress(frame, 4, 10);
  const pulse = 1 + 0.18 * Math.sin((frame / fps) * Math.PI * 2);
  const c = toneColor(tone);
  const dx = side === "right" ? 150 : -150;
  const { width, height } = useVideoConfig();
  return (
    <AbsoluteFill style={{ opacity, pointerEvents: "none" }}>
      <svg width={width} height={height}>
        <circle cx={x} cy={y} r={14 * pulse} fill={c} />
        <line x1={x} y1={y} x2={x + dx * line} y2={y - 90 * line} stroke={c} strokeWidth={6} strokeLinecap="round" />
      </svg>
      <div
        style={{
          position: "absolute",
          left: x + dx,
          top: y - 90,
          translate: side === "right" ? "0 -50%" : "-100% -50%",
          maxWidth: 520,
          backgroundColor: "rgba(20,20,15,0.95)",
          border: `3px solid ${c}`,
          borderRadius: 20,
          padding: "16px 22px",
          fontFamily: body,
          fontWeight: 700,
          fontSize: 36,
          color: color.white,
          opacity: line,
        }}
      >
        {text}
      </div>
    </AbsoluteFill>
  );
};
