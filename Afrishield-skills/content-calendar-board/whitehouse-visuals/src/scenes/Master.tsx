import { AbsoluteFill, Sequence } from "remotion";
import { VIDEO } from "../theme";
import { V1_Hook } from "./V1_Hook";
import { V2_Map } from "./V2_Map";
import { V3_Counters } from "./V3_Counters";
import { V4_TripAdvisor } from "./V4_TripAdvisor";
import { V5_Pivot } from "./V5_Pivot";
import { V6_Audit } from "./V6_Audit";
import { V7_Dashboard } from "./V7_Dashboard";
import { V8_RentedOwned } from "./V8_RentedOwned";
import { VOPip } from "./VOPip";

const fps = VIDEO.fps;
const s = (sec: number) => Math.round(sec * fps);

// Actual measured durations from ffprobe on the recorded VO clips.
export const VO_DURATIONS = {
  beat01: 16.4,
  beat02: 9.0,
  beat03: 25.1,
  beat04: 21.1,
  beat05: 15.6,
  beat06: 28.1,
  beat07: 34.6,
  beat08: 28.1,
  beat09: 14.9,
  beat10: 7.9,
} as const;

const B = VO_DURATIONS;
export const MASTER_TOTAL_SECONDS =
  B.beat01 + B.beat02 + B.beat03 + B.beat04 + B.beat05 +
  B.beat06 + B.beat07 + B.beat08 + B.beat09 + B.beat10;
export const MASTER_TOTAL_FRAMES = s(MASTER_TOTAL_SECONDS) + 30;

// Beat → visual scene mapping. V8 spans beats 8+9+10, with its CTA firing
// at the start of beat 10 (i.e. after 28.1 + 14.9 = 43.0s into the V8 slot).
const V8_SPAN = B.beat08 + B.beat09 + B.beat10;
const V8_CTA_AT = B.beat08 + B.beat09;

type Slot = {
  key: string;
  from: number; // frame
  durationInFrames: number;
  Scene: React.FC | null;
  sceneProps?: Record<string, unknown>;
  voSrc: string;
  label: string;
  pipPosition?: "bottom-right" | "top-center" | "center";
};

let cursor = 0;
const nextSlot = (
  key: string,
  seconds: number,
  Scene: React.FC | null,
  voSrc: string,
  label: string,
  extra?: { sceneProps?: Record<string, unknown>; pipPosition?: "bottom-right" | "top-center" | "center" }
): Slot => {
  const from = cursor;
  const durationInFrames = s(seconds);
  cursor += durationInFrames;
  return {
    key,
    from,
    durationInFrames,
    Scene,
    voSrc,
    label,
    sceneProps: extra?.sceneProps,
    pipPosition: extra?.pipPosition,
  };
};

const SLOTS: Slot[] = [
  nextSlot("b1", B.beat01, V1_Hook, "VO/beat01.mp4", "Hook", { pipPosition: "top-center" }),
  nextSlot("b2", B.beat02, V2_Map, "VO/beat02.mp4", "33 yrs · 4 branches"),
  nextSlot("b3", B.beat03, V3_Counters, "VO/beat03.mp4", "The numbers"),
  nextSlot("b4", B.beat04, V4_TripAdvisor, "VO/beat04.mp4", "TripAdvisor top 30"),
  nextSlot("b5", B.beat05, V5_Pivot, "VO/beat05.mp4", "The pivot", { pipPosition: "top-center" }),
  nextSlot("b6", B.beat06, V6_Audit, "VO/beat06.mp4", "Website audit"),
  nextSlot("b7", B.beat07, V7_Dashboard, "VO/beat07.mp4", "Traffic + leads"),
  {
    key: "b8-b10",
    from: cursor,
    durationInFrames: s(V8_SPAN),
    Scene: V8_RentedOwned,
    sceneProps: { ctaAtSecond: V8_CTA_AT },
    voSrc: "VO/beat08.mp4",
    label: "Rented vs owned",
  },
];

// The V8 span above holds one scene for beats 8, 9, 10 but we still need
// to play beat09 and beat10 VOs at the right times inside it.
const V8_START = SLOTS[SLOTS.length - 1].from;

export const Master: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0B0F19" }}>
      {SLOTS.map((slot) => {
        const Scene = slot.Scene;
        return (
          <Sequence
            key={slot.key}
            from={slot.from}
            durationInFrames={slot.durationInFrames}
            layout="absolute-fill"
            name={slot.key}
          >
            {Scene ? <Scene {...(slot.sceneProps || {})} /> : null}
            <VOPip
              src={slot.voSrc}
              label={slot.label}
              position={slot.pipPosition}
            />
          </Sequence>
        );
      })}
      {/* Beat 9 VO — continues on V8 scene */}
      <Sequence
        from={V8_START + s(B.beat08)}
        durationInFrames={s(B.beat09)}
        layout="absolute-fill"
        name="b9-vo"
      >
        <VOPip src="VO/beat09.mp4" label="The answer" />
      </Sequence>
      {/* Beat 10 VO — final CTA */}
      <Sequence
        from={V8_START + s(B.beat08 + B.beat09)}
        durationInFrames={s(B.beat10)}
        layout="absolute-fill"
        name="b10-vo"
      >
        <VOPip src="VO/beat10.mp4" label="AfriShield" position="top-center" width={620} />
      </Sequence>
    </AbsoluteFill>
  );
};
