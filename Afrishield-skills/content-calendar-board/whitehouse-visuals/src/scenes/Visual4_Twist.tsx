import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { theme } from "../theme";

// VISUAL 4 — THE TWIST | 21–28 sec (7s @ 30fps = 210 frames)
// Visual: a cartoon Character looks directly into camera.
// Behind them, Instagram, Facebook and TikTok icons appear around a restaurant.

export const Visual4_Twist: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Subtle breathing zoom on the character
  const charScale = interpolate(frame, [0, 210], [1.02, 1.09], {
    extrapolateRight: "clamp",
  });

  // Entrance spring animations for each social icon
  const igSpring = spring({
    frame: frame - 18,
    fps,
    config: { damping: 12, stiffness: 140 },
  });
  const fbSpring = spring({
    frame: frame - 32,
    fps,
    config: { damping: 12, stiffness: 140 },
  });
  const ttSpring = spring({
    frame: frame - 46,
    fps,
    config: { damping: 12, stiffness: 140 },
  });

  // Floating bobbing motion
  const igBob = Math.sin(frame * 0.09) * 12;
  const fbBob = Math.sin(frame * 0.08 + 1.5) * 14;
  const ttBob = Math.sin(frame * 0.1 + 3.0) * 12;

  // Bottom text transition at frame 95
  const text1Opacity = interpolate(frame, [85, 95], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const text2Opacity = interpolate(frame, [95, 105], [0, 1], {
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
      {/* Background Character looking directly into camera */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: `scale(${charScale})`,
          transformOrigin: "50% 30%",
        }}
      >
        <Img
          src={staticFile("visuals/character_twist.jpg")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "contrast(1.05) brightness(0.92)",
          }}
        />
      </div>

      {/* Dark Vignette and Dramatic Lighting */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 50% 35%, rgba(11,15,25,0.05) 0%, rgba(11,15,25,0.4) 55%, rgba(11,15,25,0.92) 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(11,15,25,0.85) 0%, transparent 22%, transparent 60%, rgba(11,15,25,0.95) 100%)",
        }}
      />

      {/* Top Header Badge */}
      <div
        style={{
          position: "absolute",
          top: 70,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          zIndex: 30,
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            padding: "8px 24px",
            borderRadius: 999,
            backgroundColor: "rgba(11, 15, 25, 0.85)",
            border: `1.5px solid ${theme.accent}`,
            color: theme.accent,
            fontSize: 20,
            fontWeight: 800,
            letterSpacing: 3,
            textTransform: "uppercase",
            boxShadow: `0 0 20px rgba(232, 93, 47, 0.25)`,
          }}
        >
          <span style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: theme.accent }} />
          THE TWIST · 21–28 SEC
        </div>
        <h2
          style={{
            fontSize: 48,
            fontWeight: 900,
            letterSpacing: -1,
            marginTop: 14,
            color: theme.ink,
            textAlign: "center",
            textShadow: "0 4px 20px rgba(0,0,0,0.9)",
          }}
        >
          Where Does Attention Go?
        </h2>
      </div>

      {/* FLOATING SOCIAL ICONS AROUND THE RESTAURANT & CHARACTER */}

      {/* 1. INSTAGRAM BADGE (Top-Left) */}
      <div
        style={{
          position: "absolute",
          top: 240,
          left: 45,
          transform: `scale(${igSpring}) translateY(${igBob}px)`,
          transformOrigin: "center center",
          opacity: interpolate(frame, [16, 22], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          zIndex: 25,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div
            style={{
              width: 110,
              height: 110,
              borderRadius: 30,
              background: "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 15px 35px rgba(214, 36, 159, 0.5)",
              border: "3px solid #FFF",
            }}
          >
            {/* SVG Camera Glyph */}
            <svg width="58" height="58" viewBox="0 0 24 24" fill="none" stroke="#FFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </div>

          <div
            style={{
              padding: "6px 14px",
              borderRadius: 12,
              backgroundColor: "rgba(11, 15, 25, 0.9)",
              border: "1.5px solid #d6249f",
              color: "#FFF",
              fontSize: 18,
              fontWeight: 800,
              whiteSpace: "nowrap",
              boxShadow: "0 4px 15px rgba(0,0,0,0.6)",
            }}
          >
            Reach: -85% 📉
          </div>
        </div>
      </div>

      {/* 2. FACEBOOK BADGE (Top-Right) */}
      <div
        style={{
          position: "absolute",
          top: 290,
          right: 45,
          transform: `scale(${fbSpring}) translateY(${fbBob}px)`,
          transformOrigin: "center center",
          opacity: interpolate(frame, [30, 36], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          zIndex: 25,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div
            style={{
              width: 105,
              height: 105,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #1877F2, #0C56C4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 15px 35px rgba(24, 119, 242, 0.5)",
              border: "3px solid #FFF",
            }}
          >
            <span style={{ fontSize: 62, fontWeight: 900, color: "#FFF", marginTop: 4, fontFamily: "sans-serif" }}>
              f
            </span>
          </div>

          <div
            style={{
              padding: "6px 14px",
              borderRadius: 12,
              backgroundColor: "rgba(11, 15, 25, 0.9)",
              border: "1.5px solid #1877F2",
              color: "#FFF",
              fontSize: 18,
              fontWeight: 800,
              whiteSpace: "nowrap",
              boxShadow: "0 4px 15px rgba(0,0,0,0.6)",
            }}
          >
            Pay to Boost 💳
          </div>
        </div>
      </div>

      {/* 3. TIKTOK BADGE (Middle-Left) */}
      <div
        style={{
          position: "absolute",
          top: 550,
          left: 35,
          transform: `scale(${ttSpring}) translateY(${ttBob}px)`,
          transformOrigin: "center center",
          opacity: interpolate(frame, [44, 50], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          zIndex: 25,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div
            style={{
              width: 110,
              height: 110,
              borderRadius: 30,
              backgroundColor: "#000000",
              border: "2.5px solid #00F2FE",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 15px 35px rgba(254, 44, 85, 0.4), 0 0 20px rgba(0, 242, 254, 0.3)",
              position: "relative",
            }}
          >
            <svg width="56" height="56" viewBox="0 0 24 24" fill="none">
              <path
                d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 1 1-2-2.75V9.41a6.34 6.34 0 1 0 5.45 6.26V9.06a8.28 8.28 0 0 0 4.77 1.52v-3.9z"
                fill="#FE2C55"
              />
              <path
                d="M18.59 5.69a4.83 4.83 0 0 1-3.77-4.25V1h-3.45v13.67a2.89 2.89 0 1 1-2-2.75V8.41a6.34 6.34 0 1 0 5.45 6.26V8.06a8.28 8.28 0 0 0 4.77 1.52v-3.9z"
                fill="#00F2FE"
                style={{ mixBlendMode: "screen" }}
              />
            </svg>
          </div>

          <div
            style={{
              padding: "6px 14px",
              borderRadius: 12,
              backgroundColor: "rgba(11, 15, 25, 0.9)",
              border: "1.5px solid #FE2C55",
              color: "#FFF",
              fontSize: 18,
              fontWeight: 800,
              whiteSpace: "nowrap",
              boxShadow: "0 4px 15px rgba(0,0,0,0.6)",
            }}
          >
            Algorithm Shift ⚠️
          </div>
        </div>
      </div>

      {/* Floating Alert Card (Middle-Right) */}
      <div
        style={{
          position: "absolute",
          top: 610,
          right: 35,
          padding: "14px 20px",
          borderRadius: 18,
          backgroundColor: "rgba(226, 62, 62, 0.92)",
          color: "#FFF",
          fontWeight: 800,
          fontSize: 22,
          boxShadow: "0 10px 30px rgba(226, 62, 62, 0.4)",
          zIndex: 25,
          opacity: interpolate(frame, [60, 70], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          transform: `scale(${interpolate(frame, [60, 70], [0.8, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })})`,
        }}
      >
        🚨 0 Followers Owned!
      </div>

      {/* Bottom Kinetic Text Callout */}
      <div
        style={{
          position: "absolute",
          bottom: 70,
          left: 40,
          right: 40,
          padding: "30px 32px",
          borderRadius: 24,
          backgroundColor: "rgba(11, 15, 25, 0.92)",
          border: `2px solid ${theme.gold}`,
          backdropFilter: "blur(18px)",
          boxShadow: "0 25px 60px rgba(0,0,0,0.8)",
          zIndex: 35,
          minHeight: 180,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* State 1: 0 - 95 frames */}
        <div
          style={{
            position: "absolute",
            inset: "20px 30px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            opacity: text1Opacity,
            pointerEvents: text1Opacity === 0 ? "none" : "auto",
          }}
        >
          <div style={{ color: theme.gold, fontSize: 20, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase" }}>
            The African Restaurant Trap
          </div>
          <div style={{ color: theme.ink, fontSize: 38, fontWeight: 900, letterSpacing: -0.5, marginTop: 8, lineHeight: 1.2 }}>
            Most owners think social media is where their business lives...
          </div>
        </div>

        {/* State 2: 95 - 210 frames */}
        <div
          style={{
            position: "absolute",
            inset: "20px 30px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            opacity: text2Opacity,
            pointerEvents: text2Opacity === 0 ? "none" : "auto",
          }}
        >
          <div style={{ color: theme.red, fontSize: 20, fontWeight: 800, letterSpacing: 3, textTransform: "uppercase" }}>
            The Brutal Reality
          </div>
          <div style={{ color: theme.ink, fontSize: 38, fontWeight: 900, letterSpacing: -0.5, marginTop: 8, lineHeight: 1.2 }}>
            ...Until Meta changes the algorithm on a Tuesday morning.
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
