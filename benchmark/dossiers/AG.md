# AFFIX-2026 Dossier: AutoGen / AG2 (AG)

**Category:** Multi-agent / AgentOS  
**Primary language:** Python  
**AFFIX composite:** **76.51** · RHS↓ **36.0** · PR↑ **76**  
**Evidence date:** 2026-10-22 (deepened for public publication)

| AF | CS | OB | TC | EG | RE | MF | PH | DX | FP |
|----|----|----|----|----|----|----|----|----|----|
| 88 | 85 | 82 | 72 | 78 | 70 | 55 | 72 | 68 | 85 |

| LIE↓ | CTI↓ | FMC↑ | GED↑ | RACS↑ | RHS↓ | PR↑ |
|------|------|------|------|-------|------|-----|
| 42.0 | 83.6 | 72.0 | 95.0 | 62.0 | 36.0 | 76 |

---

## One-liner

Multi-agent research topologies (GroupChat/Network) with high expressiveness.

## Best for / When NOT to use

**Best for:** Research multi-agent topologies and debates

**When NOT to use:** Do not productize research GroupChat topologies without a serve-path rewrite plan (RHS high). Classic→v1 is non-drop-in.

---

## Version pins (as of 2026-10-22)

- **pypi:** ag2==1.2.1
- **notes:** Classic stack separately maintained (ag2-classic)

---

## API primitives (scoring anchors)

| Concern | Primary APIs / docs reality |
|---------|----------------------------|
| HITL / interrupt | Human proxy agents / input requests in chat patterns |
| Checkpointing / durability | Partial; session/state helpers, not LG-class default |
| Streaming | Streaming tokens/messages in group chats |
| Structured output | Partial typed messages; weaker than PD/VS |
| Evals / tracing | Telemetry user guide (OTel middleware) |
| Multi-agent | GroupChat, Network, channel protocols — highest GED |
| MCP | MCP integrations present; less polished than AD/PD |

---

## Proprietary indices (EST)

| Index | Score | Direction |
|-------|------:|-----------|
| LIE | 42.0 | lower better |
| CTI | 83.6 | lower better |
| FMC | 72.0 | higher better |
| GED | 95.0 | higher better |
| RACS | 62.0 | higher better |
| RHS | 36.0 | lower better |
| PR | 76 | higher better |

---

## Deep notes

AG2 leads **GED=95** (GroupChat/Network/channels) with RHS=36 — topology density without low CTI/PH predicts research success and product rewrite. Classic→v1 is non-drop-in ([ag2](https://github.com/ag2ai/ag2), [ag2-classic](https://github.com/ag2ai/ag2-classic)). Telemetry via OTel middleware ([telemetry](https://docs.ag2.ai/docs/user-guide/telemetry/)).

**Falsifier:** Drop-in Classic compatibility for GroupChat apps → cut succession tax narrative.

## Citations (primary)

- https://docs.ag2.ai/
- https://docs.ag2.ai/docs/user-guide/telemetry/
- https://www.ag2.ai/
- https://github.com/ag2ai/ag2
- https://github.com/ag2ai/ag2-classic
- https://arxiv.org/abs/2308.08155
- https://pypi.org/project/ag2/

---

## Falsifier

If primary docs at the pin date lack the named primitives above for a dimension scored ≥80, that dimension must be rescored by ≥10 points.
