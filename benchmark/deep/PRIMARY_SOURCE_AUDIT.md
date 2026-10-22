# AFFIX-2026 Primary-Source Audit

**Study:** AFFIX-2026 · **Audit date:** 2026-10-22  
**Method:** Official docs only (TinyFish fetch of vendor documentation). No third-party blogs as evidence.  
**Scope:** PD, OA, AD, MA, LG, VS, LI, MS — top claims that drive public-posting credibility.  
**Rule:** If docs do not name the primitive, recommend lowering the related score. Do not invent APIs.

**Confidence scale:** 1 = thin / inferred · 5 = named APIs + explicit behavioral claims in official docs.

---

## PD — PydanticAI (RHS 17.3 claim)

**Claim under test:** Lowest rewrite hazard via typed agents + first-party durable engines + portable OTel/Logfire.

| # | Evidence (official) | URL |
|---|---------------------|-----|
| 1 | Eight durable engines named with install extras and attach APIs (`TemporalDurability`, `DBOSDurability`, `PrefectDurability`, `RestateAgent`, `AWSLambdaDurability`, `AbsurdDurability`, `PGTaskDurability`, Airflow `AgentOperator(..., durable=True)`); journal/replay semantics for crash/deploy survival | https://pydantic.dev/docs/ai/capabilities/durable_execution/overview/ |
| 2 | `Agent` is generic over deps/output; `output_type` with Pydantic validation; tools via `RunContext` — typed agent loop is first-class | https://pydantic.dev/docs/ai/core-concepts/agent/ · https://pydantic.dev/docs/ai/core-concepts/output/ |
| 3 | `logfire.instrument_pydantic_ai()` optional; Logfire built on OTel; docs explicitly allow any OTLP backend *without* Logfire | https://pydantic.dev/docs/ai/integrations/logfire/ |
| 4 | Follows OpenTelemetry Semantic Conventions for GenAI (docs cite conventions version) | https://pydantic.dev/docs/ai/integrations/logfire/ |
| 5 | MCP as capability: `MCP('https://…')` / `MCP(local=…)` / native `MCPServerTool` | https://pydantic.dev/docs/ai/capabilities/mcp/ |
| 6 | Durable engines co-maintained with vendors (Temporal/DBOS/Prefect/Restate/Lambda) — not “DIY Temporal glue” blogware | https://pydantic.dev/docs/ai/capabilities/durable_execution/overview/ |

**Score adjustment:** **KEEP** RHS 17.3, PH 90, OB 92, TC 96, AFFIX leadership.  
**Optional note (no change):** Sandbox/coder workspace durability lives in Harness — FMC 78 already discounts SBOX vs OA/SM.  
**Confidence:** **5**

---

## OA — OpenAI Agents SDK (LIE 55 ops-gravity claim)

**Claim under test:** Lock-in is ops gravity (Traces / Sessions / Sandbox / Responses defaults), not `pip` import count — despite LiteLLM/AnyLLM model portability marketing.

| # | Evidence (official) | URL |
|---|---------------------|-----|
| 1 | Tracing **enabled by default**; primary UX is OpenAI **Traces dashboard**; ZDR orgs cannot use tracing | https://openai.github.io/openai-agents-python/tracing/ |
| 2 | `add_trace_processor()` adds destinations *in addition to* OpenAI backend; `set_trace_processors()` required to *replace* default OpenAI export — portable OTel is opt-in replace, not default | https://openai.github.io/openai-agents-python/tracing/ |
| 3 | Non-OpenAI models can still send free traces to OpenAI Traces dashboard via OpenAI API key — gravity pulls even when model is swapped | https://openai.github.io/openai-agents-python/tracing/ |
| 4 | Built-in **Sessions** (`SQLiteSession`, etc.) auto-manage conversation history; resume-with-session couples HITL interruptions to session store | https://openai.github.io/openai-agents-python/sessions/ |
| 5 | **Sandbox agents** are a first-class product surface (isolated workspaces, resumable sandbox sessions) on the SDK overview | https://openai.github.io/openai-agents-python/ |
| 6 | Recommended model path is **OpenAI Responses API** (`OpenAIResponsesModel`); LiteLLM is documented as **best-effort, beta** | https://openai.github.io/openai-agents-python/models/ |
| 7 | HITL: `needs_approval` → interruptions; `RunState` serialize/resume — strong CS, orthogonal to LIE | https://openai.github.io/openai-agents-python/human_in_the_loop/ |

