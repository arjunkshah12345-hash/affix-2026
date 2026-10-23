"use client"

import { dimensions, formulas, methodology } from "@/data/content"
import { BlurReveal } from "@/components/ui/blur-reveal"
import { List, ListItem } from "@/components/ui/list"
import { Separator } from "@/components/ui/separator"

export function Methodology() {
  const formulaEntries = Object.entries(formulas).slice(0, 4)

  return (
    <section
      id="method"
      className="border-t border-line px-5 py-20 md:px-8 md:py-28"
    >
      <div className="mx-auto max-w-3xl">
        <BlurReveal>
          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted">
            Method
          </p>
          <h2 className="mt-3 max-w-[16ch] font-display text-3xl tracking-[-0.02em] text-ink md:text-4xl">
            Weights and worked math
          </h2>
          <p className="mt-4 max-w-[46ch] text-[15px] leading-relaxed text-muted">
            {methodology.overview}
          </p>
        </BlurReveal>

        <BlurReveal delay={60} className="mt-10">
          <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.14em] text-muted">
            Dimension weights
          </p>
          <List>
            {dimensions.map((d) => (
              <ListItem
                key={d.code}
                title={`${d.code} · ${(d.weight * 100).toFixed(0)}%`}
                description={d.name}
              />
            ))}
          </List>
        </BlurReveal>

        <Separator className="my-12" />

        <BlurReveal delay={100}>
          <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.14em] text-muted">
            Composites
          </p>
          <div className="space-y-4">
            {formulaEntries.map(([name, expression]) => (
              <div key={name}>
                <p className="font-medium text-ink">{name}</p>
                <p className="mt-1 font-mono text-[13px] leading-relaxed text-muted">
                  {expression}
                </p>
              </div>
            ))}
          </div>
        </BlurReveal>
      </div>
    </section>
  )
}
