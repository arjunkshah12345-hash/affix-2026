# AFFIX-2026 Dossier: PydanticAI (PD)

**Category:** Typed agents / Python AI SDK  
**Primary language:** Python  
**Cluster:** Typed / DX-first  
**AFFIX composite:** **87.64** (highest in-set) · RHS↓ **17.3** · PR↑ **91**  
**Evidence date:** 2026-10-22

| AF | CS | OB | TC | EG | RE | MF | PH | DX | FP |
|----|----|----|----|----|----|----|----|----|----|
| 90 | 88 | 92 | 96 | 78 | 80 | 82 | 90 | 88 | 90 |

| LIE↓ | CTI↓ | FMC↑ | GED↑ | RACS↑ | RHS↓ | PR↑ |
|------|------|------|------|-------|------|-----|
| 22 | 30 | 78 | 72 | 80 | 17.3 | 91 |

---

## One-liner

Typed Python agent SDK with first-party durable engines and OTel-native observability.

## Best for

Typed Python production agents: validated tools, structured outputs, durable background runs, portable telemetry.

## When NOT to use

Do not pick PydanticAI when the product is a React/Next streaming UI (use Vercel AI SDK ± Mastra), when the bottleneck is automatic prompt/demo search (use DSPy as a **compiler** then serve here), or when you need LangGraph-class arbitrary mid-graph `interrupt()` without adopting a durable engine or Harness `StepPersistence`. Hiring gravity lags LangChain — budget ramp time if the team is LC-native.

---

## Version pins (2026-10-22)

| Package | Pin |
|---------|-----|
| PyPI `pydantic-ai` | **2.59.0** |
| Companion | `pydantic-ai-harness` (capabilities: memory, guardrails, sub-agents, sandboxes) |
| Optional | Pydantic Logfire, Pydantic Evals, Pydantic Graph |

---

## API primitives (scoring anchors)

| Concern | Named APIs / docs reality |
|---------|---------------------------|
| **HITL / interrupt** | Deferred tool approval in durable runs; Harness approval; AG-UI tool-approval interrupts ([AG-UI](https://pydantic.dev/docs/ai/integrations/ui/ag-ui/)) |
| **Checkpointing** | `StepPersistence` (Harness); `TemporalDurability`, DBOS, Prefect, Restate, AWS Lambda, Airflow, Absurd, pgtask ([durable execution](https://pydantic.dev/docs/ai/capabilities/durable_execution/overview/)) |
| **Streaming** | `agent.run` / `StreamedRunResult`; AG-UI and Vercel AI UI bridges |
| **Structured output** | `Agent(..., output_type=Model)` — tool / native / prompted modes; Pydantic validation + LLM retry ([output](https://pydantic.dev/docs/ai/core-concepts/output/)) |
| **Evals / tracing** | `logfire.instrument_pydantic_ai()`; `Instrumentation` capability (plain OTel); [Pydantic Evals](https://pydantic.dev/docs/ai/evals/evals/) |
| **Multi-agent** | Capabilities (`SubAgents`, deferred capabilities); [multi-agent guide](https://pydantic.dev/docs/ai/guides/multi-agent-applications/); Pydantic Graph |
| **MCP** | `capabilities=[MCP('https://…')]`; [`pydantic_ai.mcp`](https://pydantic.dev/docs/ai/api/pydantic-ai/mcp/); [MCP capability docs](https://pydantic.dev/docs/ai/capabilities/mcp/) |

---

## Deep topics

### Structured outputs / schema validation

`output_type` accepts Pydantic models, dataclasses, TypedDicts, scalars, unions/lists. Default path uses **tool calling** for structured return; modes include native structured output and prompted schema. Validation via Pydantic; streaming via `StreamedRunResult` generics. Guarantees are runtime (Pydantic) + static generics for IDE/typecheckers — best Python contract experience in-set (TC=96).

### Durable execution (PH driver)

First-party durability is not “bring your own Temporal glue”: engines attach as capabilities (e.g. `TemporalDurability()` on `Agent`, `PydanticAIWorkflow`). Docs state durable agents retain MCP and HITL approval. This is why PH=90 and RHS stays low even without LangGraph checkpoints.

### Observability

OpenTelemetry-native spans for model/tool calls; Logfire is the ergonomic backend, not a hard dependency. Any OTLP backend works — OB=92 and PR OTel component ≈98.

### Streaming UX

Strong server streaming; product UI is intentionally bridged (AG-UI / Vercel AI) rather than owning React hooks. Pair with AI SDK on the frontend when UX streaming is the product.

### Cognitive tax (CTI = 30 EST)

Core path: `Agent` + `output_type` + `@agent.tool` + `RunContext` + run/stream + basic OTel. Expansion tax: Graph, Harness, durable engine choice, Evals. Types pay down runtime debugging.

---

## Proprietary indices (EST)

| Index | Score | Notes |
|-------|------:|-------|
| LIE | 22 | Low lock-in; optional commercial Logfire/Gateway/Harness |
| CTI | 30 | FastAPI muscle memory for core agent |
| FMC | 78 | Broad failure APIs; SBOX via Harness sandboxes not core |
| GED | 72 | Graph when needed, not forced |
| RACS | 80 | Extraction → tools → multi-agent → durable |
| RHS | **17.3** | Best rewrite-safety in-set (worked example in METHODOLOGY_FULL) |
| PR | 91 | MCP + OTel + typed contracts |

---

## Scoring claims → citations

| Claim | Citation |
|-------|----------|
| Typed agent loop + model string swap | [Overview](https://pydantic.dev/docs/ai/overview/) |
| `output_type` structured modes | [Output](https://pydantic.dev/docs/ai/core-concepts/output/) |
| Agent / tools / deps | [Agent](https://pydantic.dev/docs/ai/core-concepts/agent/) |
| Eight durable engines + HITL | [Durable execution](https://pydantic.dev/docs/ai/capabilities/durable_execution/overview/) |
| MCP capability | [MCP](https://pydantic.dev/docs/ai/capabilities/mcp/) |
| OTel / Logfire | [Logfire integration](https://pydantic.dev/docs/ai/integrations/logfire/) |
| Trajectory / dataset evals | [Pydantic Evals](https://pydantic.dev/docs/ai/evals/evals/) |
| Source of truth | [GitHub pydantic-ai](https://github.com/pydantic/pydantic-ai) |

---

## Falsifier

If primary docs at pin date lack named durable-engine APIs or MCP capability for scores PH≥85 / FP≥85, rescore those dimensions by ≥10.
