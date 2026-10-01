import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  AbsoluteFill,
  continueRender,
  delayRender,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  createTikTokStyleCaptions,
  type Caption,
  type TikTokPage,
} from "@remotion/captions";

const SWITCH_MS = 1200;
const HIGHLIGHT = "#FFD54A"; // AfriShield gold, punchier
const NORMAL = "#FFFFFF";
const STROKE = "#0B0F19";

const CaptionPage: React.FC<{ page: TikTokPage }> = ({ page }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localMs = (frame / fps) * 1000;
  const absoluteMs = page.startMs + localMs;
  return (
    <AbsoluteFill
      style={{
        justifyContent: "flex-end",
        alignItems: "center",
        padding: "0 60px 260px",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "4px 0",
          fontSize: 72,
          fontWeight: 900,
          letterSpacing: -0.5,
          lineHeight: 1.15,
          textAlign: "center",
          textShadow: `
            -4px -4px 0 ${STROKE},
            4px -4px 0 ${STROKE},
            -4px 4px 0 ${STROKE},
            4px 4px 0 ${STROKE},
            0 6px 20px rgba(0,0,0,0.9)`,
          whiteSpace: "pre",
        }}
      >
        {page.tokens.map((token, i) => {
          const active = token.fromMs <= absoluteMs && token.toMs > absoluteMs;
          return (
            <span
              key={`${token.fromMs}-${i}`}
              style={{
                color: active ? HIGHLIGHT : NORMAL,
                scale: active ? "1.08" : "1",
                display: "inline-block",
                transformOrigin: "center",
                transition: "none",
              }}
            >
              {token.text}
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// Renders one .json caption file's pages, all offset by `offsetSeconds`.
export const CaptionsForClip: React.FC<{
  jsonPath: string; // relative to public/
  offsetSeconds: number; // offset from the master timeline start
  totalDurationInFrames: number;
}> = ({ jsonPath, offsetSeconds, totalDurationInFrames }) => {
  const { fps } = useVideoConfig();
  const [captions, setCaptions] = useState<Caption[] | null>(null);
  const [handle] = useState(() => delayRender());

  const fetchCaptions = useCallback(async () => {
    try {
      const res = await fetch(staticFile(jsonPath));
      if (!res.ok) throw new Error(`Missing ${jsonPath}`);
      const data = (await res.json()) as Caption[];
      setCaptions(data);
      continueRender(handle);
    } catch (e) {
      console.warn(`[captions] failed to load ${jsonPath}, skipping`, e);
      setCaptions([]);
      continueRender(handle);
    }
  }, [jsonPath, handle]);

  useEffect(() => {
    fetchCaptions();
  }, [fetchCaptions]);

  const pages = useMemo(() => {
    if (!captions) return [];
    return createTikTokStyleCaptions({
      captions,
      combineTokensWithinMilliseconds: SWITCH_MS,
    }).pages;
  }, [captions]);

  const frame = useCurrentFrame();
  if (!captions) return null;
  const currentMs = ((frame - offsetSeconds * fps) / fps) * 1000;

  // Find the active page for this clip's local time.
  let active: TikTokPage | null = null;
  for (let i = 0; i < pages.length; i++) {
    const p = pages[i];
    const next = pages[i + 1];
    const endMs = Math.min(next ? next.startMs : Infinity, p.startMs + SWITCH_MS);
    if (currentMs >= p.startMs && currentMs < endMs) {
      active = p;
      break;
    }
  }
  if (!active) return null;

  return <CaptionPage page={active} />;
};
