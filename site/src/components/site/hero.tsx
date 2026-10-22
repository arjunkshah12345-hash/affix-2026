"use client"

import { DitherButton, DitherGradient } from "@/components/dither-kit"
import { asOf, leader, safest } from "@/data/content"
import { motion, useReducedMotion } from "motion/react"

/**
 * Specimen stage — leading score on a full-height dither field.
 * Not the prior bottom-glow / “by what lasts” composition.
 */
export function Hero() {
  const reduce = useReducedMotion()

  return (
    <section id="top" className="relative min-h-[100svh] lg:min-h-dvh">
      <div className="grid min-h-[100svh] lg:min-h-dvh lg:grid-cols-[1fr_1.15fr]">
        {/* Copy */}
        <div className="relative z-10 flex flex-col justify-between gap-10 px-5 py-8 md:px-8 md:py-12 lg:py-14">
          <motion.p
            className="font-data text-[11px] uppercase tracking-[0.2em] text-muted-foreground"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.55 }}
          >
            Fitness index · {asOf}
          </motion.p>

          <div>
            <motion.p
              className="font-display text-5xl font-semibold tracking-tight text-foreground md:text-6xl"
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              AFFIX
            </motion.p>
            <motion.h1
              className="mt-5 max-w-[18ch] font-display text-[clamp(1.75rem,3.4vw,2.35rem)] font-semibold leading-[1.15] tracking-[-0.02em] text-foreground"
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
            >
              Stacks you can still own in twelve months.
            </motion.h1>
            <motion.p
              className="mt-5 max-w-[34ch] text-[15px] leading-relaxed text-muted-foreground"
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.14 }}
            >
              Sixteen frameworks. Fitness and rewrite hazard in one index.
            </motion.p>
            <motion.div
              className="mt-8 flex flex-wrap items-center gap-3"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.22, duration: 0.55 }}
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
                className="font-data text-[11px] uppercase tracking-[0.14em] text-muted-foreground transition hover:text-accent"
              >
                Results
              </a>
            </motion.div>
          </div>

          <dl className="grid grid-cols-3 gap-3 border-t border-white/10 pt-5 font-data text-[10px]">
            <div>
              <dt className="uppercase tracking-[0.14em] text-muted-foreground">
                Leader
              </dt>
              <dd className="mt-1 text-[12px] text-foreground">{leader.framework}</dd>
            </div>
            <div>
              <dt className="uppercase tracking-[0.14em] text-muted-foreground">
                AFFIX
              </dt>
              <dd className="mt-1 text-[12px] text-accent">{leader.AFFIX.toFixed(1)}</dd>
            </div>
            <div>
              <dt className="uppercase tracking-[0.14em] text-muted-foreground">
                Best RHS
              </dt>
              <dd className="mt-1 text-[12px] text-foreground">{safest.RHS.toFixed(1)}</dd>
            </div>
          </dl>
        </div>

        {/* Dither specimen — score locked in first viewport */}
        <div className="relative min-h-[42vh] overflow-hidden border-t border-white/8 lg:min-h-0 lg:border-l lg:border-t-0">
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
            from={22}
            to="transparent"
            direction="left"
            cell={3}
            opacity={0.4}
            bloom="low"
            className="absolute inset-0"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/50 via-transparent to-[#050505]/55" />

          <motion.div
            className="relative flex h-full min-h-[42vh] flex-col justify-end p-6 md:p-8 lg:absolute lg:inset-0 lg:min-h-0 lg:justify-center lg:p-10"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-data text-[10px] uppercase tracking-[0.22em] text-white/75">
              Specimen · 01
            </p>
            <p className="mt-2 font-display text-[clamp(4.5rem,12vw,7.5rem)] font-semibold leading-none tracking-[-0.05em] text-white">
              {leader.AFFIX.toFixed(1)}
            </p>
            <p className="mt-3 font-display text-xl font-semibold text-white md:text-2xl">
              {leader.framework}
            </p>
            <p className="mt-1.5 font-data text-[11px] uppercase tracking-[0.14em] text-white/70">
              RHS {leader.RHS.toFixed(1)} · LIE {leader.LIE} · PR {leader.PR}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
