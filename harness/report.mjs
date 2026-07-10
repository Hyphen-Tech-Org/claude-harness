/**
 * harness/report.mjs (claude-harness OSS 版)
 * - README.md の <!--FINDINGS_START-->...<!--FINDINGS_END--> を毎日更新（必須）
 * - Discord 投稿はオプション（DISCORD_BOT_TOKEN + DISCORD_CHANNEL_ID が必要）
 */
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT   = join(__dirname, '..');
const README_PATH = join(REPO_ROOT, 'README.md');

async function postDiscord(token, channelId, content) {
  const res = await fetch(`https://discord.com/api/v10/channels/${channelId}/messages`, {
    method: 'POST',
    headers: { Authorization: `Bot ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ content, allowed_mentions: { parse: ['everyone'] } }),
  });
  const data = await res.json();
  if (data.id) console.log(`[report] Discord sent: ${data.id}`);
  else console.error('[report] Discord error:', JSON.stringify(data));
}

function updateReadme({ today, analysis, applied }) {
  if (!existsSync(README_PATH)) return;

  const version    = analysis?.new_version ?? '';
  const versionTag = version
    ? ` (claude-code ${version}${analysis?.version_changed ? ' 🆕' : ''})`
    : '';

  const findingLines = (analysis?.findings ?? []).map(f => {
    const sourceRef = f.source ? ` — [出典](${f.source})` : '';
    return `- **${f.title}**: ${f.description}${sourceRef}`;
  }).join('\n');

  // 「なし」報告禁止: 適用0件は適用セクションごと省略
  const appliedBlock = applied.length > 0
    ? ['\n### 適用済み', ...applied.map(a => `- \`${a.file}\`: ${a.title}`)].join('\n')
    : '';

  const block = [
    `${versionTag}`,
    '',
    '### 動向',
    findingLines || '（本日は記録なし）',
    appliedBlock,
  ].filter(Boolean).join('\n');

  let readme = readFileSync(README_PATH, 'utf8');
  readme = readme.replace(/<!--LAST_UPDATED-->.*/, `<!--LAST_UPDATED-->${today}`);
  readme = readme.replace(
    /<!--FINDINGS_START-->[\s\S]*?<!--FINDINGS_END-->/,
    `<!--FINDINGS_START-->\n${block}\n<!--FINDINGS_END-->`
  );
  writeFileSync(README_PATH, readme, 'utf8');
  console.log(`[report] README.md updated for ${today}`);
}

export async function report({ today, findings, applied, verification }) {
  const analysis = findings.analysis;

  // README 更新（常に実行）
  updateReadme({ today, analysis, applied });

  // Discord 投稿（オプション）
  const token     = process.env.DISCORD_BOT_TOKEN;
  const channelId = process.env.DISCORD_CHANNEL_ID;
  if (!token || !channelId) {
    console.log('[report] Discord skipped (DISCORD_BOT_TOKEN or DISCORD_CHANNEL_ID not set)');
    return;
  }

  const verifyEmoji   = verification.passed === verification.total ? '✅' : '⚠️';
  const findingLines  = (analysis?.findings ?? []).map(f => {
    const ref = f.source ? `\n  📎 <${f.source}>` : '';
    return `> **${f.title}**\n> ${f.description}${ref}`;
  }).join('\n\n');
  // 「なし」報告禁止: 適用0件は【適用】セクションごと省略
  const appliedSection = applied.length > 0
    ? `\n\n**【適用】**\n${applied.map(a => `• \`${a.file}\` — ${a.title}`).join('\n')}`
    : '';

  const msg = `@here\n📊 **ハーネス日報 ${today}** — claude-code ${analysis?.new_version ?? '?'}${analysis?.version_changed ? ' 🆕' : ''}\n\n**【動向】**\n${findingLines || '（差分なし）'}${appliedSection}\n\n${verifyEmoji} ${verification.passed}/${verification.total}`;
  await postDiscord(token, channelId, msg);
}
