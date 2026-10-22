# Rewrite Hazard Score (RHS) — AFFIX-2026 Deep Dive

**Study:** AFFIX-2026 · **Index:** RHS (0–100, ↓ better)  
**As of:** 2026-10-21  
**Canonical formula + scores:** [`affix_matrix.json`](../scores/affix_matrix.json) · [`PROPRIETARY_FINDINGS.md`](../findings/PROPRIETARY_FINDINGS.md)  
**Machine-readable components:** [`rewrite_hazard.json`](./rewrite_hazard.json)  
**Continuum companion:** [`rag_agent_continuum.md`](./rag_agent_continuum.md)

---

## 1. Definition

**RHS** = EST probability (×100) that a team **outgrows** the framework within **12 months of production** — i.e. must replace **primary orchestration** (not merely swap models/providers) because of missing continuum, failure-mode gaps, DX/PH mismatch, or hardening debt.

\[
\mathrm{RHS} = \mathrm{clamp}_{0}^{100}\Big(
  0.28(100-\mathrm{RACS})
  + 0.22(100-\mathrm{FMC})
  + 0.18\,\mathrm{CTI}
  + 0.17\max(0,\mathrm{DX}-\mathrm{PH})
  + 0.15(100-\mathrm{PH})
\Big)
\]

| Term | Weight | What it captures | Rewrite mechanism |
|------|-------:|------------------|-------------------|
| \(100-\mathrm{RACS}\) | 0.28 | Continuum gaps | Stage climb forces new orchestrator |
| \(100-\mathrm{FMC}\) | 0.22 | Missing failure APIs | Incident-driven replacement |
| CTI | 0.18 | Concept load | Mid-flight abandon for “simpler” stack |
| \(\max(0,\mathrm{DX}-\mathrm{PH})\) | 0.17 | **DX surplus** | Ships fast, hardens late → production cliff |
| \(100-\mathrm{PH}\) | 0.15 | Hardening debt | Auth/timeouts/idempotency/durable gap |

