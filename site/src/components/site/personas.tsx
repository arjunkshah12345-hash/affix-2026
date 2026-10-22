"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import {
  DitherAvatar,
  DitherButton,
  DitherGradient,
} from "@/components/dither-kit"
import { personas, siteFrameworkById } from "@/data/content"
import { cn } from "@/lib/utils"
import { Reveal, SectionLabel } from "./reveal"

function resolvePickLabel(pick: string) {
  const ids = pick.split(/[+/,]/).map((s) => s.trim())
  const names = ids.map((part) => {
    const match = part.match(/\b([A-Z]{2})\b/)
    if (match && siteFrameworkById[match[1]]) {
      return siteFrameworkById[match[1]].name
    }
    return part
  })
  return names.join(" + ")
}

export function Personas() {
  const [active, setActive] = useState<(typeof personas)[number]["id"]>(
    personas[0].id
  )
  const current = personas.find((p) => p.id === active)!

  return (
    <section id="playbooks" className="relative overflow-hidden py-28 md:py-36">
      <DitherGradient
        from="orange"
        to="transparent"
        direction="up"
        cell={3}
        opacity={0.14}
        bloom="low"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-72"
      />
      <div className="relative mx-auto max-w-[1120px] px-5 md:px-8">
        <Reveal>
          <SectionLabel>Playbooks</SectionLabel>
          <h2 className="mt-4 max-w-[18ch] font-display text-4xl font-semibold tracking-tight md:text-5xl">
            Defaults by persona
          </h2>
          <p className="mt-5 max-w-[52ch] text-muted-foreground">
            Suggested primary stacks conditioned on language estate, compliance
            constraints, and distance from conversational UI to durable agents.
            Defaults, not prescriptions.
          </p>
        </Reveal>

        <Reveal delay={0.08} className="mt-14">
          <div className="flex flex-wrap gap-2">
            {personas.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setActive(p.id)}
                className={cn(
                  "inline-flex items-center gap-2 border px-3 py-2 font-data text-[11px] uppercase tracking-[0.14em] transition",
                  active === p.id
                    ? "border-accent/50 bg-accent/10 text-accent"
                    : "border-white/8 text-muted-foreground hover:border-white/20 hover:text-foreground"
                )}
              >
                <DitherAvatar
                  name={p.id}
                  hue={28}
                  bloom="low"
                  className="size-5 shrink-0 rounded-sm"
                />
                {p.name}
              </button>
            ))}
          </div>

          <div className="relative mt-12 min-h-[220px] overflow-hidden border-t border-white/8 pt-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="font-data text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                  Recommended primary
                </p>
                <p className="mt-3 font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                  {resolvePickLabel(current.pick)}
                </p>
                <p className="mt-4 max-w-[42ch] text-[15px] leading-relaxed text-muted-foreground md:text-lg">
                  {current.note}
                </p>
                <dl className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div>
                    <dt className="font-data text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                      Alt
                    </dt>
                    <dd className="mt-1 text-sm text-foreground/80">
                      {current.alt}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-data text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                      Avoid
                    </dt>
                    <dd className="mt-1 text-sm text-foreground/80">
                      {current.avoid}
                    </dd>
                  </div>
                </dl>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <DitherButton
              type="button"
              color="orange"
              variant="gradient"
              bloom="high"
              className="h-11 rounded-md px-5 font-data text-[11px] uppercase tracking-[0.14em] text-white"
              onClick={() =>
                document
                  .querySelector("#rankings")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Return to rankings
            </DitherButton>
            <DitherButton
              type="button"
              color="orange"
              variant="hatched"
              bloom="low"
              className="h-11 rounded-md px-5 font-data text-[11px] uppercase tracking-[0.14em] text-white"
              onClick={() =>
                document
                  .querySelector("#compare")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Compare stacks
            </DitherButton>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
