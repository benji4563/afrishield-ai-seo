import React, { useEffect, useState } from "react";
import { AbsoluteFill, spring, staticFile, useCurrentFrame, useDelayRender, useVideoConfig } from "remotion";
import { color, STROKE, type BaseProps } from "../signal/tokens";
import { display, body } from "../signal/fonts";
import { Placed, Tag, cardStyle, isEmphasis, useEnter } from "../signal/primitives";

// Uppercase Sora 800 averages ~0.72em per character; shrink so the longest word fits the safe width.
const fitSize = (text: string, max: number, width = 760) => {
  const longest = Math.max(...text.split(/\s+/).map((w) => w.length), 1);
  return Math.min(max, Math.floor(width / (longest * 0.72)));
};

// ---------------------------------------------------------------- Hook
export type HookProps = BaseProps & { text: string; emphasis?: string[]; sub?: string; tag?: string };

export const Hook: React.FC<HookProps> = ({ text, emphasis = [], sub, tag, durationInFrames, position = "top" }) => {
  const { frame, fps, opacity } = useEnter(durationInFrames);
  return (
    <Placed position={position}>
      <div style={{ opacity, display: "flex", flexDirection: "column", gap: 18 }}>
        {tag ? <Tag>{tag}</Tag> : null}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0 24px", fontFamily: display, fontWeight: 800, fontSize: fitSize(text, 98, 840), lineHeight: 1.02, textTransform: "uppercase", letterSpacing: "-0.01em", textShadow: STROKE }}>
          {text.split(/\s+/).map((w, i) => {
            const s = spring({ frame: frame - i * 3, fps, config: { damping: 200 }, durationInFrames: 12 });
            return (
              <span key={i} style={{ display: "inline-block", opacity: s, translate: `0px ${(1 - s) * 34}px`, color: isEmphasis(w, emphasis) ? color.signal : color.white }}>
                {w}
              </span>
            );
          })}
        </div>
        {sub ? <div style={{ fontFamily: body, fontWeight: 700, fontSize: 46, color: color.white, textShadow: STROKE }}>{sub}</div> : null}
      </div>
    </Placed>
  );
};

// ---------------------------------------------------------------- Headline (two-tier split)
export type HeadlineProps = BaseProps & { setup: string; punch: string; sub?: string; card?: boolean };

export const Headline: React.FC<HeadlineProps> = ({ setup, punch, sub, card = true, durationInFrames, position = "upper" }) => {
  const { opacity, y, frame, fps } = useEnter(durationInFrames);
  const punchIn = spring({ frame: frame - 6, fps, config: { damping: 200 }, durationInFrames: 12 });
  return (
    <Placed position={position}>
      <div style={{ ...(card ? cardStyle() : {}), opacity, translate: `0px ${y}px`, alignSelf: "flex-start", maxWidth: "100%" }}>
        <div style={{ fontFamily: display, fontWeight: 800, fontSize: 60, lineHeight: 1.05, color: color.white, textTransform: "uppercase", textShadow: card ? "none" : STROKE }}>{setup}</div>
        <div style={{ fontFamily: display, fontWeight: 800, fontSize: fitSize(punch, 104, 740), lineHeight: 1, color: color.signal, textTransform: "uppercase", opacity: punchIn, scale: `${0.92 + 0.08 * punchIn}`, transformOrigin: "left center", textShadow: card ? "none" : STROKE }}>
          {punch}
        </div>
        {sub ? <div style={{ fontFamily: body, fontWeight: 500, fontSize: 40, color: color.mute, marginTop: 14 }}>{sub}</div> : null}
      </div>
    </Placed>
  );
};

// ---------------------------------------------------------------- BurstCaption
// Consumes the bursts file written by scripts/build-edit-spec.mjs from the real
// transcript, so captions follow what was actually said.
export type BurstWord = { text: string; startMs: number; endMs: number; emphasis?: boolean };
export type Burst = { startMs: number; endMs: number; words: BurstWord[] };
export type CaptionFile = { version: 1; bursts: Burst[] };
export type BurstCaptionProps = { src?: string; bursts?: Burst[]; offsetMs?: number; topY?: number; ground?: "video" | "ink" };

const HOLD_AFTER_MS = 350;

export const BurstCaption: React.FC<BurstCaptionProps> = ({ src, bursts: inline, offsetMs = 0, topY = 1290 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { delayRender, continueRender, cancelRender } = useDelayRender();
  const [loaded, setLoaded] = useState<Burst[] | null>(inline ?? null);
  const [handle] = useState(() => (src && !inline ? delayRender(`captions ${src}`) : null));

  useEffect(() => {
    if (!src || inline || handle === null) return;
    fetch(staticFile(src))
      .then((r) => {
        if (!r.ok) throw new Error(`Caption file missing: ${src}`);
        return r.json() as Promise<CaptionFile>;
      })
      .then((d) => {
        setLoaded(d.bursts);
        continueRender(handle);
      })
      .catch((e) => cancelRender(e));
  }, [src, inline, handle, continueRender, cancelRender]);

  if (!loaded) return null;
  const now = (frame / fps) * 1000 + offsetMs;
  const idx = loaded.findIndex((b, i) => {
    const next = loaded[i + 1];
    const end = Math.min(next ? next.startMs : Infinity, b.endMs + HOLD_AFTER_MS);
    return now >= b.startMs && now < end;
  });
  if (idx < 0) return null;
  const burst = loaded[idx];
  const localFrame = ((now - burst.startMs) / 1000) * fps;
  const pop = spring({ frame: localFrame, fps, config: { damping: 200 }, durationInFrames: 7 });

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div style={{ position: "absolute", top: topY, left: 90, right: 140, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "10px 18px", scale: `${0.94 + 0.06 * pop}` }}>
        {burst.words
          .filter((w) => w.startMs <= now)
          .map((w, i) => (
            <span
              key={`${w.startMs}-${i}`}
              style={{
                fontFamily: display,
                fontWeight: 800,
                fontSize: 80,
                lineHeight: 1.1,
                textTransform: "uppercase",
                color: w.emphasis ? color.ink : color.white,
                backgroundColor: w.emphasis ? color.signal : "transparent",
                padding: w.emphasis ? "0 16px" : 0,
                borderRadius: 12,
                textShadow: w.emphasis ? "none" : STROKE,
                boxShadow: w.emphasis ? "0 10px 30px rgba(0,0,0,0.5)" : "none",
              }}
            >
              {w.text}
            </span>
          ))}
      </div>
    </AbsoluteFill>
  );
};
