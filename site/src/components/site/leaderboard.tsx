"use client"

import { frameworks } from "@/data/content"
import { useFrameworkDetail } from "./framework-detail"
import { BlurReveal } from "@/components/ui/blur-reveal"
import { Pill } from "@/components/ui/pill"
import { Table, TBody, TD, TH, THead, TR } from "@/components/ui/table"

function rhsTone(rhs: number): "sage" | "sand" | "rose" {
  if (rhs <= 22) return "sage"
  if (rhs <= 30) return "sand"
  return "rose"
}

export function Leaderboard() {
  const { open } = useFrameworkDetail()

  return (
    <section id="rankings" className="px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-4xl">
        <BlurReveal>
          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted">
            Rankings
          </p>
          <h2 className="mt-3 max-w-[16ch] font-display text-3xl tracking-[-0.02em] text-ink md:text-4xl">
            Full index by AFFIX
          </h2>
          <p className="mt-4 max-w-[42ch] text-[15px] leading-relaxed text-muted">
            Click a row for the dossier. RHS ↓ is rewrite hazard — lower is
            safer.
          </p>
        </BlurReveal>

        <BlurReveal delay={80} className="mt-10">
          <Table>
            <THead>
              <TR>
                <TH className="w-12">#</TH>
                <TH>Framework</TH>
                <TH className="text-right">AFFIX</TH>
                <TH className="text-right">RHS ↓</TH>
                <TH className="hidden text-right sm:table-cell">LIE</TH>
                <TH className="hidden text-right md:table-cell">PR</TH>
              </TR>
            </THead>
            <TBody>
              {frameworks.map((f, i) => (
                <TR
                  key={f.id}
                  className="cursor-pointer"
                  onClick={() => open(f.id)}
                >
                  <TD className="font-mono text-muted">
                    {String(i + 1).padStart(2, "0")}
                  </TD>
                  <TD>
                    <span className="font-medium text-ink">{f.framework}</span>
                    <span className="ml-2 font-mono text-xs text-faint">
                      {f.id}
                    </span>
                  </TD>
                  <TD className="text-right font-mono font-medium tabular-nums">
                    {f.AFFIX.toFixed(1)}
                  </TD>
                  <TD className="text-right">
                    <Pill tone={rhsTone(f.RHS)} className="font-mono">
                      {f.RHS.toFixed(1)}
                    </Pill>
                  </TD>
                  <TD className="hidden text-right font-mono tabular-nums text-muted sm:table-cell">
                    {f.LIE}
                  </TD>
                  <TD className="hidden text-right font-mono tabular-nums text-muted md:table-cell">
                    {f.PR}
                  </TD>
                </TR>
              ))}
            </TBody>
          </Table>
        </BlurReveal>
      </div>
    </section>
  )
}
