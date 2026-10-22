"use client"

import { useMemo, useState } from "react"
import {
  DitherAvatar,
  DitherGradient,
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
    left: { label: left.framework, color: "orange" as const },
    right: { label: right.framework, color: "grey" as const },
  }

  const presets = comparisons.slice(0, 6)

  return (
    <section id="compare" className="relative overflow-hidden py-24 md:py-32">
      <DitherGradient
        from="orange"
        to="transparent"
        direction="right"
        cell={3}
        opacity={0.1}
        bloom="low"
        className="pointer-events-none absolute inset-y-0 left-0 w-1/3"
      />
      <div className="relative mx-auto max-w-[960px] px-5 md:px-10">
        <Reveal>
          <SectionLabel>Head-to-head</SectionLabel>
          <h2 className="mt-3 max-w-[14ch] font-display text-3xl font-semibold tracking-tight md:text-4xl">
            Two stacks. One call.
          </h2>
          <p className="mt-4 max-w-[44ch] text-sm text-muted-foreground md:text-base">
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
                  "inline-flex items-center gap-2 border px-2.5 py-1.5 font-data text-[10px] uppercase tracking-[0.12em] transition",
                  leftId === c.leftId && rightId === c.rightId
                    ? "border-accent/50 bg-accent/10 text-accent"
                    : "border-white/8 text-muted-foreground hover:border-white/20 hover:text-foreground"
                )}
              >
                <DitherAvatar
                  name={`${c.leftId}${c.rightId}`}
                  hue={24}
                  bloom="low"
                  className="size-4 shrink-0 rounded-[2px]"
                />
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

        <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:gap-12">
          <Reveal delay={0.08} className="min-w-0">
            <p className="mb-4 font-data text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              Profile · {left.id} vs {right.id}
            </p>
            <div className="border border-white/8 bg-white/[0.02] p-4 md:p-5">
              <RadarChart
                data={radarData}
                config={radarConfig}
                nameKey="axis"
                className="h-[320px] w-full"
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
            <p className="font-data text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
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
            <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-white/8 pt-6">
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
        className="mt-2 w-full appearance-none border border-white/8 bg-[#050505] px-3 py-2.5 font-data text-[12px] text-foreground outline-none transition focus:border-accent/40"
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
