"use client"

import { useEffect, useState, type ReactNode } from "react"
import { FloatingNav } from "@/components/ui/floating-nav"

const items = [
  { value: "top", label: "Index", href: "#top" },
  { value: "rankings", label: "Rankings", href: "#rankings" },
  { value: "split", label: "Split", href: "#split" },
  { value: "signals", label: "Signals", href: "#signals" },
  { value: "failures", label: "Failures", href: "#failures" },
  { value: "findings", label: "Findings", href: "#findings" },
]

export function Shell({ children }: { children: ReactNode }) {
  const [active, setActive] = useState("top")

  useEffect(() => {
    const ids = items.map((i) => i.value)
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el))
    if (!els.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]?.target.id) setActive(visible[0].target.id)
      },
      { rootMargin: "-25% 0px -55% 0px", threshold: [0.15, 0.4] }
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-dvh bg-[#050505]">
      <div className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
        <div className="pointer-events-auto">
          <FloatingNav
            items={items}
            value={active}
            onChange={setActive}
            hideOnScroll
            className="border-white/10 bg-[#0c0c0c]/80"
          />
        </div>
      </div>
      {children}
    </div>
  )
}
