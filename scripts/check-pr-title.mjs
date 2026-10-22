#!/usr/bin/env node
// Validates a pull request title against Conventional Commits.
// Usage: PR_TITLE="feat(core): add off-peak discount" node scripts/check-pr-title.mjs
// With rebase merges the commits land on main as they are, so the PR title is the
// summary reviewers rely on and must follow the same convention as the commits.

const TYPES = [
  'feat',
  'fix',
  'docs',
  'style',
  'refactor',
  'perf',
  'test',
  'build',
  'ci',
  'chore',
  'revert',
];
const SCOPES = ['core', 'ui', 'web', 'deps', 'release', 'repo'];

const pattern = new RegExp(
  `^(?<type>${TYPES.join('|')})(?:\\((?<scope>[a-z-]+)\\))?(?<breaking>!)?: (?<subject>.+)$`,
);

export function checkTitle(title) {
  const errors = [];
  const match = pattern.exec(title ?? '');
  if (!match?.groups) {
    errors.push(
      `Title must look like "<type>(<scope>): <subject>" with type one of: ${TYPES.join(', ')}.`,
    );
    return errors;
  }
  const { scope, subject } = match.groups;
  if (scope && !SCOPES.includes(scope)) {
    errors.push(`Unknown scope "${scope}". Use one of: ${SCOPES.join(', ')}.`);
  }
  if (/^[A-Z]/.test(subject)) errors.push('Subject must start with a lowercase letter.');
  if (subject.endsWith('.')) errors.push('Subject must not end with a period.');
  if (title.length > 72) errors.push('Title must be 72 characters or fewer.');
  return errors;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const title = process.env.PR_TITLE ?? process.argv[2];
  const errors = checkTitle(title);
  if (errors.length > 0) {
    console.error(`PR title "${title}" is not a valid Conventional Commit:`);
    for (const e of errors) console.error(`  - ${e}`);
    process.exit(1);
  }
  console.log(`PR title OK: ${title}`);
}
