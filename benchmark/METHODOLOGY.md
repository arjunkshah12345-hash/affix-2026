# AI Framework Benchmark — Proprietary Methodology (AFFIX-2026)

**Study ID:** AFFIX-2026 (Agent Framework Fitness Index eXtended)  
**Date:** 2026-10-21  
**Scope:** Production-relevant LLM / agent application frameworks (not model weights)

## Framework Universe (Tier A — scored deeply)

| ID | Framework | Primary Lang | Category |
|----|-----------|--------------|----------|
| LC | LangChain | Python/TS | Orchestration + tools |
| LG | LangGraph | Python/TS | Stateful graphs / agents |
| LI | LlamaIndex | Python/TS | RAG / data agents |
| HS | Haystack | Python | Pipelines / RAG |
| SK | Semantic Kernel | C#/Python | Enterprise agents |
| AG | AutoGen / AG2 | Python | Multi-agent |
| CR | CrewAI | Python | Role-based crews |
| OA | OpenAI Agents SDK | Python | Agent runtime |
| VS | Vercel AI SDK | TypeScript | App-layer AI |
| PD | PydanticAI | Python | Typed agents |
| DS | DSPy | Python | Programmatic prompting |
| MA | Mastra | TypeScript | TS agent platform |
| SM | Hugging Face smolagents | Python | Code-act agents |
| AD | Google ADK | Python | Google agent kit |
| MS | Microsoft Agent Framework / Autogen successors | Python/.NET | Enterprise |
| LW | LiteLLM / proxy layer (contextual) | Python | Gateway (reference) |
| EL | ElizaOS / agent OS (contextual) | TS | Social agents |
| IN | Inngest AgentKit / workflow agents | TS | Durable workflows |
| SP | Spring AI | Java | JVM enterprise |
| HA | Haystack alternatives / txtai (spot) | Python | Spot checks |

## Scoring Model — AFFIX Composite

Each dimension 0–100. Weights sum to 1.0.

| Dimension | Code | Weight | What we measure |
|-----------|------|--------|-----------------|
| Abstraction Fit | AF | 0.14 | Right primitives for real agent/RAG jobs without leaky abstractions |
| Control Surface | CS | 0.13 | Determinism knobs, interrupts, human-in-loop, retries, state |
| Observability | OB | 0.11 | Traces, spans, token/cost, replay, eval hooks |
| Type & Contract Safety | TC | 0.10 | Schemas, structured I/O, compile-time guarantees |
| Ecosystem Gravity | EG | 0.10 | Integrations, community, examples, hiring market |
| Runtime Economics | RE | 0.09 | Overhead, streaming, concurrency, deploy cost shape |
| Migration Friction | MF | 0.08 | Lock-in, portability of graphs/prompts/tools |
| Production Hardening | PH | 0.10 | Auth, secrets, timeouts, idempotency, durable execution |
| DX Velocity | DX | 0.09 | Time-to-first-agent, docs quality, local ergonomics |
| Future-Proofing | FP | 0.06 | Protocol alignment (MCP, A2A), model-agnosticism |

**Composite AFFIX = Σ (score_d × weight_d)**

### Proprietary Indices (novel)

1. **Lock-in Entropy (LIE):** bits of irreversible coupling (vendor SDKs, proprietary graph formats, cloud-only runtimes). Lower is better.
2. **Cognitive Tax Index (CTI):** estimated concepts a mid-level eng must learn before shipping a reliable tool-calling agent with eval + tracing. Lower is better.
3. **Failure-Mode Coverage (FMC):** % of common production failure modes with first-class API support (timeouts, partial tool failure, schema drift, context overflow, concurrent state races).
4. **Graph Expressiveness Density (GED):** useful control-flow patterns per 1k LoC of framework surface (branch, join, map-reduce, interrupt, subgraph, checkpoint).
5. **RAG-to-Agent Continuum Score (RACS):** how smoothly a project evolves from retrieval pipeline → tool agent → multi-agent without rewrite.

## Evidence Rules

- Prefer primary docs, GitHub, release notes, official examples (2025–2026).
- Cite URLs for every non-obvious claim.
- Distinguish *marketing claims* vs *API reality*.
- Flag uncertainty explicitly.
- Do NOT invent benchmark numbers; when estimating, mark as **EST** with rationale.

## Deliverables

1. Per-framework dossier (JSON + markdown)
2. Score matrix CSV/JSON
3. Proprietary findings memo
4. Interactive HTML report
