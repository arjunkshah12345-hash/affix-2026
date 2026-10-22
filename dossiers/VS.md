# AFFIX-2026 Dossier: Vercel AI SDK (VS)

**Category:** App-layer AI / TypeScript agent toolkit  
**Primary language:** TypeScript  
**AFFIX composite:** **81.52** · RHS↓ **32.9** · PR↑ **87**  
**Evidence date:** 2026-10-22

| AF | CS | OB | TC | EG | RE | MF | PH | DX | FP |
|----|----|----|----|----|----|----|----|----|----|
| 82 | 72 | 70 | 92 | 95 | 88 | 75 | 68 | 94 | 85 |

| LIE↓ | CTI↓ | FMC↑ | GED↑ | RACS↑ | RHS↓ | PR↑ |
|------|------|------|------|-------|------|-----|
| 35 | 22 | 55 | 42 | 65 | 32.9 | 87 |

---

## One-liner

Default TypeScript app-layer AI toolkit for streamed UIs and typed tools.

## Best for

Customer-facing AI UIs (especially Next.js/React): `useChat`, typed tool parts, structured generation, provider-agnostic model strings.

## When NOT to use

Do **not** run the AI SDK alone as a durable/compliance agent OS. `ToolLoopAgent` is in-memory; crash recovery and durable tool approval require `@ai-sdk/workflow` `WorkflowAgent` plus a workflow runtime. Weak native RAG platform, concurrent state control, and idempotency APIs. For agent OS concerns, compose with Mastra or Inngest.

---

## Version pins (2026-10-22)

| Package | Pin |
|---------|-----|
| npm `ai` | **7.0.148** |
| Durability | `@ai-sdk/workflow` + `workflow@5` (`WorkflowAgent`) |
| MCP | `@ai-sdk/mcp` (`createMCPClient`) |

**Note:** AI SDK 7 replaces Workflow DevKit `DurableAgent` with `WorkflowAgent` exported from `@ai-sdk/workflow` — still a companion package, not core `ai` alone. **Scores unchanged** for sole-stack VS (PH/FMC remain mid/low).

---

## API primitives (scoring anchors)

| Concern | Named APIs / docs reality |
|---------|---------------------------|
| **HITL / interrupt** | `toolApproval` on `generateText` / `streamText` / `ToolLoopAgent` (AI SDK 7; `needsApproval` on tools deprecated); durable approval via `WorkflowAgent` |
| **Checkpointing** | `WorkflowAgent` persists steps inside workflows; `ToolLoopAgent` lost on crash ([WorkflowAgent](https://ai-sdk.dev/docs/agents/workflow-agent)) |
| **Streaming** | `streamText`, `useChat`, UIMessage parts, `createAgentUIStreamResponse` — cluster leader |
| **Structured output** | `Output.object/array/choice/json/text` with Zod/Valibot/JSON Schema ([structured data](https://ai-sdk.dev/docs/ai-sdk-core/generating-structured-data)) |
| **Evals / tracing** | `telemetry` (stabilized in AI SDK 7; was `experimental_telemetry`); DevTools |
| **Multi-agent** | Tool loops + tools-as-agents; not a graph OS (GED 42) |
| **MCP** | `createMCPClient` from `@ai-sdk/mcp` (HTTP/SSE) ([MCP tools](https://ai-sdk.dev/docs/ai-sdk-core/mcp-tools)) |

---

## Deep topics

### Why AFFIX is high but RHS is not

AFFIX rewards EG=95, DX=94, TC=92, RE=88. RHS penalizes RACS=65, FMC=55, PH=68, and **DX−PH = 26** (largest surplus among AFFIX≥81 frameworks). Worked RHS example in `publish/METHODOLOGY_FULL.md` → **32.9**.

### Structured outputs

Final output schema-validated; failure → `AI_NoObjectGeneratedError`. Partial streams progressive until complete. Structured generation counts as a step under `stopWhen`.

### Control / production

`stopWhen`, `prepareStep`, `toolApproval`, middleware, telemetry. Durable loops via `WorkflowAgent` adjacency — score PH as if teams ship `ai` alone unless they explicitly adopt workflow.

### Cognitive tax (CTI = 22 EST)

Lowest in-set for chat→tool agent: provider string, `tool`+schema, `streamText`/`ToolLoopAgent`, route→`useChat`, optional `Output.object`, telemetry.

---

## Proprietary indices (EST)

| Index | Score | Notes |
|-------|------:|-------|
| LIE | 35 | Mild Gateway/Workflow/Elements gravity |
| CTI | **22** | Lowest for product chat agents |
| FMC | 55 | Gaps without workflow companion |
| GED | 42 | Loop ≠ graph |
| RACS | 65 | App→agent strong; RAG platform weak |
| RHS | **32.9** | High rewrite hazard as sole OS |
| PR | 87 | Strong MCP client + schemas + telemetry |

---

## Citations (primary)

- https://ai-sdk.dev/
- https://ai-sdk.dev/docs/ai-sdk-core/generating-structured-data
- https://ai-sdk.dev/docs/reference/ai-sdk-core/tool-loop-agent
- https://ai-sdk.dev/docs/agents/workflow-agent
- https://ai-sdk.dev/docs/ai-sdk-core/mcp-tools
- https://ai-sdk.dev/docs/ai-sdk-core/telemetry
- https://vercel.com/changelog/ai-sdk-7
- https://github.com/vercel/ai

---

## Falsifier

If core `ai` (without `@ai-sdk/workflow`) documents crash-safe mid-loop resume comparable to LangGraph checkpointers, raise PH/FMC and recompute RHS.
