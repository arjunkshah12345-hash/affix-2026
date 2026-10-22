"use client"

import { asOf, frameworks, study } from "@/data/content"
import { Reveal } from "./reveal"

const points = [
  {
    label: "Sample",
    body: `${frameworks.length} Tier-A frameworks, deep-scored from primary docs and named APIs as of ${asOf}. Spot-checks (LiteLLM, Inngest, ElizaOS) are contextual only—not full AFFIX rows.`,
  },
  {
    label: "EST scores",
    body: "Every dimension and index is an estimate from public evidence. Marketing claims never override shipped APIs. No production telemetry or blind hiring surveys were collected.",
  },
  {
    label: "Falsifiers",
    body: "Claims retire if twelve-month rewrite rates invert RHS order, if DX−PH loses significance against outcomes, or if protocol exports erase the MF gap. Each finding carries its own kill condition.",
  },
] as const

export function Limitations() {
  return (
    <section id="limitations" className="relative border-t border-white/8 py-24 md:py-28">
      <div className="mx-auto max-w-[1120px] px-6 md:px-8">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            Limits
          </p>
          <h2 className="mt-4 max-w-[22ch] font-display text-3xl font-semibold tracking-tight md:text-4xl">
            Scope and limitations
          </h2>
          <p className="mt-4 max-w-[52ch] text-muted-foreground">
            {study} is a comparative fitness index derived from public APIs and
            documentation. It does not measure model quality, and it does not
            predict outcomes for any single deployment.
          </p>
        </Reveal>

        <Reveal delay={0.06} className="mt-14 space-y-8">
          {points.map((p) => (
            <div
              key={p.label}
              className="grid gap-2 border-t border-white/8 pt-8 md:grid-cols-[9rem_1fr] md:gap-10"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                {p.label}
              </p>
              <p className="max-w-[56ch] text-[15px] leading-relaxed text-muted-foreground">
                {p.body}
              </p>
            </div>
          ))}
        </Reveal>

        <Reveal delay={0.1} className="mt-12">
          <a
            href="/methodology.md"
            download
            className="font-mono text-[11px] uppercase tracking-[0.16em] text-foreground underline-offset-4 transition hover:text-accent hover:underline"
          >
            Download full methodology →
          </a>
        </Reveal>
      </div>
    </section>
  )
}
