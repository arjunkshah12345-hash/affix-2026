"use client"

import { frameworks } from "@/data/content"
import { cn } from "@/lib/utils"
import { useFrameworkDetail } from "./framework-detail"
import { BlurReveal } from "@/components/ui/blur-reveal"
import { Pill } from "@/components/ui/pill"
import { Table, TBody, TD, TH, THead, TR } from "@/components/ui/table"

const maxAffix = Math.max(...frameworks.map((f) => f.AFFIX))

function rhsTone(rhs: number): "sage" | "sand" | "rose" {
  if (rhs <= 22) return "sage"
  if (rhs <= 30) return "sand"
  return "rose"
}

export function Leaderboard() {
  const { open } = useFrameworkDetail()

  return (
    <section id="rankings" className="px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-5xl">
        <BlurReveal>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted">
                Rankings
              </p>
              <h2 className="mt-3 max-w-[16ch] font-display text-3xl tracking-[-0.02em] text-ink md:text-4xl">
                Full index by AFFIX
              </h2>
            </div>
            <p className="max-w-[32ch] text-[14px] leading-relaxed text-muted md:text-right">
              Meter = AFFIX vs leader. RHS ↓ = rewrite hazard. Click a row for
              the dossier.
            </p>
          </div>
        </BlurReveal>

        <BlurReveal delay={80} className="mt-10">
          <Table>
            <THead>
              <TR>
                <TH className="w-12">#</TH>
                <TH>Framework</TH>
                <TH className="w-[28%] hidden sm:table-cell">AFFIX</TH>
                <TH className="text-right">Score</TH>
                <TH className="text-right">RHS ↓</TH>
                <TH className="hidden text-right md:table-cell">LIE</TH>
              </TR>
            </THead>
            <TBody>
              {frameworks.map((f, i) => {
                const pct = (f.AFFIX / maxAffix) * 100
                return (
                  <TR
                    key={f.id}
                    className="cursor-pointer"
                    onClick={() => open(f.id)}
                  >
                    <TD className="font-mono text-muted">
                      {String(i + 1).padStart(2, "0")}
                    </TD>
                    <TD>
                      <span className="font-medium text-ink">
                        {f.framework}
                      </span>
                      <span className="ml-2 font-mono text-xs text-faint">
                        {f.id}
                      </span>
                    </TD>
                    <TD className="hidden sm:table-cell">
                      <div className="h-1 w-full overflow-hidden rounded-[1px] bg-white/10">
                        <div
                          className={cn(
                            "h-full bg-accent/85 transition-all",
                            i === 0 && "bg-accent"
                          )}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </TD>
                    <TD className="text-right font-mono font-medium tabular-nums text-accent">
                      {f.AFFIX.toFixed(1)}
                    </TD>
                    <TD className="text-right">
                      <Pill tone={rhsTone(f.RHS)} className="font-mono">
                        {f.RHS.toFixed(1)}
                      </Pill>
                    </TD>
                    <TD className="hidden text-right font-mono tabular-nums text-muted md:table-cell">
                      {f.LIE}
                    </TD>
                  </TR>
                )
              })}
            </TBody>
          </Table>
        </BlurReveal>
      </div>
    </section>
  )
}
