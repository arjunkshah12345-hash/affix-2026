# Cluster: LangChain / LangGraph / LlamaIndex / Haystack

**Study:** AFFIX-2026 · Cluster ID `langchain-rag`  
**As of:** 2026-10-21  
**Sources:** Primary docs, release notes, PyPI, GitHub API (stars), GitHub issues for API friction  
**Dossiers:** [LC](../dossiers/LC.md) · [LG](../dossiers/LG.md) · [LI](../dossiers/LI.md) · [HS](../dossiers/HS.md)

---

## Scoreboard

| ID | Framework | AFFIX↓ | AF | CS | OB | TC | EG | RE | MF | PH | DX | FP | LIE↓ | CTI↓ | FMC↑ | GED↑ | RACS↑ |
|----|-----------|--------|----|----|----|----|----|----|----|----|----|-----|------|------|------|------|-------|
| LG | LangGraph | **81.6** | 92 | 95 | 88 | 75 | 85 | 72 | 50 | 93 | 65 | 85 | 68 | 82 | 90 | **92** | 62 |
| LI | LlamaIndex | **78.6** | 88 | 80 | 75 | **82** | 80 | 78 | 60 | 78 | 78 | 80 | 58 | 70 | 72 | 78 | **92** |
| HS | Haystack | **78.6** | 85 | 78 | 80 | 80 | 70 | **82** | **75** | 72 | **82** | 80 | **42** | **55** | 68 | 70 | 85 |
| LC | LangChain | **76.8** | 78 | 72 | **90** | 70 | **95** | 68 | 55 | 75 | 80 | 82 | 72 | 78 | 74 | 55 | 70 |

Versions verified: `langchain` 1.4.7 · `langgraph` 1.2.16 · `llama-index` 0.14.25 · `haystack-ai` 3.4.1  
Stars (GitHub API): LC 148.2k · LI 52.6k · LG 43.7k · HS 26.8k

AFFIX composites and proprietary indices marked **EST** where not directly measurable (see methodology).

---

## What this cluster is actually about

These four dominate “should we use LangChain?” conversations. They are **not substitutes**:

| Role | Winner | Why (API reality) |
|------|--------|-------------------|
| Agent runtime / durable control plane | **LangGraph** | Checkpointers + Stores + `interrupt()` + time travel |
| Quick tool agent + max integrations | **LangChain** | `create_agent` + middleware + LangSmith gravity |
| RAG → agent continuum | **LlamaIndex** | Nodes/indexes/retrievers → typed Workflows without rewrite |
| Lowest lock-in / clearest Pipeline↔Agent | **Haystack** | Typed Pipeline + Agent Component + OTEL-first |

---

## LangChain vs LangGraph (honest positioning)

LangChain’s own stack docs (2026) are unusually clear:

1. **Deep Agents** = batteries-included harness (filesystem, subagents, context compression)  
2. **LangChain `create_agent`** = customizable harness (model + tools + middleware)  
3. **LangGraph** = low-level runtime (durable execution, streaming, HITL, mixed deterministic/agentic graphs)  
4. **LangSmith** = traces/evals across all three  

