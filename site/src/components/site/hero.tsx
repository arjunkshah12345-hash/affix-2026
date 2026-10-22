"use client"

import { DitherButton, DitherGradient } from "@/components/dither-kit"
import { asOf, leader } from "@/data/content"
import { motion, useReducedMotion } from "motion/react"

export function Hero() {
  const reduce = useReducedMotion()

  return (
    <section
      id="top"
      className="relative min-h-[100svh] overflow-hidden pt-16"
    >
      {/* Dominant dither wash — full-bleed hero plane */}
      <div className="pointer-events-none absolute inset-0">
        <DitherGradient
          from="orange"
          to="transparent"
          direction="up"
          cell={2}
          opacity={0.85}
          bloom="high"
          className="absolute inset-x-0 bottom-[-8%] h-[85%]"
        />
        <DitherGradient
          from={18}
          to="transparent"
          direction="right"
          cell={3}
          opacity={0.35}
          className="absolute inset-y-0 left-0 w-[55%]"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_50%_115%,transparent_10%,#050505_72%)]" />
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage: "linear-gradient(to bottom, black, transparent 75%)",
          }}
        />
      </div>

      <div className="relative mx-auto flex min-h-[calc(100svh-4rem)] max-w-[1120px] flex-col justify-end px-6 pb-20 pt-24 md:px-8 md:pb-28">
        <motion.p
          className="mb-6 font-mono text-[11px] uppercase tracking-[0.22em] text-accent"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          AFFIX · Agent Framework Fitness Index · {asOf}
        </motion.p>

        <motion.h1
          className="max-w-[15ch] font-display text-[clamp(3.4rem,9vw,6.75rem)] font-semibold leading-[0.92] tracking-[-0.04em] text-foreground"
          initial={reduce ? false : { opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          Rank frameworks
          <br />
          by what lasts
          <span className="text-accent">.</span>
        </motion.h1>

        <motion.p
          className="mt-8 max-w-[36ch] text-lg leading-relaxed text-muted-foreground md:text-xl"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
        >
          Sixteen frameworks scored on fitness and twelve-month rewrite
          risk—{leader.framework} leads AFFIX at {leader.AFFIX.toFixed(1)}.
        </motion.p>

        <motion.div
          className="mt-12 flex flex-wrap items-center gap-4"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
        >
          <DitherButton
            type="button"
            color="orange"
            variant="gradient"
            bloom="high"
            className="h-12 rounded-md px-6 font-mono text-xs uppercase tracking-[0.16em] text-white"
            onClick={() =>
              document.querySelector("#rankings")?.scrollIntoView({ behavior: "smooth" })
            }
          >
            View rankings
          </DitherButton>
          <a
            href="#brief"
            className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground underline-offset-4 transition hover:text-foreground hover:underline"
          >
            Read the brief
          </a>
        </motion.div>
      </div>
    </section>
  )
}
