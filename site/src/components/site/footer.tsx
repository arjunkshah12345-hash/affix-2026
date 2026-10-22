"use client"

import { DitherGradient } from "@/components/dither-kit"
import { asOf, study } from "@/data/affix"

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/8">
      <DitherGradient
        from="orange"
        to="transparent"
        direction="up"
        cell={4}
        opacity={0.25}
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40"
      />
      <div className="relative mx-auto flex max-w-[1120px] flex-col gap-8 px-6 py-20 md:flex-row md:items-end md:justify-between md:px-8">
        <div>
          <p className="font-display text-3xl font-semibold tracking-tight">AFFIX</p>
          <p className="mt-2 max-w-[36ch] text-sm text-muted-foreground">
            {study} · published {asOf}. Independent research; not affiliated
            with the frameworks scored.
          </p>
        </div>
        <div className="flex flex-col gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
          <a href="/affix-2026.json" className="hover:text-foreground" download>
            affix-2026.json
          </a>
          <a
            href="/affix-2026-failures.json"
            className="hover:text-foreground"
            download
          >
            affix-2026-failures.json
          </a>
          <a href="/methodology.md" className="hover:text-foreground" download>
            methodology.md
          </a>
          <a href="/citations.md" className="hover:text-foreground" download>
            citations.md
          </a>
          <a
            href="https://tripwire.sh/dither-kit"
            className="hover:text-foreground"
            target="_blank"
            rel="noreferrer"
          >
            Charts by dither-kit
          </a>
        </div>
      </div>
    </footer>
  )
}
