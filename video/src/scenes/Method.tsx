import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneShell } from "../components/SceneShell";
import { FadeUp } from "../components/FadeUp";
import { COLORS, FONT_MONO } from "../theme";

const STATS = [
  { value: "16", label: "frameworks" },
  { value: "10", label: "dimensions" },
  { value: "12", label: "failure modes" },
  { value: "7", label: "proprietary indices" },
] as const;

export const Method: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <SceneShell intensity={0.95}>
      <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
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
            Method
          </div>
        </FadeUp>

        <FadeUp delay={8}>
          <div
            style={{
              fontSize: 52,
              fontWeight: 500,
              letterSpacing: "-0.02em",
              color: COLORS.ink,
              maxWidth: 1200,
              lineHeight: 1.2,
            }}
          >
            A controlled fitness evaluation across agent frameworks.
          </div>
        </FadeUp>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 36,
            marginTop: 24,
          }}
        >
          {STATS.map((stat, i) => {
            const delay = 20 + i * 10;
            const s = spring({
              frame: frame - delay,
              fps,
              config: { damping: 200, stiffness: 140, mass: 0.7 },
            });
            const opacity = interpolate(frame - delay, [0, 8], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            const y = interpolate(s, [0, 1], [36, 0]);

            return (
              <div
                key={stat.label}
                style={{
                  opacity,
                  transform: `translateY(${y}px)`,
                  borderTop: `1px solid ${COLORS.line}`,
                  paddingTop: 28,
                }}
              >
                <div
                  style={{
                    fontSize: 96,
                    fontWeight: 700,
                    letterSpacing: "-0.04em",
                    color: COLORS.orange,
                    lineHeight: 1,
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    marginTop: 16,
                    fontSize: 26,
                    color: COLORS.muted,
                    letterSpacing: "0.01em",
                  }}
                >
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </SceneShell>
  );
};
