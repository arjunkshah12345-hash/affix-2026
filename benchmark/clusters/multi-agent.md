# Cluster: Multi-Agent / Agent Runtime Frameworks

**Study:** AFFIX-2026 · **Date:** 2026-10-21 · **Method:** AFFIX + LIE/CTI/FMC/GED/RACS  
**Primary sources reviewed:** official docs + GitHub READMEs (AG2, CrewAI, OpenAI Agents SDK, Semantic Kernel / MAF, Google ADK, Hugging Face smolagents), 2025–2026.

Scope: AutoGen/AG2 (**AG**), CrewAI (**CR**), OpenAI Agents SDK (**OA**), Semantic Kernel (**SK**), Google ADK (**AD**), Hugging Face smolagents (**SM**).

All numeric scores are **EST** from primary docs/GitHub (not wall-clock microbenchmarks). Marketing claims (e.g. “70% faster”) are treated as non-evidence.

---

## Score table (AFFIX composite)

| Rank | ID | Framework | AFFIX | AF | CS | OB | TC | EG | RE | MF | PH | DX | FP |
|-----:|----|-----------|------:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| 1 | OA | OpenAI Agents SDK | **83.46** | 87 | 91 | 89 | 86 | 83 | 85 | 47 | 89 | 91 | 71 |
| 2 | AD | Google ADK | **82.76** | 90 | 88 | 90 | 76 | 81 | 82 | 52 | 88 | 80 | 93 |
| 3 | CR | CrewAI | **79.79** | 84 | 81 | 78 | 78 | 90 | 72 | 65 | 76 | 92 | 76 |
| 4 | AG | AutoGen / AG2 | **76.77** | 88 | 85 | 82 | 72 | 78 | 70 | 55 | 74 | 68 | 86 |
| 5 | SK | Microsoft Semantic Kernel | **74.44** | 80 | 74 | 72 | 88 | 85 | 70 | 48 | 80 | 62 | 78 |
| 6 | SM | Hugging Face smolagents | **71.68** | 78 | 55 | 52 | 60 | 76 | 80 | 86 | 68 | 95 | 81 |

Weights: AF 0.14 · CS 0.13 · OB 0.11 · TC 0.10 · EG 0.10 · RE 0.09 · MF 0.08 · PH 0.10 · DX 0.09 · FP 0.06.

---

## Proprietary indices

| ID | LIE ↓ | CTI ↓ | FMC ↑ | GED ↑ | RACS ↑ |
|----|------:|------:|------:|------:|-------:|
| OA | 5.6 | 14 | 84 | 5.5 | 55 |
| AD | 4.5 | 28 | 81 | 9.0 | 72 |
| CR | 3.8 | 18 | 71 | 6.5 | 70 |
| AG | 4.2 | 38 | 74 | 9.5 | 62 |
| SK | 4.9 | 32 | 68 | 8.0 | 78 |
| SM | 1.8 | 10 | 46 | 3.5 | 48 |

---

## Head-to-head capability matrix

| Capability | AG | CR | OA | SK | AD | SM |
|------------|----|----|----|----|----|-----|
| Free-form multi-agent chat | ★★★★★ | ★★☆ | ★★★ | ★★★★ | ★★★ | ★☆ |
| Hierarchical manager/workers | ★★★★ | ★★★★★ | ★★★★ | ★★★★ | ★★★★★ | ★★★ |
| Swarm / peer handoffs | ★★★★ | ★★ | ★★★★★ | ★★★★ | ★★★ | ★☆ |
| Deterministic workflow graphs | ★★★★ | ★★★★ | ★★ | ★★★ | ★★★★★ | ★ |
| First-class handoff API | ★★★ | ★★ | ★★★★★ | ★★★★ | ★★★ | ★★ |
| Shared memory product | ★★★★ | ★★★★★ | ★★★★ | ★★★★ | ★★★★★ | ★★ |
| Tool / MCP registry | ★★★★ | ★★★★★ | ★★★★★ | ★★★★★ | ★★★★★ | ★★★★ |
| Human-in-the-loop | ★★★★★ | ★★★★★ | ★★★★★ | ★★★ | ★★★★★ | ★★ |
| Observability / tracing | ★★★★★ | ★★★★ | ★★★★★ | ★★★ | ★★★★★ | ★★ |
| Model portability | ★★★★★ | ★★★★ | ★★☆ | ★★★★ | ★★★★ | ★★★★★ |
| Code-act sandboxing | ★★ | ★★★ | ★★★★★ | ★☆ | ★★ | ★★★★★ |
| Production deploy story | ★★★ | ★★★★ | ★★★★ | ★★★★★ | ★★★★★ | ★★ |
| Time-to-first-agent (DX) | ★★★ | ★★★★★ | ★★★★★ | ★★ | ★★★★ | ★★★★★ |

