import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { theme } from "../theme";

// V8 — RENTED LAND VS OWNED LAND + CLOSING CTA
// Left: small house on flat ground labeled INSTAGRAM/TIKTOK/FACEBOOK, resets every ~60 frames.
// Right: tall house on solid foundation labeled YOUR WEBSITE, garden grows continuously.
// Then CTA closes.

const RentedHouse: React.FC<{ frame: number }> = ({ frame }) => {
  const cycle = frame % 60;
  const meter = interpolate(cycle, [0, 55], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const shake = Math.sin(cycle * 0.4) * (cycle > 50 ? 3 : 0);
  return (
    <svg width={480} height={800} viewBox="0 0 480 800" style={{ overflow: "visible" }}>
      <rect x={0} y={620} width={480} height={4} fill={theme.inkDim} />
      <rect x={40} y={520} width={400} height={100} fill="#3a2a1a" />
      <g transform={`translate(${240 + shake}, 320)`}>
        <polygon points="-140,120 140,120 0,-40" fill={theme.red} />
        <rect x={-120} y={120} width={240} height={200} fill="#c94a3a" />
        <rect x={-30} y={220} width={60} height={100} fill="#3a2a1a" />
        <rect x={-100} y={160} width={50} height={50} fill="#f5b942" opacity={meter > 0.5 ? 0.3 : 1} />
        <rect x={50} y={160} width={50} height={50} fill="#f5b942" opacity={meter > 0.5 ? 0.3 : 1} />
      </g>
      <g transform="translate(240, 720)">
        <rect x={-140} y={-20} width={280} height={40} fill="#2a1a1a" stroke={theme.red} strokeWidth={3} />
        <rect x={-136} y={-16} width={272 * meter} height={32} fill={theme.red} />
        <text x={0} y={60} textAnchor="middle" fill={theme.red} fontSize={20} fontWeight={700}>
          reach expires · reset
        </text>
      </g>
    </svg>
  );
};

const OwnedHouse: React.FC<{ frame: number }> = ({ frame }) => {
  const growth = interpolate(frame, [0, 150], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const flowers = interpolate(frame, [40, 180], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <svg width={480} height={800} viewBox="0 0 480 800" style={{ overflow: "visible" }}>
      <rect x={0} y={640} width={480} height={4} fill={theme.gold} />
      <rect x={40} y={540} width={400} height={100} fill="#2a3a1a" />
      <g transform="translate(240, 180)">
        <polygon points="-160,140 160,140 0,-60" fill={theme.gold} />
        <rect x={-140} y={140} width={280} height={340} fill="#e8c977" />
        <rect x={-30} y={340} width={60} height={140} fill="#3a2a1a" />
        <rect x={-110} y={180} width={60} height={60} fill="#7ac7d4" />
        <rect x={50} y={180} width={60} height={60} fill="#7ac7d4" />
        <rect x={-110} y={260} width={60} height={60} fill="#7ac7d4" />
        <rect x={50} y={260} width={60} height={60} fill="#7ac7d4" />
      </g>
      {Array.from({ length: 14 }).map((_, i) => {
        const gx = 60 + (i / 13) * 360;
        const h = 40 + Math.sin(i * 1.3) * 30 + growth * (50 + (i % 3) * 20);
        return (
          <g key={i}>
            <rect
              x={gx - 8}
              y={640 - h}
              width={16}
              height={h}
              fill={i % 2 === 0 ? "#4a7a3a" : "#5a8a4a"}
              rx={8}
            />
            <circle
              cx={gx}
              cy={640 - h}
              r={12 * flowers}
              fill={i % 3 === 0 ? theme.gold : i % 3 === 1 ? theme.accent : "#e85dc4"}
              opacity={flowers}
            />
          </g>
        );
      })}
    </svg>
  );
};

export const V8_RentedOwned: React.FC<{ ctaAtSecond?: number }> = ({ ctaAtSecond = 15 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const introOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const ctaStart = ctaAtSecond * fps;
  const houseOpacity = interpolate(frame, [ctaStart - 10, ctaStart + 15], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const ctaOpacity = interpolate(frame, [ctaStart, ctaStart + 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const wordmarkOpacity = interpolate(frame, [ctaStart + 20, ctaStart + 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: theme.bg }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle at 50% 60%, ${theme.bgSoft} 0%, ${theme.bg} 70%)`,
        }}
      />
      <Interactive.Div
        name="MetaphorHeader"
        style={{
          position: "absolute",
          top: 100,
          left: 60,
          right: 60,
          textAlign: "center",
          opacity: houseOpacity * introOpacity,
        }}
      >
        <div style={{ color: theme.gold, letterSpacing: 6, fontSize: 24, fontWeight: 600, textTransform: "uppercase" }}>
          Rented land vs. owned land
        </div>
        <div style={{ color: theme.ink, fontSize: 60, fontWeight: 900, marginTop: 10, lineHeight: 1.1 }}>
          Where does your traffic
          <br />
          actually live?
        </div>
      </Interactive.Div>

      <div
        style={{
          position: "absolute",
          top: 380,
          left: 0,
          right: 0,
          bottom: 300,
          display: "flex",
          justifyContent: "center",
          gap: 40,
          opacity: houseOpacity,
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div style={{ color: theme.red, fontSize: 28, fontWeight: 800, letterSpacing: 3, marginBottom: 10 }}>
            RENTED
          </div>
          <RentedHouse frame={frame} />
          <div style={{ color: theme.inkDim, fontSize: 22, marginTop: 6, lineHeight: 1.3 }}>
            Instagram · TikTok
            <br />
            Facebook
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ color: theme.gold, fontSize: 28, fontWeight: 800, letterSpacing: 3, marginBottom: 10 }}>
            OWNED
          </div>
          <OwnedHouse frame={frame} />
          <div style={{ color: theme.inkDim, fontSize: 22, marginTop: 6, lineHeight: 1.3 }}>
            Your website
            <br />
            Compounds every year
          </div>
        </div>
      </div>

      <Interactive.Div
        name="CTA"
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          opacity: ctaOpacity,
          padding: "0 60px",
          textAlign: "center",
        }}
      >
        <div style={{ color: theme.gold, letterSpacing: 8, fontSize: 28, fontWeight: 600, textTransform: "uppercase", marginBottom: 30 }}>
          The answer
        </div>
        <div
          style={{
            color: theme.ink,
            fontSize: 92,
            fontWeight: 900,
            lineHeight: 1.05,
            letterSpacing: -2,
          }}
        >
          Stop renting attention.
          <br />
          <span style={{ color: theme.gold }}>Start owning traffic.</span>
        </div>
        <div
          style={{
            marginTop: 60,
            color: theme.inkDim,
            fontSize: 32,
            lineHeight: 1.4,
            maxWidth: 800,
          }}
        >
          Ask the Cameroonian restaurant
          <br />
          outselling every French chain in Douala.
        </div>
      </Interactive.Div>

      <Interactive.Div
        name="Wordmark"
        style={{
          position: "absolute",
          bottom: 80,
          left: 60,
          right: 60,
          textAlign: "center",
          opacity: wordmarkOpacity,
        }}
      >
        <div
          style={{
            color: theme.gold,
            fontSize: 44,
            fontWeight: 900,
            letterSpacing: 4,
          }}
        >
          AFRISHIELD <span style={{ color: theme.ink }}>AI SEO</span>
        </div>
        <div style={{ color: theme.inkDim, fontSize: 20, marginTop: 8, letterSpacing: 3 }}>
          Websites that compound. Traffic you own.
        </div>
      </Interactive.Div>
    </AbsoluteFill>
  );
};
