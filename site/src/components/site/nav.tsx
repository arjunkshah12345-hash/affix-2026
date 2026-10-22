"use client"

import { useEffect, useState } from "react"
import { DitherButton } from "@/components/dither-kit"
import { cn } from "@/lib/utils"

const links = [
  { href: "#results", label: "Results" },
  { href: "#rankings", label: "Rankings" },
  { href: "#method", label: "Method" },
  { href: "#failures", label: "Failures" },
  { href: "#findings", label: "Findings" },
  { href: "#film", label: "Film" },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background,border-color,backdrop-filter] duration-500",
        scrolled
          ? "border-b border-white/8 bg-[#050505]/75 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1120px] items-center justify-between px-5 md:px-8">
        <a href="#top" className="group flex items-baseline gap-2">
          <span className="font-display text-lg font-semibold tracking-tight text-foreground">
            AFFIX
          </span>
          <span className="font-data text-[10px] uppercase tracking-[0.2em] text-muted-foreground transition group-hover:text-accent">
            2026
          </span>
        </a>

        <nav className="hidden items-center gap-6 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-data text-[10px] uppercase tracking-[0.14em] text-muted-foreground transition hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <DitherButton
          type="button"
          color="orange"
          variant="gradient"
          bloom="low"
          className="h-9 rounded-md px-4 font-data text-[11px] uppercase tracking-[0.14em] text-white"
          onClick={() =>
            document.querySelector("#rankings")?.scrollIntoView({ behavior: "smooth" })
          }
        >
          Rankings
        </DitherButton>
      </div>
    </header>
  )
}
