# AFFIX-2026 — Full Methodology (Public)

**Study ID:** AFFIX-2026 (Agent Framework Fitness Index eXtended)  
**As of:** 2026-10-21 (evidence refresh 2026-10-22)  
**Scope:** Production-relevant LLM / agent *application* frameworks — not model weights, not pure gateways (except contextual spot-checks).

This document is the publishable scoring specification. Scores are **EST** from primary docs and API reality unless marked otherwise. Marketing claims never override named APIs.

---

## 1. Framework universe

### Tier A (deep-scored)

| ID | Framework | Primary lang | Category |
|----|-----------|--------------|----------|
| LC | LangChain | Python/TS | Orchestration + tools |
| LG | LangGraph | Python/TS | Stateful graphs / agents |
| LI | LlamaIndex | Python/TS | RAG / data agents |
| HS | Haystack | Python | Pipelines / RAG |
| SK | Semantic Kernel | C#/Python/Java | Enterprise agents (succession) |
| AG | AutoGen / AG2 | Python | Multi-agent |
| CR | CrewAI | Python | Role-based crews |
| OA | OpenAI Agents SDK | Python (+ JS) | Agent runtime |
| VS | Vercel AI SDK | TypeScript | App-layer AI |
| PD | PydanticAI | Python | Typed agents |
| DS | DSPy | Python | Programmatic prompting |
| MA | Mastra | TypeScript | TS agent platform |
| SM | Hugging Face smolagents | Python | Code-act agents |
| AD | Google ADK | Python/TS/Go/Java/Kotlin | Google agent kit |
| MS | Microsoft Agent Framework | Python/.NET | Enterprise (SK/AutoGen successor) |
| SP | Spring AI | Java | JVM enterprise |

### Contextual / spot (not full AFFIX tables)

LiteLLM (LW), Inngest AgentKit (IN), ElizaOS (EL), txtai/HA — used for continuum and durability comparisons only.

---

## 2. Evidence rules

1. Prefer primary docs, GitHub, release notes, official examples (2025–2026).
2. Cite a URL for every non-obvious scoring claim.
3. Distinguish marketing (“production-ready”) from **named API primitives**.
4. Flag uncertainty (`EST`, `uncertainty_flags` in dossiers).
5. Do not invent latency/cost microbenchmarks; runtime economics are shape estimates from streaming/concurrency docs + deploy surface.

**Falsifier for the evidence process:** Independent auditor using the same rubric and pin date should land within ±8 points on any dimension and ±5 on AFFIX composite.

---

## 3. AFFIX composite

Each dimension is scored **0–100**. Weights sum to **1.0**.

\[
\mathrm{AFFIX} = \sum_d (\mathrm{score}_d \times w_d)
\]

| Code | Dimension | Weight | What we measure |
|------|-----------|-------:|-----------------|
| AF | Abstraction Fit | 0.14 | Right primitives for real agent/RAG jobs without leaky abstractions |
| CS | Control Surface | 0.13 | Determinism knobs, interrupts, HITL, retries, state |
| OB | Observability | 0.11 | Traces, spans, token/cost, replay, eval hooks |
| TC | Type & Contract Safety | 0.10 | Schemas, structured I/O, compile-time / static guarantees |
| EG | Ecosystem Gravity | 0.10 | Integrations, community, examples, hiring market |
| RE | Runtime Economics | 0.09 | Overhead, streaming, concurrency, deploy cost shape |
| MF | Migration Friction | 0.08 | Lock-in, portability of graphs/prompts/tools |
| PH | Production Hardening | 0.10 | Auth, secrets, timeouts, idempotency, durable execution |
| DX | DX Velocity | 0.09 | Time-to-first-agent, docs quality, local ergonomics |
| FP | Future-Proofing | 0.06 | Protocol alignment (MCP, A2A), model-agnosticism |

---

## 4. Dimension rubrics (what earns ~90 vs ~60)

