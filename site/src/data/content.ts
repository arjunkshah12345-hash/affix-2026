import siteContent from "./SITE_CONTENT.json"
import affixMatrix from "./affix_matrix.json"
import failureMatrix from "./FAILURE_MODE_MATRIX.json"

export type DimensionCode =
  | "AF"
  | "CS"
  | "OB"
  | "TC"
  | "EG"
  | "RE"
  | "MF"
  | "PH"
  | "DX"
  | "FP"

export type IndexCode = "LIE" | "CTI" | "FMC" | "GED" | "RACS" | "RHS" | "PR"

export type Dimension = {
  code: DimensionCode
  name: string
  weight: number
  rubric90: string
  rubric60: string
}

export type IndexDef = {
  code: IndexCode
  name: string
  direction: "lower_better" | "higher_better"
  definition: string
}

export type FrameworkScores = {
  AF: number
  CS: number
  OB: number
  TC: number
  EG: number
  RE: number
  MF: number
  PH: number
  DX: number
  FP: number
  AFFIX: number
  LIE: number
  CTI: number
  FMC: number
  GED: number
  RACS: number
  RHS: number
  PR: number
}

export type FrameworkPrimitives = {
  hitl: string
  checkpoint: string
  stream: string
  structured: string
  obs: string
  multiAgent: string
  mcp: string
}

export type SiteFramework = {
  id: string
  name: string
  oneLiner: string
  bestFor: string
  notFor: string
  versions: Record<string, string>
  primitives: FrameworkPrimitives
  scores: FrameworkScores
  citations: string[]
}

export type Finding = {
  n: number
  title: string
  body: string
  evidence: string
  falsifier: string
}

export type Persona = {
  id: string
  name: string
  pick: string
  alt: string
  avoid: string
  note: string
}

export type Comparison = {
  title: string
  leftId: string
  rightId: string
  verdict: string
  bullets: string[]
}

export type FailureCoverage =
  | "first_class"
  | "pattern"
  | "absent"
  | "unknown"

export type FailureMode = {
  code: string
  name: string
  why?: string
}

export type FailureEvidence = {
  coverage: FailureCoverage
  api?: string
  evidence_url?: string
  note?: string
}

export type FailureFramework = {
  id: string
  name: string
  FMC: number
  cells: Record<string, FailureCoverage>
  evidence?: Record<string, FailureEvidence>
  notes: string
}

export type MatrixFramework = {
  id: string
  framework: string
  primary_lang: string
  category: string
  AFFIX: number
  RHS: number
  LIE: number
  CTI: number
  FMC: number
  GED: number
  RACS: number
  PR: number
  AF: number
  CS: number
  OB: number
  TC: number
  EG: number
  RE: number
  MF: number
  PH: number
  DX: number
  FP: number
  PR_components_EST?: {
    MCP_client: number
    MCP_server: number
    A2A_or_equiv: number
    OpenAPI_tool_bridge: number
    OTel_GenAI_portable: number
  }
}

export const content = siteContent as unknown as {
  study: string
  as_of: string
  methodology: {
    overview: string
    dimensions: Dimension[]
    indices: IndexDef[]
  }
  findings: Finding[]
  personas: Persona[]
  frameworks: SiteFramework[]
  comparisons: Comparison[]
}

export const matrix = affixMatrix as unknown as {
  study: string
  as_of: string
  weights: Record<DimensionCode, number>
  formulas: Record<string, string>
  frameworks: MatrixFramework[]
}

export const failures = failureMatrix as unknown as {
  study: string
  as_of: string
  legend: Record<FailureCoverage, string>
  modes: FailureMode[]
  frameworks: FailureFramework[]
}

export const study = content.study
export const asOf = content.as_of
export const methodology = content.methodology
export const dimensions = content.methodology.dimensions
export const indices = content.methodology.indices
export const findings = content.findings
export const personas = content.personas
export const siteFrameworks = content.frameworks
export const comparisons = content.comparisons
export const formulas = matrix.formulas
export const weights = matrix.weights
export const failureModes = failures.modes
export const failureLegend = failures.legend
export const failureFrameworks = failures.frameworks

/** Score rows from affix_matrix, sorted by AFFIX desc */
export const frameworks: MatrixFramework[] = [...matrix.frameworks].sort(
  (a, b) => b.AFFIX - a.AFFIX
)

