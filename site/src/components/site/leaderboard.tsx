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
    <section id="rankings" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-[1120px] px-5 md:px-8">
        <Reveal>
          <SectionLabel>Rankings</SectionLabel>
          <h2 className="mt-4 max-w-[20ch] font-display text-4xl font-semibold tracking-tight md:text-5xl">
            Fitness today. Rewrite risk next.
          </h2>
          <p className="mt-5 max-w-[48ch] text-muted-foreground">
            AFFIX is the weighted composite. RHS estimates replacement of primary
            orchestration within twelve months. Click a row for the dossier.
          </p>
        </Reveal>

        <Stagger className="mt-14 border-t border-white/8">
          {frameworks.map((f, i) => (
            <StaggerItem key={f.id}>
              <button
                type="button"
                onClick={() => open(f.id)}
                className="group grid w-full grid-cols-[2.5rem_1fr_auto] items-center gap-3 border-b border-white/8 py-5 text-left transition hover:bg-white/[0.02] md:grid-cols-[3rem_1fr_5.5rem_5rem_4.5rem] md:gap-4 md:py-6"
              >
                <span className="font-data text-[12px] text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <p className="font-display text-lg font-semibold tracking-tight transition group-hover:text-accent md:text-xl">
                    {f.framework}
                  </p>
                  <p className="mt-0.5 truncate font-data text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                    {f.primary_lang} · {f.id}
                  </p>
                </div>
                <p className="font-data text-xl tabular-nums text-accent md:text-right">
                  {f.AFFIX.toFixed(1)}
                </p>
                <p
                  className={cn(
                    "hidden font-data text-sm tabular-nums md:block md:text-right",
                    rhsTone(f.RHS)
                  )}
                >
                  {f.RHS.toFixed(1)}
                </p>
                <p className="hidden font-data text-sm tabular-nums text-muted-foreground md:block md:text-right">
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
