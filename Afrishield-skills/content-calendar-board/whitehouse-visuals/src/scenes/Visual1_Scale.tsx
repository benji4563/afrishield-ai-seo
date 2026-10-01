import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { theme } from "../theme";

// VISUAL 1 — THE SCALE | 7–14 sec (7s @ 30fps = 210 frames)
// Visual: Animated timeline: 1993 → 2008 → 2012 → 2017 → TODAY.
// Then show four location pins appearing across Douala and Yaoundé.

const TIMELINE_EVENTS = [
  { year: "1993", label: "Foundation", desc: "First establishment in Douala Akwa", frame: 6 },
  { year: "2008", label: "Bonamoussadi", desc: "Douala North residential hub", frame: 22 },
  { year: "2012", label: "Bonapriso", desc: "Douala business & diplomatic corridor", frame: 38 },
  { year: "2017", label: "Yaoundé", desc: "Capital city flagship in Dragage", frame: 54 },
  { year: "TODAY", label: "4 Flagships", desc: "200,000+ diners · 2.5B+ FCFA turnover", frame: 70 },
];

const CAMEROON_PATH =
  "M 300 200 L 380 180 L 460 220 L 520 260 L 560 340 L 600 420 L 620 520 L 640 620 L 620 720 L 560 800 L 480 860 L 400 880 L 340 860 L 280 820 L 240 740 L 220 640 L 220 540 L 240 440 L 260 340 L 280 260 Z";

const MAP_PINS = [
  { city: "Douala", name: "Akwa", year: "1993 / 2005", x: 380, y: 720, dropFrame: 105 },
  { city: "Douala", name: "Bonamoussadi", year: "2008", x: 340, y: 765, dropFrame: 118 },
  { city: "Douala", name: "Bonapriso", year: "2012", x: 420, y: 760, dropFrame: 132 },
  { city: "Yaoundé", name: "Dragage", year: "2017", x: 510, y: 620, dropFrame: 146 },
];

