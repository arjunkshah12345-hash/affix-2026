"use client"

import { frameworks } from "@/data/content"
import { cn } from "@/lib/utils"
import { useFrameworkDetail } from "./framework-detail"
import { Reveal, Stagger, StaggerItem } from "./reveal"

function rhsTone(rhs: number) {
  if (rhs <= 22) return "text-emerald-400"
  if (rhs <= 30) return "text-amber-300"
  return "text-rose-400"
}

export function Leaderboard() {
  const { open } = useFrameworkDetail()

  return (
    <section id="rankings" className="relative py-32 md:py-40">
      <div className="mx-auto max-w-[1120px] px-6 md:px-8">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
            02 — Rankings
          </p>
          <h2 className="mt-4 max-w-[22ch] font-display text-4xl font-semibold tracking-tight md:text-5xl">
            Composite ranking and rewrite hazard
          </h2>
          <p className="mt-5 max-w-[52ch] text-muted-foreground">
            Frameworks ordered by AFFIX, a weighted composite of ten production
            dimensions. RHS estimates the probability that primary orchestration
            is replaced within twelve months of production. Select a row for the
            dossier.
          </p>
        </Reveal>

        <Stagger className="mt-16 space-y-0 border-t border-white/8">
          {frameworks.map((f, i) => (
            <StaggerItem key={f.id}>
              <button
                type="button"
                onClick={() => open(f.id)}
                className={cn(
                  "group grid w-full grid-cols-[auto_1fr_auto] items-baseline gap-x-4 gap-y-2 border-b border-white/8 py-6 text-left transition md:grid-cols-[3rem_1fr_6rem_5rem_5rem] md:gap-x-6",
                  "hover:bg-white/[0.02]"
                )}
              >
                <span className="font-mono text-sm text-muted-foreground tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className="font-display text-xl font-semibold tracking-tight text-foreground transition group-hover:text-accent md:text-2xl">
                      {f.framework}
                    </h3>
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                      {f.id}
                    </span>
                  </div>
                  <p className="mt-1 truncate font-mono text-[11px] text-muted-foreground/80">
                    {f.primary_lang} · {f.category}
                  </p>
                </div>
                <div className="text-right md:text-left">
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground md:hidden">
                    AFFIX
                  </p>
                  <p className="font-mono text-lg tabular-nums text-accent md:text-xl">
                    {f.AFFIX.toFixed(1)}
                  </p>
                </div>
                <div className="col-span-3 flex gap-6 md:col-span-1 md:block md:gap-0">
                  <div>
                    <p className="hidden font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground md:block">
                      RHS ↓
                    </p>
                    <p
                      className={cn(
                        "font-mono text-sm tabular-nums md:text-base",
                        rhsTone(f.RHS)
                      )}
                    >
                      <span className="md:hidden text-muted-foreground">RHS </span>
                      {f.RHS.toFixed(1)}
                    </p>
                  </div>
                </div>
                <div className="hidden md:block">
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                    LIE ↓
                  </p>
                  <p className="font-mono text-base tabular-nums text-foreground/80">
                    {f.LIE}
                  </p>
                </div>
              </button>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.1} className="mt-10">
          <p className="font-mono text-[11px] text-muted-foreground">
            Scores are expert estimates calibrated to primary documentation and
            APIs as of the pin date—not vendor marketing. See{" "}
            <a href="#method" className="text-foreground underline-offset-4 hover:underline">
              methodology
            </a>
            .
          </p>
        </Reveal>
      </div>
    </section>
  )
}
