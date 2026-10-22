# AFFIX-2026 Cluster: Typed / DX-first & App-layer Frameworks

**Study:** AFFIX-2026  
**Date:** 2026-10-21  
**Frameworks:** VS · PD · DS · MA · SP (+ spot IN · LW)  
**Method:** [METHODOLOGY.md](../METHODOLOGY.md) — AFFIX weights + proprietary LIE / CTI / FMC / GED / RACS

---

## Executive finding

In this cluster, **Cognitive Tax (CTI) and Type/Contract Safety (TC) diverge**. Vercel AI SDK minimizes concepts for shipping a streamed product UI; PydanticAI maximizes typed contracts for Python agents (highest AFFIX); DSPy maximizes *quality-under-metric* at the cost of the highest learning load; Mastra is the credible TypeScript LangGraph alternative; Spring AI is the JVM enterprise on-ramp. Durability is increasingly **orthogonal**—Inngest (TS) or Temporal-via-PydanticAI (Python)—not a reason to abandon typed DX layers.

**CTI ranking (lower = less tax):** VS (22) → IN (26) → SP (28) → PD (30) → MA (34) → DS (48).

---

## Score matrix

| ID | Framework | AF | CS | OB | TC | EG | RE | MF | PH | DX | FP | **AFFIX** |
|----|-----------|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|----------:|
| PD | PydanticAI | 90 | 88 | 92 | 96 | 78 | 80 | 82 | 90 | 88 | 90 | **87.6** |
| MA | Mastra | 88 | 85 | 88 | 86 | 72 | 78 | 70 | 80 | 86 | 88 | **82.5** |
| VS | Vercel AI SDK | 82 | 72 | 70 | 92 | 95 | 88 | 75 | 68 | 94 | 85 | **81.5** |
| SP | Spring AI | 80 | 70 | 85 | 88 | 75 | 72 | 70 | 88 | 70 | 85 | **78.2** |
| DS | DSPy | 78 | 55 | 60 | 85 | 82 | 70 | 88 | 55 | 72 | 75 | **71.2** |

Spot (not full AFFIX weight discussion):

| ID | Notes | Highlight scores |
|----|-------|------------------|
| IN | Durable agent patterns / AgentKit | PH≈95, CS≈92, CTI≈26, AFFIX≈78.8 |
| LW | Gateway only | EG 90 · RE 88 · MF 92 · FP 86 |

Composite formula: AFFIX = Σ(score_d × weight_d) with weights from methodology (AF 0.14 … FP 0.06).

---

## Proprietary indices — Cognitive Tax focus

CTI = estimated concepts a mid-level engineer must learn before shipping a **reliable tool-calling agent with eval + tracing**. Lower is better. Values are **EST** with rationale and concept inventories in each dossier.

| ID | CTI ↓ | LIE ↓ | FMC % ↑ | GED ↑ | RACS ↑ | Cognitive Tax narrative |
|----|------:|------:|--------:|------:|-------:|-------------------------|
| **VS** | **22** | 35 | 55 | 42 | 65 | Shortest path: `tool` + `streamText`/`ToolLoopAgent` + `useChat` + telemetry. Tracing/eval often bolted (DevTools / external). |
| **IN** | **26** | 40 | 85 | 55 | 60 | Spot: durable loop is “normal code + `step.run`”; AgentKit Networks add a second model. |
| **SP** | **28** | 42 | 62 | 45 | 72 | Low *if* Spring-fluent: `ChatClient` + `.entity` + Advisor. High if new to Boot/reactive dual-stack. |
| **PD** | **30** | 22 | 78 | 72 | 80 | FastAPI-like core; tax rises when adopting Harness + Graph + durable engines—but types pay down runtime debugging. |
| **MA** | **34** | 32 | 72 | 78 | 84 | Must learn Agent vs Workflow vs Memory layers + Studio/evals. Still one coherent TS package vs LC+LG+LangSmith trio. |
| **DS** | **48** | 15 | 35 | 50 | 58 | Highest tax: Signatures, Modules, Metrics, GEPA/MIPRO, train/val discipline—*before* production agent concerns. |

### Concept inventories (CTI atoms)

