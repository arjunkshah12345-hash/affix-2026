"use client"

import { asOf, frameworks, leader, safest } from "@/data/content"
import { motion, useReducedMotion } from "motion/react"

export function Hero() {
  const reduce = useReducedMotion()
  const top = frameworks.slice(0, 5)

  return (
    <section
      id="top"
      className="relative min-h-[100svh] overflow-hidden pt-16"
    >
      {/* Soft field — not a dither wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(oklch(0.22 0.03 265 / 0.04) 1px, transparent 1px), linear-gradient(90deg, oklch(0.22 0.03 265 / 0.04) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage:
            "linear-gradient(to bottom, black 0%, black 40%, transparent 85%)",
        }}
      />

      <div className="relative mx-auto grid min-h-[calc(100svh-4rem)] max-w-[1120px] grid-cols-1 content-end gap-12 px-5 pb-16 pt-20 md:grid-cols-[1.15fr_0.85fr] md:items-end md:gap-16 md:px-8 md:pb-24">
        <div>
          <motion.p
            className="font-data text-[11px] uppercase tracking-[0.18em] text-muted-foreground"
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            Agent Framework Fitness Index · {asOf}
          </motion.p>

          <motion.h1
            className="mt-5 max-w-[12ch] font-display text-[clamp(3.25rem,8.5vw,5.75rem)] font-semibold leading-[0.95] tracking-[-0.03em] text-foreground"
            initial={reduce ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
          >
            AFFIX
          </motion.h1>

          <motion.p
            className="mt-6 max-w-[36ch] text-lg leading-relaxed text-muted-foreground md:text-xl"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
          >
            Sixteen frameworks scored for production fitness and twelve-month
            rewrite hazard. {leader.framework} leads at{" "}
            <span className="font-data text-accent">{leader.AFFIX.toFixed(1)}</span>
            .
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap items-center gap-3"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <a
              href="#rankings"
              className="inline-flex h-11 items-center rounded-sm bg-foreground px-5 font-data text-[11px] uppercase tracking-[0.14em] text-background transition hover:bg-accent"
            >
              View rankings
            </a>
            <a
              href="#results"
              className="inline-flex h-11 items-center px-2 font-data text-[11px] uppercase tracking-[0.14em] text-muted-foreground underline-offset-4 transition hover:text-foreground hover:underline"
            >
              Principal results
            </a>
          </motion.div>
        </div>

        {/* Rank strip as the hero visual */}
        <motion.aside
          className="border-t border-foreground/15 pt-6 md:border-t-0 md:border-l md:pl-10 md:pt-0"
          initial={reduce ? false : { opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          aria-label="Top five by AFFIX"
        >
          <p className="font-data text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
            Top five · AFFIX ↑
          </p>
          <ol className="mt-5 space-y-0">
            {top.map((f, i) => (
              <li
                key={f.id}
                className="grid grid-cols-[2rem_1fr_auto] items-baseline gap-3 border-b border-foreground/10 py-3.5"
              >
                <span className="font-data text-[11px] text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-[15px] font-semibold tracking-tight md:text-base">
                  {f.framework}
                </span>
                <span className="font-data text-[15px] tabular-nums text-accent">
                  {f.AFFIX.toFixed(1)}
                </span>
              </li>
            ))}
          </ol>
          <p className="mt-5 font-data text-[11px] leading-relaxed text-muted-foreground">
            Lowest RHS: {safest.framework} · {safest.RHS.toFixed(1)}
          </p>
        </motion.aside>
      </div>
    </section>
  )
}
