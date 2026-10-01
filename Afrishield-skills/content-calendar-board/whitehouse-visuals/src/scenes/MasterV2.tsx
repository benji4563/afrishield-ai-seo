import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { VIDEO } from "../theme";
import { Visual1_Scale } from "./Visual1_Scale";
import { Visual3_Business } from "./Visual3_Business";
import { Visual4_Twist } from "./Visual4_Twist";
import { Visual5_RentedLand } from "./Visual5_RentedLand";
import { Visual6_Website } from "./Visual6_Website";
import { Visual7_ChatGPT } from "./Visual7_ChatGPT";
import { VOPip } from "./VOPip";
import { CaptionsForClip } from "./CaptionsOverlay";

const fps = VIDEO.fps;
const s = (sec: number) => Math.round(sec * fps);

// Measured durations from ffprobe on the recorded VO clips (11 clips, ~167s).
export const V2_DURATIONS: Record<string, number> = {
  beat01: 14.5,
  beat02: 14.7,
  beat03: 21.09,
  beat04: 11.23,
  beat05: 16.06,
  beat06: 12.03,
  beat07: 10.5,
  beat08: 12.97,
  beat09: 21.47,
  beat10: 10.83,
  beat11: 21.76,
};

// Story-position → visual scene mapping (6 major visuals per the new spec).
// The 11 VO clips distribute across the 6 story slots.
type StorySlot = {
  key: string;
  Scene: React.FC | null;
  beats: string[]; // VO clip stems that play during this slot, in order
  pipPosition?: "bottom-right" | "top-center" | "center";
};

const STORY: StorySlot[] = [
  { key: "V1", Scene: Visual1_Scale, beats: ["beat01", "beat02"], pipPosition: "top-center" }, // Restaurant that built a brand
  { key: "V2", Scene: Visual3_Business, beats: ["beat03"], pipPosition: "bottom-right" }, // Multi-location business
  { key: "V3", Scene: Visual4_Twist, beats: ["beat04", "beat05"], pipPosition: "bottom-right" }, // Digital twist
  { key: "V4", Scene: Visual5_RentedLand, beats: ["beat06", "beat07"], pipPosition: "bottom-right" }, // Rented land
  { key: "V5", Scene: Visual6_Website, beats: ["beat08", "beat09"], pipPosition: "bottom-right" }, // Website / digital property
  { key: "V6", Scene: Visual7_ChatGPT, beats: ["beat10", "beat11"], pipPosition: "top-center" }, // ChatGPT verification
];

// Compute absolute start (seconds) for each beat
const BEAT_OFFSETS: Record<string, number> = {};
{
  let cursor = 0;
  for (const slot of STORY) {
    for (const beat of slot.beats) {
      BEAT_OFFSETS[beat] = cursor;
      cursor += V2_DURATIONS[beat];
    }
  }
}

export const MASTER_V2_TOTAL_SECONDS =
  Object.values(V2_DURATIONS).reduce((a, b) => a + b, 0);
export const MASTER_V2_TOTAL_FRAMES = s(MASTER_V2_TOTAL_SECONDS) + 30;

export const MasterV2: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0B0F19" }}>
      {STORY.map((slot) => {
        const Scene = slot.Scene;
        const slotStart = BEAT_OFFSETS[slot.beats[0]];
        const slotDuration = slot.beats.reduce((a, b) => a + V2_DURATIONS[b], 0);
        return (
          <Sequence
            key={slot.key}
            from={s(slotStart)}
            durationInFrames={s(slotDuration)}
            layout="absolute-fill"
            name={slot.key}
          >
            {Scene ? <Scene /> : null}
          </Sequence>
        );
      })}

      {/* VO PIP + audio + captions for each beat */}
      {Object.entries(BEAT_OFFSETS).map(([beat, offset]) => {
        // find the story slot containing this beat to know PIP position
        const slot = STORY.find((s) => s.beats.includes(beat))!;
        return (
          <React.Fragment key={beat}>
            <Sequence
              from={s(offset)}
              durationInFrames={s(V2_DURATIONS[beat])}
              layout="absolute-fill"
              name={`${beat}-vo`}
            >
              <VOPip
                src={`VO2/${beat}.mp4`}
                label={slot.key}
                position={slot.pipPosition}
              />
            </Sequence>
            <Sequence
              from={s(offset)}
              durationInFrames={s(V2_DURATIONS[beat])}
              layout="absolute-fill"
              name={`${beat}-cap`}
            >
              <CaptionsForClip
                jsonPath={`captions/${beat}.json`}
                offsetSeconds={0}
                totalDurationInFrames={s(V2_DURATIONS[beat])}
              />
            </Sequence>
          </React.Fragment>
        );
      })}
    </AbsoluteFill>
  );
};
