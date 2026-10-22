"use client"

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
    statement: `Composite fitness and rewrite hazard are not co-monotonic among AFFIX ≥ 81 frameworks. ${vs.framework} records AFFIX ${vs.AFFIX.toFixed(1)} with RHS ${vs.RHS.toFixed(1)}; ${pd.framework} records AFFIX ${pd.AFFIX.toFixed(1)} with RHS ${pd.RHS.toFixed(1)}.`,
  },
  {
    id: "R2",
    construct: "Control surface",
    statement: `Maximum control-surface score does not minimize rewrite hazard. LangGraph leads CS (${lg.CS}) with RHS ${lg.RHS.toFixed(1)}; Mastra records RHS ${ma.RHS.toFixed(1)} at CS ${ma.CS}.`,
  },
  {
    id: "R3",
    construct: "DX−PH surplus",
    statement: `A developer-experience surplus of DX − PH ≥ 15 is associated with elevated RHS in this sample. ${vs.framework} surplus equals ${(vs.DX - vs.PH).toFixed(0)} (DX ${vs.DX}, PH ${vs.PH}).`,
  },
  {
    id: "R4",
    construct: "RACS vs AFFIX",
    statement: `${li.framework} maximizes the RAG→agent continuum (RACS ${li.RACS}) while ranking mid-field on AFFIX (${li.AFFIX.toFixed(1)}; RHS ${li.RHS.toFixed(1)}). Continuum strength does not substitute for composite fitness.`,
  },
  {
    id: "R5",
    construct: "Protocol readiness",
    statement: `Protocol readiness and migration friction remain orthogonal. Google ADK leads PR (${ad.PR}) with MF ${ad.MF}; high PR does not imply low rewrite hazard (RHS ${ad.RHS.toFixed(1)}).`,
  },
] as const

export function Brief() {
  return (
    <section id="results" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-[1120px] px-5 md:px-8">
        <Reveal>
          <SectionLabel>Principal results</SectionLabel>
          <h2 className="mt-3 max-w-[20ch] font-display text-3xl font-semibold tracking-tight md:text-4xl">
            Adjudicated findings from the score matrix
          </h2>
          <p className="mt-4 max-w-[48ch] text-[15px] leading-relaxed text-muted-foreground md:text-base">
            Each statement cites published dimension or index values and is
            falsifiable under the study protocol.
          </p>
        </Reveal>

        <Stagger className="mt-14 border-t border-foreground/12">
          {results.map((r) => (
            <StaggerItem key={r.id}>
              <article className="grid gap-3 border-b border-foreground/10 py-8 md:grid-cols-[4rem_9rem_1fr] md:gap-8">
                <span className="font-data text-[11px] font-medium text-accent">
                  {r.id}
                </span>
                <span className="font-data text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                  {r.construct}
                </span>
                <p className="max-w-[58ch] text-[15px] leading-relaxed text-foreground md:text-[16px] md:leading-[1.55]">
                  {r.statement}
                </p>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
