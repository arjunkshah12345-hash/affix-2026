# RAG-to-Agent Continuum — AFFIX-2026 Deep Dive

**Study:** AFFIX-2026 · **Index:** RACS (RAG-to-Agent Continuum Score, 0–100, ↑ better)  
**As of:** 2026-10-21  
**Canonical scores:** [`affix_matrix.json`](../scores/affix_matrix.json)  
**Inputs:** dossiers LI/LG/LC/HS/VS/PD/CR/MA, [`langchain-rag` cluster](../clusters/langchain-rag.md), [`PROPRIETARY_FINDINGS.md`](../findings/PROPRIETARY_FINDINGS.md)  
**Companion:** [`rewrite_hazard.md`](./rewrite_hazard.md) (RHS uses \(100-\mathrm{RACS}\) at weight 0.28)

---

## 0. Thesis

Product AI stacks almost never stay at the stage they launch on. The continuum is:

```text
chatbot (streamed Q&A)
  → RAG pipeline (retrieve → synthesize)
  → tool-calling agent (model chooses tools)
  → multi-agent (roles / graphs / handoffs)
  → durable execution (crash-safe threads, HITL days later)
```

**RACS** measures how far a team can climb that ladder **without replacing the primary orchestration framework**. High AFFIX does not imply high RACS (LangGraph: AFFIX 81.64, RACS **62**). Mid AFFIX can imply best continuum (LlamaIndex: AFFIX 78.61, RACS **92**).

Falsifiable claim: for document/product roadmaps spanning ≥2 continuum stages, primary-framework choice predicted by RACS outperforms choice by EG or stars (Spearman ρ > 0.4 on “no orchestration rewrite at 12 months”).

---

## 1. Stage model (what “done” means)

| Stage | Job | First-class primitives that count | Typical failure if missing |
|-------|-----|-----------------------------------|----------------------------|
| **S0 Chatbot** | Stream tokens to UI | Chat API, UI message parts, session history | Rewrap every provider; no typed tools |
| **S1 RAG** | Ground answers in corpus | Loaders, chunk/nodes, indexes, retrievers, rerank, eval | Ad-hoc glue; quality/eval debt |
| **S2 Tools** | Model invokes side effects | Tool schemas, tool loop, structured I/O, budgets | Hand-rolled ReAct; schema drift |
| **S3 Multi-agent** | Specialize / coordinate | Supervisor, crew, handoff, subgraph, Agent-as-tool | Topology rewrite into new framework |
| **S4 Durable** | Survive process death + HITL | Checkpoints / Temporal / DBOS / workflow suspend | Silent data loss; compliance fail |

**Rewrite rule:** A framework “forces a rewrite at stage \(S_n\)” when reaching \(S_n\) requires a *different primary orchestrator* (not a companion library for retrieval or UI). Companion composition (e.g. LI retrievers inside LG nodes) is allowed and does **not** by itself lower RACS for the orchestrator — but if the *starting* framework cannot host \(S_n\), its RACS drops.

---

## 2. Continuum scoreboard (focus set)

| ID | Framework | RACS ↑ | AFFIX | RHS ↓ | Continuum headline |
|----|-----------|-------:|------:|------:|--------------------|
| **LI** | LlamaIndex | **92** | 78.61 | 24.3 | Documents → Workflows → HITL/durable plugins |
| **HS** | Haystack | **85** | 78.60 | 27.0 | Pipeline ↔ Agent Component; PipelineTool |
| **MA** | Mastra | **84** | 82.49 | 20.8 | Best TS ladder (agents + workflows + memory) |
| **PD** | PydanticAI | **80** | 87.64 | **17.3** | Typed loop → Graph → Temporal/DBOS engines |
| **LC** | LangChain | **70** | 76.82 | 32.8 | Tools strong; RAG second-class; funnel to LG |
| **CR** | CrewAI | **70** | 79.60 | 28.4 | Crew-native; RAG via Knowledge, not pipeline OS |
| **VS** | Vercel AI SDK | **65** | 81.52 | 32.9 | UI→tools excellent; OS/RAG/durable weak alone |
| **LG** | LangGraph | **62** | 81.64 | 28.7 | Durable/graph king; **bring your own RAG** |

Matrix sources: RACS/AFFIX/RHS from `affix_matrix.json` (EST per METHODOLOGY).

---

## 3. Stage-by-stage: who forces a rewrite?

Legend: **Native** = first-class path · **Promote** = same family, new mental model (soft rewrite) · **Companion** = keep framework, add library · **Rewrite** = change primary orchestrator.

