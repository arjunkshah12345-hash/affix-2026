"use client"

import { DitherAvatar, Sparkline } from "@/components/dither-kit"
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
    statement: `Composite fitness and rewrite hazard are not co-monotonic among AFFIX ≥ 81 frameworks. ${vs.framework}: AFFIX ${vs.AFFIX.toFixed(1)}, RHS ${vs.RHS.toFixed(1)}. ${pd.framework}: AFFIX ${pd.AFFIX.toFixed(1)}, RHS ${pd.RHS.toFixed(1)}.`,
    spark: [vs.AFFIX, 100 - vs.RHS, pd.AFFIX, 100 - pd.RHS],
  },
  {
    id: "R2",
    construct: "Control surface",
    statement: `Maximum CS does not minimize rewrite hazard. LangGraph CS ${lg.CS}, RHS ${lg.RHS.toFixed(1)}; Mastra RHS ${ma.RHS.toFixed(1)} at CS ${ma.CS}.`,
    spark: [lg.CS, 100 - lg.RHS, ma.CS, 100 - ma.RHS],
  },
  {
    id: "R3",
    construct: "DX−PH surplus",
    statement: `DX − PH ≥ 15 associates with elevated RHS. ${vs.framework} surplus ${(vs.DX - vs.PH).toFixed(0)} (DX ${vs.DX}, PH ${vs.PH}).`,
    spark: [vs.DX, vs.PH, vs.RHS],
  },
  {
    id: "R4",
    construct: "RACS vs AFFIX",
    statement: `${li.framework} maximizes RACS (${li.RACS}) with mid-field AFFIX (${li.AFFIX.toFixed(1)}). Continuum strength ≠ composite fitness.`,
    spark: [li.RACS, li.AFFIX, 100 - li.RHS],
  },
  {
    id: "R5",
    construct: "Protocol readiness",
    statement: `ADK leads PR (${ad.PR}) with MF ${ad.MF}. Protocol readiness does not compress rewrite hazard (RHS ${ad.RHS.toFixed(1)}).`,
    spark: [ad.PR, ad.MF, 100 - ad.RHS],
  },
] as const

export function Brief() {
  return (
    <section id="results" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-[1120px] px-5 md:px-8">
        <Reveal>
          <SectionLabel>Principal results</SectionLabel>
          <h2 className="mt-4 max-w-[20ch] font-display text-4xl font-semibold tracking-tight md:text-5xl">
            What the matrix actually says
          </h2>
          <p className="mt-5 max-w-[46ch] text-muted-foreground">
            Five adjudicated findings. Published scores only—each falsifiable
            under the study protocol.
          </p>
        </Reveal>

        <Stagger className="mt-16 border-t border-white/8">
          {results.map((r) => (
            <StaggerItem key={r.id}>
              <article className="grid gap-5 border-b border-white/8 py-8 md:grid-cols-[4.5rem_1fr_6.5rem] md:items-center md:gap-10">
                <div className="flex items-center gap-3 md:flex-col md:items-start">
                  <DitherAvatar
                    name={r.id}
                    hue={28}
                    bloom="low"
                    className="size-9 shrink-0 rounded-sm"
                  />
                  <span className="font-data text-[11px] text-accent">{r.id}</span>
                </div>
                <div>
                  <p className="font-data text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                    {r.construct}
                  </p>
                  <p className="mt-2 max-w-[54ch] text-[15px] leading-relaxed text-foreground md:text-base">
                    {r.statement}
                  </p>
                </div>
                <div className="hidden h-11 md:block">
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
