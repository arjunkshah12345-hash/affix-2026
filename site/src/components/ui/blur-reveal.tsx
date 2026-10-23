"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

/** Content that resolves from blur and a slight drop as it enters the viewport. */
export function BlurReveal({
  children,
  className,
  delay = 0,
  eager = false,
}: {
  children: React.ReactNode
  className?: string
  /** Milliseconds before the reveal starts. */
  delay?: number
  /** Reveal immediately (use for above-the-fold hero content). */
  eager?: boolean
}) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [visible, setVisible] = React.useState(eager)

  React.useEffect(() => {
    if (eager) return
    const el = ref.current
    if (!el) return

    // Already on screen at mount — don't leave a blur smear.
    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight * 0.9 && rect.bottom > 0) {
      setVisible(true)
      return
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true)
          io.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: "40px 0px" }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [eager])

  return (
    <div
      ref={ref}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
      className={cn(
        "transition-[opacity,filter,transform] duration-700 ease-out",
        visible
          ? "translate-y-0 opacity-100 blur-0"
          : "translate-y-3 opacity-0 blur-sm",
        className
      )}
    >
      {children}
    </div>
  )
}
