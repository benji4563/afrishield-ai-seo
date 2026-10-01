import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { theme } from "../theme";

// VISUAL 3 — THE BUSINESS | 14–21 sec (7s @ 30fps = 210 frames)
// Visual: Rapid cuts: buffet → beautifully plated Cameroonian food → European dish → catering/event setup → people dining.

interface CutInfo {
  tag: string;
  title: string;
  subtitle: string;
  imgSrc: string;
  highlight: string;
}

const CUTS: CutInfo[] = [
  {
    tag: "01 / HIGH-VOLUME BUFFET",
    title: "The 8,500 FCFA Engine",
    subtitle: "Endless buffet line-up · The core daily cashflow driver",
    imgSrc: staticFile("wh/buffet-house.webp"),
    highlight: "8,500 FCFA / cover",
  },
  {
    tag: "02 / PLATED CAMEROONIAN CUISINE",
    title: "Authentic Local Pride",
    subtitle: "Ndolé, Eru, Mbongo Tchobi & fresh grilled fish",
    imgSrc: staticFile("wh/buffet-african.webp"),
    highlight: "Top Rated National Food",
  },
  {
    tag: "03 / CONTINENTAL & EUROPEAN",
    title: "Dual Menu Mastery",
    subtitle: "Full European menu competing directly with French chains",
    imgSrc: staticFile("wh/buffet-european.webp"),
    highlight: "Bilingual Diners & Expats",
  },
  {
    tag: "04 / CATERING & BANQUETS",
    title: "High-Ticket Events",
    subtitle: "Enterprise conferences, ministerial dinners & weddings",
    imgSrc: staticFile("wh/canopy.webp"),
    highlight: "10M–50M FCFA Contracts",
  },
  {
    tag: "05 / 200,000+ ANNUAL DINERS",
    title: "Relentless Foot Traffic",
    subtitle: "2.5B–3.0B FCFA estimated turnover across 4 locations",
    imgSrc: staticFile("wh/cutlery.webp"),
    highlight: "Douala & Yaoundé Packed",
  },
];

const FRAMES_PER_CUT = 42; // 210 frames / 5 cuts = 42 frames (1.4s) each

export const Visual3_Business: React.FC = () => {
  const frame = useCurrentFrame();

  const cutIndex = Math.min(CUTS.length - 1, Math.floor(frame / FRAMES_PER_CUT));
  const localFrame = frame % FRAMES_PER_CUT;
  const currentCut = CUTS[cutIndex];

  // Dynamic Ken Burns scale effect per cut
  const scale = interpolate(localFrame, [0, FRAMES_PER_CUT], [1.0, 1.15], {
    extrapolateRight: "clamp",
  });

  // White/gold flash at transition
  const flash = interpolate(localFrame, [0, 4, 12], [0.85, 0.4, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Card slide-up
  const cardY = interpolate(localFrame, [0, 8], [40, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const cardOpacity = interpolate(localFrame, [0, 6], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: theme.bg,
        color: theme.ink,
        fontFamily: theme.fontBody,
        overflow: "hidden",
      }}
    >
      {/* Background Image with Ken Burns animation */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: `scale(${scale})`,
          transformOrigin: cutIndex % 2 === 0 ? "center center" : "60% 40%",
        }}
      >
        <Img
          src={currentCut.imgSrc}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "brightness(0.72) contrast(1.1)",
          }}
        />
      </div>

      {/* Cinematic Vignette & Gradient Overlays */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(11,15,25,0.85) 0%, rgba(11,15,25,0.1) 35%, rgba(11,15,25,0.3) 60%, rgba(11,15,25,0.95) 100%)",
        }}
      />

      {/* Transition Flash */}
      {flash > 0.01 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "#FFFFFF",
            opacity: flash * 0.45,
            pointerEvents: "none",
          }}
        />
      )}

      {/* Top Segmented Progress Bar (5 segments for 5 cuts) */}
      <div
        style={{
          position: "absolute",
          top: 60,
          left: 40,
          right: 40,
          display: "flex",
          gap: 8,
          zIndex: 30,
        }}
      >
        {CUTS.map((_, i) => {
          const isPast = i < cutIndex;
          const isCurrent = i === cutIndex;
          const progress = isPast ? 1 : isCurrent ? localFrame / FRAMES_PER_CUT : 0;
          return (
            <div
              key={i}
              style={{
                flex: 1,
                height: 6,
                borderRadius: 3,
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${progress * 100}%`,
                  height: "100%",
                  backgroundColor: theme.gold,
                  boxShadow: isCurrent ? `0 0 10px ${theme.gold}` : "none",
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Top Title Tag */}
      <div
        style={{
          position: "absolute",
          top: 90,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          zIndex: 25,
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            padding: "8px 22px",
            borderRadius: 999,
            backgroundColor: "rgba(11, 15, 25, 0.8)",
            border: `1px solid ${theme.gold}`,
            color: theme.gold,
            fontSize: 20,
            fontWeight: 800,
            letterSpacing: 3,
            textTransform: "uppercase",
            backdropFilter: "blur(10px)",
          }}
        >
          {currentCut.tag}
        </div>
      </div>

      {/* Floating Center Key Metric Badge */}
      <div
        style={{
          position: "absolute",
          top: "44%",
          right: 40,
          padding: "12px 24px",
          borderRadius: 16,
          backgroundColor: "rgba(212, 162, 76, 0.95)",
          color: "#0B0F19",
          fontWeight: 900,
          fontSize: 24,
          letterSpacing: -0.5,
          boxShadow: "0 10px 30px rgba(0,0,0,0.6)",
          zIndex: 20,
          opacity: cardOpacity,
          transform: `translateY(${cardY}px)`,
        }}
      >
        ★ {currentCut.highlight}
      </div>

      {/* Bottom Content Card */}
      <div
        style={{
          position: "absolute",
          bottom: 70,
          left: 40,
          right: 40,
          padding: "28px 32px",
          borderRadius: 24,
          backgroundColor: "rgba(11, 15, 25, 0.88)",
          border: "1.5px solid rgba(212, 162, 76, 0.4)",
          backdropFilter: "blur(16px)",
          boxShadow: "0 20px 50px rgba(0,0,0,0.7)",
          transform: `translateY(${cardY}px)`,
          opacity: cardOpacity,
          zIndex: 25,
        }}
      >
        <div
          style={{
            color: theme.gold,
            fontSize: 20,
            fontWeight: 700,
            letterSpacing: 2,
            textTransform: "uppercase",
            marginBottom: 6,
          }}
        >
          THE BUSINESS ENGINE
        </div>
        <div
          style={{
            color: theme.ink,
            fontSize: 42,
            fontWeight: 900,
            letterSpacing: -1,
            lineHeight: 1.15,
          }}
        >
          {currentCut.title}
        </div>
        <div
          style={{
            color: theme.inkDim,
            fontSize: 24,
            fontWeight: 500,
            marginTop: 10,
            lineHeight: 1.35,
          }}
        >
          {currentCut.subtitle}
        </div>
      </div>
    </AbsoluteFill>
  );
};
