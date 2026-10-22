"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import { AnimatePresence, motion } from "motion/react"
import { DitherAvatar, DitherButton, DitherGradient } from "@/components/dither-kit"
import {
  getSiteFramework,
  matrixFrameworkById,
  type SiteFramework,
} from "@/data/content"
import { cn } from "@/lib/utils"

type FrameworkDetailContextValue = {
  openId: string | null
  open: (id: string) => void
  close: () => void
}

const FrameworkDetailContext = createContext<FrameworkDetailContextValue | null>(
  null
)

export function FrameworkDetailProvider({ children }: { children: ReactNode }) {
  const [openId, setOpenId] = useState<string | null>(null)
  const open = useCallback((id: string) => setOpenId(id), [])
  const close = useCallback(() => setOpenId(null), [])
  const value = useMemo(() => ({ openId, open, close }), [openId, open, close])

  return (
    <FrameworkDetailContext.Provider value={value}>
      {children}
      <FrameworkDetailDrawer />
    </FrameworkDetailContext.Provider>
  )
}

export function useFrameworkDetail() {
  const ctx = useContext(FrameworkDetailContext)
  if (!ctx) {
    throw new Error("useFrameworkDetail must be used within FrameworkDetailProvider")
  }
  return ctx
}

const PRIMITIVE_LABELS: { key: keyof SiteFramework["primitives"]; label: string }[] =
  [
    { key: "hitl", label: "HITL" },
    { key: "checkpoint", label: "Checkpoint" },
    { key: "stream", label: "Stream" },
    { key: "structured", label: "Structured" },
    { key: "obs", label: "Observability" },
    { key: "multiAgent", label: "Multi-agent" },
    { key: "mcp", label: "MCP" },
  ]

const SCORE_KEYS = [
  "AFFIX",
  "RHS",
  "LIE",
  "CTI",
  "FMC",
  "GED",
  "RACS",
  "PR",
] as const

/** Full-viewport dossier — covers the rail stage so it never sits under the left ink. */
function FrameworkDetailDrawer() {
  const { openId, close } = useFrameworkDetail()
  const fw = openId ? getSiteFramework(openId) : undefined
  const matrix = openId ? matrixFrameworkById[openId] : undefined

  useEffect(() => {
    if (!openId) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
    }
    document.addEventListener("keydown", onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = prev
    }
  }, [openId, close])

  return (
    <AnimatePresence>
      {openId && fw && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="fw-detail-title"
          className="fixed inset-0 z-[80] flex flex-col bg-[#050505]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28 }}
        >
          <DitherGradient
            from="orange"
            to="transparent"
            direction="down"
            cell={2}
            opacity={0.18}
            bloom="low"
            className="pointer-events-none absolute inset-x-0 top-0 h-48"
          />

          <div className="relative flex items-start justify-between gap-4 border-b border-white/8 px-5 py-5 md:px-10">
            <div className="flex items-start gap-3">
              <DitherAvatar
                name={fw.id}
                hue={24}
                bloom="low"
                className="mt-0.5 size-10 shrink-0 rounded-sm"
              />
              <div>
                <p className="font-data text-[10px] uppercase tracking-[0.14em] text-accent">
                  Dossier · {fw.id}
                  {matrix ? ` · ${matrix.primary_lang}` : ""}
                </p>
                <h2
                  id="fw-detail-title"
                  className="mt-1 font-display text-2xl font-semibold tracking-tight md:text-3xl"
                >
                  {fw.name}
                </h2>
              </div>
            </div>
            <DitherButton
              type="button"
              color="orange"
              variant="hatched"
              bloom="low"
              onClick={close}
              className="h-9 shrink-0 rounded-md px-3 font-data text-[11px] uppercase tracking-[0.14em] text-white"
            >
              Close
            </DitherButton>
          </div>

          <div className="relative flex-1 overflow-y-auto">
            <div className="mx-auto max-w-[960px] px-5 py-8 md:px-10 md:py-10">
              <p className="max-w-[52ch] text-[15px] leading-relaxed text-foreground md:text-base">
                {fw.oneLiner}
              </p>

              <dl className="mt-10 grid gap-8 sm:grid-cols-2">
                <div>
                  <dt className="font-data text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                    Best for
                  </dt>
                  <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {fw.bestFor}
                  </dd>
                </div>
                <div>
                  <dt className="font-data text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                    Not for
                  </dt>
                  <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {fw.notFor}
                  </dd>
                </div>
              </dl>

              <div className="mt-10">
                <p className="font-data text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                  Version pins
                </p>
                <ul className="mt-3 space-y-1.5">
                  {Object.entries(fw.versions).map(([k, v]) => (
                    <li key={k} className="font-data text-[12px] text-foreground/85">
                      <span className="text-muted-foreground">{k}:</span> {v}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-10">
                <p className="font-data text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                  Key scores
                </p>
                <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-8">
                  {SCORE_KEYS.map((key) => (
                    <div
                      key={key}
                      className="border border-white/8 bg-white/[0.02] px-2 py-2 text-center"
                    >
                      <p className="font-data text-[9px] uppercase tracking-[0.12em] text-muted-foreground">
                        {key}
                      </p>
                      <p
                        className={cn(
                          "mt-1 font-data text-sm tabular-nums",
                          key === "AFFIX" || key === "PR"
                            ? "text-accent"
                            : "text-foreground"
                        )}
                      >
                        {typeof fw.scores[key] === "number"
                          ? Number.isInteger(fw.scores[key])
                            ? fw.scores[key]
                            : fw.scores[key].toFixed(1)
                          : fw.scores[key]}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-10">
                <p className="font-data text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                  Primitives
                </p>
                <div className="mt-3 divide-y divide-white/8 border-y border-white/8">
                  {PRIMITIVE_LABELS.map(({ key, label }) => (
                    <div
                      key={key}
                      className="grid grid-cols-[7rem_1fr] gap-3 py-3 md:grid-cols-[8rem_1fr]"
                    >
                      <span className="font-data text-[10px] uppercase tracking-[0.14em] text-accent">
                        {label}
                      </span>
                      <span className="text-[13px] leading-relaxed text-muted-foreground">
                        {fw.primitives[key]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-10 pb-12">
                <p className="font-data text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                  Citations
                </p>
                <ul className="mt-3 space-y-2">
                  {fw.citations.map((url) => (
                    <li key={url}>
                      <a
                        href={url}
                        target="_blank"
                        rel="noreferrer"
                        className="break-all font-data text-[11px] text-foreground/70 underline-offset-4 transition hover:text-accent hover:underline"
                      >
                        {url.replace(/^https?:\/\//, "")}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
