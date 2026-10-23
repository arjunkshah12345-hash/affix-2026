# VibeUI — agent install guide

## Peers
```bash
npm i clsx tailwind-merge class-variance-authority @phosphor-icons/react
```

## Tokens
Import `vibeui.tokens.css` (or paste `templates/vibeui.css`) into your global CSS **after** `@import "tailwindcss";`. It carries colors, radii, shadows, easing, keyframes and the `dark` variant the components rely on. Toggle dark with `.dark` on `<html>`.

## Utils
Write `src/lib/utils.ts` with cn() from clsx + tailwind-merge. Path alias: `@/*` → `./src/*`.

## Add component (CLI)
```bash
npx @agents-npm-packages/vibeui add button --dir ./src/components/ui
npx @agents-npm-packages/vibeui add trading-card footer-mega --dir ./src/components/ui
```
Components that import siblings (e.g. dialog → button) pull them in automatically.

## Add via MCP
Tools: list_components, search_components, get_component, add_component, get_tokens, get_utils, get_install_guide.

## Import
```tsx
import { Button } from "@/components/ui/button"
```
