"use client"

import { DitherButton, DitherGradient, Sparkline } from "@/components/dither-kit"
import { asOf, frameworks, leader } from "@/data/content"
import { motion, useReducedMotion } from "motion/react"

const spark = frameworks.slice(0, 10).map((f) => f.AFFIX)

export function Hero() {
  const reduce = useReducedMotion()

  return (
    <section id="top" className="relative min-h-[100svh] overflow-hidden pt-16">
      {/* Full-bleed dither field — the product craft signal */}
      <div className="pointer-events-none absolute inset-0">
        <DitherGradient
          from="orange"
          to="transparent"
          direction="up"
          cell={2}
          opacity={0.9}
          bloom="high"
          className="absolute inset-x-0 bottom-[-10%] h-[80%]"
        />
        <DitherGradient
          from={28}
          to="transparent"
          direction="right"
          cell={3}
          opacity={0.28}
          bloom="low"
          className="absolute inset-y-0 left-0 w-[48%]"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_55%_at_50%_110%,transparent_8%,#050505_70%)]" />
      </div>

      <div className="relative mx-auto flex min-h-[calc(100svh-4rem)] max-w-[1120px] flex-col justify-end px-5 pb-20 pt-24 md:px-8 md:pb-28">
        <motion.p
          className="mb-5 font-data text-[11px] uppercase tracking-[0.22em] text-accent"
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          AFFIX · Agent Framework Fitness Index · {asOf}
        </motion.p>

        <motion.h1
          className="max-w-[14ch] font-display text-[clamp(3.5rem,9vw,6.5rem)] font-semibold leading-[0.92] tracking-[-0.04em] text-foreground"
          initial={reduce ? false : { opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.95, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
        >
          Rank frameworks
          <br />
          by what lasts
          <span className="text-accent">.</span>
        </motion.h1>

        <motion.p
          className="mt-7 max-w-[38ch] text-lg leading-relaxed text-muted-foreground md:text-xl"
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
        >
          Sixteen production stacks scored for fitness today and rewrite hazard
          within a year. {leader.framework} leads at {leader.AFFIX.toFixed(1)}.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap items-center gap-4"
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <DitherButton
            type="button"
            color="orange"
            variant="gradient"
            bloom="high"
            className="h-12 rounded-md px-6 font-data text-xs uppercase tracking-[0.16em] text-white"
            onClick={() =>
              document.querySelector("#rankings")?.scrollIntoView({ behavior: "smooth" })
            }
          >
            View rankings
          </DitherButton>
          <a
            href="#results"
            className="font-data text-[11px] uppercase tracking-[0.16em] text-muted-foreground underline-offset-4 transition hover:text-foreground hover:underline"
          >
            Principal results
          </a>
        </motion.div>

        <motion.div
          className="mt-14 h-14 w-full max-w-md opacity-80"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ duration: 1, delay: 0.45 }}
        >
          <Sparkline
            data={spark}
            color="orange"
            variant="gradient"
            bloom="low"
            className="h-full w-full"
          />
        </motion.div>
      </div>
    </section>
  )
}
