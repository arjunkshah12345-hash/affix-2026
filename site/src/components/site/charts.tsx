"use client"

import {
  Bar,
  BarChart,
  Grid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "@/components/dither-kit"
import { frameworks } from "@/data/content"
import { BlurReveal } from "@/components/ui/blur-reveal"

const barData = frameworks.slice(0, 8).map((f) => ({
  id: f.id,
  affix: Math.round(f.AFFIX * 10) / 10,
  rhs: Math.round(f.RHS * 10) / 10,
}))

const barConfig = {
  affix: { label: "AFFIX", color: "orange" as const },
  rhs: { label: "Rewrite risk", color: "grey" as const },
}

export function Charts() {
  return (
    <section id="signals" className="px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-5xl">
        <BlurReveal>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted">
                Signals
              </p>
              <h2 className="mt-3 max-w-[18ch] font-display text-3xl tracking-[-0.02em] text-ink md:text-4xl">
                Leading eight · fitness vs hazard
              </h2>
            </div>
            <p className="max-w-[32ch] text-[14px] leading-relaxed text-muted md:text-right">
              Orange dither = AFFIX. Grey hatch = rewrite hazard.
            </p>
          </div>
        </BlurReveal>

        <BlurReveal delay={80} className="mt-10">
          <div className="rounded-lg border border-line bg-surface p-4 shadow-quiet md:p-6">
            <BarChart
              data={barData}
              config={barConfig}
              className="h-[280px] w-full"
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
        </BlurReveal>
      </div>
    </section>
  )
}
