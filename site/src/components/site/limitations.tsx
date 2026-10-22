"use client"

import { asOf, frameworks, study } from "@/data/content"
import { Reveal, SectionLabel } from "./reveal"

const points = [
  {
    label: "Sample",
    body: `${frameworks.length} Tier-A frameworks, scored from primary docs and named APIs as of ${asOf}. Spot-checks are contextual only—not full AFFIX rows.`,
  },
  {
    label: "EST scores",
    body: "Every dimension and index is an estimate from public evidence. Marketing claims never override shipped APIs. No production telemetry cohorts were collected.",
  },
  {
    label: "Falsifiers",
    body: "Claims retire if twelve-month rewrite rates invert RHS order, if DX−PH loses significance against outcomes, or if protocol exports erase the MF gap.",
  },
] as const

export function Limitations() {
  return (
    <section id="limitations" className="border-t border-foreground/10 py-20 md:py-24">
      <div className="mx-auto max-w-[1120px] px-5 md:px-8">
        <Reveal>
          <SectionLabel>Scope</SectionLabel>
          <h2 className="mt-3 max-w-[22ch] font-display text-2xl font-semibold tracking-tight md:text-3xl">
            Scope and limitations
          </h2>
          <p className="mt-4 max-w-[48ch] text-muted-foreground">
            {study} is a comparative fitness index from public APIs and
            documentation. It does not measure model quality or predict any
            single deployment.
          </p>
        </Reveal>

        <Reveal delay={0.06} className="mt-12 space-y-0">
          {points.map((p) => (
            <div
              key={p.label}
              className="grid gap-2 border-t border-foreground/10 py-7 md:grid-cols-[8rem_1fr] md:gap-10"
            >
              <p className="font-data text-[10px] uppercase tracking-[0.14em] text-accent">
                {p.label}
              </p>
              <p className="max-w-[52ch] text-[15px] leading-relaxed text-muted-foreground">
                {p.body}
              </p>
            </div>
          ))}
        </Reveal>

        <Reveal delay={0.1} className="mt-8">
          <a
            href="/methodology.md"
            className="font-data text-[11px] uppercase tracking-[0.14em] text-foreground underline-offset-4 transition hover:text-accent hover:underline"
          >
            Full methodology download
          </a>
        </Reveal>
      </div>
    </section>
  )
}
