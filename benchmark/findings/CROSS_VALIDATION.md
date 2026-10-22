# AFFIX-2026 Cross-Validation vs Independent Comparisons

**Sources fetched 2026-10-21:**
- [Speakeasy framework comparison](https://www.speakeasy.com/blog/ai-agent-framework-comparison) (2026-03-04)
- [Langfuse open-source agent frameworks](https://langfuse.com/blog/2025-03-19-ai-agent-comparison) (updated 2026-07-13)
- [TypeScript AI agent stack](https://www.developersdigest.tech/blog/typescript-ai-agent-stack-2026) (updated 2026-10-18)

**Primary-source hardening 2026-10-22:** Official docs audit in `benchmark/deep/PRIMARY_SOURCE_AUDIT.md` (TinyFish fetch; vendor docs only).

## Where AFFIX agrees with the market narrative

| Claim | Speakeasy / Langfuse / DevDigest | AFFIX |
|-------|----------------------------------|-------|
| PydanticAI wins typed Python DX | Speakeasy: Nextbuild DX 8/10 vs LC 5/10; Langfuse: strongest type-safe Python | PD #1 AFFIX, lowest RHS (17.3) |
| LangGraph = control/durable HITL | Speakeasy + Langfuse default for stateful | LG best CS (95), FMC (90), PH (93) |
| Mastra = TS agent OS; VS = UI layer | Speakeasy + DevDigest compose story | MA RHS 20.8; VS RHS 32.9 alone |
| Skip frameworks for linear tool loops | Speakeasy opening advice | Architecture deep dive finding #6 |
| Microsoft Agent Framework supersedes SK/AutoGen | Langfuse maintenance-mode note | MS RHS 19.4 vs SK succession tax |

## Where AFFIX is proprietary / diverges

1. **RHS (Rewrite Hazard)** — Public comparisons rank “best framework”; AFFIX ranks *12-month outgrow risk*. Explains why VS can be “best DX” and still high-hazard as a sole agent OS.
2. **LIE as ops gravity** — Speakeasy notes OA hosted-tool lock-in; AFFIX generalizes to Traces/Sandbox/sessions and scores OA LIE=55 despite LiteLLM claims.
3. **DX−PH cliff** — Quantifies Speakeasy’s CrewAI “prototype≠production” and VS timeout ceilings as a single predictor.
4. **RACS continuum** — LlamaIndex/Haystack win document→agent evolution even when they lose “agent framework” popularity contests.
5. **Topology false friends** — Explicit falsifiable claim that OA handoffs ≠ AG2 GroupChat ≠ Crew hierarchical (missing from most roundups).

## Gaps to note (not scored as Tier-A in AFFIX)

Langfuse also covers Claude Agent SDK, Strands (AWS), Agno, DeepAgents, n8n, Vellum — candidates for AFFIX-2026.1 expansion.

---

## Primary-source agreements (dossiers ↔ official docs, 2026-10-22)

| Framework | Dossier claim | Official docs verdict |
|-----------|---------------|----------------------|
| **PD** | Durable engines + Logfire/OTel → RHS 17.3 | **AGREE** — eight named engines; OTel without Logfire documented |
| **OA** | Ops gravity (Traces/Sessions/Sandbox) → LIE 55 | **AGREE / STRENGTHEN** — default OpenAI trace export; LiteLLM “best-effort, beta”; Sandbox first-class |
| **AD** | PR 96 via MCP + A2A + OTel | **AGREE** — A2A expose/consume; `McpToolset` + `to_mcp_server`; OTel GenAI/OTLP |
| **MA** | TS agent OS (workflows/memory/HITL) | **AGREE** — suspend/resume, memory scopes, HITL approval/`suspend()` |
| **LG** | interrupt + checkpointer; RACS weak | **AGREE** — `interrupt()` + PostgresSaver; overview is state/memory, not RAG continuum |
| **VS** | Telemetry yes; sole-stack OS no | **AGREE** — `@ai-sdk/otel`; `ToolLoopAgent` in-memory; `WorkflowAgent` in `@ai-sdk/workflow` |
| **LI** | RACS champion; durable workflows | **PARTIAL** — HITL + RAG continuum hold; durable page says **no built-in checkpointer** |
| **MS** | SK succession; MAF greenfield | **AGREE** — “direct successor” language; SK orchestration packages `--prerelease` |

## Disputes (dossiers overstated vs primary sources)

| ID | Dispute | Severity | Resolution |
|----|---------|----------|------------|
| **LI PH/FMC** | Dossier implies durable workflows at PH≈78 / FMC≈72; official durable docs require DIY checkpoint loop or optional DBOS | High | **Lower PH 78→72, FMC 72→68**; RHS 24.3→**~27.1** |
| **VS PH/FMC** | AI SDK 7 marketing mentions durable agents; sole-package `ai` still non-durable by docs | Medium | **Lower PH 68→65, FMC 55→52**; RHS 32.9→**~34.5** |
| **OA LIE** | LIE 55 already high; docs show LiteLLM beta + default OpenAI traces — understated slightly | Medium | **Raise LIE 55→58** |
| **MA OB/LIE** | OB 88 reads as core-native; `@mastra/observability` + Platform exporter are companion/hosted gravity | Low–Med | **OB 88→84, LIE 32→35** |
| **PD / AD / LG / MS** | No material API invention found; named primitives match dossiers | — | **Keep scores** |

## Final adjudicated score changes

Status: **RECOMMENDED — apply to `affix_matrix.json` on next publish refresh** (not auto-written here to keep audit trail explicit).

| ID | Field | Prior | Adjudicated | Notes |
|----|-------|------:|------------:|-------|
| OA | LIE | 55 | **58** | Ops gravity strengthened |
| MA | OB | 88 | **84** | Companion observability package |
| MA | LIE | 32 | **35** | Platform exporter gravity |
| MA | AFFIX | 82.49 | **~82.05** | OB weight 0.11 × (−4) ≈ −0.44 |
| VS | PH | 68 | **65** | Sole-stack durability honesty |
| VS | FMC | 55 | **52** | Crash-loss default agent loop |
| VS | RHS | 32.9 | **~34.5** | Formula recompute |
| VS | AFFIX | 81.52 | **~81.22** | PH weight 0.10 × (−3) ≈ −0.30 |
| LI | PH | 78 | **72** | No built-in checkpointer |
| LI | FMC | 72 | **68** | DUR DIY |
| LI | RHS | 24.3 | **~27.1** | Formula recompute |
| LI | AFFIX | 78.61 | **~78.01** | PH −6 × 0.10 = −0.60 |
| PD | all | — | **unchanged** | RHS 17.3 stands |
| AD | PR | 96 | **unchanged** | |
| LG | RACS/CS/PH/RHS | — | **unchanged** | |
| MS | AFFIX/RHS | — | **unchanged** | Succession claim confirmed |

### Rank-order impact (if applied)

- **VS** moves deeper into high-hazard band (RHS ~34.5), widening the “UI king / OS debt” finding vs MA.
- **LI** RHS rises above OA (~27.1 vs 24.2) — continuum excellence no longer looks rewrite-safer than OpenAI Agents SDK.
- **PD** remains sole AFFIX+RHS dual leader; primary sources reinforce, not inflate.
- **OA LIE** becomes clearly 2nd-worst ops gravity after LC/LG checkpoint gravity (LIE still below LC/LG).

## Falsifiers for this adjudication

1. If LlamaIndex ships a default first-party `BaseCheckpointSaver`-class API without DBOS/DIY loop → restore LI PH/FMC.
2. If `WorkflowAgent` merges into core `ai` with durable defaults → restore VS PH/FMC.
3. If OA ships OTel-native default export (no OpenAI Traces unless opted in) and GA LiteLLM → lower OA LIE.
4. If Mastra core emits OTel GenAI spans with no `@mastra/observability` install → restore MA OB.
