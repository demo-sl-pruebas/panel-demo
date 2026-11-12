# panel-demo

Admin dashboard for the Demo Fitness gym chain: members, memberships and pricing rules.

## Layout

- `apps/web` — React 19 + Vite admin app (`@demo-fitness/web`).
- `packages/core` — pure TypeScript domain logic: plans, pricing rules, member status (`@demo-fitness/core`). No React, no I/O.
- `packages/ui` — presentational React components (`@demo-fitness/ui`).

Packages are consumed from source (`main: src/index.ts`); there is no package build step.

## Commands

Node 22 (`.nvmrc`), pnpm via corepack (`packageManager` in `package.json`).

- Install: `pnpm install --frozen-lockfile`
- Dev server: `pnpm dev` (http://localhost:5173)
- Lint (Prettier check): `pnpm lint` · fix with `pnpm format`
- Typecheck: `pnpm typecheck` (`tsc -b` over project references)
- Tests: `pnpm test` (Vitest in every package) · one package: `pnpm --filter @demo-fitness/core test`
- Build: `pnpm build` (outputs `apps/web/dist`)

## Conventions

- TypeScript strict, named exports only, no default exports.
- Money is always integer euro cents; format with `formatEuros` from core.
- Dates are ISO strings (`YYYY-MM-DD`); pass `today` in explicitly so logic stays testable.
- Business rules go in `packages/core` with unit tests; components never compute prices.
- New UI components: use the `new-component` skill in `.claude/skills/`.
- Every change under `packages/` needs a changeset (`pnpm changeset`).
- Conventional Commits for commits and PR titles; branches `<type>/<short-topic>`; rebase merge only.

## Don't

- Don't add dependencies without asking.
- Don't edit `pnpm-lock.yaml` by hand or `CHANGELOG.md` files (changesets writes them).
- Don't touch `.github/` or `.changeset/config.json` unless the task is about CI or releases.