| ID | Minimal concept set (EST) |
|----|---------------------------|
| VS | model/keys → tool schema → streamText/ToolLoopAgent → useChat UIMessage → telemetry |
| SP | Boot ChatClient → `.entity` → validateSchema → Advisors → `@Tool` → Micrometer |
| PD | Agent[Deps,Out] → tools/RunContext → output_type → OTel → (+ Graph/Harness/durable) |
| MA | Agent → tools → Workflow DSL → Memory layers → Studio → scorers |
| DS | Signature → Module → Metric(+feedback) → train/val → GEPA/MIPRO → save program → (+ prod infra) |
| IN | event→function → step.run model/tool → waitForEvent HITL → (+ AgentKit Network/Router) |

### Cognitive Tax differences (findings)

1. **Product UI tax ≠ agent OS tax.** VS wins CTI for chat products; teams often *underestimate* remaining PH tax (timeouts, idempotent tools, durable multi-minute jobs) and over-index on DX. Pair VS with IN or Workflow for production survival.

2. **Types reduce CTI only when the framework *is* the type system.** PD/VS/MA/SP push schemas into the primary API. DSPy’s types are Signature fields—powerful but sit beside a second curriculum (optimizers). TC can be high while CTI is also high (DS: TC 85, CTI 48).

3. **Batteries raise CTI, lower FMC pain.** MA and PD ask you to learn more names up front; you buy failure-mode coverage (memory, HITL, evals, durability). VS stays thin and pushes durability outward (Workflow/Inngest)—hence CTI 22 vs FMC 55%.

4. **DSPy inverts the usual learning order.** Other frameworks: ship loop → add eval. DSPy: design metric → compile → then productionize. That inversion is why CTI spikes for “just make a tool agent.” Payoff is quality/cost under a metric (GEPA reflective feedback; vendor Shopify/Dropbox claims—treat as claims).

5. **Spring’s CTI is conditional.** Same score reads as “easy” inside a Spring shop and “heavy” for a Next.js team—language/runtime affinity dominates. Score assumes Spring Boot fluency.

6. **Gateway (LW) does not lower agent CTI**; it lowers *provider* CTI. Pair LW with any of the five for MF/FP without changing cognitive load of agents (`base_url` swap).

7. **Durability is a separate tax axis.** IN CTI≈26 for teams already on Inngest; PD+Temporal adds concepts but lands PH≈90. Choosing MA/VS for DX then bolting durability later is a common (and often correct) composition.

8. **TC vs CTI scatter (cluster insight):** Highest TC (PD 96) is not lowest CTI (VS 22). Teams optimizing “type safety” and teams optimizing “ship chat UI” correctly pick different winners.

---

## Deep topic synthesis

### Structured outputs

| Framework | Mechanism | Streaming structured | Tools + schema |
|-----------|-----------|----------------------|----------------|
| VS | `Output.object` etc., Zod/Standard Schema | Yes (`partialOutputStream`, `useObject`); partials not fully valid until complete | First-class in same `generateText` loop |
| PD | `output_type` Pydantic models; tool/native/prompted modes | Yes (`StreamedRunResult`) | Native; validation retries |
| MA | `structuredOutput.schema` | Yes (`object-result`); optional structuring agent | Workarounds documented for provider limits |
| SP | `.entity()` + `validateSchema` / native | **No** typed entity on `.stream()` (docs: `.call()`-only) | Tools separate; converters for tools |
| DS | Signature output fields + adapters | Limited / secondary | Via ReAct tools |

