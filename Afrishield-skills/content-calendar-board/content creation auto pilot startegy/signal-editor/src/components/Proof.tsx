import React from "react";
import { AbsoluteFill, Img, interpolate, staticFile } from "remotion";
import { color, type BaseProps } from "../signal/tokens";
import { display, body, mono } from "../signal/fonts";
import { CLAMP, Placed, SourceLine, Tag, cardStyle, progress, useEnter } from "../signal/primitives";

const src = (s: string) => (/^https?:/.test(s) ? s : staticFile(s));

// ---------------------------------------------------------------- ProofFlash
export type ProofFlashProps = BaseProps & { label?: string };

export const ProofFlash: React.FC<ProofFlashProps> = ({ label = "Receipt", durationInFrames }) => {
  const { frame, opacity } = useEnter(durationInFrames, { enter: 6, exit: 6 });
  const flash = interpolate(frame, [0, 5], [0.85, 0], CLAMP);
  const corner = progress(frame, 2, 10);
  const L = 120 * corner;
  const c = { position: "absolute" as const, width: L, height: L, borderColor: color.signal, borderStyle: "solid" as const };
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <AbsoluteFill style={{ backgroundColor: color.white, opacity: flash }} />
      <div style={{ ...c, top: 200, left: 70, borderWidth: "8px 0 0 8px" }} />
      <div style={{ ...c, top: 200, right: 120, borderWidth: "8px 8px 0 0" }} />
      <div style={{ ...c, bottom: 400, left: 70, borderWidth: "0 0 8px 8px" }} />
      <div style={{ ...c, bottom: 400, right: 120, borderWidth: "0 8px 8px 0" }} />
      <div style={{ position: "absolute", top: 240, width: "100%", display: "flex", justifyContent: "center", opacity }}>
        <Tag style={{ alignSelf: "center", fontSize: 34 }}>{label}</Tag>
      </div>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- Screenshot
export type ScreenshotProps = BaseProps & {
  src: string;
  caption?: string;
  source?: string;
  illustration?: boolean;
  zoom?: [number, number];
  focus?: { x: number; y: number };
  height?: number;
};

export const Screenshot: React.FC<ScreenshotProps> = ({ src: s, caption, source, illustration, zoom = [1, 1.08], focus = { x: 0.5, y: 0.35 }, height = 680, durationInFrames, position = "upper" }) => {
  const { frame, opacity, y } = useEnter(durationInFrames);
  const scale = interpolate(frame, [0, durationInFrames], zoom, CLAMP);
  return (
    <Placed position={position}>
      <div style={{ opacity, translate: `0px ${y}px`, display: "flex", flexDirection: "column" }}>
        {caption ? <div style={{ fontFamily: display, fontWeight: 800, fontSize: 52, color: color.white, textTransform: "uppercase", marginBottom: 18, textShadow: "0 6px 20px rgba(0,0,0,0.8)" }}>{caption}</div> : null}
        <div style={{ height, borderRadius: 28, overflow: "hidden", border: `3px solid ${color.signal}`, boxShadow: "0 30px 80px rgba(0,0,0,0.6)", backgroundColor: color.inkSoft }}>
          <Img src={src(s)} style={{ width: "100%", height: "100%", objectFit: "cover", scale: `${scale}`, transformOrigin: `${focus.x * 100}% ${focus.y * 100}%` }} />
        </div>
        <SourceLine source={source} illustration={illustration} />
      </div>
    </Placed>
  );
};

// ---------------------------------------------------------------- BrowserFrame
export type BrowserFrameProps = BaseProps & { url: string; src?: string; title?: string; scroll?: [number, number]; source?: string; illustration?: boolean; height?: number };

export const BrowserFrame: React.FC<BrowserFrameProps> = ({ url, src: s, title, scroll = [0, 0], source, illustration, height = 1000, durationInFrames, position = "center" }) => {
  const { frame, opacity, y } = useEnter(durationInFrames);
  const pos = interpolate(frame, [8, durationInFrames - 8], scroll, CLAMP);
  const typed = Math.round(interpolate(frame, [0, 14], [0, url.length], CLAMP));
  return (
    <Placed position={position}>
      <div style={{ opacity, translate: `0px ${y}px` }}>
        <div style={{ borderRadius: 26, overflow: "hidden", border: `2px solid ${color.inkLine}`, boxShadow: "0 30px 80px rgba(0,0,0,0.6)", backgroundColor: color.inkSoft }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "20px 24px", backgroundColor: color.ink, borderBottom: `2px solid ${color.inkLine}` }}>
            {[color.danger, color.warn, color.signal].map((c) => (
              <div key={c} style={{ width: 18, height: 18, borderRadius: 9, backgroundColor: c }} />
            ))}
            <div style={{ flex: 1, marginLeft: 10, fontFamily: mono, fontSize: 30, color: color.white, backgroundColor: color.inkSoft, borderRadius: 999, padding: "10px 22px", whiteSpace: "nowrap", overflow: "hidden" }}>
              <span style={{ color: color.signal }}>● </span>
              {url.slice(0, typed)}
            </div>
          </div>
          <div style={{ height, position: "relative" }}>
            {s ? (
              <Img src={src(s)} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: `50% ${pos}%` }} />
            ) : (
              <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: 60 }}>
                <div style={{ fontFamily: display, fontWeight: 800, fontSize: 64, color: color.white, textAlign: "center" }}>{title ?? url}</div>
              </AbsoluteFill>
            )}
          </div>
        </div>
        <SourceLine source={source} illustration={illustration || !s} />
      </div>
    </Placed>
  );
};

