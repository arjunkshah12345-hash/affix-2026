# AFFIX-2026 Dossier: Mastra (MA)

**Category:** TS agent platform (agents + workflows + memory)  
**Primary language:** TypeScript  
**AFFIX composite:** **82.49** · RHS↓ **20.8** · PR↑ **89**  
**Evidence date:** 2026-10-22 (deepened for public publication)

| AF | CS | OB | TC | EG | RE | MF | PH | DX | FP |
|----|----|----|----|----|----|----|----|----|----|
| 88 | 85 | 88 | 86 | 72 | 78 | 70 | 80 | 86 | 88 |

| LIE↓ | CTI↓ | FMC↑ | GED↑ | RACS↑ | RHS↓ | PR↑ |
|------|------|------|------|-------|------|-----|
| 32.0 | 34.0 | 72.0 | 78.0 | 84.0 | 20.8 | 89 |

---

## One-liner

TypeScript agents + workflows + memory; the TS continuum bet beside AI SDK.

## Best for / When NOT to use

**Best for:** TypeScript agent OS: workflows, memory, HITL beside AI SDK UI

**When NOT to use:** Do not use Mastra for JVM estates or when you only need a chat UI without workflows/memory — AI SDK alone is enough; also avoid if you refuse any TS agent-platform opinions.

---

## Version pins (as of 2026-10-22)

- **npm:** @mastra/core@1.79.0
- **notes:** Mastra platform packages co-versioned

---

## API primitives (scoring anchors)

| Concern | Primary APIs / docs reality |
|---------|----------------------------|
| HITL / interrupt | Tool approval / suspend execution on agents and workflows |
| Checkpointing / durability | Workflow suspend/resume; memory + storage adapters |
| Streaming | Agent and workflow fullStream / streaming responses |
| Structured output | structured output with Zod/Valibot/JSON Schema |
| Evals / tracing | Logging, tracing, eval primitives on agents |
| Multi-agent | Subagents; workflow .then/.branch composition |
| MCP | Tools invoke remote MCP servers; MCP-first agent surface |

---

## Proprietary indices (EST)

| Index | Score | Direction |
|-------|------:|-----------|
| LIE | 32.0 | lower better |
| CTI | 34.0 | lower better |
| FMC | 72.0 | higher better |
| GED | 78.0 | higher better |
| RACS | 84.0 | higher better |
| RHS | 20.8 | lower better |
| PR | 89 | higher better |

---

## Deep notes

Mastra is the **TypeScript agent OS** bet: agents + workflows + memory + HITL suspend/approve ([HITL](https://mastra.ai/docs/agents/human-in-the-loop), [workflows](https://mastra.ai/docs/workflows/overview), [memory](https://mastra.ai/docs/memory/overview)). RACS=84 and RHS=20.8 beat AI SDK alone.

**Compose, don’t substitute:** Optimal TS stack is VS (UI stream contracts) + MA (workflows/HITL) or VS + Inngest. Treating Mastra as a chat UI kit wastes DX; treating AI SDK as an agent OS burns RHS.

**Falsifier:** If Mastra Studio/enterprise gravity forces LIE>50 in practice, prefer VS+Inngest only.

## Citations (primary)

- https://mastra.ai/docs/agents/overview
- https://mastra.ai/docs/agents/human-in-the-loop
- https://mastra.ai/docs/agents/structured-output
- https://mastra.ai/docs/agents/tools
- https://mastra.ai/docs/workflows/overview
- https://mastra.ai/docs/memory/overview
- https://mastra.ai/
- https://github.com/mastra-ai/mastra

---

## Falsifier

If primary docs at the pin date lack the named primitives above for a dimension scored ≥80, that dimension must be rescored by ≥10 points.
