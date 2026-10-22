# AFFIX-2026 — Failure-Mode Matrix (Public, Deepened)

**Definition:** First-class API support for common production failure modes — not roll-your-own inside a tool.
**As of:** 2026-10-22 · All cells **EST** from dossiers + primary docs
**Machine-readable:** `FAILURE_MODE_MATRIX.json` · Site copy: `site/public/affix-2026-failures.json`

FMC% in the score matrix is a weighted judgment (DUR/HIT/SCH weighted higher), not a raw `first_class` count.

---

## Coverage legend

| Token | Meaning |
|-------|---------|
| `first_class` (FC) | Native first-class API in the framework (named surface, documented failure→recovery) |
| `pattern` (P) | Official docs recommend a pattern, middleware, or companion package — not a core native API |
| `absent` (A) | No documented first-class API or recommended pattern; team must invent |
| `unknown` (U) | Could not verify from primary docs at audit time |

---

## Canonical 12 failure modes

| Code | Failure mode | Why it matters |
|------|--------------|----------------|
| TMO | Timeouts / deadline propagation | Hung tools exhaust budgets |
| PTF | Partial tool failure / retry isolation | One bad tool should not kill the run blindly |
| SCH | Schema drift / structured-output repair | Models violate contracts |
| COV | Context overflow / compaction | Long threads blow windows |
| CSR | Concurrent state races | Fan-out agents corrupt shared state |
| HIT | Mid-run human interrupt + resume | Compliance / approval |
| DUR | Crash recovery / durable checkpoint | Process death mid-agent |
| IDE | Idempotent tool / exactly-once hints | Double charges / double writes |
| GRD | Guardrails (input/output/tool) | Safety / PII |
| STR | Streaming error surfacing | UI must show partial failure |
| TRC | Trace/replay for failed runs | MTTR |
| SBOX | Code-execution isolation | Code-act RCE risk |

---

## Summary matrix (16 Tier-A frameworks)

| ID | Framework | FMC% | TMO | PTF | SCH | COV | CSR | HIT | DUR | IDE | GRD | STR | TRC | SBOX |
|----|-----------|-----:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| LG | LangGraph | 90 | FC | FC | P | P | FC | FC | FC | P | P | FC | FC | A |
| OA | OpenAI Agents SDK | 82 | FC | FC | FC | P | P | FC | FC | P | FC | FC | FC | FC |
| AD | Google ADK | 80 | FC | FC | P | FC | FC | FC | FC | P | FC | FC | FC | A |
| MS | Microsoft Agent Framework | 80 | FC | FC | FC | P | FC | FC | FC | P | FC | FC | FC | A |
| PD | PydanticAI | 78 | FC | FC | FC | P | P | FC | FC | P | FC | FC | FC | P |
| LC | LangChain | 74 | FC | P | P | FC | P | FC | FC | A | FC | FC | FC | A |
| MA | Mastra | 72 | FC | FC | FC | P | P | FC | FC | P | FC | FC | FC | A |
| LI | LlamaIndex | 72 | FC | FC | FC | P | FC | FC | FC | P | P | FC | FC | A |
| AG | AutoGen / AG2 | 72 | FC | FC | P | FC | P | FC | P | A | P | FC | FC | A |
| CR | CrewAI | 70 | FC | P | P | P | A | FC | FC | A | FC | FC | FC | P |
| SK | Semantic Kernel | 68 | FC | P | FC | P | P | P | P | A | FC | FC | P | A |
| HS | Haystack | 68 | FC | FC | FC | P | P | FC | A | A | FC | FC | FC | A |
| SP | Spring AI | 62 | FC | P | FC | P | A | A | A | P | P | FC | FC | A |
| VS | Vercel AI SDK | 55 | FC | P | FC | A | A | P | P | A | P | FC | P | A |
| SM | smolagents | 45 | P | P | A | A | A | A | A | A | A | P | A | FC |
| DS | DSPy | 35 | P | A | FC | A | A | A | A | A | A | A | P | A |

---

## Per failure mode — framework × coverage × evidence

Each table lists the named API (or `—` if absent) and a primary docs URL.

### TMO — Timeouts / deadline propagation

**Why:** Hung tools exhaust budgets  
**Coverage:** FC=14 · P=2 · A=0 · U=0

