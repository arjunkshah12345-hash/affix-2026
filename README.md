# AFFIX-2026

**Agent Framework Fitness Index eXtended** (study date 2026-10-22)

**Live report:** [https://affix-2026.vercel.app](https://affix-2026.vercel.app)  
**Repository:** [github.com/arjunkshah12345-hash/affix-2026](https://github.com/arjunkshah12345-hash/affix-2026)

AFFIX-2026 is an independent comparative evaluation of production-relevant LLM and agent application frameworks. Sixteen Tier-A frameworks were scored on a weighted ten-dimension composite (**AFFIX**) and seven proprietary indices—including Lock-in Entropy (LIE), Failure-Mode Coverage (FMC), and Rewrite Hazard Score (**RHS**)—using multi-agent research adjudicated against primary documentation and API surface, not marketing copy. The study separates fitness for shipping today from the estimated probability of outgrowing primary orchestration within twelve months of production use.

> **Score status:** All AFFIX and index values are **EST** (estimates) derived from primary docs, release notes, and observed APIs as of the study date. They are not runtime microbenchmarks.

## Principal results (top 5 by AFFIX)

| Rank | Framework              | AFFIX ↑ | RHS ↓ |
| ---: | ---------------------- | ------: | ----: |
| 1    | PydanticAI             |    87.6 |  17.3 |
| 2    | OpenAI Agents SDK      |    82.7 |  24.2 |
| 3    | Google ADK             |    82.5 |  25.1 |
| 4    | Mastra                 |    82.1 |  20.8 |
| 5    | LangGraph              |    81.6 |  28.7 |

RHS is lower-is-better (rewrite hazard). Full matrix: [`benchmark/scores/affix_matrix.csv`](benchmark/scores/affix_matrix.csv). Narrative summary: [`benchmark/EXECUTIVE_SUMMARY.md`](benchmark/EXECUTIVE_SUMMARY.md).

## Repository layout

| Path | Contents |
| ---- | -------- |
| [`site/`](site/) | Next.js interactive report (charts, personas, failure-mode matrix) |
| [`benchmark/`](benchmark/) | Research corpus: dossiers, scores, findings, deep dives, publish pack |
| [`research/`](research/) | Symlink to `benchmark/` (stable “research” entrypoint) |
| [`video/`](video/) | Remotion study film (`AffixLaunch`, 22.4s) — published copy in `site/public/video/` |
| [`assets/`](assets/) | Brand kit (OG, icons) and selected screenshots |
| [`dossiers/`](dossiers/) | Compact per-framework JSON/MD mirrors |

## Quick start (site)

Requires Node.js 20+.

```bash
cd site
npm install
npm run dev
```

Or from the repository root:

```bash
npm run dev
```

Open the URL printed by Next.js (default [http://localhost:3000](http://localhost:3000)).

```bash
npm run build   # production build of site/
npm run video   # Remotion studio (requires video/ package)
```

## Methodology & downloads

| Resource | Location |
| -------- | -------- |
| Methodology (short) | [`benchmark/METHODOLOGY.md`](benchmark/METHODOLOGY.md) |
| Methodology (full) | [`benchmark/publish/METHODOLOGY_FULL.md`](benchmark/publish/METHODOLOGY_FULL.md) |
| Score matrix (CSV / JSON) | [`benchmark/scores/`](benchmark/scores/) |
| Failure-mode matrix | [`benchmark/publish/FAILURE_MODE_MATRIX.md`](benchmark/publish/FAILURE_MODE_MATRIX.md) |
| Citations | [`benchmark/publish/CITATIONS.md`](benchmark/publish/CITATIONS.md) |
| Primary-source audit | [`benchmark/deep/PRIMARY_SOURCE_AUDIT.md`](benchmark/deep/PRIMARY_SOURCE_AUDIT.md) |
| Site-mirrored downloads | [`site/public/`](site/public/) (`affix-2026.json`, `methodology.md`, …) |
| Publish pack | [`benchmark/publish/`](benchmark/publish/) |

## Citation

```bibtex
@misc{affix2026,
  author       = {Shah, Arjun},
  title        = {{AFFIX-2026}: Agent Framework Fitness Index eXtended},
  year         = {2026},
  month        = {10},
  note         = {Independent comparative evaluation of LLM/agent application frameworks.
                  Scores are EST from primary documentation.},
  howpublished = {\url{https://github.com/}}
}
```

Also see [`CITATION.cff`](CITATION.cff) for machine-readable citation metadata.

## License

MIT — see [`LICENSE`](LICENSE). Contributions welcome under [`CONTRIBUTING.md`](CONTRIBUTING.md).
