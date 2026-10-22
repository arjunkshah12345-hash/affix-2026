# Failure-Mode Coverage (FMC) Matrix — AFFIX-2026

**Definition (METHODOLOGY):** % of common production failure modes with **first-class API support** (not "roll your own in a tool").  
**Legend:** `F` = first-class documented API · `P` = partial / via companion / middleware · `N` = DIY / absent  
**All cells EST** from dossiers + primary docs as of 2026-10-21.  
**FMC %** = dossier score (weighted toward durable/HITL/schema modes, not raw F count).

---

## Failure mode catalog (canonical 12)

| Code | Failure mode | Why it matters in production |
|------|--------------|------------------------------|
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

## FMC matrix

| ID | Framework | FMC% | TMO | PTF | SCH | COV | CSR | HIT | DUR | IDE | GRD | STR | TRC | SBOX |
|----|-----------|-----:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| LG | LangGraph | **90** | F | F | P | P | F | F | F | P | P | F | F | N |
| OA | OpenAI Agents SDK | **82** | F | F | F | P | P | F | F | P | F | F | F | F |
| AD | Google ADK | **80** | F | F | P | F | F | F | F | P | F | F | F | N |
| MS | Microsoft Agent Framework | **80** | F | F | F | P | F | F | F | P | F | F | F | N |
| PD | PydanticAI | **78** | F | F | F | P | P | F | F | P | F | F | F | N |
| LC | LangChain | **74** | F | P | P | F | P | F | F | N | F | F | F | N |
| MA | Mastra | **72** | F | F | F | P | P | F | F | P | F | F | F | N |
| LI | LlamaIndex | **72** | F | F | F | P | F | F | F | P | P | F | F | N |
| AG | AutoGen / AG2 | **72** | F | F | P | F | P | F | P | N | P | F | F | N |
| CR | CrewAI | **70** | F | P | P | P | N | F | F | N | F | F | F | P |
| SK | Semantic Kernel | **68** | F | P | F | P | P | P | P | N | F | F | P | N |
| HS | Haystack | **68** | F | F | F | P | P | F | N | N | F | F | F | N |
| SP | Spring AI | **62** | F | P | F | P | N | N | N | P | P | F | F | N |
| VS | Vercel AI SDK | **55** | F | P | F | N | N | P | P | N | P | F | P | N |
| SM | smolagents | **45** | P | P | N | N | N | N | N | N | N | P | N | F |
| DS | DSPy | **35** | P | N | F | N | N | N | N | N | N | N | P | N |

**Notes on P cells:**

- **LG SCH/COV:** Schema via LangChain types; summarization middleware more LC than core graph.
- **OA COV/CSR:** Sessions help; not LG-class fan-out reducers.
- **VS DUR/HIT:** Via Workflow DevKit / DurableAgent adjacency — not core `ai` alone ([AI SDK 6](https://vercel.com/blog/ai-sdk-6)).
- **HS DUR:** Strong pipelines; no LangGraph-class thread checkpointer ([Haystack HITL](https://docs.haystack.deepset.ai/docs/human-in-the-loop) is ConfirmationHook-centric).
- **LI DUR:** Context.to_dict + optional DBOS ([durable workflows](https://developers.llamaindex.ai/python/llamaagents/workflows/durable_workflows/)).
- **CR CSR:** Flows/checkpoints exist; concurrent state races less explicit than graph reducers.
- **SM:** Sandbox backends are the standout ([smolagents](https://huggingface.co/docs/smolagents/index)).

---

## Coverage clusters (proprietary)

### Cluster H — Hardening-first (FMC >= 78)

LG, OA, AD, MS, PD

**Shared pattern:** Explicit pause/resume + persistence + tracing.  
**Gap pattern:** SBOX mostly empty except OA.  
**Falsifier:** Remove durable resume from any H framework docs → must drop below 78.

### Cluster M — Mid (FMC 62–74)

LC, MA, LI, AG, CR, SK, HS, SP

**Shared pattern:** Good tool loops; uneven durability/concurrency.  
**Persona implication:** Fine for RAG/chat; risky as sole regulated runtime.

### Cluster L — Lab / thin (FMC <= 55)

VS, SM, DS

**Shared pattern:** Optimize for DX, code-act, or metrics — not incident APIs.  
**Rewrite link:** All three have RHS >= 32.9.

---

## Mode-specific winners

| Mode | Best-in-set | Evidence anchor |
|------|-------------|-----------------|
| HIT + DUR | **LG** | [interrupt + checkpointer](https://docs.langchain.com/oss/python/langgraph/interrupts) |
| GRD | **OA** | [guardrails](https://openai.github.io/openai-agents-python/guardrails/) |
| SCH | **PD / VS / SP** | Pydantic `output_type`; AI SDK Output.*; Spring `validateSchema` |
| CSR | **LG / LI / AD** | Send API / edit_state / graph parallelism |
| COV | **AD / AG / LC** | Compaction / knowledge / summarization middleware |
| SBOX | **OA / SM** | Sandbox agents; E2B/Docker/Modal |
| TRC | **LC/LG (LangSmith), AD (OTel), PD (Logfire)** | Portable vs UX trade |

---

## FMC vs RHS (meta finding)

High FMC correlates with lower RHS **except** when CTI is extreme (LG FMC 90 / RHS 28.7; AG FMC 72 / RHS 36). FMC alone is insufficient — RHS blends RACS + CTI + DX surplus.

**Falsifier:** Among frameworks with FMC >= 80, if RHS variance is explained only by FMC (R^2 > 0.8), drop other RHS terms.

---

## Re-audit checklist

For each `F` claim, require: (1) named API in official docs, (2) example of failure→recovery, (3) not solely "call a human tool".  
Disagreement >2 letter grades on >=3 modes → rescore FMC ±10.
