# Contributing to TechSign Frontend Monorepo

Thanks for taking the time to contribute! This document explains how to set up, develop, and submit changes across this monorepo.

## Repository Structure

- `apps/web/` – Vite React app
- `packages/shared/` – shared constants, types, utils, hooks (compiled to `dist`)
- `packages/animations/` – animation utilities/components (compiled to `dist`)
- `packages/ui/` – component library (compiled to `dist`, built with Vite)
- `packages/config/` – central config (tsconfig, eslint, tailwind presets)

## Prerequisites

- Node.js LTS and pnpm (repo uses `pnpm@10.x`)
- Turbo 2.x is used via scripts; no global install required

Install dependencies:

```bash
pnpm install
```

## Development

- Start the web app:

```bash
pnpm --filter @techsign/web dev
```

- Or run all dev tasks in parallel (Turbo):

```bash
pnpm dev
```

### Build Order and Turbo

Always ensure packages build before the app:

```bash
pnpm --filter @techsign/shared build
pnpm --filter @techsign/animations build
pnpm --filter @techsign/ui build
pnpm --filter @techsign/web build
```

Or use the Turbo pipeline (caching + parallel):

```bash
pnpm build:turbo
```

Turbo config is defined in `turbo.json` using `tasks` with caching and `globalDependencies`.

### TypeScript and Project References

- Library packages extend `packages/config/tsconfig/base.json` (emits to `dist`) and set:
  - `composite: true`, `declaration: true`, `declarationMap: true`
  - `rootDir: src`, `outDir: dist`
  - Avoid importing from other packages’ `src`. Depend on their built output via package name (e.g. `@techsign/shared`).
- App configs may extend `react-app.json` (which sets `noEmit: true`).

### Linting and Typechecking

```bash
pnpm lint
pnpm typecheck
```

### Tailwind & Styling

- Tailwind preset is in `packages/config/tailwind/`
- The app’s `tailwind.config.ts` scans UI and Shared packages’ `src` directories.

### Coding Standards

- Language: TypeScript, React 18/19
- Keep imports from shared packages stable (do not deep import `src` from another package)
- Use `@techsign/shared` for common types/constants/utils
- Keep comments/docstrings minimal and relevant

### Commit Messages

Use conventional commits:

- `feat: ...` new feature
- `fix: ...` bug fix
- `chore: ...` tooling or maintenance
- `refactor: ...` internal refactor
- `docs: ...` documentation only

### Branching & PRs

- Branch from `main`: `feat/<short-name>` or `fix/<short-name>`
- Keep PRs focused and small, with a clear description
- Ensure CI (build, typecheck, lint) passes

### Adding a New Package

1. Create `packages/<name>/` with `package.json`, `src/`, and `tsconfig.json` extending `../config/tsconfig/base.json`.
2. Export from `src/index.ts` and ensure `package.json` has:

```json
{
  "main": "dist/index.js",
  "module": "dist/index.js",
  "types": "dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "require": "./dist/index.js",
      "types": "./dist/index.d.ts"
    }
  }
}
```

3. Build and reference it via `workspace:*` from dependents.

### Running Tests

(Add when tests exist, e.g. vitest/jest).

## Troubleshooting

- If builds fail with TS project reference errors (TS6305), clean stale outputs:

```bash
# shared
rimraf packages/shared/dist packages/shared/tsconfig.tsbuildinfo
# animations
rimraf packages/animations/dist packages/animations/tsconfig.tsbuildinfo
```

Rebuild in order or run `pnpm build:turbo`.

- If Vite cannot resolve a package entry, ensure the package’s `dist/` exists and `package.json` has `main/module/exports` pointing to `dist`.

## Release Process

- Library packages should build to `dist` and be consumable within the monorepo.
- External publishing (npm) can be added later (e.g. via Changesets).

## Code of Conduct

Be respectful and constructive. Assume good intent. We value clear communication and helpful reviews.

---

Thank you for contributing to TechSign!
