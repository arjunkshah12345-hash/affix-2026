"use client"

import { asOf, frameworks, leader, safest } from "@/data/content"
import { DitherButton, DitherGradient } from "@/components/dither-kit"
import { BlurReveal } from "@/components/ui/blur-reveal"
import { Pill } from "@/components/ui/pill"
import { Stat } from "@/components/ui/stat"

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden px-5 pb-20 pt-28 md:px-8 md:pb-28 md:pt-36"
    >
      <DitherGradient
        from="orange"
        to="transparent"
        direction="up"
        cell={3}
        opacity={0.08}
        bloom="low"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32"
      />

      <div className="relative mx-auto grid max-w-5xl gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-16">
        <div>
          <BlurReveal eager>
            <Pill tone="sand" className="mb-6">
              Fitness index · {asOf}
            </Pill>
          </BlurReveal>

          <BlurReveal eager delay={40}>
            <p className="font-display text-5xl tracking-[-0.03em] text-ink md:text-6xl">
              AFFIX
            </p>
          </BlurReveal>

          <BlurReveal eager delay={90}>
            <h1 className="mt-5 max-w-[14ch] font-display text-3xl italic leading-[1.12] tracking-[-0.02em] text-ink md:text-[2.5rem]">
              Stacks you can still own in twelve months.
            </h1>
          </BlurReveal>

          <BlurReveal eager delay={140}>
            <p className="mt-5 max-w-[36ch] text-[15px] leading-relaxed text-muted">
              {frameworks.length} frameworks scored on fitness and rewrite
              hazard. One index, no pitch deck.
            </p>
          </BlurReveal>

          <BlurReveal eager delay={190}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <DitherButton
                type="button"
                color="orange"
                variant="gradient"
                bloom="low"
                className="h-11 rounded-md px-5 text-sm font-medium text-white"
                onClick={() =>
                  document
                    .querySelector("#rankings")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                View rankings
              </DitherButton>
              <a
                href="#split"
                className="inline-flex h-11 items-center px-3 text-sm font-medium text-ink-soft transition hover:text-accent"
              >
                Key split
              </a>
            </div>
          </BlurReveal>
        </div>

        <BlurReveal eager delay={120} className="grid gap-3">
          <Stat
            label="Leader"
            value={leader.framework}
            delta={`#1 of ${frameworks.length}`}
            trend="up"
          />
          <div className="grid grid-cols-2 gap-3">
            <Stat
              label="AFFIX"
              value={leader.AFFIX.toFixed(1)}
              delta="Composite"
              trend="neutral"
            />
            <Stat
              label="Best RHS"
              value={safest.RHS.toFixed(1)}
              delta="Lower safer"
              trend="up"
            />
          </div>
        </BlurReveal>
      </div>
    </section>
  )
}
