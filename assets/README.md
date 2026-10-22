# AFFIX-2026 visual assets

Publish-ready brand and marketing images for the AFFIX site.

## Palette

| Token        | Hex       | Use                          |
| ------------ | --------- | ---------------------------- |
| Background   | `#050505` | Canvas / OG / icons          |
| Foreground   | `#f5f0e8` | Wordmark, primary type       |
| Muted        | `#a89a86` | Subtitles, meta              |
| Accent       | `#f59e0b` | Gold — scores, rules         |
| Accent hot   | `#ff6b1a` | Warm orange — dither wash    |

Typography: **Syne** (display / wordmark), **IBM Plex Mono** (eyebrows, meta). Matches `site/src/app/layout.tsx` Next font loading.

## Brand files (`assets/brand/`)

| File                    | Size     | Role                                      |
| ----------------------- | -------- | ----------------------------------------- |
| `og.png`                | 1200×630 | Open Graph / Twitter large card           |
| `icon-512.png`          | 512×512  | App icon / PWA-style mark                 |
| `apple-touch-icon.png`  | 180×180  | iOS home-screen icon                      |
| `favicon.ico`           | 16/32/48 | Multi-size ICO                            |

Canonical copies served by Next live under `site/public/`:

- `site/public/og.png`
- `site/public/icon.png`
- `site/public/apple-touch-icon.png`
- `site/public/favicon.ico`

## Site screenshots (`assets/shots/` + `site/public/shots/`)

Captured from the live AFFIX site UI (hero dither wash, leaderboard, brief). Kept for marketing / social / video; do not delete from `site/public/shots/`.

| Shot            | Source path                         | Notes                          |
| --------------- | ----------------------------------- | ------------------------------ |
| `hero.png`      | `site/public/shots/hero.png`        | Full-bleed hero composition    |
| `rankings.png`  | `site/public/shots/rankings.png`    | Leaderboard table              |
| `brief.png`     | `site/public/shots/brief.png`       | Executive brief section        |
| `findings.png`  | `site/public/shots/findings.png`    | Findings (site only)           |
| `failures.png`  | `site/public/shots/failures.png`    | Failure modes (site only)      |
| `compare.png`   | `site/public/shots/compare.png`     | Head-to-head (site only)       |

`assets/shots/` holds the strongest three for reuse outside the Next app; the full set remains in `site/public/shots/`.

## Regeneration

Fonts used by the generator (not redistributed as product assets; regenerate from Fontsource if missing):

- `site/scripts/fonts/Syne-Bold.ttf`
- `site/scripts/fonts/Syne-SemiBold.ttf`
- `site/scripts/fonts/IBMPlexMono-Medium.ttf`

Source URLs (Fontsource CDN):

```bash
curl -fsSL -o site/scripts/fonts/Syne-Bold.ttf \
  "https://cdn.jsdelivr.net/fontsource/fonts/syne@latest/latin-700-normal.ttf"
curl -fsSL -o site/scripts/fonts/Syne-SemiBold.ttf \
  "https://cdn.jsdelivr.net/fontsource/fonts/syne@latest/latin-600-normal.ttf"
curl -fsSL -o site/scripts/fonts/IBMPlexMono-Medium.ttf \
  "https://cdn.jsdelivr.net/fontsource/fonts/ibm-plex-mono@latest/latin-500-normal.ttf"
```

Generate into `site/public/`:

```bash
cd site
npm run generate:assets
```

Implementation: `site/scripts/generate-assets.mjs` (`@napi-rs/canvas` + Bayer dither + `png-to-ico`).

After regenerating, sync brand copies here:

```bash
cp site/public/og.png assets/brand/og.png
cp site/public/icon.png assets/brand/icon-512.png
cp site/public/apple-touch-icon.png assets/brand/apple-touch-icon.png
cp site/public/favicon.ico assets/brand/favicon.ico
```

## Metadata wiring

`site/src/app/layout.tsx` references:

- `openGraph.images` → `/og.png`
- `twitter.card` → `summary_large_image`, `twitter.images` → `/og.png`
- `icons.icon` → `/favicon.ico`, `/icon.png`
- `icons.apple` → `/apple-touch-icon.png`
