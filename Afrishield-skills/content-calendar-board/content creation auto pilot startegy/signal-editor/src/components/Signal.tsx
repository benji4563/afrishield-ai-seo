import React from "react";
import { AbsoluteFill, interpolate, useVideoConfig } from "remotion";
import { color, SAFE, type BaseProps } from "../signal/tokens";
import { display, body, mono } from "../signal/fonts";
import { CLAMP, Placed, cardStyle, progress, useEnter } from "../signal/primitives";

// ---------------------------------------------------------------- SignalPath
// THE AfriShield signature: nodes appear as they are named; a pulse carries the
// signal (information, attention, money, a customer) along the path.
export type SignalNode = { label: string; sub?: string; atMs?: number };
export type SignalPathProps = BaseProps & {
  nodes: SignalNode[];
  title?: string;
  brokenAfter?: number; // index of the node after which the path breaks (a leak)
  pulseLabel?: string;
  loop?: boolean;
  orientation?: "vertical" | "horizontal";
  backdrop?: number; // 0–1 ink backdrop opacity; use 1 over busy or pre-edited footage
};

export const SignalPath: React.FC<SignalPathProps> = ({ nodes, title, brokenAfter, pulseLabel, loop = true, orientation, backdrop = 0.9, durationInFrames }) => {
  const { frame, fps, opacity } = useEnter(durationInFrames);
  const { width, height } = useVideoConfig();
  const vertical = (orientation ?? (height > width ? "vertical" : "horizontal")) === "vertical";
  const n = nodes.length;
  const spread = Math.round((durationInFrames * 0.7) / Math.max(1, n));
  const appear = nodes.map((node, i) => (node.atMs !== undefined ? Math.round((node.atMs / 1000) * fps) : 6 + i * spread));

  // Nodes stay above the caption band (y≈1290) and below a title of up to two lines.
  const top = title ? SAFE.y0 + 300 : SAFE.y0 + 80;
  const bottom = vertical ? 1170 : height / 2;
  const pos = nodes.map((_, i) =>
    vertical
      ? { x: width / 2, y: n === 1 ? (top + bottom) / 2 : top + (i * (bottom - top)) / (n - 1) }
      : { x: n === 1 ? width / 2 : 150 + (i * (width - 300)) / (n - 1), y: height / 2 },
  );
  const allIn = appear[n - 1] + 12;
  const loopLen = Math.round(fps * 1.6);
  const loopT = frame > allIn && loop ? ((frame - allIn) % loopLen) / loopLen : null;

  const segments = pos.slice(0, -1).map((p, i) => {
    const q = pos[i + 1];
    const draw = progress(frame, appear[i + 1] - 2, 12);
    const broken = brokenAfter === i;
    return { p, q, draw, broken, i };
  });

  const pulseAt = (t: number) => {
    const lengths = segments.map((s) => Math.hypot(s.q.x - s.p.x, s.q.y - s.p.y));
    const reachable = brokenAfter !== undefined ? brokenAfter : segments.length;
    const total = lengths.slice(0, reachable).reduce((a, b) => a + b, 0);
    let dist = t * total;
    for (let i = 0; i < reachable; i++) {
      if (dist <= lengths[i]) {
        const s = segments[i];
        const k = dist / lengths[i];
        return { x: s.p.x + (s.q.x - s.p.x) * k, y: s.p.y + (s.q.y - s.p.y) * k };
      }
      dist -= lengths[i];
    }
    return pos[Math.min(reachable, n - 1)];
  };

  return (
    <AbsoluteFill style={{ opacity, backgroundColor: `rgba(20,20,15,${backdrop})` }}>
      {title ? (
        <div style={{ position: "absolute", top: SAFE.y0 + 50, left: SAFE.x0, right: width - SAFE.x1, fontFamily: display, fontWeight: 800, fontSize: 58, color: color.white, textTransform: "uppercase", textAlign: "center", lineHeight: 1.05 }}>
          {title}
        </div>
      ) : null}
      <svg width={width} height={height} style={{ position: "absolute", inset: 0 }}>
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="10" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {segments.map((s) => {
          const x2 = s.p.x + (s.q.x - s.p.x) * s.draw;
          const y2 = s.p.y + (s.q.y - s.p.y) * s.draw;
          return (
            <g key={s.i}>
              <line x1={s.p.x} y1={s.p.y} x2={x2} y2={y2} stroke={s.broken ? color.danger : color.signal} strokeWidth={10} strokeLinecap="round" strokeDasharray={s.broken ? "4 26" : undefined} opacity={0.9} />
              {s.broken && s.draw > 0.9 ? (
                <text x={(s.p.x + s.q.x) / 2 + (vertical ? 36 : 0)} y={(s.p.y + s.q.y) / 2 + (vertical ? 16 : -30)} fill={color.danger} fontSize={64} fontFamily={display} fontWeight={800} textAnchor="middle">
                  ✕
                </text>
              ) : null}
              {s.draw > 0 && s.draw < 1 ? <circle cx={x2} cy={y2} r={16} fill={color.signalGlow} filter="url(#glow)" /> : null}
            </g>
          );
        })}
        {loopT !== null
          ? (() => {
              const p = pulseAt(loopT);
              return <circle cx={p.x} cy={p.y} r={18} fill={color.signal} filter="url(#glow)" />;
            })()
          : null}
      </svg>
      {nodes.map((node, i) => {
        const a = progress(frame, appear[i], 10);
        const active = frame >= appear[i];
        const reachedBreak = brokenAfter !== undefined && i > brokenAfter;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: pos[i].x,
              top: pos[i].y,
              translate: "-50% -50%",
              scale: `${0.8 + 0.2 * a}`,
              opacity: a,
              ...cardStyle(),
              padding: "18px 30px",
              minWidth: vertical ? 520 : 180,
              textAlign: "center",
              borderColor: reachedBreak ? color.danger : active ? color.signal : color.inkLine,
              borderWidth: 4,
            }}
          >
            <div style={{ fontFamily: display, fontWeight: 800, fontSize: vertical ? 46 : 34, color: reachedBreak ? color.danger : color.white, textTransform: "uppercase" }}>{node.label}</div>
            {node.sub ? <div style={{ fontFamily: body, fontWeight: 500, fontSize: vertical ? 30 : 24, color: color.mute, marginTop: 4 }}>{node.sub}</div> : null}
          </div>
        );
      })}
      {pulseLabel && loopT !== null ? (
        // Sits between the title and the first node — the caption band below stays clear.
        <div style={{ position: "absolute", top: top - 110, width: "100%", textAlign: "center", fontFamily: mono, fontWeight: 700, fontSize: 28, color: color.signal, letterSpacing: "0.12em", textTransform: "uppercase" }}>
          ● {pulseLabel}
        </div>
      ) : null}
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- ProcessFlow
export type ProcessFlowProps = BaseProps & { steps: { label: string; detail?: string }[]; title?: string };

