# Contributing to AFFIX-2026

Thank you for interest in improving this study and its artifacts.

## Scope

- **Scores & dossiers** live under `benchmark/` (also linked as `research/`). Changes to scores should cite primary documentation and mark estimates as **EST**.
- **Site** lives under `site/` (Next.js). Prefer data updates in `site/src/data/` or the publish pack under `benchmark/publish/` over hard-coded copy.
- **Methodology** changes belong in `benchmark/METHODOLOGY.md` and `benchmark/publish/METHODOLOGY_FULL.md`, with a short note in `benchmark/publish/CHANGELOG.md`.

## Development

```bash
npm install --prefix site
npm run dev
```

Open the URL printed by Next.js (default `http://localhost:3000`).

## Pull requests

1. Keep diffs focused: one concern per PR (score correction, site fix, docs).
2. Do not commit `node_modules/`, `.next/`, `.env*`, or build artifacts.
3. For score changes, update both the matrix (`benchmark/scores/`) and any mirrored site data if applicable.
4. State uncertainty explicitly; do not invent APIs or version claims.

## Conduct

Be precise, cite sources, and assume good faith. This is an independent research artifact, not a vendor ranking contest.
