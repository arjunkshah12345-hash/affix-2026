"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { findings } from "@/data/content"
import { cn } from "@/lib/utils"
import { Reveal, SectionLabel, Stagger, StaggerItem } from "./reveal"

export function Findings() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="findings" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-[1120px] px-5 md:px-8">
        <Reveal>
          <SectionLabel>Findings</SectionLabel>
          <h2 className="mt-3 max-w-[22ch] font-display text-3xl font-semibold tracking-tight md:text-4xl">
            Falsifiable conclusions
          </h2>
          <p className="mt-4 max-w-[52ch] text-[15px] leading-relaxed text-muted-foreground md:text-base">
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
                    "relative border-b border-foreground/10 py-7 transition",
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
                      <span className="font-data text-[11px] font-medium text-accent">
                        {n}
                      </span>
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
                        <dl className="mt-6 space-y-4 border-t border-foreground/10 pt-5">
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