### AF — Abstraction Fit (w=0.14)

| Band | Criteria |
|------|----------|
| **~90** | Primitives match the job class (graph / typed agent / RAG pipeline / UI stream) with minimal glue; docs show the happy path *and* the escape hatch; few “use another product for the core loop” caveats. |
| **~60** | Usable but misfit: e.g. chat-SDK used as durable OS, or optimizer used as serve runtime; frequent DIY for core patterns; abstractions leak into provider-specific code. |

### CS — Control Surface (w=0.13)

| Band | Criteria |
|------|----------|
| **~90** | First-class mid-run interrupt + durable resume; explicit state model; retries/timeouts as APIs; branch/join or equivalent control flow. Example: LangGraph `interrupt()` + checkpointer + `Command`. |
| **~60** | Tool-loop only; HITL is “ask human via tool” without persistence; limited concurrency control; pause does not survive process death. |

### OB — Observability (w=0.11)

| Band | Criteria |
|------|----------|
| **~90** | Portable traces (OTel GenAI or equivalent), token/cost hooks, eval/trajectory scoring, failed-run replay path documented. |
| **~60** | `console.log` / vendor-only UI; no span export; evals are blog posts not APIs. |

### TC — Type & Contract Safety (w=0.10)

| Band | Criteria |
|------|----------|
| **~90** | Structured output + tool args validated end-to-end; static types (TS/Python generics/JVM) catch wiring bugs before run; schema repair / retry on violation. |
| **~60** | `dict`/`any` pipelines; structured mode optional and fragile; validation left to the model. |

### EG — Ecosystem Gravity (w=0.10)

| Band | Criteria |
|------|----------|
| **~90** | Dense integrations, hiring market, example corpus, active community; stack is a default in its language niche. |
| **~60** | Niche or young; works but hiring/examples thin; gravity concentrated in one cloud. |

### RE — Runtime Economics (w=0.09)

| Band | Criteria |
|------|----------|
| **~90** | Streaming first-class; low orchestration tax; clear concurrency model; deploy shape fits serverless or thin services. |
| **~60** | Heavy multi-agent chatter defaults; weak streaming; orchestration dominates token cost. |

### MF — Migration Friction (w=0.08)

| Band | Criteria |
|------|----------|
| **~90** | Prompts/tools/graphs portable; open checkpoint or easy export; model string swap without rewrite. |
| **~60** | Proprietary graph/checkpoint schemas; hosted ops required for core features; succession tax (framework A → successor B). |

*Note: High MF score = easier migration (less lock-in). Do not confuse with LIE (lower better).*

### PH — Production Hardening (w=0.10)

| Band | Criteria |
|------|----------|
| **~90** | Documented durable execution, timeouts, auth/secrets patterns, idempotency guidance, crash recovery. |
| **~60** | Demo-grade loop; durability via “use Temporal yourself” with no first-party integration; weak timeout/idempotency story. |

### DX — DX Velocity (w=0.09)

| Band | Criteria |
|------|----------|
| **~90** | Mid-level eng ships streamed tool-calling agent in hours; docs match reality; local loop is short. |
| **~60** | Steep concept load; docs lag APIs; “hello agent” requires platform setup. |

### FP — Future-Proofing (w=0.06)

| Band | Criteria |
|------|----------|
| **~90** | First-class MCP (client and preferably server), A2A or documented interop, model-agnostic core, OTel-portable. |
| **~60** | Single-vendor protocol surface; weak MCP/A2A; telemetry locked to one UI. |

---

## 5. Proprietary indices

### Lock-in Entropy (LIE) — lower better

**Definition:** 0–100 estimate of irreversible coupling: vendor ops (traces, sandboxes), proprietary checkpoint formats, cloud-only runtimes, succession traps.  
**Not:** number of `pip` lines.  
**Falsifier:** Production deploy with full feature parity and zero vendor ops for a framework scored LIE≥55 → rescore.

