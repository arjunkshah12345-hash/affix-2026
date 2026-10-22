# AFFIX-2026 Persona Playbooks

**Study:** AFFIX-2026 · **As of:** 2026-10-21  
**Method:** Map personas → primary framework + optional companions using AFFIX, RHS, LIE, FMC, RACS, PR (not popularity alone).  
**Rule:** Prefer **RHS ≤ 28** and persona-fit on language/compliance; mark EST where org constraints dominate.

---

## 1. Startup MVP chatbot

| Pick | Role |
|------|------|
| **Primary: Vercel AI SDK (VS)** | Fastest path to streamed chat UI (`useChat`, typed tool parts). EG=95, DX=94, CTI=22. |
| **Alt (Python shop): CrewAI (CR) or OpenAI Agents SDK (OA)** | CR for role demos; OA if already on OpenAI. |
| **Do not start on:** LangGraph, AG2, DSPy | CTI/RHS tax kills MVP velocity. |

**Companion:** LiteLLM/gateway (LW spot) for model switching; defer Mastra until you need workflows/HITL.

**Falsifier:** If time-to-first-streamed-tool-chat on MA < VS for a greenfield Next.js team, swap primary.

**Citations:** [ai-sdk.dev](https://ai-sdk.dev/), [AI SDK 6](https://vercel.com/blog/ai-sdk-6)

**Watch:** RHS=32.9 — schedule hardening (timeouts, durable jobs) by month 3 or compose Inngest/Mastra.

---

## 2. Enterprise RAG

| Pick | Role |
|------|------|
| **Primary: LlamaIndex (LI)** | Best RACS (92); Documents→Workflows→HITL continuum. |
| **Alt (lower lock-in): Haystack (HS)** | RACS=85, LIE=42 vs LI LIE=58; Pipeline vs Agent clarity. |
| **JVM estate: Spring AI (SP)** | QuestionAnswerAdvisor → tools → MCP inside Spring. |

**Companion:** LangSmith/Phoenix/Langfuse for evals; avoid rewriting retrieval in LangChain if LI/HS already fit.

**Falsifier:** Head-to-head retrieval quality + HITL resume on same corpus; if HS matches LI with lower ops cost, HS wins default.

**Citations:** [LlamaIndex workflows](https://developers.llamaindex.ai/python/llamaagents/workflows/), [Haystack Agent](https://docs.haystack.deepset.ai/docs/agent)

---

## 3. Multi-agent research

| Pick | Role |
|------|------|
| **Primary: AutoGen / AG2 (AG)** | Highest GED (95); GroupChat/Network/channel protocols. |
| **Alt (productized roles): CrewAI (CR)** | Hierarchical process + Flows; lower CTI. |
| **Alt (Google multi-cloud graphs): ADK (AD)** | GED=90, PR=96, deterministic HITL nodes. |

**Companion:** smolagents for code-act sub-agents; OTel middleware (AG2) for portable traces.

**Falsifier:** If research team ships peer debate + typed channels faster on AD than AG, demote AG.

**Citations:** [docs.ag2.ai](https://docs.ag2.ai/), [CrewAI hierarchical](https://docs.crewai.com/v1.15.2/en/learn/hierarchical-process), [ADK multi-agents](https://adk.dev/agents/multi-agents/)

**Watch:** AG RHS=36 — plan serve-path (OA/PD/AD) before productionizing research code.

---

## 4. Regulated HITL (compliance / approval gates)

| Pick | Role |
|------|------|
| **Primary: LangGraph (LG)** | Best CS (95), FMC (90), PH (93); `interrupt()` + checkpointers + time-travel. |
| **Alt: Google ADK (AD)** | `RequestInput` deterministic pauses; OTel + deploy story. |
| **Alt (OpenAI-std): OA** | Guardrails + needs_approval + RunState resume. |
| **Python typed + Temporal: PydanticAI (PD)** | RHS best-in-set (17.3) if durable engines adopted. |

**Avoid as sole runtime:** VS, SM, DS (weak durable interrupt semantics).

**Falsifier:** Compliance audit requires mid-graph pause with crash-safe resume; if framework lacks checkpointer-equivalent, disqualify.

**Citations:** [LG interrupts](https://docs.langchain.com/oss/python/langgraph/interrupts), [ADK human input](https://adk.dev/graphs/human-input/), [OA HITL](https://openai.github.io/openai-agents-python/human_in_the_loop/)

---

## 5. TypeScript product company

| Pick | Role |
|------|------|
| **UI layer: Vercel AI SDK (VS)** | Streaming UX + schema contracts. |
| **Agent OS: Mastra (MA)** | Workflows + memory + HITL; RACS=84, RHS=20.8. |
| **Durable long jobs: Inngest AgentKit (IN spot)** | PH≈95 when multi-minute/HITL. |

**Avoid:** LangGraph JS alone for greenfield product (CTI) unless already LC-shop; Spring AI (wrong runtime).

**Falsifier:** If Mastra Studio/enterprise gravity forces LIE > 50 in practice, prefer VS + Inngest only.

**Citations:** [mastra.ai agents](https://mastra.ai/docs/agents/overview), [AI SDK MCP tools](https://ai-sdk.dev/docs/ai-sdk-core/mcp-tools)

---

## 6. Python data / ML team

| Pick | Role |
|------|------|
| **Primary: PydanticAI (PD)** | AFFIX leader (87.64), TC=96, RHS=17.3; FastAPI-like DX. |
| **Quality compiler: DSPy (DS)** | Optimize Signatures/metrics offline; **serve via PD**. |
| **RAG-heavy data apps: LI or HS** | Continuum over PD alone. |

**Avoid as sole prod runtime:** DSPy, smolagents (FMC/PH).

**Falsifier:** If PD hiring pool insufficient and team already LangChain-fluent, LC→LG path may beat PD on calendar time despite worse RHS.

**Citations:** [PydanticAI overview](https://pydantic.dev/docs/ai/overview/), [DSPy GEPA](https://dspy.ai/current/getting-started/gepa-optimization/)

---

## 7. JVM / Spring shop

| Pick | Role |
|------|------|
| **Primary: Spring AI (SP)** | ChatClient, Advisors, Micrometer, MCP starters; stays in Boot estate. |
| **Alt (.NET shop): Microsoft Agent Framework (MS)** | Not JVM — use when estate is C#; SK only for brownfield. |
| **Sidecar (only if needed): ADK Java/Kotlin or Python PD** | When graph agents exceed ChatClient. |

**Falsifier:** If Spring AI Agent graph FMC matches LG on durable HITL checklist, promote SP for agent-heavy JVM apps; today EST says no.

**Citations:** [Spring AI MCP](https://docs.spring.io/spring-ai/reference/api/mcp/mcp-overview.html), [structured output](https://docs.spring.io/spring-ai/reference/api/structured-output.html)

---

## 8. Cost-sensitive high-volume

| Pick | Role |
|------|------|
| **Gateway: LiteLLM (LW spot)** | Provider routing, caching, budget — MF/FP without agent CTI. |
| **Runtime (Python): PD or SM→PD** | SM for cheap prototypes (LIE=18, RE=80); PD for production. |
| **Optimize prompts: DSPy** | Model downsizing via GEPA/MIPRO before infra spend. |
| **Avoid:** OA sandbox/realtime-heavy paths; unmanaged multi-agent AG chats; LC+LG+LangSmith full stack without need. |

**Volume knobs:** Prefer frameworks with streaming + low orchestration overhead (VS/PD/SM RE ≥ 80); batch via DSPy compile then thin serve.

**Falsifier:** $/1k successful tool-calls including orchestration overhead; if LG undercuts PD at scale due to batching, revise RE weights.

**Citations:** LiteLLM spot-check; [smolagents](https://huggingface.co/docs/smolagents/index); DSPy optimizers

---

## Cross-persona decision cheatsheet

| Constraint | Prefer | Avoid |
|------------|--------|-------|
| Must ship UI this week | VS | LG, AG, DS |
| Must pass audit HITL | LG, AD, OA, PD+Temporal | VS, SM, DS alone |
| Must stay in Java | SP | Everything else as primary |
| Must minimize lock-in | DS (compile), SM, PD, HS | LC, LG, OA, LI Cloud |
| Must maximize protocols | AD, PD, MA, VS, SP | DS |
| Must minimize 12-mo rewrite | PD, MS, MA | DS, SM, AG, VS alone |

---

## Evidence

Scores: `benchmark/scores/affix_matrix.json`  
Dossiers: `benchmark/dossiers/`  
Clusters: `benchmark/clusters/multi-agent.md`, `typed-dx.md`
