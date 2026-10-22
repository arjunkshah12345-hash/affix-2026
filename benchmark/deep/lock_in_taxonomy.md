# Lock-in Entropy (LIE) Taxonomy — AFFIX-2026

**Study:** AFFIX-2026 · **As of:** 2026-10-21  
**Canonical definition:** Bits of irreversible coupling (vendor SDKs, proprietary graph/checkpoint formats, cloud-only runtimes). **Lower is better.**  
**Primary ranking:** [`benchmark/findings/lock_in_entropy.md`](../findings/lock_in_entropy.md) · scores in [`affix_matrix.json`](../scores/affix_matrix.json)

---

## 1. Canonical scale: **0–100** (mandatory)

| Property | Canonical | Rejected draft |
|----------|-----------|----------------|
| Range | **0–100** | 0–10 (cluster multi-agent only) |
| Direction | **Lower = less lock-in** | — |
| Source of truth | `METHODOLOGY.md`, `affix_matrix.json`, dossiers | `clusters/multi-agent.md` / `.json` proprietary table |

### Normalization rule (fix inconsistent agent outputs)

```
LIE_100 = round(LIE_10 * 10)   # when a document clearly used 0–10
```

| ID | Multi-agent draft (0–10) | ×10 | Canonical matrix (0–100) | Δ |
|----|-------------------------:|----:|-------------------------:|--:|
| OA | 5.6 | 56 | **55** | −1 |
| AD | 4.5 | 45 | **45** | 0 |
| SK | 4.9 | 49 | **48** | −1 |
| AG | 4.2 | 42 | **42** | 0 |
| CR | 3.8 | 38 | **38** | 0 |
| SM | 1.8 | 18 | **18** | 0 |

**SM dossier prose** also said “LIE ~1k LoC philosophy” — that is **not** a 0–10 score; ignore for numeric LIE.

**OA dossier OB 89 vs matrix OB 88:** matrix wins for composites; LIE stays **55**.

**Re-score recipe** (from lock_in_entropy.md): five bit families scored 0–2, sum × scale ≈ 0–100:

| Bit family | 0 | 1 | 2 |
|------------|---|---|---|
| Vendor default model/API | Agnostic | Default vendor, easy swap | Swap loses features |
| Proprietary state/checkpoint | None | Exportable | Opaque / DB-coupled |
| Cloud runtime gravity | None | Optional | Default deploy path |
| Observability product | OTel-only | Dual | Vendor UI required for prod |
| Succession / dual-stack | Stable | Soft migrate | Forced rewrite |

---

## 2. Lock-in taxonomy (coupling types)

### A. Ops / observability gravity
Vendor UI or account required for production truth (traces, evals, issue detection).

| Example | Mechanism | LIE impact |
|---------|-----------|------------|
| LangSmith | Default path for LC/LG debug+evals | LC **72**, LG **68** |
| OpenAI Traces | Default-on; ZDR cliff; key for dashboard | OA **55** |
| CrewAI AMP | Built-in tracing / enterprise HITL | CR **38** |
| Logfire | Optional; OTel escape | PD **22** (low) |
| Phoenix / OTel sinks | Portable; AX cloud optional | Usually **does not** raise LIE |

