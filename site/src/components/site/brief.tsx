"use client"

import { DitherAvatar, DitherGradient, Sparkline } from "@/components/dither-kit"
import { matrixFrameworkById } from "@/data/content"
import { Reveal, SectionLabel, Stagger, StaggerItem } from "./reveal"

const vs = matrixFrameworkById.VS
const lg = matrixFrameworkById.LG
const li = matrixFrameworkById.LI
const ad = matrixFrameworkById.AD
const ma = matrixFrameworkById.MA
const pd = matrixFrameworkById.PD

const results = [
  {
    id: "R1",
    construct: "AFFIX vs RHS",
    statement: `Among AFFIX ≥ 81, rewrite hazard does not fall with fitness. ${vs.framework} ${vs.AFFIX.toFixed(1)} / RHS ${vs.RHS.toFixed(1)}; ${pd.framework} ${pd.AFFIX.toFixed(1)} / RHS ${pd.RHS.toFixed(1)}.`,
    spark: [vs.AFFIX, 100 - vs.RHS, pd.AFFIX, 100 - pd.RHS],
  },
  {
    id: "R2",
    construct: "Control surface",
    statement: `Peak CS is not minimum RHS. LangGraph CS ${lg.CS}, RHS ${lg.RHS.toFixed(1)}; Mastra RHS ${ma.RHS.toFixed(1)} at CS ${ma.CS}.`,
    spark: [lg.CS, 100 - lg.RHS, ma.CS, 100 - ma.RHS],
  },
  {
    id: "R3",
    construct: "DX−PH surplus",
    statement: `DX − PH ≥ 15 tracks elevated RHS. ${vs.framework} surplus ${(vs.DX - vs.PH).toFixed(0)}.`,
    spark: [vs.DX, vs.PH, vs.RHS],
  },
  {
    id: "R4",
    construct: "RACS vs AFFIX",
    statement: `${li.framework} owns RACS ${li.RACS} at AFFIX ${li.AFFIX.toFixed(1)}. Continuum ≠ composite.`,
    spark: [li.RACS, li.AFFIX, 100 - li.RHS],
  },
  {
    id: "R5",
    construct: "Protocol readiness",
    statement: `ADK PR ${ad.PR}, MF ${ad.MF}, RHS ${ad.RHS.toFixed(1)}. Protocol leadership is orthogonal to rewrite safety.`,
    spark: [ad.PR, ad.MF, 100 - ad.RHS],
  },
] as const

export function Brief() {
  return (
    <section id="results" className="relative overflow-hidden py-24 md:py-32">
      <DitherGradient
        from="orange"
        to="transparent"
        direction="right"
        cell={3}
        opacity={0.08}
        bloom="low"
        className="pointer-events-none absolute inset-y-0 left-0 w-1/3"
      />
      <div className="relative mx-auto max-w-[960px] px-5 md:px-10">
        <Reveal>
          <SectionLabel>Results</SectionLabel>
          <h2 className="mt-3 max-w-[16ch] font-display text-3xl font-semibold tracking-tight md:text-4xl">
            Five claims that survive the matrix
          </h2>
          <p className="mt-4 max-w-[46ch] text-sm text-muted-foreground md:text-base">
            Constructs tested against the published score sheet. Sparklines
            encode the supporting terms, not a separate model.
          </p>
        </Reveal>

        <Stagger className="mt-12">
          {results.map((r) => (
            <StaggerItem key={r.id}>
              <article className="grid gap-4 border-l-2 border-accent/40 py-7 pl-5 md:grid-cols-[3rem_1fr_5.5rem] md:gap-8 md:border-l-0 md:border-t md:border-white/8 md:pl-0 md:pt-8">
                <div className="flex items-center gap-3 md:flex-col md:items-start">
                  <DitherAvatar
                    name={r.id}
                    hue={24}
                    bloom="low"
                    className="size-8 rounded-sm"
                  />
                  <span className="font-data text-[11px] text-accent">{r.id}</span>
                </div>
                <div>
                  <p className="font-data text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                    {r.construct}
                  </p>
                  <p className="mt-2 max-w-[52ch] text-[15px] leading-relaxed text-foreground">
                    {r.statement}
                  </p>
                </div>
                <div className="hidden h-10 self-center md:block">
                  <Sparkline
                    data={[...r.spark]}
                    color="orange"
                    variant="gradient"
                    bloom="low"
                    className="h-full w-full"
                  />
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
