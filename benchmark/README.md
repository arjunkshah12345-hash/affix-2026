# AFFIX-2026 research corpus

This directory is the research root for the study. The repository also exposes it as [`../research`](../research) via symlink (`research` → `benchmark`) so either path may be used. Files were **not** mass-moved; the interactive site reads mirrored data under `site/src/data/` and `site/public/`.

## Contents

| Path | Purpose |
| ---- | ------- |
| [`dossiers/`](dossiers/) | Per-framework score dossiers (JSON + markdown) |
| [`scores/`](scores/) | Canonical AFFIX matrix (`affix_matrix.{csv,json}`) |
| [`publish/`](publish/) | Release pack: full methodology, failure-mode matrix, citations, site content JSON |
| [`findings/`](findings/) | Proprietary findings memos and persona playbooks |
| [`deep/`](deep/) | Deep dives and primary-source audit |
| [`clusters/`](clusters/) | Framework cluster analyses |
| [`spot-checks/`](spot-checks/) | Non–Tier-A spot checks |
| [`report/`](report/) | Generated report artifacts |
| [`METHODOLOGY.md`](METHODOLOGY.md) | Scoring model and evidence rules |
| [`EXECUTIVE_SUMMARY.md`](EXECUTIVE_SUMMARY.md) | Headline rankings and persona defaults |

## Score convention

All composite and index values are **EST** unless a cell is explicitly measured. Prefer primary docs and APIs over marketing language; see [`publish/METHODOLOGY_FULL.md`](publish/METHODOLOGY_FULL.md).

## Related paths

- Compact dossier mirrors at repository root: [`../dossiers/`](../dossiers/)
- Interactive site: [`../site/`](../site/)
