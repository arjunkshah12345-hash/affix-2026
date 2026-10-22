"use client"

import { DitherGradient } from "@/components/dither-kit"
import { Reveal, SectionLabel } from "./reveal"

export function LaunchVideo() {
  return (
    <section
      id="film"
      className="relative overflow-hidden border-y border-white/8 py-24 md:py-32"
    >
      <DitherGradient
        from="orange"
        to="transparent"
        direction="up"
        cell={2}
        opacity={0.28}
        bloom="low"
        className="pointer-events-none absolute inset-0"
      />
      <div className="absolute inset-0 bg-[#050505]/78" />
      <div className="relative mx-auto max-w-[960px] px-5 md:px-10">
        <Reveal>
          <SectionLabel>Study film</SectionLabel>
          <h2 className="mt-3 max-w-[16ch] font-display text-3xl font-semibold tracking-tight md:text-4xl">
            Twenty-two seconds on the index
          </h2>
          <p className="mt-4 max-w-[40ch] text-sm text-muted-foreground md:text-base">
            Remotion principal cut. Click to play—no autoplay.
          </p>
        </Reveal>
        <Reveal delay={0.08} className="mt-12">
          <div className="overflow-hidden border border-white/12 bg-black/50">
            <video
              className="aspect-video w-full"
              controls
              playsInline
              preload="metadata"
              poster="/video/poster.png"
            >
              <source src="/video/affix-launch.mp4" type="video/mp4" />
            </video>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
