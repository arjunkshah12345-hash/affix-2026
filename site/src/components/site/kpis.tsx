import { asOf, frameworks, leader, safest } from "@/data/content"
import { Reveal, SectionLabel } from "./reveal"

const items = [
  { k: "Frameworks", v: String(frameworks.length) },
  { k: "Leading AFFIX", v: leader.AFFIX.toFixed(1), s: leader.framework },
  { k: "Lowest RHS", v: safest.RHS.toFixed(1), s: safest.framework },
  { k: "Study date", v: asOf },
]

export function Kpis() {
  return (
    <section className="border-y border-foreground/10 bg-[var(--paper-deep)]/60 py-12 md:py-14">
      <div className="mx-auto max-w-[1120px] px-5 md:px-8">
        <Reveal>
          <SectionLabel>Study snapshot</SectionLabel>
          <dl className="mt-8 grid grid-cols-2 gap-x-8 gap-y-8 md:grid-cols-4">
            {items.map((item) => (
              <div key={item.k}>
                <dt className="font-data text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                  {item.k}
                </dt>
                <dd className="mt-2 font-display text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                  {item.v}
                </dd>
                {"s" in item && item.s ? (
                  <p className="mt-1 text-sm text-muted-foreground">{item.s}</p>
                ) : null}
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  )
}
