"use client"

import { useState } from "react"
import { DitherGradient } from "@/components/dither-kit"
import {
  failureFrameworks,
  failureLegend,
  failureModes,
  type FailureCoverage,
} from "@/data/content"
import { cn } from "@/lib/utils"
import { Reveal, SectionLabel } from "./reveal"

const CELL: Record<FailureCoverage, { bg: string; label: string }> = {
  first_class: { bg: "bg-emerald-500/90 text-[#050505]", label: "F" },
  pattern: { bg: "bg-amber-400/85 text-[#050505]", label: "P" },
  absent: { bg: "bg-rose-500/85 text-white", label: "A" },
  unknown: { bg: "bg-white/15 text-white/70", label: "?" },
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
    url?: string
  } | null>(null)

  return (
    <section id="failures" className="relative overflow-hidden py-28 md:py-36">
      <DitherGradient
        from="orange"
        to="transparent"
        direction="up"
        cell={3}
        opacity={0.1}
        bloom="low"
        className="pointer-events-none absolute inset-x-0 top-0 h-48"
      />
      <div className="relative mx-auto max-w-[1120px] px-5 md:px-8">
        <Reveal>
          <SectionLabel>Failure modes</SectionLabel>
          <h2 className="mt-4 max-w-[18ch] font-display text-4xl font-semibold tracking-tight md:text-5xl">
            Where stacks break
          </h2>
          <p className="mt-5 max-w-[48ch] text-muted-foreground">
            First-class API, documented pattern, or absent. Hover a cell for the
            named surface and evidence. FMC ranks rows.
          </p>
        </Reveal>

        <Reveal delay={0.06} className="mt-8 flex flex-wrap gap-4">
          {LEGEND_ORDER.map((k) => (
            <div key={k} className="flex items-center gap-2">
              <span className={cn("size-2.5 rounded-sm", CELL[k].bg)} />
              <span className="font-data text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                {k.replace("_", " ")} — {failureLegend[k]}
              </span>
            </div>
          ))}
        </Reveal>

        <Reveal delay={0.1} className="mt-10">
          <div className="overflow-x-auto border border-white/8">
            <table className="w-full min-w-[920px] border-collapse text-left">
              <thead>
                <tr className="border-b border-white/8">
                  <th className="sticky left-0 z-10 bg-[#050505] px-3 py-3 font-data text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                    Framework
                  </th>
                  {failureModes.map((m) => (
                    <th
                      key={m.code}
                      title={m.name}
                      className="px-1 py-3 text-center font-data text-[9px] uppercase tracking-[0.1em] text-muted-foreground"
                    >
                      {m.code}
                    </th>
                  ))}
                  <th className="px-3 py-3 text-right font-data text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                    FMC
                  </th>
                </tr>
              </thead>
              <tbody>
                {[...failureFrameworks]
                  .sort((a, b) => b.FMC - a.FMC)
                  .map((fw) => (
                    <tr
                      key={fw.id}
                      className="border-b border-white/8 transition hover:bg-white/[0.02]"
                    >
                      <td className="sticky left-0 z-10 bg-[#050505] px-3 py-2.5">
                        <span className="font-data text-[11px] text-foreground">
                          {fw.id}
                        </span>
                        <span className="ml-2 hidden font-data text-[10px] text-muted-foreground sm:inline">
                          {fw.name}
                        </span>
                      </td>
                      {failureModes.map((m) => {
                        const cell = fw.cells[m.code] ?? "unknown"
                        const ev = fw.evidence?.[m.code]
                        return (
                          <td key={m.code} className="px-1 py-2 text-center">
                            <button
                              type="button"
                              className={cn(
                                "inline-flex size-6 items-center justify-center rounded-sm font-data text-[9px] transition",
                                CELL[cell].bg,
                                hover?.fw === fw.id && hover.mode === m.code
                                  ? "ring-1 ring-accent ring-offset-1 ring-offset-[#050505]"
                                  : ""
                              )}
                              onMouseEnter={() =>
                                setHover({
                                  fw: fw.id,
                                  mode: m.code,
                                  note: ev?.note || fw.notes,
                                  cell,
                                  api: ev?.api,
                                  url: ev?.evidence_url,
                                })
                              }
                              onMouseLeave={() => setHover(null)}
                              onFocus={() =>
                                setHover({
                                  fw: fw.id,
                                  mode: m.code,
                                  note: ev?.note || fw.notes,
                                  cell,
                                  api: ev?.api,
                                  url: ev?.evidence_url,
                                })
                              }
                              onBlur={() => setHover(null)}
                              aria-label={`${fw.id} ${m.code}: ${cell}`}
                            >
                              {CELL[cell].label}
                            </button>
                          </td>
                        )
                      })}
                      <td className="px-3 py-2.5 text-right font-data text-[12px] tabular-nums text-accent">
                        {fw.FMC}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 min-h-[4.5rem]">
            {hover ? (
              <p className="font-data text-[12px] leading-relaxed text-muted-foreground">
                <span className="text-accent">
                  {hover.fw} · {hover.mode} · {hover.cell.replace("_", " ")}
                </span>
                {" — "}
                {failureModes.find((m) => m.code === hover.mode)?.name}.
                {hover.api ? (
                  <>
                    {" "}
                    <span className="text-foreground/80">{hover.api}.</span>
                  </>
                ) : null}{" "}
                {hover.note}
                {hover.url ? (
                  <>
                    {" "}
                    <a
                      href={hover.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-accent underline-offset-2 hover:underline"
                    >
                      Evidence
                    </a>
                  </>
                ) : null}
              </p>
            ) : (
              <p className="font-data text-[11px] text-muted-foreground/70">
                Hover a cell for API surface and primary-source evidence.
              </p>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