export const Visual1_Scale: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const timelineExit = interpolate(frame, [88, 105], [0, -130], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const timelineScale = interpolate(frame, [88, 105], [1, 0.76], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const mapEntrance = interpolate(frame, [95, 115], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const mapScale = interpolate(frame, [95, 120], [0.85, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const bgGlow = interpolate(Math.sin(frame * 0.05), [-1, 1], [0.15, 0.28]);

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
          background: `radial-gradient(circle at 50% 30%, ${theme.bgSoft} 0%, ${theme.bg} 75%)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "25%",
          width: 550,
          height: 550,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${theme.gold} 0%, transparent 70%)`,
          opacity: bgGlow,
          filter: "blur(90px)",
          pointerEvents: "none",
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
          zIndex: 20,
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            padding: "8px 24px",
            borderRadius: 999,
            backgroundColor: "rgba(212, 162, 76, 0.12)",
            border: `1px solid ${theme.gold}`,
            color: theme.gold,
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          <span style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: theme.gold }} />
          THE SCALE · 1993 → TODAY
        </div>
        <h1
          style={{
            fontSize: 52,
            fontWeight: 900,
            letterSpacing: -1.5,
            marginTop: 18,
            color: theme.ink,
            textAlign: "center",
            textShadow: "0 4px 20px rgba(0,0,0,0.8)",
          }}
        >
          White House Restaurant
        </h1>
      </div>

      {/* PART 1: ANIMATED TIMELINE CARDS */}
      <div
        style={{
          position: "absolute",
          top: 240,
          left: 50,
          right: 50,
          transform: `translateY(${timelineExit}px) scale(${timelineScale})`,
          transformOrigin: "top center",
          zIndex: 15,
        }}
      >
        <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              position: "absolute",
              left: 48,
              top: 30,
              bottom: 30,
              width: 4,
              background: "rgba(255, 255, 255, 0.1)",
              borderRadius: 2,
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 48,
              top: 30,
              width: 4,
              height: `${Math.min(100, (frame / 72) * 100)}%`,
              background: `linear-gradient(to bottom, ${theme.gold}, ${theme.goldSoft})`,
              boxShadow: `0 0 15px ${theme.gold}`,
              borderRadius: 2,
            }}
          />

          {TIMELINE_EVENTS.map((item) => {
            const isToday = item.year === "TODAY";
            const itemSpring = spring({
              frame: frame - item.frame,
              fps,
              config: { damping: 14, stiffness: 120 },
            });
            const opacity = interpolate(frame - item.frame, [0, 8], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            const translateX = interpolate(itemSpring, [0, 1], [-40, 0]);

            return (
              <div
                key={item.year}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 24,
                  opacity,
                  transform: `translateX(${translateX}px)`,
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    backgroundColor: isToday ? theme.gold : "#1A2238",
                    border: `3px solid ${isToday ? "#FFF" : theme.gold}`,
                    boxShadow: isToday ? `0 0 20px ${theme.gold}` : "none",
                    flexShrink: 0,
                    zIndex: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      backgroundColor: isToday ? "#0B0F19" : theme.goldSoft,
                    }}
                  />
                </div>

                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "16px 24px",
                    borderRadius: 18,
                    backgroundColor: isToday ? "rgba(212, 162, 76, 0.18)" : "rgba(26, 34, 56, 0.75)",
                    border: `1.5px solid ${isToday ? theme.gold : "rgba(212, 162, 76, 0.25)"}`,
                    backdropFilter: "blur(12px)",
                    boxShadow: isToday ? "0 10px 30px rgba(212, 162, 76, 0.2)" : "0 6px 20px rgba(0,0,0,0.3)",
                  }}
                >
                  <div>
                    <div
                      style={{
                        color: isToday ? theme.gold : theme.ink,
                        fontSize: 28,
                        fontWeight: 900,
                        letterSpacing: -0.5,
                      }}
                    >
                      {item.label}
                    </div>
                    <div
                      style={{
                        color: theme.inkDim,
                        fontSize: 20,
                        marginTop: 4,
                        fontWeight: 500,
                      }}
                    >
                      {item.desc}
                    </div>
                  </div>
                  <div
                    style={{
                      fontSize: 30,
                      fontWeight: 900,
                      color: isToday ? theme.gold : theme.goldSoft,
                      letterSpacing: -0.5,
                      padding: "6px 14px",
                      borderRadius: 10,
                      backgroundColor: "rgba(0,0,0,0.3)",
                    }}
                  >
                    {item.year}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* PART 2: CAMEROON MAP + FOUR LOCATION PINS ACROSS DOUALA & YAOUNDÉ */}
      <div
        style={{
          position: "absolute",
          top: 680,
          left: 0,
          right: 0,
          bottom: 160,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          opacity: mapEntrance,
          transform: `scale(${mapScale})`,
          zIndex: 10,
        }}
      >
        <svg
          width="900"
          height="1000"
          viewBox="150 150 550 780"
          style={{ overflow: "visible" }}
        >
          <defs>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          <path
            d={CAMEROON_PATH}
            fill="rgba(26, 34, 56, 0.85)"
            stroke={theme.gold}
            strokeWidth="3.5"
            filter="url(#glow)"
          />

          <circle cx="380" cy="740" r="75" fill="rgba(212, 162, 76, 0.15)" />
          <text x="300" y="825" fill={theme.inkDim} fontSize="22" fontWeight="700" letterSpacing="2">
            DOUALA (3)
          </text>

          <circle cx="510" cy="620" r="55" fill="rgba(212, 162, 76, 0.15)" />
          <text x="535" y="600" fill={theme.inkDim} fontSize="22" fontWeight="700" letterSpacing="2">
            YAOUNDÉ (1)
          </text>

          {MAP_PINS.map((pin) => {
            const local = frame - pin.dropFrame;
            if (local < 0) return null;

            const drop = interpolate(local, [0, 10], [-140, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.3, 1.4, 0.5, 1),
            });
            const scale = interpolate(local, [0, 10], [0.3, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            const ripple = interpolate(local, [6, 35], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            const labelOpacity = interpolate(local, [8, 16], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });

            return (
              <g
                key={pin.name}
                transform={`translate(${pin.x}, ${pin.y + drop}) scale(${scale})`}
              >
                <circle r={50 * ripple} fill="none" stroke={theme.gold} strokeWidth="3" opacity={1 - ripple} />
                <circle r={25 * ripple} fill={theme.gold} opacity={(1 - ripple) * 0.4} />

                <path
                  d="M0,-48 C-20,-48 -36,-32 -36,-12 C-36,12 -16,30 0,50 C16,30 36,12 36,-12 C36,-32 20,-48 0,-48 Z"
                  fill={theme.gold}
                  stroke="#0B0F19"
                  strokeWidth="3.5"
                />
                <circle cx="0" cy="-12" r="12" fill="#0B0F19" />

                <g opacity={labelOpacity} transform="translate(0, 68)">
                  <rect
                    x="-110"
                    y="0"
                    width="220"
                    height="60"
                    rx="12"
                    fill="rgba(11, 15, 25, 0.92)"
                    stroke={theme.gold}
                    strokeWidth="2"
                  />
                  <text
                    x="0"
                    y="26"
                    textAnchor="middle"
                    fill={theme.ink}
                    fontSize="21"
                    fontWeight="800"
                  >
                    {pin.name}
                  </text>
                  <text
                    x="0"
                    y="48"
                    textAnchor="middle"
                    fill={theme.gold}
                    fontSize="17"
                    fontWeight="600"
                  >
                    {pin.city} · {pin.year}
                  </text>
                </g>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Bottom Sticky Impact Banner */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          left: 40,
          right: 40,
          padding: "20px 30px",
          borderRadius: 24,
          backgroundColor: "rgba(18, 24, 42, 0.95)",
          border: `2px solid ${theme.gold}`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          boxShadow: "0 15px 40px rgba(0,0,0,0.6)",
          zIndex: 30,
        }}
      >
        <div
          style={{
            fontSize: 26,
            fontWeight: 900,
            color: theme.gold,
            letterSpacing: 2,
            textTransform: "uppercase",
            textAlign: "center",
          }}
        >
          4 Locations · 2 Metros · 33 Years
        </div>
        <div
          style={{
            fontSize: 21,
            fontWeight: 600,
            color: theme.inkDim,
            marginTop: 6,
            textAlign: "center",
          }}
        >
          Outselling every French chain in Cameroon
        </div>
      </div>
    </AbsoluteFill>
  );
};
