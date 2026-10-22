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
        opacity={0.4}
        bloom="low"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-56"
      />
      <div className="relative mx-auto flex max-w-[960px] flex-col gap-8 px-5 py-14 md:flex-row md:items-end md:justify-between md:px-10 md:py-16">
        <div>
          <p className="font-display text-2xl font-semibold tracking-tight">AFFIX</p>
          <p className="mt-2 max-w-[28ch] text-sm text-muted-foreground">
            {study} · EST · {asOf}
          </p>
          <DitherButton
            type="button"
            color="orange"
            variant="hatched"
            bloom="low"
            className="mt-5 h-10 rounded-md px-4 font-data text-[10px] uppercase tracking-[0.14em] text-white"
            onClick={() =>
              window.open(
                "https://github.com/arjunkshah12345-hash/affix-2026",
                "_blank"
              )
            }
          >
            Source
          </DitherButton>
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-2 font-data text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
          {downloads.map((d) => (
            <a key={d.href} href={d.href} className="hover:text-accent">
              {d.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
