# Ecosystem Signals — AFFIX-2026 Deep Dive

**Study:** AFFIX-2026 · **As of:** 2026-10-21 (live API pulls same day)  
**EG scale:** 0–100 higher better (AFFIX weight **0.10**).  
**Companion JSON:** [`ecosystem_signals.json`](./ecosystem_signals.json)

All download/star figures below are **measured** unless marked **EST**. Job figures are **EST relative indices** (not scraped LinkedIn totals).

---

## Method

| Signal | Source | Notes |
|--------|--------|-------|
| GitHub stars | GitHub REST API `GET /repos/{owner}/{repo}` | Live 2026-10-21 |
| PyPI downloads | [pypistats.org API](https://pypistats.org/api/) `recent` last_month | Install events, not unique users |
| npm downloads | [npm downloads API](https://api.npmjs.org/downloads/point/last-month/{pkg}) | last-month window in response |
| Jobs **EST** | Relative index 0–100 from EG + recruiter/JD co-occurrence qualitative | LC = 100 baseline; not absolute posting counts |
| EG score | `affix_matrix.json` | Composite judgment, not raw stars |

**Caveats:** PyPI `langchain` dwarfs peers partly via transitive/CI installs. npm `ai` includes non-agent Next.js usage. Stars ≠ production fitness (AG2 rename suppressed star continuity vs historic AutoGen).

---

## Leaderboard (stars · downloads · EG · jobs EST)

| Rank (EG) | ID | Framework | EG | Stars (live) | Downloads (30d) | Jobs EST ↓ | Gravity read |
|----------:|----|-----------|---:|-------------:|----------------:|-----------:|--------------|
| 1 | LC | LangChain | **95** | **148,230** | PyPI **170.5M** | **100** | Default JD keyword; hiring moat |
| 1 | VS | Vercel AI SDK | **95** | 27,440 | npm `ai` **118.6M** | **92** | Front-end AI default; download ≠ agents |
| 3 | CR | CrewAI | **90** | **59,966** | PyPI **2.44M** | **78** | Demo/role-team mindshare |
| 4 | LG | LangGraph | **85** | 43,679 | PyPI **44.8M** | **88** | Prod orchestration keyword rising |
| 4 | SK | Semantic Kernel | **85** | 28,687 | PyPI **0.30M** | **70** | Enterprise/.NET JD adjacency |
| 6 | OA | OpenAI Agents SDK | **82** | 30,206 | PyPI **12.4M** | **75** | Official-path gravity |
| 6 | DS | DSPy | **82** | 38,725 | PyPI **5.31M** | **55** | Research→prod niche; fewer JDs |
| 8 | LI | LlamaIndex | **80** | **52,607** | PyPI **2.94M** | **72** | RAG specialist hiring |
| 8 | AD | Google ADK | **80** | 21,953 | PyPI **10.1M** | **68** | Fast download ramp; GCP jobs |
| 8 | MS | Microsoft Agent Framework | **80** | — | — | **65 EST** | Succession from SK; Azure JD |
| 11 | PD | PydanticAI | **78** | 20,774 | PyPI **5.38M** | **58** | FastAPI talent transfer |
| 11 | AG | AutoGen / AG2 | **78** | 5,008* | PyPI `ag2` **0.16M** | **50** | Rename tax; research brand |
| 13 | SP | Spring AI | **75** | — | Maven N/A here | **62 EST** | JVM enterprise channels |
| 13 | SM | smolagents | **75** | 29,965 | PyPI **0.43M** | **40** | HF mindshare > enterprise JDs |
| 15 | MA | Mastra | **72** | 28,988 | npm `@mastra/core` **8.03M** | **48** | Rising TS; fewer legacy JDs |
| 16 | HS | Haystack | **70** | 26,804 | PyPI **0.57M** | **52** | EU/deepset; quieter US JD |

\*AG2 star count understates historic AutoGen mindshare — treat EG 78 as brand continuity **EST**.

**Obs sink (not Tier-A framework):** Arize Phoenix — **11,942** stars; PyPI `arize-phoenix` **626k**/mo ([repo](https://github.com/Arize-ai/phoenix)).

---

## Stars deep dive

| ID | Repo | Stars | Forks | License | URL |
|----|------|------:|------:|---------|-----|
| LC | langchain-ai/langchain | 148230 | 24876 | MIT | https://github.com/langchain-ai/langchain |
| CR | crewAIInc/crewAI | 59966 | 8827 | MIT | https://github.com/crewAIInc/crewAI |
| LI | run-llama/llama_index | 52607 | 8404 | MIT | https://github.com/run-llama/llama_index |
| LG | langchain-ai/langgraph | 43679 | 7480 | MIT | https://github.com/langchain-ai/langgraph |
| DS | stanfordnlp/dspy | 38725 | 3441 | MIT | https://github.com/stanfordnlp/dspy |
| OA | openai/openai-agents-python | 30206 | 4914 | MIT | https://github.com/openai/openai-agents-python |
| SM | huggingface/smolagents | 29965 | 3121 | Apache-2.0 | https://github.com/huggingface/smolagents |
| MA | mastra-ai/mastra | 28988 | 3028 | NOASSERTION | https://github.com/mastra-ai/mastra |
| SK | microsoft/semantic-kernel | 28687 | 4832 | MIT | https://github.com/microsoft/semantic-kernel |
| VS | vercel/ai | 27440 | 5409 | NOASSERTION | https://github.com/vercel/ai |
| HS | deepset-ai/haystack | 26804 | 3318 | Apache-2.0 | https://github.com/deepset-ai/haystack |
| AD | google/adk-python | 21953 | 4204 | Apache-2.0 | https://github.com/google/adk-python |
| PD | pydantic/pydantic-ai | 20774 | 2987 | MIT | https://github.com/pydantic/pydantic-ai |
| Phoenix | Arize-ai/phoenix | 11942 | 1231 | NOASSERTION | https://github.com/Arize-ai/phoenix |
| AG | ag2ai/ag2 | 5008 | 754 | Apache-2.0 | https://github.com/ag2ai/ag2 |

**Signal vs AFFIX:** Stars correlate loosely with EG (ρ **EST** moderate). Counterexamples: PD stars mid / AFFIX #1; AG stars low / research GED high; VS stars mid / EG 95 via npm+Next.js.

---

## Downloads deep dive

### PyPI `last_month` (pypistats 2026-10-21)

| ID | Package | Last month | Last week | Last day |
|----|---------|----------:|----------:|---------:|
| LC | langchain | 170,457,766 | 37,281,283 | 5,580,548 |
| LG | langgraph | 44,769,952 | 12,518,113 | 2,332,056 |
| OA | openai-agents | 12,449,784 | 3,271,693 | 764,362 |
| AD | google-adk | 10,109,331 | 2,316,962 | 389,633 |
| PD | pydantic-ai | 5,383,780 | 1,530,678 | 266,695 |
| DS | dspy | 5,312,050 | 1,318,603 | 240,150 |
| LI | llama-index | 2,937,852 | 644,289 | 72,383 |
| CR | crewai | 2,442,764 | 668,587 | 96,624 |
| HS | haystack-ai | 566,454 | 116,053 | 33,156 |
| SM | smolagents | 425,605 | 112,792 | 22,689 |
| SK | semantic-kernel | 300,767 | 73,141 | 12,102 |
| AG | ag2 | 164,672 | 41,685 | 6,830 |
| Phoenix | arize-phoenix | 626,210 | 169,299 | 25,697 |

API: `https://pypistats.org/api/packages/{name}/recent`

### npm last-month

| ID | Package | Downloads | Window | URL pattern |
|----|---------|----------:|--------|-------------|
| VS | `ai` | **118,618,237** | 2026-09-19 → 2026-10-18 | https://api.npmjs.org/downloads/point/last-month/ai |
| MA | `@mastra/core` | **8,027,650** | same | …/last-month/@mastra/core |

Vendor claim cross-check: Vercel AI SDK 6 blog cites **20M+ monthly downloads** ([vercel.com/blog/ai-sdk-6](https://vercel.com/blog/ai-sdk-6)) — npm point pull is higher; treat marketing vs API windows carefully. Prefer API numbers above for AFFIX.

---

## Jobs EST (hiring market)

**Definition:** Relative demand index for “can hire mid-level eng who already knows X” in US/EU English JDs, Q3–Q4 2026 **EST**. Baseline LC = **100**.

| ID | Jobs EST | Rationale (qualitative) | Soft sources |
|----|---------:|-------------------------|--------------|
| LC | 100 | Ubiquitous GenAI JD keyword; Google-indexed “Langchain: more than 200 jobs” style list pages | [LinkedIn X-ray notes](https://www.linkedin.com/pulse/reverse-sourcing-13-brain-linkedin-x-ray-job-queries-diane-rocher-27qae); Simplilearn agentic roles cite LangChain ([simplilearn](https://www.simplilearn.com/career-roadmap/agentic-ai-engineer-usa)) |
| VS | 92 | “Next.js + AI SDK” product eng demand; often unlabeled as framework | AI SDK adoption claims ([AI SDK 6](https://vercel.com/blog/ai-sdk-6)) |
| LG | 88 | Rising “LangGraph” in senior agent JDs alongside LC | Speakeasy / Braintrust roundups 2026 |
| CR | 78 | Strong tutorial mindshare; fewer regulated-enterprise mandates | CrewAI GitHub gravity |
| OA | 75 | “OpenAI Agents SDK” appearing in OpenAI-stack shops | Official SDK positioning |
| LI | 72 | RAG / document-agent specialist roles | LlamaIndex stars + RAG continuum |
| SK | 70 | Azure/.NET enterprise JDs; Semantic Kernel long-tail | MS Learn + enterprise stack posts |
| AD | 68 | GCP / ADK ramp; fewer legacy postings than LC | google-adk download velocity |
| MS | 65 | Successor keyword; still SK-heavy JDs | [Agent Framework](https://learn.microsoft.com/en-us/agent-framework/overview/) |
| SP | 62 | Spring AI inside JVM reqs more than named agent frameworks | Spring ecosystem |
| PD | 58 | “Pydantic/FastAPI” talent > “PydanticAI” keyword yet | PyPI growth vs JD lag |
| DS | 55 | Research/applied science; rarer pure “DSPy engineer” req | Stanford brand + Shopify case claims |
| HS | 52 | EU / NLP platform shops; US quieter | deepset positioning |
| AG | 50 | AutoGen brand memory > AG2 keyword | Rename discontinuity |
| MA | 48 | Fast npm; thin legacy JD corpus | Mastra vs LangGraph TS narratives |
| SM | 40 | HF community > enterprise reqs | smolagents docs |

**Falsifier:** LinkedIn Recruiter exact-match counts reversing top-5 order (LC/VS/LG/CR/OA) for US mid-level roles.

---

## EG vs lock-in (why gravity ≠ good)

| Pattern | Example | Implication |
|---------|---------|-------------|
| High EG + high LIE | LC (95 / 72) | Easy to hire into a sticky stack |
| High EG + mid LIE | VS (95 / 35) | Hire for UI; compose durability elsewhere |
| Mid EG + low LIE | PD (78 / 22) | Hire FastAPI talent; teach PydanticAI |
| High stars + mid EG | CR (60k★ / EG 90) | Mindshare real; enterprise still LC/LG |
| High downloads + mid stars | AD (10M PyPI / 22k★) | Deployed faster than celebrated |

See [`lock_in_taxonomy.md`](./lock_in_taxonomy.md) for coupling types that EG often *amplifies*.

---

## Ecosystem narrative by cluster

### LangChain family
LC+LG dominate **install base** and **JD vocabulary**. LangSmith is the commercial EG multiplier (obs + evals). Migration guides *from* LangChain (Haystack publishes one) are themselves EG evidence.

### Typed / app layer
VS owns TS app EG via npm; MA is the workflow EG challenger (`@mastra/core` 8M). PD owns typed-Python mindshare among FastAPI shops despite fewer named JDs.

### Multi-agent
CR wins GitHub theater; OA wins official-path downloads; AD wins cloud-deploy download velocity; AG pays rename tax.

### RAG
LI leads stars among data frameworks; HS leads OSS/EU trust with lower EG — consistent with LIE advantage (42 vs LI 58).

### Optimizers & sinks
DSPy: strong stars/downloads, weak JD — EG 82 is “community+citations” more than hiring. Phoenix: category EG for portable obs.

---

## Sources

- GitHub API (live): repos listed above  
- https://pypistats.org/api/packages/{package}/recent  
- https://api.npmjs.org/downloads/point/last-month/ai  
- https://api.npmjs.org/downloads/point/last-month/@mastra/core  
- https://vercel.com/blog/ai-sdk-6  
- https://www.speakeasy.com/blog/ai-agent-framework-comparison  
- https://www.braintrust.dev/articles/best-ai-agent-frameworks-2026  
- https://www.langchain.com/resources/ai-agent-frameworks  
- https://langfuse.com/blog/2025-03-19-ai-agent-comparison  
- Dossier version stamps: `benchmark/dossiers/LC.md`, `LG.md`, `LI.md`, `HS.md`, `VS.md`  
- Matrix EG: `benchmark/scores/affix_matrix.json`  
