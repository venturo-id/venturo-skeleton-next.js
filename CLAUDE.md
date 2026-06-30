# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is the **Zone UI** template (by Minimals/MUI) — a Next.js 16 + MUI 9 multi-vertical marketing/landing site starter. It ships several self-contained verticals (marketing, travel, career, e-learning, e-commerce, account, auth, pricing, support) that share a common theme, layout, component, and routing layer. It is a UI/template skeleton: data comes from in-repo mock files, not a backend.

## Commands

Dev server and build run on **port 8002**.

```sh
yarn dev            # start dev server (port 8002)
yarn build          # production build
yarn start          # serve production build (port 8002)

yarn lint           # eslint over src/**/*.{js,jsx,ts,tsx}
yarn lint:fix       # eslint --fix
yarn fm:check       # prettier --check
yarn fm:fix         # prettier --write
yarn fix:all        # lint:fix + fm:fix (run before committing)

yarn tsc:check      # tsc --noEmit --pretty (type-check, no test runner exists)
yarn tsc:watch      # type-check in watch mode
```

There is **no test framework** configured — `tsc:check` plus lint are the verification gates. Yarn is the preferred package manager (`packageManager: yarn@1.22.22`, Node >= 22.12).

## Architecture

### The page → view → section pattern (most important)

Routing uses the **App Router** under [src/app/](src/app/) with route groups like `(home)`, `(auth)`, `(pricing)`. The layering is strict and pervasive:

- **`src/app/<route>/page.tsx`** — thin Server Component. Exports `metadata`, then renders a single `*View`. Keep these minimal.
- **`src/app/<route>/layout.tsx`** — wraps children in a layout (`MainLayout`, `SimpleLayout`, or an auth layout).
- **`src/sections/<vertical>/view/<name>-view.tsx`** — the `'use client'` View that composes the page from section components and wires up hooks/mock data.
- **`src/sections/<vertical>/<name>-section.tsx`** — individual presentational/section building blocks.

When adding a page, follow this chain: create the section components and a `view`, then a thin `page.tsx` that imports the view. Don't put substantial UI directly in `app/`.

### Routing

All route strings are centralized in [src/routes/paths.ts](src/routes/paths.ts) as the `paths` object (use these, do not hardcode URLs; dynamic routes are functions, e.g. `paths.marketing.caseStudy(id)`). Navigation helpers in [src/routes/hooks/](src/routes/hooks/) (`useRouter`, `usePathname`, `useParams`, `useSearchParams`) wrap `next/navigation`; prefer them and the `RouterLink` component over importing `next/navigation`/`next/link` directly.

### Theme system

[src/theme/](src/theme/) is a full MUI theme built on **CSS variables** (light/dark via `colorSchemeSelector`). Key pieces: `theme-config.ts` (fonts, defaults), `create-theme.ts`, per-component overrides in `core/components/`, and `theme-overrides.ts` for app-level tweaks. User-facing settings (color scheme, contrast, layout, RTL, font) are runtime state managed by `SettingsProvider`/`SettingsDrawer` in [src/components/settings/](src/components/settings/) and merged via `theme/with-settings/`. The whole provider stack is assembled in [src/app/layout.tsx](src/app/layout.tsx).

### Forms

Forms use **react-hook-form + Zod**. Do not use raw MUI inputs in forms — use the RHF wrappers in [src/components/hook-form/](src/components/hook-form/) (exported as the `Field.*` namespace plus `Form`). `schema-utils.ts` holds shared Zod helpers. Resolvers come from `@hookform/resolvers/zod`.

### Layouts, components, mock data, types

- [src/layouts/](src/layouts/) — page shells (`main`, `simple`, `auth-*`); nav config lives in `nav-config-main*.tsx`, language list in `langs-config.ts`.
- [src/components/](src/components/) — shared reusable components (iconify, carousel, image, lightbox, animate, scrollbar, etc.). Each folder has an `index.ts` barrel.
- [src/_mock/](src/_mock/) — all sample data (`_blog`, `_products`, `_tours`, …), aggregated via `index.ts`. This stands in for an API.
- [src/types/](src/types/) — shared domain types (product, tour, job, course, …).
- [src/global-config.ts](src/global-config.ts) — `CONFIG` object reading `NEXT_PUBLIC_*` env (assets dir, Google Map API key).

## Conventions

- **Path alias:** import internal modules as `src/...` (absolute, via `baseUrl: "."`). The ESLint `perfectionist` plugin sorts imports into ordered groups (mui → routes → hooks → utils → internal → components → sections → types → relative) by **line length ascending** — let `yarn fix:all` handle ordering rather than hand-sorting.
- **SVGs** import as React components via `@svgr/webpack` (configured for both webpack and turbopack in [next.config.ts](next.config.ts)).
- `trailingSlash: true` is set globally — generated URLs end in `/`.
- Prettier: single quotes, semicolons, `printWidth: 100`, `trailingComma: es5`.
- ESLint disables `@typescript-eslint/no-explicit-any` and enforces `consistent-type-imports` (use `import type`); unused imports/vars are auto-removable warnings (prefix intentionally-unused vars with `_`).
- Files use kebab-case; barrel `index.ts` files re-export from each directory.
- `.env*` is gitignored — when copying/cloning the project, copy `.env` manually (it carries the `NEXT_PUBLIC_*` vars).
