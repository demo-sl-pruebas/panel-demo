---
name: new-component
description: Adds a new React component to the shared UI package (packages/ui) together with its Vitest test, export and changeset. Use when asked to create a reusable UI component for the Demo Fitness admin.
---

# New UI component

Follow these steps to add a component to `@demo-fitness/ui`.

1. **Name it.** PascalCase, a noun describing what it shows (`MemberAvatar`, `PlanPill`). Check `packages/ui/src/index.ts` first so you don't duplicate an existing component.
2. **Create the component** at `packages/ui/src/<Name>.tsx`:
   - Export a named function component and a `<Name>Props` interface. No default exports.
   - Use plain class names with the `df-` prefix and BEM modifiers (`df-plan-pill--premium`). Add any styles to `apps/web/src/styles.css`.
   - Keep it presentational: no data fetching, no domain logic. Pricing and status rules live in `@demo-fitness/core`.
   - Make it accessible: semantic elements, a label for anything interactive.
3. **Write the test** at `packages/ui/src/<Name>.test.tsx` using `@testing-library/react` (see `Button.test.tsx`): call `afterEach(cleanup)`, query by role or label, cover the default render and every variant prop.
4. **Export it** from `packages/ui/src/index.ts` (`export * from './<Name>';`).
5. **Add a changeset**: create `.changeset/<kebab-description>.md` with `'@demo-fitness/ui': minor` and a one-line summary.
6. **Verify**: `pnpm --filter @demo-fitness/ui test`, `pnpm typecheck`, `pnpm lint`.