**Score adjustment:** **RAISE LIE 55 → 58** (+3 worse). Docs strengthen ops gravity beyond prior pin: default OpenAI trace export + Responses-recommended + LiteLLM explicitly beta. Keep MF 48. Keep RHS 24.2 unless LIE is folded into narrative only (RHS formula does not use LIE).  
**Confidence:** **5**

---

## AD — Google ADK (PR 96 claim)

**Claim under test:** Protocol Readiness leader via MCP client+server patterns, A2A expose/consume, OTel GenAI.

| # | Evidence (official) | URL |
|---|---------------------|-----|
| 1 | Dedicated A2A section: expose agent via A2A + consume remote A2A agents; quickstarts for Python/Go/Java | https://adk.dev/a2a/ |
| 2 | `McpToolset` MCP **client** integration (`pip install "google-adk[mcp]"`); multi-language support matrix | https://adk.dev/tools-custom/mcp-tools/ |
| 3 | MCP **server** pattern documented: wrap ADK tools with `to_mcp_server` / “Agent-Exposed MCP Server” | https://adk.dev/tools-custom/mcp-tools/ |
| 4 | OTel GenAI semantic conventions + OTLP; export to collector or Google Cloud Trace | https://adk.dev/observability/traces/ |
| 5 | Deterministic HITL: graph `RequestInput` nodes (model-free pause) — supports CS/PH, not PR | https://adk.dev/graphs/human-input/ |

**PR component check (EST vs docs):** MCP_client 95 ✓ · MCP_server 90 ✓ · A2A 100 ✓ · OTel 98 ✓ · OpenAPI bridge not re-audited this pass (prior EST 95). Weighted PR ≈96 still justified.  
**Score adjustment:** **KEEP** PR 96. **KEEP** MF 52 (protocol ≠ migration) — no evidence of portable graph-state export.  
**Confidence:** **5** (PR); **4** (MF keep)

---

## MA — Mastra (TS agent OS: durable workflows + observability)

**Claim under test:** Mastra is the TS continuum / agent-OS bet (workflows + memory + HITL), not a chat UI kit.

| # | Evidence (official) | URL |
|---|---------------------|-----|
| 1 | Workflows: `createStep` / `createWorkflow`; built-in suspend/resume/stream; optional Inngest runners | https://mastra.ai/docs/workflows/overview |
| 2 | Agent HITL: tool approval, `suspend()` / `resumeStream()`, snapshots as resume artifacts | https://mastra.ai/docs/agents/human-in-the-loop |
| 3 | Memory: resource/thread scopes, processors, multi-turn persistence | https://mastra.ai/docs/memory/overview |
| 4 | Observability: spans for agents, workflows, tools, memory; sampling; exporters | https://mastra.ai/docs/observability/tracing/overview |
| 5 | Observability requires `@mastra/observability` + storage backends; `MastraPlatformExporter` for hosted | https://mastra.ai/docs/observability/overview |
| 6 | Workflow state persistence across suspend/resume documented as first-class | https://mastra.ai/docs/workflows/overview |

**Score adjustment:** **LOWER OB 88 → 84** (−4): production observability is a companion package + storage routing, not zero-config core (same honesty applied to VS WorkflowAgent). **RAISE LIE 32 → 35** (+3 worse): Studio/Platform exporter path is documented gravity. **KEEP** RACS 84, RHS 20.8 band (recompute RHS after LIE/OB — RHS formula unaffected by OB/LIE; RHS stays **20.8**). AFFIX drops slightly from OB.  
**Confidence:** **5** (workflows/HITL/memory); **4** (OB/LIE nudge)

---

## LG — LangGraph (interrupts/checkpoints vs RACS gap)

**Claim under test:** Best control surface (interrupt + checkpointer) does **not** cancel weak RAG→agent continuum (RACS 62) → elevated RHS vs AFFIX peers.

