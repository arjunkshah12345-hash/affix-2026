# Spot-check: LiteLLM gateway (LW)

**Scope:** EG / RE / MF / FP only (gateway context, not agent framework).  
**Cluster:** Typed / DX-first adjunct.

## What it is

Self-hosted OpenAI-compatible AI gateway: 100+ LLM providers, MCP tools, and A2A agents behind one control plane. Virtual keys, budgets, rate limits, spend tracking, load balancing, fallbacks, retries, guardrails, logging sinks (Langfuse, Datadog, OTel, Prometheus), Admin UI ([docs](https://docs.litellm.ai/docs/simple_proxy), [litellm.ai](https://www.litellm.ai/)).

Clients that speak OpenAI API can use the gateway without changing client code beyond `base_url` / key.

## Light scores

| EG | RE | MF | FP |
|----|----|----|----|
| 90 | 88 | 92 | 86 |

- **EG:** Ubiquitous in platform teams; large GitHub/community gravity.  
- **RE:** Routing/caching/load-balancing/fallbacks improve reliability economics.  
- **MF:** Maximizes model portability for *every* framework in this study.  
- **FP:** MCP + A2A at gateway layer aligns with 2026 protocol direction.

## Note

Does not reduce Cognitive Tax of agent frameworks; reduces **provider** tax. Pin versions for gateway security hygiene.

## Citations

- https://docs.litellm.ai/docs/simple_proxy
- https://www.litellm.ai/
- https://github.com/BerriAI/litellm
