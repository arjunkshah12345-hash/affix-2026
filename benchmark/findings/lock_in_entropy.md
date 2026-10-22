# Lock-in Entropy (LIE) Ranking — AFFIX-2026

**Definition (METHODOLOGY):** Bits of irreversible coupling — vendor SDKs, proprietary graph/checkpoint formats, cloud-only runtimes. **Lower is better.**  
**Scale used in matrix:** 0–100 dossier scale (≈ bits×10 when raw bits ≤ 10). All values **EST**.  
**As of:** 2026-10-21

---

## Ranking (lowest lock-in → highest)

| Rank | ID | Framework | LIE ↓ | Primary coupling sources | Escape hatch (documented) |
|-----:|----|-----------|------:|--------------------------|---------------------------|
| 1 | DS | DSPy | **15** | Optimizer artifacts / Signature modules (OSS, not cloud) | Export compiled prompts; serve elsewhere |
| 2 | SM | smolagents | **18** | Optional HF Hub / Inference Providers | Pure Python + any model backend |
| 3 | PD | PydanticAI | **22** | Optional Logfire/Gateway/Harness | Model-string portability + OTel |
| 4 | MA | Mastra | **32** | Workflow/memory schemas; Studio/Platform gravity | Apache-2.0 core; self-host |
| 5 | VS | Vercel AI SDK | **35** | Gateway / Workflow / Elements ecosystem pull | Multi-provider OSS `ai` package |
| 6 | CR | CrewAI | **38** | AMP tracing; default OpenAI embeddings for memory | Custom embedder; OSS crews/flows |
| 7 | AG | AutoGen / AG2 | **42** | Classic vs v1 dual stack; Hub/WAL/channel types | Apache-2.0; multi-provider |
| 7 | HS | Haystack | **42** | deepset platform optional; pipeline YAML | OTEL/Langfuse/etc.; OSS pipelines |
| 7 | SP | Spring AI | **42** | Spring Boot/Advisor/starter shape | Swap model starters; MCP portable |
| 10 | AD | Google ADK | **45** | Gemini samples; Agent Runtime / GCP deploy | LiteLLM; container self-host |
| 11 | SK | Semantic Kernel | **48** | Azure/MS ecosystem; MAF succession | Multi-language; A2A bridges |
| 12 | MS | Microsoft Agent Framework | **52** | Enterprise MS surface (sessions, Azure) | Open protocols (MCP/A2A) EST |
| 13 | OA | OpenAI Agents SDK | **55** | Responses default; traces; sandbox; realtime | LiteLLM/AnyLLM (feature skew EST) |
| 14 | LI | LlamaIndex | **58** | LlamaCloud / LlamaParse; Context serialization | OSS workflows; DIY durability |
| 15 | LG | LangGraph | **68** | Checkpoint DB schemas; StateGraph patterns; Agent Server | Self-hosted Postgres/SQLite savers |
| 16 | LC | LangChain | **72** | LangSmith gravity; create_agent→LangGraph; middleware conventions | `init_chat_model`; OTEL alternatives |

---

## Justifications (falsifiable)

### Tier A — Portable cores (LIE ≤ 25)

1. **DSPy (15):** Programs are Signatures/Modules + JSON artifacts ([dspy.ai](https://dspy.ai/)). No mandatory cloud runtime. **Falsifier:** Required hosted compiler for GEPA in production docs.
2. **smolagents (18):** Explicit small-surface, model-agnostic design ([HF docs](https://huggingface.co/docs/smolagents/index)). **Falsifier:** Hub login required for core ToolCallingAgent.
3. **PydanticAI (22):** Provider-agnostic agents; observability via OTel/Logfire optional ([overview](https://pydantic.dev/docs/ai/overview/)). **Falsifier:** Logfire required for durable execution APIs.

### Tier B — Mild product gravity (26–45)

4. **Mastra (32):** Coherent OSS package; Enterprise/Studio increases gravity ([mastra.ai](https://mastra.ai/)). **Falsifier:** Workflow JSON unreadable outside Mastra runtime.
5. **Vercel AI SDK (35):** Core is multi-provider; full-stack Vercel path raises coupling ([ai-sdk.dev](https://ai-sdk.dev/)). **Falsifier:** `ai` npm package requires Vercel account.
6. **CrewAI (38):** OSS MIT path; AMP + default embeddings are soft locks ([docs](https://docs.crewai.com/)). **Falsifier:** Memory requires CrewAI Cloud.
7. **AG2 / Haystack / Spring AI (42):** Format or framework-shaped apps, not single-vendor cloud. AG pays Classic↔v1 tax ([ag2ai/ag2](https://github.com/ag2ai/ag2)); HS optional deepset; SP is Spring-shaped ([Spring AI](https://spring.io/projects/spring-ai)).

### Tier C — Cloud/ops gravity (45–60)

8. **ADK (45):** OSS + A2A/MCP, but GCP Agent Runtime is the paved road ([adk.dev](https://adk.dev/)). **Falsifier:** Majority of production ADK deploys are non-GCP with full feature parity.
9. **SK / MS (48–52):** Microsoft estate + succession ([Agent Framework](https://learn.microsoft.com/en-us/agent-framework/overview/)).
10. **OA (55):** Highest *ops* lock among “open SDK” options ([tracing](https://openai.github.io/openai-agents-python/tracing/)). **Falsifier:** Feature-complete non-OpenAI path for sandbox+guardrails+sessions.
11. **LlamaIndex (58):** Commercial adjacency for parse/cloud quality ([LlamaAgents blog](https://www.llamaindex.ai/blog/llamaagents-build-serve-and-deploy-document-agents)).

### Tier D — Orchestration format lock (60+)

12. **LangGraph (68):** Checkpoint + reducer + thread semantics are the product ([persistence](https://docs.langchain.com/oss/python/langgraph/persistence)). Migrating graphs ≈ rewrite.
13. **LangChain (72):** Ecosystem + LangSmith + LangGraph runtime funnel ([v1 release](https://docs.langchain.com/oss/python/releases/langchain-v1)). Highest LIE in Tier A set.

---

## Non-obvious LIE findings

1. **Low LIE ≠ low RHS.** DS and SM are easiest to leave *and* most likely to be left (RHS 44.3 / 40.0).
2. **MCP/A2A raise PR without lowering LIE.** AD PR=96 with LIE=45 — protocols reduce *tool* lock-in, not *graph/deploy* lock-in.
3. **“Model portable” READMEs understate LIE by ~20–30 points EST** for OA/AD/LC when ops products are in the default path.
4. **Succession is lock-in:** SK→MS and AG Classic→v1 are irreversible coupling even under Apache licenses.

---

## Measurement recipe (for re-score)

Score each bit family 0–2 and sum×scale:

| Bit family | 0 | 1 | 2 |
|------------|---|---|---|
| Vendor default model/API | Agnostic | Default vendor, easy swap | Swap loses features |
| Proprietary state/checkpoint | None | Exportable | Opaque / DB-coupled |
| Cloud runtime gravity | None | Optional | Default deploy path |
| Observability product | OTel-only | Dual | Vendor UI required for prod |
| Succession / dual-stack | Stable | Soft migrate | Forced rewrite |

**Falsifier for whole ranking:** Independent auditor using this rubric disagrees on order of top-5 or bottom-5.