| # | Evidence (official) | URL |
|---|---------------------|-----|
| 1 | `interrupt(payload)` anywhere in nodes; resume via Command / stream resume; requires checkpointer + `thread_id` | https://docs.langchain.com/oss/python/langgraph/interrupts |
| 2 | Checkpointers persist thread state (HITL, time travel, fault tolerance); Store for cross-thread | https://docs.langchain.com/oss/python/langgraph/persistence |
| 3 | Production guidance: use durable checkpointer (`PostgresSaver`); `InMemorySaver` lost on restart | https://docs.langchain.com/oss/python/langgraph/persistence |
| 4 | Overview emphasizes stateful agents / memory — **not** document ingestion → retrieval → agent continuum | https://docs.langchain.com/oss/python/langgraph/overview |
| 5 | Agent Server can own checkpointer infrastructure — ops gravity supporting LIE 68 | https://docs.langchain.com/oss/python/langgraph/persistence |

**Score adjustment:** **KEEP** CS 95, PH 93, FMC 90, RACS **62**, RHS 28.7. No official LG RAG continuum page in this audit set; RACS gap remains the RHS driver vs MA/PD.  
**Do not raise RACS** without first-party retrieval→agent path docs comparable to LlamaIndex/Haystack.  
**Confidence:** **5** (control); **4** (RACS keep — absence evidence)

---

## VS — Vercel AI SDK (telemetry + agent-OS gaps FMC/PH)

**Claim under test:** Strong telemetry/UI DX, but sole-stack VS is not a durable agent OS (FMC/PH drag → RHS 32.9).

| # | Evidence (official) | URL |
|---|---------------------|-----|
| 1 | Telemetry via OpenTelemetry; requires `@ai-sdk/otel` + `registerTelemetry(new OpenTelemetry())` | https://ai-sdk.dev/docs/ai-sdk-core/telemetry |
| 2 | `ToolLoopAgent` is **in-memory** — process crash loses progress (docs table vs WorkflowAgent) | https://ai-sdk.dev/docs/agents/workflow-agent |
| 3 | Durable path is `WorkflowAgent` from **`@ai-sdk/workflow`** companion, not core `ai` alone | https://ai-sdk.dev/docs/agents/workflow-agent · https://vercel.com/changelog/ai-sdk-7 |
| 4 | AI SDK 7 changelog: durable execution, tool approvals, telemetry redesign — still companion-split | https://vercel.com/changelog/ai-sdk-7 |
| 5 | MCP via `createMCPClient` from `@ai-sdk/mcp` (HTTP/SSE/stdio) — PR strength, not PH | https://ai-sdk.dev/docs/ai-sdk-core/mcp-tools |
| 6 | No first-class RAG platform / graph checkpointer in audited agent docs — RACS/GED remain mid/low | https://ai-sdk.dev/docs/agents/workflow-agent |

**Score adjustment:** **LOWER PH 68 → 65** (−3) and **FMC 55 → 52** (−3). Official docs are blunt that default agent loop is non-durable; scores should not credit WorkflowAgent without the companion. **Recompute RHS → ~34.5**. Keep DX 94 / EG 95 / CTI 22 (UI leadership intact).  
**Confidence:** **5**

---

## LI — LlamaIndex (RACS 92 / durable workflows)

**Claim under test:** Best RAG→agent continuum; durable/HITL workflows exist — but AFFIX mid-tier due to LIE/CTI.

| # | Evidence (official) | URL |
|---|---------------------|-----|
| 1 | Workflows overview links durable checkpointing and HITL as first-class learning path | https://developers.llamaindex.ai/python/llamaagents/workflows/ |
| 2 | HITL: `InputRequiredEvent` + `HumanResponseEvent` pair in workflow steps | https://developers.llamaindex.ai/python/llamaagents/workflows/human_in_the_loop/ |
| 3 | Durable docs explicit: **“There is no built-in checkpointer to enable”** — DIY checkpoint loop on stream events | https://developers.llamaindex.ai/python/llamaagents/workflows/durable_workflows/ |
| 4 | Optional **DBOS** runtime journals steps; `WorkflowServer` can use DBOS — not default | https://developers.llamaindex.ai/python/llamaagents/workflows/durable_workflows/ |
| 5 | Framework RAG understanding path (retrieval/postprocessors) remains a first-class continuum entry | https://developers.llamaindex.ai/python/framework/understanding/rag/ |
| 6 | Docs MCP / LlamaParse Platform MCP called out — supports LIE gravity narrative (Parse/Cloud) | https://developers.llamaindex.ai/python/llamaagents/workflows/ |