### S0 → S1 (Chatbot → RAG)

| ID | Path | Forced rewrite? | Evidence |
|----|------|-----------------|----------|
| LI | Native Document/Node/index/retriever taxonomy | No | [RAG intro](https://developers.llamaindex.ai/python/framework/understanding/rag/) |
| HS | Native DocumentStore + Retrievers in Pipeline | No | [Pipelines](https://docs.haystack.deepset.ai/docs/pipelines) |
| LC | Integrations/loaders exist; not a native index OS | Soft — often bolt LI/HS or thin vector glue | LC dossier: RAG second-class vs agents |
| LG | No first-class RAG | **Companion or rewrite for RAG-first** | LG dossier RACS 62 |
| VS | App chat; RAG is BYO embeddings/store | Companion (often LI/HS elsewhere) or custom | VS RACS 65 |
| PD | Extraction/tools; RAG BYO or companion | Companion | PD RACS 80 (tools→durable stronger than RAG OS) |
| CR | Knowledge + memory scopes | Soft — not pipeline-native | [Memory](https://docs.crewai.com/edge/en/concepts/memory) |
| MA | Agents + optional retrieval tools | Soft — not LI-class taxonomy | MA workflows/agents docs |

**Insight:** Starting a *document product* on LG or VS alone is the most common continuum mistake — both excel later stages (LG) or earlier UI (VS) but leave S1 as glue.

### S1 → S2 (RAG → tool agent)

| ID | Path | Forced rewrite? | Evidence |
|----|------|-----------------|----------|
| LI | Retrievers/query engines → Workflow steps / agents | No | [Workflows](https://developers.llamaindex.ai/python/llamaagents/workflows/) |
| HS | Pipeline as `PipelineTool` inside `Agent` | No | [Agent](https://docs.haystack.deepset.ai/docs/agent), Haystack 3 [release](https://haystack.deepset.ai/blog/haystack-3-release) |
| LC | Retriever-as-tool on `create_agent` | No (stay in LC) | [create_agent](https://docs.langchain.com/oss/python/langchain/overview) |
| LG | Put retriever calls in nodes | No *if* you already chose LG | Bring LI/HS into nodes |
| VS | `ToolLoopAgent` / `streamText` tools | No for app tools; weak for RAG platform | [ToolLoopAgent](https://ai-sdk.dev/docs/reference/ai-sdk-core/tool-loop-agent) |
| PD | `@agent.tool` + typed deps | No | [Agent](https://pydantic.dev/docs/ai/core-concepts/agent/) |
| CR | Tools on Agents/Tasks | No | CrewAI tools/MCP |
| MA | Agent tools + structured output | No | [Agents](https://mastra.ai/docs/agents/overview) |

**Insight:** S1→S2 is where LI and HS pull ahead of LC: the *same* pipeline object becomes a tool, not a second framework.

### S2 → S3 (Tools → multi-agent)

| ID | Path | Forced rewrite? | Evidence |
|----|------|-----------------|----------|
| LI | Multi-step / multi-agent Workflows (DIY coordinator) | Soft CTI, not rewrite | LlamaAgents patterns |
| HS | `AgentTool` specialist wrapping | No | HS Agent docs |
| LC | Middleware / Deep Agents / **promote to LG** | **Promote** (often perceived as rewrite) | [Stack blog](https://www.langchain.com/blog/deep-agents-vs-langchain-vs-langgraph) |
| LG | Supervisors, subgraphs, `Send` map-reduce | Native (you design topology) | LG overview |
| VS | Thin multi-agent; no crew/graph OS | **Rewrite/compose** → MA or LG/JS | PROPRIETARY #14 |
| PD | Sub-agents / Pydantic Graph | Soft expand | PD Harness/Graph |
| CR | Sequential / hierarchical Process + Flows | Native role model | [Hierarchical](https://docs.crewai.com/v1.15.2/en/learn/hierarchical-process) |
| MA | Workflow `.branch` / `.parallel` + agents | Native TS | [Workflows](https://mastra.ai/docs/workflows/overview) |

**Insight:** LC→LG is the industry’s most common *soft rewrite*: same vendor, new authoring model, inherited checkpoint lock-in (PROPRIETARY #13).

### S3 → S4 (Multi-agent → durable / multi-day HITL)

| ID | Path | Forced rewrite? | Evidence |
|----|------|-----------------|----------|
| LI | Ephemeral default → DIY `StepStateChanged` or **DBOS** plugin | Soft — durability not turnkey | [Durable workflows](https://developers.llamaindex.ai/python/llamaagents/workflows/durable_workflows/) (“no built-in checkpointer”) |
| HS | In-run State; BYO external store | **Often rewrite/compose** for multi-day threads | HS PH 72; no LG-class checkpointer |
| LC | `checkpointer=` on `create_agent` → **LangGraph savers** | Promote into LG persistence | [Short-term memory](https://docs.langchain.com/oss/python/langchain/short-term-memory) |
| LG | Postgres/SQLite checkpointer + `interrupt()` | Native best-in-set | [Persistence](https://docs.langchain.com/oss/python/langgraph/persistence), [Interrupts](https://docs.langchain.com/oss/python/langgraph/interrupts) |
| VS | Core `ai` ≠ durable engine; Workflow DevKit / Inngest | **Compose or rewrite OS** | AI SDK 6 + IN spot PH≈95 |
| PD | First-party Temporal/DBOS/Prefect/Restate/… | Native *via engines* (not DIY) | [Durable execution](https://pydantic.dev/docs/ai/capabilities/durable_execution/overview/) |
| CR | Flow/crew checkpoints + enterprise webhook HITL | Soft — AMP gravity | [Checkpointing](https://docs.crewai.com/v1.15.2/en/concepts/checkpointing), [HITL](https://docs.crewai.com/v1.15.2/en/learn/human-in-the-loop) |
| MA | Workflow suspend/resume + memory persistence | Native mid-high | Mastra workflows/memory |

**Insight:** Durability is where marketing “stateful agents” (chat history) diverges from API reality (crash-safe threads). LG and PD (engine-backed) lead; HS and VS alone force the hardest S4 rewrites.

---

## 4. Framework deep comparisons

### 4.1 LlamaIndex (LI) — continuum king, mid AFFIX

**RACS 92 · LIE 58 · CTI 70 · RHS 24.3**

| Stage | Reality |
|-------|---------|
| S1 | Cluster-leading: Document → Node → index → retriever → synthesizer → eval |
| S2–S3 | Event-driven Workflows: steps return events; branches are Python `if`; fan-out via `list[Event]` |
| S4 | Real but DIY: docs state *no built-in checkpointer*; DBOS or checkpoint loop required |
| HITL | `InputRequiredEvent` / `HumanResponseEvent` + snapshot across HTTP |

**Forces rewrite when:** You need LangGraph-class arbitrary mid-node interrupt + time-travel *and* refuse DBOS/DIY; or you reject LlamaCloud/Parse gravity (LIE) for commodity RAG.

**Does not force rewrite when:** Document Q&A → corrective RAG → multi-step document agents — the RACS thesis case ([Workflows](https://developers.llamaindex.ai/python/llamaagents/workflows/), [HITL](https://developers.llamaindex.ai/python/llamaagents/workflows/human_in_the_loop/)).

**Paradox (PROPRIETARY #6):** Best continuum ≠ best overall fitness. Hiring/CTI and Cloud adjacency tax AFFIX.

### 4.2 Haystack (HS) — quiet RACS alternative

**RACS 85 · LIE 42 · CTI 55 · RHS 27.0**

| Stage | Reality |
|-------|---------|
| S1 | Typed Pipeline multigraph; YAML reviewable |
| S2 | `Agent` is a Component; hooks (`before_tool`, …), `exit_reason`, step budgets |
| S3 | `AgentTool` / `PipelineTool` / `MCPTool` — same object model |
| S4 | Weak vs LG: tool `ConfirmationHook` HITL, not durable thread OS |

**Forces rewrite when:** Compliance needs pause *anywhere* with multi-day resume (→ LG/AD/PD+Temporal).

**Does not force rewrite when:** Enterprise search adds agents carefully; OTEL mandate; exit from Lang* ([migration guide](https://docs.haystack.deepset.ai/docs/migrating-from-langgraphlangchain-to-haystack) — vendor-authored).

**LIE×RACS product (PROPRIETARY #10):** HS often beats LI for EU/enterprise shops avoiding LlamaCloud despite equal AFFIX (~78.6).

### 4.3 LangChain (LC) + LangGraph (LG) — harness vs runtime

Treat as one *family* with two continuum profiles:

| | LC | LG |
|--|----|----|
| RACS | 70 | **62** |
| Role | Tool harness (`create_agent` + middleware) | Durable graph runtime |
| S1 | Integrations, not taxonomy | BYO |
| S2 | Best EG path to tool agent | You build the loop |
| S3–S4 | Promote / inherit LG | Native CS 95 / PH 93 / FMC 90 |

**Critical API reality:** `create_agent` **already compiles onto LangGraph**. Choosing “only LangChain” does not avoid checkpoint schemas once HITL/memory ship ([v1](https://docs.langchain.com/oss/python/releases/langchain-v1), PROPRIETARY #13).

**Forces rewrite when:**
- Starting on LC middleware-only and needing `interrupt()` / `Send` / subgraphs → must *author* LG (soft rewrite).
- Starting on LG alone for a RAG product → must add LI/HS (companion) or rewrite retrieval layer later.
- Leaving LangSmith+checkpoint formats → high MF pain (LIE LC 72 / LG 68).

**Does not force rewrite when:** LC→LG promotion *inside* the family for control plane upgrades — lowest-friction path in Lang* ([stack blog](https://www.langchain.com/blog/deep-agents-vs-langchain-vs-langgraph)).

**API friction example:** `middleware` and custom `state_schema` mutually exclusive on some paths ([langchain#33217](https://github.com/langchain-ai/langchain/issues/33217)) — hurts RAG custom-state designs on the harness.

### 4.4 Vercel AI SDK (VS) — UI continuum, OS cliff

**RACS 65 · DX 94 · PH 68 · DX−PH +26 · RHS 32.9**

| Stage | Reality |
|-------|---------|
| S0 | Best-in-class: `useChat`, UIMessage parts, AI Elements |
| S1 | BYO — not a RAG framework |
| S2 | `ToolLoopAgent`, Zod/`Output.object`, `needsApproval` ([AI SDK 6](https://vercel.com/blog/ai-sdk-6)) |
| S3–S4 | Adjacent Workflow DevKit `DurableAgent` / Inngest — **not** core `ai` alone |

**Forces rewrite when:** Product needs memory platform, multi-step workflows, multi-day HITL as *primary* orchestrator → Mastra or Inngest (PROPRIETARY #14).

**Does not force rewrite when:** Customer-facing chat/tool UI remains the center; compose MA/IN underneath.

### 4.5 PydanticAI (PD) — typed continuum without RAG OS

**RACS 80 · RHS 17.3 (best) · LIE 22**

| Stage | Reality |
|-------|---------|
| S0–S2 | FastAPI-shaped `Agent` + tools + `output_type` |
| S3 | Harness sub-agents / Pydantic Graph |
| S4 | First-party durable engines (Temporal, DBOS, …) |

**Forces rewrite when:** Team needs LlamaIndex/Haystack-depth retrieval taxonomy *inside* one package — compose LI/HS for S1.

**Does not force rewrite when:** Python backend agent → production durable/HITL/evals — RACS is “good enough” and RHS wins because FMC/PH/CTI dominate hazard, not RACS alone.

### 4.6 CrewAI (CR) — role continuum, DX surplus

**RACS 70 · DX 92 · PH 76 · DX−PH +16 · RHS 28.4**

| Stage | Reality |
|-------|---------|
| S1 | Knowledge + hierarchical memory — not Pipeline OS |
| S2–S3 | Agent/Task/Crew + `Process.hierarchical` + Flows `@start/@listen` |
| S4 | Checkpoints + enterprise webhook HITL (AMP gravity) |

**Forces rewrite when:** Need free-form debate topologies (→ AG2) or arbitrary graph interrupts (→ LG); or OSS-only ops rejects AMP for prod HITL/tracing.

**Does not force rewrite when:** Role-team demos → hierarchical managers → Flows — fastest S2→S3 in Python product teams.

### 4.7 Mastra (MA) — TypeScript continuum bet

**RACS 84 · RHS 20.8 · GED 78 (best TS)**

| Stage | Reality |
|-------|---------|
| S0 | Strong streams; UI chrome often still VS |
| S1 | Retrieval tools — not LI taxonomy |
| S2–S4 | Agents + workflows (`.then/.branch/.parallel`) + memory + suspend/resume |

**Forces rewrite when:** Extreme checkpoint topologies already proven on Python LangGraph; or JVM estate.

**Does not force rewrite when:** TS product company climbing UI→tools→workflows→HITL — compose **VS (UI) + MA (OS)** rather than VS alone ([LangGraph guide](https://mastra.ai/articles/langgraph), PROPRIETARY #14).

---

## 5. Continuum matrix (at-a-glance)

| Stage transition | LI | HS | LC | LG | VS | PD | CR | MA |
|------------------|----|----|----|----|----|----|----|-----|
| S0→S1 RAG | ●●●●● | ●●●●● | ●●● | ● | ●● | ●● | ●●● | ●●● |
| S1→S2 Tools | ●●●●● | ●●●●● | ●●●● | ●●●● | ●●●● | ●●●●● | ●●●● | ●●●●● |
| S2→S3 Multi | ●●●● | ●●●● | ●●●→LG | ●●●●● | ●● | ●●●● | ●●●●● | ●●●●● |
| S3→S4 Durable | ●●● DIY | ●● BYO | ●●●● via LG | ●●●●● | ●● adj. | ●●●●● eng. | ●●●● | ●●●● |

● = relative continuum strength within this set (qualitative from dossiers; RACS is the numeric rollup).

---

## 6. Composition patterns that preserve continuum

| Pattern | When | Continuum effect |
|---------|------|------------------|
| **LI/HS retrieval + LG orchestration** | Document product + compliance interrupts | Two mental models; avoid rewriting either layer |
| **HS PipelineTool inside HS Agent** | Stay single-framework RAG→agent | Max HS RACS realization |
| **LC `create_agent` → LG StateGraph hot paths** | Lang* shop outgrows harness | Soft rewrite, same LIE family |
| **VS UI + MA workflows** | Next.js product | Fixes VS RACS/RHS without abandoning DX |
| **VS/MA UI + Inngest (IN)** | Multi-minute/HITL jobs | PH≈95 durable plane |
| **PD serve + DSPy optimize** | ML team | DS as compiler, not runtime (inverts DS RHS) |
| **PD/LI + Temporal/DBOS** | Python durable without LG checkpoints | Engine lock ≠ graph-format lock |

---

## 7. Decision rules (RACS-first)

1. **Document roadmap ≥ S2:** Prefer LI (RACS) or HS (RACS×LIE). Do not start sole-framework on LG/VS.  
2. **UI-first TS MVP:** VS at S0–S2; schedule MA or Inngest before S3/S4 (RHS watch).  
3. **Approval-gated multi-day:** LG or PD+Temporal; HS/VS alone are continuum traps at S4.  
4. **Role demos → prod crews:** CR OK to S3; budget AMP/embedding lock-in and DX−PH.  
5. **Typed Python platform:** PD for S2–S4; add LI/HS only if S1 depth required.  
6. **Never equate “stateful” with “durable.”** Ask for checkpointer/engine docs before scoring RACS mentally as 90+.

---

## 8. Top continuum insights

1. **RACS leaders ≠ AFFIX leaders.** LI (92) and HS (85) beat LG (62) on continuum while trailing LG on composite — pick by roadmap stage, not leaderboard rank.  
2. **The expensive rewrite is S3→S4, not S0→S1.** Chat→RAG is usually library work; durable HITL is orchestrator replacement.  
3. **LangChain is a funnel, not an escape hatch.** `create_agent` already sits on LangGraph; HITL/memory import LG lock-in (LIE 72/68).  
4. **Haystack’s PipelineTool bridge is the cleanest single-framework S1→S2.** Equal AFFIX to LI with lower LIE (42 vs 58).  
5. **TypeScript needs two packages for full continuum:** VS (UI contracts) + MA (workflows/memory) — VS alone RHS 32.9.  
6. **PydanticAI wins rewrite-safety without winning RAG.** RACS 80 + engines → best RHS; still compose LI/HS for corpus systems.  
7. **LG’s low RACS is a feature of honesty:** it is a control plane that *expects* a data layer — scoring it as a RAG framework is a category error.  
8. **CrewAI climbs S2→S3 fastest and stalls on RAG OS + AMP gravity** — high DX continuum, not high RACS continuum.

---

## 9. Sources

- Methodology RACS definition: [`METHODOLOGY.md`](../METHODOLOGY.md)  
- Scores: [`affix_matrix.json`](../scores/affix_matrix.json)  
- Dossiers: `benchmark/dossiers/{LI,LG,LC,HS,VS,PD,CR,MA}.{md,json}`  
- Cluster: [`langchain-rag.md`](../clusters/langchain-rag.md)  
- Primary URLs embedded above (LangChain/LangGraph, LlamaIndex, Haystack 3, AI SDK 6, PydanticAI durable, CrewAI, Mastra)

*All RACS/AFFIX/RHS values are **EST** unless cited as documented API facts.*