### Cognitive Tax Index (CTI) — lower better

**Definition:** Concepts a mid-level engineer must learn to ship a *reliable* tool-calling agent with eval + tracing.  
**Falsifier:** Timed tutorial study; if measured concept count differs by >15 from CTI, adjust.

### Failure-Mode Coverage (FMC) — higher better

**Definition:** Coverage of the canonical 12 production failure modes with first-class APIs (`F`/`P`/`N` matrix). FMC% is a weighted judgment, not raw `F` count.  
**See:** `FAILURE_MODE_MATRIX.md`.

### Graph Expressiveness Density (GED) — higher better

**Definition:** Useful control-flow patterns (branch, join, map-reduce, interrupt, subgraph, checkpoint) per framework surface — qualitative density score, not LoC scrape.

### RAG-to-Agent Continuum Score (RACS) — higher better

**Definition:** Smoothness of evolution: retrieval pipeline → tool agent → multi-agent / durable without primary rewrite.

### Protocol Readiness (PR) — higher better

\[
\begin{align*}
\mathrm{PR} = &\ 0.30\cdot\mathrm{MCP\_client}
+ 0.15\cdot\mathrm{MCP\_server}
+ 0.25\cdot\mathrm{A2A\_or\_equiv} \\
&+ 0.15\cdot\mathrm{OpenAPI\_tool\_bridge}
+ 0.15\cdot\mathrm{OTel\_GenAI\_portable}
\end{align*}
\]

Each component 0–100 EST from docs checklist.  
**Falsifier:** Independent checklist audit within ±8 of published PR.

### Rewrite Hazard Score (RHS) — lower better

**Definition:** EST probability (×100) that a team *outgrows* the framework within **12 months of production** — i.e., must replace primary orchestration (not just swap models).

\[
\mathrm{RHS} = \mathrm{clamp}_{0}^{100}\Big(
  0.28(100-\mathrm{RACS})
  + 0.22(100-\mathrm{FMC})
  + 0.18\,\mathrm{CTI}
  + 0.17\max(0,\mathrm{DX}-\mathrm{PH})
  + 0.15(100-\mathrm{PH})
\Big)
\]

| Term | Interpretation |
|------|----------------|
| \(100-\mathrm{RACS}\) | Weak continuum → stack replacement |
| \(100-\mathrm{FMC}\) | Missing failure APIs → incident-driven rewrite |
| CTI | High concept load → mid-flight abandonment |
| \(\max(0,\mathrm{DX}-\mathrm{PH})\) | **DX surplus**: ships fast, hardens late |
| \(100-\mathrm{PH}\) | Weak durable/auth/idempotency story |

**Falsifier:** Longitudinal cohort (N≥30 teams/framework); Spearman ρ(RHS, rewrite) should exceed 0.4.

---

## 6. Worked examples — RHS and PR

### 6.1 PydanticAI (PD) — RHS

Inputs from `affix_matrix.json`:

| Index | Value |
|-------|------:|
| RACS | 80 |
| FMC | 78 |
| CTI | 30 |
| DX | 88 |
| PH | 90 |

\[
\begin{align*}
\mathrm{RHS}
&= 0.28(100-80) + 0.22(100-78) + 0.18\cdot 30 + 0.17\max(0,88-90) + 0.15(100-90) \\
&= 0.28\cdot 20 + 0.22\cdot 22 + 5.4 + 0 + 0.15\cdot 10 \\
&= 5.6 + 4.84 + 5.4 + 0 + 1.5 \\
&= 17.34 \approx \mathbf{17.3}
\end{align*}
\]

**Read:** Continuum and FMC are strong; DX ≤ PH (no surplus cliff); hardening debt term small. Lowest RHS in-set.

### 6.2 Vercel AI SDK (VS) — RHS

| Index | Value |
|-------|------:|
| RACS | 65 |
| FMC | 55 |
| CTI | 22 |
| DX | 94 |
| PH | 68 |

