"use client"

import { Reveal, SectionLabel } from "./reveal"

export function LaunchVideo() {
  return (
    <section id="film" className="relative py-24 md:py-28">
      <div className="mx-auto max-w-[1120px] px-5 md:px-8">
        <Reveal>
          <SectionLabel>Study film</SectionLabel>
          <h2 className="mt-3 max-w-[18ch] font-display text-3xl font-semibold tracking-tight md:text-4xl">
            Twenty-two seconds of principal results
          </h2>
          <p className="mt-4 max-w-[46ch] text-muted-foreground">
            Overview of the AFFIX composite, rewrite hazard, and the
            fitness-versus-safety split. Click to play.
          </p>
        </Reveal>

        <Reveal delay={0.08} className="mt-10">
          <div className="overflow-hidden rounded-sm border border-foreground/12 bg-foreground/[0.03]">
            <video
              className="aspect-video w-full bg-foreground/5"
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
