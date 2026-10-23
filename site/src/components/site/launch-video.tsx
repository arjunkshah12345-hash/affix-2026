"use client"

import { DitherGradient } from "@/components/dither-kit"
import { BlurReveal } from "@/components/ui/blur-reveal"

export function LaunchVideo() {
  return (
    <section
      id="film"
      className="relative overflow-hidden border-t border-line px-5 py-20 md:px-8 md:py-28"
    >
      <DitherGradient
        from="orange"
        to="transparent"
        direction="up"
        cell={3}
        opacity={0.12}
        bloom="low"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-48"
      />
      <div className="relative mx-auto max-w-3xl">
        <BlurReveal>
          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted">
            Study film
          </p>
          <h2 className="mt-3 max-w-[16ch] font-display text-3xl tracking-[-0.02em] text-ink md:text-4xl">
            Twenty-two seconds on the index
          </h2>
          <p className="mt-4 max-w-[40ch] text-[15px] leading-relaxed text-muted">
            Remotion principal cut. Click to play — no autoplay.
          </p>
        </BlurReveal>
        <BlurReveal delay={80} className="mt-10">
          <div className="overflow-hidden rounded-lg border border-line bg-black shadow-quiet">
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
        </BlurReveal>
      </div>
    </section>
  )
}
