import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";

/** Subtle film grain via tiled noise data-URL — position drifts slowly. */
export const Grain: React.FC<{ opacity?: number }> = ({ opacity = 0.07 }) => {
  const frame = useCurrentFrame();
  const x = (frame * 1.7) % 120;
  const y = (frame * 1.1) % 120;

  return (
    <AbsoluteFill
      style={{
        opacity,
        pointerEvents: "none",
        mixBlendMode: "overlay",
        backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(
          `<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'>
            <filter id='n'>
              <feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/>
            </filter>
            <rect width='100%' height='100%' filter='url(%23n)' opacity='0.55'/>
          </svg>`,
        )}")`,
        backgroundSize: "160px 160px",
        backgroundPosition: `${x}px ${y}px`,
      }}
    />
  );
};
