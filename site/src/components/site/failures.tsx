"use client"

import { useMemo, useState } from "react"
import {
  failureFrameworks,
  failureLegend,
  failureModes,
  type FailureCoverage,
} from "@/data/content"
import { cn } from "@/lib/utils"
import { BlurReveal } from "@/components/ui/blur-reveal"
import { Pill } from "@/components/ui/pill"
import { Table, TBody, TD, TH, THead, TR } from "@/components/ui/table"

const CELL: Record<
  FailureCoverage,
  { tone: "sage" | "sand" | "rose" | "neutral"; label: string }
> = {
  first_class: { tone: "sage", label: "F" },
  pattern: { tone: "sand", label: "P" },
  absent: { tone: "rose", label: "A" },
  unknown: { tone: "neutral", label: "?" },
}

const LEGEND_ORDER: FailureCoverage[] = [
  "first_class",
  "pattern",
  "absent",
  "unknown",
]

export function Failures() {
  const [hover, setHover] = useState<{
    fw: string
    mode: string
    note: string
    cell: FailureCoverage
    api?: string
  } | null>(null)

  const rows = useMemo(
    () => [...failureFrameworks].sort((a, b) => b.FMC - a.FMC).slice(0, 8),
    []
  )

  return (
    <section
      id="failures"
      className="border-t border-line px-5 py-20 md:px-8 md:py-28"
    >
      <div className="mx-auto max-w-5xl">
        <BlurReveal>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted">
                Failures
              </p>
              <h2 className="mt-3 max-w-[16ch] font-display text-3xl tracking-[-0.02em] text-ink md:text-4xl">
                Coverage at the fault line
              </h2>
            </div>
            <p className="max-w-[34ch] text-[14px] leading-relaxed text-muted md:text-right">
              First-class API, documented pattern, or absent. Top eight by FMC —
              hover a cell for the named surface.
            </p>
          </div>
        </BlurReveal>

        <BlurReveal delay={60} className="mt-6 flex flex-wrap gap-2">
          {LEGEND_ORDER.map((k) => (
            <Pill key={k} tone={CELL[k].tone} className="font-mono">
              {CELL[k].label} · {failureLegend[k]}
            </Pill>
          ))}
        </BlurReveal>

        <BlurReveal delay={100} className="mt-8">
          <Table className="min-w-[720px]">
            <THead>
              <TR>
                <TH className="sticky left-0 z-10 bg-surface-muted/95 backdrop-blur-sm">
                  Framework
                </TH>
                {failureModes.map((m) => (
                  <TH
                    key={m.code}
                    title={m.name}
                    className="px-2 text-center"
                  >
                    <span className="font-mono text-[10px]">{m.code}</span>
                  </TH>
                ))}
                <TH className="text-right">FMC</TH>
              </TR>
            </THead>
            <TBody>
              {rows.map((fw) => (
                <TR key={fw.id}>
                  <TD className="sticky left-0 z-10 bg-[#0a0a0a]/95 backdrop-blur-sm">
                    <span className="font-medium text-ink">{fw.name}</span>
                    <span className="ml-2 font-mono text-xs text-faint">
                      {fw.id}
                    </span>
                  </TD>
                  {failureModes.map((m) => {
                    const cell = fw.cells[m.code] ?? "unknown"
                    const meta = CELL[cell]
                    const evidence = fw.evidence?.[m.code]
                    const note =
                      evidence?.note ??
                      evidence?.api ??
                      failureLegend[cell]
                    const active =
                      hover?.fw === fw.name && hover.mode === m.name
                    return (
                      <TD key={m.code} className="px-2 text-center">
                        <button
                          type="button"
                          className="inline-flex"
                          title={`${m.name}${evidence?.api ? ` — ${evidence.api}` : ""}`}
                          onMouseEnter={() =>
                            setHover({
                              fw: fw.name,
                              mode: m.name,
                              note,
                              cell,
                              api: evidence?.api,
                            })
                          }
                          onMouseLeave={() => setHover(null)}
                          onFocus={() =>
                            setHover({
                              fw: fw.name,
                              mode: m.name,
                              note,
                              cell,
                              api: evidence?.api,
                            })
                          }
                          onBlur={() => setHover(null)}
                        >
                          <Pill
                            tone={meta.tone}
                            className={cn(
                              "min-w-[1.75rem] justify-center font-mono",
                              active && "ring-1 ring-accent/50"
                            )}
                          >
                            {meta.label}
                          </Pill>
                        </button>
                      </TD>
                    )
                  })}
                  <TD className="text-right font-mono tabular-nums text-ink">
                    {fw.FMC}
                  </TD>
                </TR>
              ))}
            </TBody>
          </Table>
        </BlurReveal>

        <p className="mt-4 min-h-[2.5rem] font-mono text-[12px] leading-relaxed text-muted">
          {hover ? (
            <>
              <span className="text-ink-soft">
                {hover.fw} · {hover.mode}
              </span>
              {" — "}
              {hover.note}
              {hover.api ? (
                <span className="text-faint"> · {hover.api}</span>
              ) : null}
            </>
          ) : (
            "Hover a cell for the named surface and evidence."
          )}
        </p>
      </div>
    </section>
  )
}
