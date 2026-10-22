"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { DitherAvatar, DitherGradient } from "@/components/dither-kit"
import { findings } from "@/data/content"
import { cn } from "@/lib/utils"
import { Reveal, SectionLabel, Stagger, StaggerItem } from "./reveal"

export function Findings() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="findings" className="relative overflow-hidden py-28 md:py-36">
      <DitherGradient
        from="orange"
        to="transparent"
        direction="left"
        cell={3}
        opacity={0.1}
        bloom="low"
        className="pointer-events-none absolute inset-y-0 right-0 w-2/5"
      />
      <div className="relative mx-auto max-w-[1120px] px-5 md:px-8">
        <Reveal>
          <SectionLabel>Findings</SectionLabel>
          <h2 className="mt-4 max-w-[18ch] font-display text-4xl font-semibold tracking-tight md:text-5xl">
            Claims that can die
          </h2>
          <p className="mt-5 max-w-[52ch] text-muted-foreground">
            {findings.length} claims from the AFFIX-2026 synthesis. Expand each
            for supporting evidence and the condition under which the claim is
            withdrawn.
          </p>
        </Reveal>

        <Stagger className="mt-16 grid gap-x-12 gap-y-0 md:grid-cols-2">
          {findings.map((f) => {
            const n = `R${f.n}`
            const isOpen = open === f.n
            return (
              <StaggerItem key={f.n}>
                <article
                  className={cn(
                    "relative border-b border-white/8 py-7 transition",
                    isOpen ? "pb-9" : ""
                  )}
                >
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : f.n)}
                    className="group w-full text-left"
                    aria-expanded={isOpen}
                  >
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <DitherAvatar
                          name={n}
                          hue={28}
                          bloom="low"
                          className="size-8 shrink-0 rounded-sm"
                        />
                        <span className="font-data text-[11px] font-medium text-accent">
                          {n}
                        </span>
                      </div>
                      <span className="font-data text-[10px] uppercase tracking-[0.14em] text-muted-foreground transition group-hover:text-accent">
                        {isOpen ? "Collapse" : "Evidence"}
                      </span>
                    </div>
                    <h3 className="font-display text-xl font-semibold tracking-tight md:text-2xl">
                      {f.title}
                    </h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                      {f.body}
                    </p>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <dl className="mt-6 space-y-4 border-t border-white/8 pt-5">
                          <div>
                            <dt className="font-data text-[10px] uppercase tracking-[0.14em] text-accent">
                              Evidence
                            </dt>
                            <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">
                              {f.evidence}
                            </dd>
                          </div>
                          <div>
                            <dt className="font-data text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                              Falsifier
                            </dt>
                            <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">
                              {f.falsifier}
                            </dd>
                          </div>
                        </dl>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </article>
              </StaggerItem>
            )
          })}
        </Stagger>
      </div>
    </section>
  )
}
