"use client"

import { useMemo, useState } from "react"
import { matrixFrameworkById, siteFrameworks } from "@/data/content"
import { cn } from "@/lib/utils"
import { useFrameworkDetail } from "./framework-detail"
import { Reveal, Stagger, StaggerItem } from "./reveal"

const LANGS = ["All", "Python", "TypeScript", "JVM", ".NET / multi"] as const

function langBucket(lang: string): (typeof LANGS)[number] {
  const l = lang.toLowerCase()
  if (l.includes("python")) return "Python"
  if (l.includes("typescript") || l.includes("javascript")) return "TypeScript"
  if (l.includes("java") || l.includes("jvm") || l.includes("kotlin"))
    return "JVM"
  return ".NET / multi"
}

export function Frameworks() {
  const { open } = useFrameworkDetail()
  const [q, setQ] = useState("")
  const [lang, setLang] = useState<(typeof LANGS)[number]>("All")

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase()
    return siteFrameworks.filter((f) => {
      const m = matrixFrameworkById[f.id]
      const bucket = m ? langBucket(m.primary_lang) : ".NET / multi"
      if (lang !== "All" && bucket !== lang) return false
      if (!needle) return true
      const hay = [
        f.id,
        f.name,
        f.oneLiner,
        f.bestFor,
        m?.category ?? "",
        m?.primary_lang ?? "",
      ]
        .join(" ")
        .toLowerCase()
      return hay.includes(needle)
    })
  }, [q, lang])

  return (
    <section id="frameworks" className="relative py-32 md:py-40">
      <div className="mx-auto max-w-[1120px] px-6 md:px-8">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
            03 — Frameworks
          </p>
          <h2 className="mt-4 max-w-[20ch] font-display text-4xl font-semibold tracking-tight md:text-5xl">
            Framework dossiers
          </h2>
          <p className="mt-5 max-w-[48ch] text-muted-foreground">
            Filter by language niche, then open a framework for primitives,
            version pins, scores, and primary citations.
          </p>
        </Reveal>

        <Reveal delay={0.06} className="mt-12">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search name, id, or capability…"
              className="w-full max-w-md border border-white/10 bg-transparent px-3 py-2.5 font-mono text-[12px] text-foreground placeholder:text-muted-foreground/60 outline-none transition focus:border-accent/40"
            />
            <div className="flex flex-wrap gap-2">
              {LANGS.map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLang(l)}
                  className={cn(
                    "rounded-md border px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] transition",
                    lang === l
                      ? "border-accent/50 bg-accent/10 text-accent"
                      : "border-white/10 text-muted-foreground hover:border-white/20 hover:text-foreground"
                  )}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <Stagger className="mt-12 grid gap-px bg-white/8 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((f) => {
            const m = matrixFrameworkById[f.id]
            return (
              <StaggerItem key={f.id}>
                <button
                  type="button"
                  onClick={() => open(f.id)}
                  className="group flex h-full w-full flex-col bg-[#050505] p-5 text-left transition hover:bg-white/[0.03]"
                >
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                      {f.id}
                    </span>
                    <span className="font-mono text-sm tabular-nums text-accent">
                      {f.scores.AFFIX.toFixed(1)}
                    </span>
                  </div>
                  <h3 className="mt-3 font-display text-lg font-semibold tracking-tight group-hover:text-accent">
                    {f.name}
                  </h3>
                  <p className="mt-2 line-clamp-3 flex-1 text-[13px] leading-relaxed text-muted-foreground">
                    {f.oneLiner}
                  </p>
                  <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground/70">
                    RHS {f.scores.RHS.toFixed(1)}
                    {m ? ` · ${m.primary_lang}` : ""}
                  </p>
                </button>
              </StaggerItem>
            )
          })}
        </Stagger>

        {filtered.length === 0 && (
          <p className="mt-10 font-mono text-[12px] text-muted-foreground">
            No frameworks match that filter.
          </p>
        )}
      </div>
    </section>
  )
}
