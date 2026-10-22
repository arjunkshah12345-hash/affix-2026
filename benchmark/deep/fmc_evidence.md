# AFFIX-2026 — FMC Evidence: Five Surprising Gaps

**Study:** AFFIX-2026 · **As of:** 2026-10-22  
**Source matrix:** [`../publish/FAILURE_MODE_MATRIX.md`](../publish/FAILURE_MODE_MATRIX.md) · JSON: [`../publish/FAILURE_MODE_MATRIX.json`](../publish/FAILURE_MODE_MATRIX.json)  
**Legend:** `first_class` · `pattern` · `absent` · `unknown`

After deepening all 12 modes × 16 Tier-A frameworks against primary docs, five gaps stand out — not because a lab tool is incomplete, but because **production-shaped frameworks still leave money-moving failure modes to the caller**.

---

## 1. Idempotency (IDE) is an industry-wide vacuum

**Surprise:** Across 16 frameworks, **zero** ship a first-class “idempotency key / exactly-once tool” API. Coverage is `pattern` (8) or `absent` (8).

| Best documented *pattern* | What docs actually say |
|---------------------------|------------------------|
| LlamaIndex durable workflows | At-least-once execution; **require** idempotent side effects ([durable workflows](https://developers.llamaindex.ai/python/llamaagents/workflows/durable_workflows/)) |
| LangGraph persistence | Checkpointer writes are idempotent; **tool** exactly-once remains BYO ([persistence](https://docs.langchain.com/oss/python/langgraph/persistence)) |
| PydanticAI / MS / AD / MA | Durable engines retry steps — authors must design idempotent tools |

**Why it matters:** Crash recovery (DUR) without IDE turns “resume after death” into double charges and double writes. Teams adopt Temporal/DBOS/LangGraph checkpointers and still invent ledger keys in application code.

**Falsifier:** A Tier-A framework ships a documented `idempotency_key` (or equivalent) on tool invocation with replay-safe semantics → rescore IDE to `first_class` and lift FMC for that row.

---

## 2. Haystack: first-class HITL, absent durable checkpoint

**Surprise:** Haystack scores `first_class` on HIT via `ConfirmationHook` ([human-in-the-loop](https://docs.haystack.deepset.ai/docs/human-in-the-loop)) but **`absent` on DUR**.

Most HITL APIs in the set are paired with persistence (LG `interrupt`+checkpointer, OA `RunState`, MS workflow persistence, CrewAI `CheckpointConfig`). Haystack can pause for tool confirm/reject/modify **without** a LangGraph-class thread checkpointer that survives process death for multi-day approvals.

**Why it matters:** Pipeline/RAG teams get a “we have HITL” checkbox, then discover overnight approvals evaporate on pod restart. FMC 68 hides a HIT/DUR asymmetry unique among mid-cluster frameworks.

**Falsifier:** Official docs for a durable agent/thread checkpointer with ConfirmationHook resume → DUR becomes `first_class` or `pattern`.

---

## 3. Spring AI: enterprise PH without graph-native HIT / DUR / CSR

**Surprise:** Spring AI is JVM-enterprise strong (SCH via `BeanOutputConverter`/`validateSchema`, TRC via Micrometer) yet **`absent` on HIT, DUR, and CSR**.

| Mode | Coverage | Reality |
|------|----------|---------|
| SCH | `first_class` | [Structured output](https://docs.spring.io/spring-ai/reference/api/structured-output.html) |
| TRC | `first_class` | Micrometer / Actuator |
| HIT | `absent` | App-level approval recipes only |
| DUR | `absent` | Spring beans ≠ agent-thread checkpoints |
| CSR | `absent` | No fan-out reducers |

**Why it matters:** Production Hardening scores can look healthy from Spring Security + observability while **agent incident APIs** (pause/resume, crash recovery, concurrent state) remain invented in the app layer. Embabel/blog “HITL recipes” are patterns, not first-class Agent Framework surfaces.

---

## 4. Vercel AI SDK: DX champion; durable retries live next door

**Surprise:** `ToolLoopAgent` is the paved road for streaming UX (`streamText`, `toolApproval`, excellent SCH via `Output.*`), but **DUR and production HIT are `pattern` via `@ai-sdk/workflow` `WorkflowAgent`** ([WorkflowAgent](https://ai-sdk.dev/docs/agents/workflow-agent)), not core `ai`.

Also `absent`: COV, CSR, IDE, SBOX. FMC **55** is not a docs quality problem — it is an architecture bet that durability is a companion runtime.

**Why it matters:** Teams ship Next.js agents that look production-ready, then discover approvals and steps vanish on serverless cold kill unless they adopt Workflow SDK / Inngest / Temporal. Contrast Mastra (same TS ecosystem) where workflow suspend/resume is first-class in-product.

---

## 5. Hardening-first cluster still mostly skips code sandboxes

**Surprise:** Among Cluster H (LG, OA, AD, MS, PD — FMC ≥78), only **OpenAI Agents SDK** rates SBOX `first_class`. LangGraph (FMC 90) is **`absent`**. PydanticAI sandboxes sit in Harness (`pattern`). Google ADK / Microsoft Agent Framework: deploy containers ≠ code-act isolation APIs.

Meanwhile **smolagents** (FMC 45) is the inverse: SBOX `first_class` ([secure code execution](https://huggingface.co/docs/smolagents/en/tutorials/secure_code_execution)) with HIT/DUR/IDE/GRD/TRC mostly `absent`.

**Why it matters:** “Production hardened” in 2026 usually means pause/resume + traces, **not** RCE isolation for code-act tools. Orgs that need both pick OA, or glue SM/E2B beside LG/PD — a composition tax the FMC headline understates.

---

## Honorable mentions (not in top 5)

- **CrewAI CSR `absent`:** Checkpoints and HITL exist; concurrent state races remain under-specified vs LG `Send`+reducers.
- **DSPy:** SCH `first_class` (Signatures) with nearly empty serve-path incident surface — optimizer ≠ runtime OS.
- **Semantic Kernel:** HIT/DUR/`TRC` portability stuck at `pattern` while Microsoft Agent Framework is the documented succession path.

---

## Evidence rules used

1. Prefer named API in official docs (2025–2026).  
2. Companion / middleware / “use Temporal” → `pattern`, not `first_class`.  
3. No docs → `absent` (not guessed `unknown` unless URL was unreachable).  
4. Full cell citations live in the publish matrix tables.
