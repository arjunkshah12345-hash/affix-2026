"use client"

import { matrixFrameworkById } from "@/data/content"
import { BlurReveal } from "@/components/ui/blur-reveal"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ComparisonBar } from "@/components/ui/comparison"

const pd = matrixFrameworkById.PD
const vs = matrixFrameworkById.VS

export function Contrast() {
  return (
    <section
      id="split"
      className="border-y border-line bg-surface-muted/40 px-5 py-20 md:px-8 md:py-28"
    >
      <div className="mx-auto max-w-4xl">
        <BlurReveal>
          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted">
            Key split
          </p>
          <h2 className="mt-3 max-w-[22ch] font-display text-3xl tracking-[-0.02em] text-ink md:text-4xl">
            High AFFIX does not mean low rewrite hazard
          </h2>
          <p className="mt-4 max-w-[46ch] text-[15px] leading-relaxed text-muted">
            {pd.framework} leads fitness and succession safety. Sole-stack{" "}
            {vs.framework} stays capable with elevated RHS after adjudication.
          </p>
        </BlurReveal>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          <BlurReveal delay={60}>
            <Card>
              <CardHeader>
                <CardTitle>{pd.framework}</CardTitle>
                <CardDescription>Rewrite-safe leader</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="flex gap-8">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.12em] text-muted">
                      AFFIX
                    </p>
                    <p className="mt-1 font-mono text-3xl font-medium tabular-nums tracking-tight">
                      {pd.AFFIX.toFixed(1)}
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.12em] text-muted">
                      RHS ↓
                    </p>
                    <p className="mt-1 font-mono text-3xl font-medium tabular-nums tracking-tight text-pastel-sage-ink">
                      {pd.RHS.toFixed(1)}
                    </p>
                  </div>
                </div>
                <ComparisonBar
                  left="Fitness"
                  right="Hazard share"
                  leftValue={pd.AFFIX}
                  rightValue={pd.RHS}
                />
              </CardContent>
            </Card>
          </BlurReveal>

          <BlurReveal delay={120}>
            <Card>
              <CardHeader>
                <CardTitle>{vs.framework}</CardTitle>
                <CardDescription>Fitness without durability</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="flex gap-8">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.12em] text-muted">
                      AFFIX
                    </p>
                    <p className="mt-1 font-mono text-3xl font-medium tabular-nums tracking-tight">
                      {vs.AFFIX.toFixed(1)}
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.12em] text-muted">
                      RHS ↓
                    </p>
                    <p className="mt-1 font-mono text-3xl font-medium tabular-nums tracking-tight text-pastel-rose-ink">
                      {vs.RHS.toFixed(1)}
                    </p>
                  </div>
                </div>
                <ComparisonBar
                  left="Fitness"
                  right="Hazard share"
                  leftValue={vs.AFFIX}
                  rightValue={vs.RHS}
                />
              </CardContent>
            </Card>
          </BlurReveal>
        </div>
      </div>
    </section>
  )
}
