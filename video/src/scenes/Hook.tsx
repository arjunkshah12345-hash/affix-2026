import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { SceneShell } from "../components/SceneShell";
import { FadeUp } from "../components/FadeUp";
import { COLORS, FONT_MONO } from "../theme";

const TITLE = "AFFIX-2026";

export const Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <SceneShell intensity={1.15}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 28,
          maxWidth: 1600,
        }}
      >
        <FadeUp delay={2}>
          <div
            style={{
              fontFamily: FONT_MONO,
              fontSize: 22,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: COLORS.orange,
              fontWeight: 500,
            }}
          >
            Research release
          </div>
        </FadeUp>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 0,
            lineHeight: 0.92,
          }}
        >
          {TITLE.split("").map((ch, i) => {
            const delay = 6 + i * 2;
            const s = spring({
              frame: frame - delay,
              fps,
              config: { damping: 18, stiffness: 160, mass: 0.55 },
            });
            const y = interpolate(s, [0, 1], [70, 0]);
            const opacity = interpolate(frame - delay, [0, 6], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            const blur = interpolate(s, [0, 1], [8, 0]);

            return (
              <span
                key={`${ch}-${i}`}
                style={{
                  display: "inline-block",
                  fontSize: 148,
                  fontWeight: 700,
                  letterSpacing: ch === "-" ? "0.02em" : "-0.035em",
                  color: COLORS.ink,
                  transform: `translateY(${y}px)`,
                  opacity,
                  filter: `blur(${blur}px)`,
                  width: ch === " " ? "0.35em" : undefined,
                }}
              >
                {ch}
              </span>
            );
          })}
        </div>

        <FadeUp delay={34}>
          <div
            style={{
              fontSize: 42,
              fontWeight: 400,
              letterSpacing: "-0.01em",
              color: COLORS.muted,
              maxWidth: 1100,
            }}
          >
            Agent Framework Fitness Index
          </div>
        </FadeUp>

        <FadeUp delay={48}>
          <div
            style={{
              marginTop: 8,
              width: interpolate(frame, [48, 90], [0, 280], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
              height: 2,
              background: COLORS.orange,
            }}
          />
        </FadeUp>
      </div>

      {/* Corner index mark */}
      <AbsoluteFill
        style={{
          padding: 0,
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: 120,
            bottom: 100,
            fontFamily: FONT_MONO,
            fontSize: 16,
            letterSpacing: "0.18em",
            color: COLORS.dim,
            opacity: interpolate(frame, [40, 70], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          16 FRAMEWORKS · FALSIFIABLE
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
