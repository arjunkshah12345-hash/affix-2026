"use client"

import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react"
import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

const ease = [0.22, 1, 0.36, 1] as const

export function Reveal({
  children,
  className,
  delay = 0,
  ...props
}: {
  children: ReactNode
  className?: string
  delay?: number
} & HTMLMotionProps<"div">) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.75, delay, ease }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export function Stagger({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, margin: "-8% 0px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.055 } },
      }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={cn(className)}
      variants={{
        hidden: reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.55, ease },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="font-data text-[11px] uppercase tracking-[0.2em] text-accent">
      {children}
    </p>
  )
}
