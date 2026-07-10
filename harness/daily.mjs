/**
 * harness/daily.mjs (claude-harness OSS 版)
 * エントリポイント: research → apply → verify → report
 */
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { research } from './research.mjs';
import { apply } from './apply.mjs';
import { verify } from './verify.mjs';
import { report } from './report.mjs';

const __dirname  = dirname(fileURLToPath(import.meta.url));
const STATE_FILE = join(__dirname, 'state.json');

async function main() {
  const today = new Date().toISOString().split('T')[0];
  console.log(`\n[claude-harness] ===== ${today} =====`);

  let state = {};
  try { state = JSON.parse(readFileSync(STATE_FILE, 'utf8')); } catch { /* fresh start */ }

  console.log('\n[Phase 1] Research...');
  const findings = await research(state);

  console.log('\n[Phase 2] Apply...');
  const applied = await apply(findings);

  console.log('\n[Phase 3] Verify...');
  const verification = await verify();

  console.log('\n[Phase 4] Report...');
  await report({ today, findings, applied, verification });

  const newState = {
    ...state,
    lastRun: today,
    lastVersions: { ...state.lastVersions, ...findings.versions },
    knownPatterns: [
      ...new Set([...(state.knownPatterns ?? []), ...(findings.analysis?.new_patterns ?? [])]),
    ],
    applied: [...(state.applied ?? []), ...applied.map(a => ({ date: today, ...a }))],
  };
  writeFileSync(STATE_FILE, JSON.stringify(newState, null, 2), 'utf8');
  console.log('\n[claude-harness] Done. state.json updated.');

  if (verification.passed < verification.total) {
    console.error('[claude-harness] ⚠️ Verify failed.');
    process.exit(1);
  }
}

main().catch(e => { console.error('[claude-harness] Fatal:', e); process.exit(1); });
