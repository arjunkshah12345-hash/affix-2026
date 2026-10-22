# Production Hardening — AFFIX-2026 Deep Dive

**Study:** AFFIX-2026 · **As of:** 2026-10-21  
**PH scale:** 0–100, higher better (AFFIX weight **0.10**).  
**Canonical scores:** `benchmark/scores/affix_matrix.json`  
**Related:** FMC (failure-mode coverage), RHS (rewrite hazard; includes `100−PH` and `max(0, DX−PH)`), spot-check Inngest (**IN** PH≈95).

---

## LIE scale reminder

Canonical **LIE = 0–100 (lower better)**. Cluster tables that show LIE≈1.8–5.6 are on a **0–10** draft scale; multiply by **10** before comparing to this memo or the matrix. Full taxonomy: [`lock_in_taxonomy.md`](./lock_in_taxonomy.md).

---

## What PH measures

| Sub-area | Examples of first-class support |
|----------|----------------------------------|
| Auth & secrets | Tool auth layers, secret stores, gateway keys |
| Timeouts & budgets | Max turns, RPM, step limits, cancel |
| Retries & partial failure | Tool error → LLM, schema retry, backoff |
| Idempotency | Side-effect-safe replay after crash |
| Durable execution | Checkpoints, Temporal/DBOS/Inngest/Workflow |
| HITL in production | Durable pause/resume, webhooks, not console-only |
| Guardrails / sandbox | Input/output/tool rails, code-act isolation |
| Concurrent state | Reducers, `edit_state`, thread isolation |
| Deploy / ops | Agent servers, K8s/Cloud Run, JVM Spring model |

---

## Ranking (matrix PH)

| Rank | ID | Framework | PH ↑ | DX | DX−PH | FMC | Hardening headline |
|-----:|----|-----------|-----:|---:|------:|----:|--------------------|
| 1 | LG | LangGraph | **93** | 65 | −28 | 90 | Checkpointers, interrupts, time-travel, Agent Server |
| 2 | PD | PydanticAI | **90** | 88 | −2 | 78 | Durable engines (Temporal/DBOS/…), Harness, Logfire |
| 3 | OA | OpenAI Agents SDK | **88** | 91 | +3 | 84* | Sessions, guardrails, sandbox, flush_traces |
| 3 | AD | Google ADK | **88** | 80 | −8 | 81* | Resume/cancel, RequestInput HITL, Cloud deploy |
| 3 | MS | Microsoft Agent Framework | **88** | — | — | — | Enterprise sessions / Azure ops **EST** |
| 3 | SP | Spring AI | **88** | 70 | −18 | — | Spring Security + Micrometer + starters |
| 7 | MA | Mastra | **80** | 86 | +6 | 72 | Workflow suspend/resume, memory, guardrails |
| 7 | SK | Semantic Kernel | **80** | 62 | −18 | 68* | Enterprise .NET/Python ops; succession to MS |
| 9 | LI | LlamaIndex | **78** | 78 | 0 | 72 | Durable via DIY checkpoint / DBOS; HITL events |
| 10 | CR | CrewAI | **76** | 92 | **+16** | 71* | Checkpoints + enterprise HITL webhooks; AMP gravity |
| 11 | LC | LangChain | **75** | 80 | +5 | 74 | Inherits LG when checkpointer set; middleware HITL |
| 12 | AG | AutoGen / AG2 | **72** | 68 | −4 | 74* | Channel TTL/governance; weaker durable resume vs OA/AD |
| 12 | HS | Haystack | **72** | 82 | +10 | 68 | Tool HITL hooks; **no** LG-class multi-day checkpointer |
| 14 | VS | Vercel AI SDK | **68** | 94 | **+26** | 55 | `needsApproval`/stopWhen; durability via Workflow/Inngest |
| 14 | SM | smolagents | **68** | 95 | **+27** | 46* | Strong sandbox options; weak durable HITL/trace |
| 16 | DS | DSPy | **55** | 72 | +17 | 35 | Optimizer-grade quality; runtime hardening BYO |

\*Cluster dossier FMC where matrix FMC not always listed the same — use matrix when present.

---

## Framework hardening profiles

### LangGraph — PH champion (93)

