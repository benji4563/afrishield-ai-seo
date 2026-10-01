import React from "react";
import { color, toneColor, type BaseProps } from "../signal/tokens";
import { display, body, mono } from "../signal/fonts";
import { Placed, cardStyle, progress, useEnter } from "../signal/primitives";

// ---------------------------------------------------------------- Warning
export type WarningProps = BaseProps & { title: string; text?: string; tone?: "warn" | "danger" };

export const Warning: React.FC<WarningProps> = ({ title, text, tone = "danger", durationInFrames, position = "upper" }) => {
  const { opacity, inP } = useEnter(durationInFrames, { enter: 10 });
  const c = toneColor(tone);
  return (
    <Placed position={position}>
      <div style={{ ...cardStyle(), opacity, scale: `${0.9 + 0.1 * inP}`, borderColor: c, borderWidth: 5, display: "flex", gap: 30, alignItems: "center" }}>
        <svg width={120} height={108} viewBox="0 0 120 108" style={{ flexShrink: 0 }}>
          <path d="M60 6 L114 102 H6 Z" fill="none" stroke={c} strokeWidth={10} strokeLinejoin="round" />
          <rect x={55} y={38} width={10} height={34} rx={5} fill={c} />
          <circle cx={60} cy={86} r={6} fill={c} />
        </svg>
        <div>
          <div style={{ fontFamily: display, fontWeight: 800, fontSize: 60, lineHeight: 1.02, color: c, textTransform: "uppercase" }}>{title}</div>
          {text ? <div style={{ fontFamily: body, fontWeight: 500, fontSize: 38, color: color.white, marginTop: 8 }}>{text}</div> : null}
        </div>
      </div>
    </Placed>
  );
};

// ---------------------------------------------------------------- Success
export type SuccessProps = BaseProps & { title: string; text?: string };

export const Success: React.FC<SuccessProps> = ({ title, text, durationInFrames, position = "upper" }) => {
  const { frame, opacity, inP } = useEnter(durationInFrames, { enter: 10 });
  const check = progress(frame, 6, 12);
  return (
    <Placed position={position}>
      <div style={{ ...cardStyle(), opacity, scale: `${0.9 + 0.1 * inP}`, borderColor: color.signal, borderWidth: 5, display: "flex", gap: 30, alignItems: "center" }}>
        <svg width={116} height={116} viewBox="0 0 116 116" style={{ flexShrink: 0 }}>
          <circle cx={58} cy={58} r={52} fill={color.signal} />
          <path d="M32 60 L51 78 L86 40" fill="none" stroke={color.ink} strokeWidth={12} strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - check} />
        </svg>
        <div>
          <div style={{ fontFamily: display, fontWeight: 800, fontSize: 60, lineHeight: 1.02, color: color.signal, textTransform: "uppercase" }}>{title}</div>
          {text ? <div style={{ fontFamily: body, fontWeight: 500, fontSize: 38, color: color.white, marginTop: 8 }}>{text}</div> : null}
        </div>
      </div>
    </Placed>
  );
};

// ---------------------------------------------------------------- CTA
export type CTAProps = BaseProps & { keyword?: string; line: string; sub?: string; verb?: string };

export const CTA: React.FC<CTAProps> = ({ keyword, line, sub = "afrishieldai.com", verb = "Comment", durationInFrames, position = "center" }) => {
  const { frame, fps, opacity, y } = useEnter(durationInFrames, { exit: 4 });
  const pulse = 1 + 0.04 * Math.sin((frame / fps) * Math.PI * 2 * 1.2);
  return (
    <Placed position={position}>
      <div style={{ ...cardStyle(), opacity, translate: `0px ${y}px`, textAlign: "center", padding: "46px 40px" }}>
        {keyword ? (
          <>
            <div style={{ fontFamily: mono, fontWeight: 700, fontSize: 34, color: color.mute, letterSpacing: "0.2em", textTransform: "uppercase" }}>{verb}</div>
            <div style={{ fontFamily: display, fontWeight: 800, fontSize: 170, lineHeight: 1, color: color.signal, scale: `${pulse}`, margin: "10px 0 18px" }}>“{keyword}”</div>
          </>
        ) : null}
        <div style={{ fontFamily: display, fontWeight: 700, fontSize: 52, lineHeight: 1.12, color: color.white }}>{line}</div>
        {sub ? <div style={{ fontFamily: mono, fontSize: 30, color: color.signal, marginTop: 22 }}>{sub}</div> : null}
      </div>
    </Placed>
  );
};
