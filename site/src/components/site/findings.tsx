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
    <section id="findings" className="relative overflow-hidden py-24 md:py-32">
      <DitherGradient
        from="orange"
        to="transparent"
        direction="left"
        cell={3}
        opacity={0.08}
        bloom="low"
        className="pointer-events-none absolute inset-y-0 right-0 w-2/5"
      />
      <div className="relative mx-auto max-w-[960px] px-5 md:px-10">
        <Reveal>
          <SectionLabel>Findings</SectionLabel>
          <h2 className="mt-3 max-w-[18ch] font-display text-3xl font-semibold tracking-tight md:text-4xl">
            Killable claims from the synthesis
          </h2>
          <p className="mt-4 max-w-[48ch] text-sm text-muted-foreground md:text-base">
            {findings.length} claims. Expand for evidence and the falsifier that
            retires the claim.
          </p>
        </Reveal>

        <Stagger className="mt-14 grid gap-x-10 gap-y-0 md:grid-cols-2">
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
                          hue={24}
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
