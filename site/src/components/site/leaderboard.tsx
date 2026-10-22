"use client"

import { frameworks } from "@/data/content"
import { cn } from "@/lib/utils"
import { useFrameworkDetail } from "./framework-detail"
import { Reveal, SectionLabel, Stagger, StaggerItem } from "./reveal"

function rhsTone(rhs: number) {
  if (rhs <= 22) return "text-emerald-400"
  if (rhs <= 30) return "text-amber-300"
  return "text-rose-400"
}

export function Leaderboard() {
  const { open } = useFrameworkDetail()

  return (
    <section id="rankings" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-[960px] px-5 md:px-10">
        <Reveal>
          <SectionLabel>Matrix</SectionLabel>
          <h2 className="mt-3 max-w-[18ch] font-display text-3xl font-semibold tracking-tight md:text-4xl">
            Full index, ordered by AFFIX
          </h2>
          <p className="mt-4 max-w-[44ch] text-sm text-muted-foreground md:text-base">
            RHS ↓ estimates twelve-month orchestration replacement. Open any row.
          </p>
        </Reveal>

        <Stagger className="mt-12">
          {frameworks.map((f, i) => (
            <StaggerItem key={f.id}>
              <button
                type="button"
                onClick={() => open(f.id)}
                className="group grid w-full grid-cols-[2rem_1fr_auto] items-baseline gap-3 border-b border-white/8 py-4 text-left transition hover:bg-white/[0.03] md:grid-cols-[2.5rem_1fr_4.5rem_4rem_3.5rem] md:gap-4"
              >
                <span className="font-data text-[11px] text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-base font-semibold tracking-tight transition group-hover:text-accent md:text-lg">
                  {f.framework}
                </span>
                <span className="font-data text-lg tabular-nums text-accent md:text-right">
                  {f.AFFIX.toFixed(1)}
                </span>
                <span
                  className={cn(
                    "hidden font-data text-sm tabular-nums md:block md:text-right",
                    rhsTone(f.RHS)
                  )}
                >
                  {f.RHS.toFixed(1)}
                </span>
                <span className="hidden font-data text-sm tabular-nums text-muted-foreground md:block md:text-right">
                  {f.LIE}
                </span>
              </button>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
