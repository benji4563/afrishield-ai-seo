import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { theme } from "../theme";

// V3 — BIG-NUMBERS COUNTER STACK
// 33 YEARS -> 200,000+ DINERS -> ≈ 2.5B FCFA over slow-mo buffet b-roll suggestion.

type Counter = {
  key: string;
  label: string;
  target: number;
  format: (n: number) => string;
  sub?: string;
  startAt: number;
};

const COUNTERS: Counter[] = [
  {
    key: "years",
    label: "Years in business",
    target: 33,
    format: (n) => Math.round(n).toString(),
    sub: "Since 1993",
    startAt: 0,
  },
  {
    key: "diners",
    label: "Diners every year",
    target: 200000,
    format: (n) => `${Math.round(n / 1000).toLocaleString()}k+`,
    sub: "Modeled estimate",
    startAt: 70,
  },
  {
    key: "turnover",
    label: "Annual turnover",
    target: 2.5,
    format: (n) => `≈ ${n.toFixed(1)}B`,
    sub: "FCFA · roughly USD $4.3M · estimate",
    startAt: 140,
  },
];

const CounterCard: React.FC<{ counter: Counter; frame: number; fps: number; index: number }> = ({
  counter,
  frame,
  fps,
  index,
}) => {
  const local = frame - counter.startAt;
  const opacity = interpolate(local, [0, 15, 55, 68], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const y = interpolate(local, [0, 20], [80, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const count = interpolate(local, [5, 45], [0, counter.target], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const suffix = counter.key === "turnover" ? " FCFA" : "";
  return (
    <Interactive.Div
      name={counter.key}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity,
        translate: `0px ${y}px`,
        paddingLeft: 60,
        paddingRight: 60,
      }}
    >
      <div
        style={{
          color: theme.gold,
          fontSize: 32,
          letterSpacing: 8,
          textTransform: "uppercase",
          fontWeight: 600,
          marginBottom: 40,
        }}
      >
        {counter.label}
      </div>
      <div
        style={{
          color: theme.ink,
          fontSize: 240,
          fontWeight: 900,
          letterSpacing: -6,
          lineHeight: 1,
          textAlign: "center",
        }}
      >
        {counter.format(count)}
        {suffix ? (
          <span style={{ color: theme.gold, fontSize: 110 }}>{suffix}</span>
        ) : null}
      </div>
      {counter.sub ? (
        <div
          style={{
            marginTop: 40,
            color: theme.inkDim,
            fontSize: 32,
            letterSpacing: 2,
          }}
        >
          {counter.sub}
        </div>
      ) : null}
    </Interactive.Div>
  );
};

export const V3_Counters: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const stripe = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: theme.bg }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle at 50% 50%, ${theme.bgSoft} 0%, ${theme.bg} 60%)`,
          opacity: stripe,
        }}
      />
      {COUNTERS.map((c, i) => (
        <CounterCard key={c.key} counter={c} frame={frame} fps={fps} index={i} />
      ))}
      <Interactive.Div
        name="Footnote"
        style={{
          position: "absolute",
          bottom: 120,
          left: 0,
          right: 0,
          textAlign: "center",
          color: theme.inkDim,
          fontSize: 22,
          letterSpacing: 2,
          opacity: interpolate(frame, [140, 170], [0, 0.7], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        *Estimates — actuals not publicly disclosed
      </Interactive.Div>
    </AbsoluteFill>
  );
};