★ ratings are qualitative **EST** relative within this six-framework cluster.

---

## Narrative comparison

### CrewAI simplicity vs AutoGen power

| | CrewAI | AG2 / AutoGen |
|--|--------|---------------|
| Mental model | Agent / Task / Crew / Process (+ Flow) | Agent + Network Hub / channels / WAL (or Classic GroupChat) |
| Hierarchy | First-class `Process.hierarchical` | Nested chats / workflow `TransitionGraph` |
| Free-form chat | Weak | Strongest (conversation/discussion + Classic GroupChat) |
| CTI | ~18 | ~38 |
| Pick when | Role teams, AMP ops, shipping demos | Debate/consensus protocols, channel governance |

Evidence: [CrewAI hierarchical](https://docs.crewai.com/edge/en/learn/hierarchical-process), [AG2 Network](https://docs.ag2.ai/docs/user-guide/network/overview/), [ag2ai/ag2](https://github.com/ag2ai/ag2) (Classic ≠ v1 drop-in).

### OpenAI Agents SDK official path

- Swarm successor with fewest serious primitives: Agents, tools, handoffs, guardrails, Runner ([home](https://openai.github.io/openai-agents-python/)).
- Wins CS / PH / DX for OpenAI-standardized orgs; **loses MF** — LIE highest because Responses + Traces + Sandbox + Realtime pull to OpenAI.
- Handoffs are `transfer_to_*` tools with history filters; tool guardrails do **not** apply to handoff calls ([handoffs](https://openai.github.io/openai-agents-python/handoffs/), [guardrails](https://openai.github.io/openai-agents-python/guardrails/)).
- Non-OpenAI via AnyLLM/LiteLLM is documented but secondary; tracing often still wants an OpenAI export key ([tracing](https://openai.github.io/openai-agents-python/tracing/)).

### Semantic Kernel enterprise

- Five orchestration patterns (Concurrent / Sequential / Handoff / GroupChat / Magentic) — still labeled **experimental** in SK docs ([orchestration](https://learn.microsoft.com/en-us/semantic-kernel/frameworks/agent/agent-orchestration/)).
- Microsoft markets **Agent Framework (MAF) 1.0** as successor ([overview](https://learn.microsoft.com/en-us/agent-framework/overview/), [repo](https://github.com/microsoft/agent-framework), [migration](https://learn.microsoft.com/en-us/agent-framework/migration-guide/from-semantic-kernel)).
- Best **RACS** in cluster (plugins/vector → agents → multi-agent). Unique succession tax among the six.

### Google ADK

- Graphs + collaborative/template workflows + deterministic `RequestInput` HITL + OTel/Cloud Trace + A2A ([workflows](https://adk.dev/workflows/), [HITL](https://adk.dev/graphs/human-input/), [A2A](https://adk.dev/a2a/), [traces](https://adk.dev/observability/traces/)).
- Near-ties OA at top of AFFIX via graph determinism + FP, not via OpenAI handoff ergonomics.
- GCP Agent Runtime / Cloud Run / GKE is the ops gravity well; LiteLLM is the documented model escape hatch.

### smolagents

- Wins DX + LIE + code-act sandbox (`executor_type="e2b"`, Docker/Modal/Blaxel) ([secure code](https://huggingface.co/docs/smolagents/tutorials/secure_code_execution)).
- Multi-agent = thin `managed_agents` hierarchy ([example](https://huggingface.co/docs/smolagents/examples/multiagents)) — specialist, not control-plane peer.

---

## Topology cheat-sheet (API reality)

| Pattern | Best fit | Primary API surface |
|---------|----------|---------------------|
| Free-form debate / consensus | **AG** | Classic `GroupChat` or v1 `discussion` / `conversation` channels |
| Role crew + manager | **CR** | `Process.hierarchical` + manager agent |
| Peer specialist handoffs | **OA** | `handoff()` → `transfer_to_*` |
| Planner-manager (Magentic) | **SK** / MAF | Magentic / GroupChat orchestration |
| Deterministic graph + HITL node | **AD** | Workflow graph + `RequestInput` |
| Code-act hierarchy | **SM** | `CodeAgent` + `managed_agents` + sandbox executor |

---

## 7 proprietary insights

1. **Lock-in is not where the README claims.** OA and AD advertise model adapters; measured LIE is dominated by *ops gravity* (OpenAI Traces/Sandbox/Realtime; GCP Agent Runtime) not by `pip` install lines. CR’s hidden bits are default OpenAI embeddings for memory + AMP tracing consent. AG’s irreversible bit is Classic↔v1 dual stack, not OpenAI.

2. **Handoff ≠ GroupChat ≠ manager delegation.** OA’s `transfer_to_*` is control-transfer with history filters; AG2’s conversation/discussion channels are concurrent dialogue protocols; Crew hierarchical is manager task assignment; SK Magentic sits between planner-manager and group chat. Teams that conflate these under-specify isolation and cost bounds.

3. **HITL quality splits three ways.** Deterministic graph pauses (ADK `RequestInput`, Crew Flow `@human_feedback`) beat prompt-only “ask the user” for compliance. AG2’s tool-scoped `context.input` is the most elegant *in-tool* pause. OA’s approval/`RunState` resume is the most productionized interrupt pipeline. SM is mostly BYO.

4. **Code-act security is bipolar.** Only OA (sandbox agents) and SM (E2B/Docker/Modal/Blaxel) treat execution isolation as a first-class product surface. AG/CR/SK/AD largely push risk to tool authors — a silent PH gap when demos add “run code” tools.

5. **Succession tax is real on Microsoft’s side.** SK multi-agent investment now carries MAF migration entropy — unique among this six (AG already paid Classic→v1). Greenfield Microsoft shops should score MAF first, not SK orchestration experimental APIs, unless plugin/.NET continuity forces SK.

6. **Observability converges on OTel GenAI — escape hatches differ.** AG2 `TelemetryMiddleware` and ADK traces are the portable paths. CR/OA win day-1 UX via AMP/OpenAI Traces UIs but that UX *is* the lock-in. ZDR orgs cannot use OA default tracing at all (documented).

7. **GED vs DX is the strategic trade.** AG (~9.5) and AD (~9.0) maximize topology density; CR/OA/SM maximize shipping speed. Enterprises that need both are stitching ADK/SK graphs *around* Crew/OA specialists — not picking a single winner. AFFIX composites cluster OA≈AD > CR > AG > SK > SM for this production-weighted model; swap weights toward GED/RACS and AG/SK rise.

---

## Evidence index

| ID | Primary docs / repos |
|----|----------------------|
| AG | https://github.com/ag2ai/ag2 · https://docs.ag2.ai/ · https://docs.ag2.ai/docs/user-guide/network/overview/ · https://docs.ag2.ai/docs/user-guide/telemetry/ · https://arxiv.org/abs/2308.08155 |
| CR | https://docs.crewai.com/ · https://docs.crewai.com/edge/en/learn/hierarchical-process · https://docs.crewai.com/edge/en/observability/tracing · https://github.com/crewAIInc/crewAI |
| OA | https://openai.github.io/openai-agents-python/ · https://openai.github.io/openai-agents-python/handoffs/ · https://openai.github.io/openai-agents-python/tracing/ · https://openai.github.io/openai-agents-python/guardrails/ · https://github.com/openai/openai-agents-python |
| SK | https://learn.microsoft.com/en-us/semantic-kernel/frameworks/agent/agent-orchestration/ · https://learn.microsoft.com/en-us/agent-framework/overview/ · https://github.com/microsoft/semantic-kernel · https://github.com/microsoft/agent-framework |
| AD | https://adk.dev/ · https://adk.dev/workflows/ · https://adk.dev/graphs/human-input/ · https://adk.dev/a2a/ · https://adk.dev/observability/traces/ · https://github.com/google/adk-python |
| SM | https://huggingface.co/docs/smolagents/index · https://huggingface.co/docs/smolagents/tutorials/secure_code_execution · https://huggingface.co/docs/smolagents/examples/multiagents · https://github.com/huggingface/smolagents |

---

## Dossier paths

- [AG.md](../dossiers/AG.md) / [AG.json](../dossiers/AG.json)
- [CR.md](../dossiers/CR.md) / [CR.json](../dossiers/CR.json)
- [OA.md](../dossiers/OA.md) / [OA.json](../dossiers/OA.json)
- [SK.md](../dossiers/SK.md) / [SK.json](../dossiers/SK.json)
- [AD.md](../dossiers/AD.md) / [AD.json](../dossiers/AD.json)
- [SM.md](../dossiers/SM.md) / [SM.json](../dossiers/SM.json)

Companion machine-readable: [multi-agent.json](./multi-agent.json) · [score_matrix_multi_agent.csv](../score_matrix_multi_agent.csv)
