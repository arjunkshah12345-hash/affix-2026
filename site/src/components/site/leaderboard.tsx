"use client"

import { frameworks } from "@/data/content"
import { cn } from "@/lib/utils"
import { useFrameworkDetail } from "./framework-detail"
import { Reveal, SectionLabel, Stagger, StaggerItem } from "./reveal"

function rhsTone(rhs: number) {
  if (rhs <= 22) return "text-emerald-800"
  if (rhs <= 30) return "text-amber-800"
  return "text-accent"
}

export function Leaderboard() {
  const { open } = useFrameworkDetail()

  return (
    <section id="rankings" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-[1120px] px-5 md:px-8">
        <Reveal>
          <SectionLabel>Rankings</SectionLabel>
          <h2 className="mt-3 max-w-[22ch] font-display text-3xl font-semibold tracking-tight md:text-4xl">
            Composite ranking and rewrite hazard
          </h2>
          <p className="mt-4 max-w-[50ch] text-muted-foreground">
            Ordered by AFFIX. RHS estimates the probability that primary
            orchestration is replaced within twelve months. Select a row for the
            dossier.
          </p>
        </Reveal>

        <div className="mt-10 hidden grid-cols-[3rem_1fr_5rem_5rem_5rem] gap-4 border-b border-foreground/12 pb-3 font-data text-[10px] uppercase tracking-[0.14em] text-muted-foreground md:grid">
          <span>#</span>
          <span>Framework</span>
          <span className="text-right">AFFIX</span>
          <span className="text-right">RHS ↓</span>
          <span className="text-right">LIE ↓</span>
        </div>

        <Stagger className="space-y-0">
          {frameworks.map((f, i) => (
            <StaggerItem key={f.id}>
              <button
                type="button"
                onClick={() => open(f.id)}
                className="group grid w-full grid-cols-[3rem_1fr] items-center gap-3 border-b border-foreground/10 py-4 text-left transition hover:bg-foreground/[0.03] md:grid-cols-[3rem_1fr_5rem_5rem_5rem] md:gap-4 md:py-5"
              >
                <span className="font-data text-[12px] text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <p className="font-display text-lg font-semibold tracking-tight transition group-hover:text-accent md:text-xl">
                    {f.framework}
                  </p>
                  <p className="mt-0.5 truncate font-data text-[11px] text-muted-foreground">
                    {f.primary_lang} · {f.category}
                  </p>
                </div>
                <p className="font-data text-xl tabular-nums text-accent md:text-right md:text-lg">
                  <span className="mr-2 font-data text-[10px] uppercase text-muted-foreground md:hidden">
                    AFFIX
                  </span>
                  {f.AFFIX.toFixed(1)}
                </p>
                <p
                  className={cn(
                    "font-data text-sm tabular-nums md:text-right",
                    rhsTone(f.RHS)
                  )}
                >
                  <span className="mr-2 font-data text-[10px] uppercase text-muted-foreground md:hidden">
                    RHS
                  </span>
                  {f.RHS.toFixed(1)}
                </p>
                <p className="hidden font-data text-sm tabular-nums text-foreground md:block md:text-right">
                  {f.LIE}
                </p>
              </button>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
