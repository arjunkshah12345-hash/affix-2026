# Observability Matrix — AFFIX-2026 Deep Dive

**Study:** AFFIX-2026 · **As of:** 2026-10-21 · **Canonical scores:** `benchmark/scores/affix_matrix.json`  
**OB scale:** 0–100, higher better (weight 0.11 in AFFIX).  
**Companion JSON:** [`observability_matrix.json`](./observability_matrix.json)

---

## LIE scale note (cross-cutting)

Some cluster agents scored **LIE on 0–10** (e.g. `benchmark/clusters/multi-agent.md`: OA 5.6, AD 4.5).  
**Canonical LIE is 0–100** per `METHODOLOGY.md` and `affix_matrix.json`.  
**Normalize:** `LIE_100 ≈ LIE_10 × 10` (OA 5.6 → 56 ≈ matrix **55**). See [`lock_in_taxonomy.md`](./lock_in_taxonomy.md).

---

## What OB measures

Traces / spans · token & cost · replay / debug · eval hooks · **portable** export (OTel GenAI / OpenInference) vs **vendor UI required for production truth**.

| Subscore (EST) | Weight in OB narrative | Meaning |
|----------------|------------------------|---------|
| Native span depth | 0.30 | Agent / LLM / tool / handoff / HITL / audio coverage |
| Product UX (day-1) | 0.20 | Hosted UI, datasets, issue detection |
| Portable export | 0.25 | OTLP / OpenInference without vendor UI |
| Cost & token fidelity | 0.15 | Usage attributes on spans / run metadata |
| Eval / replay hooks | 0.10 | Datasets, scorers, time-travel |

---

## Ranking (framework OB from matrix)

| Rank | ID | Framework | OB ↑ | Primary obs path | Portability | Lock note |
|-----:|----|-----------|-----:|------------------|-------------|-----------|
| 1 | PD | PydanticAI | **92** | Logfire + OTel | Excellent | Logfire optional; OTel escape |
| 2 | AD | Google ADK | **90** | OTel GenAI → Cloud Trace / OTLP | Excellent | GCP paved road |
| 2 | LC | LangChain | **90** | **LangSmith** | Dual (OTel exists) | Highest obs product gravity |
| 4 | OA | OpenAI Agents SDK | **88** | OpenAI Traces (default on) | Custom processors | ZDR disables tracing |
| 4 | MA | Mastra | **88** | Studio + sinks (Phoenix/AX, …) | Strong | Platform/Studio gravity mild |
| 4 | LG | LangGraph | **88** | LangSmith (+ state transitions) | Dual | Checkpoint + Smith compound LIE |
| 7 | MS | Microsoft Agent Framework | **86** | Foundry / OTel (preview docs) | Good | Azure gravity |
| 8 | SP | Spring AI | **85** | Micrometer / Actuator | Good | Spring ops model |
| 9 | AG | AutoGen / AG2 | **82** | `TelemetryMiddleware` OTel GenAI | Excellent | Dual-stack CTI tax elsewhere |
| 10 | HS | Haystack | **80** | OTel / Langfuse / Datadog / Weave | Excellent | Lowest LIE in RAG cluster |
| 11 | CR | CrewAI | **78** | AMP tracing + 3P | Dual | AMP login gravity |
| 12 | LI | LlamaIndex | **75** | OTel package + Phoenix/Langfuse/Opik | Excellent | Fragmented vs LangSmith UX |
| 13 | SK | Semantic Kernel | **72** | OTel + App Insights / Foundry | Good | Enterprise logger gravity |
| 14 | VS | Vercel AI SDK | **70** | Telemetry + DevTools; Phoenix/OTel | Good | Thin; BYO eval platform |
| 15 | DS | DSPy | **60** | MLflow / OpenInference / Langfuse | Good | Optimizer-first, not runtime APM |
| 16 | SM | smolagents | **50** | Verbose logs; BYO Langfuse/etc. | Weak first-class | Lowest OB in Tier A |

---

## Platform / sink deep dives (requested)

### 1. LangSmith (LC / LG primary)

