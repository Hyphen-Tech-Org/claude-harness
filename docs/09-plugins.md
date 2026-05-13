# 09. Plugins & Marketplaces

> 公式: <https://code.claude.com/docs/en/plugins>

## Plugin とは

Skills / Subagents / Hooks / MCP 設定を **1 つの GitHub リポにまとめた配布パッケージ**。
`/plugin marketplace add` と `/plugin install` で、誰でもワンコマンドで導入できます。

## 公式マーケットプレイス

```text
/plugin marketplace add anthropics/skills
/plugin install document-skills@anthropic-agent-skills
/plugin install example-skills@anthropic-agent-skills
```

- `document-skills` — Word / Excel / PowerPoint / PDF を Claude に読ませる / 出力させる
- `example-skills` — 公式のリファレンス Skill 集

[anthropics/skills README](https://github.com/anthropics/skills) より:
> _"Skills are folders of instructions, scripts, and resources that Claude loads dynamically..."_

## コミュニティの定番マーケットプレイス

### Superpowers（Jesse Vincent）

```text
# Anthropic 公式マーケットプレイス経由
/plugin install superpowers@claude-plugins-official

# または Superpowers 専用マーケットプレイス
/plugin marketplace add obra/superpowers-marketplace
/plugin install superpowers@superpowers-marketplace
```

**入っている Skill 群**（[公式 README](https://github.com/obra/superpowers) より抜粋）:

| カテゴリ | Skill |
|---|---|
| Testing | `test-driven-development`, `verification-before-completion` |
| Debugging | `systematic-debugging` (root cause / defense-in-depth) |
| Planning | `brainstorming`, `writing-plans`, `executing-plans` |
| Parallel | `dispatching-parallel-agents`, `subagent-driven-development` |
| Code Review | `requesting-code-review`, `receiving-code-review` |
| Git | `using-git-worktrees`, `finishing-a-development-branch` |
| Meta | `writing-skills`, `using-superpowers` |

Superpowers は **Claude Code / Codex CLI / Cursor / Gemini CLI / GitHub Copilot CLI** など、複数のエージェントで動く設計です。

### Trail of Bits — セキュリティ Skill

```text
/plugin marketplace add trailofbits/skills
```

セキュリティ研究・脆弱性検出・監査ワークフローの Skill 集。
コードを公開する前のセキュリティチェックに有用。

### buildwithclaude（旧 davepoon/claude-code-subagents-collection）

<https://github.com/davepoon/buildwithclaude>

Skills / Agents / Commands / Hooks / Plugins を横断検索できるハブ。

## Plugin の管理

```text
/plugin                             ← UI 起動
/plugin list                        ← 導入済み一覧
/plugin marketplace list            ← 登録済みマーケット
/plugin uninstall <name>            ← 削除
```

## 自分の Plugin を作って配布する

```
my-plugin/
├── .claude-plugin.json     ← マニフェスト
├── skills/
│   └── my-skill/SKILL.md
├── agents/
│   └── my-agent.md
└── hooks/
    └── post-tool-use.sh
```

`.claude-plugin.json` の最小形:
```json
{
  "name": "my-plugin",
  "description": "...",
  "version": "0.1.0"
}
```

このリポを GitHub に push → 受け手が `/plugin marketplace add <user>/<repo>` で使えるようになります。

## 安全性のチェックリスト

導入前に最低これは見ましょう:
- ✅ リポのスター数・コミット履歴（メンテされているか）
- ✅ Skills / Hooks の中身を 1 度読む（任意コマンド実行を含む）
- ✅ 不要な permissions を要求していないか
- ✅ 公式 or 信頼できる著者か

「便利そう」で入れて Hook が裏で curl で外部にデータ送信、というシナリオを想像してください。

---

次へ: [`10-workflows.md`](./10-workflows.md)
