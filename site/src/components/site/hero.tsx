"use client"

import { asOf, frameworks, leader, safest } from "@/data/content"
import { Button } from "@/components/ui/button"
import { BlurReveal } from "@/components/ui/blur-reveal"
import { Pill } from "@/components/ui/pill"
import { Stat } from "@/components/ui/stat"

export function Hero() {
  return (
    <section id="top" className="px-5 pb-16 pt-28 md:px-8 md:pb-24 md:pt-36">
      <div className="mx-auto max-w-3xl text-center">
        <BlurReveal>
          <Pill tone="sand" className="mb-6">
            Fitness index · {asOf}
          </Pill>
        </BlurReveal>

        <BlurReveal delay={60}>
          <p className="font-display text-5xl tracking-[-0.03em] text-ink md:text-7xl">
            AFFIX
          </p>
        </BlurReveal>

        <BlurReveal delay={120}>
          <h1 className="mx-auto mt-6 max-w-[18ch] font-display text-3xl italic leading-[1.15] tracking-[-0.02em] text-ink md:text-4xl">
            Stacks you can still own in twelve months.
          </h1>
        </BlurReveal>

        <BlurReveal delay={180}>
          <p className="mx-auto mt-5 max-w-[40ch] text-[15px] leading-relaxed text-muted">
            {frameworks.length} frameworks scored on fitness and rewrite hazard.
            One index, no pitch deck.
          </p>
        </BlurReveal>

        <BlurReveal delay={240}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button
              variant="primary"
              size="lg"
              onClick={() =>
                document
                  .querySelector("#rankings")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              View rankings
            </Button>
            <a
              href="#split"
              className="inline-flex h-12 items-center px-4 text-[15px] font-medium text-ink-soft transition hover:text-ink"
            >
              Key split
            </a>
          </div>
        </BlurReveal>
      </div>

      <div className="mx-auto mt-16 grid max-w-4xl gap-3 sm:grid-cols-3">
        <Stat
          label="Leader"
          value={leader.framework}
          delta={`#1 of ${frameworks.length}`}
          trend="up"
        />
        <Stat
          label="AFFIX"
          value={leader.AFFIX.toFixed(1)}
          delta="Composite fitness"
          trend="neutral"
        />
        <Stat
          label="Best RHS"
          value={safest.RHS.toFixed(1)}
          delta={`${safest.framework} · lower is safer`}
          trend="up"
        />
      </div>

    </section>
  )
}