export const ProcessFlow: React.FC<ProcessFlowProps> = ({ steps, title, durationInFrames, position = "center" }) => {
  const { frame, opacity, y } = useEnter(durationInFrames);
  const step = Math.max(8, Math.round((durationInFrames * 0.65) / steps.length));
  return (
    <Placed position={position}>
      <div style={{ ...cardStyle(), opacity, translate: `0px ${y}px` }}>
        {title ? <div style={{ fontFamily: display, fontWeight: 800, fontSize: 50, color: color.white, textTransform: "uppercase", marginBottom: 26 }}>{title}</div> : null}
        {steps.map((s, i) => {
          const on = progress(frame, 6 + i * step, 10);
          const done = frame > 6 + (i + 1) * step;
          return (
            <div key={i} style={{ display: "flex", gap: 26, alignItems: "flex-start", marginTop: i ? 26 : 0, opacity: 0.35 + 0.65 * on }}>
              <div style={{ width: 72, height: 72, flexShrink: 0, borderRadius: 36, border: `4px solid ${on > 0.5 ? color.signal : color.inkLine}`, backgroundColor: done ? color.signal : "transparent", color: done ? color.ink : color.signal, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: display, fontWeight: 800, fontSize: 36 }}>
                {done ? "✓" : i + 1}
              </div>
              <div>
                <div style={{ fontFamily: display, fontWeight: 700, fontSize: 44, color: color.white }}>{s.label}</div>
                {s.detail ? <div style={{ fontFamily: body, fontWeight: 500, fontSize: 32, color: color.mute, marginTop: 4 }}>{s.detail}</div> : null}
              </div>
            </div>
          );
        })}
        <div style={{ height: 8, borderRadius: 4, backgroundColor: color.inkLine, marginTop: 30, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${interpolate(frame, [6, 6 + steps.length * step], [0, 100], CLAMP)}%`, backgroundColor: color.signal }} />
        </div>
      </div>
    </Placed>
  );
};
