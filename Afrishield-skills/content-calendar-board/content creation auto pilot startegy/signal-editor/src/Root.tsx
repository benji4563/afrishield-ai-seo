import React from "react";
import { Composition, Still } from "remotion";
import { SignalEdit, calculateSignalEditMetadata } from "./SignalEdit";
import { CarouselSlide } from "./components/Carousel";
import { gallerySpec, demoSlide } from "./demo/gallery";
import { CAROUSEL, VIDEO } from "./signal/tokens";

export const RemotionRoot: React.FC = () => (
  <>
    {/* Renders any edit spec. scripts/render-spec.mjs passes { spec } as input props. */}
    <Composition
      id="SignalEdit"
      component={SignalEdit}
      fps={VIDEO.fps}
      width={VIDEO.width}
      height={VIDEO.height}
      durationInFrames={300}
      defaultProps={{ spec: gallerySpec }}
      calculateMetadata={calculateSignalEditMetadata}
    />
    {/* Carousel slides (Instagram 4:5 ink / LinkedIn document bone). */}
    <Still id="CarouselSlide" component={CarouselSlide} width={CAROUSEL.width} height={CAROUSEL.height} defaultProps={demoSlide} />
  </>
);
