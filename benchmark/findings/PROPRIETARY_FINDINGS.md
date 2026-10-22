# AFFIX-2026 Proprietary Findings

**Study:** AFFIX-2026 · **Role:** Meta-analyst synthesis  
**As of:** 2026-10-21  
**Inputs:** `benchmark/dossiers/*`, `benchmark/clusters/*`, `benchmark/METHODOLOGY.md`, primary docs (2025–2026)  
**Notation:** Scores are **EST** unless cited as measured API facts. Every finding states a falsifiable claim.

---

## Novel indices (defined this study)

### Rewrite Hazard Score (RHS) — lower is better

**Definition:** EST probability (×100) that a team *outgrows* the framework within **12 months of production** — i.e., must replace primary orchestration (not just swap models) due to missing continuum, failure-mode gaps, DX/PH mismatch, or hardening debt.

\[
\mathrm{RHS} = \mathrm{clamp}_{0}^{100}\Big(
  0.28(100-\mathrm{RACS})
  + 0.22(100-\mathrm{FMC})
  + 0.18\,\mathrm{CTI}
  + 0.17\max(0,\mathrm{DX}-\mathrm{PH})
  + 0.15(100-\mathrm{PH})
\Big)
\]

| Term | Why it predicts rewrite |
|------|-------------------------|
| \(100-\mathrm{RACS}\) | Weak RAG→agent→multi-agent path forces stack replacement |
| \(100-\mathrm{FMC}\) | Missing first-class failure APIs → rewrites under incident pressure |
| CTI | High concept load → teams abandon for “simpler” stacks mid-flight |
| \(\max(0,\mathrm{DX}-\mathrm{PH})\) | **DX surplus**: ships fast, hardens late → production cliff |
| \(100-\mathrm{PH}\) | Weak durable/auth/idempotency story |

**Falsifier:** Longitudinal cohort study of N≥30 teams per framework; RHS rank should correlate with “primary orchestration replaced within 12 months” (Spearman ρ > 0.4).

### Protocol Readiness (PR) — higher is better

**Definition:** EST 0–100 readiness for open tool/agent protocols:

| Component | Weight | What counts |
|-----------|-------:|-------------|
| MCP client (tools/resources) | 0.30 | First-class docs + API, not blog-only |
| MCP server / expose tools | 0.15 | App can *host* MCP surface |
| A2A / cross-runtime agents | 0.25 | Documented Agent2Agent or equivalent interop |
| OpenAPI / schema tool bridges | 0.15 | Import OpenAPI as tools or typed contracts |
| OTel GenAI / portable telemetry | 0.15 | Spans exportable without vendor UI |

**Falsifier:** Checklist audit against official docs at pin date; PR within ±8 of independent scorer using same rubric.

---

## Ranked proprietary findings (≥12)

### 1. AFFIX leaders are not rewrite-safe — PydanticAI wins both; Vercel AI SDK does not

**Claim:** Among frameworks with AFFIX ≥ 81, **RHS does not monotonically decrease with AFFIX**. PD (AFFIX 87.64, RHS 17.3) and MA (82.49, RHS 20.8) are rewrite-safe; VS (81.52, RHS **32.9**) is in the high-hazard band with LC/SM.

