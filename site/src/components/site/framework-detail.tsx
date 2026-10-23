"use client"

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import {
  getSiteFramework,
  matrixFrameworkById,
  type SiteFramework,
} from "@/data/content"
import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog"
import { Pill } from "@/components/ui/pill"
import { Separator } from "@/components/ui/separator"

type FrameworkDetailContextValue = {
  openId: string | null
  open: (id: string) => void
  close: () => void
}

const FrameworkDetailContext =
  createContext<FrameworkDetailContextValue | null>(null)

export function FrameworkDetailProvider({ children }: { children: ReactNode }) {
  const [openId, setOpenId] = useState<string | null>(null)
  const open = useCallback((id: string) => setOpenId(id), [])
  const close = useCallback(() => setOpenId(null), [])
  const value = useMemo(() => ({ openId, open, close }), [openId, open, close])

  return (
    <FrameworkDetailContext.Provider value={value}>
      {children}
      <FrameworkDetailDialog />
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

const PRIMITIVE_LABELS: {
  key: keyof SiteFramework["primitives"]
  label: string
}[] = [
  { key: "hitl", label: "HITL" },
  { key: "checkpoint", label: "Checkpoint" },
  { key: "stream", label: "Stream" },
  { key: "structured", label: "Structured" },
  { key: "obs", label: "Observability" },
  { key: "multiAgent", label: "Multi-agent" },
  { key: "mcp", label: "MCP" },
]

function FrameworkDetailDialog() {
  const { openId, close } = useFrameworkDetail()
  const fw = openId ? getSiteFramework(openId) : undefined
  const matrix = openId ? matrixFrameworkById[openId] : undefined

  return (
    <Dialog open={Boolean(openId && fw)} onOpenChange={(v) => !v && close()}>
      {fw ? (
        <DialogContent
          title={fw.name}
          description={fw.oneLiner}
          className="max-h-[85vh] max-w-lg overflow-y-auto"
        >
          <div className="mb-4 flex items-center gap-3">
            <Avatar fallback={fw.id} size="sm" />
            <div className="flex flex-wrap gap-2">
              <Pill tone="neutral">{fw.id}</Pill>
              {matrix ? <Pill tone="sand">{matrix.primary_lang}</Pill> : null}
              <Pill tone="accent">AFFIX {fw.scores.AFFIX.toFixed(1)}</Pill>
              <Pill tone="sage">RHS {fw.scores.RHS.toFixed(1)}</Pill>
            </div>
          </div>

          <dl className="grid gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted">
                Best for
              </dt>
              <dd className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                {fw.bestFor}
              </dd>
            </div>
            <div>
              <dt className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted">
                Not for
              </dt>
              <dd className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                {fw.notFor}
              </dd>
            </div>
          </dl>

          <Separator className="my-5" />

          <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted">
            Primitives
          </p>
          <ul className="mt-3 space-y-2.5">
            {PRIMITIVE_LABELS.map(({ key, label }) => (
              <li key={key} className="grid grid-cols-[6.5rem_1fr] gap-3 text-sm">
                <span className="font-mono text-[11px] text-muted">{label}</span>
                <span className="text-ink-soft">{fw.primitives[key]}</span>
              </li>
            ))}
          </ul>

          <DialogFooter>
            <Button variant="secondary" onClick={close}>
              Close
            </Button>
            {fw.citations[0] ? (
              <Button
                variant="primary"
                onClick={() => window.open(fw.citations[0], "_blank")}
              >
                Primary docs
              </Button>
            ) : null}
          </DialogFooter>
        </DialogContent>
      ) : null}
    </Dialog>
  )
}
