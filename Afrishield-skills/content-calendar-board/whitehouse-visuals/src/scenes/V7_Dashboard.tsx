import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { theme } from "../theme";

// V7 — TRAFFIC + LEADS DASHBOARD OVERLAY
// Stylized analytics dashboard, honest audit-gap flash.

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const TRAFFIC = [850, 920, 1050, 980, 1120, 1180, 1250, 1330, 1410, 1480, 1620, 1780];

const TrafficChart: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const reveal = interpolate(frame, [10, 90], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const chartWidth = 900;
  const chartHeight = 400;
  const max = 2000;
  const points = TRAFFIC.map((v, i) => {
    const x = (i / (TRAFFIC.length - 1)) * chartWidth;
    const y = chartHeight - (v / max) * chartHeight;
    return { x, y, v };
  });
  const drawnCount = Math.max(1, Math.floor(reveal * points.length));
  const drawn = points.slice(0, drawnCount);
  const pathD = drawn.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const areaD = `${pathD} L ${drawn[drawn.length - 1]?.x || 0} ${chartHeight} L 0 ${chartHeight} Z`;
  const lastPoint = drawn[drawn.length - 1];

  return (
    <svg width={chartWidth} height={chartHeight} style={{ overflow: "visible" }}>
      <defs>
        <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={theme.gold} stopOpacity="0.45" />
          <stop offset="100%" stopColor={theme.gold} stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0, 0.25, 0.5, 0.75, 1].map((f) => (
        <line
          key={f}
          x1={0}
          x2={chartWidth}
          y1={f * chartHeight}
          y2={f * chartHeight}
          stroke={theme.inkDim}
          strokeOpacity={0.15}
          strokeDasharray="4 8"
        />
      ))}
      <path d={areaD} fill="url(#areaGrad)" />
      <path
        d={pathD}
        fill="none"
        stroke={theme.gold}
        strokeWidth={5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {drawn.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={5} fill={theme.gold} />
      ))}
      {lastPoint ? (
        <g>
          <circle cx={lastPoint.x} cy={lastPoint.y} r={14} fill={theme.gold} opacity={0.3} />
          <circle cx={lastPoint.x} cy={lastPoint.y} r={8} fill={theme.gold} />
        </g>
      ) : null}
      {MONTHS.map((m, i) => (
        <text
          key={m}
          x={(i / (MONTHS.length - 1)) * chartWidth}
          y={chartHeight + 34}
          textAnchor="middle"
          fill={theme.inkDim}
          fontSize={20}
        >
          {m}
        </text>
      ))}
    </svg>
  );
};

export const V7_Dashboard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const leadCount = interpolate(frame, [30, 150], [40, 120], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const gapOpacity = interpolate(frame, [180, 200, 260, 280], [0, 1, 1, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const gapPulse = 0.5 + 0.5 * Math.sin((frame - 180) * 0.25);

  return (
    <AbsoluteFill style={{ backgroundColor: theme.bg, padding: "60px 60px" }}>
      <Interactive.Div
        name="Header"
        style={{ opacity: headerOpacity, marginBottom: 30 }}
      >
        <div
          style={{
            color: theme.gold,
            fontSize: 22,
            letterSpacing: 6,
            fontWeight: 600,
            textTransform: "uppercase",
          }}
        >
          Traffic & leads · modeled
        </div>
        <div style={{ color: theme.ink, fontSize: 60, fontWeight: 900, marginTop: 8 }}>
          On autopilot.
        </div>
      </Interactive.Div>

      <Interactive.Div
        name="TrafficCard"
        style={{
          background: theme.bgSoft,
          border: `2px solid ${theme.gold}44`,
          borderRadius: 24,
          padding: "36px 40px",
          marginBottom: 40,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div>
            <div style={{ color: theme.inkDim, fontSize: 24, letterSpacing: 2 }}>
              Organic sessions / month
            </div>
            <div style={{ color: theme.ink, fontSize: 72, fontWeight: 900, marginTop: 6 }}>
              800 – 2,000
            </div>
          </div>
          <div
            style={{
              color: theme.gold,
              fontSize: 30,
              fontWeight: 700,
              padding: "10px 20px",
              border: `2px solid ${theme.gold}`,
              borderRadius: 12,
            }}
          >
            ↗ rising
          </div>
        </div>
        <div style={{ marginTop: 30 }}>
          <TrafficChart frame={frame} fps={fps} />
        </div>
      </Interactive.Div>

      <Interactive.Div
        name="LeadsCard"
        style={{
          background: theme.bgSoft,
          border: `2px solid ${theme.gold}44`,
          borderRadius: 24,
          padding: "36px 40px",
          marginBottom: 40,
        }}
      >
        <div style={{ color: theme.inkDim, fontSize: 24, letterSpacing: 2 }}>
          Convertible leads / month
        </div>
        <div style={{ color: theme.gold, fontSize: 140, fontWeight: 900, lineHeight: 1 }}>
          {Math.round(leadCount)}
        </div>
        <div style={{ color: theme.inkDim, fontSize: 24, marginTop: 6 }}>
          Reservations · orders · catering enquiries · WhatsApp clicks
        </div>
      </Interactive.Div>

      <Interactive.Div
        name="AuditGap"
        style={{
          position: "absolute",
          bottom: 60,
          left: 60,
          right: 60,
          opacity: gapOpacity,
          background: "#2a1616",
          border: `3px solid ${theme.red}`,
          borderRadius: 20,
          padding: "24px 30px",
        }}
      >
        <div style={{ color: theme.red, fontSize: 22, letterSpacing: 4, fontWeight: 700, textTransform: "uppercase" }}>
          One fixable SEO miss
        </div>
        <div style={{ color: theme.ink, fontSize: 30, marginTop: 10, fontStyle: "italic" }}>
          Homepage meta description:
        </div>
        <div
          style={{
            marginTop: 8,
            color: theme.ink,
            fontSize: 36,
            fontWeight: 700,
            textDecoration: "underline",
            textDecorationColor: theme.red,
            textDecorationThickness: 4,
            opacity: 0.6 + 0.4 * gapPulse,
          }}
        >
          &ldquo;This is the homepage of the website&rdquo;
        </div>
      </Interactive.Div>
    </AbsoluteFill>
  );
};
