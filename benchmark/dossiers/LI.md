# AFFIX-2026 Dossier: LlamaIndex (LI)

**Category:** RAG / data agents  
**Primary language:** Python/TS  
**AFFIX composite:** **78.61** · RHS↓ **24.3** · PR↑ **76**  
**Evidence date:** 2026-10-22 (deepened for public publication)

| AF | CS | OB | TC | EG | RE | MF | PH | DX | FP |
|----|----|----|----|----|----|----|----|----|----|
| 88 | 80 | 75 | 82 | 80 | 78 | 60 | 78 | 78 | 80 |

| LIE↓ | CTI↓ | FMC↑ | GED↑ | RACS↑ | RHS↓ | PR↑ |
|------|------|------|------|-------|------|-----|
| 58.0 | 70.0 | 72.0 | 78.0 | 92.0 | 24.3 | 76 |

---

## One-liner

RAG-native data agents and workflows with the strongest continuum score.

## Best for / When NOT to use

**Best for:** Document RAG → workflow agents continuum

**When NOT to use:** Avoid if you need minimal lock-in and refuse LlamaCloud/Parse gravity; also a poor fit as a pure UI streaming layer (pair with VS) or as a low-CTI toy agent.

---

## Version pins (as of 2026-10-22)

- **pypi:** llama-index==0.14.25
- **notes:** Workflows / LlamaAgents docs tree

---

## API primitives (scoring anchors)

| Concern | Primary APIs / docs reality |
|---------|----------------------------|
| HITL / interrupt | InputRequiredEvent + HumanResponseEvent in Workflows |
| Checkpointing / durability | Context serialization; durable workflows (DBOS optional) |
| Streaming | Workflow/handler event streams |
| Structured output | Structured outputs / Pydantic in workflows and LLMs |
| Evals / tracing | Observability integrations for workflows |
| Multi-agent | Multi-agent workflows; agent teams over documents |
| MCP | MCP tool bridges (evolving; client-leaning) |

---

## Proprietary indices (EST)

| Index | Score | Direction |
|-------|------:|-----------|
| LIE | 58.0 | lower better |
| CTI | 70.0 | lower better |
| FMC | 72.0 | higher better |
| GED | 78.0 | higher better |
| RACS | 92.0 | higher better |
| RHS | 24.3 | lower better |
| PR | 76 | higher better |

---

## Deep notes

LlamaIndex wins **RACS=92**: Documents → Workflows → HITL (`InputRequiredEvent` / `HumanResponseEvent`) → durable workflows ([HITL](https://developers.llamaindex.ai/python/llamaagents/workflows/human_in_the_loop/), [durable](https://developers.llamaindex.ai/python/llamaagents/workflows/durable_workflows/)). Mid AFFIX reflects LIE=58 (LlamaCloud/Parse gravity) and CTI=70.

**Paradox:** Continuum champion ≠ AFFIX champion. Prefer Haystack when lock-in dominates continuum.

**Falsifier:** LI hiring CTI ≤40 on same rubric dissolves the paradox.

## Citations (primary)

- https://developers.llamaindex.ai/python/llamaagents/workflows/
- https://developers.llamaindex.ai/python/llamaagents/workflows/human_in_the_loop/
- https://developers.llamaindex.ai/python/llamaagents/workflows/durable_workflows/
- https://developers.llamaindex.ai/python/llamaagents/workflows/managing_state/
- https://developers.llamaindex.ai/python/llamaagents/workflows/observability/
- https://developers.llamaindex.ai/python/framework/understanding/rag/
- https://pypi.org/project/llama-index/
- https://www.llamaindex.ai/blog/llamaagents-build-serve-and-deploy-document-agents

---

## Falsifier

If primary docs at the pin date lack the named primitives above for a dimension scored ≥80, that dimension must be rescored by ≥10 points.
