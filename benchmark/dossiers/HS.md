# AFFIX-2026 Dossier: Haystack (HS)

**Category:** Pipelines / RAG  
**Primary language:** Python  
**AFFIX composite:** **78.6** · RHS↓ **27.0** · PR↑ **82**  
**Evidence date:** 2026-10-22 (deepened for public publication)

| AF | CS | OB | TC | EG | RE | MF | PH | DX | FP |
|----|----|----|----|----|----|----|----|----|----|
| 85 | 78 | 80 | 80 | 70 | 82 | 75 | 72 | 82 | 80 |

| LIE↓ | CTI↓ | FMC↑ | GED↑ | RACS↑ | RHS↓ | PR↑ |
|------|------|------|------|-------|------|-----|
| 42.0 | 55.0 | 68.0 | 70.0 | 85.0 | 27.0 | 82 |

---

## One-liner

Composable pipelines and Agent-as-Component for enterprise RAG.

## Best for / When NOT to use

**Best for:** Pipeline-first RAG/agent with lower lock-in than LlamaCloud

**When NOT to use:** Do not expect LangGraph-class crash-safe thread checkpoints; Haystack HITL is ConfirmationHook-centric. Poor fit for non-pipeline multi-actor topologies.

---

## Version pins (as of 2026-10-22)

- **pypi:** haystack-ai==3.4.1
- **notes:** Haystack 3 Agent-as-Component

---

## API primitives (scoring anchors)

| Concern | Primary APIs / docs reality |
|---------|----------------------------|
| HITL / interrupt | Human-in-the-loop ConfirmationHook on Agent tool calls |
| Checkpointing / durability | Pipeline state; no LG-class thread checkpointer |
| Streaming | Streaming generators on components |
| Structured output | Output adapters / schema validation components |
| Evals / tracing | Tracing docs; OpenTelemetry support |
| Multi-agent | Agent component + PipelineTool composition |
| MCP | MCPTool continuum in Haystack 3 |

---

## Proprietary indices (EST)

| Index | Score | Direction |
|-------|------:|-----------|
| LIE | 42.0 | lower better |
| CTI | 55.0 | lower better |
| FMC | 68.0 | higher better |
| GED | 70.0 | higher better |
| RACS | 85.0 | higher better |
| RHS | 27.0 | lower better |
| PR | 82 | higher better |

---

## Deep notes

Haystack 3 **Agent-as-Component** inside Pipelines is the quiet RACS alternative (85) with better LIE (42) than LlamaIndex. HITL is ConfirmationHook-centric ([HITL](https://docs.haystack.deepset.ai/docs/human-in-the-loop)); DUR=`no` vs LangGraph thread checkpointers. Strong tracing ([tracing](https://docs.haystack.deepset.ai/docs/tracing)).

**Falsifier:** Missing PipelineTool/MCPTool continuum at audit date → cut RACS.

## Citations (primary)

- https://haystack.deepset.ai/blog/haystack-3-release
- https://docs.haystack.deepset.ai/docs/agent
- https://docs.haystack.deepset.ai/docs/human-in-the-loop
- https://docs.haystack.deepset.ai/docs/pipelines
- https://docs.haystack.deepset.ai/docs/tracing
- https://docs.haystack.deepset.ai/docs/migrating-from-langgraphlangchain-to-haystack
- https://pypi.org/project/haystack-ai/

---

## Falsifier

If primary docs at the pin date lack the named primitives above for a dimension scored ≥80, that dimension must be rescored by ≥10 points.
