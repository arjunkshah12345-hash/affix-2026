"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { DitherAvatar, DitherGradient } from "@/components/dither-kit"
import {
  dimensions,
  formulas,
  getSiteFramework,
  matrixFrameworkById,
  methodology,
  prTerms,
  rhsTerms,
} from "@/data/content"
import { cn } from "@/lib/utils"
import { Reveal, SectionLabel } from "./reveal"

export function Methodology() {
  const [openCode, setOpenCode] = useState<string | null>(null)
  const pd = getSiteFramework("PD")!
  const vs = getSiteFramework("VS")!
  const pdMatrix = matrixFrameworkById.PD
  const vsMatrix = matrixFrameworkById.VS
  const pdRhs = rhsTerms(pd.scores)
  const vsRhs = rhsTerms(vs.scores)
  const pdPr = pdMatrix.PR_components_EST
    ? prTerms(pdMatrix.PR_components_EST)
    : null
  const vsPr = vsMatrix.PR_components_EST
    ? prTerms(vsMatrix.PR_components_EST)
    : null

  return (
    <section id="method" className="relative overflow-hidden py-24 md:py-32">
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
          <SectionLabel>Methodology</SectionLabel>
          <h2 className="mt-3 max-w-[16ch] font-display text-3xl font-semibold tracking-tight md:text-4xl">
            Weights, rubrics, worked math
          </h2>
          <p className="mt-4 max-w-[48ch] text-sm text-muted-foreground md:text-base">
            {methodology.overview}
          </p>
        </Reveal>

        <Reveal delay={0.06} className="mt-14">
          <p className="mb-4 font-data text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
            Dimension weights · expand for 90 vs 60 rubrics
          </p>
          <div className="flex h-2.5 w-full overflow-hidden rounded-sm border border-white/8">
            {dimensions.map((d) => (
              <button
                key={d.code}
                type="button"
                title={`${d.code} ${(d.weight * 100).toFixed(0)}%`}
                onClick={() =>
                  setOpenCode((c) => (c === d.code ? null : d.code))
                }
                className={cn(
                  "h-full transition-opacity hover:opacity-100",
                  openCode === d.code ? "opacity-100" : "opacity-75",
                  openCode && openCode !== d.code ? "opacity-35" : ""
                )}
                style={{
                  width: `${d.weight * 100}%`,
                  background:
                    openCode === d.code
                      ? "var(--accent)"
                      : `color-mix(in oklch, var(--foreground) ${14 + d.weight * 40}%, transparent)`,
                }}
              />
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {dimensions.map((d) => (
              <button
                key={d.code}
                type="button"
                onClick={() =>
                  setOpenCode((c) => (c === d.code ? null : d.code))
                }
                className={cn(
                  "inline-flex items-center gap-2 border px-2.5 py-1.5 font-data text-[10px] uppercase tracking-[0.14em] transition",
                  openCode === d.code
                    ? "border-accent/50 bg-accent/10 text-accent"
                    : "border-white/8 text-muted-foreground hover:border-white/20 hover:text-foreground"
                )}
              >
                <DitherAvatar
                  name={d.code}
                  hue={24}
                  bloom="low"
                  className="size-4 shrink-0 rounded-[2px]"
                />
                {d.code}{" "}
                <span className="text-muted-foreground/80">
                  {(d.weight * 100).toFixed(0)}%
                </span>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {openCode &&
              (() => {
                const d = dimensions.find((x) => x.code === openCode)!
                return (
                  <motion.div
                    key={d.code}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="mt-8 border-t border-white/8 pt-8"
                  >
                    <h3 className="font-display text-2xl font-semibold tracking-tight">
                      {d.name}{" "}
                      <span className="font-data text-base text-accent">
                        {d.code}
                      </span>
                    </h3>
                    <div className="mt-6 grid gap-8 md:grid-cols-2">
                      <div>
                        <p className="font-data text-[10px] uppercase tracking-[0.14em] text-accent">
                          Rubric · 90
                        </p>
                        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                          {d.rubric90}
                        </p>
                      </div>
                      <div>
                        <p className="font-data text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                          Rubric · 60
                        </p>
                        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                          {d.rubric60}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )
              })()}
          </AnimatePresence>
        </Reveal>

        <Reveal delay={0.1} className="mt-20">
          <p className="mb-3 font-data text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
            Worked example · PydanticAI vs Vercel AI SDK
          </p>
          <h3 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
            RHS and Protocol Readiness
          </h3>
          <p className="mt-3 max-w-[48ch] text-sm text-muted-foreground">
            Same inputs as the published score matrix. Terms are additive; RHS
            clamps to 0–100.
          </p>

          <div className="mt-10 grid gap-10 lg:grid-cols-2">
            <FormulaCard
              title="Rewrite Hazard (RHS)"
              subtitle="Lower is better"
              formula={formulas.RHS}
              left={{
                id: "PD",
                name: "PydanticAI",
                total: pdRhs.total,
                published: pd.scores.RHS,
                rows: [
                  { label: "0.28×(100−RACS)", value: pdRhs.racsGap },
                  { label: "0.22×(100−FMC)", value: pdRhs.fmcGap },
                  { label: "0.18×CTI", value: pdRhs.cti },
                  { label: "0.17×max(0,DX−PH)", value: pdRhs.dxPh },
                  { label: "0.15×(100−PH)", value: pdRhs.phGap },
                ],
              }}
              right={{
                id: "VS",
                name: "Vercel AI SDK",
                total: vsRhs.total,
                published: vs.scores.RHS,
                rows: [
                  { label: "0.28×(100−RACS)", value: vsRhs.racsGap },
                  { label: "0.22×(100−FMC)", value: vsRhs.fmcGap },
                  { label: "0.18×CTI", value: vsRhs.cti },
                  { label: "0.17×max(0,DX−PH)", value: vsRhs.dxPh },
                  { label: "0.15×(100−PH)", value: vsRhs.phGap },
                ],
              }}
            />

            {pdPr && vsPr && (
              <FormulaCard
                title="Protocol Readiness (PR)"
                subtitle="Higher is better"
                formula={formulas.PR}
                left={{
                  id: "PD",
                  name: "PydanticAI",
                  total: pdPr.total,
                  published: pd.scores.PR,
                  rows: [
                    { label: "0.30×MCP client", value: pdPr.mcpClient },
                    { label: "0.15×MCP server", value: pdPr.mcpServer },
                    { label: "0.25×A2A / equiv", value: pdPr.a2a },
                    { label: "0.15×OpenAPI bridge", value: pdPr.openapi },
                    { label: "0.15×OTel GenAI", value: pdPr.otel },
                  ],
                }}
                right={{
                  id: "VS",
                  name: "Vercel AI SDK",
                  total: vsPr.total,
                  published: vs.scores.PR,
                  rows: [
                    { label: "0.30×MCP client", value: vsPr.mcpClient },
                    { label: "0.15×MCP server", value: vsPr.mcpServer },
                    { label: "0.25×A2A / equiv", value: vsPr.a2a },
                    { label: "0.15×OpenAPI bridge", value: vsPr.openapi },
                    { label: "0.15×OTel GenAI", value: vsPr.otel },
                  ],
                }}
              />
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

type Side = {
  id: string
  name: string
  total: number
  published: number
  rows: { label: string; value: number }[]
}

function FormulaCard({
  title,
  subtitle,
  formula,
  left,
  right,
}: {
  title: string
  subtitle: string
  formula: string
  left: Side
  right: Side
}) {
  return (
    <div className="border-t border-white/8 pt-8">
      <div className="flex items-baseline justify-between gap-4">
        <h4 className="font-display text-xl font-semibold tracking-tight">
          {title}
        </h4>
        <span className="font-data text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
          {subtitle}
        </span>
      </div>
      <p className="mt-3 font-data text-[10px] leading-relaxed text-muted-foreground">
        {formula}
      </p>
      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <SideBreakdown side={left} accent />
        <SideBreakdown side={right} />
      </div>
    </div>
  )
}

function SideBreakdown({ side, accent }: { side: Side; accent?: boolean }) {
  return (
    <div>
      <p
        className={cn(
          "font-data text-[10px] uppercase tracking-[0.14em]",
          accent ? "text-accent" : "text-muted-foreground"
        )}
      >
        {side.id} · {side.name}
      </p>
      <ul className="mt-3 space-y-1.5">
        {side.rows.map((r) => (
          <li
            key={r.label}
            className="flex justify-between gap-3 font-data text-[11px] text-muted-foreground"
          >
            <span className="truncate">{r.label}</span>
            <span className="tabular-nums text-foreground/80">
              {r.value.toFixed(1)}
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-4 flex justify-between border-t border-white/8 pt-3 font-data text-sm">
        <span className="text-muted-foreground">Sum → published</span>
        <span className={accent ? "text-accent" : "text-foreground"}>
          {side.total.toFixed(1)} → {side.published}
        </span>
      </p>
    </div>
  )
}