Sources: [LC overview](https://docs.langchain.com/oss/python/langchain/overview), [Deep Agents vs LC vs LG](https://www.langchain.com/blog/deep-agents-vs-langchain-vs-langgraph), [LG overview](https://docs.langchain.com/oss/python/langgraph/overview).

### When LC alone is enough

- One ReAct-style tool loop  
- Middleware covers HITL (tool approve/edit/reject), summarization, PII  
- You want LangSmith datasets/evals day one  
- Python **and** JS teams sharing patterns  

### When you actually need LG

- Arbitrary pause points (`interrupt()` not just tool middleware)  
- Crash-safe multi-day threads with Postgres/SQLite checkpointers  
- Fan-out/join (`Send`), subgraphs, time-travel debug  
- Carefully controlled latency across mixed deterministic + LLM nodes  

### The trap

`create_agent` **already compiles to LangGraph**. Teams that “avoid LangGraph” still inherit checkpoint schemas and often `langgraph` as a dependency. The real choice is **how much graph you author**, not whether LG is in the stack.

2025–2026 shift that matters: `create_agent` replaces `langgraph.prebuilt.create_react_agent` as the recommended entry; legacy moves to `langchain-classic` ([v1 release notes](https://docs.langchain.com/oss/python/releases/langchain-v1)). LCEL remains substrate for Runnables — it is **not** dead, but it is **not** the agent headline.

---

## Capability matrix (production-relevant)

| Capability | LC | LG | LI | HS |
|------------|----|----|----|-----|
| Tool-calling agent loop | ★★★★★ `create_agent` | ★★★★ (you build it) | ★★★★ Workflows / agents | ★★★★★ `Agent` component |
| Durable thread resume | ★★★★ via LG checkpointer | ★★★★★ first-class | ★★★ DIY loop / DBOS plugin | ★★ BYO external state |
| Arbitrary HITL interrupt | ★★★ tool middleware | ★★★★★ `interrupt()` | ★★★★ events + snapshot | ★★★ tool `ConfirmationHook` only |
| Streaming control plane | ★★★★ | ★★★★★ + interrupt surfaces | ★★★★ `stream_events` | ★★★★ Agent + Pipeline `stream` |
| RAG primitives | ★★★ integrations | ★★ bring-your-own | ★★★★★ native taxonomy | ★★★★★ DocumentStore/Retrievers |
| Multi-agent | ★★★ Deep Agents / LG graphs | ★★★★★ topology you design | ★★★★ Workflow multi-agent | ★★★★ `AgentTool` |
| Observability product | ★★★★★ LangSmith | ★★★★★ LangSmith | ★★★ OTEL/Phoenix/Langfuse | ★★★★ OTEL + built-in agent metadata |
| Type / contract feel | ★★★ | ★★★ Annotated state | ★★★★★ Pydantic events | ★★★★ connect-time validation |
| YAML / reviewable graphs | ★★ | ★★ | ★★ | ★★★★★ |
| JS/TS twin | ★★★★★ | ★★★★★ | ★★★★ | ★ (Python-primary) |
| MCP | ★★★★ adapters | ★★★★ via tools | ★★★★ platform MCP | ★★★★ MCPTool + Hayhooks server |

---

## Proprietary indices — cluster reading

### Lock-in Entropy (LIE) — lower better

**HS (42) ≪ LI (58) < LG (68) < LC (72)**

- Haystack: stay on OTEL + YAML; Enterprise optional.  
- LlamaIndex: OSS Workflows portable; LlamaParse/Cloud pull for quality at scale.  
- LangGraph: checkpoint DB schemas sticky even if you leave LangSmith.  
- LangChain: LangSmith account model + middleware conventions + largest package graph.

### Cognitive Tax (CTI) — lower better

**HS (55) < LI (70) < LC (78) < LG (82)**

Haystack’s Pipeline-vs-Agent story is teachable in a day. LangGraph’s reducer/checkpoint/interrupt surface is the price of CS/PH leadership.

### Failure-Mode Coverage (FMC) — higher better

**LG (90) > LC (74) > LI (72) > HS (68)** — all EST

LangGraph uniquely covers crash-resume + time-travel + mid-graph interrupt as first-class APIs. Haystack covers tool failure feedback, step budgets, and `exit_reason` routing well but not durable multi-day threads.

### Graph Expressiveness Density (GED) — higher better

**LG (92) > LI (78) > HS (70) > LC (55)** — EST

`create_agent` deliberately scores low — expressiveness is outsourced to LG. LlamaIndex Workflows encode branches as ordinary Python `if` returns (high density, different style than StateGraph).

### RAG-to-Agent Continuum (RACS) — higher better

**LI (92) > HS (85) > LC (70) > LG (62)**

This is the sharpest differentiator for document products. LI and HS let you grow retrieval into agents without a framework rewrite. LG is a runtime that **expects** you to bring a data layer.

---

## Cross-comparisons that matter for architecture

### 1. Durability models (do not treat as equivalent)

| Framework | Default | Production path | Semantics |
|-----------|---------|-----------------|-----------|
| LG | Ephemeral until you `compile(checkpointer=)` | PostgresSaver / SqliteSaver / Agent Server | Thread checkpoints; time travel |
| LC | Same as LG when `checkpointer=` set on `create_agent` | Same | Inherited |
| LI | **Ephemeral**; no built-in checkpointer | DIY `StepStateChanged` loop or DBOS plugin | At-least-once; rewind in-flight steps |
| HS | In-run `State` only | External store + hooks / Hayhooks patterns | No first-class thread checkpointer |

Source emphasis: LI durable workflows docs state explicitly there is no built-in checkpointer ([docs](https://developers.llamaindex.ai/python/llamaagents/workflows/durable_workflows/)).

### 2. HITL models

| Framework | Primitive | Scope |
|-----------|-----------|-------|
| LG | `interrupt(payload)` | Anywhere in a node |
| LC | `HumanInTheLoopMiddleware` | Tool-call policies |
| LI | `InputRequiredEvent` / `HumanResponseEvent` | Workflow event boundary; snapshot across HTTP |
| HS | `ConfirmationHook` @ `before_tool` | Tool confirm/reject/modify |

If compliance needs “pause after planning, before any side effect, after tool N, after human edits state,” **LG wins**. If you only need “approve this email send,” LC/HS middleware/hooks are enough.

### 3. Observability economics

- **Need a productized eval platform tomorrow:** LangSmith (LC/LG) — accept LIE.  
- **Need OSS-first traces into your existing APM:** Haystack or LlamaIndex OTEL paths.  
- Haystack 3.x also exposes `token_usage` / `step_count` / `tool_call_counts` / `exit_reason` as **built-in agent outputs** without a SaaS — underrated for cost control.

### 4. RAG strategy

| Starting point | Prefer | Avoid as sole framework |
|----------------|--------|-------------------------|
| Chunking, hybrid retrieval, rerank, evaluation loops | **LI** or **HS** | LG alone |
| Tool agent that sometimes retrieves | **LC** (+ retriever tools) or **HS** Agent+PipelineTool | — |
| Long-running multi-actor research with approvals | **LG** (+ LI/HS retrievers inside nodes) | LC middleware-only |
| Enterprise search platform adding agents slowly | **HS** | Deep Agents / raw LG |

### 5. Migration / coexistence patterns that work

- **LI retrieval + LG orchestration** — common production hybrid; accept two mental models.  
- **HS Pipeline as PipelineTool inside HS Agent** — stay in one framework for RAG→agent.  
- **LC `create_agent` → promote hot paths to LG StateGraph** — official escape hatch; lowest rewrite within the Lang* family.  
- **Exit Lang* → HS** — Haystack publishes a concept map ([migration guide](https://docs.haystack.deepset.ai/docs/migrating-from-langgraphlangchain-to-haystack)); treat as vendor-authored.

---

## Hype to discount

1. **“LangChain is dead / replaced by LangGraph”** — False. LC is the harness; LG is the runtime. Official stack post (Aug 2026) keeps all three layers.  
2. **“LlamaIndex is only RAG”** — Outdated. Workflows have durable resume, HITL, concurrency, validation. Durability is real but **DIY by default**.  
3. **“Haystack can’t do agents”** — False post-3.0. Agents are the release center; hooks/skills/introspection are first-class. Durable threads still lag LG.  
4. **“Just use create_agent for everything”** — Fine until you need map-reduce, arbitrary interrupts, or latency-controlled deterministic segments — then you were always going to write LG.  
5. **Star counts as quality** — LC EG is real; they do not measure PH or FMC.

---

## Decision guide (personas)

| Persona | Pick | Second choice |
|---------|------|---------------|
| Prototype tool agent + evals this week | **LC** + LangSmith | HS Agent |
| Approval-gated finance/ops agent, multi-day | **LG** | LI Workflows + DBOS |
| Document Q&A → corrective RAG → multi-step agents | **LI** | HS |
| Enterprise search, YAML review, OTEL mandate | **HS** | LI |
| Python + TypeScript shared agent platform | **LC/LG** | LI (TS weaker parity EST) |
| Minimize SaaS lock-in | **HS** | LI |
| Maximum graph control density | **LG** | LI Workflows |

---

## Sharpest cluster findings

1. **AFFIX leader is LangGraph (81.6)** because CS/PH/GED dominate production agent failure modes — not because it is the best starting point.  
2. **LI and HS tie on AFFIX (78.6)** via different strengths: LI wins RACS/TC; HS wins LIE/CTI/MF/DX.  
3. **LangChain’s EG/OB lead does not win the composite** — MF and LIE drag it under LI/HS for teams that care about portability.  
4. **Durability is the cluster’s sharpest API-reality gap:** LG checkpointer ≫ LI DIY/DBOS ≫ HS BYO. Marketing “stateful agents” often means chat history, not crash-safe threads.  
5. **RACS ordering (LI > HS > LC > LG)** should drive framework choice for document products more than star counts or agent demos.

---

## Evidence index (primary)

- https://docs.langchain.com/oss/python/langchain/overview  
- https://docs.langchain.com/oss/python/releases/langchain-v1  
- https://docs.langchain.com/oss/python/langgraph/overview  
- https://docs.langchain.com/oss/python/langgraph/persistence  
- https://docs.langchain.com/oss/python/langgraph/interrupts  
- https://www.langchain.com/blog/deep-agents-vs-langchain-vs-langgraph  
- https://developers.llamaindex.ai/python/framework/understanding/rag/  
- https://developers.llamaindex.ai/python/llamaagents/workflows/  
- https://developers.llamaindex.ai/python/llamaagents/workflows/durable_workflows/  
- https://developers.llamaindex.ai/python/llamaagents/workflows/human_in_the_loop/  
- https://haystack.deepset.ai/blog/haystack-3-release  
- https://docs.haystack.deepset.ai/docs/agent  
- https://docs.haystack.deepset.ai/docs/human-in-the-loop  
- https://docs.haystack.deepset.ai/docs/pipelines  
- https://docs.haystack.deepset.ai/docs/migrating-from-langgraphlangchain-to-haystack  
