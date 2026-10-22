import React from "react";
import { AbsoluteFill } from "remotion";
import { COLORS, FONT, SAFE } from "../theme";
import { DitherField } from "./DitherField";
import { Grain } from "./Grain";

export const SceneShell: React.FC<{
  children: React.ReactNode;
  intensity?: number;
}> = ({ children, intensity = 1 }) => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bg,
        fontFamily: FONT,
        color: COLORS.ink,
      }}
    >
      <DitherField intensity={intensity} />
      <AbsoluteFill
        style={{
          padding: `${SAFE.y}px ${SAFE.x}px`,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {children}
      </AbsoluteFill>
      <Grain />
    </AbsoluteFill>
  );
};
