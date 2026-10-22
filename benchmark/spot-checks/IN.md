# Spot-check: Inngest AgentKit / durable agents (IN)

**Scope:** Brief notes (not full Tier-A dossier depth).  
**Cluster:** Typed / DX-first adjunct.

## What it is

1. **AgentKit** (`@inngest/agent-kit`): TS agents, tools (incl. MCP), Networks with Routers and shared State ([agentkit.inngest.com](https://agentkit.inngest.com/), [Networks](https://agentkit.inngest.com/concepts/networks)).  
2. **Durable agents on Inngest**: model/tool calls as `step.run()` checkpoints; resume without replaying paid work; `waitForEvent` HITL; `step.invoke` sub-agents. Docs emphasize: write the loop in normal code—no graph to declare ([Durable Agents](https://www.inngest.com/docs/durable-execution/durable-agents)).

## Why it matters in this cluster

Complements VS/MA: AI SDK/Mastra own typed UX and agent DX; Inngest owns **production failure survival**. PydanticAI’s Temporal path is the Python analogue ([Temporal + Pydantic AI](https://temporal.io/blog/build-durable-ai-agents-pydantic-ai-and-temporal)).

## Light scores (EST)

| AF | CS | OB | TC | EG | RE | MF | PH | DX | FP | AFFIX≈ |
|----|----|----|----|----|----|----|----|----|----|--------|
| 75 | 92 | 85 | 70 | 65 | 78 | 72 | **95** | 78 | 70 | **78.8** |

Proprietary EST: LIE 40 · **CTI 26** · FMC 85 · GED 55 · RACS 60.

CTI ~**26** if already on Inngest (durable loop = normal code + steps); higher if adopting AgentKit Networks + platform together.

## Citations

- https://agentkit.inngest.com/
- https://agentkit.inngest.com/concepts/networks
- https://www.inngest.com/docs/durable-execution/durable-agents
- https://www.inngest.com/blog/ai-orchestration-with-agentkit-step-ai
- https://github.com/inngest/agent-kit
