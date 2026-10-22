"use client"

import { useState, type ReactNode } from "react"
import { DitherButton, DitherGradient } from "@/components/dither-kit"
import { cn } from "@/lib/utils"

const links = [
  { href: "#top", label: "Index" },
  { href: "#results", label: "Results" },
  { href: "#rankings", label: "Rankings" },
  { href: "#method", label: "Method" },
  { href: "#failures", label: "Failures" },
  { href: "#findings", label: "Findings" },
  { href: "#film", label: "Film" },
]

export function Shell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="min-h-dvh bg-[#050505]">
      {/* Mobile top bar */}
      <div className="fixed inset-x-0 top-0 z-50 flex h-14 items-center justify-between border-b border-white/8 bg-[#050505]/90 px-4 backdrop-blur-md lg:hidden">
        <a href="#top" className="font-display text-base font-semibold tracking-tight">
          AFFIX
        </a>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="font-data text-[10px] uppercase tracking-[0.16em] text-muted-foreground"
          aria-expanded={open}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open ? (
        <div className="fixed inset-0 z-40 bg-[#050505]/98 pt-16 lg:hidden">
          <nav className="flex flex-col gap-1 px-6 py-8">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="border-b border-white/8 py-4 font-data text-[12px] uppercase tracking-[0.18em] text-foreground"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>
      ) : null}

      {/* Desktop rail */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[13.5rem] flex-col border-r border-white/8 bg-[#050505] lg:flex">
        <div className="relative flex flex-1 flex-col px-5 pb-6 pt-8">
          <DitherGradient
            from="orange"
            to="transparent"
            direction="down"
            cell={2}
            opacity={0.22}
            bloom="low"
            className="pointer-events-none absolute inset-x-0 top-0 h-40"
          />
          <a href="#top" className="relative">
            <span className="font-display text-2xl font-semibold tracking-tight">
              AFFIX
            </span>
            <span className="mt-1 block font-data text-[10px] uppercase tracking-[0.2em] text-accent">
              2026
            </span>
          </a>

          <nav className="relative mt-12 flex flex-1 flex-col gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={cn(
                  "rounded-sm px-2 py-2 font-data text-[11px] uppercase tracking-[0.16em]",
                  "text-muted-foreground transition hover:bg-white/[0.04] hover:text-foreground"
                )}
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
            className="relative mt-auto h-10 w-full rounded-md font-data text-[10px] uppercase tracking-[0.14em] text-white"
            onClick={() =>
              document.querySelector("#rankings")?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Open rankings
          </DitherButton>
        </div>
      </aside>

      <div className="lg:pl-[13.5rem]">
        <div className="pt-14 lg:pt-0">{children}</div>
      </div>
    </div>
  )
}
