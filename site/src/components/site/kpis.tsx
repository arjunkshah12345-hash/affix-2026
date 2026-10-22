"use client"

import { DitherGradient } from "@/components/dither-kit"
import { asOf, frameworks, leader, safest } from "@/data/content"
import { Reveal } from "./reveal"

const items = [
  { k: "Frameworks", v: String(frameworks.length) },
  { k: "Leading AFFIX", v: leader.AFFIX.toFixed(1), s: leader.framework },
  { k: "Lowest RHS", v: safest.RHS.toFixed(1), s: safest.framework },
  { k: "As of", v: asOf },
]

export function Kpis() {
  return (
    <section className="relative overflow-hidden border-y border-white/8 py-14 md:py-16">
      <DitherGradient
        from="orange"
        to="transparent"
        direction="right"
        cell={3}
        opacity={0.12}
        bloom="low"
        className="pointer-events-none absolute inset-0"
      />
      <div className="relative mx-auto max-w-[1120px] px-5 md:px-8">
        <Reveal>
          <dl className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-10">
            {items.map((item) => (
              <div key={item.k}>
                <dt className="font-data text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                  {item.k}
                </dt>
                <dd className="mt-2 font-display text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                  {item.v}
                </dd>
                {"s" in item && item.s ? (
                  <p className="mt-1 text-sm text-muted-foreground">{item.s}</p>
                ) : null}
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  )
}