- **Docs:** [LangSmith Observability](https://docs.langchain.com/langsmith/observability)
- **Strengths:** Deepest productized GenAI APM for LC/LG — traces, datasets/evals, issue detection (“LangSmith Engine” gravity in LC dossier). Graph state transitions visible when using LangGraph.
- **Weaknesses:** Commercial account model is a top LIE driver for LC (**72**) and contributes to LG (**68**). OSS OTel paths exist but day-1 docs push Smith.
- **OB contribution:** LC/LG score **90 / 88** largely from this product depth — not from portable OTel alone.
- **When to pick:** Need evals + traces + agent debugging tomorrow; accept ops lock.

### 2. LlamaIndex observability (+ Phoenix adjacency)

- **Docs:** [Framework observability](https://developers.llamaindex.ai/python/framework/module_guides/observability/), [Workflows observability](https://developers.llamaindex.ai/python/llamaagents/workflows/observability/)
- **API reality:** One-click / package integrations (`llama-index-observability-otel`); Phoenix, Langfuse, Opik commonly documented. Built-in step instrumentation for Workflows.
- **vs LangSmith:** Stronger **OSS plurality**, weaker **single-pane product**. Explains OB **75** despite excellent RAG continuum (RACS 92).
- **LIE:** Obs itself is portable; **LlamaCloud / LlamaParse** dominate LI LIE (**58**), not Phoenix.

### 3. OpenAI Agents SDK tracing

- **Docs:** [Tracing](https://openai.github.io/openai-agents-python/tracing/)
- **API reality:** Default-on spans for agent / generation / function / guardrail / handoff / audio; `flush_traces()` for Celery/FastAPI workers; custom processors; **ZDR orgs cannot use tracing**.
- **Lock:** Non-OpenAI models often still need `OPENAI_API_KEY` for the Traces dashboard — classic “model portable, ops locked” pattern (PROPRIETARY_FINDINGS #3).
- **OB 88 / PH 88:** Excellent when OpenAI-hosted ops are allowed; catastrophic for ZDR.

### 4. CrewAI tracing

- **Docs:** [CrewAI Tracing](https://docs.crewai.com/edge/en/observability/tracing)
- **Path:** Built-in **AMP** tracing for Crews/Flows; third-party Langfuse/Datadog documented.
- **OB 78:** Solid day-1 UX; AMP account/CLI is soft lock (LIE **38**).
- **Contrast:** Less OTel-native than AG2/ADK; more productized than smolagents.

### 5. PydanticAI / Logfire

- **Docs:** [Logfire integration](https://pydantic.dev/docs/ai/integrations/logfire/), [overview](https://pydantic.dev/docs/ai/overview/)
- **Why OB #1 (92):** Native agent tracing + application observability + OTel export; pairs with Pydantic Evals. Logfire is **optional** — falsifier for high LIE if Logfire were required for durable APIs (it is not; Temporal/DBOS/etc. are separate).
- **Product note:** Pydantic marketing positions Logfire as top AI observability ([article](https://pydantic.dev/articles/best-ai-observability-platform)) — treat as vendor claim; scoring uses API/docs reality.

### 6. Vercel AI SDK telemetry

- **Docs:** [Telemetry](https://ai-sdk.dev/docs/ai-sdk-core/telemetry)
- **API reality:** First-party telemetry + DevTools; production APM usually **Phoenix / OTel / Langfuse** bolted on ([Phoenix + AI SDK](https://arize.com/docs/phoenix/integrations/typescript/vercel/vercel-ai-sdk-tracing-js)).
- **OB 70:** Adequate for app-layer loops; not a LangSmith-class eval platform. Matches DX surplus / PH cliff (DX 94 − PH 68).

### 7. DSPy

- **Primary quality loop:** Metrics + GEPA/MIPROv2 — **eval-as-compile**, not span APM ([dspy.ai](https://dspy.ai/)).
- **Runtime tracing:** Community / MLflow / OpenInference → Langfuse/Phoenix ([Langfuse OpenInference](https://langfuse.com/integrations/other/openinference), [discussion](https://github.com/orgs/langfuse/discussions/10930)).
- **OB 60:** Intentional — observability is out-of-band relative to optimizer curriculum.

### 8. Semantic Kernel / Microsoft Agent Framework

- **Docs:** [Observability in Semantic Kernel](https://devblogs.microsoft.com/agent-framework/observability-in-semantic-kernel/), [Agent Framework Observability](https://learn.microsoft.com/en-us/agent-framework/agents/observability), [Foundry tracing](https://learn.microsoft.com/en-us/azure/foundry/observability/how-to/trace-agent-framework)
- **API reality:** OTel-compatible logs/metrics/traces; App Insights / Azure Foundry paved road. Cookbook GenAI span depth historically thinner than AG2/ADK (SK dossier OB **72**).
- **MS score 86:** Successor surface improves Foundry/OTel story; succession itself raises LIE (**52**).

### 9. Haystack

- **Docs:** [Tracing](https://docs.haystack.deepset.ai/docs/tracing)
- **API reality:** OpenTelemetry, Datadog, Langfuse, MLflow, Weave; content tracing opt-in. Agent run metadata (`token_usage`, `step_count`, `tool_call_counts`) without SaaS — underrated cost control ([langchain-rag cluster](../clusters/langchain-rag.md)).
- **OB 80 / LIE 42:** Best “portable obs + low lock” RAG/agent combo in-set.

### 10. Mastra

- **Docs:** Observability overview / sinks (e.g. [Arize integration](https://mastra.ai/integrations/observability/arize)); Studio for local DX.
- **OB 88:** Coherent scorers/evals + exportable sinks; TS path to LangGraph-class ops without LangSmith.
- **Pattern:** Mastra orchestration + AI SDK UI + Phoenix/Langfuse is a common production triangle.

### 11. Phoenix / OpenTelemetry / OpenInference (cross-cutting)

- **Phoenix:** [arize.com/phoenix](https://arize.com/phoenix/) · GitHub [Arize-ai/phoenix](https://github.com/Arize-ai/phoenix) (**~11.9k** stars, live API 2026-10-21)
- **OpenInference:** [Arize-ai/openinference](https://github.com/Arize-ai/openinference) — GenAI instrumentation conventions complementary to OTel.
- **Role in AFFIX:** Not a Tier-A framework; scored as **sink quality**. Raises portable OB for VS, LI, MA, HS, DS without raising framework LIE *unless* AX cloud becomes mandatory.
- **PR rubric:** `OTel_GenAI_portable` term (weight 0.15) in Protocol Readiness — AD/PD near 98, OA/CR lower when vendor UI is default truth.

### 12. AG2 TelemetryMiddleware (reference portable pole)

- **Docs:** [Telemetry](https://docs.ag2.ai/docs/user-guide/telemetry/)
- Span types `agent` / `llm` / `tool` / `human_input`; `capture_content=False`; any OTLP backend. Template for “high OB without vendor UI.”

---

## Capability matrix (framework × obs feature)

| Capability | LangSmith | LI+Phoenix | OA Traces | Crew AMP | Logfire | AI SDK tel. | DSPy+OI | SK/Foundry | HS OTel | Mastra | Phoenix sink |
|------------|-----------|------------|-----------|----------|---------|-------------|---------|------------|---------|--------|--------------|
| Agent/LLM/tool spans | ★★★★★ | ★★★★ | ★★★★★ | ★★★★ | ★★★★★ | ★★★ | ★★★ | ★★★★ | ★★★★ | ★★★★★ | ★★★★★ |
| Handoff / graph state | ★★★★★ | ★★★★ | ★★★★★ | ★★★ | ★★★★ | ★★ | ★★ | ★★★ | ★★★ | ★★★★ | ★★★★ |
| Token/cost | ★★★★★ | ★★★★ | ★★★★ | ★★★★ | ★★★★★ | ★★★ | ★★★ | ★★★★ | ★★★★★ | ★★★★ | ★★★★ |
| Datasets / evals | ★★★★★ | ★★★★ | ★★★ | ★★★ | ★★★★★ | ★★ | ★★★★★* | ★★★ | ★★★ | ★★★★★ | ★★★★★ |
| OTLP portable | ★★★ | ★★★★★ | ★★★ | ★★★ | ★★★★★ | ★★★★ | ★★★★ | ★★★★ | ★★★★★ | ★★★★ | ★★★★★ |
| Self-host OSS UI | ★★ | ★★★★★ | ★ | ★★ | ★★★ | ★★ | ★★★★ | ★★ | ★★★★★ | ★★★ | ★★★★★ |
| ZDR / privacy knobs | ★★★★ | ★★★★ | ★** | ★★★ | ★★★★ | ★★★ | ★★★★ | ★★★★ | ★★★★★ | ★★★★ | ★★★★★ |

\*DSPy “evals” are compile-time metrics/optimizers, not runtime trajectory APM.  
\*\*OA: ZDR **disables** default tracing entirely.

---

## Cross-cutting findings

1. **OB leaders split into two tribes:** (A) vendor product UX — LangSmith, OA Traces, Crew AMP, Logfire; (B) OTel-first — ADK, AG2, Haystack, Phoenix sinks. Tribe A wins day-1 OB; Tribe B wins LIE.
2. **Highest OB ≠ lowest rewrite risk.** LC OB 90 with LIE 72 / RHS mid; PD OB 92 with LIE 22 / best RHS.
3. **DX−PH inversion correlates with thin obs.** VS OB 70 + PH 68: telemetry exists, durable eval/APM does not.
4. **Phoenix/OpenInference is the portable “Switzerland”** for TS (VS/MA) and Python (LI/HS/DS) when avoiding LangSmith/OpenAI Traces.
5. **Falsifier for OB ranking:** If independent teams rate HS day-1 debug UX equal to LangSmith without SaaS, HS OB is understated by ~5–8 points.

---

## Sources (primary)

- https://docs.langchain.com/langsmith/observability  
- https://developers.llamaindex.ai/python/framework/module_guides/observability/  
- https://developers.llamaindex.ai/python/llamaagents/workflows/observability/  
- https://openai.github.io/openai-agents-python/tracing/  
- https://docs.crewai.com/edge/en/observability/tracing  
- https://pydantic.dev/docs/ai/integrations/logfire/  
- https://ai-sdk.dev/docs/ai-sdk-core/telemetry  
- https://arize.com/phoenix/  
- https://arize.com/docs/phoenix/integrations/typescript/vercel/vercel-ai-sdk-tracing-js  
- https://docs.haystack.deepset.ai/docs/tracing  
- https://adk.dev/observability/traces/  
- https://docs.ag2.ai/docs/user-guide/telemetry/  
- https://learn.microsoft.com/en-us/agent-framework/agents/observability  
- https://mastra.ai/integrations/observability/arize  
- https://langfuse.com/integrations/other/openinference  
- https://opentelemetry.io/blog/2025/ai-agent-observability/  
