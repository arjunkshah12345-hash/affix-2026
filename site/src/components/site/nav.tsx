"use client"

import { useEffect, useState } from "react"
import { DitherButton } from "@/components/dither-kit"
import { cn } from "@/lib/utils"

const links = [
  { href: "#brief", label: "Brief" },
  { href: "#method", label: "Method" },
  { href: "#rankings", label: "Rankings" },
  { href: "#frameworks", label: "Explore" },
  { href: "#failures", label: "Failures" },
  { href: "#compare", label: "Compare" },
  { href: "#findings", label: "Findings" },
  { href: "#playbooks", label: "Playbooks" },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background,border-color,backdrop-filter] duration-500",
        scrolled
          ? "border-b border-white/6 bg-[#050505]/70 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1120px] items-center justify-between px-6 md:px-8">
        <a href="#top" className="group flex items-baseline gap-2">
          <span className="font-display text-lg font-semibold tracking-tight text-foreground">
            AFFIX
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground transition group-hover:text-accent">
            2026
          </span>
        </a>

        <nav className="hidden items-center gap-5 lg:flex xl:gap-7">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground transition hover:text-foreground xl:text-[11px] xl:tracking-[0.16em]"
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
          className="h-9 rounded-md px-4 font-mono text-[11px] uppercase tracking-[0.14em] text-white"
          onClick={() => {
            document.querySelector("#rankings")?.scrollIntoView({ behavior: "smooth" })
          }}
        >
          View rankings
        </DitherButton>
      </div>
    </header>
  )
}
