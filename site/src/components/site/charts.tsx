"use client"

import {
  Bar,
  BarChart,
  Grid,
  Legend,
  Radar,
  RadarChart,
  Tooltip,
  XAxis,
  YAxis,
} from "@/components/dither-kit"
import { frameworks } from "@/data/content"
import { Reveal } from "./reveal"

const barData = frameworks.slice(0, 8).map((f) => ({
  id: f.id,
  affix: Math.round(f.AFFIX * 10) / 10,
  rhs: Math.round(f.RHS * 10) / 10,
}))

const barConfig = {
  affix: { label: "AFFIX", color: "orange" as const },
  rhs: { label: "Rewrite risk", color: "grey" as const },
}

const radarPick = frameworks.find((f) => f.id === "PD")!
const radarRival = frameworks.find((f) => f.id === "VS")!

const radarData = [
  { axis: "Control", pd: radarPick.CS, vs: radarRival.CS },
  { axis: "Types", pd: radarPick.TC, vs: radarRival.TC },
  { axis: "Obs", pd: radarPick.OB, vs: radarRival.OB },
  { axis: "Hardening", pd: radarPick.PH, vs: radarRival.PH },
  { axis: "DX", pd: radarPick.DX, vs: radarRival.DX },
  { axis: "Continuum", pd: radarPick.RACS, vs: radarRival.RACS },
]

const radarConfig = {
  pd: { label: "PydanticAI", color: "orange" as const },
  vs: { label: "Vercel AI SDK", color: "grey" as const },
}

export function Charts() {
  return (
    <section id="signals" className="relative py-32 md:py-40">
      <div className="mx-auto max-w-[1120px] px-6 md:px-8">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
            04 — Signals
          </p>
          <h2 className="mt-4 max-w-[22ch] font-display text-4xl font-semibold tracking-tight md:text-5xl">
            Score distributions among leaders
          </h2>
          <p className="mt-5 max-w-[52ch] text-muted-foreground">
            AFFIX and RHS for the leading eight frameworks, and proprietary
            index profiles for the top four. Values are EST from the published
            matrix.
          </p>
        </Reveal>

        <div className="mt-20 grid gap-16 lg:grid-cols-2 lg:gap-20">
          <Reveal delay={0.05} className="min-w-0">
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              AFFIX and rewrite hazard · top eight
            </p>
            <BarChart
              data={barData}
              config={barConfig}
              className="h-[320px] w-full"
              animate
              animationDuration={1200}
              bloom="low"
              bloomOnHover
            >
              <Grid />
              <XAxis dataKey="id" />
              <YAxis />
              <Bar dataKey="affix" variant="gradient" />
              <Bar dataKey="rhs" variant="hatched" />
              <Legend />
              <Tooltip />
            </BarChart>
            <p className="mt-4 max-w-[42ch] font-mono text-[11px] leading-relaxed text-muted-foreground">
              Orange is AFFIX. Grey hatch is rewrite hazard. High scores on both
              mean strong capability with a fragile long-term fit.
            </p>
          </Reveal>

          <Reveal delay={0.12} className="min-w-0">
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              Profile · PydanticAI vs Vercel AI SDK
            </p>
            <RadarChart
              data={radarData}
              config={radarConfig}
              nameKey="axis"
              className="h-[320px] w-full"
              animate
              animationDuration={1400}
              bloom="low"
            >
              <Radar dataKey="pd" variant="gradient" />
              <Radar dataKey="vs" variant="dotted" />
              <Legend />
              <Tooltip />
            </RadarChart>
            <p className="mt-4 max-w-[42ch] font-mono text-[11px] leading-relaxed text-muted-foreground">
              Similar overall fitness, different shapes. Developer experience
              wins the prototype; contracts and hardening win production.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
