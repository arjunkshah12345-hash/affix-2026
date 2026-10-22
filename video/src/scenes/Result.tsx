import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneShell } from "../components/SceneShell";
import { FadeUp } from "../components/FadeUp";
import { COLORS, FONT_MONO } from "../theme";

export const Result: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scoreSpring = spring({
    frame: frame - 28,
    fps,
    config: { damping: 200, stiffness: 100, mass: 0.9 },
  });
  const affix = interpolate(scoreSpring, [0, 1], [0, 87.6]);
  const rhs = interpolate(scoreSpring, [0, 1], [0, 17.3]);

  return (
    <SceneShell intensity={1.05}>
      <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
        <FadeUp>
          <div
            style={{
              fontFamily: FONT_MONO,
              fontSize: 20,
              letterSpacing: "0.26em",
              textTransform: "uppercase",
              color: COLORS.orange,
            }}
          >
            Principal result
          </div>
        </FadeUp>

        <FadeUp delay={6}>
          <div
            style={{
              fontSize: 28,
              color: COLORS.muted,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            Rank 1
          </div>
        </FadeUp>

        <FadeUp delay={12}>
          <div
            style={{
              fontSize: 108,
              fontWeight: 700,
              letterSpacing: "-0.035em",
              lineHeight: 1,
              color: COLORS.ink,
            }}
          >
            PydanticAI
          </div>
        </FadeUp>

        <div
          style={{
            display: "flex",
            gap: 72,
            marginTop: 20,
            alignItems: "flex-end",
          }}
        >
          <Metric
            label="AFFIX"
            value={affix.toFixed(1)}
            emphasize
            delay={28}
          />
          <div
            style={{
              width: 1,
              height: 88,
              background: COLORS.line,
              opacity: interpolate(frame, [32, 48], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
              marginBottom: 8,
            }}
          />
          <Metric label="RHS" value={rhs.toFixed(1)} delay={36} />
        </div>

        <FadeUp delay={55}>
          <div
            style={{
              marginTop: 12,
              fontSize: 28,
              color: COLORS.dim,
              maxWidth: 900,
            }}
          >
            Highest fitness · lowest rewrite hazard among measured frameworks.
          </div>
        </FadeUp>
      </div>
    </SceneShell>
  );
};

const Metric: React.FC<{
  label: string;
  value: string;
  emphasize?: boolean;
  delay: number;
}> = ({ label, value, emphasize, delay }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame - delay, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div style={{ opacity }}>
      <div
        style={{
          fontFamily: FONT_MONO,
          fontSize: 18,
          letterSpacing: "0.22em",
          color: emphasize ? COLORS.orange : COLORS.muted,
          marginBottom: 12,
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: 88,
          fontWeight: 700,
          letterSpacing: "-0.04em",
          fontVariantNumeric: "tabular-nums",
          color: emphasize ? COLORS.orange : COLORS.ink,
          lineHeight: 1,
        }}
      >
        {value}
      </div>
    </div>
  );
};
