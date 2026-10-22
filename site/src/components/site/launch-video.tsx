"use client"

import { DitherGradient } from "@/components/dither-kit"
import { Reveal, SectionLabel } from "./reveal"

export function LaunchVideo() {
  return (
    <section id="film" className="relative overflow-hidden py-28 md:py-32">
      <DitherGradient
        from="orange"
        to="transparent"
        direction="down"
        cell={3}
        opacity={0.14}
        bloom="low"
        className="pointer-events-none absolute inset-x-0 top-0 h-56"
      />
      <div className="relative mx-auto max-w-[1120px] px-5 md:px-8">
        <Reveal>
          <SectionLabel>Study film</SectionLabel>
          <h2 className="mt-4 max-w-[18ch] font-display text-4xl font-semibold tracking-tight md:text-5xl">
            Twenty-two seconds
          </h2>
          <p className="mt-5 max-w-[42ch] text-muted-foreground">
            Principal results cut. Click to play—no autoplay.
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