**Evidence:** Matrix `affix_matrix.json`; VS dossier FMC 55 / PH 68 vs DX 94 ([AI SDK](https://ai-sdk.dev/), [telemetry](https://ai-sdk.dev/docs/ai-sdk-core/telemetry)); PD durable execution + Logfire ([docs](https://pydantic.dev/docs/ai/capabilities/durable_execution/overview/)).

**Falsifier:** If VS production teams show ≤15% primary-stack rewrite rate at 12 months while PD ≥30%, claim fails.

### 2. Counterintuitive: highest Control Surface ≠ lowest Rewrite Hazard

**Claim:** LangGraph CS=95 (best) yet RHS=28.7 — worse than Mastra (20.8), Spring AI (23.0), OpenAI Agents SDK (24.2). Checkpoint power does not cancel RACS gap (62) + CTI (82) + DX–PH inversion (DX 65 < PH 93).

**Evidence:** [LG persistence](https://docs.langchain.com/oss/python/langgraph/persistence), [interrupts](https://docs.langchain.com/oss/python/langgraph/interrupts); dossier LIE 68.

**Falsifier:** If teams starting on LG show lower 12-month rewrite than MA/PD when controlling for multi-agent complexity, claim fails.

### 3. Lock-in Entropy is dominated by *ops gravity*, not `pip` lines

**Claim:** OA advertises LiteLLM/AnyLLM portability ([models](https://openai.github.io/openai-agents-python/models/)) but LIE=55 (2nd-worst after LC/LG). Measured coupling is tracing + sessions + sandbox + Responses defaults — not import statements.

**Evidence:** OA dossier; [tracing](https://openai.github.io/openai-agents-python/tracing/), [sandbox](https://openai.github.io/openai-agents-python/); cluster multi-agent insight #1.

**Falsifier:** Document a production OA deploy with zero OpenAI-hosted ops (no OpenAI traces/sandbox/realtime) and full feature parity; if common, LIE overstated.

### 4. DX surplus (DX − PH > 15) is the strongest single rewrite predictor in-set

**Claim:** Frameworks with DX−PH ≥ 15 map to RHS ≥ 32: VS (26), SM (27), CR (16→RHS 28.4). Frameworks with DX ≤ PH map to RHS ≤ 29 except AG (CTI-driven).

**Evidence:** Score matrix; typed-dx cluster finding on product UI tax ≠ agent OS tax.

**Falsifier:** Regression: if DX−PH coefficient is non-significant (p>0.1) against rewrite outcomes, drop term from RHS.

### 5. Microsoft succession tax is unique — SK AFFIX understates greenfield cost

**Claim:** SK AFFIX 74.73 underprices greenfield risk: orchestration still “experimental” while [Agent Framework](https://learn.microsoft.com/en-us/agent-framework/overview/) is the marketed successor. MS (AFFIX 80.91, RHS 19.4) is the correct greenfield score; SK carries Classic→MAF entropy analogous to AG Classic→v1.

**Evidence:** [SK orchestration](https://learn.microsoft.com/en-us/semantic-kernel/frameworks/agent/agent-orchestration/), [migration guide](https://learn.microsoft.com/en-us/agent-framework/migration-guide/from-semantic-kernel); AG dossier dual-stack.

**Falsifier:** If Microsoft freezes SK orchestration as LTS without MAF migration pressure for 24 months, succession tax claim fails.

### 6. RACS champions are not AFFIX champions — LlamaIndex paradox

**Claim:** LI has best RACS (92) but mid AFFIX (78.61). Continuum excellence does not compensate for LIE 58 (LlamaCloud/Parse gravity) and CTI 70. Teams pick LI for RAG evolution, then pay hiring/lock-in tax elsewhere.

**Evidence:** [Workflows](https://developers.llamaindex.ai/python/llamaagents/workflows/), [durable](https://developers.llamaindex.ai/python/llamaagents/workflows/durable_workflows/); LI dossier.

**Falsifier:** If LI hiring CTI measured ≤40 concepts for mid-level eng (same rubric as CTI), paradox dissolves.

### 7. Protocol Readiness splits “open” from “portable”

**Claim:** AD leads PR (96) via MCP + A2A + OTel ([ADK A2A](https://adk.dev/a2a/), [traces](https://adk.dev/observability/traces/)) while MF=52 — **protocol-ready ≠ migration-easy**. DS has lowest LIE (15) but weakest PR (52): portable prompts, weak protocol surface.

**Evidence:** A2A cross-framework posts ([Microsoft + A2A](https://devblogs.microsoft.com/agent-framework/guest-blog-building-multi-agent-solutions-with-semantic-kernel-and-a2a-protocol/)); DSPy docs focus on Signatures/GEPA not MCP-first ([dspy.ai](https://dspy.ai/)).

**Falsifier:** If ADK graph state exports to a non-ADK runtime without rewrite in ≥3 public case studies, MF score is too low.

### 8. Handoff ≠ GroupChat ≠ Hierarchical Process — topology false friends drive failed POCs

**Claim:** Teams treating OA `handoff()`, AG2 GroupChat/Network channels, and CrewAI `Process.hierarchical` as interchangeable will fail isolation/compliance reviews. These are distinct control primitives (transfer tool vs concurrent dialogue vs manager delegation).

**Evidence:** Cluster capability matrix; OA [handoffs](https://openai.github.io/openai-agents-python/handoffs/); CR [hierarchical](https://docs.crewai.com/v1.15.2/en/learn/hierarchical-process); AG Network docs.

**Falsifier:** Produce a mechanical 1:1 mapping preserving HITL + history filters + concurrency semantics across all three — if possible without adapters, claim fails.

### 9. Code-act security is bipolar — only OA and SM treat isolation as product

**Claim:** Among Tier-A frameworks, first-class code-execution sandboxes exist primarily in OA (sandbox agents) and SM (E2B/Docker/Modal/Blaxel). AG/CR/SK/AD/LG push isolation to tool authors — FMC understates *security* failure modes for code-act workloads.

**Evidence:** SM [docs](https://huggingface.co/docs/smolagents/index); OA sandbox docs; cluster insight #4.

**Falsifier:** Show first-party sandbox primitives in LG/CR/AD docs comparable to E2B/Docker client APIs.

### 10. Haystack 3 Agent-as-Component is the quiet RACS alternative to LlamaIndex

**Claim:** HS RACS=85 with LIE=42 (better than LI’s 58) and clearer Pipeline vs Agent mental model. For EU/enterprise RAG shops avoiding LlamaCloud gravity, HS dominates LI on LIE×RACS product despite equal AFFIX (~78.6).

**Evidence:** [Haystack 3 release](https://haystack.deepset.ai/blog/haystack-3-release), [Agent](https://docs.haystack.deepset.ai/docs/agent), [HITL](https://docs.haystack.deepset.ai/docs/human-in-the-loop); HS dossier.

**Falsifier:** If HS Agent lacks PipelineTool/MCPTool continuum in docs at audit date, RACS overstated.

### 11. Spring AI is the only framework where CTI is *conditional on org DNA*

**Claim:** SP CTI=28 assumes Spring Boot fluency. For a Next.js mid-level eng, effective CTI ≈ 45–55 EST (Boot + Advisors + reactive dual-stack). Persona playbooks must condition SP recommendation on JVM estate — not AFFIX alone.

**Evidence:** SP dossier; [ChatClient](https://docs.spring.io/spring-ai/reference/api/chatclient.html); typed-dx cluster.

**Falsifier:** Blind CTI survey of non-JVM engineers completing SP tool-agent+trace tutorial in ≤ same hours as VS path.

### 12. DSPy inverts learning order — lowest LIE, highest RHS

**Claim:** DS LIE=15 (best portability) but RHS=44.3 (worst). Optimizer-first curriculum (Signatures → Metrics → GEPA/MIPRO) leaves FMC=35 and PH=55; teams outgrow DSPy *as runtime* even when keeping it as compile-time optimizer.

**Evidence:** [GEPA](https://dspy.ai/current/getting-started/gepa-optimization/), [arxiv:2507.19457](https://arxiv.org/abs/2507.19457); recommended composition DS→PD/VS serve path in typed-dx cluster.

**Falsifier:** If ≥50% of production DSPy users run DSPy as the sole serving runtime at 12 months without PD/OA/LG wrapper, RHS overstated.

### 13. LangChain create_agent is a *funnel into LangGraph lock-in*, not an escape hatch

**Claim:** LC MF=55 / LIE=72 because v1 `create_agent` compiles onto LangGraph runtime and persistence schemas ([LC v1](https://docs.langchain.com/oss/python/releases/langchain-v1), [stack blog](https://www.langchain.com/blog/deep-agents-vs-langchain-vs-langgraph)). Starting “only LangChain” does not avoid LG checkpoint coupling once HITL/memory ship.

**Evidence:** LC dossier failure modes + lock_in_sources; LG checkpointer requirement for interrupts.

**Falsifier:** Ship create_agent HITL+durable threads without any langgraph checkpoint dependency.

### 14. Mastra is the TS continuum bet; AI SDK is the UI bet — composing both beats picking one

**Claim:** Optimal TypeScript production stack is **VS (UI stream contracts) + MA (workflows/memory/HITL)** or VS + Inngest, not VS alone. MA RACS=84 / FMC=72 vs VS RACS=65 / FMC=55; VS EG=95 / DX=94 still wins front-door.

**Evidence:** MA [workflows](https://mastra.ai/docs/workflows/overview), [memory](https://mastra.ai/docs/memory/overview); VS [structured data](https://ai-sdk.dev/docs/ai-sdk-core/generating-structured-data); spot-check IN PH≈95.

**Falsifier:** Single-package VS DurableAgent alone matches MA workflow FMC checklist without Workflow DevKit adjacency.

### 15. AutoGen/AG2 GED leadership is a trap for product timelines

**Claim:** AG GED=95 (highest) with RHS=36.0 — topology density without low CTI/PH predicts research success and product rewrite. Classic→v1 non-drop-in ([ag2ai/ag2](https://github.com/ag2ai/ag2)) is already one forced rewrite in the wild.

**Evidence:** AG dossier; cluster narrative CrewAI simplicity vs AutoGen power.

**Falsifier:** AG2 v1 migration guides show drop-in Classic compatibility for GroupChat apps (docs currently say otherwise).

---

## Composite insight table (quick reference)

| ID | AFFIX | RHS ↓ | LIE ↓ | PR ↑ | One-line proprietary read |
|----|------:|------:|------:|-----:|---------------------------|
| PD | 87.64 | **17.3** | 22 | 91 | Typed Python production default |
| MS | 80.91 | **19.4** | 52 | 88 | Greenfield Microsoft path |
| MA | 82.05 | **20.8** | 35 | 89 | TS agent OS |
| SP | 78.23 | 23.0 | 42 | 88 | JVM estate only |
| OA | 82.71 | 24.2 | **58** | 81 | OpenAI-standardized orgs |
| LI | 78.01 | 27.1 | 58 | 76 | RAG continuum king |
| AD | 82.50 | 25.1 | 45 | **96** | Protocol + GCP gravity |
| HS | 78.60 | 27.0 | 42 | 82 | Low-LIE RAG/agent |
| CR | 79.60 | 28.4 | 38 | 78 | Fast crews, AMP gravity |
| LG | 81.64 | 28.7 | 68 | 84 | Control max, tax max |
| SK | 74.73 | 28.9 | 48 | 81 | Succession risk |
| LC | 76.82 | 32.8 | **72** | 86 | Gravity well / funnel |
| VS | 81.22 | **34.5** | 35 | 87 | UI king, OS debt |
| AG | 76.51 | 36.0 | 42 | 76 | Research topologies |
| SM | 71.22 | 40.0 | **18** | 78 | Code-act prototype |
| DS | 71.19 | **44.3** | **15** | 49 | Optimize, don’t serve |

---

## Sources index (non-exhaustive)

- Methodology: `benchmark/METHODOLOGY.md`
- Dossiers: `benchmark/dossiers/{LG,LC,LI,HS,OA,AD,CR,AG,SK,SM,PD,VS,MA,DS,SP}.json`
- Clusters: `benchmark/clusters/multi-agent.md`, `typed-dx.md`
- Primary: LangGraph/LangChain docs, OpenAI Agents SDK, ADK, CrewAI, LlamaIndex, Haystack, PydanticAI, Mastra, AI SDK, Spring AI, DSPy, smolagents, Microsoft Agent Framework (URLs in dossiers)

---

## Post-hardening notes (2026-10-22)

Primary-source audit: `benchmark/deep/PRIMARY_SOURCE_AUDIT.md` · adjudication: `benchmark/findings/CROSS_VALIDATION.md`.  
These claims are **new** relative to the ranked findings above; each is falsifiable from official docs alone.

### H1. “Durable” in LlamaIndex docs means DIY journal, not a checkpointer product

**Claim:** LI’s durable-workflows page explicitly states there is **no built-in checkpointer**; production durability is a caller-owned checkpoint loop or optional DBOS. Continuum (RACS) and durability (PH/FMC) must be scored separately — RACS 92 can coexist with mid PH.

**Evidence:** [Durable workflows](https://developers.llamaindex.ai/python/llamaagents/workflows/durable_workflows/) (“There is no built-in checkpointer to enable”); contrast [LangGraph persistence](https://docs.langchain.com/oss/python/langgraph/persistence) (`PostgresSaver`).

**Falsifier:** First-party LI checkpointer API that persists/resumes without a custom loop or DBOS opt-in at the same docs path.

### H2. OpenAI “model portability” is beta; ops stay OpenAI-shaped by default

**Claim:** OA LiteLLM is officially **best-effort, beta**, while tracing defaults to the OpenAI Traces dashboard and the recommended model path is Responses API. LIE is therefore an ops-default problem, not an import-count problem — and the prior LIE=55 understates slightly (adjudicated **58**).

**Evidence:** [Models / LiteLLM](https://openai.github.io/openai-agents-python/models/); [Tracing](https://openai.github.io/openai-agents-python/tracing/) (`add_trace_processor` additive; `set_trace_processors` required to replace OpenAI export); [Sandbox agents](https://openai.github.io/openai-agents-python/).

**Falsifier:** GA first-party non-OpenAI model adapter + OTel-native default export with OpenAI Traces opt-in only.

### H3. AI SDK 7 did not collapse the agent-OS gap — it documented it

**Claim:** AI SDK 7’s durable story (`WorkflowAgent`) lives in `@ai-sdk/workflow`; core `ToolLoopAgent` remains explicitly in-memory and crash-lossy. Telemetry similarly requires `@ai-sdk/otel`. Publishing “AI SDK is production-ready for agents” without naming companions is a category error — RHS should worsen under sole-stack scoring (adjudicated **~34.5**).

**Evidence:** [WorkflowAgent](https://ai-sdk.dev/docs/agents/workflow-agent) (ToolLoopAgent vs WorkflowAgent table); [Telemetry](https://ai-sdk.dev/docs/ai-sdk-core/telemetry); [AI SDK 7 changelog](https://vercel.com/changelog/ai-sdk-7).

**Falsifier:** Durable agent loop + OTel registration ship in core `ai` with crash-safe defaults and no companion package.

### H4. SK orchestration is still prerelease while MAF claims succession

**Claim:** Microsoft’s own SK Agent Orchestration install path uses **`--prerelease`** packages, while Agent Framework docs call MAF the **direct successor** of SK + AutoGen. Greenfield SK orchestration AFFIX scores that ignore succession tax are invalid for enterprise buy decisions.

**Evidence:** [SK Agent Orchestration](https://learn.microsoft.com/en-us/semantic-kernel/frameworks/agent/agent-orchestration/) (`Microsoft.SemanticKernel.Agents.Orchestration --prerelease`); [Agent Framework overview](https://learn.microsoft.com/en-us/agent-framework/overview/) (“direct successor”); [Migration from SK](https://learn.microsoft.com/en-us/agent-framework/migration-guide/from-semantic-kernel).

**Falsifier:** SK orchestration packages GA without prerelease flag **and** Microsoft withdraws “successor” language for 24 months.

### H5. Protocol leadership and rewrite-safety remain orthogonal (AD vs PD)

**Claim:** ADK’s official A2A + MCP client/server + OTel GenAI surface justifies PR≈96, but primary docs do not show portable graph-state export — so high PR does not compress RHS the way PD’s durable-engine + typed-output stack does. Protocol readiness is not a substitute for rewrite-safety.

**Evidence:** [ADK A2A](https://adk.dev/a2a/); [MCP tools / `to_mcp_server`](https://adk.dev/tools-custom/mcp-tools/); [ADK traces](https://adk.dev/observability/traces/); [PydanticAI durable execution](https://pydantic.dev/docs/ai/capabilities/durable_execution/overview/).

**Falsifier:** ≥3 public case studies migrating ADK graph/session state to a non-ADK runtime without rewriting control flow — then raise AD MF and retest RHS rank vs PD.
