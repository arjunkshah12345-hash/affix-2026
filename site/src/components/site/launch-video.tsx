"use client"

import { BlurReveal } from "@/components/ui/blur-reveal"

export function LaunchVideo() {
  return (
    <section id="film" className="px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-3xl">
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
          <div className="overflow-hidden rounded-lg border border-line bg-ink shadow-quiet">
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
