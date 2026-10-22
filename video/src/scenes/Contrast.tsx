import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneShell } from "../components/SceneShell";
import { FadeUp } from "../components/FadeUp";
import { COLORS, FONT_MONO } from "../theme";

export const Contrast: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const barIn = spring({
    frame: frame - 30,
    fps,
    config: { damping: 200, stiffness: 90, mass: 1 },
  });

  const vsWidth = interpolate(barIn, [0, 1], [0, 345]); // 34.5 * 10
  const pdWidth = interpolate(barIn, [0, 1], [0, 173]); // 17.3 * 10

  return (
    <SceneShell intensity={1}>
      <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
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
            Co-monotonicity failure
          </div>
        </FadeUp>

        <FadeUp delay={8}>
          <div
            style={{
              fontSize: 52,
              fontWeight: 500,
              letterSpacing: "-0.02em",
              maxWidth: 1400,
              lineHeight: 1.2,
            }}
          >
            Fitness is not rewrite-safe.
          </div>
        </FadeUp>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 32,
            marginTop: 28,
            maxWidth: 1400,
          }}
        >
          <BarRow
            name="Vercel AI SDK"
            metric="RHS"
            score="34.5"
            width={vsWidth}
            delay={24}
            note="AFFIX 81.2"
          />
          <BarRow
            name="PydanticAI"
            metric="RHS"
            score="17.3"
            width={pdWidth}
            delay={34}
            note="AFFIX 87.6"
            accent
          />
        </div>

        <FadeUp delay={70}>
          <div
            style={{
              marginTop: 16,
              display: "flex",
              flexWrap: "wrap",
              gap: 28,
              fontFamily: FONT_MONO,
              fontSize: 20,
              letterSpacing: "0.08em",
              color: COLORS.muted,
            }}
          >
            <Claim>AFFIX ⊥ RHS</Claim>
            <Claim>DX−PH surplus</Claim>
            <Claim>protocol ≠ portable</Claim>
          </div>
        </FadeUp>
      </div>
    </SceneShell>
  );
};

const Claim: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span
    style={{
      border: `1px solid ${COLORS.line}`,
      padding: "10px 18px",
      color: COLORS.orangeSoft,
    }}
  >
    {children}
  </span>
);

const BarRow: React.FC<{
  name: string;
  metric: string;
  score: string;
  width: number;
  delay: number;
  note: string;
  accent?: boolean;
}> = ({ name, metric, score, width, delay, note, accent }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame - delay, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div style={{ opacity }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 12,
          alignItems: "baseline",
        }}
      >
        <div style={{ display: "flex", gap: 20, alignItems: "baseline" }}>
          <span
            style={{
              fontSize: 32,
              fontWeight: 600,
              letterSpacing: "-0.02em",
              color: COLORS.ink,
            }}
          >
            {name}
          </span>
          <span
            style={{
              fontFamily: FONT_MONO,
              fontSize: 16,
              color: COLORS.dim,
              letterSpacing: "0.12em",
            }}
          >
            {note}
          </span>
        </div>
        <div
          style={{
            fontFamily: FONT_MONO,
            fontSize: 22,
            color: accent ? COLORS.orange : COLORS.muted,
          }}
        >
          {metric} {score}
        </div>
      </div>
      <div
        style={{
          height: 14,
          background: "rgba(245,240,232,0.06)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width,
            background: accent
              ? COLORS.orange
              : "linear-gradient(90deg, rgba(245,158,11,0.55), rgba(245,158,11,0.85))",
          }}
        />
      </div>
    </div>
  );
};
