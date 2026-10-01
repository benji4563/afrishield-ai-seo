import React from "react";
import { color, type BaseProps } from "../signal/tokens";
import { display, body, mono } from "../signal/fonts";
import { Placed, Tag, cardStyle, progress, useEnter } from "../signal/primitives";

// ---------------------------------------------------------------- StoryCard
export type StoryCardProps = BaseProps & { text: string; kicker?: string; meta?: string };

export const StoryCard: React.FC<StoryCardProps> = ({ text, kicker = "The story", meta, durationInFrames, position = "upper" }) => {
  const { frame, opacity, y } = useEnter(durationInFrames);
  const rule = progress(frame, 4, 14);
  return (
    <Placed position={position}>
      <div style={{ ...cardStyle(), opacity, translate: `0px ${y}px`, display: "flex", gap: 28, alignSelf: "flex-start" }}>
        <div style={{ width: 10, borderRadius: 5, backgroundColor: color.signal, height: `${rule * 100}%`, flexShrink: 0 }} />
        <div>
          <div style={{ fontFamily: mono, fontWeight: 700, fontSize: 28, color: color.signal, letterSpacing: "0.14em", textTransform: "uppercase" }}>{kicker}</div>
          <div style={{ fontFamily: display, fontWeight: 700, fontSize: 56, lineHeight: 1.1, color: color.white, marginTop: 10 }}>{text}</div>
          {meta ? <div style={{ fontFamily: mono, fontSize: 30, color: color.mute, marginTop: 16 }}>{meta}</div> : null}
        </div>
      </div>
    </Placed>
  );
};

// ---------------------------------------------------------------- HumorCard
export type HumorCardProps = BaseProps & { line: string; tag?: string };

export const HumorCard: React.FC<HumorCardProps> = ({ line, tag, durationInFrames, position = "upper" }) => {
  const { opacity, inP } = useEnter(durationInFrames, { enter: 9 });
  return (
    <Placed position={position}>
      <div style={{ ...cardStyle("bone"), opacity, rotate: `${-2.5 * inP}deg`, scale: `${0.85 + 0.15 * inP}`, alignSelf: "center", maxWidth: 820, textAlign: "center" }}>
        {tag ? <Tag style={{ alignSelf: "center", marginBottom: 14, marginLeft: "auto", marginRight: "auto" }}>{tag}</Tag> : null}
        <div style={{ fontFamily: display, fontWeight: 800, fontSize: 60, lineHeight: 1.08, color: color.ink }}>{line}</div>
      </div>
    </Placed>
  );
};

// ---------------------------------------------------------------- QuoteCard
// A quote without a source renders a visible SOURCE MISSING tag so QA catches it.
export type QuoteCardProps = BaseProps & { quote: string; author: string; role?: string; source?: string };

export const QuoteCard: React.FC<QuoteCardProps> = ({ quote, author, role, source, durationInFrames, position = "center" }) => {
  const { opacity, y } = useEnter(durationInFrames);
  return (
    <Placed position={position}>
      <div style={{ ...cardStyle(), opacity, translate: `0px ${y}px` }}>
        <div style={{ fontFamily: display, fontWeight: 800, fontSize: 160, lineHeight: 0.6, color: color.signal }}>“</div>
        <div style={{ fontFamily: display, fontWeight: 700, fontSize: 56, lineHeight: 1.15, color: color.white }}>{quote}</div>
        <div style={{ fontFamily: body, fontWeight: 700, fontSize: 38, color: color.signal, marginTop: 24 }}>— {author}</div>
        {role ? <div style={{ fontFamily: body, fontWeight: 500, fontSize: 32, color: color.mute }}>{role}</div> : null}
        {source ? <div style={{ fontFamily: mono, fontSize: 24, color: color.mute, marginTop: 14 }}>{source}</div> : <Tag tone="danger" style={{ marginTop: 14 }}>Source missing</Tag>}
      </div>
    </Placed>
  );
};

// ---------------------------------------------------------------- NewsCard
export type NewsCardProps = BaseProps & { outlet: string; headline: string; date: string; url?: string; whyItMatters?: string };

export const NewsCard: React.FC<NewsCardProps> = ({ outlet, headline, date, url, whyItMatters, durationInFrames, position = "upper" }) => {
  const { frame, opacity, y } = useEnter(durationInFrames);
  const why = progress(frame, Math.round(durationInFrames * 0.45), 10);
  return (
    <Placed position={position}>
      <div style={{ ...cardStyle(), opacity, translate: `0px ${y}px` }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontFamily: mono, fontWeight: 700, fontSize: 28, color: color.mute, textTransform: "uppercase", letterSpacing: "0.08em" }}>
          <span>{outlet}</span>
          <span>{date}</span>
        </div>
        <div style={{ fontFamily: display, fontWeight: 800, fontSize: 62, lineHeight: 1.06, color: color.white, marginTop: 16 }}>{headline}</div>
        {url ? <div style={{ fontFamily: mono, fontSize: 24, color: color.mute, marginTop: 12 }}>{url}</div> : null}
        {whyItMatters ? (
          <div style={{ marginTop: 26, borderTop: `2px solid ${color.inkLine}`, paddingTop: 22, opacity: why }}>
            <div style={{ fontFamily: mono, fontWeight: 700, fontSize: 26, color: color.signal, letterSpacing: "0.14em" }}>WHY IT MATTERS</div>
            <div style={{ fontFamily: body, fontWeight: 500, fontSize: 40, color: color.white, marginTop: 6 }}>{whyItMatters}</div>
          </div>
        ) : null}
      </div>
    </Placed>
  );
};
