# AFFIX-2026 Dossier: Google ADK (Agent Development Kit) (AD)

**Category:** Google agent kit / multi-agent workflows  
**Primary language:** Python / TypeScript / Go / Java / Kotlin  
**AFFIX composite:** **82.5** · RHS↓ **25.1** · PR↑ **96**  
**Evidence date:** 2026-10-22 (deepened for public publication)

| AF | CS | OB | TC | EG | RE | MF | PH | DX | FP |
|----|----|----|----|----|----|----|----|----|----|
| 90 | 88 | 90 | 75 | 80 | 82 | 52 | 88 | 80 | 92 |

| LIE↓ | CTI↓ | FMC↑ | GED↑ | RACS↑ | RHS↓ | PR↑ |
|------|------|------|------|-------|------|-----|
| 45.0 | 61.6 | 80.0 | 90.0 | 72.0 | 25.1 | 96 |

---

## One-liner

Google's multi-language agent kit; protocol leader (MCP+A2A) with graph HITL nodes.

## Best for / When NOT to use

**Best for:** Multi-agent graphs with MCP+A2A and Google deploy paths

**When NOT to use:** Avoid as primary if you are not willing to accept Google-ecosystem gravity (deploy/A2A/GCP adjacency) or if you need the simplest typed Python DX — AD's CTI and MF punish small teams.

---

## Version pins (as of 2026-10-22)

- **pypi:** google-adk==2.12.0
- **notes:** Multi-lang: Python/TS/Go/Java/Kotlin; HITL graphs from v2.0.0

---

## API primitives (scoring anchors)

| Concern | Primary APIs / docs reality |
|---------|----------------------------|
| HITL / interrupt | RequestInput graph nodes (deterministic HITL) |
| Checkpointing / durability | Session/state + deploy runtimes; graph persistence patterns |
| Streaming | Events stream; artifact updates |
| Structured output | Typed tools / schema configs (lang-dependent) |
| Evals / tracing | OTel traces (observability/traces); logging |
| Multi-agent | Multi-agent trees; A2A remote agents |
| MCP | MCP tools client; expose via A2A/MCP server patterns |

---

## Proprietary indices (EST)

| Index | Score | Direction |
|-------|------:|-----------|
| LIE | 45.0 | lower better |
| CTI | 61.6 | lower better |
| FMC | 80.0 | higher better |
| GED | 90.0 | higher better |
| RACS | 72.0 | higher better |
| RHS | 25.1 | lower better |
| PR | 96 | higher better |

---

## Deep notes

Google ADK is the **protocol king** (PR=96): MCP tools + Agent2Agent (A2A) + OTel traces + LiteLLM model bridge. HITL uses deterministic `RequestInput` graph nodes — not model-mediated “ask human” tools ([human input](https://adk.dev/graphs/human-input/), [A2A](https://adk.dev/a2a/), [MCP](https://adk.dev/tools-custom/mcp-tools/)).

**Paradox:** Protocol-ready ≠ migration-easy (MF=52). Cloud/deploy gravity remains. CTI=61.6 reflects multi-agent graph + multi-language surface.

**Falsifier:** ≥3 public case studies exporting ADK graph state to a non-ADK runtime without rewrite → raise MF.

## Citations (primary)

- https://adk.dev/
- https://adk.dev/graphs/human-input/
- https://adk.dev/agents/multi-agents/
- https://adk.dev/a2a/
- https://adk.dev/tools-custom/mcp-tools/
- https://adk.dev/observability/traces/
- https://adk.dev/agents/models/litellm/
- https://github.com/google/adk-python

---

## Falsifier

If primary docs at the pin date lack the named primitives above for a dimension scored ≥80, that dimension must be rescored by ≥10 points.
