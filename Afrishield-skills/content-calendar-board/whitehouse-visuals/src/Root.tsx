import "./index.css";
import { Composition } from "remotion";
import { VIDEO } from "./theme";
import { V1_Hook } from "./scenes/V1_Hook";
import { V2_Map } from "./scenes/V2_Map";
import { V3_Counters } from "./scenes/V3_Counters";
import { V4_TripAdvisor } from "./scenes/V4_TripAdvisor";
import { V5_Pivot } from "./scenes/V5_Pivot";
import { V6_Audit } from "./scenes/V6_Audit";
import { V7_Dashboard } from "./scenes/V7_Dashboard";
import { V8_RentedOwned } from "./scenes/V8_RentedOwned";
import { Master, MASTER_TOTAL_FRAMES, VO_DURATIONS } from "./scenes/Master";

import { Visual1_Scale } from "./scenes/Visual1_Scale";
import { Visual3_Business } from "./scenes/Visual3_Business";
import { Visual4_Twist } from "./scenes/Visual4_Twist";
import { Visual5_RentedLand } from "./scenes/Visual5_RentedLand";
import { Visual6_Website } from "./scenes/Visual6_Website";
import { Visual7_ChatGPT } from "./scenes/Visual7_ChatGPT";
import { MasterV2, MASTER_V2_TOTAL_FRAMES } from "./scenes/MasterV2";
import { AIVisibility_Final, AI_VIS_TOTAL_FRAMES } from "./scenes/AIVisibility_Final";

const base = {
  fps: VIDEO.fps,
  width: VIDEO.width,
  height: VIDEO.height,
};

const s = (sec: number) => Math.round(sec * VIDEO.fps);

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Final AI Visibility clip with lip-sync captions + Visual 2 doc text overlays */}
      <Composition
        id="AIVisibility-Final"
        component={AIVisibility_Final}
        durationInFrames={AI_VIS_TOTAL_FRAMES}
        {...base}
      />

      {/* NEW: 6-visual master with 11 VO clips + colored captions */}
      <Composition
        id="MasterV2"
        component={MasterV2}
        durationInFrames={MASTER_V2_TOTAL_FRAMES}
        {...base}
      />
      <Composition
        id="Visual-6-Website"
        component={Visual6_Website}
        durationInFrames={s(24)}
        {...base}
      />
      <Composition
        id="Visual-7-ChatGPT"
        component={Visual7_ChatGPT}
        durationInFrames={s(32)}
        {...base}
      />

      {/* Visual 1 doc deliverables */}
      <Composition
        id="Visual-1-The-Scale"
        component={Visual1_Scale}
        durationInFrames={210} // 7 seconds (7–14 sec)
        {...base}
      />
      <Composition
        id="Visual-3-The-Business"
        component={Visual3_Business}
        durationInFrames={210} // 7 seconds (14–21 sec)
        {...base}
      />
      <Composition
        id="Visual-4-The-Twist"
        component={Visual4_Twist}
        durationInFrames={210} // 7 seconds (21–28 sec)
        {...base}
      />
      <Composition
        id="Visual-5-Rented-Land"
        component={Visual5_RentedLand}
        durationInFrames={240} // 8 seconds (28–36 sec)
        {...base}
      />

      {/* Existing legacy compositions */}
      <Composition
        id="Master"
        component={Master}
        durationInFrames={MASTER_TOTAL_FRAMES}
        {...base}
      />
      <Composition
        id="V1-Hook"
        component={V1_Hook}
        durationInFrames={s(VO_DURATIONS.beat01)}
        {...base}
      />
      <Composition
        id="V2-Map"
        component={V2_Map}
        durationInFrames={s(VO_DURATIONS.beat02)}
        {...base}
      />
      <Composition
        id="V3-Counters"
        component={V3_Counters}
        durationInFrames={s(VO_DURATIONS.beat03)}
        {...base}
      />
      <Composition
        id="V4-TripAdvisor"
        component={V4_TripAdvisor}
        durationInFrames={s(VO_DURATIONS.beat04)}
        {...base}
      />
      <Composition
        id="V5-Pivot"
        component={V5_Pivot}
        durationInFrames={s(VO_DURATIONS.beat05)}
        {...base}
      />
      <Composition
        id="V6-Audit"
        component={V6_Audit}
        durationInFrames={s(VO_DURATIONS.beat06)}
        {...base}
      />
      <Composition
        id="V7-Dashboard"
        component={V7_Dashboard}
        durationInFrames={s(VO_DURATIONS.beat07)}
        {...base}
      />
      <Composition
        id="V8-RentedOwned"
        component={V8_RentedOwned}
        durationInFrames={s(VO_DURATIONS.beat08 + VO_DURATIONS.beat09 + VO_DURATIONS.beat10)}
        defaultProps={{ ctaAtSecond: VO_DURATIONS.beat08 + VO_DURATIONS.beat09 }}
        {...base}
      />
    </>
  );
};
