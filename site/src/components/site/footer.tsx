"use client"

import { DitherButton, DitherGradient } from "@/components/dither-kit"
import { asOf, study } from "@/data/content"

const downloads = [
  { href: "/affix-2026.json", label: "Scores" },
  { href: "/affix-2026-failures.json", label: "Failures" },
  { href: "/methodology.md", label: "Method" },
  { href: "/citations.md", label: "Citations" },
  { href: "/video/affix-launch.mp4", label: "Film" },
]

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/8">
      <DitherGradient
        from="orange"
        to="transparent"
        direction="up"
        cell={2}
        opacity={0.45}
        bloom="low"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-64"
      />
      <div className="absolute inset-0 bg-[#050505]/55" />
      <div className="relative mx-auto flex max-w-[960px] flex-col gap-10 px-5 py-16 md:flex-row md:items-end md:justify-between md:px-10 md:py-20">
        <div>
          <p className="font-data text-[10px] uppercase tracking-[0.2em] text-accent">
            Specimen archive
          </p>
          <p className="mt-3 font-display text-3xl font-semibold tracking-tight md:text-4xl">
            AFFIX
          </p>
          <p className="mt-2 max-w-[30ch] text-sm text-muted-foreground">
            {study} · EST scores · primary docs as of {asOf}
          </p>
          <DitherButton
            type="button"
            color="orange"
            variant="hatched"
            bloom="low"
            className="mt-6 h-10 rounded-md px-4 font-data text-[10px] uppercase tracking-[0.14em] text-white"
            onClick={() =>
              window.open(
                "https://github.com/arjunkshah12345-hash/affix-2026",
                "_blank"
              )
            }
          >
            Source repo
          </DitherButton>
        </div>
        <div className="flex flex-col gap-3 md:items-end">
          <p className="font-data text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
            Downloads
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-2 font-data text-[11px] uppercase tracking-[0.14em] text-muted-foreground md:justify-end">
            {downloads.map((d) => (
              <a
                key={d.href}
                href={d.href}
                className="transition hover:text-accent"
              >
                {d.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
