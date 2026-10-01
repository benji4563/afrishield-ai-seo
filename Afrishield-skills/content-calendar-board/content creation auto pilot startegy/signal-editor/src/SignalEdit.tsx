import React from "react";
import { AbsoluteFill, Sequence, staticFile, useVideoConfig, type CalculateMetadataFunction } from "remotion";
import { Video } from "@remotion/media";
import { color } from "./signal/tokens";
import { BurstCaption } from "./components/Text";
import { REGISTRY, FULLSCREEN, type ComponentName } from "./registry";

// An edit spec is the contract between the remotion-editing agent and the renderer.
// It is built from the REAL transcript by scripts/build-edit-spec.mjs.
export type SpecEvent = {
  id?: string;
  component: ComponentName;
  startMs: number;
  endMs: number;
  props: Record<string, unknown>;
  trigger?: { phrase: string; matched?: string };
};

export type EditSpec = {
  id: string;
  content_id?: string;
  fps?: number;
  width?: number;
  height?: number;
  durationMs: number;
  background?: "ink" | "bone";
  source?: { video: string; trimStartMs?: number; volume?: number };
  captions?: { src: string };
  events: SpecEvent[];
};

export type SignalEditProps = { spec: EditSpec };

export const SignalEdit: React.FC<SignalEditProps> = ({ spec }) => {
  const { fps } = useVideoConfig();
  const f = (ms: number) => Math.round((ms / 1000) * fps);
  const trim = spec.source?.trimStartMs ?? 0;
  // Proof / full-screen explainers sit below overlays; captions always on top.
  const ordered = [...spec.events].sort((a, b) => Number(!FULLSCREEN.has(a.component)) - Number(!FULLSCREEN.has(b.component)) || a.startMs - b.startMs);

  return (
    <AbsoluteFill style={{ backgroundColor: spec.background === "bone" ? color.bone : color.ink }}>
      {spec.source?.video ? (
        <Video src={staticFile(spec.source.video)} trimBefore={f(trim)} volume={spec.source.volume ?? 1} objectFit="cover" style={{ width: "100%", height: "100%" }} />
      ) : null}
      {ordered.map((e, i) => {
        const Component = REGISTRY[e.component] as React.FC<Record<string, unknown>>;
        if (!Component) throw new Error(`Unknown component in spec: ${e.component}`);
        const from = f(e.startMs);
        const durationInFrames = Math.max(2, f(e.endMs) - from);
        return (
          <Sequence key={e.id ?? `${e.component}-${i}`} name={`${e.component}${e.trigger ? ` · "${e.trigger.phrase}"` : ""}`} from={from} durationInFrames={durationInFrames}>
            <Component {...e.props} durationInFrames={durationInFrames} />
          </Sequence>
        );
      })}
      {spec.captions ? <BurstCaption src={spec.captions.src} offsetMs={trim} /> : null}
    </AbsoluteFill>
  );
};

export const calculateSignalEditMetadata: CalculateMetadataFunction<SignalEditProps> = ({ props }) => {
  const fps = props.spec.fps ?? 30;
  return {
    fps,
    width: props.spec.width ?? 1080,
    height: props.spec.height ?? 1920,
    durationInFrames: Math.max(1, Math.ceil((props.spec.durationMs / 1000) * fps)),
    defaultOutName: props.spec.id,
  };
};
