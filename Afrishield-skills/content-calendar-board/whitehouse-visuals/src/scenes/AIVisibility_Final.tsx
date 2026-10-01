import React from "react";
import {
  AbsoluteFill,
  OffthreadVideo,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { theme, VIDEO } from "../theme";
import { CaptionsForClip } from "./CaptionsOverlay";

// Base clip: 132.098s @ 24fps. We render the composition at 30fps but play
// the source video at its native rate via OffthreadVideo (no re-timing).
export const AI_VIS_DURATION_SEC = 132.1;
export const AI_VIS_TOTAL_FRAMES = Math.round(AI_VIS_DURATION_SEC * VIDEO.fps);

const s = (sec: number) => Math.round(sec * VIDEO.fps);

// Timings derived from whisper-cpp word-level transcript of the actual audio
// (see public/ai-visibility/captions.json). Windows chosen to align with the
// voice-over moment, not the abstract 60-second script plan.
type Overlay = { key: string; fromSec: number; toSec: number };
const OVERLAYS: Overlay[] = [
  { key: "V3", fromSec: 33, toSec: 46 },   // "Restaurant • Catering • Events • Reservations"
  { key: "V4", fromSec: 46, toSec: 56 },   // "Somebody else's land?"
  { key: "V5", fromSec: 56, toSec: 72 },   // "SOCIAL MEDIA = RENTED LAND 🏠"
  { key: "V6", fromSec: 72, toSec: 90 },   // "WEBSITE = OWNED DIGITAL PROPERTY 🌐"
  { key: "V7", fromSec: 90, toSec: 115 },  // "Google → AI → Recommendation"
  { key: "V8", fromSec: 115, toSec: 132 }, // "Is your business AI-visible? …"
];

//
// ---------- Per-visual text cards ----------
//

const CardShell: React.FC<{
  children: React.ReactNode;
  align?: "top" | "bottom";
  bg?: string;
  border?: string;
}> = ({ children, align = "bottom", bg = "rgba(11,15,25,0.86)", border = theme.gold }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({ frame, fps, config: { damping: 14, stiffness: 130 } });
  return (
    <AbsoluteFill
      style={{
        justifyContent: align === "top" ? "flex-start" : "flex-end",
        alignItems: "center",
        padding: align === "top" ? "180px 60px 0" : "0 60px 480px",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          transform: `translateY(${(1 - enter) * (align === "top" ? -30 : 30)}px) scale(${0.94 + enter * 0.06})`,
          opacity: enter,
          padding: "26px 34px",
          borderRadius: 26,
          backgroundColor: bg,
          border: `2px solid ${border}`,
          backdropFilter: "blur(14px)",
          boxShadow: "0 25px 60px rgba(0,0,0,0.55)",
          maxWidth: 960,
          textAlign: "center",
          fontFamily: theme.fontBody,
          color: theme.ink,
        }}
      >
        {children}
      </div>
    </AbsoluteFill>
  );
};

const V3_Business: React.FC = () => (
  <CardShell align="top" border={theme.gold}>
    <div style={{ color: theme.gold, fontSize: 22, fontWeight: 800, letterSpacing: 4, textTransform: "uppercase", marginBottom: 12 }}>
      The business
    </div>
    <div style={{ fontSize: 54, fontWeight: 900, letterSpacing: -0.5, lineHeight: 1.15 }}>
      Restaurant · Catering · Events · Reservations
    </div>
  </CardShell>
);

const V4_Twist: React.FC = () => {
  const frame = useCurrentFrame();
  const pulse = 1 + Math.sin(frame * 0.15) * 0.02;
  return (
    <CardShell align="top" border={theme.accent} bg="rgba(232,93,47,0.14)">
      <div style={{ color: theme.accent, fontSize: 22, fontWeight: 800, letterSpacing: 4, textTransform: "uppercase", marginBottom: 12 }}>
        The twist
      </div>
      <div style={{ fontSize: 82, fontWeight: 900, letterSpacing: -1.5, lineHeight: 1.05, transform: `scale(${pulse})` }}>
        “Somebody else&apos;s land?”
      </div>
    </CardShell>
  );
};

const V5_Rented: React.FC = () => (
  <CardShell align="top" border={theme.red} bg="rgba(226,62,62,0.16)">
    <div style={{ color: "#FFB4B4", fontSize: 22, fontWeight: 800, letterSpacing: 4, textTransform: "uppercase", marginBottom: 12 }}>
      Rented land
    </div>
    <div style={{ fontSize: 68, fontWeight: 900, letterSpacing: -1, lineHeight: 1.1 }}>
      SOCIAL MEDIA = RENTED LAND <span style={{ fontSize: 76 }}>🏠</span>
    </div>
  </CardShell>
);

const V6_Owned: React.FC = () => (
  <CardShell align="top" border={theme.green} bg="rgba(37,211,102,0.14)">
    <div style={{ color: "#9DEBBA", fontSize: 22, fontWeight: 800, letterSpacing: 4, textTransform: "uppercase", marginBottom: 12 }}>
      Owned property
    </div>
    <div style={{ fontSize: 68, fontWeight: 900, letterSpacing: -1, lineHeight: 1.1 }}>
      WEBSITE = OWNED DIGITAL PROPERTY <span style={{ fontSize: 76 }}>🌐</span>
    </div>
    <div style={{ marginTop: 18, fontSize: 28, fontWeight: 700, color: theme.inkDim, letterSpacing: 1 }}>
      white-house-restaurant.com
    </div>
  </CardShell>
);

const V7_Opportunity: React.FC = () => {
  const frame = useCurrentFrame();
  const step = (f: number) =>
    interpolate(frame, [f, f + 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const a1 = step(0), a2 = step(20), a3 = step(40);
  return (
    <CardShell align="top" border={theme.gold}>
      <div style={{ color: theme.gold, fontSize: 22, fontWeight: 800, letterSpacing: 4, textTransform: "uppercase", marginBottom: 16 }}>
        The real opportunity
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 24,
          fontSize: 56,
          fontWeight: 900,
          letterSpacing: -0.5,
          flexWrap: "wrap",
        }}
      >
        <span style={{ opacity: a1, transform: `translateY(${(1 - a1) * 12}px)` }}>Google</span>
        <span style={{ opacity: a2, color: theme.gold }}>→</span>
        <span style={{ opacity: a2, transform: `translateY(${(1 - a2) * 12}px)` }}>AI</span>
        <span style={{ opacity: a3, color: theme.gold }}>→</span>
        <span style={{ opacity: a3, transform: `translateY(${(1 - a3) * 12}px)`, color: theme.gold }}>
          Recommendation
        </span>
      </div>
    </CardShell>
  );
};

const V8_CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const line2 = interpolate(frame, [s(1.6), s(2.2)], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const brand = spring({ frame: frame - s(3.4), fps, config: { damping: 12, stiffness: 130 } });
  return (
    <CardShell align="top" border={theme.gold} bg="rgba(11,15,25,0.9)">
      <div style={{ color: theme.gold, fontSize: 22, fontWeight: 800, letterSpacing: 4, textTransform: "uppercase", marginBottom: 12 }}>
        Ask yourself
      </div>
      <div style={{ fontSize: 72, fontWeight: 900, letterSpacing: -1.2, lineHeight: 1.1 }}>
        Is your business <span style={{ color: theme.gold }}>AI-visible?</span>
      </div>
      <div
        style={{
          marginTop: 18,
          fontSize: 34,
          fontWeight: 700,
          color: theme.ink,
          opacity: line2,
          transform: `translateY(${(1 - line2) * 10}px)`,
        }}
      >
        Comment <span style={{ color: theme.gold, fontWeight: 900 }}>“AI”</span> and we&apos;ll show you how to check.
      </div>
      <div
        style={{
          marginTop: 22,
          fontSize: 30,
          fontWeight: 900,
          letterSpacing: 6,
          color: theme.gold,
          opacity: brand,
          transform: `scale(${0.9 + brand * 0.1})`,
        }}
      >
        AFRISHIELD AI
      </div>
    </CardShell>
  );
};

const OVERLAY_COMPONENTS: Record<string, React.FC> = {
  V3: V3_Business,
  V4: V4_Twist,
  V5: V5_Rented,
  V6: V6_Owned,
  V7: V7_Opportunity,
  V8: V8_CTA,
};

//
// ---------- Root composition ----------
//

export const AIVisibility_Final: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      {/* Base video */}
      <OffthreadVideo src={staticFile("ai-visibility/base.mp4")} />

      {/* Timed on-screen text callouts (Visual 2 doc) */}
      {OVERLAYS.map((o) => {
        const Comp = OVERLAY_COMPONENTS[o.key];
        return (
          <Sequence
            key={o.key}
            from={s(o.fromSec)}
            durationInFrames={s(o.toSec - o.fromSec)}
            layout="absolute-fill"
            name={o.key}
          >
            <Comp />
          </Sequence>
        );
      })}

      {/* Lip-sync captions over the entire clip */}
      <CaptionsForClip
        jsonPath="ai-visibility/captions.json"
        offsetSeconds={0}
        totalDurationInFrames={AI_VIS_TOTAL_FRAMES}
      />
    </AbsoluteFill>
  );
};