// ---------------------------------------------------------------- AIChat
// Frames a REAL AI session transcript. Set illustration=true for teaching mock-ups.
export type AIChatProps = BaseProps & { engine: string; prompt: string; response: string; highlight?: string[]; source?: string; illustration?: boolean };

export const AIChat: React.FC<AIChatProps> = ({ engine, prompt, response, highlight = [], source, illustration, durationInFrames, position = "center" }) => {
  const { frame, opacity, y } = useEnter(durationInFrames);
  const typeEnd = Math.min(40, Math.round(durationInFrames * 0.28));
  const typed = Math.round(interpolate(frame, [4, typeEnd], [0, prompt.length], CLAMP));
  const text = response.length > 420 ? `${response.slice(0, 417)}…` : response;
  const shown = Math.round(interpolate(frame, [typeEnd + 8, Math.max(typeEnd + 9, durationInFrames * 0.75)], [0, text.length], CLAMP));
  const escaped = highlight.map((h) => h.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).filter(Boolean);
  const parts = escaped.length ? text.split(new RegExp(`(${escaped.join("|")})`, "gi")) : [text];
  let used = 0;
  return (
    <Placed position={position}>
      <div style={{ ...cardStyle(), opacity, translate: `0px ${y}px`, padding: 0, overflow: "hidden" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "24px 34px", borderBottom: `2px solid ${color.inkLine}` }}>
          <div style={{ fontFamily: display, fontWeight: 700, fontSize: 40, color: color.white }}>{engine}</div>
          {illustration ? <Tag tone="warn">Illustration</Tag> : <Tag>Real session</Tag>}
        </div>
        <div style={{ padding: "30px 34px", display: "flex", flexDirection: "column", gap: 26 }}>
          <div style={{ alignSelf: "flex-end", maxWidth: "86%", backgroundColor: color.inkLine, color: color.white, fontFamily: body, fontWeight: 500, fontSize: 38, lineHeight: 1.3, padding: "20px 26px", borderRadius: 26 }}>
            {prompt.slice(0, typed)}
            {typed < prompt.length ? <span style={{ color: color.signal }}>▍</span> : null}
          </div>
          <div style={{ fontFamily: body, fontWeight: 500, fontSize: 36, lineHeight: 1.42, color: color.white, minHeight: 200 }}>
            {parts.map((p, i) => {
              const start = used;
              used += p.length;
              const visible = p.slice(0, Math.max(0, shown - start));
              if (!visible) return null;
              const hit = escaped.length > 0 && new RegExp(`^(${escaped.join("|")})$`, "i").test(p);
              return (
                <span key={i} style={hit ? { backgroundColor: color.signal, color: color.ink, borderRadius: 8, padding: "0 8px", fontWeight: 700 } : undefined}>
                  {visible}
                </span>
              );
            })}
          </div>
        </div>
        <div style={{ padding: "0 34px 24px" }}>
          <SourceLine source={source} />
        </div>
      </div>
    </Placed>
  );
};

// ---------------------------------------------------------------- SearchResult
export type SearchResultProps = BaseProps & {
  query: string;
  results: { title: string; url: string; snippet?: string; highlight?: boolean; badge?: string }[];
  engine?: string;
  source?: string;
  illustration?: boolean;
};

export const SearchResult: React.FC<SearchResultProps> = ({ query, results, engine = "Search", source, illustration, durationInFrames, position = "center" }) => {
  const { frame, opacity, y } = useEnter(durationInFrames);
  const typed = Math.round(interpolate(frame, [2, 20], [0, query.length], CLAMP));
  const focusAt = 26 + results.length * 6 + 10;
  const focusP = progress(frame, focusAt, 10);
  return (
    <Placed position={position}>
      <div style={{ opacity, translate: `0px ${y}px`, display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18, backgroundColor: color.white, borderRadius: 999, padding: "22px 32px", boxShadow: "0 18px 40px rgba(0,0,0,0.4)" }}>
          <div style={{ fontFamily: mono, fontSize: 26, color: color.slate }}>{engine}</div>
          <div style={{ fontFamily: body, fontWeight: 500, fontSize: 38, color: color.ink }}>{query.slice(0, typed)}</div>
        </div>
        {results.map((r, i) => {
          const p = progress(frame, 24 + i * 6, 10);
          const dim = r.highlight ? 1 : 1 - 0.55 * focusP;
          return (
            <div key={i} style={{ ...cardStyle(), padding: "24px 30px", opacity: p * dim, translate: `0px ${(1 - p) * 24}px`, borderColor: r.highlight ? color.signal : color.inkLine, borderWidth: r.highlight ? 4 : 2, scale: r.highlight ? `${1 + 0.02 * focusP}` : "1" }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 16 }}>
                <div style={{ fontFamily: mono, fontSize: 24, color: color.mute }}>{r.url}</div>
                {r.badge ? <Tag tone={r.highlight ? "signal" : "mute"}>{r.badge}</Tag> : null}
              </div>
              <div style={{ fontFamily: body, fontWeight: 700, fontSize: 38, color: r.highlight ? color.signal : color.white, marginTop: 6 }}>{r.title}</div>
              {r.snippet ? <div style={{ fontFamily: body, fontWeight: 500, fontSize: 30, color: color.mute, marginTop: 6 }}>{r.snippet}</div> : null}
            </div>
          );
        })}
        <SourceLine source={source} illustration={illustration} />
      </div>
    </Placed>
  );
};