\[
\begin{align*}
\mathrm{RHS}
&= 0.28(35) + 0.22(45) + 0.18\cdot 22 + 0.17\max(0,94-68) + 0.15(32) \\
&= 9.8 + 9.9 + 3.96 + 0.17\cdot 26 + 4.8 \\
&= 9.8 + 9.9 + 3.96 + 4.42 + 4.8 \\
&= 32.88 \approx \mathbf{32.9}
\end{align*}
\]

**Read:** Low CTI cannot cancel DX surplus (26) + mid RACS/FMC + PH gap. AFFIX can still rank high (~81.5) while RHS warns against sole-stack production.

### 6.3 PydanticAI (PD) — PR

| Component | EST | Weight | Contribution |
|-----------|----:|-------:|-------------:|
| MCP_client | 95 | 0.30 | 28.5 |
| MCP_server | 85 | 0.15 | 12.75 |
| A2A_or_equiv | 85 | 0.25 | 21.25 |
| OpenAPI_tool_bridge | 90 | 0.15 | 13.5 |
| OTel_GenAI_portable | 98 | 0.15 | 14.7 |
| **PR** | | | **90.7 ≈ 91** |

Evidence anchors: MCP capability (`capabilities=[MCP(...)]`), OTel/`logfire.instrument_pydantic_ai()`, typed tools/OpenAPI-adjacent schemas, durable multi-agent guides ([overview](https://pydantic.dev/docs/ai/overview/), [MCP](https://pydantic.dev/docs/ai/capabilities/mcp/), [Logfire](https://pydantic.dev/docs/ai/integrations/logfire/)).

### 6.4 Vercel AI SDK (VS) — PR

| Component | EST | Weight | Contribution |
|-----------|----:|-------:|-------------:|
| MCP_client | 95 | 0.30 | 28.5 |
| MCP_server | 80 | 0.15 | 12.0 |
| A2A_or_equiv | 75 | 0.25 | 18.75 |
| OpenAPI_tool_bridge | 95 | 0.15 | 14.25 |
| OTel_GenAI_portable | 90 | 0.15 | 13.5 |
| **PR** | | | **87.0** |

Evidence anchors: `createMCPClient` (`@ai-sdk/mcp`), structured `Output.*`, `telemetry` (AI SDK 7), provider-agnostic model strings ([MCP tools](https://ai-sdk.dev/docs/ai-sdk-core/mcp-tools), [telemetry](https://ai-sdk.dev/docs/ai-sdk-core/telemetry), [AI SDK 7](https://vercel.com/changelog/ai-sdk-7)).

---

## 7. Scoring process (reproducibility)

1. Assign Tier-A membership from methodology universe.
2. For each framework, collect ≥5 primary URLs covering HITL, persistence, streaming, structured output, obs/evals, multi-agent, MCP.
3. Score dimensions with rubrics above; write dossier rationale.
4. Score proprietary indices; compute RHS/PR programmatically.
5. Meta-synthesis produces falsifiable findings with cited evidence.
6. Spot-check formulas (this study: RHS verified for all 16 frameworks against the closed form).

---

## 8. What AFFIX is not

- Not a model quality leaderboard.
- Not a popularity contest (EG is one of ten dimensions).
- Not a substitute for compliance review — HITL APIs ≠ audit certification.
- Not frozen: pin dates matter; succession (SK→MS, Classic AG→AG2) changes MF/LIE.

---

## 9. Related artifacts

| Artifact | Path |
|----------|------|
| Score matrix | `benchmark/scores/affix_matrix.json` |
| Failure modes | `benchmark/publish/FAILURE_MODE_MATRIX.md` |
| Citations | `benchmark/publish/CITATIONS.md` |
| Site content | `benchmark/publish/SITE_CONTENT.json` |
| Dossiers | `benchmark/dossiers/` |
| Findings | `benchmark/findings/` |
