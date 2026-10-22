# AFFIX-2026 Publish Changelog

## 2026-10-22 — Primary-source adjudication (postable pass)

### Score changes (adjudicated)

| Framework | Change | Why |
|-----------|--------|-----|
| OA | LIE 55 → **58** | LiteLLM best-effort beta; Traces default OpenAI |
| MA | OB 88 → **84**; LIE 32 → **35** | Platform exporter gravity in `@mastra/observability` |
| VS | PH 68 → **65**; FMC 55 → **52**; RHS → **34.5** | ToolLoopAgent in-memory; durability in companion package |
| LI | PH 78 → **72**; FMC 72 → **68**; RHS → **27.1** | Docs: no built-in checkpointer |
| PD / AD / LG / MS | **Keep** | Audit confirms prior scores |

### New artifacts

- `benchmark/deep/PRIMARY_SOURCE_AUDIT.md`
- `benchmark/deep/fmc_evidence.md` (IDE vacuum, HIT/DUR asymmetries)
- Failure matrix upgraded to `first_class` / `pattern` / `absent` / `unknown` with evidence URLs
- Findings H1–H5 + site findings 13–17
- Site: Brief + Limitations sections for share-ready honesty


## 2026-10-22 — Public deepening pass

### Scores (`benchmark/scores/affix_matrix.json`)

- **No dimension/AFFIX/RHS rescores.** Formula verification: all 16 RHS values match the closed form within rounding (±0.1).
- **Evidence refresh (not a rescore):** Vercel AI SDK pin updated to **ai@7.0.148**. AI SDK 7 introduces `WorkflowAgent` in `@ai-sdk/workflow` (replacing Workflow DevKit `DurableAgent`) and stabilizes `telemetry` / `toolApproval`. HIT/DUR for **sole-stack** VS remain `partial` because durability still requires the workflow companion — PH=68 / FMC=55 retained.
- Added `versions_pinned`, `api_primitives`, and expanded `citations` on matrix framework objects for publish consumers.
- `as_of` → 2026-10-22 with `publish_refresh` note.

### Dossiers (`benchmark/dossiers/`)

- Deepened all Tier-A dossiers (LC, LG, LI, HS, SK, AG, CR, OA, VS, PD, DS, MA, SM, AD, SP) with:
  - Explicit API primitives (HITL, checkpoint, stream, structured, obs/evals, multi-agent, MCP)
  - “When NOT to use” guidance
  - Version pins from PyPI/npm/Maven as of 2026-10-22
  - 5–8 hard primary-source citations
- Added **MS** dossier (Microsoft Agent Framework) previously matrix-only.

### New publish artifacts (`benchmark/publish/`)

- `METHODOLOGY_FULL.md` — full rubrics (90 vs 60), RHS/PR formulas, worked examples for PD and VS
- `FAILURE_MODE_MATRIX.md` + `.json` — 12 modes × 16 frameworks
- `CITATIONS.md` — bibliography
- `SITE_CONTENT.json` — website-structured content pack
- `CHANGELOG.md` — this file

### Intentional non-changes

- Spot-checks (IN, LW) remain contextual, not full AFFIX rows.
- DS PR remains 49 (component EST); findings narrative “weakest PR” unchanged.
