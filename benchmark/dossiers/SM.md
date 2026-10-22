# AFFIX-2026 Dossier: Hugging Face smolagents (SM)

**Category:** Code-act agents  
**Primary language:** Python  
**AFFIX composite:** **71.22** · RHS↓ **40.0** · PR↑ **78**  
**Evidence date:** 2026-10-22 (deepened for public publication)

| AF | CS | OB | TC | EG | RE | MF | PH | DX | FP |
|----|----|----|----|----|----|----|----|----|----|
| 78 | 55 | 50 | 60 | 75 | 80 | 85 | 68 | 95 | 80 |

| LIE↓ | CTI↓ | FMC↑ | GED↑ | RACS↑ | RHS↓ | PR↑ |
|------|------|------|------|-------|------|-----|
| 18.0 | 22.0 | 45.0 | 35.0 | 48.0 | 40.0 | 78 |

---

## One-liner

Tiny code-act agents with first-class sandbox backends.

## Best for / When NOT to use

**Best for:** Minimal code-act prototypes with real sandboxes

**When NOT to use:** Do not use smolagents as a sole production runtime for HITL/compliance; it is a code-act prototype vehicle with sandbox strengths and FMC gaps.

---

## Version pins (as of 2026-10-22)

- **pypi:** smolagents==1.26.0
- **notes:** HF docs pin v1.26.0

---

## API primitives (scoring anchors)

| Concern | Primary APIs / docs reality |
|---------|----------------------------|
| HITL / interrupt | No first-class durable interrupt API |
| Checkpointing / durability | None first-class |
| Streaming | Partial streaming of agent steps |
| Structured output | Weak; code-act returns over schema contracts |
| Evals / tracing | Minimal; external AgentOps etc. |
| Multi-agent | Managed multi-agent examples (multiagents docs) |
| MCP | MCP tool support in smolagents |

---

## Proprietary indices (EST)

| Index | Score | Direction |
|-------|------:|-----------|
| LIE | 18.0 | lower better |
| CTI | 22.0 | lower better |
| FMC | 45.0 | higher better |
| GED | 35.0 | higher better |
| RACS | 48.0 | higher better |
| RHS | 40.0 | lower better |
| PR | 78 | higher better |

---

## Deep notes

smolagents is a **code-act prototype vehicle**: tiny API, DX=95, LIE=18, SBOX=`yes` (E2B/Docker/Modal/…). Almost every other failure mode is thin (FMC=45, RHS=40). MCP present; HIT/DUR absent. Graduate to PydanticAI/OA for production.

**Falsifier:** First-class durable interrupt+trace APIs in core smolagents docs → raise FMC/PH.

## Citations (primary)

- https://huggingface.co/docs/smolagents/index
- https://huggingface.co/docs/smolagents/examples/multiagents
- https://huggingface.co/blog/smolagents
- https://github.com/huggingface/smolagents
- https://pypi.org/project/smolagents/
- https://huggingface.co/docs/smolagents/en/reference/agents

---

## Falsifier

If primary docs at the pin date lack the named primitives above for a dimension scored ≥80, that dimension must be rescored by ≥10 points.
