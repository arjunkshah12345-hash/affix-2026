"use client"

import { asOf, frameworks, study } from "@/data/content"
import { Reveal, SectionLabel } from "./reveal"

const points = [
  {
    label: "Sample",
    body: `${frameworks.length} Tier-A frameworks from primary docs as of ${asOf}. Spot-checks are contextual only.`,
  },
  {
    label: "EST",
    body: "Scores are estimates from public APIs—not runtime microbenchmarks or hiring surveys.",
  },
  {
    label: "Falsifiers",
    body: "Claims retire if rewrite rates invert RHS order or DX−PH loses significance against outcomes.",
  },
] as const

export function Limitations() {
  return (
    <section id="limitations" className="border-t border-white/8 py-24 md:py-32">
      <div className="mx-auto max-w-[960px] px-5 md:px-10">
        <Reveal>
          <SectionLabel>Scope</SectionLabel>
          <h2 className="mt-3 max-w-[18ch] font-display text-3xl font-semibold tracking-tight md:text-4xl">
            What this index is not
          </h2>
          <p className="mt-4 max-w-[44ch] text-sm text-muted-foreground md:text-base">
            {study} is a comparative fitness index—not a model bake-off.
          </p>
        </Reveal>
        <Reveal delay={0.06} className="mt-12 space-y-0">
          {points.map((p) => (
            <div
              key={p.label}
              className="grid gap-2 border-t border-white/8 py-6 md:grid-cols-[7rem_1fr] md:gap-10"
            >
              <p className="font-data text-[10px] uppercase tracking-[0.16em] text-accent">
                {p.label}
              </p>
              <p className="max-w-[50ch] text-[15px] leading-relaxed text-muted-foreground">
                {p.body}
              </p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