**Falsifier:** Cohort N≥30 teams/framework; RHS rank vs “primary orchestration replaced ≤12 months” Spearman ρ > 0.4. If \(\mathrm{DX}-\mathrm{PH}\) coefficient non-significant (p>0.1), drop that term (PROPRIETARY #4).

**Bands (study convention):** ≤22 rewrite-safe · 23–30 elevated · ≥31 high hazard.

---

## 2. Worked examples (focus set)

Inputs from matrix. Components rounded to 2 decimals; RHS matches published matrix (±0.1).

### 2.1 PydanticAI (PD) — safest

| Input | Value |
|-------|------:|
| RACS / FMC / CTI | 80 / 78 / 30 |
| DX / PH | 88 / 90 |
| DX−PH | max(0,−2)=**0** |

| Component | Calc | Contribution |
|-----------|------|-------------:|
| Continuum gap | 0.28×(100−80) | **5.60** |
| FMC gap | 0.22×(100−78) | **4.84** |
| CTI | 0.18×30 | **5.40** |
| DX surplus | 0.17×0 | **0.00** |
| PH gap | 0.15×(100−90) | **1.50** |
| **RHS** | sum | **17.34 → 17.3** |

**Reading:** No DX cliff; durable engines + types keep FMC/PH high. Residual hazard is mostly “not a RAG OS” (continuum) and remaining CTI for Harness/Graph — not an orchestration death spiral.

### 2.2 Mastra (MA) — TS rewrite-safe

| Input | RACS 84 · FMC 72 · CTI 34 · DX 86 · PH 80 |

| Component | Contribution |
|-----------|-------------:|
| Continuum | 0.28×16 = **4.48** |
| FMC gap | 0.22×28 = **6.16** |
| CTI | 0.18×34 = **6.12** |
| DX surplus | 0.17×6 = **1.02** |
| PH gap | 0.15×20 = **3.00** |
| **RHS** | **20.78 → 20.8** |

**Reading:** Mild DX>PH; continuum strong for TS. Hazard is FMC/PH mid-tier vs LG/PD, not a stage cliff.

### 2.3 LlamaIndex (LI) — high RACS, mid RHS

| Input | RACS 92 · FMC 72 · CTI 70 · DX 78 · PH 78 |

| Component | Contribution |
|-----------|-------------:|
| Continuum | 0.28×8 = **2.24** ← best |
| FMC gap | **6.16** |
| CTI | 0.18×70 = **12.60** ← dominates |
| DX surplus | **0.00** |
| PH gap | **3.30** |
| **RHS** | **24.30** |

**Reading:** Continuum excellence **does not** minimize RHS when CTI is high (PROPRIETARY #6). Teams keep LI for RAG evolution but may still replace *orchestration* under hiring/ops pressure — or bolt LG/Temporal for S4.

### 2.4 Haystack (HS)

| Input | RACS 85 · FMC 68 · CTI 55 · DX 82 · PH 72 |

| Component | Contribution |
|-----------|-------------:|
| Continuum | **4.20** |
| FMC gap | **7.04** |
| CTI | **9.90** |
| DX surplus | 0.17×10 = **1.70** |
| PH gap | **4.20** |
| **RHS** | **27.04 → 27.0** |

**Reading:** Better LIE than LI, but FMC/PH (no multi-day checkpointer) and mild DX surplus lift RHS above LI despite similar AFFIX.

### 2.5 LangGraph (LG) — control max ≠ hazard min

| Input | RACS 62 · FMC 90 · CTI 82 · DX 65 · PH 93 |

| Component | Contribution |
|-----------|-------------:|
| Continuum | 0.28×38 = **10.64** |
| FMC gap | 0.22×10 = **2.20** ← excellent |
| CTI | 0.18×82 = **14.76** ← largest term |
| DX surplus | max(0,65−93)=**0** (DX *deficit*) |
| PH gap | **1.05** |
| **RHS** | **28.65 → 28.7** |

**Reading (PROPRIETARY #2):** Best CS/FMC/PH cannot cancel weak RAG continuum + brutal CTI. Teams abandon LG not because it fails production, but because *starting* on it burns quarters — or they never had a data layer (RACS).

### 2.6 CrewAI (CR) — DX surplus fires

| Input | RACS 70 · FMC 70 · CTI 39.6 · DX 92 · PH 76 |

| Component | Contribution |
|-----------|-------------:|
| Continuum | **8.40** |
| FMC gap | **6.60** |
| CTI | **7.13** |
| DX surplus | 0.17×16 = **2.72** |
| PH gap | **3.60** |
| **RHS** | **28.45 → 28.4** |

**Reading:** Classic DX-surplus pattern (PROPRIETARY #4): demos in days, AMP/HITL/idempotency catch up under load.

### 2.7 LangChain (LC) — gravity well

| Input | RACS 70 · FMC 74 · CTI 78 · DX 80 · PH 75 |

| Component | Contribution |
|-----------|-------------:|
| Continuum | **8.40** |
| FMC gap | **5.72** |
| CTI | **14.04** |
| DX surplus | 0.17×5 = **0.85** |
| PH gap | **3.75** |
| **RHS** | **32.76 → 32.8** |

**Reading:** CTI + continuum + funnel lock-in (LIE 72) put LC in the high-hazard band despite EG 95 / OB 90.

### 2.8 Vercel AI SDK (VS) — AFFIX leader, high RHS

| Input | RACS 65 · FMC 55 · CTI 22 · DX 94 · PH 68 |

| Component | Contribution |
|-----------|-------------:|
| Continuum | **9.80** |
| FMC gap | **9.90** |
| CTI | **3.96** ← low tax |
| DX surplus | 0.17×26 = **4.42** ← strongest surplus term in set |
| PH gap | **4.80** |
| **RHS** | **32.88 → 32.9** |

**Reading (PROPRIETARY #1):** Among AFFIX≥81, RHS does **not** fall with AFFIX. Low CTI masks a production cliff: FMC 55 + DX−PH 26.

---

## 3. Decomposition chart (focus set)

```text
RHS contributions (stacked mental model)

PD  ████ continuum  ███ fmc  ███ cti  · dxph  █ ph     = 17.3
MA  ███             ████     ███      █       ██       = 20.8
LI  █               ████     ███████  ·       ██       = 24.3
HS  ██              ████     █████    █       ██       = 27.0
CR  ████            ███      ███      ██      ██       = 28.4
LG  █████           █        ████████ ·       █        = 28.7
LC  ████            ███      ███████  █       ██       = 32.8
VS  █████           █████    ██       ███     ███      = 32.9
```

**Dominant driver by framework:**
- CTI-driven: LG, LC, LI  
- Continuum+FMC: VS, HS  
- DX surplus: VS, CR (and SM outside set)  
- Balanced low: PD, MA  

---

## 4. Five migration war-stories (API pain + citations)

These are **archetypal** migrations grounded in documented API constraints and study dossiers — not anonymous case IDs. Each states trigger → pain → destination → RHS lesson.

---

### War-story A — “We only use LangChain” → LangGraph authoring (funnel)

**Trigger:** Ship `create_agent` + LangSmith. Month 6: need fan-out research, mid-graph approval, crash-safe threads.

**API pain:**
1. `create_agent` is already a LangGraph-compiled harness — “avoiding LangGraph” was illusory ([stack blog](https://www.langchain.com/blog/deep-agents-vs-langchain-vs-langgraph), [LC v1](https://docs.langchain.com/oss/python/releases/langchain-v1)).  
2. Tool-only `HumanInTheLoopMiddleware` cannot express arbitrary `interrupt()` points ([HITL](https://docs.langchain.com/oss/python/langchain/human-in-the-loop) vs [LG interrupts](https://docs.langchain.com/oss/python/langgraph/interrupts)).  
3. Custom RAG state hits harness limits: `middleware` and custom `state_schema` mutually exclusive on some paths ([langchain#33217](https://github.com/langchain-ai/langchain/issues/33217)).  
4. Production durability means `PostgresSaver` / checkpoint schemas — migration off later ≈ rewrite ([Persistence](https://docs.langchain.com/oss/python/langgraph/persistence)).

**Destination:** Author StateGraph for hot paths; keep `create_agent` for simple tools — or accept full LG.  
**RHS lesson:** LC RHS 32.8 — CTI + funnel LIE; soft rewrite inside family still burns calendar. PROPRIETARY #13.

---

### War-story B — Next.js AI SDK chatbot → Mastra / Inngest (DX surplus cliff)

**Trigger:** `useChat` + `ToolLoopAgent` wins the demo (CTI 22). Month 4: multi-step approvals, semantic memory, jobs longer than a serverless invoke.

**API pain:**
1. Core `ai` package is an **application** toolkit, not a durable workflow OS ([AI SDK 6](https://vercel.com/blog/ai-sdk-6), VS dossier).  
2. `needsApproval` / `stopWhen` help tool gates; they are not thread checkpointers.  
3. Durable path is **adjacent**: Workflow DevKit `DurableAgent` or Inngest (spot **IN** PH≈95) — new control plane.  
4. RAG platform needs still unmet → second companion (LI/HS) if corpus becomes core.

**Destination:** **VS (UI stream contracts) + MA (workflows/memory/HITL)** or VS + Inngest (PROPRIETARY #14).  
**RHS lesson:** VS RHS 32.9 with DX−PH **+26** — strongest single-term surplus in the focus set. AFFIX 81.5 does not protect you.

---

### War-story C — AutoGen Classic GroupChat → AG2 v1 Network (succession rewrite)

**Trigger:** Research multi-agent POC on Classic GroupChat. Productization coincides with AG2 v1 protocol/Network stack.

**API pain:**
1. Classic → v1 is **non-drop-in** ([ag2ai/ag2](https://github.com/ag2ai/ag2), [ag2-classic](https://github.com/ag2ai/ag2-classic)); imports, chat orchestration, and mental model change.  
2. Highest GED (95) without low CTI/PH → research success, product rewrite (PROPRIETARY #15).  
3. Topology false friends: GroupChat ≠ OA `handoff` ≠ Crew hierarchical (PROPRIETARY #8).

**Destination:** Stay on AG2 only if conversation protocols are the product; else serve-path OA/PD/AD.  
**RHS lesson:** AG RHS 36.0 — already paid one forced rewrite in the wild; budget a second if Classic code remains.

---

### War-story D — Semantic Kernel agents → Microsoft Agent Framework (succession tax)

**Trigger:** Enterprise .NET/Python shop builds on SK agent orchestration (docs still mark experimental edges). Microsoft markets **Agent Framework** as successor.

**API pain:**
1. Official [migration guide from Semantic Kernel](https://learn.microsoft.com/en-us/agent-framework/migration-guide/from-semantic-kernel) implies human rewrite of orchestration surface.  
2. Greenfield scoring SK AFFIX 74.73 **underprices** risk; MS AFFIX 80.91 / RHS 19.4 is the correct greenfield reference (PROPRIETARY #5).  
3. Double migration if team also carries AutoGen-era patterns → MAF Magentic concepts.

**Destination:** Greenfield → Microsoft Agent Framework; brownfield → timeboxed SK→MAF with plugin continuity plan.  
**RHS lesson:** Succession/dual-stack lock is LIE bit-family E — license may be open; calendar is not.

---

### War-story E — LlamaIndex Workflows in prod → DBOS / LG hybrid (durable gap)

**Trigger:** Best RACS path: Documents → typed Workflows → HITL events. First SEV: worker OOM mid-step; “stateful” workflow was ephemeral.

**API pain:**
1. Docs explicit: workflows **ephemeral by default**; *“There is no built-in checkpointer to enable”* ([Durable workflows](https://developers.llamaindex.ai/python/llamaagents/workflows/durable_workflows/)).  
2. Production requires DIY `StepStateChanged` checkpoint loop (`expose_internal=True`) or **DBOS** plugin — new ops surface.  
3. Semantics at-least-once; in-flight steps rewind → side effects must be idempotent (FMC pressure).  
4. Arbitrary compliance pauses may still push hot paths to LG `interrupt()` + PostgresSaver.

**Destination:** LI retrieval + DBOS **or** LI retrievers inside LG nodes (common hybrid in [`langchain-rag`](../clusters/langchain-rag.md)).  
**RHS lesson:** LI RHS 24.3 is CTI-dominated, not continuum-dominated — but S4 still causes *partial* orchestration replacement if DIY durability is deferred.

---

## 5. Cross-story pattern table

| Story | From → To | Dominant RHS term | Avoidable? |
|-------|-----------|-------------------|------------|
| A | LC harness → LG graphs | CTI + continuum + LIE funnel | Partially — plan LG from month 1 if S3/S4 known |
| B | VS alone → MA/IN | DX surplus + FMC + continuum | Yes — compose OS by month 3 |
| C | AG Classic → AG2 v1 | CTI + succession | Only by not starting Classic |
| D | SK → MAF | Succession (outside formula; raises effective RHS) | Yes — greenfield MAF |
| E | LI ephemeral → DBOS/LG | PH/FMC at S4 (RACS still high) | Yes — read durable docs before prod |

---

## 6. Using RHS in selection

1. **Filter** RHS ≤ 28 for primary orchestrator when 12-month survival matters.  
2. **Exception:** Accept higher RHS for *layer* frameworks (VS UI, DS optimizer) **if** a low-RHS OS is already chosen.  
3. **Decompose before debating stars:** If CTI term > 12, training/hiring is the real risk; if DX surplus > 3, schedule hardening milestones.  
4. **RACS term > 10:** You will change stacks at a continuum boundary — pick LI/HS/MA/PD earlier.  
5. **Never use AFFIX alone** among scores ≥ 81 (VS vs PD/MA).

---

## 7. Full matrix RHS ranking (reference)

| Rank | ID | RHS ↓ | AFFIX | Band |
|-----:|----|------:|------:|------|
| 1 | PD | 17.3 | 87.64 | safe |
| 2 | MS | 19.4 | 80.91 | safe |
| 3 | MA | 20.8 | 82.49 | safe |
| 4 | SP | 23.0 | 78.23 | elevated |
| 5 | OA | 24.2 | 82.71 | elevated |
| 6 | LI | 24.3 | 78.61 | elevated |
| 7 | AD | 25.1 | 82.50 | elevated |
| 8 | HS | 27.0 | 78.60 | elevated |
| 9 | CR | 28.4 | 79.60 | elevated |
| 10 | LG | 28.7 | 81.64 | elevated |
| 11 | SK | 28.9 | 74.73 | elevated |
| 12 | LC | 32.8 | 76.82 | high |
| 13 | VS | 32.9 | 81.52 | high |
| 14 | AG | 36.0 | 76.51 | high |
| 15 | SM | 40.0 | 71.22 | high |
| 16 | DS | 44.3 | 71.19 | high |

---

## 8. Sources

- Formula: [`METHODOLOGY.md`](../METHODOLOGY.md), [`PROPRIETARY_FINDINGS.md`](../findings/PROPRIETARY_FINDINGS.md)  
- Components JSON: [`rewrite_hazard.json`](./rewrite_hazard.json)  
- Continuum: [`rag_agent_continuum.md`](./rag_agent_continuum.md)  
- Primary citations in war-stories A–E above  

*RHS and inputs are **EST** unless API facts are cited. RHS verified programmatically against the formula for the focus set.*
