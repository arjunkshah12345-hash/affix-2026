# AFFIX-2026 Dossier: CrewAI (CR)

**Category:** Role-based crews + flows  
**Primary language:** Python  
**AFFIX composite:** **79.6** · RHS↓ **28.4** · PR↑ **78**  
**Evidence date:** 2026-10-22 (deepened for public publication)

| AF | CS | OB | TC | EG | RE | MF | PH | DX | FP |
|----|----|----|----|----|----|----|----|----|----|
| 84 | 80 | 78 | 78 | 90 | 72 | 65 | 76 | 92 | 75 |

| LIE↓ | CTI↓ | FMC↑ | GED↑ | RACS↑ | RHS↓ | PR↑ |
|------|------|------|------|-------|------|-----|
| 38.0 | 39.6 | 70.0 | 65.0 | 70.0 | 28.4 | 78 |

---

## One-liner

Role-based crews and Flows with approachable multi-agent DX.

## Best for / When NOT to use

**Best for:** Fast role-based multi-agent demos and Flows

**When NOT to use:** Do not ship role-play crew demos as regulated production without Flows/checkpoints/guardrails hardening; concurrent state races are under-specified vs graphs.

---

## Version pins (as of 2026-10-22)

- **pypi:** crewai==1.15.28
- **notes:** Docs versioned under /v1.15.x/

---

## API primitives (scoring anchors)

| Concern | Primary APIs / docs reality |
|---------|----------------------------|
| HITL / interrupt | Human-in-the-loop workflows (task/flow interruption) |
| Checkpointing / durability | CheckpointConfig; crew/flow/agent snapshots; resume/fork |
| Streaming | Streaming task/crew outputs |
| Structured output | Pydantic models on tasks/outputs (partial strictness) |
| Evals / tracing | Tracing docs (observability/tracing); AMP gravity |
| Multi-agent | Crew roles; Process.hierarchical; Flows |
| MCP | MCP tool integration in recent docs |

---

## Proprietary indices (EST)

| Index | Score | Direction |
|-------|------:|-----------|
| LIE | 38.0 | lower better |
| CTI | 39.6 | lower better |
| FMC | 70.0 | higher better |
| GED | 65.0 | higher better |
| RACS | 70.0 | higher better |
| RHS | 28.4 | lower better |
| PR | 78 | higher better |

---

## Deep notes

CrewAI optimizes for **role DX**: crews, hierarchical process, Flows, checkpointing, HITL ([HITL](https://docs.crewai.com/v1.15.2/en/learn/human-in-the-loop), [checkpointing](https://docs.crewai.com/v1.15.2/en/concepts/checkpointing)). DX=92 with DX−PH surplus → RHS 28.4. Concurrent state races under-specified vs LangGraph reducers (CSR=`no`).

**Topology:** `Process.hierarchical` ≠ OA handoffs ≠ AG2 GroupChat.

**Falsifier:** If hardened Crew Flows match LG FMC checklist on durable HITL+CSR, raise FMC/PH.

## Citations (primary)

- https://docs.crewai.com/
- https://docs.crewai.com/v1.15.2/en/learn/human-in-the-loop
- https://docs.crewai.com/v1.15.2/en/concepts/checkpointing
- https://docs.crewai.com/v1.15.2/en/learn/hierarchical-process
- https://docs.crewai.com/v1.15.28/en/concepts/flows
- https://docs.crewai.com/edge/en/observability/tracing
- https://github.com/crewAIInc/crewAI

---

## Falsifier

If primary docs at the pin date lack the named primitives above for a dimension scored ≥80, that dimension must be rescored by ≥10 points.
