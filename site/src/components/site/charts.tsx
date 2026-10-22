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
import { Reveal, SectionLabel } from "./reveal"

const barData = frameworks.slice(0, 8).map((f) => ({
  id: f.id,
  affix: Math.round(f.AFFIX * 10) / 10,
  rhs: Math.round(f.RHS * 10) / 10,
}))

const barConfig = {
  affix: { label: "AFFIX", color: "red" as const },
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
  pd: { label: "PydanticAI", color: "red" as const },
  vs: { label: "Vercel AI SDK", color: "blue" as const },
}

export function Charts() {
  return (
    <section id="signals" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-[1120px] px-5 md:px-8">
        <Reveal>
          <SectionLabel>Signals</SectionLabel>
          <h2 className="mt-3 max-w-[22ch] font-display text-3xl font-semibold tracking-tight md:text-4xl">
            Score distributions among leaders
          </h2>
          <p className="mt-4 max-w-[52ch] text-[15px] leading-relaxed text-muted-foreground md:text-base">
            AFFIX and RHS for the leading eight frameworks, and proprietary
            index profiles for the top four. Values are EST from the published
            matrix.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-14 lg:grid-cols-2 lg:gap-16">
          <Reveal delay={0.05} className="min-w-0">
            <p className="mb-4 font-data text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
              AFFIX and rewrite hazard · top eight
            </p>
            <div className="border border-foreground/10 bg-foreground/[0.03] p-4 md:p-5">
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
            </div>
            <p className="mt-4 max-w-[42ch] font-data text-[11px] leading-relaxed text-muted-foreground">
              Carmine is AFFIX. Grey hatch is rewrite hazard. High scores on both
              mean strong capability with a fragile long-term fit.
            </p>
          </Reveal>

          <Reveal delay={0.12} className="min-w-0">
            <p className="mb-4 font-data text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
              Profile · PydanticAI vs Vercel AI SDK
            </p>
            <div className="border border-foreground/10 bg-foreground/[0.03] p-4 md:p-5">
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
            </div>
            <p className="mt-4 max-w-[42ch] font-data text-[11px] leading-relaxed text-muted-foreground">
              Similar overall fitness, different shapes. Developer experience
              wins the prototype; contracts and hardening win production.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
