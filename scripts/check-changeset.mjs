#!/usr/bin/env node
// Fails when a pull request changes files under packages/ without adding a changeset.
// Usage: BASE_REF=main node scripts/check-changeset.mjs
import { execFileSync } from 'node:child_process';

const base = process.env.BASE_REF ?? 'main';
const diff = execFileSync(
  'git',
  ['diff', '--name-only', '--diff-filter=ACMRD', `origin/${base}...HEAD`],
  {
    encoding: 'utf8',
  },
)
  .split('\n')
  .filter(Boolean);

const packageChanges = diff.filter((f) => f.startsWith('packages/') && !f.endsWith('CHANGELOG.md'));
const changesets = diff.filter(
  (f) => /^\.changeset\/[^/]+\.md$/.test(f) && !f.endsWith('README.md'),
);

if (packageChanges.length === 0) {
  console.log('No changes under packages/, no changeset needed.');
} else if (changesets.length === 0) {
  console.error('This PR changes shared packages but adds no changeset:');
  for (const f of packageChanges) console.error(`  - ${f}`);
  console.error('Run "pnpm changeset" and commit the generated file.');
  process.exit(1);
} else {
  console.log(`Found changeset(s): ${changesets.join(', ')}`);
}
