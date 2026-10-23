"use client"

import { frameworks } from "@/data/content"
import { BlurReveal } from "@/components/ui/blur-reveal"
import { BarChart } from "@/components/ui/bar-chart"

const barData = frameworks.slice(0, 8).map((f) => ({
  label: f.id,
  values: [Math.round(f.AFFIX * 10) / 10, Math.round(f.RHS * 10) / 10],
}))

export function Charts() {
  return (
    <section id="signals" className="px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-4xl">
        <BlurReveal>
          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted">
            Signals
          </p>
          <h2 className="mt-3 max-w-[18ch] font-display text-3xl tracking-[-0.02em] text-ink md:text-4xl">
            Leading eight · fitness vs hazard
          </h2>
          <p className="mt-4 max-w-[44ch] text-[15px] leading-relaxed text-muted">
            AFFIX and RHS for the top cohort. Ink bars are fitness; muted bars
            are rewrite hazard.
          </p>
        </BlurReveal>

        <BlurReveal delay={80} className="mt-10">
          <div className="rounded-lg border border-line bg-surface p-4 shadow-quiet md:p-6">
            <BarChart
              data={barData}
              series={["AFFIX", "RHS"]}
              height={280}
              format={(n) => n.toFixed(1)}
            />
          </div>
        </BlurReveal>
      </div>
    </section>
  )
}
