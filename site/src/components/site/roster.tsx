"use client"

import { DitherAvatar } from "@/components/dither-kit"
import { frameworks } from "@/data/content"
import { useFrameworkDetail } from "./framework-detail"
import { Reveal } from "./reveal"

/** Horizontal specimen strip — all sixteen frameworks as dither marks. */
export function Roster() {
  const { open } = useFrameworkDetail()

  return (
    <section
      id="roster"
      className="border-y border-white/8 bg-black/40 py-8 md:py-10"
      aria-label="Framework roster"
    >
      <Reveal className="mx-auto max-w-none px-5 md:px-10">
        <p className="mb-5 font-data text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          Roster · {frameworks.length} frameworks · select for dossier
        </p>
        <div className="flex gap-3 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {frameworks.map((f, i) => (
            <button
              key={f.id}
              type="button"
              onClick={() => open(f.id)}
              className="group flex w-[4.75rem] shrink-0 flex-col items-center gap-2 rounded-sm border border-transparent py-2 transition hover:border-white/10 hover:bg-white/[0.03]"
            >
              <DitherAvatar
                name={f.framework}
                hue={18 + i * 8}
                bloom="low"
                className="size-11 rounded-sm"
              />
              <span className="font-data text-[9px] uppercase tracking-[0.12em] text-muted-foreground group-hover:text-accent">
                {f.id}
              </span>
              <span className="font-data text-[11px] tabular-nums text-foreground">
                {f.AFFIX.toFixed(0)}
              </span>
            </button>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
