import React from "react";
import { AbsoluteFill } from "remotion";
import "./fonts";
import { DitherField } from "./components/DitherField";
import { Grain } from "./components/Grain";
import { COLORS, FONT, FONT_MONO, SAFE } from "./theme";

/** Static poster: brand + leader score + URL */
export const AffixPoster: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bg,
        fontFamily: FONT,
        color: COLORS.ink,
      }}
    >
      <DitherField intensity={1.2} />
      <AbsoluteFill
        style={{
          padding: `${SAFE.y}px ${SAFE.x}px`,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          <div
            style={{
              fontFamily: FONT_MONO,
              fontSize: 22,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: COLORS.orange,
              marginBottom: 28,
            }}
          >
            Agent Framework Fitness Index
          </div>
          <div
            style={{
              fontSize: 120,
              fontWeight: 700,
              letterSpacing: "-0.035em",
              lineHeight: 0.95,
            }}
          >
            AFFIX-2026
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              fontSize: 36,
              color: COLORS.muted,
              letterSpacing: "-0.01em",
            }}
          >
            PydanticAI · AFFIX 87.6 · RHS 17.3
          </div>
          <div
            style={{
              width: 120,
              height: 2,
              background: COLORS.orange,
              margin: "12px 0",
            }}
          />
          <div
            style={{
              fontFamily: FONT_MONO,
              fontSize: 32,
              color: COLORS.orange,
              letterSpacing: "0.04em",
            }}
          >
            affix-2026.vercel.app
          </div>
          <div
            style={{
              fontSize: 22,
              color: COLORS.dim,
              marginTop: 8,
            }}
          >
            Principal results · falsifiable claims
          </div>
        </div>
      </AbsoluteFill>
      <Grain opacity={0.08} />
    </AbsoluteFill>
  );
};
