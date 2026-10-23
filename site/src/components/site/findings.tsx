"use client"

import { findings } from "@/data/content"
import { Accordion } from "@/components/ui/accordion"
import { BlurReveal } from "@/components/ui/blur-reveal"

export function Findings() {
  const items = findings.map((f) => ({
    id: `r${f.n}`,
    title: `R${f.n} · ${f.title}`,
    content: (
      <div className="space-y-4">
        <p>{f.body}</p>
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-ink-soft">
            Evidence
          </p>
          <p className="mt-1.5">{f.evidence}</p>
        </div>
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-ink-soft">
            Falsifier
          </p>
          <p className="mt-1.5">{f.falsifier}</p>
        </div>
      </div>
    ),
  }))

  return (
    <section id="findings" className="border-t border-line px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-5xl">
        <BlurReveal>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted">
                Findings
              </p>
              <h2 className="mt-3 max-w-[18ch] font-display text-3xl tracking-[-0.02em] text-ink md:text-4xl">
                Killable claims from the synthesis
              </h2>
            </div>
            <p className="max-w-[30ch] text-[14px] leading-relaxed text-muted md:text-right">
              {findings.length} claims. Expand for evidence and falsifier.
            </p>
          </div>
        </BlurReveal>

        <BlurReveal delay={80} className="mt-10">
          <Accordion items={items} type="single" defaultOpen={[]} />
        </BlurReveal>
      </div>
    </section>
  )
}
