import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneShell } from "../components/SceneShell";
import { FadeUp } from "../components/FadeUp";
import { COLORS, FONT_MONO } from "../theme";

export const EndCard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const s = spring({
    frame: frame - 8,
    fps,
    config: { damping: 200, stiffness: 120, mass: 0.8 },
  });
  const scale = interpolate(s, [0, 1], [0.96, 1]);

  return (
    <SceneShell intensity={1.2}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: 32,
          transform: `scale(${scale})`,
        }}
      >
        <FadeUp>
          <div
            style={{
              fontFamily: FONT_MONO,
              fontSize: 18,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: COLORS.orange,
            }}
          >
            Principal results · falsifiable claims
          </div>
        </FadeUp>

        <FadeUp delay={10}>
          <div
            style={{
              fontSize: 96,
              fontWeight: 700,
              letterSpacing: "-0.03em",
              color: COLORS.ink,
            }}
          >
            AFFIX-2026
          </div>
        </FadeUp>

        <FadeUp delay={22}>
          <div
            style={{
              fontSize: 48,
              fontWeight: 400,
              color: COLORS.orange,
              letterSpacing: "0.02em",
              fontFamily: FONT_MONO,
            }}
          >
            affix.study
          </div>
        </FadeUp>

        <FadeUp delay={36}>
          <div
            style={{
              marginTop: 8,
              width: 64,
              height: 2,
              background: COLORS.orange,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          />
        </FadeUp>

        <FadeUp delay={42}>
          <div
            style={{
              fontSize: 24,
              color: COLORS.dim,
              maxWidth: 720,
              lineHeight: 1.45,
            }}
          >
            Agent Framework Fitness Index — methods, scores, and failure
            taxonomy.
          </div>
        </FadeUp>
      </div>
    </SceneShell>
  );
};