export const siteFrameworkById = Object.fromEntries(
  siteFrameworks.map((f) => [f.id, f])
) as Record<string, SiteFramework>

export const matrixFrameworkById = Object.fromEntries(
  frameworks.map((f) => [f.id, f])
) as Record<string, MatrixFramework>

export const leader = frameworks[0]
export const safest = [...frameworks].sort((a, b) => a.RHS - b.RHS)[0]
export const bestControl = [...frameworks].sort((a, b) => b.CS - a.CS)[0]
export const bestRacs = [...frameworks].sort((a, b) => b.RACS - a.RACS)[0]

export const DIMENSION_KEYS: DimensionCode[] = [
  "AF",
  "CS",
  "OB",
  "TC",
  "EG",
  "RE",
  "MF",
  "PH",
  "DX",
  "FP",
]

export function getSiteFramework(id: string): SiteFramework | undefined {
  return siteFrameworkById[id]
}

export function getComparison(leftId: string, rightId: string): Comparison | undefined {
  return comparisons.find(
    (c) =>
      (c.leftId === leftId && c.rightId === rightId) ||
      (c.leftId === rightId && c.rightId === leftId)
  )
}

/** RHS term breakdown for worked examples (matches published formula). */
export function rhsTerms(f: Pick<FrameworkScores, "RACS" | "FMC" | "CTI" | "DX" | "PH">) {
  const t1 = 0.28 * (100 - f.RACS)
  const t2 = 0.22 * (100 - f.FMC)
  const t3 = 0.18 * f.CTI
  const t4 = 0.17 * Math.max(0, f.DX - f.PH)
  const t5 = 0.15 * (100 - f.PH)
  const total = Math.min(100, Math.max(0, t1 + t2 + t3 + t4 + t5))
  return {
    racsGap: round1(t1),
    fmcGap: round1(t2),
    cti: round1(t3),
    dxPh: round1(t4),
    phGap: round1(t5),
    total: round1(total),
  }
}

export function prTerms(components: NonNullable<MatrixFramework["PR_components_EST"]>) {
  const t1 = 0.3 * components.MCP_client
  const t2 = 0.15 * components.MCP_server
  const t3 = 0.25 * components.A2A_or_equiv
  const t4 = 0.15 * components.OpenAPI_tool_bridge
  const t5 = 0.15 * components.OTel_GenAI_portable
  return {
    mcpClient: round1(t1),
    mcpServer: round1(t2),
    a2a: round1(t3),
    openapi: round1(t4),
    otel: round1(t5),
    total: round1(t1 + t2 + t3 + t4 + t5),
  }
}

function round1(n: number) {
  return Math.round(n * 10) / 10
}

/** Generate head-to-head bullets when no curated comparison exists. */
export function generateComparison(
  left: MatrixFramework,
  right: MatrixFramework
): { verdict: string; bullets: string[] } {
  const affixLead = left.AFFIX >= right.AFFIX ? left : right
  const affixTrail = affixLead.id === left.id ? right : left
  const rhsLead = left.RHS <= right.RHS ? left : right
  const dims: DimensionCode[] = ["CS", "TC", "OB", "PH", "DX", "MF"]
  const wins: string[] = []
  for (const d of dims) {
    const lv = left[d]
    const rv = right[d]
    if (Math.abs(lv - rv) < 3) continue
    wins.push(
      lv > rv
        ? `${left.framework} leads ${d} (${lv} vs ${rv}).`
        : `${right.framework} leads ${d} (${rv} vs ${lv}).`
    )
  }
  return {
    verdict: `${affixLead.framework} leads AFFIX (${affixLead.AFFIX.toFixed(1)} vs ${affixTrail.AFFIX.toFixed(1)}); ${rhsLead.framework} is safer on rewrite hazard (RHS ${rhsLead.RHS.toFixed(1)}).`,
    bullets: [
      `AFFIX ${left.id} ${left.AFFIX.toFixed(1)} vs ${right.id} ${right.AFFIX.toFixed(1)}; RHS ${left.RHS.toFixed(1)} vs ${right.RHS.toFixed(1)}.`,
      `LIE ${left.LIE} vs ${right.LIE}; FMC ${left.FMC} vs ${right.FMC}; RACS ${left.RACS} vs ${right.RACS}.`,
      ...wins.slice(0, 2),
    ].slice(0, 3),
  }
}
