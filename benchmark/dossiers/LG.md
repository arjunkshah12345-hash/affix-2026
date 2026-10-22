# AFFIX-2026 Dossier: LangGraph (LG)

**Category:** Stateful graphs / agents  
**Primary language:** Python + TypeScript  
**AFFIX composite:** **81.64** · RHS↓ **28.7** · PR↑ **84**  
**Evidence date:** 2026-10-22

| AF | CS | OB | TC | EG | RE | MF | PH | DX | FP |
|----|----|----|----|----|----|----|----|----|----|
| 92 | 95 | 88 | 75 | 85 | 72 | 50 | 93 | 65 | 85 |

| LIE↓ | CTI↓ | FMC↑ | GED↑ | RACS↑ | RHS↓ | PR↑ |
|------|------|------|------|-------|------|-----|
| 68 | 82 | 90 | 92 | 62 | 28.7 | 84 |

---

## One-liner

Low-level durable graph runtime; best control surface, highest cognitive tax.

## Best for

Regulated HITL, long-running approval-gated agents, fan-out/join multi-actor topologies, time-travel debugging.

## When NOT to use

Do not start greenfield LangGraph for a simple tool loop or MVP chat — CTI (82) and LIE (68) punish velocity. Prefer LangChain `create_agent`, PydanticAI, or Vercel AI SDK until you need arbitrary `interrupt()`, durable threads, or map-reduce `Send`. Weak native RAG (RACS 62) — bring LlamaIndex/Haystack into nodes.

---

## Version pins (2026-10-22)

| Package | Pin |
|---------|-----|
| PyPI `langgraph` | **1.2.16** |
| npm | `@langchain/langgraph` |
| Relationship | LangChain v1 `create_agent` compiles onto LangGraph runtime |

---

## API primitives (scoring anchors)

| Concern | Named APIs / docs reality |
|---------|---------------------------|
| **HITL / interrupt** | `interrupt(payload)` in nodes; resume with `Command`; requires checkpointer + `thread_id` ([interrupts](https://docs.langchain.com/oss/python/langgraph/interrupts)) |
| **Checkpointing** | Checkpointers (`PostgresSaver` / `SqliteSaver`) + Store for cross-thread ([persistence](https://docs.langchain.com/oss/python/langgraph/persistence)) |
| **Streaming** | Modes: values / messages / events; `stream.interrupts` |
| **Structured output** | TypedDict/Pydantic state + LangChain structured tools (TC mid) |
| **Evals / tracing** | LangSmith deep integration; state-transition traces |
| **Multi-agent** | Subgraphs, supervisors, `Send` map-reduce |
| **MCP** | Via LangChain MCP adapters / tool nodes |

---

## Positioning vs LangChain

LangGraph is the **low-level orchestration runtime**. LangChain’s `create_agent` is an opinionated harness compiled onto LangGraph. Deep Agents is a higher batteries layer. You do **not** need LangChain packages to use LangGraph — but starting “only LangChain” does not avoid LG checkpoint coupling once HITL/memory ship (see LC dossier / finding #13).

---

## Proprietary indices (EST)

| Index | Score | Notes |
|-------|------:|-------|
| LIE | 68 | Checkpoint schemas + Agent Server gravity |
| CTI | **82** | Highest learning curve for reliable tool agent + eval + tracing |
| FMC | **90** | Best-in-set failure-mode coverage |
| GED | **92** | Highest useful control-flow density among production graphs |
| RACS | 62 | Poor RAG continuum without another data layer |
| RHS | 28.7 | Control leadership does not buy rewrite-safety |
| PR | 84 | Strong via LC ecosystem MCP/OTel |

---

## Citations (primary)

- https://docs.langchain.com/oss/python/langgraph/overview
- https://docs.langchain.com/oss/python/langgraph/interrupts
- https://docs.langchain.com/oss/python/langgraph/persistence
- https://docs.langchain.com/oss/python/langgraph/streaming
- https://docs.langchain.com/oss/python/langgraph/workflows-agents
- https://www.langchain.com/blog/deep-agents-vs-langchain-vs-langgraph
- https://pypi.org/project/langgraph/
- https://github.com/langchain-ai/langgraph

---

## Falsifier

If teams starting on LG show lower 12-month primary-orchestration rewrite than Mastra/PydanticAI at matched multi-agent complexity, RHS ranking fails.