- **Persistence:** Checkpointer (thread) + Store (cross-thread) ([persistence](https://docs.langchain.com/oss/python/langgraph/persistence)). Postgres/SQLite for prod; `InMemorySaver` does not survive restarts.
- **HITL:** Arbitrary `interrupt()` with durable resume ([interrupts](https://docs.langchain.com/oss/python/langgraph/interrupts)) — stronger than tool-only gates.
- **Tradeoff:** Highest PH **and** high LIE (**68**) — checkpoint schemas *are* the product. DX 65 → teams underinvest in learning, then over-rely on Agent Server (ops lock).
- **Falsifier:** Documented interrupt edge cases ([#6362](https://github.com/langchain-ai/langgraph/issues/6362)) — FMC ≠ 100.

### PydanticAI — durable-by-composition (90)

- First-party durable execution adapters: Temporal, DBOS, Prefect, Restate, Lambda, Airflow, … ([durable execution](https://pydantic.dev/docs/ai/capabilities/durable_execution/overview/), [Temporal blog](https://temporal.io/blog/build-durable-ai-agents-pydantic-ai-and-temporal)).
- Runtime: timeouts, retries, usage limits, Harness HITL, Gateway cost control.
- **Pattern:** Best Python “typed agent + real workflow engine” pairing; PH without LangGraph checkpoint lock (LIE **22**).

### OpenAI Agents SDK (88)

- Interruptions/resume, tool approvals, input/output/tool guardrails, sessions backends, sandbox agents ([SDK](https://openai.github.io/openai-agents-python/), [tracing](https://openai.github.io/openai-agents-python/tracing/)).
- **Hardening cliffs:** ZDR disables tracing; handoff calls bypass some tool guardrails (dossier); MaxTurnsExceeded as explicit failure mode.
- **LIE 55:** PH is excellent *inside* OpenAI ops gravity.

### Google ADK (88)

- Resume/cancel/runconfig, deterministic `RequestInput` HITL nodes ([human input](https://adk.dev/graphs/human-input/)), OTel, safety, tool confirmation, Agent Runtime / Cloud Run / GKE deploy ([traces](https://adk.dev/observability/traces/)).
- Container self-host + LiteLLM = escape hatch; GCP remains paved road (LIE **45**).

### Mastra (80)

- Workflow `.then/.branch/.parallel` + suspend/resume HITL; memory processors; guardrails; scorers ([workflows](https://mastra.ai/docs/workflows/overview), [memory](https://mastra.ai/docs/memory/overview)).
- Concurrent state less battle-tested than LangGraph checkpoints (**EST**). Pair with Inngest when durability must outlive process memory ([spot-check IN](../spot-checks/IN.md)).

### LlamaIndex (78)

- Docs explicit: workflows **ephemeral by default**; durability needs checkpoint loop on `StepStateChanged` or **DBOS** plugin ([durable workflows](https://developers.llamaindex.ai/python/llamaagents/workflows/durable_workflows/)). At-least-once; idempotent side effects required.
- HITL via `InputRequiredEvent` / `HumanResponseEvent` ([HITL](https://developers.llamaindex.ai/python/llamaagents/workflows/human_in_the_loop/)).
- **API reality vs LG:** Real but more DIY → PH gap of ~15 points.

### CrewAI (76) — DX surplus risk

- Checkpointing, max RPM/iterations, guardrails, enterprise webhook HITL ([tracing](https://docs.crewai.com/edge/en/observability/tracing)).
- DX **92** − PH **76** = **+16** → RHS term fires (PROPRIETARY_FINDINGS #4). Ships demos fast; production AMP/HITL catches up later.

### LangChain (75)

- `create_agent` + `HumanInTheLoopMiddleware` + optional checkpointer ([HITL](https://docs.langchain.com/oss/python/langchain/human-in-the-loop), [short-term memory](https://docs.langchain.com/oss/python/langchain/short-term-memory)).
- Production durability is **LangGraph’s** — LC does not invent a second persistence model. Middleware/`state_schema` mutual exclusion in some paths ([issue #33217](https://github.com/langchain-ai/langchain/issues/33217)).

### Haystack (72)

- Strong in-run Agent controls: `max_agent_steps`, `exit_reason`, tool concurrency, `ConfirmationHook` HITL ([agent](https://docs.haystack.deepset.ai/docs/agent), [HITL](https://docs.haystack.deepset.ai/docs/human-in-the-loop)).
- **Gap:** No first-class multi-day checkpointer/time-travel product. YAML allowlists in 3.0 = security hardening win.
- Redis/SSE + Open WebUI patterns documented for prod HITL — still BYO durability.

### Vercel AI SDK (68) — largest DX−PH cliff

- `stopWhen`, `prepareStep`, tool `needsApproval`, middleware, telemetry ([AI SDK 6](https://vercel.com/blog/ai-sdk-6), [telemetry](https://ai-sdk.dev/docs/ai-sdk-core/telemetry)).
- Core `ai` package ≠ durable workflow engine. **DurableAgent** / Workflow DevKit / Inngest are the PH path.
- DX−PH **+26** → strongest rewrite predictor in-set when used alone for agent OS.

### Semantic Kernel (80) / MS (88)

- Enterprise auth, App Insights, Azure deploy story. Succession SK→MS is a hardening *and* lock-in event ([Agent Framework observability](https://learn.microsoft.com/en-us/agent-framework/agents/observability)).

### DSPy (55) — lowest PH

- Strength is metric-driven compile quality, not durable agent OS. Production timeouts/HITL/idempotency are out-of-band — compose with PD/LG/Inngest ([dspy.ai](https://dspy.ai/)).
- RHS **44.3** worst in matrix: low LIE does not save weak PH.

### smolagents (68)

- Sandbox depth (E2B/Docker/Modal) is a PH *strength*; durable HITL/checkpoint/trace APIs are weak ([HF docs](https://huggingface.co/docs/smolagents/index)). DX−PH **+27**.

### AG2 (72)

- HubArbiter, channel TTL, WsLink auth docs, OTel ([telemetry](https://docs.ag2.ai/docs/user-guide/telemetry/)). Durable resume/idempotency weaker than OA/ADK; Classic→v1 is itself a forced rewrite.

### Spring AI (88)

- Wins by hosting AI inside Spring Boot security/observability/deployment — not by agent-graph durability. Advisors ≠ Temporal. Correct pick for JVM estates ([Spring AI](https://spring.io/projects/spring-ai)).

---

## Cross-cutting PH findings

1. **Two hardening archetypes**
   - **Runtime-native:** LG checkpointers, OA sessions/sandbox, AD RequestInput.
   - **Compose-native:** PD+Temporal, VS+Inngest, LI+DBOS. Same PH destination; different LIE.

2. **DX surplus (DX−PH ≥ 15) maps to rewrite risk**  
   VS (+26), SM (+27), CR (+16), DS (+17). PD/AD/OA roughly balanced. LG has DX *deficit* (over-hardened relative to learnability).

3. **HITL quality hierarchy (production)**  
   LG arbitrary interrupt ≥ AD RequestInput nodes ≥ OA approvals/sessions ≥ Mastra suspend ≥ Crew webhook/enterprise ≥ HS ConfirmationHook ≥ VS needsApproval ≥ console-only.

4. **Idempotency is the silent FMC gap**  
   LI durable docs and LG restarts both require idempotent tools. Frameworks rarely enforce it — FMC overstates “crash safety” unless tools are designed for at-least-once.

5. **Observability is part of hardening**  
   ZDR (OA), AMP login (CR), LangSmith (LC/LG) are operational controls that gate incident response — scored under OB but felt as PH in outages.

6. **Spot-check ceiling:** Inngest AgentKit / durable steps ≈ PH **95** for TS — complements VS/MA rather than replacing them ([IN spot-check](../spot-checks/IN.md)).

---

## Decision guide (hardening-first)

| Constraint | Prefer | Avoid as sole runtime |
|------------|--------|------------------------|
| Multi-day threads + arbitrary HITL | LangGraph | VS alone, DSPy alone |
| Typed Python + Temporal already in-house | PydanticAI | Raw LCEL spaghetti |
| OpenAI-standardized + sandbox | OA | ZDR orgs (tracing cliff) |
| GCP deploy + A2A | ADK | Ignoring container escape |
| TS product + durable jobs | MA + Inngest (or VS + Inngest) | VS ToolLoopAgent alone |
| EU/OSS RAG, low SaaS | Haystack OTel | LangSmith-mandatory policy |
| JVM enterprise | Spring AI | Expecting LG-class graphs |
| Prompt quality under metric | DSPy **compile** + PD/LG **serve** | DSPy as only prod OS |

---

## Sources

- https://docs.langchain.com/oss/python/langgraph/persistence  
- https://docs.langchain.com/oss/python/langgraph/interrupts  
- https://docs.langchain.com/oss/python/langchain/human-in-the-loop  
- https://pydantic.dev/docs/ai/capabilities/durable_execution/overview/  
- https://openai.github.io/openai-agents-python/  
- https://adk.dev/graphs/human-input/  
- https://developers.llamaindex.ai/python/llamaagents/workflows/durable_workflows/  
- https://docs.haystack.deepset.ai/docs/human-in-the-loop  
- https://mastra.ai/docs/workflows/overview  
- https://ai-sdk.dev/docs/ai-sdk-core/telemetry  
- https://vercel.com/blog/ai-sdk-6  
- https://dspy.ai/  
- AFFIX matrix + dossiers under `benchmark/dossiers/`  
- `benchmark/findings/PROPRIETARY_FINDINGS.md` (RHS / DX−PH)  
