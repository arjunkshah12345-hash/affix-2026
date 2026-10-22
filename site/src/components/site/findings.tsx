"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { DitherAvatar } from "@/components/dither-kit"
import { findings } from "@/data/content"
import { cn } from "@/lib/utils"
import { Reveal, Stagger, StaggerItem } from "./reveal"

export function Findings() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="findings" className="relative py-32 md:py-40">
      <div className="mx-auto max-w-[1120px] px-6 md:px-8">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
            08 — Findings
          </p>
          <h2 className="mt-4 max-w-[22ch] font-display text-4xl font-semibold tracking-tight md:text-5xl">
            Falsifiable conclusions
          </h2>
          <p className="mt-5 max-w-[52ch] text-muted-foreground">
            {findings.length} claims from the AFFIX-2026 synthesis. Expand each
            for supporting evidence and the condition under which the claim is
            withdrawn.
          </p>
        </Reveal>

        <Stagger className="mt-20 grid gap-x-12 gap-y-4 md:grid-cols-2">
          {findings.map((f) => {
            const n = String(f.n).padStart(2, "0")
            const isOpen = open === f.n
            return (
              <StaggerItem key={f.n}>
                <article
                  className={cn(
                    "relative border-b border-white/8 py-6 transition",
                    isOpen ? "pb-8" : ""
                  )}
                >
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : f.n)}
                    className="group w-full text-left"
                    aria-expanded={isOpen}
                  >
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <DitherAvatar
                          name={f.title}
                          hue={22}
                          className="size-8 rounded-sm"
                        />
                        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
                          {n}
                        </span>
                      </div>
                      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground transition group-hover:text-accent">
                        {isOpen ? "Collapse" : "Evidence"}
                      </span>
                    </div>
                    <h3 className="font-display text-2xl font-semibold tracking-tight">
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
                            <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                              Evidence
                            </dt>
                            <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">
                              {f.evidence}
                            </dd>
                          </div>
                          <div>
                            <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
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
