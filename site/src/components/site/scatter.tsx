"use client"

import { useMemo, useState } from "react"
import { frameworks } from "@/data/content"
import { cn } from "@/lib/utils"
import { Reveal } from "./reveal"

const W = 640
const H = 420
const PAD = { t: 28, r: 36, b: 48, l: 52 }

function scale(
  v: number,
  d0: number,
  d1: number,
  r0: number,
  r1: number
) {
  return r0 + ((v - d0) / (d1 - d0)) * (r1 - r0)
}

export function Scatter() {
  const [hover, setHover] = useState<string | null>(null)

  const { xmin, xmax, ymin, ymax, points } = useMemo(() => {
    const xs = frameworks.map((f) => f.AFFIX)
    const ys = frameworks.map((f) => f.RHS)
    const xmin = Math.floor(Math.min(...xs) - 2)
    const xmax = Math.ceil(Math.max(...xs) + 2)
    const ymin = Math.floor(Math.min(...ys) - 2)
    const ymax = Math.ceil(Math.max(...ys) + 2)
    const points = frameworks.map((f) => ({
      ...f,
      x: scale(f.AFFIX, xmin, xmax, PAD.l, W - PAD.r),
      y: scale(f.RHS, ymin, ymax, H - PAD.b, PAD.t),
    }))
    return { xmin, xmax, ymin, ymax, points }
  }, [])

  const active = points.find((p) => p.id === hover)

  const xTicks = [xmin, Math.round((xmin + xmax) / 2), xmax]
  const yTicks = [ymin, Math.round((ymin + ymax) / 2), ymax]

  return (
    <section id="map" className="relative py-32 md:py-40">
      <div className="mx-auto max-w-[1120px] px-6 md:px-8">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
            07 — Map
          </p>
          <h2 className="mt-4 max-w-[24ch] font-display text-4xl font-semibold tracking-tight md:text-5xl">
            AFFIX versus rewrite hazard
          </h2>
          <p className="mt-5 max-w-[52ch] text-muted-foreground">
            Scatter of composite fitness (AFFIX) against rewrite hazard (RHS).
            Preferred region: high AFFIX, low RHS. Axes are scaled within the
            study sample, not to absolute capability.
          </p>
        </Reveal>

        <Reveal delay={0.08} className="mt-14">
          <div className="relative overflow-hidden border border-white/8 bg-[#080808]">
            <svg
              viewBox={`0 0 ${W} ${H}`}
              className="h-auto w-full"
              role="img"
              aria-label="Scatter plot of AFFIX versus RHS for sixteen frameworks"
            >
              <defs>
                <pattern
                  id="scatter-dither"
                  width="4"
                  height="4"
                  patternUnits="userSpaceOnUse"
                >
                  <rect width="4" height="4" fill="#0a0a0a" />
                  <rect width="1" height="1" fill="oklch(0.72 0.19 45 / 0.12)" />
                  <rect
                    x="2"
                    y="2"
                    width="1"
                    height="1"
                    fill="oklch(0.72 0.19 45 / 0.08)"
                  />
                </pattern>
              </defs>
              <rect width={W} height={H} fill="url(#scatter-dither)" />

              {/* quadrant hint: high AFFIX / low RHS */}
              <rect
                x={scale((xmin + xmax) / 2, xmin, xmax, PAD.l, W - PAD.r)}
                y={PAD.t}
                width={
                  W -
                  PAD.r -
                  scale((xmin + xmax) / 2, xmin, xmax, PAD.l, W - PAD.r)
                }
                height={
                  scale((ymin + ymax) / 2, ymin, ymax, H - PAD.b, PAD.t) - PAD.t
                }
                fill="oklch(0.72 0.19 45 / 0.04)"
              />

              {xTicks.map((t) => {
                const x = scale(t, xmin, xmax, PAD.l, W - PAD.r)
                return (
                  <g key={`x-${t}`}>
                    <line
                      x1={x}
                      y1={PAD.t}
                      x2={x}
                      y2={H - PAD.b}
                      stroke="rgba(255,255,255,0.06)"
                    />
                    <text
                      x={x}
                      y={H - 18}
                      textAnchor="middle"
                      fill="oklch(0.55 0.02 75)"
                      fontFamily="var(--font-mono), monospace"
                      fontSize="10"
                    >
                      {t}
                    </text>
                  </g>
                )
              })}
              {yTicks.map((t) => {
                const y = scale(t, ymin, ymax, H - PAD.b, PAD.t)
                return (
                  <g key={`y-${t}`}>
                    <line
                      x1={PAD.l}
                      y1={y}
                      x2={W - PAD.r}
                      y2={y}
                      stroke="rgba(255,255,255,0.06)"
                    />
                    <text
                      x={PAD.l - 10}
                      y={y + 3}
                      textAnchor="end"
                      fill="oklch(0.55 0.02 75)"
                      fontFamily="var(--font-mono), monospace"
                      fontSize="10"
                    >
                      {t}
                    </text>
                  </g>
                )
              })}

              <text
                x={W / 2}
                y={H - 6}
                textAnchor="middle"
                fill="oklch(0.68 0.02 75)"
                fontFamily="var(--font-mono), monospace"
                fontSize="10"
                letterSpacing="0.12em"
              >
                AFFIX →
              </text>
              <text
                x={14}
                y={H / 2}
                textAnchor="middle"
                fill="oklch(0.68 0.02 75)"
                fontFamily="var(--font-mono), monospace"
                fontSize="10"
                letterSpacing="0.12em"
                transform={`rotate(-90 14 ${H / 2})`}
              >
                RHS ↓
              </text>

              {points.map((p) => {
                const on = hover === p.id
                return (
                  <g
                    key={p.id}
                    className="cursor-pointer"
                    onMouseEnter={() => setHover(p.id)}
                    onMouseLeave={() => setHover(null)}
                  >
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r={on ? 7 : 5}
                      fill={
                        on
                          ? "oklch(0.72 0.19 45)"
                          : "oklch(0.72 0.19 45 / 0.75)"
                      }
                      stroke={on ? "white" : "transparent"}
                      strokeWidth={1}
                    />
                    <text
                      x={p.x + 9}
                      y={p.y + 3}
                      fill={
                        on
                          ? "oklch(0.96 0.01 85)"
                          : "oklch(0.68 0.02 75)"
                      }
                      fontFamily="var(--font-mono), monospace"
                      fontSize="10"
                      fontWeight={on ? 600 : 400}
                    >
                      {p.id}
                    </text>
                  </g>
                )
              })}
            </svg>

            <div className="border-t border-white/8 px-5 py-4">
              {active ? (
                <p className="font-mono text-[12px] text-muted-foreground">
                  <span className="text-accent">{active.framework}</span>
                  {" · "}
                  AFFIX {active.AFFIX.toFixed(1)} · RHS {active.RHS.toFixed(1)} ·
                  LIE {active.LIE} · FMC {active.FMC} · RACS {active.RACS}
                </p>
              ) : (
                <p className="font-mono text-[11px] text-muted-foreground/60">
                  Hover a point — preferred region is high AFFIX, low RHS
                  (shaded).
                </p>
              )}
            </div>
          </div>

          <p
            className={cn(
              "mt-4 font-mono text-[11px] leading-relaxed text-muted-foreground"
            )}
          >
            PydanticAI sits near the preferred corner. DSPy and smolagents sit
            high on rewrite hazard; LangGraph trades control for cognitive tax.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
