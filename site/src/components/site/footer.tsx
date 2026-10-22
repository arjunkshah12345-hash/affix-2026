"use client"

import { DitherButton, DitherGradient } from "@/components/dither-kit"
import { asOf, study } from "@/data/content"

const downloads = [
  { href: "/affix-2026.json", label: "Scores JSON" },
  { href: "/affix-2026-failures.json", label: "Failures" },
  { href: "/methodology.md", label: "Methodology" },
  { href: "/citations.md", label: "Citations" },
]

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/8">
      <DitherGradient
        from="orange"
        to="transparent"
        direction="up"
        cell={2}
        opacity={0.35}
        bloom="low"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-48"
      />
      <div className="relative mx-auto flex max-w-[1120px] flex-col gap-10 px-5 py-16 md:flex-row md:items-end md:justify-between md:px-8 md:py-20">
        <div>
          <p className="font-display text-3xl font-semibold tracking-tight">AFFIX</p>
          <p className="mt-3 max-w-[34ch] text-sm leading-relaxed text-muted-foreground">
            {study} · EST scores from primary docs · {asOf}
          </p>
          <div className="mt-6">
            <DitherButton
              type="button"
              color="orange"
              variant="gradient"
              bloom="low"
              className="h-10 rounded-md px-4 font-data text-[11px] uppercase tracking-[0.14em] text-white"
              onClick={() =>
                window.open(
                  "https://github.com/arjunkshah12345-hash/affix-2026",
                  "_blank"
                )
              }
            >
              GitHub
            </DitherButton>
          </div>
        </div>
        <div className="flex flex-col gap-2 font-data text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
          {downloads.map((d) => (
            <a
              key={d.href}
              href={d.href}
              className="transition hover:text-accent"
            >
              {d.label}
            </a>
          ))}
          <a href="/video/affix-launch.mp4" className="transition hover:text-accent">
            Study film
          </a>
        </div>
      </div>
    </footer>
  )
}
