"use client"

import { Reveal } from "./reveal"

export function LaunchVideo() {
  return (
    <section id="film" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-[1120px] px-6 md:px-8">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
            00b — Film
          </p>
          <h2 className="mt-4 max-w-[22ch] font-display text-4xl font-semibold tracking-tight md:text-5xl">
            Study film
          </h2>
          <p className="mt-5 max-w-[52ch] text-[15px] leading-relaxed text-muted-foreground md:text-base">
            A 22-second overview of the AFFIX-2026 principal results: composite
            fitness, rewrite hazard, and the five adjudicated findings from the
            score matrix.
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <figure className="mt-14 overflow-hidden rounded-sm border border-white/10 bg-[#0a0a0a] shadow-[0_0_0_1px_rgba(0,0,0,0.4)]">
            <div className="relative aspect-video bg-black">
              <video
                className="h-full w-full object-cover"
                controls
                playsInline
                preload="metadata"
                poster="/video/poster.png"
                aria-label="AFFIX-2026 study film — 22-second overview of principal results"
              >
                <source src="/video/affix-launch.mp4" type="video/mp4" />
              </video>
            </div>
            <figcaption className="flex items-center justify-between gap-4 border-t border-white/8 px-4 py-3 md:px-5">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                AFFIX-2026 · launch overview
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                00:22
              </span>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  )
}
