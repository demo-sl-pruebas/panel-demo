#!/usr/bin/env node
// PostToolUse hook: formats the file Claude just edited with the repo's Prettier config.
// It only touches files inside the project and never fails the tool call.
import { spawnSync } from 'node:child_process';
import path from 'node:path';

let input = '';
for await (const chunk of process.stdin) input += chunk;

try {
  const event = JSON.parse(input);
  const filePath = event?.tool_input?.file_path;
  const projectDir = process.env.CLAUDE_PROJECT_DIR ?? process.cwd();
  if (typeof filePath === 'string') {
    const relative = path.relative(projectDir, path.resolve(projectDir, filePath));
    const insideProject =
      relative !== '' && !relative.startsWith('..') && !path.isAbsolute(relative);
    if (insideProject && !relative.split(path.sep).includes('node_modules')) {
      spawnSync('pnpm', ['exec', 'prettier', '--write', '--ignore-unknown', relative], {
        cwd: projectDir,
        stdio: 'ignore',
      });
    }
  }
} catch {
  // Formatting is best effort; never block the session.
}
process.exit(0);
