/**
 * harness/verify.mjs (claude-harness OSS 版)
 */
import { existsSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, '..');

export async function verify() {
  const checks = [
    { name: '.claude/ exists',                         ok: existsSync(join(REPO_ROOT, '.claude')) },
    { name: '.claude/agents/ exists',                  ok: existsSync(join(REPO_ROOT, '.claude', 'agents')) },
    { name: '.claude/agents/harness-discovered/ exists', ok: existsSync(join(REPO_ROOT, '.claude', 'agents', 'harness-discovered')) },
    {
      name: 'harness/state.json readable',
      ok: (() => {
        try { JSON.parse(readFileSync(join(__dirname, 'state.json'), 'utf8')); return true; } catch { return false; }
      })(),
    },
    { name: 'harness/research.mjs exists', ok: existsSync(join(__dirname, 'research.mjs')) },
    { name: 'harness/apply.mjs exists',    ok: existsSync(join(__dirname, 'apply.mjs')) },
    { name: 'harness/report.mjs exists',   ok: existsSync(join(__dirname, 'report.mjs')) },
  ];

  const results = checks.map(c => {
    console.log(`[verify] ${c.ok ? '✅' : '❌'} ${c.name}`);
    return c;
  });

  const passed = results.filter(r => r.ok).length;
  console.log(`[verify] ${passed}/${results.length} passed`);
  return { passed, total: results.length, results };
}
