/**
 * harness-watchdog/research.mjs
 * npm・GitHub から最新のハーネスエンジニアリング情報を取得し、
 * Anthropic API で分析して出典付き学び形式で返す。
 */

const NPM_URL      = 'https://registry.npmjs.org/@anthropic-ai/claude-code/latest';
const GH_RELEASES  = 'https://api.github.com/repos/anthropics/claude-code/releases?per_page=5';
const GH_COOKBOOK  = 'https://api.github.com/repos/anthropics/anthropic-cookbook/commits?per_page=5';
const GH_MCP_REG   = 'https://api.github.com/repos/modelcontextprotocol/registry/commits?per_page=3';

const ANTHROPIC_URL   = 'https://api.anthropic.com/v1/messages';
const ANTHROPIC_MODEL = 'claude-sonnet-4-6';

async function fetchJson(url, headers = {}) {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'harness-watchdog/2.0', Accept: 'application/json', ...headers },
  });
  if (!res.ok) throw new Error(`Fetch failed ${url}: ${res.status}`);
  return res.json();
}

async function fetchNpmVersion() {
  try {
    const data = await fetchJson(NPM_URL);
    return { version: data.version ?? 'unknown', time: data.time ?? null };
  } catch (e) {
    console.warn('[research] npm fetch failed:', e.message);
    return { version: null };
  }
}

async function fetchGitHubReleases() {
  const h = process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {};
  try {
    const releases = await fetchJson(GH_RELEASES, h);
    return releases.slice(0, 3).map(r => ({
      tag: r.tag_name,
      name: r.name,
      body: (r.body ?? '').slice(0, 2000),
      published: r.published_at,
      url: r.html_url,
    }));
  } catch (e) {
    console.warn('[research] GitHub releases failed:', e.message);
    return [];
  }
}

async function fetchCookbookCommits() {
  const h = process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {};
  try {
    const [cookbook, mcpReg] = await Promise.all([
      fetchJson(GH_COOKBOOK, h).catch(() => []),
      fetchJson(GH_MCP_REG, h).catch(() => []),
    ]);
    return {
      cookbook: cookbook.slice(0, 5).map(c => ({
        sha: c.sha?.slice(0, 7),
        message: c.commit?.message?.split('\n')[0] ?? '',
        date: c.commit?.committer?.date ?? '',
        url: c.html_url,
      })),
      mcpRegistry: mcpReg.slice(0, 3).map(c => ({
        sha: c.sha?.slice(0, 7),
        message: c.commit?.message?.split('\n')[0] ?? '',
        date: c.commit?.committer?.date ?? '',
      })),
    };
  } catch (e) {
    console.warn('[research] Cookbook/MCP fetch failed:', e.message);
    return { cookbook: [], mcpRegistry: [] };
  }
}

async function analyzeWithAnthropic({ npmInfo, releases, commits, state }) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.warn('[research] ANTHROPIC_API_KEY not set; using raw data only.');
    return null;
  }

  const prevVersion  = state.lastVersions?.['claude-code'] ?? 'unknown';
  const knownPatterns = state.knownPatterns ?? [];

  const prompt = `あなたは Claude Code のハーネスエンジニアリング（＝AIエージェントを制御・改善する枠組みの設計技術）の専門家です。
以下のデータから「学びになる解説」として、出典 URL 付きで改善提案を返してください。

## npm バージョン
前回: ${prevVersion} → 今回: ${npmInfo.version ?? '取得失敗'}

## GitHub 最新リリース（上位3件）
${JSON.stringify(releases, null, 2)}

## anthropics/anthropic-cookbook 最新コミット
${JSON.stringify(commits.cookbook, null, 2)}

## MCP Registry 最新コミット
${JSON.stringify(commits.mcpRegistry, null, 2)}

## 既知パターン（適用済み・重複提案しないこと）
${knownPatterns.join(', ')}

## 出力形式（必ず以下の JSON のみ返す）
{
  "version_changed": true/false,
  "new_version": "x.x.x または null",
  "findings": [
    {
      "title": "技術的な概念名（専門用語をそのまま使う）",
      "description": "なぜ重要か・どう使うか・何が変わるかを150字以内で説明。専門語には括弧で補足。",
      "source": "https://一次情報のURL（必須）"
    }
  ],
  "new_patterns": ["適用済みとして記録するキー（英語）"],
  "auto_apply": [
    {
      "type": "agent_doc" | "hook_suggestion" | "skill_suggestion" | "mcp_update" | "settings_update",
      "filename": "ファイル名（拡張子含む・トピック名ベース・日付なし）",
      "title": "タイトル",
      "description": "このファイルが何をするか・なぜ有益か",
      "content": "ファイルの中身（Markdownまたは JSON 文字列）",
      "source": "https://一次情報URL"
    }
  ]
}

重要:
- human_review フィールドは不要。提案はすべて auto_apply に入れる。
- findings は必ず source URL を含む（推測 URL は禁止・確認できない場合は omit）。
- 学びとして価値のある技術的な説明を書く。自明な語に補足は不要。`;

  try {
    const res = await fetch(ANTHROPIC_URL, {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: ANTHROPIC_MODEL,
        max_tokens: 3000,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    if (!res.ok) throw new Error(`Anthropic API ${res.status}: ${await res.text()}`);
    const data = await res.json();
    const text = data.content?.[0]?.text ?? '';
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) throw new Error('JSON not found in Anthropic response');
    return JSON.parse(match[0]);
  } catch (e) {
    console.error('[research] Anthropic analysis failed:', e.message);
    return null;
  }
}

export async function research(state) {
  console.log('[research] Fetching latest harness data...');
  const [npmInfo, releases, commits] = await Promise.all([
    fetchNpmVersion(),
    fetchGitHubReleases(),
    fetchCookbookCommits(),
  ]);

  const analysis = await analyzeWithAnthropic({ npmInfo, releases, commits, state });

  return {
    versions: { 'claude-code': npmInfo.version },
    releases,
    commits,
    analysis,
  };
}
