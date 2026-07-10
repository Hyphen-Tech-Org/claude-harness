/**
 * harness/apply.mjs (claude-harness OSS 版)
 * 調査結果を .claude/ ディレクトリへ直接適用する。
 * pending / human_review なし。全て即時適用。
 */

import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, '..');

const AGENT_DIR  = join(REPO_ROOT, '.claude', 'agents', 'harness-discovered');
const HOOK_DIR   = join(REPO_ROOT, '.claude', 'hooks', 'harness-discovered');
const SKILL_DIR  = join(REPO_ROOT, '.claude', 'skills', 'harness-discovered');

function ensureDir(dir) {
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
}

function targetDir(type) {
  switch (type) {
    case 'agent_doc':       return AGENT_DIR;
    case 'hook_suggestion': return HOOK_DIR;
    case 'skill_suggestion': return SKILL_DIR;
    default:                return AGENT_DIR;
  }
}

function writeItem(item) {
  const dir = targetDir(item.type);
  ensureDir(dir);
  const filePath = join(dir, item.filename);
  writeFileSync(filePath, item.content, 'utf8');
  console.log(`[apply] Written: ${filePath.replace(REPO_ROOT, '')}`);
  return filePath.replace(REPO_ROOT, '').replace(/\\/g, '/');
}

export async function apply(findings) {
  const { analysis } = findings;
  const applied = [];

  if (!analysis) {
    console.log('[apply] No analysis; skipping.');
    return applied;
  }

  ensureDir(AGENT_DIR);

  // mcp_update / settings_update はユーザー固有のため OSS では適用しない（スキップ）
  for (const item of analysis.auto_apply ?? []) {
    if (item.type === 'mcp_update' || item.type === 'settings_update') {
      console.log(`[apply] Skip ${item.type} (user-specific, not applied in OSS mode)`);
      continue;
    }
    const file = writeItem(item);
    applied.push({ type: item.type, title: item.title, file, source: item.source ?? null });
  }

  return applied;
}
