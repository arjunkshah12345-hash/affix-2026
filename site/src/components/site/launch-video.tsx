"use client"

import { DitherGradient } from "@/components/dither-kit"
import { Reveal, SectionLabel } from "./reveal"

export function LaunchVideo() {
  return (
    <section id="film" className="relative overflow-hidden py-24 md:py-32">
      <DitherGradient
        from="orange"
        to="transparent"
        direction="down"
        cell={3}
        opacity={0.12}
        bloom="low"
        className="pointer-events-none absolute inset-x-0 top-0 h-48"
      />
      <div className="relative mx-auto max-w-[960px] px-5 md:px-10">
        <Reveal>
          <SectionLabel>Study film</SectionLabel>
          <h2 className="mt-3 max-w-[14ch] font-display text-3xl font-semibold tracking-tight md:text-4xl">
            Principal cut
          </h2>
          <p className="mt-4 max-w-[40ch] text-sm text-muted-foreground md:text-base">
            Twenty-two seconds on the index. Click to play—no autoplay.
          </p>
        </Reveal>
        <Reveal delay={0.08} className="mt-12">
          <div className="overflow-hidden rounded-md border border-white/10 bg-black/40">
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
