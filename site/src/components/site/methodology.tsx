"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
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
import { Reveal } from "./reveal"

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
    <section id="method" className="relative py-32 md:py-40">
      <div className="mx-auto max-w-[1120px] px-6 md:px-8">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
            01 — Methodology
          </p>
          <h2 className="mt-4 max-w-[24ch] font-display text-4xl font-semibold tracking-tight md:text-5xl">
            Scoring dimensions and proprietary indices
          </h2>
          <p className="mt-5 max-w-[52ch] text-muted-foreground">
            {methodology.overview}
          </p>
        </Reveal>

        <Reveal delay={0.06} className="mt-16">
          <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            Dimension weights · expand for 90 vs 60 rubrics
          </p>
          <div className="flex h-3 w-full overflow-hidden rounded-sm">
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
                  openCode === d.code ? "opacity-100" : "opacity-70",
                  openCode && openCode !== d.code ? "opacity-40" : ""
                )}
                style={{
                  width: `${d.weight * 100}%`,
                  background:
                    openCode === d.code
                      ? "oklch(0.72 0.19 45)"
                      : `oklch(${0.35 + d.weight * 1.2} 0.08 45)`,
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
                  "rounded-md border px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] transition",
                  openCode === d.code
                    ? "border-accent/50 bg-accent/10 text-accent"
                    : "border-white/10 text-muted-foreground hover:border-white/20 hover:text-foreground"
                )}
              >
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
                      <span className="font-mono text-base text-accent">
                        {d.code}
                      </span>
                    </h3>
                    <div className="mt-6 grid gap-8 md:grid-cols-2">
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                          Rubric · 90
                        </p>
                        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                          {d.rubric90}
                        </p>
                      </div>
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
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

        <Reveal delay={0.1} className="mt-24">
          <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
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
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
          {subtitle}
        </span>
      </div>
      <p className="mt-3 font-mono text-[10px] leading-relaxed text-muted-foreground/80">
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
          "font-mono text-[10px] uppercase tracking-[0.16em]",
          accent ? "text-accent" : "text-muted-foreground"
        )}
      >
        {side.id} · {side.name}
      </p>
      <ul className="mt-3 space-y-1.5">
        {side.rows.map((r) => (
          <li
            key={r.label}
            className="flex justify-between gap-3 font-mono text-[11px] text-muted-foreground"
          >
            <span className="truncate">{r.label}</span>
            <span className="tabular-nums text-foreground/80">
              {r.value.toFixed(1)}
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-4 flex justify-between border-t border-white/8 pt-3 font-mono text-sm">
        <span className="text-muted-foreground">Sum → published</span>
        <span className={accent ? "text-accent" : "text-foreground"}>
          {side.total.toFixed(1)} → {side.published}
        </span>
      </p>
    </div>
  )
}
