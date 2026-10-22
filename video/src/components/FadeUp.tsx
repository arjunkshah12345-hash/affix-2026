import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const FadeUp: React.FC<{
  children: React.ReactNode;
  delay?: number;
  style?: React.CSSProperties;
}> = ({ children, delay = 0, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = frame - delay;
  const s = spring({
    frame: local,
    fps,
    config: { damping: 200, stiffness: 120, mass: 0.8 },
  });
  const y = interpolate(s, [0, 1], [28, 0]);
  const opacity = interpolate(local, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        transform: `translateY(${y}px)`,
        opacity,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
