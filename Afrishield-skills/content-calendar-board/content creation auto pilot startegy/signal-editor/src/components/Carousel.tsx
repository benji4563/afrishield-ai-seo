import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { color } from "../signal/tokens";
import { display, body, mono } from "../signal/fonts";
import { isEmphasis } from "../signal/primitives";

// Instagram carousel (ink ground) and LinkedIn document carousel (bone ground) slides.
// Rendered as stills by scripts/render-carousel.mjs, 1080×1350.
export type SlideVariant = "cover" | "stakes" | "point" | "proof" | "signal" | "compare" | "takeaway" | "cta";
export type CarouselSlideProps = {
  variant: SlideVariant;
  theme: "instagram" | "linkedin";
  index: number;
  total: number;
  headline?: string;
  emphasis?: string[];
  sub?: string;
  body?: string;
  points?: string[];
  src?: string;
  source?: string;
  nodes?: string[];
  left?: { title: string; points: string[] };
  right?: { title: string; points: string[] };
  keyword?: string;
  handle?: string;
};

export const CarouselSlide: React.FC<CarouselSlideProps> = (p) => {
  const light = p.theme === "linkedin";
  const ground = light ? color.bone : color.ink;
  const text = light ? color.ink : color.white;
  const accent = light ? color.signalDeep : color.signal;
  const muted = light ? color.slate : color.mute;
  const line = light ? color.boneLine : color.inkLine;
  const M = 96;

  const headline = (size: number) =>
    p.headline ? (
      <div style={{ fontFamily: display, fontWeight: 800, fontSize: size, lineHeight: 1.02, letterSpacing: "-0.015em", textTransform: light ? "none" : "uppercase", color: text, display: "flex", flexWrap: "wrap", gap: "0 0.28em" }}>
        {p.headline.split(/\s+/).map((w, i) => (
          <span key={i} style={{ color: isEmphasis(w, p.emphasis) ? accent : text }}>
            {w}
          </span>
        ))}
      </div>
    ) : null;

  const content = (() => {
    switch (p.variant) {
      case "cover":
        return (
          <>
            {headline(light ? 104 : 112)}
            {p.sub ? <div style={{ fontFamily: body, fontWeight: 500, fontSize: 46, lineHeight: 1.3, color: muted, marginTop: 34 }}>{p.sub}</div> : null}
          </>
        );
      case "proof":
        return (
          <>
            {headline(70)}
            {p.src ? (
              <div style={{ marginTop: 34, height: 700, borderRadius: 24, overflow: "hidden", border: `4px solid ${accent}` }}>
                <Img src={staticFile(p.src)} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} />
              </div>
            ) : null}
          </>
        );
      case "signal":
        return (
          <>
            {headline(70)}
            <div style={{ marginTop: 40, display: "flex", flexDirection: "column", alignItems: "center" }}>
              {(p.nodes ?? []).map((n, i, a) => (
                <React.Fragment key={i}>
                  <div style={{ border: `4px solid ${accent}`, borderRadius: 22, padding: "16px 40px", fontFamily: display, fontWeight: 800, fontSize: 42, color: text, textTransform: "uppercase", minWidth: 480, textAlign: "center" }}>{n}</div>
                  {i < a.length - 1 ? <div style={{ width: 8, height: 44, backgroundColor: accent, borderRadius: 4 }} /> : null}
                </React.Fragment>
              ))}
            </div>
          </>
        );
      case "compare":
        return (
          <>
            {headline(66)}
            <div style={{ display: "flex", gap: 24, marginTop: 36 }}>
              {[p.left, p.right].map((c, i) =>
                c ? (
                  <div key={i} style={{ flex: 1, border: `3px solid ${i ? accent : line}`, borderRadius: 24, padding: 30 }}>
                    <div style={{ fontFamily: display, fontWeight: 800, fontSize: 40, color: i ? accent : muted, textTransform: "uppercase" }}>{c.title}</div>
                    {c.points.map((pt, k) => (
                      <div key={k} style={{ fontFamily: body, fontWeight: 500, fontSize: 34, lineHeight: 1.3, color: text, marginTop: 16 }}>
                        {i ? "✓ " : "✕ "}
                        {pt}
                      </div>
                    ))}
                  </div>
                ) : null,
              )}
            </div>
          </>
        );
      case "cta":
        return (
          <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
            {headline(80)}
            {p.keyword ? (
              <>
                <div style={{ fontFamily: mono, fontWeight: 700, fontSize: 34, color: muted, letterSpacing: "0.2em", marginTop: 40 }}>COMMENT</div>
                <div style={{ fontFamily: display, fontWeight: 800, fontSize: 180, color: accent, lineHeight: 1 }}>“{p.keyword}”</div>
              </>
            ) : null}
            {p.body ? <div style={{ fontFamily: body, fontWeight: 500, fontSize: 42, lineHeight: 1.35, color: text, marginTop: 30 }}>{p.body}</div> : null}
          </div>
        );
      default:
        return (
          <>
            {headline(p.variant === "takeaway" ? 92 : 84)}
            {p.body ? <div style={{ fontFamily: body, fontWeight: 500, fontSize: light ? 44 : 50, lineHeight: 1.36, color: text, marginTop: 36 }}>{p.body}</div> : null}
            {(p.points ?? []).map((pt, i) => (
              <div key={i} style={{ display: "flex", gap: 22, marginTop: 24, fontFamily: body, fontWeight: 500, fontSize: 40, lineHeight: 1.3, color: text }}>
                <span style={{ color: accent, fontFamily: display, fontWeight: 800 }}>→</span>
                <span>{pt}</span>
              </div>
            ))}
          </>
        );
    }
  })();

  return (
    // Only proof slides anchor to the top (the screenshot needs the height); everything else centres.
    <AbsoluteFill style={{ backgroundColor: ground, padding: M, boxSizing: "border-box", justifyContent: p.variant === "proof" ? "flex-start" : "center" }}>
      <div style={{ position: "absolute", top: 56, left: M, right: M, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 18, height: 18, borderRadius: 9, backgroundColor: accent }} />
          <div style={{ fontFamily: mono, fontWeight: 700, fontSize: 24, color: muted, letterSpacing: "0.1em" }}>AFRISHIELD AI</div>
        </div>
        <div style={{ fontFamily: mono, fontWeight: 700, fontSize: 26, color: muted }}>
          {String(p.index).padStart(2, "0")}/{String(p.total).padStart(2, "0")}
        </div>
      </div>
      <div style={{ marginTop: p.variant === "proof" ? 90 : 0 }}>{content}</div>
      <div style={{ position: "absolute", bottom: 52, left: M, right: M, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontFamily: mono, fontSize: 22, color: muted, maxWidth: 700 }}>{p.source ?? p.handle ?? ""}</div>
        {p.variant === "cover" && p.index < p.total ? <div style={{ fontFamily: display, fontWeight: 800, fontSize: 34, color: accent }}>SWIPE →</div> : null}
      </div>
    </AbsoluteFill>
  );
};
