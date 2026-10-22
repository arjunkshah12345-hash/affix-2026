"use client"

import { frameworks } from "@/data/content"
import { cn } from "@/lib/utils"
import { useFrameworkDetail } from "./framework-detail"
import { Reveal, SectionLabel, Stagger, StaggerItem } from "./reveal"

const maxAffix = Math.max(...frameworks.map((f) => f.AFFIX))

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
            Meter length is AFFIX relative to the leader. RHS ↓ is succession
            risk. Open any row for the dossier.
          </p>
          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 font-data text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
            <span>
              RHS · <span className="text-emerald-400">≤22</span> safe
            </span>
            <span>
              <span className="text-amber-300">≤30</span> watch
            </span>
            <span>
              <span className="text-rose-400">&gt;30</span> elevated
            </span>
          </div>
        </Reveal>

        <div className="mt-10 hidden grid-cols-[2.5rem_1fr_5.5rem_4rem_3.5rem] gap-4 border-b border-white/10 pb-3 font-data text-[10px] uppercase tracking-[0.14em] text-muted-foreground md:grid">
          <span>#</span>
          <span>Framework</span>
          <span className="text-right">AFFIX</span>
          <span className="text-right">RHS ↓</span>
          <span className="text-right">LIE</span>
        </div>

        <Stagger className="mt-0">
          {frameworks.map((f, i) => {
            const pct = (f.AFFIX / maxAffix) * 100
            return (
              <StaggerItem key={f.id}>
                <button
                  type="button"
                  onClick={() => open(f.id)}
                  className="group grid w-full grid-cols-[2rem_1fr_auto] items-center gap-3 border-b border-white/8 py-4 text-left transition hover:bg-white/[0.03] md:grid-cols-[2.5rem_1fr_5.5rem_4rem_3.5rem] md:gap-4 md:py-4"
                >
                  <span className="font-data text-[11px] text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="font-display text-base font-semibold tracking-tight transition group-hover:text-accent md:text-lg">
                        {f.framework}
                      </span>
                    </div>
                    <div className="mt-2 h-1 max-w-md overflow-hidden rounded-[1px] bg-white/10">
                      <div
                        className="h-full bg-accent/85 transition group-hover:bg-accent"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
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
            )
          })}
        </Stagger>
      </div>
    </section>
  )
}
