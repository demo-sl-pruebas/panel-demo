# Changesets

Every PR that changes a shared package under `packages/` must include a changeset.
Run `pnpm changeset`, pick the affected packages and the bump type, and write one line
for the changelog. CI (`changeset` job) fails if it is missing.

Releases are cut by running `pnpm changeset version` on a `chore/release-<date>` branch.
