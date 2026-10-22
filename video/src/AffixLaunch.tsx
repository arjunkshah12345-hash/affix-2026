import React from "react";
import { AbsoluteFill } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import "./fonts";
import { SCENES, TRANSITION } from "./theme";
import { Hook } from "./scenes/Hook";
import { Method } from "./scenes/Method";
import { Result } from "./scenes/Result";
import { Contrast } from "./scenes/Contrast";
import { EndCard } from "./scenes/EndCard";

const fadeTiming = linearTiming({ durationInFrames: TRANSITION });

export const AffixLaunch: React.FC = () => {
  return (
    <AbsoluteFill>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={SCENES.hook}>
          <Hook />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={fadeTiming}
        />
        <TransitionSeries.Sequence durationInFrames={SCENES.method}>
          <Method />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={fadeTiming}
        />
        <TransitionSeries.Sequence durationInFrames={SCENES.result}>
          <Result />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={fadeTiming}
        />
        <TransitionSeries.Sequence durationInFrames={SCENES.contrast}>
          <Contrast />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={fadeTiming}
        />
        <TransitionSeries.Sequence durationInFrames={SCENES.end}>
          <EndCard />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
