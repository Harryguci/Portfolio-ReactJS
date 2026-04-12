# Vite + React + TypeScript migration plan

This project is already **Vite + React** (`vite.config.js`, root `index.html` → `/src/index.jsx`). The remaining work is **TypeScript adoption**, test setup, and cleanup of Create React App–era leftovers.

---

## Install issues (resolved)

### What caused `IntegrityCheckFailed`

1. Stale or corrupted tarballs in Bun’s cache after migrating from `package-lock.json`.
2. User-level `~/.npmrc` (Azure DevOps feed) may interact oddly with tooling; Bun warns that it does not support the `email` registry option—that warning is harmless.

### What we did

- Added **project** `.npmrc` with `registry=https://registry.npmjs.org/` so this repo resolves public packages from npm.
- Ran `bun pm cache rm`, removed `node_modules`, and ran `bun install` again.

### Tests

- `bun run test` may still fail on `src/App.test.js` (e.g. Rollup/Vitest “Expression expected”) until the test file and Vitest JSX/TS setup are updated.

---

## Phase 1 — Tooling

1. Add devDependencies: `typescript`, `@types/react`, `@types/react-dom`, `@types/node` (for Vite config typing).
2. Add `tsconfig.json` and `tsconfig.node.json` (see [Vite: TypeScript](https://vitejs.dev/guide/features.html#typescript)).
3. Optionally rename `vite.config.js` → `vite.config.ts`; use `path.resolve(__dirname, "src")` for the `@` alias instead of `"/src"` for reliable resolution on Windows.
4. Update `index.html` script entry from `/src/index.jsx` → `/src/main.tsx` (or another single entry name you prefer).

---

## Phase 2 — Source migration

1. Rename entry: `src/index.jsx` → `src/main.tsx` (or `index.tsx`).
2. Rename `src/App.jsx` → `App.tsx`, then migrate `src/**/*.jsx` → `.tsx` and app `src/**/*.js` → `.ts` in batches (e.g. `components/` → `pages/` → `middleware/`).
3. Enable `"strict": true` in `tsconfig` after the first pass, or start with `"strict": false` and tighten gradually.
4. Add/fix types for **react-router-dom**, **react-bootstrap**, and **react-markdown** (built-in types or `@types/*` as needed).

---

## Phase 3 — Tests and leftovers

1. Rename `App.test.js` → `App.test.tsx`; configure Vitest + Testing Library for TypeScript/JSX and fix any parse errors.
2. Remove or replace CRA-era **ESLint** block in `package.json` (`eslintConfig.extends: react-app`) unless you add a modern ESLint flat config.
3. Remove duplicate **`public/index.html`** if nothing references it (Vite uses the root `index.html`).
4. **`babel.config.json`**: Vite uses esbuild + `@vitejs/plugin-react` for JSX. Keep Babel only if you still need **babel-plugin-macros** or another Babel-specific pipeline; otherwise remove unused Babel dependencies.

---

## Phase 4 — Sass / Bootstrap (follow-up)

Plan a separate pass to migrate Sass **`@import`** → **`@use`** and address Bootstrap Sass deprecations (required before future Dart Sass major versions).

---

## Suggested order

1. Tooling (`tsconfig` + types)
2. Entry + `App`
3. Router and leaf components
4. Middleware / server-side types if applicable
5. Tests
6. Delete dead CRA files
7. Optional Babel cleanup

---

## Decisions to make

- **Strict TypeScript from day one** vs **loose `tsconfig` first**, then tighten.
- Whether **`express`** in this `package.json` is still required here or belongs only in a separate API project.

---

## Vercel deployment (verified)

### Status: ready for a static Vite deploy

`npm run build` / `bun run build` produces a working static site under **`build/`** (see `vite.config.js` → `build.outDir`). The app is currently a single-view portfolio with **no client-side `/api` calls** in source, so nothing in the repo requires a Node server on Vercel for runtime.

### Repo configuration

- **`vercel.json`** — Sets **`outputDirectory`** to **`build`**, because Vercel’s Vite defaults assume **`dist`**. Without this, the deployment can look “empty” or fail to serve assets correctly.
- **SPA `rewrites`** — Sends unknown paths to `index.html` so **React Router** (or future routes) works on refresh and deep links. Vercel still serves real files first (e.g. `/assets/*`, `/manifest.json`, icons under `public/`).

### Dashboard / package manager

- If you use **Bun** locally, commit **`bun.lockb`** (it is not in `.gitignore`) so Vercel can prefer Bun for install when detected; otherwise the default **npm** install + **`npm run build`** is fine.
- Keep the project **`.npmrc`** (`registry=https://registry.npmjs.org/`) so installs on Vercel match local public-registry resolution.

### Not part of this Vite deploy

- **`src/middleware/Middleware.js`** — Written for **Next.js** (`next/server`, `middleware` export). It is **not imported** by the Vite app, so it is **not** deployed as Edge middleware. To use **Edge Config** on Vercel with a pure Vite SPA, you would add **`/api/*` serverless routes** or migrate to a framework that supports middleware; that is out of scope for the current static build.
- **`vite.config.js` `server.proxy` `/api` → `localhost:3001`** — Dev only. Production needs a real API URL, **Vercel rewrites** to another service, or **serverless functions** under `/api`.

### Optional follow-ups

- Set **Node.js version** in Project Settings or `"engines"` in `package.json` if you rely on a specific major.
- Add **environment variables** in the Vercel project if you later introduce API keys or public config.
- **`@vercel/edge-config`** is only useful once you have server-side/edge code that calls it; it is not required for the current static site.