| ID | Framework | Coverage | Named API / feature | Evidence |
|----|-----------|----------|---------------------|----------|
| LG | LangGraph | `first_class` | node/tool timeouts + RetryPolicy on graph nodes | [docs.langchain.com](https://docs.langchain.com/oss/python/langgraph/graph-api) |
| OA | OpenAI Agents SDK | `first_class` | run/config timeouts; MaxTurnsExceeded | [openai.github.io](https://openai.github.io/openai-agents-python/running_agents/) |
| AD | Google ADK | `first_class` | RunConfig timeout / cancel | [adk.dev](https://adk.dev/api-reference/typescript/interfaces/RunConfig.html) |
| MS | Microsoft Agent Framework | `first_class` | workflow/executor timeouts | [learn.microsoft.com](https://learn.microsoft.com/en-us/agent-framework/overview/) |
| PD | PydanticAI | `first_class` | Agent usage limits / model request timeouts | [pydantic.dev](https://pydantic.dev/docs/ai/core-concepts/agent/) |
| LC | LangChain | `first_class` | runnable config timeouts; agent max iterations | [docs.langchain.com](https://docs.langchain.com/oss/python/langchain/overview) |
| MA | Mastra | `first_class` | agent/workflow step timeouts | [mastra.ai](https://mastra.ai/docs/agents/overview) |
| LI | LlamaIndex | `first_class` | workflow/handler timeouts | [developers.llamaindex.ai](https://developers.llamaindex.ai/python/llamaagents/workflows/) |
| AG | AutoGen / AG2 | `first_class` | reply/timeout controls on agents | [docs.ag2.ai](https://docs.ag2.ai/) |
| CR | CrewAI | `first_class` | max_rpm / max_iter / task timeouts | [docs.crewai.com](https://docs.crewai.com/) |
| SK | Semantic Kernel | `first_class` | HttpClient/kernel timeouts; agent invocation limits | [learn.microsoft.com](https://learn.microsoft.com/en-us/semantic-kernel/frameworks/agent/) |
| HS | Haystack | `first_class` | component/pipeline timeouts | [docs.haystack.deepset.ai](https://docs.haystack.deepset.ai/docs/pipelines) |
| SP | Spring AI | `first_class` | ChatClient / WebClient timeouts | [docs.spring.io](https://docs.spring.io/spring-ai/reference/api/chatclient.html) |
| VS | Vercel AI SDK | `first_class` | abortSignal / maxRetries / stopWhen | [ai-sdk.dev](https://ai-sdk.dev/docs/reference/ai-sdk-core/tool-loop-agent) |
| SM | smolagents | `pattern` | max_steps on agents; external process timeouts | [huggingface.co](https://huggingface.co/docs/smolagents/en/reference/agents) |
| DS | DSPy | `pattern` | LM timeout kwargs / program-level caps | [dspy.ai](https://dspy.ai/) |

### PTF — Partial tool failure / retry isolation

**Why:** One bad tool should not kill the run blindly  
**Coverage:** FC=9 · P=6 · A=1 · U=0

| ID | Framework | Coverage | Named API / feature | Evidence |
|----|-----------|----------|---------------------|----------|
| LG | LangGraph | `first_class` | RetryPolicy; tool errors return to graph | [docs.langchain.com](https://docs.langchain.com/oss/python/langgraph/graph-api) |
| OA | OpenAI Agents SDK | `first_class` | tool error → model; retry knobs on tools | [openai.github.io](https://openai.github.io/openai-agents-python/tools/) |
| AD | Google ADK | `first_class` | tool error events; retry/confirm patterns | [adk.dev](https://adk.dev/events/) |
| MS | Microsoft Agent Framework | `first_class` | executor failure handling / retries | [learn.microsoft.com](https://learn.microsoft.com/en-us/agent-framework/overview/) |
| PD | PydanticAI | `first_class` | ModelRetry / tool exception → model retry | [pydantic.dev](https://pydantic.dev/docs/ai/core-concepts/agent/) |
| LC | LangChain | `pattern` | RunnableRetry / middleware; uneven default isolation | [docs.langchain.com](https://docs.langchain.com/oss/python/langchain/overview) |
| MA | Mastra | `first_class` | tool error handling on agent loop | [mastra.ai](https://mastra.ai/docs/agents/tools) |
| LI | LlamaIndex | `first_class` | workflow step retries / error events | [developers.llamaindex.ai](https://developers.llamaindex.ai/python/llamaagents/workflows/) |
| AG | AutoGen / AG2 | `first_class` | tool execution error messages to LLM | [docs.ag2.ai](https://docs.ag2.ai/) |
| CR | CrewAI | `pattern` | task retry / guardrail retry patterns | [docs.crewai.com](https://docs.crewai.com/) |
| SK | Semantic Kernel | `pattern` | function filters + retry middleware | [learn.microsoft.com](https://learn.microsoft.com/en-us/semantic-kernel/frameworks/agent/) |
| HS | Haystack | `first_class` | component error routing in pipelines | [docs.haystack.deepset.ai](https://docs.haystack.deepset.ai/docs/pipelines) |
| SP | Spring AI | `pattern` | RetryTemplate / advisor patterns | [docs.spring.io](https://docs.spring.io/spring-ai/reference/) |
| VS | Vercel AI SDK | `pattern` | maxRetries on generateText; tool errors to model | [ai-sdk.dev](https://ai-sdk.dev/docs/reference/ai-sdk-core/tool-loop-agent) |
| SM | smolagents | `pattern` | code-act exception → agent retry step | [huggingface.co](https://huggingface.co/docs/smolagents/index) |
| DS | DSPy | `absent` | — | [dspy.ai](https://dspy.ai/current/getting-started/react-and-tools/) |

### SCH — Schema drift / structured-output repair

**Why:** Models violate contracts  
**Coverage:** FC=10 · P=5 · A=1 · U=0

| ID | Framework | Coverage | Named API / feature | Evidence |
|----|-----------|----------|---------------------|----------|
| LG | LangGraph | `pattern` | TypedDict/Pydantic state; LC with_structured_output | [docs.langchain.com](https://docs.langchain.com/oss/python/langgraph/graph-api) |
| OA | OpenAI Agents SDK | `first_class` | Agent output_type / structured outputs | [openai.github.io](https://openai.github.io/openai-agents-python/) |
| AD | Google ADK | `pattern` | typed tools / schema configs | [adk.dev](https://adk.dev/) |
| MS | Microsoft Agent Framework | `first_class` | .NET typed contracts / schema validation | [learn.microsoft.com](https://learn.microsoft.com/en-us/agent-framework/overview/) |
| PD | PydanticAI | `first_class` | Agent(..., output_type=Model) + validation retry | [pydantic.dev](https://pydantic.dev/docs/ai/core-concepts/output/) |
| LC | LangChain | `pattern` | with_structured_output / tool schemas | [docs.langchain.com](https://docs.langchain.com/oss/python/langchain/overview) |
| MA | Mastra | `first_class` | structuredOutput Zod/Valibot/JSON Schema | [mastra.ai](https://mastra.ai/docs/agents/structured-output) |
| LI | LlamaIndex | `first_class` | structured LLM / Pydantic outputs | [developers.llamaindex.ai](https://developers.llamaindex.ai/python/llamaagents/workflows/) |
| AG | AutoGen / AG2 | `pattern` | typed messages / function schemas | [docs.ag2.ai](https://docs.ag2.ai/) |
| CR | CrewAI | `pattern` | Pydantic task output models | [docs.crewai.com](https://docs.crewai.com/) |
| SK | Semantic Kernel | `first_class` | JSON schema on kernel functions | [learn.microsoft.com](https://learn.microsoft.com/en-us/semantic-kernel/frameworks/agent/) |
| HS | Haystack | `first_class` | OutputAdapter / schema validation components | [docs.haystack.deepset.ai](https://docs.haystack.deepset.ai/docs/agent) |
| SP | Spring AI | `first_class` | BeanOutputConverter + validateSchema | [docs.spring.io](https://docs.spring.io/spring-ai/reference/api/structured-output.html) |
| VS | Vercel AI SDK | `first_class` | Output.object/array/choice/json/text | [ai-sdk.dev](https://ai-sdk.dev/docs/ai-sdk-core/generating-structured-data) |
| SM | smolagents | `absent` | — | [huggingface.co](https://huggingface.co/docs/smolagents/index) |
| DS | DSPy | `first_class` | Signatures / typed predictors | [dspy.ai](https://dspy.ai/) |

### COV — Context overflow / compaction

**Why:** Long threads blow windows  
**Coverage:** FC=3 · P=10 · A=3 · U=0

| ID | Framework | Coverage | Named API / feature | Evidence |
|----|-----------|----------|---------------------|----------|
| LG | LangGraph | `pattern` | summarization middleware (often LC) | [docs.langchain.com](https://docs.langchain.com/oss/python/langchain/short-term-memory) |
| OA | OpenAI Agents SDK | `pattern` | Sessions trim/compaction helpers | [openai.github.io](https://openai.github.io/openai-agents-python/sessions/) |
| AD | Google ADK | `first_class` | EventsCompaction / ContextCompactionTrigger | [adk.dev](https://adk.dev/api-reference/kotlin/google-adk-kotlin-core/com.google.adk.kt.events/-event-compaction/index.html) |
| MS | Microsoft Agent Framework | `pattern` | session/context trimming patterns | [learn.microsoft.com](https://learn.microsoft.com/en-us/agent-framework/overview/) |
| PD | PydanticAI | `pattern` | message history processors / Harness memory | [pydantic.dev](https://pydantic.dev/docs/ai/overview/) |
| LC | LangChain | `first_class` | summarization / short-term memory middleware | [docs.langchain.com](https://docs.langchain.com/oss/python/langchain/short-term-memory) |
| MA | Mastra | `pattern` | memory processors / working memory | [mastra.ai](https://mastra.ai/docs/memory/overview) |
| LI | LlamaIndex | `pattern` | chat memory / context window strategies | [developers.llamaindex.ai](https://developers.llamaindex.ai/python/llamaagents/workflows/managing_state/) |
| AG | AutoGen / AG2 | `first_class` | context handling / knowledge in harness | [classic.docs.ag2.ai](http://classic.docs.ag2.ai/latest/docs/blog/2026/06/17/AG2-Agent-Harness/) |
| CR | CrewAI | `pattern` | memory/context trim in crews | [docs.crewai.com](https://docs.crewai.com/) |
| SK | Semantic Kernel | `pattern` | chat history reducers | [learn.microsoft.com](https://learn.microsoft.com/en-us/semantic-kernel/frameworks/agent/) |
| HS | Haystack | `pattern` | pipeline memory / document windowing | [docs.haystack.deepset.ai](https://docs.haystack.deepset.ai/docs/pipelines) |
| SP | Spring AI | `pattern` | advisor/message window patterns | [docs.spring.io](https://docs.spring.io/spring-ai/reference/api/chatclient.html) |
| VS | Vercel AI SDK | `absent` | — | [ai-sdk.dev](https://ai-sdk.dev/docs/reference/ai-sdk-core/tool-loop-agent) |
| SM | smolagents | `absent` | — | [huggingface.co](https://huggingface.co/docs/smolagents/index) |
| DS | DSPy | `absent` | — | [dspy.ai](https://dspy.ai/) |

### CSR — Concurrent state races

**Why:** Fan-out agents corrupt shared state  
**Coverage:** FC=4 · P=7 · A=5 · U=0

| ID | Framework | Coverage | Named API / feature | Evidence |
|----|-----------|----------|---------------------|----------|
| LG | LangGraph | `first_class` | Annotated reducers + Send map-reduce | [docs.langchain.com](https://docs.langchain.com/oss/python/langgraph/graph-api) |
| OA | OpenAI Agents SDK | `pattern` | handoffs / nested runs; limited shared-state reducers | [openai.github.io](https://openai.github.io/openai-agents-python/handoffs/) |
| AD | Google ADK | `first_class` | graph parallelism + session state rules | [adk.dev](https://adk.dev/agents/multi-agents/) |
| MS | Microsoft Agent Framework | `first_class` | workflow fan-out/join executors | [learn.microsoft.com](https://learn.microsoft.com/en-us/agent-framework/overview/) |
| PD | PydanticAI | `pattern` | Pydantic Graph / SubAgents; BYO reducers | [pydantic.dev](https://pydantic.dev/docs/ai/overview/) |
| LC | LangChain | `pattern` | inherits LG reducers when on graphs | [docs.langchain.com](https://docs.langchain.com/oss/python/langchain/overview) |
| MA | Mastra | `pattern` | workflow .parallel; memory race EST | [mastra.ai](https://mastra.ai/docs/workflows/overview) |
| LI | LlamaIndex | `first_class` | Context edit_state / workflow concurrency | [developers.llamaindex.ai](https://developers.llamaindex.ai/python/llamaagents/workflows/managing_state/) |
| AG | AutoGen / AG2 | `pattern` | GroupChat / Network concurrency | [docs.ag2.ai](https://docs.ag2.ai/) |
| CR | CrewAI | `absent` | — | [docs.crewai.com](https://docs.crewai.com/v1.15.28/en/concepts/flows) |
| SK | Semantic Kernel | `pattern` | orchestration concurrency filters | [learn.microsoft.com](https://learn.microsoft.com/en-us/semantic-kernel/frameworks/agent/agent-orchestration/) |
| HS | Haystack | `pattern` | pipeline parallelism; shared state limited | [docs.haystack.deepset.ai](https://docs.haystack.deepset.ai/docs/pipelines) |
| SP | Spring AI | `absent` | — | [docs.spring.io](https://docs.spring.io/spring-ai/reference/) |
| VS | Vercel AI SDK | `absent` | — | [ai-sdk.dev](https://ai-sdk.dev/docs/reference/ai-sdk-core/tool-loop-agent) |
| SM | smolagents | `absent` | — | [huggingface.co](https://huggingface.co/docs/smolagents/examples/multiagents) |
| DS | DSPy | `absent` | — | [dspy.ai](https://dspy.ai/) |

### HIT — Mid-run human interrupt + resume

**Why:** Compliance / approval  
**Coverage:** FC=11 · P=2 · A=3 · U=0

| ID | Framework | Coverage | Named API / feature | Evidence |
|----|-----------|----------|---------------------|----------|
| LG | LangGraph | `first_class` | interrupt() + Command resume + checkpointer | [docs.langchain.com](https://docs.langchain.com/oss/python/langgraph/interrupts) |
| OA | OpenAI Agents SDK | `first_class` | needs_approval interruptions + RunState | [openai.github.io](https://openai.github.io/openai-agents-python/human_in_the_loop/) |
| AD | Google ADK | `first_class` | RequestInput deterministic HITL nodes | [adk.dev](https://adk.dev/graphs/human-input/) |
| MS | Microsoft Agent Framework | `first_class` | workflow request/response HITL | [learn.microsoft.com](https://learn.microsoft.com/en-us/agent-framework/workflows/human-in-the-loop) |
| PD | PydanticAI | `first_class` | deferred tool approval / Harness + durable engines | [pydantic.dev](https://pydantic.dev/docs/ai/capabilities/durable_execution/overview/) |
| LC | LangChain | `first_class` | HumanInTheLoopMiddleware → LG interrupt | [docs.langchain.com](https://docs.langchain.com/oss/python/langchain/human-in-the-loop) |
| MA | Mastra | `first_class` | tool approval / workflow suspend | [mastra.ai](https://mastra.ai/docs/agents/human-in-the-loop) |
| LI | LlamaIndex | `first_class` | InputRequiredEvent / HumanResponseEvent | [developers.llamaindex.ai](https://developers.llamaindex.ai/python/llamaagents/workflows/human_in_the_loop/) |
| AG | AutoGen / AG2 | `first_class` | HumanProxyAgent / human input requests | [docs.ag2.ai](https://docs.ag2.ai/) |
| CR | CrewAI | `first_class` | HITL task/flow interruption + webhooks | [docs.crewai.com](https://docs.crewai.com/v1.15.2/en/learn/human-in-the-loop) |
| SK | Semantic Kernel | `pattern` | experimental agent orchestration HITL | [learn.microsoft.com](https://learn.microsoft.com/en-us/semantic-kernel/frameworks/agent/agent-orchestration/) |
| HS | Haystack | `first_class` | ConfirmationHook on Agent tool calls | [docs.haystack.deepset.ai](https://docs.haystack.deepset.ai/docs/human-in-the-loop) |
| SP | Spring AI | `absent` | — | [docs.spring.io](https://docs.spring.io/spring-ai/reference/) |
| VS | Vercel AI SDK | `pattern` | toolApproval; durable via WorkflowAgent | [ai-sdk.dev](https://ai-sdk.dev/docs/agents/workflow-agent) |
| SM | smolagents | `absent` | — | [huggingface.co](https://huggingface.co/docs/smolagents/index) |
| DS | DSPy | `absent` | — | [dspy.ai](https://dspy.ai/) |

### DUR — Crash recovery / durable checkpoint

**Why:** Process death mid-agent  
**Coverage:** FC=9 · P=3 · A=4 · U=0

| ID | Framework | Coverage | Named API / feature | Evidence |
|----|-----------|----------|---------------------|----------|
| LG | LangGraph | `first_class` | BaseCheckpointSaver (Postgres/SQLite) + thread_id | [docs.langchain.com](https://docs.langchain.com/oss/python/langgraph/persistence) |
| OA | OpenAI Agents SDK | `first_class` | RunState serialize + Sessions; Temporal/Restate | [openai.github.io](https://openai.github.io/openai-agents-python/human_in_the_loop/) |
| AD | Google ADK | `first_class` | Session/state + deploy resume/cancel | [adk.dev](https://adk.dev/context/) |
| MS | Microsoft Agent Framework | `first_class` | workflow persistence / executor state | [learn.microsoft.com](https://learn.microsoft.com/en-us/agent-framework/workflows/human-in-the-loop) |
| PD | PydanticAI | `first_class` | Temporal/DBOS/Prefect/Restate/… adapters | [pydantic.dev](https://pydantic.dev/docs/ai/capabilities/durable_execution/overview/) |
| LC | LangChain | `first_class` | create_agent + LangGraph checkpointer | [docs.langchain.com](https://docs.langchain.com/oss/python/langchain/human-in-the-loop) |
| MA | Mastra | `first_class` | workflow suspend/resume + storage adapters | [mastra.ai](https://mastra.ai/docs/workflows/overview) |
| LI | LlamaIndex | `first_class` | Context.to_dict + DBOS durable workflows | [developers.llamaindex.ai](https://developers.llamaindex.ai/python/llamaagents/workflows/durable_workflows/) |
| AG | AutoGen / AG2 | `pattern` | session helpers; not LG-class default | [docs.ag2.ai](https://docs.ag2.ai/) |
| CR | CrewAI | `first_class` | CheckpointConfig; resume/fork snapshots | [docs.crewai.com](https://docs.crewai.com/v1.15.2/en/concepts/checkpointing) |
| SK | Semantic Kernel | `pattern` | migrate to MS Agent Framework workflows | [learn.microsoft.com](https://learn.microsoft.com/en-us/agent-framework/migration-guide/from-semantic-kernel) |
| HS | Haystack | `absent` | — | [docs.haystack.deepset.ai](https://docs.haystack.deepset.ai/docs/human-in-the-loop) |
| SP | Spring AI | `absent` | — | [docs.spring.io](https://docs.spring.io/spring-ai/reference/) |
| VS | Vercel AI SDK | `pattern` | WorkflowAgent in @ai-sdk/workflow | [ai-sdk.dev](https://ai-sdk.dev/docs/agents/workflow-agent) |
| SM | smolagents | `absent` | — | [huggingface.co](https://huggingface.co/docs/smolagents/index) |
| DS | DSPy | `absent` | — | [dspy.ai](https://dspy.ai/) |

### IDE — Idempotent tool / exactly-once hints

**Why:** Double charges / double writes  
**Coverage:** FC=0 · P=8 · A=8 · U=0

| ID | Framework | Coverage | Named API / feature | Evidence |
|----|-----------|----------|---------------------|----------|
| LG | LangGraph | `pattern` | idempotent checkpointer writes; tool IDE BYO | [docs.langchain.com](https://docs.langchain.com/oss/python/langgraph/persistence) |
| OA | OpenAI Agents SDK | `pattern` | docs warn on side effects; no exactly-once tool API | [openai.github.io](https://openai.github.io/openai-agents-python/tools/) |
| AD | Google ADK | `pattern` | at-least-once resume; idempotent tools recommended | [adk.dev](https://adk.dev/events/) |
| MS | Microsoft Agent Framework | `pattern` | workflow replay → idempotent activities pattern | [learn.microsoft.com](https://learn.microsoft.com/en-us/agent-framework/overview/) |
| PD | PydanticAI | `pattern` | durable engines: design idempotent tools | [pydantic.dev](https://pydantic.dev/docs/ai/capabilities/durable_execution/overview/) |
| LC | LangChain | `absent` | — | [docs.langchain.com](https://docs.langchain.com/oss/python/langchain/overview) |
| MA | Mastra | `pattern` | workflow retry → idempotent side effects | [mastra.ai](https://mastra.ai/docs/workflows/overview) |
| LI | LlamaIndex | `pattern` | durable workflows: at-least-once; require idempotent tools | [developers.llamaindex.ai](https://developers.llamaindex.ai/python/llamaagents/workflows/durable_workflows/) |
| AG | AutoGen / AG2 | `absent` | — | [docs.ag2.ai](https://docs.ag2.ai/) |
| CR | CrewAI | `absent` | — | [docs.crewai.com](https://docs.crewai.com/v1.15.2/en/concepts/checkpointing) |
| SK | Semantic Kernel | `absent` | — | [learn.microsoft.com](https://learn.microsoft.com/en-us/semantic-kernel/frameworks/agent/) |
| HS | Haystack | `absent` | — | [docs.haystack.deepset.ai](https://docs.haystack.deepset.ai/docs/agent) |
| SP | Spring AI | `pattern` | Spring Retry / IdempotentReceiver patterns | [docs.spring.io](https://docs.spring.io/spring-ai/reference/) |
| VS | Vercel AI SDK | `absent` | — | [ai-sdk.dev](https://ai-sdk.dev/docs/agents/workflow-agent) |
| SM | smolagents | `absent` | — | [huggingface.co](https://huggingface.co/docs/smolagents/index) |
| DS | DSPy | `absent` | — | [dspy.ai](https://dspy.ai/) |

### GRD — Guardrails (input/output/tool)

**Why:** Safety / PII  
**Coverage:** FC=9 · P=5 · A=2 · U=0

| ID | Framework | Coverage | Named API / feature | Evidence |
|----|-----------|----------|---------------------|----------|
| LG | LangGraph | `pattern` | LC guardrail middleware / custom nodes | [docs.langchain.com](https://docs.langchain.com/oss/python/langchain/overview) |
| OA | OpenAI Agents SDK | `first_class` | input/output/tool guardrails | [openai.github.io](https://openai.github.io/openai-agents-python/guardrails/) |
| AD | Google ADK | `first_class` | safety / tool confirmation rails | [adk.dev](https://adk.dev/) |
| MS | Microsoft Agent Framework | `first_class` | content safety / approval gates | [learn.microsoft.com](https://learn.microsoft.com/en-us/agent-framework/overview/) |
| PD | PydanticAI | `first_class` | Harness guardrails capability | [pydantic.dev](https://pydantic.dev/docs/ai/overview/) |
| LC | LangChain | `first_class` | middleware guardrails on create_agent | [docs.langchain.com](https://docs.langchain.com/oss/python/langchain/overview) |
| MA | Mastra | `first_class` | agent guardrails / scorers | [mastra.ai](https://mastra.ai/docs/agents/overview) |
| LI | LlamaIndex | `pattern` | callback/observability guards | [developers.llamaindex.ai](https://developers.llamaindex.ai/python/llamaagents/workflows/observability/) |
| AG | AutoGen / AG2 | `pattern` | governance / channel TTL patterns | [docs.ag2.ai](https://docs.ag2.ai/docs/user-guide/telemetry/) |
| CR | CrewAI | `first_class` | task/crew guardrails | [docs.crewai.com](https://docs.crewai.com/) |
| SK | Semantic Kernel | `first_class` | filters / content safety plugins | [learn.microsoft.com](https://learn.microsoft.com/en-us/semantic-kernel/frameworks/agent/) |
| HS | Haystack | `first_class` | pipeline validators / safety components | [docs.haystack.deepset.ai](https://docs.haystack.deepset.ai/docs/pipelines) |
| SP | Spring AI | `pattern` | Spring Security + advisors | [docs.spring.io](https://docs.spring.io/spring-ai/reference/) |
| VS | Vercel AI SDK | `pattern` | middleware / toolApproval as soft rails | [ai-sdk.dev](https://ai-sdk.dev/docs/reference/ai-sdk-core/tool-loop-agent) |
| SM | smolagents | `absent` | — | [huggingface.co](https://huggingface.co/docs/smolagents/index) |
| DS | DSPy | `absent` | — | [dspy.ai](https://dspy.ai/) |

### STR — Streaming error surfacing

**Why:** UI must show partial failure  
**Coverage:** FC=14 · P=1 · A=1 · U=0

| ID | Framework | Coverage | Named API / feature | Evidence |
|----|-----------|----------|---------------------|----------|
| LG | LangGraph | `first_class` | stream modes values/messages/events; stream.interrupts | [docs.langchain.com](https://docs.langchain.com/oss/python/langgraph/streaming) |
| OA | OpenAI Agents SDK | `first_class` | Runner streaming events | [openai.github.io](https://openai.github.io/openai-agents-python/running_agents/) |
| AD | Google ADK | `first_class` | Events stream / artifact updates | [adk.dev](https://adk.dev/events/) |
| MS | Microsoft Agent Framework | `first_class` | streaming chat/agent responses | [learn.microsoft.com](https://learn.microsoft.com/en-us/agent-framework/overview/) |
| PD | PydanticAI | `first_class` | StreamedRunResult / AG-UI bridges | [pydantic.dev](https://pydantic.dev/docs/ai/core-concepts/agent/) |
| LC | LangChain | `first_class` | agent/graph streaming helpers | [docs.langchain.com](https://docs.langchain.com/oss/python/langchain/overview) |
| MA | Mastra | `first_class` | fullStream on agents/workflows | [mastra.ai](https://mastra.ai/docs/agents/overview) |
| LI | LlamaIndex | `first_class` | workflow event streams | [developers.llamaindex.ai](https://developers.llamaindex.ai/python/llamaagents/workflows/) |
| AG | AutoGen / AG2 | `first_class` | streaming tokens/messages | [docs.ag2.ai](https://docs.ag2.ai/) |
| CR | CrewAI | `first_class` | streaming task/crew outputs | [docs.crewai.com](https://docs.crewai.com/) |
| SK | Semantic Kernel | `first_class` | streaming content in agents | [learn.microsoft.com](https://learn.microsoft.com/en-us/semantic-kernel/frameworks/agent/) |
| HS | Haystack | `first_class` | streaming generators on components | [docs.haystack.deepset.ai](https://docs.haystack.deepset.ai/docs/pipelines) |
| SP | Spring AI | `first_class` | ChatClient streaming / reactive | [docs.spring.io](https://docs.spring.io/spring-ai/reference/api/chatclient.html) |
| VS | Vercel AI SDK | `first_class` | streamText / useChat / UIMessage parts | [ai-sdk.dev](https://ai-sdk.dev/) |
| SM | smolagents | `pattern` | partial step streaming | [huggingface.co](https://huggingface.co/docs/smolagents/en/reference/agents) |
| DS | DSPy | `absent` | — | [dspy.ai](https://dspy.ai/) |

### TRC — Trace/replay for failed runs

**Why:** MTTR  
**Coverage:** FC=12 · P=3 · A=1 · U=0

| ID | Framework | Coverage | Named API / feature | Evidence |
|----|-----------|----------|---------------------|----------|
| LG | LangGraph | `first_class` | LangSmith state-transition traces / time-travel | [docs.langchain.com](https://docs.langchain.com/oss/python/langgraph/persistence) |
| OA | OpenAI Agents SDK | `first_class` | built-in tracing processors | [openai.github.io](https://openai.github.io/openai-agents-python/tracing/) |
| AD | Google ADK | `first_class` | OpenTelemetry traces | [adk.dev](https://adk.dev/observability/traces/) |
| MS | Microsoft Agent Framework | `first_class` | Azure Monitor / OTel | [learn.microsoft.com](https://learn.microsoft.com/en-us/agent-framework/overview/) |
| PD | PydanticAI | `first_class` | Logfire + plain OTel | [pydantic.dev](https://pydantic.dev/docs/ai/integrations/logfire/) |
| LC | LangChain | `first_class` | LangSmith observability | [docs.langchain.com](https://docs.langchain.com/langsmith/observability) |
| MA | Mastra | `first_class` | logging/tracing/eval scorers | [mastra.ai](https://mastra.ai/docs/agents/overview) |
| LI | LlamaIndex | `first_class` | workflow observability integrations | [developers.llamaindex.ai](https://developers.llamaindex.ai/python/llamaagents/workflows/observability/) |
| AG | AutoGen / AG2 | `first_class` | OTel middleware telemetry guide | [docs.ag2.ai](https://docs.ag2.ai/docs/user-guide/telemetry/) |
| CR | CrewAI | `first_class` | observability/tracing docs | [docs.crewai.com](https://docs.crewai.com/edge/en/observability/tracing) |
| SK | Semantic Kernel | `pattern` | Azure-centric filters; portable OTel uneven | [learn.microsoft.com](https://learn.microsoft.com/en-us/semantic-kernel/frameworks/agent/) |
| HS | Haystack | `first_class` | tracing + OpenTelemetry | [docs.haystack.deepset.ai](https://docs.haystack.deepset.ai/docs/tracing) |
| SP | Spring AI | `first_class` | Micrometer observations / Actuator | [docs.spring.io](https://docs.spring.io/spring-ai/reference/) |
| VS | Vercel AI SDK | `pattern` | telemetry API + DevTools | [ai-sdk.dev](https://ai-sdk.dev/docs/ai-sdk-core/telemetry) |
| SM | smolagents | `absent` | — | [huggingface.co](https://huggingface.co/docs/smolagents/index) |
| DS | DSPy | `pattern` | logging/eval traces; not agent MTTR replay | [dspy.ai](https://dspy.ai/) |

### SBOX — Code-execution isolation

**Why:** Code-act RCE risk  
**Coverage:** FC=2 · P=2 · A=12 · U=0

| ID | Framework | Coverage | Named API / feature | Evidence |
|----|-----------|----------|---------------------|----------|
| LG | LangGraph | `absent` | — | [docs.langchain.com](https://docs.langchain.com/oss/python/langgraph/overview) |
| OA | OpenAI Agents SDK | `first_class` | Sandbox agents / sandbox clients | [openai.github.io](https://openai.github.io/openai-agents-python/) |
| AD | Google ADK | `absent` | — | [adk.dev](https://adk.dev/) |
| MS | Microsoft Agent Framework | `absent` | — | [learn.microsoft.com](https://learn.microsoft.com/en-us/agent-framework/overview/) |
| PD | PydanticAI | `pattern` | Harness sandboxes (E2B/Modal) | [pydantic.dev](https://pydantic.dev/docs/ai/overview/) |
| LC | LangChain | `absent` | — | [docs.langchain.com](https://docs.langchain.com/oss/python/langchain/overview) |
| MA | Mastra | `absent` | — | [mastra.ai](https://mastra.ai/docs/agents/overview) |
| LI | LlamaIndex | `absent` | — | [developers.llamaindex.ai](https://developers.llamaindex.ai/python/llamaagents/workflows/) |
| AG | AutoGen / AG2 | `absent` | — | [docs.ag2.ai](https://docs.ag2.ai/) |
| CR | CrewAI | `pattern` | tool backend sandboxes (partial) | [docs.crewai.com](https://docs.crewai.com/) |
| SK | Semantic Kernel | `absent` | — | [learn.microsoft.com](https://learn.microsoft.com/en-us/semantic-kernel/frameworks/agent/) |
| HS | Haystack | `absent` | — | [docs.haystack.deepset.ai](https://docs.haystack.deepset.ai/docs/agent) |
| SP | Spring AI | `absent` | — | [docs.spring.io](https://docs.spring.io/spring-ai/reference/) |
| VS | Vercel AI SDK | `absent` | — | [ai-sdk.dev](https://ai-sdk.dev/) |
| SM | smolagents | `first_class` | E2B / Docker / Modal / local sandboxes | [huggingface.co](https://huggingface.co/docs/smolagents/en/tutorials/secure_code_execution) |
| DS | DSPy | `absent` | — | [dspy.ai](https://dspy.ai/) |

---

## Framework notes

| ID | Notes |
|----|-------|
| **LG** | interrupt() + checkpointer; SCH/COV often via LangChain middleware; SBOX absent |
| **OA** | Tool approval + RunState; sole H-cluster first_class SBOX |
| **AD** | RequestInput HITL + EventsCompaction; SBOX DIY |
| **MS** | Workflow request/response HITL; Azure gravity for TRC |
| **PD** | Durable engines + Harness; SBOX via Harness sandboxes (pattern) |
| **LC** | HITL middleware on LangGraph persistence; IDE absent |
| **MA** | Agent/workflow suspend + tool approval |
| **LI** | InputRequiredEvent; durable via Context/DBOS; docs require idempotent tools |
| **AG** | Topology-rich; DUR pattern vs LG; IDE absent |
| **CR** | Checkpointing + HITL; CSR absent vs graph reducers |
| **SK** | Succession to MS Agent Framework; HIT/DUR pattern on SK path |
| **HS** | ConfirmationHook HITL; DUR absent (no thread checkpointer) |
| **SP** | Strong SCH/TRC; HIT/DUR/CSR absent |
| **VS** | ToolLoopAgent in-memory; HIT/DUR pattern via WorkflowAgent |
| **SM** | SBOX first_class; almost everything else thin |
| **DS** | Signatures for SCH; optimizer-first, weak serve-path incident APIs |

---

## Coverage clusters

| Cluster | FMC | Members | Pattern |
|---------|-----|---------|---------|
| H — Hardening-first | ≥78 | LG, OA, AD, MS, PD | Explicit pause/resume + persistence + tracing |
| M — Mid | 62–74 | LC, MA, LI, AG, CR, SK, HS, SP | Good tool loops; uneven durability/concurrency |
| L — Lab / thin | ≤55 | VS, SM, DS | DX / code-act / metrics over incident APIs |

**Meta:** High FMC correlates with lower RHS **except** when CTI is extreme (LG FMC 90 / RHS 28.7).

---

## Re-audit checklist

For each `first_class` claim, require: (1) named API in official docs, (2) example of failure→recovery, (3) not solely "call a human tool."  
Disagreement >2 letter grades on ≥3 modes → rescore FMC ±10.

See also: [`benchmark/deep/fmc_evidence.md`](../deep/fmc_evidence.md) for the five most surprising gaps.
