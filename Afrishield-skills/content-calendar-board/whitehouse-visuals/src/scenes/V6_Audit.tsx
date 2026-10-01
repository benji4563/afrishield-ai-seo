import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { theme } from "../theme";

// V6 — LIVE WEBSITE AUDIT WALK-THROUGH
// Stylized site mockup + call-out cards sliding in with each feature named.

type Callout = {
  id: string;
  title: string;
  detail: string;
  startAt: number; // seconds
};

const CALLOUTS: Callout[] = [
  { id: "lang", title: "EN · FR bilingual", detail: "Country-flag toggle in header", startAt: 0.5 },
  { id: "shop", title: "100+ menu items live", detail: "Full Odoo e-commerce shop", startAt: 2.5 },
  { id: "branches", title: "4 branch pages", detail: "Akwa · Bonapriso · Bonamoussadi · Yaoundé", startAt: 4.5 },
  { id: "wa", title: "4 WhatsApp CTAs", detail: "One click-to-chat per branch", startAt: 6.5 },
  { id: "chat", title: "Live chat + blog", detail: "Always-on lead capture", startAt: 8.5 },
  { id: "map", title: "Indexed everywhere", detail: "Google Maps · TripAdvisor · Waze · Petit Futé", startAt: 10.5 },
];

const CalloutCard: React.FC<{ c: Callout; frame: number; fps: number; index: number }> = ({ c, frame, fps, index }) => {
  const startFrame = c.startAt * fps;
  const local = frame - startFrame;
  const opacity = interpolate(local, [0, 10, 45, 55], [0, 1, 1, 0.55], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const x = interpolate(local, [0, 15], [400, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const top = 240 + index * 200;
  return (
    <div
      style={{
        position: "absolute",
        left: 60,
        right: 60,
        top,
        opacity,
        translate: `${x}px 0px`,
        background: theme.bgSoft,
        border: `3px solid ${theme.gold}`,
        borderRadius: 20,
        padding: "26px 32px",
        display: "flex",
        alignItems: "center",
        gap: 24,
        boxShadow: `0 20px 60px rgba(0,0,0,0.4)`,
      }}
    >
      <div
        style={{
          width: 60,
          height: 60,
          borderRadius: 14,
          background: theme.gold,
          color: theme.bg,
          fontSize: 32,
          fontWeight: 900,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {index + 1}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ color: theme.ink, fontSize: 36, fontWeight: 800 }}>{c.title}</div>
        <div style={{ color: theme.inkDim, fontSize: 22, marginTop: 6 }}>{c.detail}</div>
      </div>
      <div
        style={{
          color: theme.gold,
          fontSize: 36,
          fontWeight: 900,
        }}
      >
        ✓
      </div>
    </div>
  );
};

const SiteBackdrop: React.FC = () => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      background: "#fff",
      opacity: 0.06,
      backgroundImage: `
        linear-gradient(to bottom, rgba(212,162,76,0.15) 0%, rgba(0,0,0,0) 80%),
        repeating-linear-gradient(0deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 40px, transparent 40px, transparent 80px)
      `,
    }}
  />
);

export const V6_Audit: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: theme.bg }}>
      <SiteBackdrop />
      <Interactive.Div
        name="Header"
        style={{
          position: "absolute",
          top: 60,
          left: 60,
          right: 60,
          opacity: headerOpacity,
        }}
      >
        <div
          style={{
            color: theme.gold,
            fontSize: 24,
            letterSpacing: 6,
            fontWeight: 600,
            textTransform: "uppercase",
          }}
        >
          Website audit · white-house-restaurant.com
        </div>
        <div
          style={{
            color: theme.ink,
            fontSize: 68,
            fontWeight: 900,
            marginTop: 12,
            lineHeight: 1.05,
          }}
        >
          What&rsquo;s actually
          <br />
          working here.
        </div>
      </Interactive.Div>
      {CALLOUTS.map((c, i) => (
        <CalloutCard key={c.id} c={c} frame={frame} fps={fps} index={i} />
      ))}
      <Interactive.Div
        name="Footer"
        style={{
          position: "absolute",
          bottom: 100,
          left: 60,
          right: 60,
          textAlign: "center",
          color: theme.inkDim,
          fontSize: 24,
          letterSpacing: 2,
          opacity: interpolate(frame, [12 * fps, 13 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        Built on Odoo · mobile-optimized · 33 years of brand equity indexed
      </Interactive.Div>
    </AbsoluteFill>
  );
};
