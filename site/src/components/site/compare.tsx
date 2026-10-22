"use client"

import { useMemo, useState } from "react"
import {
  Legend,
  Radar,
  RadarChart,
  Tooltip,
} from "@/components/dither-kit"
import {
  comparisons,
  frameworks,
  generateComparison,
  getComparison,
} from "@/data/content"
import { cn } from "@/lib/utils"
import { Reveal, SectionLabel } from "./reveal"

const RADAR_DIMS = [
  { key: "CS", axis: "Control" },
  { key: "TC", axis: "Types" },
  { key: "OB", axis: "Obs" },
  { key: "PH", axis: "Hardening" },
  { key: "DX", axis: "DX" },
  { key: "RACS", axis: "Continuum" },
  { key: "MF", axis: "Migration" },
  { key: "FMC", axis: "Failures" },
] as const

export function Compare() {
  const [leftId, setLeftId] = useState("PD")
  const [rightId, setRightId] = useState("VS")

  const left = frameworks.find((f) => f.id === leftId)!
  const right = frameworks.find((f) => f.id === rightId)!

  const curated = getComparison(leftId, rightId)
  const generated = useMemo(
    () => generateComparison(left, right),
    [left, right]
  )
  const verdict = curated?.verdict ?? generated.verdict
  const bullets = curated?.bullets ?? generated.bullets

  const radarData = RADAR_DIMS.map((d) => ({
    axis: d.axis,
    left: left[d.key],
    right: right[d.key],
  }))

  const radarConfig = {
    left: { label: left.framework, color: "red" as const },
    right: { label: right.framework, color: "blue" as const },
  }

  const presets = comparisons.slice(0, 6)

  return (
    <section id="compare" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-[1120px] px-5 md:px-8">
        <Reveal>
          <SectionLabel>Head-to-head</SectionLabel>
          <h2 className="mt-3 max-w-[20ch] font-display text-3xl font-semibold tracking-tight md:text-4xl">
            Paired dimensional comparison
          </h2>
          <p className="mt-4 max-w-[46ch] text-[15px] leading-relaxed text-muted-foreground md:text-base">
            Dimension radar from the score matrix. Verdicts use curated
            comparisons when available; otherwise they are derived from scores.
          </p>
        </Reveal>

        <Reveal delay={0.06} className="mt-12">
          <div className="flex flex-wrap gap-2">
            {presets.map((c) => (
              <button
                key={c.title}
                type="button"
                onClick={() => {
                  setLeftId(c.leftId)
                  setRightId(c.rightId)
                }}
                className={cn(
                  "border px-2.5 py-1.5 font-data text-[10px] uppercase tracking-[0.12em] transition",
                  leftId === c.leftId && rightId === c.rightId
                    ? "border-accent/50 bg-accent/10 text-accent"
                    : "border-foreground/12 text-muted-foreground hover:border-foreground/25 hover:text-foreground"
                )}
              >
                {c.leftId} · {c.rightId}
              </button>
            ))}
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <Select
              label="Framework A"
              value={leftId}
              exclude={rightId}
              onChange={setLeftId}
            />
            <Select
              label="Framework B"
              value={rightId}
              exclude={leftId}
              onChange={setRightId}
            />
          </div>
        </Reveal>

        <div className="mt-14 grid gap-14 lg:grid-cols-2 lg:gap-16">
          <Reveal delay={0.08} className="min-w-0">
            <p className="mb-4 font-data text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
              Profile · {left.id} vs {right.id}
            </p>
            <div className="border border-foreground/10 bg-foreground/[0.03] p-4 md:p-5">
              <RadarChart
                data={radarData}
                config={radarConfig}
                nameKey="axis"
                className="h-[340px] w-full"
                animate
                animationDuration={1200}
                bloom="low"
              >
                <Radar dataKey="left" variant="gradient" />
                <Radar dataKey="right" variant="dotted" />
                <Legend />
                <Tooltip />
              </RadarChart>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="font-data text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
              {curated ? "Curated verdict" : "Derived from scores"}
            </p>
            <p className="mt-4 font-display text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
              {verdict}
            </p>
            <ul className="mt-8 space-y-4">
              {bullets.map((b) => (
                <li
                  key={b}
                  className="border-l border-accent/40 pl-4 text-[15px] leading-relaxed text-muted-foreground"
                >
                  {b}
                </li>
              ))}
            </ul>
            <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-foreground/12 pt-6">
              <Stat label="AFFIX" a={left.AFFIX} b={right.AFFIX} higher />
              <Stat label="RHS ↓" a={left.RHS} b={right.RHS} />
              <Stat label="PR" a={left.PR} b={right.PR} higher />
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Select({
  label,
  value,
  exclude,
  onChange,
}: {
  label: string
  value: string
  exclude: string
  onChange: (id: string) => void
}) {
  return (
    <label className="block">
      <span className="font-data text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full appearance-none border border-foreground/12 bg-background px-3 py-2.5 font-data text-[12px] text-foreground outline-none transition focus:border-accent/40"
      >
        {frameworks
          .filter((f) => f.id !== exclude)
          .map((f) => (
            <option key={f.id} value={f.id}>
              {f.id} — {f.framework}
            </option>
          ))}
      </select>
    </label>
  )
}

function Stat({
  label,
  a,
  b,
  higher,
}: {
  label: string
  a: number
  b: number
  higher?: boolean
}) {
  const aWins = higher ? a >= b : a <= b
  return (
    <div>
      <dt className="font-data text-[9px] uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </dt>
      <dd className="mt-2 font-data text-sm tabular-nums">
        <span className={aWins ? "text-accent" : "text-foreground/70"}>
          {a.toFixed(1)}
        </span>
        <span className="text-muted-foreground"> / </span>
        <span className={!aWins ? "text-accent" : "text-foreground/70"}>
          {b.toFixed(1)}
        </span>
      </dd>
    </div>
  )
}
