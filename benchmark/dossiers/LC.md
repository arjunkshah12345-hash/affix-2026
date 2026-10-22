# AFFIX-2026 Dossier: LangChain (LC)

**Category:** Orchestration + tools  
**Primary language:** Python/TS  
**AFFIX composite:** **76.82** · RHS↓ **32.8** · PR↑ **86**  
**Evidence date:** 2026-10-22 (deepened for public publication)

| AF | CS | OB | TC | EG | RE | MF | PH | DX | FP |
|----|----|----|----|----|----|----|----|----|----|
| 78 | 72 | 90 | 70 | 95 | 68 | 55 | 75 | 80 | 82 |

| LIE↓ | CTI↓ | FMC↑ | GED↑ | RACS↑ | RHS↓ | PR↑ |
|------|------|------|------|-------|------|-----|
| 72.0 | 78.0 | 74.0 | 55.0 | 70.0 | 32.8 | 86 |

---

## One-liner

High-gravity orchestration layer; v1 agents compile onto LangGraph.

## Best for / When NOT to use

**Best for:** Ecosystem gravity, LangSmith, and LC→LG funnel shops

**When NOT to use:** Do not assume 'LangChain only' avoids LangGraph lock-in once HITL/memory ship — create_agent funnels into LG persistence. High LIE for portable graphs.

---

## Version pins (as of 2026-10-22)

- **pypi:** langchain==1.4.7
- **notes:** v1 create_agent compiles onto LangGraph

---

## API primitives (scoring anchors)

| Concern | Primary APIs / docs reality |
|---------|----------------------------|
| HITL / interrupt | HumanInTheLoopMiddleware → LangGraph interrupt + checkpointer |
| Checkpointing / durability | Short-term memory / threads via LangGraph persistence |
| Streaming | Agent/graph streaming; frontend HITL stream helpers |
| Structured output | with_structured_output / tool schemas |
| Evals / tracing | LangSmith observability first-class |
| Multi-agent | create_agent + handoffs/tools; Deep Agents layer |
| MCP | MCP tool adapters in LangChain ecosystem |

---

## Proprietary indices (EST)

| Index | Score | Direction |
|-------|------:|-----------|
| LIE | 72.0 | lower better |
| CTI | 78.0 | lower better |
| FMC | 74.0 | higher better |
| GED | 55.0 | higher better |
| RACS | 70.0 | higher better |
| RHS | 32.8 | lower better |
| PR | 86 | higher better |

---

## Deep notes

LangChain v1 `create_agent` is a **funnel into LangGraph** persistence for HITL/memory ([HITL middleware](https://docs.langchain.com/oss/python/langchain/human-in-the-loop), [v1 release](https://docs.langchain.com/oss/python/releases/langchain-v1)). EG=95 and LangSmith OB leadership coexist with LIE=72 / MF=55. Starting “only LangChain” does not avoid checkpoint coupling.

**Falsifier:** Ship create_agent HITL+durable threads with zero langgraph checkpoint dependency.

## Citations (primary)

- https://docs.langchain.com/oss/python/releases/langchain-v1
- https://docs.langchain.com/oss/python/langchain/overview
- https://docs.langchain.com/oss/python/langchain/human-in-the-loop
- https://docs.langchain.com/oss/python/langchain/short-term-memory
- https://docs.langchain.com/langsmith/observability
- https://www.langchain.com/blog/deep-agents-vs-langchain-vs-langgraph
- https://pypi.org/project/langchain/
- https://docs.langchain.com/oss/javascript/langchain/agents

---

## Falsifier

If primary docs at the pin date lack the named primitives above for a dimension scored ≥80, that dimension must be rescored by ≥10 points.
