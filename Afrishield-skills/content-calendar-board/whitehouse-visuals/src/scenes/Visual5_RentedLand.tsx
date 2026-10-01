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

// VISUAL 5 — RENTED LAND | 28–36 sec (8s @ 30fps = 240 frames)
// Visual: A funny animation: restaurant owner standing on a tiny piece of land
// labelled Instagram / Facebook / TikTok. The platforms' “rules” appear above him.
// Then the land shakes/disappears.

const PLATFORM_RULES = [
  { text: "⚠️ RULE #1: Reach limited to 2% unless you pay", frame: 65, color: "#E23E3E" },
  { text: "📉 RULE #2: Algorithm resets without notice", frame: 85, color: "#E85D2F" },
  { text: "💳 RULE #3: You own 0% of your audience data", frame: 105, color: "#D4A24C" },
];

export const Visual5_RentedLand: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Switch from confident chef to shocked chef at frame 110
  const isShocked = frame >= 110;

  // Violent shake effect from frame 115 to 175
  const shakeIntensity = interpolate(frame, [115, 140, 175], [0, 18, 35], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const shakeX = Math.sin(frame * 1.8) * shakeIntensity;
  const shakeY = Math.cos(frame * 2.2) * (shakeIntensity * 0.7);
  const shakeRotate = Math.sin(frame * 1.5) * (shakeIntensity * 0.25);

  // Land plunge/disappear at frame 170
  const landDrop = interpolate(frame, [172, 195], [0, 1800], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.5, 0, 1, 1),
  });

  const landRotate = interpolate(frame, [172, 195], [0, 25], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // End card slam at frame 195
  const endCardSpring = spring({
    frame: frame - 195,
    fps,
    config: { damping: 12, stiffness: 120 },
  });
  const endCardOpacity = interpolate(frame, [192, 202], [0, 1], {
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
      {/* Background Starfield / Abyss */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle at 50% 40%, #151C30 0%, #080B12 70%, #000000 100%)",
        }}
      />

      {/* Top Header Badge */}
      <div
        style={{
          position: "absolute",
          top: 60,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          zIndex: 40,
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            padding: "8px 24px",
            borderRadius: 999,
            backgroundColor: "rgba(226, 62, 62, 0.15)",
            border: `1.5px solid ${theme.red}`,
            color: theme.red,
            fontSize: 20,
            fontWeight: 800,
            letterSpacing: 4,
            textTransform: "uppercase",
            boxShadow: "0 0 25px rgba(226, 62, 62, 0.3)",
          }}
        >
          <span style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: theme.red }} />
          THE RENTED LAND TRAP · 28–36 SEC
        </div>
      </div>

      {/* FLOATING RESTAURANT OWNER ON TINY ISLAND */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: `translate(${shakeX}px, ${shakeY + landDrop}px) rotate(${shakeRotate + landRotate}deg)`,
          transformOrigin: "50% 70%",
          zIndex: 10,
        }}
      >
        {/* Confident Chef (Frames 0 - 110) */}
        {!isShocked && (
          <div style={{ position: "absolute", inset: 0 }}>
            <Img
              src={staticFile("visuals/chef_confident.jpg")}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                filter: "brightness(0.95)",
              }}
            />
          </div>
        )}

        {/* Shocked Chef (Frames 110 - 240) */}
        {isShocked && (
          <div style={{ position: "absolute", inset: 0 }}>
            <Img
              src={staticFile("visuals/chef_shock.jpg")}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                filter: "brightness(1.05) contrast(1.1)",
              }}
            />
          </div>
        )}

        {/* Floating Neon Signboard on Island: INSTAGRAM / FACEBOOK / TIKTOK */}
        <div
          style={{
            position: "absolute",
            bottom: 260,
            left: 50,
            right: 50,
            padding: "16px 20px",
            borderRadius: 18,
            backgroundColor: "rgba(11, 15, 25, 0.92)",
            border: "2px solid #E23E3E",
            boxShadow: "0 0 30px rgba(226, 62, 62, 0.6), inset 0 0 15px rgba(226, 62, 62, 0.3)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 6,
          }}
        >
          <div
            style={{
              color: "#E23E3E",
              fontSize: 18,
              fontWeight: 800,
              letterSpacing: 4,
              textTransform: "uppercase",
            }}
          >
            ⚠️ PRECARIOUS FOUNDATION
          </div>
          <div
            style={{
              color: "#FFF",
              fontSize: 26,
              fontWeight: 900,
              letterSpacing: 2,
              textAlign: "center",
            }}
          >
            INSTAGRAM · FACEBOOK · TIKTOK
          </div>
        </div>

        {/* Red Cracks Overlay when shaking */}
        {isShocked && (
          <svg
            width="1080"
            height="1920"
            viewBox="0 0 1080 1920"
            style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
          >
            <path
              d="M 540 1100 L 490 1250 L 530 1350 L 460 1500 L 520 1650"
              stroke="#FF3333"
              strokeWidth={interpolate(frame, [115, 160], [2, 10], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
              fill="none"
              filter="drop-shadow(0 0 15px #FF0000)"
            />
            <path
              d="M 510 1280 L 620 1340 L 680 1480"
              stroke="#FF6600"
              strokeWidth={interpolate(frame, [125, 165], [1, 7], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
              fill="none"
              filter="drop-shadow(0 0 12px #FF3300)"
            />
            <path
              d="M 480 1420 L 360 1490 L 320 1600"
              stroke="#FF0033"
              strokeWidth={interpolate(frame, [130, 165], [1, 8], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
              fill="none"
              filter="drop-shadow(0 0 12px #FF0033)"
            />
          </svg>
        )}
      </div>

      {/* PLATFORM "RULES" POPPING IN ABOVE HIM (Frames 60 - 165) */}
      {frame < 175 && (
        <div
          style={{
            position: "absolute",
            top: 140,
            left: 45,
            right: 45,
            display: "flex",
            flexDirection: "column",
            gap: 14,
            zIndex: 35,
          }}
        >
          {PLATFORM_RULES.map((rule) => {
            const ruleSpring = spring({
              frame: frame - rule.frame,
              fps,
              config: { damping: 12, stiffness: 150 },
            });
            const opacity = interpolate(frame - rule.frame, [0, 6], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            if (frame < rule.frame) return null;

            return (
              <div
                key={rule.text}
                style={{
                  padding: "16px 22px",
                  borderRadius: 16,
                  backgroundColor: "rgba(11, 15, 25, 0.94)",
                  border: `2px solid ${rule.color}`,
                  color: "#FFF",
                  fontSize: 22,
                  fontWeight: 800,
                  display: "flex",
                  alignItems: "center",
                  boxShadow: `0 8px 25px rgba(0,0,0,0.7), 0 0 15px ${rule.color}40`,
                  transform: `scale(${ruleSpring})`,
                  opacity,
                }}
              >
                {rule.text}
              </div>
            );
          })}
        </div>
      )}

      {/* Bottom Comic Alert Box before collapse */}
      {frame < 172 && (
        <div
          style={{
            position: "absolute",
            bottom: 70,
            left: 45,
            right: 45,
            padding: "20px 24px",
            borderRadius: 20,
            backgroundColor: isShocked ? "rgba(226, 62, 62, 0.94)" : "rgba(18, 24, 42, 0.92)",
            border: `2px solid ${isShocked ? "#FFF" : theme.gold}`,
            color: "#FFF",
            textAlign: "center",
            boxShadow: "0 15px 40px rgba(0,0,0,0.8)",
            zIndex: 30,
          }}
        >
          <div style={{ fontSize: 28, fontWeight: 900, letterSpacing: -0.5 }}>
            {isShocked ? "💥 THE PLATFORMS ARE CRUMBLING!" : "Standing on Borrowed Ground..."}
          </div>
          <div style={{ fontSize: 20, marginTop: 4, opacity: 0.9 }}>
            {isShocked ? "You don't own the algorithm. You don't own the audience." : "100% reliant on 3rd-party algorithms that change daily"}
          </div>
        </div>
      )}

      {/* FINAL SLAM CTA CARD (Frames 190 - 240) */}
      {frame >= 185 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "#0B0F19",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 50px",
            textAlign: "center",
            opacity: endCardOpacity,
            zIndex: 50,
          }}
        >
          <div
            style={{
              transform: `scale(${endCardSpring})`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                color: theme.red,
                fontSize: 26,
                fontWeight: 800,
                letterSpacing: 6,
                textTransform: "uppercase",
                marginBottom: 24,
              }}
            >
              The Hard Truth
            </div>

            <div
              style={{
                color: theme.ink,
                fontSize: 66,
                fontWeight: 900,
                letterSpacing: -2,
                lineHeight: 1.1,
              }}
            >
              Social media is <span style={{ color: theme.red }}>rented land.</span>
            </div>

            <div
              style={{
                color: theme.gold,
                fontSize: 66,
                fontWeight: 900,
                letterSpacing: -2,
                lineHeight: 1.1,
                marginTop: 20,
              }}
            >
              A website is land <span style={{ color: "#FFF", textDecoration: "underline" }}>you own.</span>
            </div>

            <div
              style={{
                marginTop: 48,
                padding: "24px 36px",
                borderRadius: 24,
                backgroundColor: "rgba(212, 162, 76, 0.12)",
                border: `2px solid ${theme.gold}`,
                boxShadow: "0 15px 40px rgba(212, 162, 76, 0.2)",
              }}
            >
              <div
                style={{
                  color: theme.gold,
                  fontSize: 34,
                  fontWeight: 900,
                  letterSpacing: 2,
                }}
              >
                AFRISHIELD AI SEO
              </div>
              <div
                style={{
                  color: theme.inkDim,
                  fontSize: 22,
                  marginTop: 6,
                  letterSpacing: 1,
                }}
              >
                Stop Renting Attention. Start Owning Traffic.
              </div>
            </div>
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
