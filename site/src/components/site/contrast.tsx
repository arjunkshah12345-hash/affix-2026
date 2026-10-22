"use client"

import { DitherAvatar, DitherGradient, Sparkline } from "@/components/dither-kit"
import { matrixFrameworkById } from "@/data/content"
import { Reveal } from "./reveal"

const pd = matrixFrameworkById.PD
const vs = matrixFrameworkById.VS

/** Intercalary band: the fitness ≠ rewrite-safe punch, dither-forward. */
export function Contrast() {
  return (
    <section
      id="contrast"
      className="relative overflow-hidden border-y border-white/8"
    >
      <DitherGradient
        from="orange"
        to="transparent"
        direction="right"
        cell={2}
        opacity={0.35}
        bloom="low"
        className="pointer-events-none absolute inset-0"
      />
      <div className="absolute inset-0 bg-[#050505]/75" />

      <div className="relative mx-auto max-w-[960px] px-5 py-16 md:px-10 md:py-20">
        <Reveal>
          <p className="font-data text-[10px] uppercase tracking-[0.2em] text-accent">
            Key split
          </p>
          <h2 className="mt-3 max-w-[22ch] font-display text-2xl font-semibold tracking-tight md:text-3xl">
            High AFFIX does not mean low rewrite hazard
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="border border-white/12 bg-black/40 p-5 md:p-6">
            <div className="flex items-center gap-3">
              <DitherAvatar
                name={pd.framework}
                hue={28}
                bloom="low"
                className="size-10 rounded-sm"
              />
              <div>
                <p className="font-display text-lg font-semibold">{pd.framework}</p>
                <p className="font-data text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                  Rewrite-safe leader
                </p>
              </div>
            </div>
            <dl className="mt-6 grid grid-cols-2 gap-4 font-data">
              <div>
                <dt className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                  AFFIX
                </dt>
                <dd className="mt-1 text-3xl font-semibold tabular-nums text-accent">
                  {pd.AFFIX.toFixed(1)}
                </dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                  RHS ↓
                </dt>
                <dd className="mt-1 text-3xl font-semibold tabular-nums text-emerald-400">
                  {pd.RHS.toFixed(1)}
                </dd>
              </div>
            </dl>
            <div className="mt-5 h-10">
              <Sparkline
                data={[pd.AFFIX, 100 - pd.RHS, pd.PH, pd.DX]}
                color="orange"
                variant="gradient"
                bloom="low"
                className="h-full w-full"
              />
            </div>
          </div>

          <div className="border border-white/12 bg-black/40 p-5 md:p-6">
            <div className="flex items-center gap-3">
              <DitherAvatar
                name={vs.framework}
                hue={12}
                bloom="low"
                className="size-10 rounded-sm"
              />
              <div>
                <p className="font-display text-lg font-semibold">{vs.framework}</p>
                <p className="font-data text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                  Fitness without durability
                </p>
              </div>
            </div>
            <dl className="mt-6 grid grid-cols-2 gap-4 font-data">
              <div>
                <dt className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                  AFFIX
                </dt>
                <dd className="mt-1 text-3xl font-semibold tabular-nums text-accent">
                  {vs.AFFIX.toFixed(1)}
                </dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                  RHS ↓
                </dt>
                <dd className="mt-1 text-3xl font-semibold tabular-nums text-rose-400">
                  {vs.RHS.toFixed(1)}
                </dd>
              </div>
            </dl>
            <div className="mt-5 h-10">
              <Sparkline
                data={[vs.AFFIX, 100 - vs.RHS, vs.PH, vs.DX]}
                color="orange"
                variant="gradient"
                bloom="low"
                className="h-full w-full"
              />
            </div>
          </div>
        </div>

        <p className="mt-8 max-w-[48ch] font-data text-[12px] leading-relaxed text-muted-foreground">
          Sole-stack Vercel AI SDK carries RHS {vs.RHS.toFixed(1)} after primary-
          source adjudication. PydanticAI wins both fitness and succession safety.
        </p>
      </div>
    </section>
  )
}