**Rule:** Model-portable README + vendor-default traces ≈ **+20–30 LIE EST** vs OTel-only (PROPRIETARY_FINDINGS #3).

### B. State / checkpoint format lock
Irreversible coupling to runtime persistence schemas.

| Example | Mechanism | Escape |
|---------|-----------|--------|
| LangGraph | Postgres/SQLite checkpointer + reducer semantics | Self-host savers; **migrating graphs ≈ rewrite** |
| LangChain `create_agent` | Compiles onto LangGraph — funnel lock | Cannot avoid LG once HITL/memory ship |
| LlamaIndex Workflows | Context serialization; DIY/DBOS durability | OSS portable; Cloud/Parse raise LIE |
| Mastra | Workflow/memory schemas | Apache core; self-host |
| Haystack | Pipeline YAML + Python | YAML reviewable; lowest RAG-cluster LIE |

### C. Cloud / deploy paved-road lock

| Example | Paved road | Escape hatch |
|---------|------------|--------------|
| ADK | Agent Runtime / Cloud Run / GKE | Containers + LiteLLM |
| OA | Sandbox, Realtime, hosted sessions | LiteLLM/AnyLLM (**feature skew EST**) |
| SK / MS | Azure Foundry / App Insights | Multi-language + MCP/A2A |
| LI | LlamaCloud / LlamaParse / llamactl | Pure OSS workflows |
| VS | Vercel Gateway / Workflow / Elements | OSS `ai` package multi-provider |
| SP | Spring Boot estate | Swap model starters; MCP |

### D. Commercial adjacency (quality SaaS)

Not required for Hello World; becomes default for quality in prod.

- **LlamaParse / LlamaCloud** → LI LIE **58**
- **deepset Platform** → HS optional (LIE stays **42** if OSS)
- **LangSmith Engine** issue detection → LC gravity

### E. Succession / dual-stack lock
License may be Apache/MIT; **human rewrite** still irreversible.

| Transition | Effect |
|------------|--------|
| SK → Microsoft Agent Framework | Enterprise surface moves; LIE MS **52** |
| AutoGen Classic → AG2 v1 | Non-drop-in; CTI+LIE tax |
| LCEL / classic → LC v1 `create_agent` | Concepts churn; runtime still LG |

### F. Default embedding / model soft locks
Easy to miss in READMEs.

- CrewAI memory default embeddings often OpenAI unless custom embedder  
- OA Responses API default  
- ADK Gemini-first samples  

Score these under bit family “Vendor default model/API.”

### G. Hiring / ecosystem lock (EG × LIE interaction)
High EG makes lock-in **sticky**: staff trained on LC/LangSmith resist MF even when MF APIs exist.

| Pattern | IDs |
|---------|-----|
| Hire-into-sticky | LC, LG |
| Hire-around-portable | PD (FastAPI), HS (pipelines), DS (export prompts) |
| Mindshare ≠ deploy lock | CR stars high, LIE mid |

---

## 3. Canonical LIE ranking (0–100)

| Rank | ID | LIE ↓ | Dominant taxonomy classes |
|-----:|----|------:|---------------------------|
| 1 | DS | **15** | E(none) — optimizer artifacts OSS |
| 2 | SM | **18** | C(optional HF) |
| 3 | PD | **22** | A(optional Logfire) |
| 4 | MA | **32** | B(mild) + C(Studio) |
| 5 | VS | **35** | C(Vercel path) |
| 6 | CR | **38** | A(AMP) + F(embeddings) |
| 7 | AG / HS / SP | **42** | E(AG) · A(optional HS) · C(Spring-shaped) |
| 10 | AD | **45** | C(GCP) |
| 11 | SK | **48** | C(Azure) + E(→MS) |
| 12 | MS | **52** | C + E |
| 13 | OA | **55** | A(Traces) + C(sandbox/realtime) + F |
| 14 | LI | **58** | D(Cloud/Parse) + B(Context) |
| 15 | LG | **68** | B(checkpoints) + A(Smith) |
| 16 | LC | **72** | A(Smith) + B(→LG funnel) + EG amplify |

Tiers: **≤25 portable cores** · **26–45 mild product gravity** · **45–60 cloud/ops** · **≥60 orchestration format lock**.

---

## 4. Observability × LIE matrix (deep-dive link)

| Obs default | Typical LIE delta vs OTel-only | Frameworks |
|-------------|-------------------------------:|------------|
| Vendor UI required | +15 to +30 | LC, LG, OA, CR |
| Dual (vendor + OTel) | +5 to +15 | PD (Logfire), MA, SK |
| OTel / OpenInference first | 0 to +5 | AD, AG, HS, LI (+Phoenix), VS (+Phoenix) |
| BYO / weak first-class | 0 (but OB pain) | SM, DS |

Detail: [`observability_matrix.md`](./observability_matrix.md).

---

## 5. Production hardening × LIE (the trap)

High PH often **is** lock-in when PH is implemented as proprietary durable state:

| | High PH | Lower PH |
|--|---------|----------|
| **Higher LIE** | LG (93/68), OA (88/55) | LC (75/72)* |
| **Lower LIE** | PD (90/22) | DS (55/15), VS (68/35) |

\*LC PH lower than LG but LIE highest — Smith + funnel without owning the best control surface.

**Compose-native PH** (PD+Temporal, VS+Inngest, LI+DBOS) buys hardening without checkpoint-format monopoly. See [`production_hardening.md`](./production_hardening.md).

---

## 6. Protocol readiness ≠ low LIE

| ID | PR ↑ | LIE ↓ | Lesson |
|----|-----:|------:|--------|
| AD | 96 | 45 | MCP/A2A/OTel free **tools**, not **graphs/deploy** |
| PD | 91 | 22 | Protocols + portable core |
| DS | 52 | 15 | Portable prompts, weak protocol surface |

---

## 7. Escape-hatch catalog (documented)

| ID | Documented escape | Residual coupling |
|----|-------------------|-------------------|
| DS | Export compiled programs; serve elsewhere | Optimizer culture/CTI |
| SM | Pure Python + any backend | Thin PH |
| PD | Model strings + OTel; skip Logfire | Harness optional gravity |
| MA | Self-host Apache core | Studio/Enterprise |
| VS | Multi-provider `ai` package | Gateway/Workflow pull |
| CR | Custom embedder; OSS crews | AMP if used |
| HS | OTel + YAML pipelines | deepset optional |
| AD | LiteLLM + containers | GCP paved road |
| OA | LiteLLM/AnyLLM | Traces/sandbox/ZDR |
| LI | OSS workflows | Parse/Cloud quality |
| LG | Self-hosted savers | Schema semantics |
| LC | `init_chat_model`; OTel alts | Still LG under `create_agent` |

---

## 8. Non-obvious LIE laws (AFFIX proprietary)

1. **Low LIE ≠ low RHS** — DS/SM easiest to leave *and* most likely to outgrow (weak PH/FMC).  
2. **Ops gravity > import statements** — OA LiteLLM does not cancel Traces/sandbox LIE.  
3. **`create_agent` is a funnel into LG lock-in**, not an escape hatch.  
4. **EG amplifies LIE** — hiring moats stabilize sticky stacks (LC).  
5. **Succession is lock-in** even under OSI licenses (SK→MS, Classic→v1).

---

## 9. Falsifiers

- Independent auditor using the 5-family rubric disagrees on top-5 or bottom-5 order.  
- Common production OA deploys with **zero** OpenAI-hosted ops and full feature parity → OA LIE overstated.  
- Majority ADK prod deploys non-GCP with full parity → AD LIE overstated.  
- Logfire required for PD durable APIs → PD LIE understated.

---

## Sources

- https://docs.langchain.com/oss/python/langgraph/persistence  
- https://docs.langchain.com/oss/python/releases/langchain-v1  
- https://docs.langchain.com/langsmith/observability  
- https://openai.github.io/openai-agents-python/tracing/  
- https://openai.github.io/openai-agents-python/models/  
- https://pydantic.dev/docs/ai/overview/  
- https://adk.dev/observability/traces/  
- https://docs.crewai.com/edge/en/observability/tracing  
- https://developers.llamaindex.ai/python/llamaagents/workflows/durable_workflows/  
- https://docs.haystack.deepset.ai/docs/tracing  
- https://ai-sdk.dev/  
- https://dspy.ai/  
- https://learn.microsoft.com/en-us/agent-framework/overview/  
- `benchmark/METHODOLOGY.md`  
- `benchmark/findings/lock_in_entropy.md`  
- `benchmark/findings/PROPRIETARY_FINDINGS.md`  
- `benchmark/clusters/multi-agent.md` (0–10 draft — normalized here)  
