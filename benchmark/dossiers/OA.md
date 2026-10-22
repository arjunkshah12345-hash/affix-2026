# AFFIX-2026 Dossier: OpenAI Agents SDK (OA)

**Category:** Agent runtime  
**Primary language:** Python (also JS SDK)  
**AFFIX composite:** **82.71** · RHS↓ **24.2** · PR↑ **81**  
**Evidence date:** 2026-10-22 (deepened for public publication)

| AF | CS | OB | TC | EG | RE | MF | PH | DX | FP |
|----|----|----|----|----|----|----|----|----|----|
| 86 | 90 | 88 | 85 | 82 | 85 | 48 | 88 | 90 | 70 |

| LIE↓ | CTI↓ | FMC↑ | GED↑ | RACS↑ | RHS↓ | PR↑ |
|------|------|------|------|-------|------|-----|
| 55.0 | 30.8 | 82.0 | 55.0 | 55.0 | 24.2 | 81 |

---

## One-liner

OpenAI's agent runtime: handoffs, guardrails, HITL RunState, MCP, sandbox agents.

## Best for / When NOT to use

**Best for:** OpenAI-standardized orgs needing handoffs, guardrails, sandbox code-act

**When NOT to use:** Do not use as the sole stack if you require vendor-neutral ops (Traces/Sandbox/session gravity is real), or if you need open graph checkpoint export across non-OpenAI runtimes without adapters.

---

## Version pins (as of 2026-10-22)

- **pypi:** openai-agents==0.24.0
- **notes:** Also openai-agents JS SDK

---

## API primitives (scoring anchors)

| Concern | Primary APIs / docs reality |
|---------|----------------------------|
| HITL / interrupt | Tool needs_approval → interruptions; RunState serialize/resume |
| Checkpointing / durability | Sessions + RunState; Temporal/Restate integrations for durable runs |
| Streaming | Runner streaming events; results stream APIs |
| Structured output | Agent output types / structured outputs on agents |
| Evals / tracing | Built-in tracing; exportable spans; guardrail hooks |
| Multi-agent | handoffs(); Agent.as_tool(); nested agent runs |
| MCP | MCP servers as tools (multiple transports) |

---

## Proprietary indices (EST)

| Index | Score | Direction |
|-------|------:|-----------|
| LIE | 55.0 | lower better |
| CTI | 30.8 | lower better |
| FMC | 82.0 | higher better |
| GED | 55.0 | higher better |
| RACS | 55.0 | higher better |
| RHS | 24.2 | lower better |
| PR | 81 | higher better |

---

## Deep notes

OpenAI Agents SDK is a **runtime**, not a graph DSL. Core loop: Agent(instructions, tools, handoffs, guardrails, MCP) → Runner until final output. HITL is approval-centric: tools declare approval need; interruptions surface on the outer run including nested `Agent.as_tool()`; `RunState` serializes paused runs ([HITL](https://openai.github.io/openai-agents-python/human_in_the_loop/)).

**Lock-in claim:** LiteLLM/AnyLLM model portability does not cancel ops gravity (Traces, Sessions, Sandbox, Responses defaults) — LIE=55. Score MF=48 accordingly.

**Sandbox:** First-class code-execution isolation is rare in Tier-A; OA and smolagents are the bipolar winners for SBOX.

**Falsifier:** Production OA with zero OpenAI-hosted ops and full feature parity → LIE overstated.

## Citations (primary)

- https://openai.github.io/openai-agents-python/
- https://openai.github.io/openai-agents-python/human_in_the_loop/
- https://openai.github.io/openai-agents-python/handoffs/
- https://openai.github.io/openai-agents-python/tracing/
- https://openai.github.io/openai-agents-python/guardrails/
- https://openai.github.io/openai-agents-python/mcp/
- https://openai.github.io/openai-agents-python/sessions/
- https://github.com/openai/openai-agents-python

---

## Falsifier

If primary docs at the pin date lack the named primitives above for a dimension scored ≥80, that dimension must be rescored by ≥10 points.
