import React from "react";
import { interpolate } from "remotion";
import { color, toneColor, type BaseProps, type Tone } from "../signal/tokens";
import { display, body, mono } from "../signal/fonts";
import { CLAMP, EASE_OUT, Placed, SourceLine, Tag, cardStyle, progress, useEnter } from "../signal/primitives";

const fmt = (v: number, decimals: number) => v.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

// ---------------------------------------------------------------- MetricCounter
export type MetricCounterProps = BaseProps & { label: string; to: number; from?: number; prefix?: string; suffix?: string; decimals?: number; tone?: Tone; note?: string; source?: string };

export const MetricCounter: React.FC<MetricCounterProps> = ({ label, to, from = 0, prefix = "", suffix = "", decimals = 0, tone = "signal", note, source, durationInFrames, position = "upper" }) => {
  const { frame, opacity, y } = useEnter(durationInFrames);
  const value = interpolate(frame, [4, Math.min(34, durationInFrames - 10)], [from, to], { ...CLAMP, easing: EASE_OUT });
  return (
    <Placed position={position}>
      <div style={{ ...cardStyle(), opacity, translate: `0px ${y}px`, alignSelf: "flex-start" }}>
        <div style={{ fontFamily: mono, fontWeight: 700, fontSize: 30, color: color.mute, letterSpacing: "0.1em", textTransform: "uppercase" }}>{label}</div>
        <div style={{ fontFamily: display, fontWeight: 800, fontSize: 170, lineHeight: 1, color: toneColor(tone), letterSpacing: "-0.03em" }}>
          {prefix}
          {fmt(value, decimals)}
          {suffix}
        </div>
        {note ? <div style={{ fontFamily: body, fontWeight: 500, fontSize: 38, color: color.white, marginTop: 8 }}>{note}</div> : null}
        <SourceLine source={source} />
      </div>
    </Placed>
  );
};

// ---------------------------------------------------------------- Dashboard
export type DashboardProps = BaseProps & {
  title: string;
  metrics: { label: string; value: string; delta?: string; tone?: Tone }[];
  series?: number[];
  seriesLabel?: string;
  source?: string;
  illustration?: boolean;
};

export const Dashboard: React.FC<DashboardProps> = ({ title, metrics, series, seriesLabel, source, illustration, durationInFrames, position = "center" }) => {
  const { frame, opacity, y } = useEnter(durationInFrames);
  const W = 800;
  const H = 260;
  const max = series ? Math.max(...series) : 1;
  const min = series ? Math.min(...series) : 0;
  const pts = (series ?? []).map((v, i, a) => [(i / Math.max(1, a.length - 1)) * W, H - ((v - min) / Math.max(1e-9, max - min)) * (H - 20) - 10]);
  const d = pts.map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ");
  const draw = progress(frame, 18, 30);
  return (
    <Placed position={position}>
      <div style={{ ...cardStyle(), opacity, translate: `0px ${y}px` }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 26 }}>
          <div style={{ fontFamily: display, fontWeight: 800, fontSize: 46, color: color.white, textTransform: "uppercase" }}>{title}</div>
          {illustration ? <Tag tone="warn">Illustration</Tag> : null}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          {metrics.map((m, i) => {
            const p = progress(frame, 6 + i * 5, 10);
            return (
              <div key={i} style={{ backgroundColor: color.inkSoft, border: `2px solid ${color.inkLine}`, borderRadius: 20, padding: "20px 24px", opacity: p, translate: `0px ${(1 - p) * 20}px` }}>
                <div style={{ fontFamily: mono, fontSize: 24, color: color.mute, textTransform: "uppercase", letterSpacing: "0.08em" }}>{m.label}</div>
                <div style={{ fontFamily: display, fontWeight: 800, fontSize: 66, color: toneColor(m.tone ?? "white") }}>{m.value}</div>
                {m.delta ? <div style={{ fontFamily: mono, fontSize: 26, color: toneColor(m.tone ?? "signal") }}>{m.delta}</div> : null}
              </div>
            );
          })}
        </div>
        {series && series.length > 1 ? (
          <div style={{ marginTop: 28 }}>
            {seriesLabel ? <div style={{ fontFamily: mono, fontSize: 24, color: color.mute, marginBottom: 10 }}>{seriesLabel}</div> : null}
            <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
              <path d={d} fill="none" stroke={color.signal} strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - draw} />
            </svg>
          </div>
        ) : null}
        <SourceLine source={source} />
      </div>
    </Placed>
  );
};

