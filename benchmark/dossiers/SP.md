# AFFIX-2026 Dossier: Spring AI (SP)

**Category:** JVM enterprise AI (Spring ecosystem)  
**Primary language:** Java  
**AFFIX composite:** **78.23** · RHS↓ **23.0** · PR↑ **88**  
**Evidence date:** 2026-10-22 (deepened for public publication)

| AF | CS | OB | TC | EG | RE | MF | PH | DX | FP |
|----|----|----|----|----|----|----|----|----|----|
| 80 | 70 | 85 | 88 | 75 | 72 | 70 | 88 | 70 | 85 |

| LIE↓ | CTI↓ | FMC↑ | GED↑ | RACS↑ | RHS↓ | PR↑ |
|------|------|------|------|-------|------|-----|
| 42.0 | 28.0 | 62.0 | 45.0 | 72.0 | 23.0 | 88 |

---

## One-liner

Spring-native AI: ChatClient, Advisors, Micrometer, MCP starters.

## Best for / When NOT to use

**Best for:** JVM/Spring Boot estates needing ChatClient+MCP

**When NOT to use:** Do not recommend Spring AI to Next.js/Python shops — CTI explodes without Spring Boot DNA. Not a durable graph agent runtime.

---

## Version pins (as of 2026-10-22)

- **maven:** spring-ai-bom 2.1.0-M1
- **notes:** Milestone BOM as of pin; confirm GA before prod pin

---

## API primitives (scoring anchors)

| Concern | Primary APIs / docs reality |
|---------|----------------------------|
| HITL / interrupt | No first-class mid-graph interrupt; app-level approval patterns |
| Checkpointing / durability | Spring-managed state; not agent-thread checkpointers |
| Streaming | ChatClient streaming; reactive options |
| Structured output | BeanOutputConverter / validateSchema structured output |
| Evals / tracing | Micrometer observations; Actuator |
| Multi-agent | Advisors + tools; limited native multi-agent graph DSL |
| MCP | spring-ai-mcp starters (client + server) |

---

## Proprietary indices (EST)

| Index | Score | Direction |
|-------|------:|-----------|
| LIE | 42.0 | lower better |
| CTI | 28.0 | lower better |
| FMC | 62.0 | higher better |
| GED | 45.0 | higher better |
| RACS | 72.0 | higher better |
| RHS | 23.0 | lower better |
| PR | 88 | higher better |

---

## Deep notes

Spring AI is **estate-conditional**: ChatClient, Advisors, structured output validation, Micrometer, MCP starters ([MCP](https://docs.spring.io/spring-ai/reference/api/mcp/mcp-overview.html), [structured output](https://docs.spring.io/spring-ai/reference/api/structured-output.html)). CTI=28 assumes Spring Boot fluency; Next.js engineers see CTI≈45–55 EST. HIT/DUR/CSR not graph-native → FMC 62.

**BOM pin:** `spring-ai-bom` **2.1.0-M1** (milestone — confirm GA before production pin).

**Falsifier:** Blind non-JVM CTI survey matching VS hours → revise CTI claim.

## Citations (primary)

- https://spring.io/projects/spring-ai
- https://docs.spring.io/spring-ai/reference/api/chatclient.html
- https://docs.spring.io/spring-ai/reference/api/structured-output.html
- https://docs.spring.io/spring-ai/reference/api/structured-output/validation.html
- https://docs.spring.io/spring-ai/reference/api/mcp/mcp-overview.html
- https://docs.spring.io/spring-ai/reference/

---

## Falsifier

If primary docs at the pin date lack the named primitives above for a dimension scored ≥80, that dimension must be rescored by ≥10 points.
