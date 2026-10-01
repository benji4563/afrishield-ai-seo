import React from "react";
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { theme } from "../theme";

// VISUAL 5 (story position) — YOUR WEBSITE IS YOUR DIGITAL PROPERTY
// White House website appears as an owned digital building, with the URL,
// then reveal the real site interface: menu / locations / catering / contact.

export const Visual6_Website: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const buildingSpring = spring({
    frame: frame - 5,
    fps,
    config: { damping: 14, stiffness: 110 },
  });
  const buildingScale = interpolate(buildingSpring, [0, 1], [0.6, 1]);
  const urlOpacity = interpolate(frame, [24, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const digitalPropertyOpacity = interpolate(
    frame,
    [45, 60, 90, 105],
    [0, 1, 1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );
  const websitePanelOpacity = interpolate(frame, [110, 130], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const websitePanelY = interpolate(frame, [110, 130], [80, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const glow = 0.45 + 0.25 * Math.sin(frame * 0.06);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: theme.bg,
        color: theme.ink,
        fontFamily: theme.fontBody,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 50% 45%, #1c2540 0%, #0b0f19 65%, #05080f 100%)",
        }}
      />

      {/* Digital Building */}
      <div
        style={{
          position: "absolute",
          top: 240,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          scale: buildingScale.toString(),
        }}
      >
        <svg width={720} height={860} viewBox="0 0 720 860">
          <defs>
            <linearGradient id="bldg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={theme.goldSoft} />
              <stop offset="100%" stopColor={theme.gold} />
            </linearGradient>
            <linearGradient id="glassGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#79c7ff" />
              <stop offset="100%" stopColor="#2a5fa1" />
            </linearGradient>
          </defs>
          {/* Ground */}
          <rect x={0} y={800} width={720} height={60} fill={theme.gold} opacity={0.5} />
          {/* Building base */}
          <rect x={60} y={720} width={600} height={80} fill="#3a2a1a" />
          {/* Main tower */}
          <rect x={120} y={140} width={480} height={580} fill="url(#bldg)" rx={6} />
          {/* Roof / crown */}
          <polygon points="120,140 600,140 480,60 240,60" fill={theme.goldSoft} />
          <rect x={340} y={20} width={40} height={60} fill={theme.gold} />
          {/* Windows grid */}
          {Array.from({ length: 6 }).map((_, row) =>
            Array.from({ length: 5 }).map((_, col) => (
              <rect
                key={`${row}-${col}`}
                x={160 + col * 80}
                y={200 + row * 90}
                width={54}
                height={60}
                fill="url(#glassGrad)"
                opacity={glow}
              />
            ))
          )}
          {/* Door */}
          <rect x={330} y={640} width={60} height={80} fill="#2c1810" />
          <circle cx={382} cy={680} r={3} fill={theme.gold} />
          {/* Glow halo */}
          <circle
            cx={360}
            cy={430}
            r={520}
            fill={theme.gold}
            opacity={0.12 * glow}
          />
        </svg>
      </div>

      {/* URL label */}
      <div
        style={{
          position: "absolute",
          top: 130,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: urlOpacity,
        }}
      >
        <div
          style={{
            color: theme.gold,
            fontSize: 26,
            letterSpacing: 6,
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          Owned digital property
        </div>
        <div
          style={{
            color: theme.ink,
            fontSize: 56,
            fontWeight: 900,
            marginTop: 10,
            letterSpacing: -1,
          }}
        >
          white-house-restaurant.com
        </div>
      </div>

      {/* Digital property callout */}
      <div
        style={{
          position: "absolute",
          bottom: 200,
          left: 60,
          right: 60,
          textAlign: "center",
          opacity: digitalPropertyOpacity,
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "20px 40px",
            background: theme.gold,
            color: theme.bg,
            fontSize: 56,
            fontWeight: 900,
            letterSpacing: 2,
            borderRadius: 20,
            textTransform: "uppercase",
            boxShadow: `0 20px 60px ${theme.gold}88`,
          }}
        >
          "Digital Property"
        </div>
      </div>

      {/* Real website panels sliding in */}
      <div
        style={{
          position: "absolute",
          top: 60,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          padding: 60,
          gap: 30,
          opacity: websitePanelOpacity,
          translate: `0px ${websitePanelY}px`,
        }}
      >
        {/* Browser chrome */}
        <div
          style={{
            width: 940,
            background: "#fff",
            borderRadius: 20,
            overflow: "hidden",
            boxShadow: "0 40px 80px rgba(0,0,0,0.6)",
          }}
        >
          <div
            style={{
              height: 46,
              background: "#f2f2f2",
              display: "flex",
              alignItems: "center",
              padding: "0 16px",
              gap: 8,
              borderBottom: "1px solid #ddd",
            }}
          >
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#ff5f57" }} />
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#febc2e" }} />
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#28c840" }} />
            <div
              style={{
                marginLeft: 20,
                flex: 1,
                height: 26,
                background: "#fff",
                borderRadius: 6,
                border: "1px solid #ddd",
                display: "flex",
                alignItems: "center",
                padding: "0 12px",
                fontSize: 16,
                color: "#555",
              }}
            >
              🔒 white-house-restaurant.com
            </div>
          </div>
          <Img
            src={staticFile("wh/buffet-house.webp")}
            style={{ width: "100%", height: 500, objectFit: "cover" }}
          />
          <div style={{ padding: 24 }}>
            <div style={{ fontSize: 36, fontWeight: 900, color: "#1a1a1a" }}>
              White House Restaurant
            </div>
            <div style={{ fontSize: 20, color: "#555", marginTop: 8 }}>
              Cameroon's original buffet · 4 locations · Since 1993
            </div>
          </div>
        </div>

        {/* Feature grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, width: 940 }}>
          {[
            { label: "MENU", detail: "100+ dishes online" },
            { label: "LOCATIONS", detail: "Akwa · Bonapriso · Bonamoussadi · Yaoundé" },
            { label: "CATERING", detail: "Enterprise + private events" },
            { label: "RESERVATIONS", detail: "Live WhatsApp booking" },
          ].map((f) => (
            <div
              key={f.label}
              style={{
                background: theme.bgSoft,
                border: `2px solid ${theme.gold}55`,
                borderRadius: 16,
                padding: "18px 22px",
              }}
            >
              <div
                style={{
                  color: theme.gold,
                  fontSize: 18,
                  letterSpacing: 4,
                  fontWeight: 700,
                  textTransform: "uppercase",
                }}
              >
                {f.label}
              </div>
              <div style={{ color: theme.ink, fontSize: 22, marginTop: 4, fontWeight: 600 }}>
                {f.detail}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
