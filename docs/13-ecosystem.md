# 13. Ecosystem 2026 — 公的 OSS と信頼できる情報源カタログ

> **スター数は 2026-05 時点の GitHub REST API 実測値。**
> 1 次情報のみを引用。星 = 信頼の絶対指標ではないが、コミュニティ採用度の参考。

## 🎯 まず押さえるべき 5 つ（公式）

| リポ | ⭐️ | 内容 |
|---|---|---|
| [`anthropics/claude-code`](https://github.com/anthropics/claude-code) | 123k | Claude Code 本体。Issue / discussion はここ |
| [`anthropics/skills`](https://github.com/anthropics/skills) | 133k | 公式の Agent Skills リポジトリ。`document-skills`（docx/pdf/pptx/xlsx）を含む |
| [`anthropics/claude-cookbooks`](https://github.com/anthropics/claude-cookbooks) | 42k | Claude API / SDK の公式ノートブック集 |
| [Claude Code Docs](https://code.claude.com/docs/en/overview) | — | 公式ドキュメント。最新は常にこちら |
| [Anthropic Engineering Blog](https://www.anthropic.com/engineering) | — | Skills の設計思想、エージェント論文を含む 1 次情報 |

## 🚀 メジャーな OSS フレームワーク

### Superpowers — Jesse Vincent (`obra`)

- リポ: [`obra/superpowers`](https://github.com/obra/superpowers) ⭐️ 188k
- 何？: **エージェント向け Skill フレームワーク + 開発方法論**
- 入っている: TDD / debugging / planning / parallel agents / git worktrees / code review …
- 対応: Claude Code / Codex CLI / Cursor / Gemini CLI / Factory Droid / GitHub Copilot CLI / OpenCode
- インストール:
  ```text
  /plugin install superpowers@claude-plugins-official
  ```
- 哲学: _「あなたのコーディングエージェントに Superpowers を授ける」_
- 公式 README 抜粋:
  > _"Once you say 'go', it launches a subagent-driven-development process... It's not uncommon for Claude to be able to work autonomously for a couple hours at a time without deviating from the plan."_

### wshobson/agents — マルチエージェント orchestration

- リポ: [`wshobson/agents`](https://github.com/wshobson/agents) ⭐️ 35k
- 何？: Claude Code 向けの **インテリジェント・オートメーション + マルチエージェント orchestration**
- 用途: 並列に複数のエージェントを協調させたい複雑タスク

### Beans — フラットファイル issue tracker

- リポ: [`hmans/beans`](https://github.com/hmans/beans) ⭐️ 767
- 何？: **人間とロボット用の、CLI ベース・フラットファイルの issue tracker**
- なぜ嬉しい？: Notion / Jira を立てずに、Markdown ファイルでタスクを管理し、Claude にもそれを認識させられる
- Claude Code 連携: `SessionStart` / `PreCompact` hooks に `beans prime` を仕込むだけ
- 設計思想: 「タスクの状態をリポと一緒に Git で履歴管理する」

## 🧰 学習向けリポ

| リポ | ⭐️ | 内容 |
|---|---|---|
| [`disler/claude-code-hooks-mastery`](https://github.com/disler/claude-code-hooks-mastery) | 3.6k | Hooks の体系的学習教材 |
| [`trailofbits/skills`](https://github.com/trailofbits/skills) | 5.2k | セキュリティ研究 Skill 集（Trail of Bits 公式） |

## 📚 キュレーション（Awesome Lists）

| リポ | ⭐️ | 特徴 |
|---|---|---|
| [`hesreallyhim/awesome-claude-code`](https://github.com/hesreallyhim/awesome-claude-code) | 43k | 最大手の Awesome List |
| [`VoltAgent/awesome-claude-code-subagents`](https://github.com/VoltAgent/awesome-claude-code-subagents) | 19k | サブエージェント 100+ |
| [`rohitg00/awesome-claude-code-toolkit`](https://github.com/rohitg00/awesome-claude-code-toolkit) | 1.6k | 包括的なツールキット |
| [`davepoon/buildwithclaude`](https://github.com/davepoon/buildwithclaude) | 2.9k | Skills/Agents/Commands/Hooks ハブ |
| [`rahulvrane/awesome-claude-agents`](https://github.com/rahulvrane/awesome-claude-agents) | 347 | サブエージェント特化 |

## 🔌 MCP サーバ

- 公式リファレンス実装: <https://github.com/modelcontextprotocol/servers>
- MCP 仕様: <https://modelcontextprotocol.io/>
- SDK: <https://github.com/modelcontextprotocol>

代表的なサーバ:
- `@notionhq/notion-mcp-server` — Notion
- `@modelcontextprotocol/server-github` — GitHub
- `@modelcontextprotocol/server-gdrive` — Google Drive
- `@modelcontextprotocol/server-postgres` — PostgreSQL
- `@modelcontextprotocol/server-filesystem` — Filesystem

## 🎓 役立つ単体 Skills（コミュニティ）

スター数 1k+ から抜粋（2026-05 時点、`gh search` 実測）:

| Skill | ⭐️ | 用途 |
|---|---|---|
| [`OthmanAdi/planning-with-files`](https://github.com/OthmanAdi/planning-with-files) | 21k | Manus 流の永続 markdown プランニング |
| [`blader/humanizer`](https://github.com/blader/humanizer) | 18k | AI 生成っぽい文章を人間化 |
| [`alirezarezvani/claude-skills`](https://github.com/alirezarezvani/claude-skills) | 14k | 263+ Skill 集（multi-agent 対応） |
| [`SimoneAvogadro/android-reverse-engineering-skill`](https://github.com/SimoneAvogadro/android-reverse-engineering-skill) | 5.7k | Android リバースエンジニアリング |
| [`Aaronontheweb/dotnet-skills`](https://github.com/Aaronontheweb/dotnet-skills) | 923 | .NET 開発向け |

## ⚠️ "Felix" / "Paperclip" / "Reflo" など内部呼称について

ユーザコミュニティで言及される一部の内部プロジェクト名（例: Paperclip, Felix, Reflo）は、特定組織の **私的プロジェクト**であり公開 OSS ではありません。
本キットでは **公開された 1 次情報のみ** を引用する方針のため、上記カタログには含めていません。
類似のアーキテクチャは Superpowers / wshobson/agents / beans 等で公開されています。

## 📡 情報ソース（公式 / 公式に近い）

- 公式 X (Twitter):
  - [@AnthropicAI](https://x.com/AnthropicAI)
  - [@claudeai](https://x.com/claudeai)
- Discord:
  - [Anthropic Discord](https://anthropic.com/discord) — Claude Code 公式チャンネル
- リリースノート / Changelog:
  - <https://code.claude.com/docs/en/changelog>
  - GitHub Releases: <https://github.com/anthropics/claude-code/releases>
- Anthropic 公式ブログ:
  - <https://www.anthropic.com/news>
  - <https://www.anthropic.com/engineering>

## 🧠 Claude API / Agent SDK 関連

| リポ | 内容 |
|---|---|
| [`anthropics/claude-cookbooks`](https://github.com/anthropics/claude-cookbooks) | 公式ノートブック |
| [Claude Agent SDK docs](https://docs.claude.com/en/api/agent-sdk) | エージェント SDK 公式 |

---

次へ: [`14-troubleshooting.md`](./14-troubleshooting.md)
