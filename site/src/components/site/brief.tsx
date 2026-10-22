"use client"

import { DitherAvatar, DitherGradient, Sparkline } from "@/components/dither-kit"
import { matrixFrameworkById } from "@/data/content"
import { Reveal, Stagger, StaggerItem } from "./reveal"

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
    spark: [vs.AFFIX, 100 - vs.RHS, pd.AFFIX, 100 - pd.RHS],
  },
  {
    id: "R2",
    construct: "Control surface",
    statement: `Maximum control-surface score does not minimize rewrite hazard. LangGraph leads CS (${lg.CS}) with RHS ${lg.RHS.toFixed(1)}; Mastra records RHS ${ma.RHS.toFixed(1)} at lower CS (${ma.CS}).`,
    spark: [lg.CS, 100 - lg.RHS, ma.CS, 100 - ma.RHS],
  },
  {
    id: "R3",
    construct: "DX−PH surplus",
    statement: `A developer-experience surplus of DX − PH ≥ 15 is associated with elevated RHS in this sample. ${vs.framework} surplus equals ${(vs.DX - vs.PH).toFixed(0)} (DX ${vs.DX}, PH ${vs.PH}).`,
    spark: [vs.DX, vs.PH, vs.RHS],
  },
  {
    id: "R4",
    construct: "RACS vs AFFIX",
    statement: `${li.framework} maximizes the RAG→agent continuum (RACS ${li.RACS}) while ranking mid-field on AFFIX (${li.AFFIX.toFixed(1)}; RHS ${li.RHS.toFixed(1)}). Continuum strength does not substitute for composite fitness.`,
    spark: [li.RACS, li.AFFIX, 100 - li.RHS],
  },
  {
    id: "R5",
    construct: "Protocol readiness",
    statement: `Protocol readiness and migration friction remain orthogonal. Google ADK leads PR (${ad.PR}) with MF ${ad.MF}; high PR does not imply low rewrite hazard (ADK RHS ${ad.RHS.toFixed(1)}).`,
    spark: [ad.PR, ad.MF, 100 - ad.RHS],
  },
] as const

export function Brief() {
  return (
    <section id="brief" className="relative overflow-hidden py-28 md:py-36">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[50%]">
        <DitherGradient
          from="orange"
          to="transparent"
          direction="down"
          cell={3}
          opacity={0.22}
          bloom="low"
          className="absolute inset-0"
        />
      </div>

      <div className="relative mx-auto max-w-[1120px] px-6 md:px-8">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
            00 — Abstract results
          </p>
          <h2 className="mt-4 max-w-[22ch] font-display text-4xl font-semibold tracking-tight md:text-5xl">
            Principal results
          </h2>
          <p className="mt-5 max-w-[52ch] text-[15px] leading-relaxed text-muted-foreground md:text-base">
            Five adjudicated findings from the AFFIX-2026 score matrix. Each
            statement cites published dimension or index values; each is
            falsifiable under the study protocol.
          </p>
        </Reveal>

        <Stagger className="mt-16 border-t border-white/8">
          {results.map((r) => (
            <StaggerItem key={r.id}>
              <article className="grid gap-5 border-b border-white/8 py-8 md:grid-cols-[4.5rem_1fr_7rem] md:items-start md:gap-10 md:py-9">
                <div className="flex items-center gap-3 md:flex-col md:items-start md:gap-3">
                  <DitherAvatar
                    name={r.id}
                    hue={22}
                    bloom="low"
                    className="size-9 shrink-0 rounded-sm"
                  />
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
                    {r.id}
                  </span>
                </div>

                <div className="min-w-0">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                    {r.construct}
                  </p>
                  <p className="mt-3 max-w-[58ch] text-[15px] leading-relaxed text-foreground md:text-[17px] md:leading-[1.55]">
                    {r.statement}
                  </p>
                </div>

                <div className="hidden h-12 w-full self-center md:block">
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
