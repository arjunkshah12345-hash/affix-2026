# AFFIX-2026 Dossier: Microsoft Agent Framework (MS)

**Category:** Enterprise agents (AutoGen/SK successor)  
**Primary language:** Python/.NET  
**AFFIX composite:** **80.91** · RHS↓ **19.4** · PR↑ **88**  
**Evidence date:** 2026-10-22 (deepened for public publication)

| AF | CS | OB | TC | EG | RE | MF | PH | DX | FP |
|----|----|----|----|----|----|----|----|----|----|
| 86 | 88 | 86 | 90 | 80 | 75 | 48 | 88 | 70 | 88 |

| LIE↓ | CTI↓ | FMC↑ | GED↑ | RACS↑ | RHS↓ | PR↑ |
|------|------|------|------|-------|------|-----|
| 52 | 36 | 80 | 86 | 76 | 19.4 | 88 |

---

## One-liner

Microsoft's enterprise agent/workflow successor to Semantic Kernel orchestration.

## Best for / When NOT to use

**Best for:** Greenfield Microsoft/.NET enterprise agents

**When NOT to use:** Do not choose MS if you are outside Microsoft/.NET/Azure estates without a migration plan; brownfield SK apps should budget succession, not pretend SK orchestration is LTS.

---

## Version pins (as of 2026-10-22)

- **pypi:** agent-framework==1.22.0
- **notes:** Microsoft Agent Framework; SK succession path

---

## API primitives (scoring anchors)

| Concern | Primary APIs / docs reality |
|---------|----------------------------|
| HITL / interrupt | Workflow request/response to external/human operators |
| Checkpointing / durability | Workflow persistence / executor state |
| Streaming | Streaming chat/agent responses in .NET/Python APIs |
| Structured output | Strong typed contracts on .NET; schema validation |
| Evals / tracing | Azure Monitor / OTel integrations |
| Multi-agent | Workflows composing multiple agents/executors |
| MCP | MCP tool bridges in Agent Framework docs |

---

## Proprietary indices (EST)

| Index | Score | Direction |
|-------|------:|-----------|
| LIE | 52 | lower better |
| CTI | 36 | lower better |
| FMC | 80 | higher better |
| GED | 86 | higher better |
| RACS | 76 | higher better |
| RHS | 19.4 | lower better |
| PR | 88 | higher better |

---

## Deep notes

Microsoft Agent Framework is the **greenfield Microsoft pick** (AFFIX 80.91, RHS 19.4). Semantic Kernel orchestration is under succession pressure ([migration from SK](https://learn.microsoft.com/en-us/agent-framework/migration-guide/from-semantic-kernel)). HITL via workflow request/response to external/human operators ([HITL workflows](https://learn.microsoft.com/en-us/agent-framework/workflows/human-in-the-loop)).

**Persona rule:** SK AFFIX underprices greenfield risk; score MS for new work, SK only for brownfield with migration budget.

**Falsifier:** If Microsoft freezes SK orchestration as LTS without MAF migration pressure for 24 months, succession-tax claim fails.

## Citations (primary)

- https://learn.microsoft.com/en-us/agent-framework/overview/
- https://learn.microsoft.com/en-us/agent-framework/workflows/human-in-the-loop
- https://learn.microsoft.com/en-us/agent-framework/migration-guide/from-semantic-kernel
- https://github.com/microsoft/agent-framework
- https://pypi.org/project/agent-framework/
- https://langfuse.com/blog/2025-03-19-ai-agent-comparison

---

## Falsifier

If primary docs at the pin date lack the named primitives above for a dimension scored ≥80, that dimension must be rescored by ≥10 points.