**Score adjustment:** **KEEP RACS 92** (continuum docs still strongest in-set). **LOWER PH 78 → 72** (−6) and **FMC 72 → 68** (−4): durability is DIY/DBOS-optional, not LG/PD-class first-party checkpointer. **Recompute RHS 24.3 → ~27.1**. Keep LIE 58.  
**Confidence:** **5** (HITL + durable honesty); **4** (RACS keep)

---

## MS — Microsoft Agent Framework vs Semantic Kernel succession

**Claim under test:** Greenfield Microsoft path is Agent Framework; SK orchestration carries succession/prerelease tax.

| # | Evidence (official) | URL |
|---|---------------------|-----|
| 1 | Overview: Agent Framework is the **“direct successor”** created by the same teams as SK + AutoGen; migration guides linked | https://learn.microsoft.com/en-us/agent-framework/overview/ |
| 2 | Combines AutoGen abstractions with SK enterprise features + **graph-based workflows** | https://learn.microsoft.com/en-us/agent-framework/overview/ |
| 3 | Dedicated migration guide from Semantic Kernel (agents, sessions, streaming, plugins) | https://learn.microsoft.com/en-us/agent-framework/migration-guide/from-semantic-kernel |
| 4 | Workflow HITL: `RequestInfoEvent` / `SendResponseAsync`; checkpoints persist pending requests | https://learn.microsoft.com/en-us/agent-framework/workflows/human-in-the-loop |
| 5 | SK Agent Orchestration install is **`--prerelease`** packages (`Microsoft.SemanticKernel.Agents.Orchestration`, `…Runtime.InProcess`) | https://learn.microsoft.com/en-us/semantic-kernel/frameworks/agent/agent-orchestration/ |
| 6 | SK orchestration note: not yet available in Java SDK — incomplete surface vs MAF multi-runtime pitch | https://learn.microsoft.com/en-us/semantic-kernel/frameworks/agent/agent-orchestration/ |

**Score adjustment:** **KEEP** MS AFFIX ~80.91 / RHS 19.4 as greenfield Microsoft score. **KEEP** SK succession-tax narrative; SK orchestration prerelease status **supports lowering SK FP or raising SK LIE** if rescored (recommend **SK LIE 48 → 52**, **SK FP 78 → 72** in a follow-on SK-only pass — out of this 8-framework matrix write).  
**Confidence:** **5** (succession); **4** (SK dimension deltas pending full SK re-audit)

---

## Summary table (recommended deltas)

| ID | Dimension | From → To | Direction | Why |
|----|-----------|----------:|-----------|-----|
| OA | LIE | 55 → **58** | worse | Default OpenAI traces; LiteLLM beta; Responses default |
| MA | OB | 88 → **84** | lower | `@mastra/observability` + storage required |
| MA | LIE | 32 → **35** | worse | Platform/Studio exporter gravity |
| VS | PH | 68 → **65** | lower | ToolLoopAgent non-durable; WorkflowAgent companion |
| VS | FMC | 55 → **52** | lower | Same sole-stack honesty |
| VS | RHS | 32.9 → **~34.5** | worse | Formula recompute |
| LI | PH | 78 → **72** | lower | No built-in checkpointer (official wording) |
| LI | FMC | 72 → **68** | lower | DUR DIY / DBOS-optional |
| LI | RHS | 24.3 → **~27.1** | worse | Formula recompute |
| PD | — | — | **keep** | Durable + OTel claims hold |
| AD | PR | 96 | **keep** | A2A + MCP client/server + OTel |
| LG | RACS/CS/PH | 62/95/93 | **keep** | Control max; continuum gap intact |
| MS | RHS/AFFIX | 19.4 / 80.91 | **keep** | “Direct successor” + SK prerelease |

**Not applied to `affix_matrix.json` in this audit file** — see `CROSS_VALIDATION.md` for adjudication status.
