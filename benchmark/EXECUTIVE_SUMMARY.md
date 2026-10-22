# AFFIX-2026 — Executive Summary

**Agent Framework Fitness Index eXtended** · 2026-10-22  
**Coverage:** 16 Tier-A frameworks + 2 spot-checks (Inngest AgentKit, LiteLLM)  
**Method:** Weighted composite (AFFIX) + proprietary indices (LIE, CTI, FMC, GED, RACS, RHS, PR)  
**Process:** Multi-agent research + primary-source adjudication; scores are **EST** from API/docs reality, not marketing.

## Headline rankings (AFFIX ↑)

| Rank | Framework | AFFIX | RHS↓ | One-line take |
|-----:|-----------|------:|-----:|---------------|
| 1 | **PydanticAI** | 87.6 | **17.3** | Best rewrite-safe typed Python agent stack |
| 2 | OpenAI Agents SDK | 82.7 | 24.2 | Strong runtime; ops lock-in (LIE **58**) |
| 3 | Google ADK | 82.5 | 25.1 | Protocol king (PR 96); cloud gravity |
| 4 | **Mastra** | 82.1 | **20.8** | Best TS agent OS / LangGraph-class alternative |
| 5 | LangGraph | 81.6 | 28.7 | Best control surface; high cognitive tax |
| 6 | Vercel AI SDK | 81.2 | **34.5** | Best product DX; sole-stack rewrite hazard |
| 7 | Microsoft Agent Framework | 80.9 | 19.4 | Greenfield Microsoft pick (not SK) |
| 8 | CrewAI | 79.6 | 28.4 | Role demos; harden before prod |
| 9 | Haystack | 78.6 | 27.0 | Lowest LIE in classic RAG cluster |
| 10 | LlamaIndex | 78.0 | 27.1 | Best RAG→agent continuum (RACS 92); DIY durable |
| … | LangChain / AG2 / SK / smolagents / DSPy | 71–77 | 29–44 | Specialized or succession/tax traps |

## Proprietary findings that matter

1. **AFFIX ≠ rewrite-safe** — VS ranks #6 on AFFIX but #14 on RHS (34.5); PD wins both.
2. **Lock-in is ops gravity** — OA LiteLLM is beta; Traces default OpenAI-shaped (LIE 58).
3. **DX surplus predicts cliffs** — When DX−PH ≥ 15 (VS, smolagents, CrewAI), plan a hardening companion by month 3.
4. **“Durable” ≠ checkpointer** — LlamaIndex docs: no built-in checkpointer; RACS ≠ PH.
5. **Protocol ≠ portable** — ADK PR 96 does not compress RHS like PD’s durable typed stack.
6. **Compose layers** — UI (VS) × orchestration (Mastra/LG/PD) × durability (Temporal/Inngest) beats seeking one framework.

## Persona defaults

| Persona | Primary | Avoid as sole stack |
|---------|---------|---------------------|
| Startup chat UI | Vercel AI SDK | LangGraph, AG2, DSPy |
| Enterprise RAG | LlamaIndex (or Haystack) | Pure CrewAI |
| Regulated HITL | LangGraph | VS / smolagents alone |
| Typed Python prod | PydanticAI | — |
| TS agent platform | Mastra (+ AI SDK) | LangChain JS as agent OS |
| Multi-agent research | AG2 / CrewAI / ADK | Ship research code as prod serve path |
| Microsoft estate | Agent Framework (not SK) | SK orchestration greenfield |
| Prompt optimization | DSPy (compile) + PD/VS (serve) | DSPy as runtime OS |

## Artifacts

- Interactive site: `site/` (dev `:3456`)
- Publish pack: `benchmark/publish/`
- Score matrix: `benchmark/scores/affix_matrix.{json,csv}`
- Primary-source audit: `benchmark/deep/PRIMARY_SOURCE_AUDIT.md`
- Findings: `benchmark/findings/`
- Deep dives: `benchmark/deep/`
- Per-framework dossiers: `benchmark/dossiers/`
- Methodology: `benchmark/publish/METHODOLOGY_FULL.md`
