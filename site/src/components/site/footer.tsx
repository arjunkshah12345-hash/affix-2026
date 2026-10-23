"use client"

import { asOf, study } from "@/data/content"
import { DitherGradient } from "@/components/dither-kit"
import { FooterSimple } from "@/components/ui/footer-simple"

const links = [
  { label: "Scores", href: "/affix-2026.json" },
  { label: "Failures", href: "/affix-2026-failures.json" },
  { label: "Method", href: "/methodology.md" },
  { label: "Source", href: "https://github.com/arjunkshah12345-hash/affix-2026" },
]

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line">
      <DitherGradient
        from="orange"
        to="transparent"
        direction="up"
        cell={3}
        opacity={0.14}
        bloom="low"
        className="inset-x-0 bottom-0 h-36"
      />
      <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#050505] to-transparent" />
      <FooterSimple
        brand={
          <span className="font-display text-xl tracking-tight text-ink">
            AFFIX
          </span>
        }
        links={links}
        note={`${study} · EST · ${asOf}`}
        className="relative border-0"
      />
    </footer>
  )
}
