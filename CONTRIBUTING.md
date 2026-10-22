# Contributing to panel-demo

We work **trunk-based**: `main` is the only long-lived branch and is always releasable.

## Branches

- Branch off the latest `main` and keep branches short-lived (ideally merged within 1–2 days).
- Name them `<type>/<short-topic>`, where `<type>` is a Conventional Commit type:
  `feat/off-peak-discount`, `fix/member-status-timezone`, `chore/bump-vite`.
- Rebase on `main` instead of merging `main` into your branch.

## Commits and PR titles

- Use [Conventional Commits](https://www.conventionalcommits.org/): `<type>(<scope>): <subject>`.
- Types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`.
- Scopes: `core`, `ui`, `web`, `deps`, `release`, `repo` (optional).
- The **PR title** is checked by CI (`pr-title` job, `scripts/check-pr-title.mjs`).

## Changesets

If your PR touches anything under `packages/`, add a changeset with `pnpm changeset`.
The `changeset` CI job fails otherwise. Changes to `apps/web` only don't need one.

## Pull requests

- Open a PR against `main`; fill in the template.
- Required checks: `verify`, `pr-title`, `changeset`. One approval from a code owner (see `.github/CODEOWNERS`).
- We **rebase and merge** only, so `main` has a linear history. Every commit in your branch lands on `main`;
  squash fixups yourself before merging.
- Delete the branch after merging.

## Releases

Pushing to `main` runs the `Release` workflow. While changesets are pending it reports that a
version PR is needed; a maintainer then runs `pnpm changeset version` on a `chore/release-<date>`
branch. Once that PR is merged, the workflow (simulated for now) tags and deploys the admin app.

## Local setup

```sh
corepack enable
pnpm install
pnpm dev          # http://localhost:5173
pnpm lint && pnpm typecheck && pnpm test && pnpm build
```
