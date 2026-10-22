"use client"

import { DitherButton, DitherGradient } from "@/components/dither-kit"
import { asOf, leader, safest } from "@/data/content"
import { motion, useReducedMotion } from "motion/react"

/**
 * Specimen stage — the leading AFFIX score sits on a full-height dither field.
 * Intentionally not the prior “bottom glow + Rank frameworks by what lasts” hero.
 */
export function Hero() {
  const reduce = useReducedMotion()

  return (
    <section id="top" className="relative min-h-[100svh] lg:min-h-dvh">
      <div className="grid min-h-[100svh] lg:min-h-dvh lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
        {/* Copy column */}
        <div className="relative z-10 flex flex-col justify-between px-5 py-10 md:px-10 md:py-14 lg:py-16">
          <motion.p
            className="font-data text-[11px] uppercase tracking-[0.2em] text-muted-foreground"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            Agent Framework Fitness Index · {asOf}
          </motion.p>

          <div className="my-16 max-w-[22ch] lg:my-0">
            <motion.h1
              className="font-display text-[clamp(3rem,6vw,4.5rem)] font-semibold leading-[0.98] tracking-[-0.035em]"
              initial={reduce ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            >
              The index for stacks you can still own in twelve months.
            </motion.h1>
            <motion.p
              className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg"
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              Sixteen production frameworks. Ten dimensions. Rewrite hazard
              scored beside fitness—not after the fact.
            </motion.p>
            <motion.div
              className="mt-9 flex flex-wrap gap-3"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25, duration: 0.6 }}
            >
              <DitherButton
                type="button"
                color="orange"
                variant="gradient"
                bloom="high"
                className="h-11 rounded-md px-5 font-data text-[11px] uppercase tracking-[0.14em] text-white"
                onClick={() =>
                  document.querySelector("#rankings")?.scrollIntoView({
                    behavior: "smooth",
                  })
                }
              >
                Enter the matrix
              </DitherButton>
              <a
                href="#results"
                className="inline-flex h-11 items-center px-2 font-data text-[11px] uppercase tracking-[0.14em] text-muted-foreground transition hover:text-accent"
              >
                Read results
              </a>
            </motion.div>
          </div>

          <dl className="grid grid-cols-3 gap-4 border-t border-white/10 pt-6 font-data text-[11px]">
            <div>
              <dt className="uppercase tracking-[0.14em] text-muted-foreground">
                Leader
              </dt>
              <dd className="mt-1 text-foreground">{leader.framework}</dd>
            </div>
            <div>
              <dt className="uppercase tracking-[0.14em] text-muted-foreground">
                AFFIX
              </dt>
              <dd className="mt-1 text-accent">{leader.AFFIX.toFixed(1)}</dd>
            </div>
            <div>
              <dt className="uppercase tracking-[0.14em] text-muted-foreground">
                Best RHS
              </dt>
              <dd className="mt-1 text-foreground">{safest.RHS.toFixed(1)}</dd>
            </div>
          </dl>
        </div>

        {/* Dither specimen panel — the visual product */}
        <div className="relative min-h-[52vh] overflow-hidden border-t border-white/8 lg:min-h-0 lg:border-l lg:border-t-0">
          <DitherGradient
            from="orange"
            to="transparent"
            direction="up"
            cell={2}
            opacity={1}
            bloom="high"
            className="absolute inset-0"
          />
          <DitherGradient
            from={18}
            to="transparent"
            direction="left"
            cell={3}
            opacity={0.45}
            bloom="low"
            className="absolute inset-0"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/80 via-transparent to-[#050505]/35" />

          <motion.div
            className="relative flex h-full min-h-[52vh] flex-col items-start justify-end p-6 md:p-10 lg:min-h-full lg:p-12"
            initial={reduce ? false : { opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-data text-[11px] uppercase tracking-[0.22em] text-white/70">
              Specimen · rank 01
            </p>
            <p className="mt-3 font-display text-[clamp(5rem,14vw,9rem)] font-semibold leading-none tracking-[-0.05em] text-white">
              {leader.AFFIX.toFixed(1)}
            </p>
            <p className="mt-4 font-display text-2xl font-semibold tracking-tight text-white md:text-3xl">
              {leader.framework}
            </p>
            <p className="mt-2 font-data text-[12px] uppercase tracking-[0.16em] text-white/65">
              RHS {leader.RHS.toFixed(1)} · LIE {leader.LIE} · PR {leader.PR}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