// ---------------------------------------------------------------- BeforeAfter
type Side = { label: string; points?: string[]; value?: string };
export type BeforeAfterProps = BaseProps & { before: Side; after: Side; source?: string };

export const BeforeAfter: React.FC<BeforeAfterProps> = ({ before, after, source, durationInFrames, position = "center" }) => {
  const { frame, opacity, y } = useEnter(durationInFrames);
  const reveal = progress(frame, Math.round(durationInFrames * 0.42), 12);
  const block = (s: Side, tone: "danger" | "signal", p: number) => (
    <div style={{ ...cardStyle(), borderColor: toneColor(tone), borderWidth: 4, opacity: p, translate: `0px ${(1 - p) * 30}px` }}>
      <Tag tone={tone}>{s.label}</Tag>
      {s.value ? <div style={{ fontFamily: display, fontWeight: 800, fontSize: 110, color: toneColor(tone), marginTop: 10 }}>{s.value}</div> : null}
      {(s.points ?? []).map((pt, i) => (
        <div key={i} style={{ fontFamily: body, fontWeight: 500, fontSize: 38, color: color.white, marginTop: 14 }}>
          {tone === "danger" ? "✕ " : "✓ "}
          {pt}
        </div>
      ))}
    </div>
  );
  return (
    <Placed position={position}>
      <div style={{ opacity, translate: `0px ${y}px`, display: "flex", flexDirection: "column", gap: 30 }}>
        {block(before, "danger", 1)}
        {block(after, "signal", reveal)}
        <SourceLine source={source} />
      </div>
    </Placed>
  );
};

// ---------------------------------------------------------------- Comparison
type Column = { title: string; points: string[]; tone?: Tone };
export type ComparisonProps = BaseProps & { left: Column; right: Column; verdict?: string };

export const Comparison: React.FC<ComparisonProps> = ({ left, right, verdict, durationInFrames, position = "center" }) => {
  const { frame, opacity, y } = useEnter(durationInFrames);
  const verdictP = progress(frame, Math.round(durationInFrames * 0.62), 10);
  const col = (c: Column, offset: number) => (
    <div style={{ ...cardStyle(), flex: 1, padding: "30px 28px", borderTop: `8px solid ${toneColor(c.tone ?? "mute")}` }}>
      <div style={{ fontFamily: display, fontWeight: 800, fontSize: 44, color: toneColor(c.tone ?? "white"), textTransform: "uppercase", lineHeight: 1.05 }}>{c.title}</div>
      {c.points.map((p, i) => {
        const a = progress(frame, offset + i * 6, 10);
        return (
          <div key={i} style={{ fontFamily: body, fontWeight: 500, fontSize: 34, lineHeight: 1.25, color: color.white, marginTop: 18, opacity: a, translate: `${(1 - a) * 16}px 0px` }}>
            {p}
          </div>
        );
      })}
    </div>
  );
  return (
    <Placed position={position}>
      <div style={{ opacity, translate: `0px ${y}px`, display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ display: "flex", gap: 22 }}>
          {col(left, 8)}
          {col(right, 8 + left.points.length * 6)}
        </div>
        {verdict ? (
          <div style={{ backgroundColor: color.signal, color: color.ink, fontFamily: display, fontWeight: 800, fontSize: 48, textTransform: "uppercase", textAlign: "center", borderRadius: 22, padding: "22px 26px", opacity: verdictP, scale: `${0.95 + 0.05 * verdictP}` }}>
            {verdict}
          </div>
        ) : null}
      </div>
    </Placed>
  );
};
