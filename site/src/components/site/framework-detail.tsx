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
        <>
          <motion.button
            type="button"
            aria-label="Close framework detail"
            className="fixed inset-0 z-[60] bg-foreground/25 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={close}
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-labelledby="fw-detail-title"
            className="fixed inset-y-0 right-0 z-[70] flex w-full max-w-[480px] flex-col border-l border-foreground/12 bg-background shadow-xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-start justify-between gap-4 border-b border-foreground/10 px-6 py-5">
              <div>
                <p className="font-data text-[10px] uppercase tracking-[0.14em] text-accent">
                  {fw.id}
                  {matrix ? ` · ${matrix.primary_lang}` : ""}
                </p>
                <h2
                  id="fw-detail-title"
                  className="mt-1 font-display text-2xl font-semibold tracking-tight"
                >
                  {fw.name}
                </h2>
              </div>
              <button
                type="button"
                onClick={close}
                className="font-data text-[11px] uppercase tracking-[0.14em] text-muted-foreground transition hover:text-foreground"
              >
                Close
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6">
              <p className="text-[15px] leading-relaxed text-foreground">
                {fw.oneLiner}
              </p>

              <dl className="mt-8 space-y-5">
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

              <div className="mt-8">
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

              <div className="mt-8">
                <p className="font-data text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                  Key scores
                </p>
                <div className="mt-3 grid grid-cols-4 gap-2">
                  {SCORE_KEYS.map((key) => (
                    <div
                      key={key}
                      className="border border-foreground/10 px-2 py-2 text-center"
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

              <div className="mt-8">
                <p className="font-data text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                  Primitives
                </p>
                <div className="mt-3 divide-y divide-foreground/10 border-y border-foreground/10">
                  {PRIMITIVE_LABELS.map(({ key, label }) => (
                    <div key={key} className="grid grid-cols-[7rem_1fr] gap-3 py-3">
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

              <div className="mt-8 pb-8">
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
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
