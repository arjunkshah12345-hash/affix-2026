"use client"

import { DitherAvatar } from "@/components/dither-kit"
import { frameworks } from "@/data/content"
import { cn } from "@/lib/utils"
import { useFrameworkDetail } from "./framework-detail"
import { Reveal } from "./reveal"

const maxAffix = Math.max(...frameworks.map((f) => f.AFFIX))

export function Roster() {
  const { open } = useFrameworkDetail()

  return (
    <section
      id="roster"
      className="border-y border-white/8 bg-black/50 py-9 md:py-11"
      aria-label="Framework roster"
    >
      <Reveal className="px-5 md:px-8">
        <div className="mb-5 flex items-end justify-between gap-4">
          <p className="font-data text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Roster · {frameworks.length} · click for dossier
          </p>
          <p className="hidden font-data text-[10px] uppercase tracking-[0.14em] text-muted-foreground sm:block">
            Bar = AFFIX / {maxAffix.toFixed(0)}
          </p>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:gap-3">
          {frameworks.map((f, i) => {
            const pct = (f.AFFIX / maxAffix) * 100
            return (
              <button
                key={f.id}
                type="button"
                title={`${f.framework} · AFFIX ${f.AFFIX.toFixed(1)} · RHS ${f.RHS.toFixed(1)}`}
                onClick={() => open(f.id)}
                className="group flex w-[5.25rem] shrink-0 flex-col items-stretch gap-2 rounded-sm border border-white/0 bg-transparent px-1.5 py-2 transition hover:border-white/10 hover:bg-white/[0.04]"
              >
                <div className="flex flex-col items-center gap-1.5">
                  <DitherAvatar
                    name={f.framework}
                    hue={16 + i * 7}
                    bloom="low"
                    className="size-10 rounded-sm md:size-11"
                  />
                  <span className="font-data text-[9px] uppercase tracking-[0.12em] text-muted-foreground group-hover:text-accent">
                    {f.id}
                  </span>
                  <span className="font-data text-[12px] tabular-nums text-foreground">
                    {f.AFFIX.toFixed(1)}
                  </span>
                </div>
                <div className="h-1 w-full overflow-hidden rounded-[1px] bg-white/10">
                  <div
                    className={cn("h-full bg-accent/90 transition-all")}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </button>
            )
          })}
        </div>
      </Reveal>
    </section>
  )
}
