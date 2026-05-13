# 04. Core Features — Claude Code の主要機能（2026 Edition）

> 出典: [公式ドキュメント](https://code.claude.com/docs/en/overview) / [anthropics/skills](https://github.com/anthropics/skills) / [Anthropic Engineering Blog](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills)

Claude Code は **6 つの拡張機構** を組み合わせて、自分専用ワークフローを作ります。

| # | 機能 | フォルダ / 仕組み | 用途 |
|---|---|---|---|
| 1 | **Skills** | `.claude/skills/<name>/SKILL.md` | よく使う定型作業をまとめる |
| 2 | **Slash Commands** | 組み込み or `.claude/commands/*.md` (旧式) | `/コマンド` 1 つで処理 |
| 3 | **Subagents** | `.claude/agents/<name>.md` | 並列タスク・調査・専門特化 |
| 4 | **Hooks** | `.claude/settings.json` | イベントトリガーで決定的に実行 |
| 5 | **MCP Servers** | `.mcp.json` (project) / `~/.claude/.mcp.json` | 外部ツール接続 (Notion/Drive/GitHub 等) |
| 6 | **Plugins / Marketplace** | `/plugin marketplace add` | Skills + Agents + Hooks を 1 つにパッケージ化 |

それぞれの **概要だけ** ここで把握し、詳細は次の章で深掘りします。

---

## 1️⃣ Skills（`.claude/skills/`）★ 2026 の新標準

**何？** よく使う定型作業を「Claude 用のマニュアル」としてまとめた仕組み。
名前を呼ぶか、Claude が自動判定で実行します。

**最小例**:
```markdown
---
name: daily-note
description: 今日の作業ログを daily/YYYY-MM-DD.md に書き出す
---

# Daily Note Skill
今日の日付で daily/ に Markdown ファイルを作り、テンプレを埋めてください。
```

公式リファレンス: <https://support.claude.com/en/articles/12512198-creating-custom-skills>
公式リポ: <https://github.com/anthropics/skills>

> ℹ️ 昔は `.claude/commands/*.md` の slash commands が中心でしたが、**2026 年は Skills に統合** されました。新しく作るなら Skills。

詳細: [`docs/05-skills-and-commands.md`](./05-skills-and-commands.md)

---

## 2️⃣ Slash Commands

`/help`, `/clear`, `/compact`, `/model`, `/plugin`, `/init`, `/review` 等の **組み込みコマンド**。
プロジェクト固有の Slash Commands は **Skill に置き換わりつつある** が、互換性は残っています。

---

## 3️⃣ Subagents（`.claude/agents/`）

**何？** 親 Claude が別の Claude を「サブエージェント」として呼び出し、**並列タスク**や**専門タスク**を任せる仕組み。
親のコンテキスト窓を汚さず、軽い検索や調査を任せられます。

**最小例**: [`/.claude/agents/researcher.md`](../.claude/agents/researcher.md)（このリポにサンプル）

詳細: [`docs/06-subagents.md`](./06-subagents.md)

---

## 4️⃣ Hooks（`.claude/settings.json`）

**何？** 「特定の操作の前後に、必ず実行されるシェルコマンド」を仕込む機能。
AI の気分に左右されない**決定的**な動作を担保します。

**典型的なイベント**:
- `SessionStart` — セッション開始時
- `PreToolUse` / `PostToolUse` — ツール（Bash/Edit/Write 等）の前後
- `UserPromptSubmit` — ユーザがメッセージを送った直後
- `Stop` — セッション終了時
- `PreCompact` — コンテキスト圧縮直前

**例**:
- ファイルを保存したら自動で prettier / ESLint 実行
- `rm -rf` を打とうとしたらブロック
- セッション開始時に `git status` を Claude に見せる

詳細: [`docs/07-hooks.md`](./07-hooks.md)

---

## 5️⃣ MCP（Model Context Protocol）サーバー

**何？** Claude（や他の AI）が **外部ツール** (Notion / Google Drive / GitHub / Slack / DB 等) と話すための **公開標準プロトコル**。
公式: <https://modelcontextprotocol.io/>

**接続例**:
```json
// .mcp.json
{
  "mcpServers": {
    "notion": {
      "command": "npx",
      "args": ["-y", "@notionhq/notion-mcp-server"],
      "env": { "NOTION_API_KEY": "..." }
    }
  }
}
```

詳細: [`docs/08-mcp.md`](./08-mcp.md)

---

## 6️⃣ Plugins & Marketplaces

**何？** Skills / Subagents / Hooks / MCP 設定を **1 つの GitHub リポにまとめた配布パッケージ**。
`/plugin marketplace add <repo>` で誰でも導入できます。

**例**:
```text
/plugin marketplace add anthropics/skills
/plugin install document-skills@anthropic-agent-skills
/plugin install superpowers@claude-plugins-official
```

これにより、**Excel/PDF/PowerPoint 操作**や **Jesse Vincent の Superpowers** がワンコマンドで手に入ります。

詳細: [`docs/09-plugins.md`](./09-plugins.md)

---

## 🌟 もう 1 つ：Plan Mode / Auto-Accept / Verification Loop

これは「機能」というよりは **使い方の作法**。
- **Plan Mode** (`Shift+Tab`): 実行前に計画レビュー
- **Auto-Accept** (`Tab`): 承認済みプランを高速実行
- **Verification Loop**: コミット前に typecheck → test → lint

詳細: [`docs/10-workflows.md`](./10-workflows.md)

---

次へ: [`05-skills-and-commands.md`](./05-skills-and-commands.md)