Sources: [AI SDK structured data](https://ai-sdk.dev/docs/ai-sdk-core/generating-structured-data), [PydanticAI Output](https://pydantic.dev/docs/ai/core-concepts/output/), [Mastra structured output](https://mastra.ai/docs/agents/structured-output), [Spring AI structured output](https://docs.spring.io/spring-ai/reference/api/structured-output.html).

### Streaming UX for product UIs

**Ranking:** VS ≫ MA > PD ≈ IN > SP > DS.  
VS uniquely types tool parts into React components (`InferAgentUIMessage`) ([AI SDK 6](https://vercel.com/blog/ai-sdk-6)). MA streams well but UI typing is less end-to-end. PD bridges to Vercel AI / AG-UI. SP streams Flux text. DS is not UI-first.

### RSC / Next.js (VS)

Historical: AI SDK 3 RSC generative UI ([AI SDK 3](https://vercel.com/blog/ai-sdk-3-generative-ui)). Modern: App Router + UIMessage streams + agents. Treat RSC `streamUI` as legacy-capable, not the 2026 default architecture.

### Compile-time vs runtime guarantees

| Layer | Strongest |
|-------|-----------|
| App/UI contracts (TS) | VS |
| Agent deps + outputs (Python) | PD |
| Domain entities (Java) | SP |
| Task I/O fields + optimized prompts | DS |
| Workflow step graphs (TS) | MA |

None eliminate LM nondeterminism; all move *schema drift* earlier.

### Prompt optimization (DS) vs agent loops

- **DSPy:** offline/online compile against metrics (GEPA reflective textual feedback) ([GEPA](https://dspy.ai/current/getting-started/gepa-optimization/), [arxiv:2507.19457](https://arxiv.org/abs/2507.19457)).  
- **PD/MA/VS:** runtime tool loops + human/eval feedback.  
- **Complementary:** optimize a Signature in DSPy, serve via PydanticAI/AI SDK, route models through LiteLLM.

### JVM enterprise path (SP)

Keep AI inside Spring: Boot starters, Advisors, Micrometer, MCP servers/clients, record-based entities with `validateSchema()` self-correction. Accept weaker generative-UI and graph-agent stories. Explicit gap: no typed `.entity()` on `.stream()`.

### Mastra vs LangGraph (TS)

**Mastra is a serious LangGraph alternative for TypeScript** when you want agents + workflows + memory + Studio + MCP in one OSS package. Mastra’s own guide frames it as the TS path to the same destination as LangGraph (stateful agents, branching workflows, persistence) ([Mastra on LangGraph](https://mastra.ai/articles/langgraph)). LangGraph remains stronger for mature checkpoint ecosystems and Python parity. See [dossiers/MA.md](../../dossiers/MA.md).

---

## Recommended compositions

| Goal | Stack |
|------|-------|
| Next.js customer chat | **VS** (+ LW gateway) |
| Typed Python agents in prod | **PD** (+ Temporal/Logfire) |
| Metric-driven extraction / model downsizing | **DS** → export → serve elsewhere |
| TS agents with workflows/memory | **MA** (+ VS UI) |
| Spring estate | **SP** |
| Long-running / HITL durability | **IN** (TS) or PD+Temporal (Python) |

---

## Artifacts

- Dossiers: `dossiers/{VS,PD,DS,MA,SP}.{md,json}` (mirrored under `benchmark/dossiers/`)
- Spot-checks: `benchmark/spot-checks/{IN,LW}.{md,json}`
- Scores summary: `benchmark/clusters/typed-dx-scores.json`
- Methodology: `benchmark/METHODOLOGY.md`

## Primary citations (cluster)

- https://ai-sdk.dev/docs/ai-sdk-core/generating-structured-data  
- https://ai-sdk.dev/docs/reference/ai-sdk-core/tool-loop-agent  
- https://vercel.com/blog/ai-sdk-6  
- https://vercel.com/blog/ai-sdk-3-generative-ui  
- https://pydantic.dev/docs/ai/overview/  
- https://pydantic.dev/docs/ai/core-concepts/output/  
- https://pydantic.dev/docs/ai/capabilities/durable_execution/overview/  
- https://dspy.ai/current/getting-started/gepa-optimization/  
- https://dspy.ai/current/api/optimizers/GEPA/overview/  
- https://arxiv.org/abs/2507.19457  
- https://mastra.ai/docs/agents/overview  
- https://mastra.ai/docs/agents/structured-output  
- https://mastra.ai/articles/langgraph  
- https://mastra.ai/articles/ai-agent-framework  
- https://docs.spring.io/spring-ai/reference/api/structured-output.html  
- https://docs.spring.io/spring-ai/reference/api/structured-output/validation.html  
- https://docs.spring.io/spring-ai/reference/api/mcp/mcp-overview.html  
- https://www.inngest.com/docs/durable-execution/durable-agents  
- https://agentkit.inngest.com/  
- https://docs.litellm.ai/docs/simple_proxy  
