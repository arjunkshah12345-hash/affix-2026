"use client"

import { useEffect, useState } from "react"
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
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background,box-shadow,border-color] duration-500",
        scrolled
          ? "border-b border-foreground/10 bg-background/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto flex h-14 max-w-[1120px] items-center justify-between px-5 md:h-16 md:px-8">
        <a href="#top" className="group flex items-baseline gap-2">
          <span className="font-display text-lg font-semibold tracking-tight text-foreground">
            AFFIX
          </span>
          <span className="font-data text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            2026
          </span>
        </a>

        <nav className="hidden items-center gap-6 md:flex lg:gap-7">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-data text-[10px] uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="#rankings"
          className="inline-flex h-9 items-center rounded-sm bg-foreground px-3.5 font-data text-[10px] uppercase tracking-[0.14em] text-background transition hover:bg-accent"
        >
          Rankings
        </a>
      </div>
    </header>
  )
}
