"use client"

import { bestControl, bestRacs, leader, safest } from "@/data/content"
import { Reveal, Stagger, StaggerItem } from "./reveal"

const items = [
  { k: "Highest AFFIX", v: leader.framework, s: leader.AFFIX.toFixed(1) },
  { k: "Lowest rewrite risk", v: safest.framework, s: safest.RHS.toFixed(1) },
  { k: "Strongest control plane", v: bestControl.framework, s: `CS ${bestControl.CS}` },
  { k: "Best RAG continuum", v: bestRacs.framework, s: `RACS ${bestRacs.RACS}` },
]

export function Kpis() {
  return (
    <section className="border-y border-white/8 py-20 md:py-24">
      <div className="mx-auto max-w-[1120px] px-6 md:px-8">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            Highlights
          </p>
        </Reveal>
        <Stagger className="mt-10 grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <StaggerItem key={item.k}>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                {item.k}
              </p>
              <p className="mt-3 font-display text-2xl font-semibold tracking-tight text-foreground">
                {item.v}
              </p>
              <p className="mt-1 font-mono text-sm text-accent">{item.s}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
