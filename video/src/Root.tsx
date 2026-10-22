import React from "react";
import { Composition, Still } from "remotion";
import { AffixLaunch } from "./AffixLaunch";
import { AffixPoster } from "./AffixPoster";
import { DURATION, FPS, HEIGHT, WIDTH } from "./theme";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="AffixLaunch"
        component={AffixLaunch}
        durationInFrames={DURATION}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Still
        id="AffixPoster"
        component={AffixPoster}
        width={WIDTH}
        height={HEIGHT}
      />
    </>
  );
};
