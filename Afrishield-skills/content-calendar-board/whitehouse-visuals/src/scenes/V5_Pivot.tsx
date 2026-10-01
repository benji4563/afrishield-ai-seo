import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { theme } from "../theme";

// V5 — PIVOT: Instagram-phone chaos → clean desktop website.

const IG_POSTS = [
  { c: "#ff6b6b", label: "@restaurantA" },
  { c: "#5b8def", label: "@bistrofrance" },
  { c: "#f5b942", label: "@pizzeriadla" },
  { c: "#7c5cff", label: "@indianfood" },
  { c: "#25d366", label: "@lebistro" },
  { c: "#e85d2f", label: "@saga.africa" },
  { c: "#6db56d", label: "@le.boj" },
  { c: "#c76a94", label: "@maison.h" },
  { c: "#d4a24c", label: "@carino" },
  { c: "#8a5a3b", label: "@grillhouse" },
];

const PhoneScreen: React.FC<{ scroll: number }> = ({ scroll }) => (
  <div
    style={{
      width: 520,
      height: 1040,
      background: "#000",
      borderRadius: 60,
      border: "10px solid #1a1a1a",
      boxShadow: "0 50px 100px rgba(0,0,0,0.6)",
      overflow: "hidden",
      position: "relative",
    }}
  >
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 60,
        background: "#000",
        color: theme.ink,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 22,
        fontWeight: 700,
        zIndex: 2,
      }}
    >
      Instagram
    </div>
    <div
      style={{
        translate: `0px ${-scroll}px`,
        paddingTop: 60,
      }}
    >
      {IG_POSTS.concat(IG_POSTS).map((p, i) => (
        <div
          key={i}
          style={{
            width: "100%",
            height: 500,
            background: p.c,
            display: "flex",
            alignItems: "flex-end",
            padding: 20,
            color: "#fff",
            fontSize: 24,
            fontWeight: 700,
            borderBottom: "2px solid #000",
          }}
        >
          {p.label}
        </div>
      ))}
    </div>
    <div
      style={{
        position: "absolute",
        top: 60,
        left: 0,
        right: 0,
        bottom: 0,
        background: "linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 20%, rgba(0,0,0,0) 80%, rgba(0,0,0,0.4) 100%)",
        pointerEvents: "none",
      }}
    />
  </div>
);

const Browser: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const loadBar = interpolate(frame, [6 * fps, 7.5 * fps], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <div
      style={{
        width: 960,
        height: 1100,
        background: "#fff",
        borderRadius: 20,
        boxShadow: "0 60px 120px rgba(0,0,0,0.7)",
        overflow: "hidden",
        border: "1px solid #ddd",
      }}
    >
      <div
        style={{
          height: 60,
          background: "#f2f2f2",
          display: "flex",
          alignItems: "center",
          padding: "0 20px",
          gap: 8,
          borderBottom: "1px solid #ddd",
        }}
      >
        <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#ff5f57" }} />
        <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#febc2e" }} />
        <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#28c840" }} />
        <div
          style={{
            marginLeft: 30,
            flex: 1,
            height: 34,
            background: "#fff",
            borderRadius: 8,
            border: "1px solid #ddd",
            display: "flex",
            alignItems: "center",
            padding: "0 14px",
            fontSize: 18,
            color: "#555",
          }}
        >
          🔒 white-house-restaurant.com
        </div>
      </div>
      <div
        style={{
          height: 3,
          background: theme.gold,
          width: `${loadBar}%`,
        }}
      />
      <div
        style={{
          padding: 40,
          color: "#222",
          fontFamily: theme.fontHeading,
        }}
      >
        <div
          style={{
            fontSize: 22,
            letterSpacing: 6,
            color: "#888",
            textTransform: "uppercase",
            marginBottom: 20,
          }}
        >
          White House Restaurant
        </div>
        <div
          style={{
            fontSize: 68,
            fontWeight: 900,
            lineHeight: 1.05,
            marginBottom: 24,
            color: "#1a1a1a",
          }}
        >
          When catering
          <br />
          and events
          <br />
          come together.
        </div>
        <div style={{ fontSize: 26, color: "#555", marginBottom: 40, lineHeight: 1.4 }}>
          Cameroon&rsquo;s original buffet — since 1993. Four locations across Douala &amp; Yaoundé.
        </div>
        <div
          style={{
            display: "inline-block",
            background: theme.gold,
            color: "#fff",
            padding: "18px 34px",
            borderRadius: 12,
            fontWeight: 700,
            fontSize: 22,
          }}
        >
          Start your adventure →
        </div>
        <div
          style={{
            marginTop: 60,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 20,
          }}
        >
          {["Buffet from 8,500 FCFA", "100+ menu items online", "4 branches · 4 WhatsApp", "EN · FR bilingual"].map(
            (t) => (
              <div
                key={t}
                style={{
                  padding: 20,
                  background: "#f7f2e8",
                  borderRadius: 12,
                  border: `1px solid ${theme.gold}44`,
                  fontSize: 22,
                  fontWeight: 700,
                  color: "#333",
                }}
              >
                {t}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export const V5_Pivot: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const phaseSwitch = 5 * fps;
  const phoneScroll = interpolate(frame, [0, phaseSwitch], [0, 3200], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.3, 0, 0.7, 1),
  });

  const phoneOpacity = interpolate(frame, [phaseSwitch - 10, phaseSwitch + 5], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const phoneScale = interpolate(frame, [phaseSwitch - 10, phaseSwitch + 5], [1, 0.6], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const browserOpacity = interpolate(frame, [phaseSwitch, phaseSwitch + 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const browserScale = interpolate(frame, [phaseSwitch, phaseSwitch + 15], [0.85, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const rentTagOpacity = interpolate(frame, [1.5 * fps, 2.5 * fps, 4.5 * fps, phaseSwitch], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const ownTagOpacity = interpolate(frame, [phaseSwitch + 15, phaseSwitch + 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: theme.bg,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle at 50% 40%, ${theme.bgSoft} 0%, ${theme.bg} 70%)`,
        }}
      />
      <Interactive.Div
        name="Phone"
        style={{
          position: "absolute",
          opacity: phoneOpacity,
          scale: phoneScale,
        }}
      >
        <PhoneScreen scroll={phoneScroll} />
      </Interactive.Div>
      <Interactive.Div
        name="RentTag"
        style={{
          position: "absolute",
          top: 200,
          left: 60,
          right: 60,
          textAlign: "center",
          color: theme.red,
          fontSize: 44,
          fontWeight: 800,
          opacity: rentTagOpacity,
          textShadow: "0 6px 30px rgba(0,0,0,0.6)",
        }}
      >
        Instagram feed · resets daily
      </Interactive.Div>

      <Interactive.Div
        name="Browser"
        style={{
          position: "absolute",
          opacity: browserOpacity,
          scale: browserScale,
        }}
      >
        <Browser frame={frame} fps={fps} />
      </Interactive.Div>
      <Interactive.Div
        name="OwnTag"
        style={{
          position: "absolute",
          bottom: 160,
          left: 60,
          right: 60,
          textAlign: "center",
          color: theme.gold,
          fontSize: 56,
          fontWeight: 900,
          opacity: ownTagOpacity,
        }}
      >
        Their real growth engine.
      </Interactive.Div>
    </AbsoluteFill>
  );
};
