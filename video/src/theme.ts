import { fontFamily, fontFamilyMono } from "./fonts";

export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;

/** 120 BPM → 1 bar = 2s = 60 frames */
export const BAR = 60;
export const bar = (n: number) => Math.round(n * BAR);

export const COLORS = {
  bg: "#050505",
  ink: "#f5f0e8",
  muted: "rgba(245, 240, 232, 0.55)",
  dim: "rgba(245, 240, 232, 0.28)",
  orange: "#f59e0b",
  orangeSoft: "rgba(245, 158, 11, 0.85)",
  orangeDim: "rgba(245, 158, 11, 0.35)",
  line: "rgba(245, 158, 11, 0.22)",
} as const;

export const FONT = fontFamily;
export const FONT_MONO = fontFamilyMono;

export const SAFE = {
  x: 120,
  y: 100,
} as const;

/** Scene lengths before transition overlap */
export const SCENES = {
  hook: bar(2.5),
  method: bar(2.5),
  result: bar(2.5),
  contrast: bar(2.5),
  end: bar(2),
} as const;

export const TRANSITION = 12;

/** Total = sum(scenes) − (nTransitions × TRANSITION) */
export const DURATION =
  SCENES.hook +
  SCENES.method +
  SCENES.result +
  SCENES.contrast +
  SCENES.end -
  TRANSITION * 4;
