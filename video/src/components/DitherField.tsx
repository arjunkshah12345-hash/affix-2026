import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { COLORS } from "../theme";

/**
 * Ordered-dither energy field — CSS radial dots + drifting grid.
 * Render-safe (no per-frame SVG turbulence).
 */
export const DitherField: React.FC<{ intensity?: number }> = ({
  intensity = 1,
}) => {
  const frame = useCurrentFrame();
  const driftX = interpolate(frame, [0, 300], [0, 48], {
    extrapolateRight: "extend",
  });
  const driftY = interpolate(frame, [0, 300], [0, -36], {
    extrapolateRight: "extend",
  });
  const pulse = interpolate(Math.sin(frame / 28), [-1, 1], [0.55, 1]);

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg }}>
      {/* Warm radial wash */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse 70% 55% at 50% 42%, rgba(245,158,11,${0.09 * intensity * pulse}) 0%, transparent 62%)`,
        }}
      />
      {/* Secondary corner ember */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse 40% 35% at 88% 78%, rgba(245,158,11,${0.06 * intensity}) 0%, transparent 70%)`,
        }}
      />
      {/* Dither dots */}
      <AbsoluteFill
        style={{
          opacity: 0.45 * intensity,
          backgroundImage: `radial-gradient(${COLORS.orange} 0.9px, transparent 1.1px)`,
          backgroundSize: "7px 7px",
          backgroundPosition: `${driftX}px ${driftY}px`,
          maskImage:
            "radial-gradient(ellipse 75% 60% at 50% 45%, black 20%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 75% 60% at 50% 45%, black 20%, transparent 75%)",
        }}
      />
      {/* Fine secondary grid */}
      <AbsoluteFill
        style={{
          opacity: 0.12 * intensity,
          backgroundImage: `
            linear-gradient(${COLORS.line} 1px, transparent 1px),
            linear-gradient(90deg, ${COLORS.line} 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
          backgroundPosition: `${-driftX * 0.3}px ${driftY * 0.2}px`,
        }}
      />
    </AbsoluteFill>
  );
};
