# AFFIX-2026 Dossier: DSPy (DS)

**Category:** Programmatic prompting / optimizable LM programs  
**Primary language:** Python  
**AFFIX composite:** **71.19** · RHS↓ **44.3** · PR↑ **49**  
**Evidence date:** 2026-10-22 (deepened for public publication)

| AF | CS | OB | TC | EG | RE | MF | PH | DX | FP |
|----|----|----|----|----|----|----|----|----|----|
| 78 | 55 | 60 | 85 | 82 | 70 | 88 | 55 | 72 | 75 |

| LIE↓ | CTI↓ | FMC↑ | GED↑ | RACS↑ | RHS↓ | PR↑ |
|------|------|------|------|-------|------|-----|
| 15.0 | 48.0 | 35.0 | 50.0 | 58.0 | 44.3 | 49 |

---

## One-liner

Programmatic LM programs and optimizers — compile, don't serve.

## Best for / When NOT to use

**Best for:** Compile-time prompt/metric optimization (GEPA/MIPRO)

**When NOT to use:** Do not serve DSPy as your production agent OS. Use it to optimize prompts/metrics, then serve via PD/OA/VS/LG.

---

## Version pins (as of 2026-10-22)

- **pypi:** dspy==3.4.1
- **notes:** GEPA optimizer path; not a serve OS

---

## API primitives (scoring anchors)

| Concern | Primary APIs / docs reality |
|---------|----------------------------|
| HITL / interrupt | Not a durable HITL runtime |
| Checkpointing / durability | None as serve OS |
| Streaming | Limited; not product UI streaming |
| Structured output | Signatures / typed predictors — strong compile-time contracts |
| Evals / tracing | Partial logging; not OTel-first agent traces |
| Multi-agent | Programs composing modules; not crew/graph OS |
| MCP | Weak / DIY — lowest PR in-set |

---

## Proprietary indices (EST)

| Index | Score | Direction |
|-------|------:|-----------|
| LIE | 15.0 | lower better |
| CTI | 48.0 | lower better |
| FMC | 35.0 | higher better |
| GED | 50.0 | higher better |
| RACS | 58.0 | higher better |
| RHS | 44.3 | lower better |
| PR | 49 | higher better |

---

## Deep notes

DSPy **inverts learning order**: lowest LIE (15), highest RHS (44.3). Signatures/ReAct/tools and GEPA/MIPRO optimizers excel at compile-time quality ([ReAct+tools](https://dspy.ai/current/getting-started/react-and-tools/), [GEPA](https://dspy.ai/current/getting-started/gepa-optimization/), [arxiv:2507.19457](https://arxiv.org/abs/2507.19457)). FMC=35 / PH=55 / PR=49 — do not serve as agent OS; compile then serve via PD/OA/VS/LG.

**Falsifier:** ≥50% of production DSPy users run DSPy as sole serve runtime at 12 months → RHS overstated.

## Citations (primary)

- https://dspy.ai/
- https://dspy.ai/current/getting-started/react-and-tools/
- https://dspy.ai/current/getting-started/gepa-optimization/
- https://dspy.ai/current/api/optimizers/GEPA/overview/
- https://arxiv.org/abs/2507.19457
- https://github.com/stanfordnlp/dspy
- https://pypi.org/project/dspy/

---

## Falsifier

If primary docs at the pin date lack the named primitives above for a dimension scored ≥80, that dimension must be rescored by ≥10 points.
