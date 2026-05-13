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

- リポ: [`obra/superpowers`](https://github.com/obra/superpowers) ⭐️ 189k
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

- リポ: [`hmans/beans`](https://github.com/hmans/beans) ⭐️ 768
- 何？: **人間とロボット用の、CLI ベース・フラットファイルの issue tracker**
- なぜ嬉しい？: Notion / Jira を立てずに、Markdown ファイルでタスクを管理し、Claude にもそれを認識させられる
- Claude Code 連携: `SessionStart` / `PreCompact` hooks に `beans prime` を仕込むだけ
- 設計思想: 「タスクの状態をリポと一緒に Git で履歴管理する」

## 🧰 学習向けリポ

| リポ | ⭐️ | 内容 |
|---|---|---|
| [`disler/claude-code-hooks-mastery`](https://github.com/disler/claude-code-hooks-mastery) | 3.7k | Hooks の体系的学習教材 |
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

## 🤖 「ゼロ人類従業員」エコシステム — Paperclip / OpenClaw / Felix

2026 年に急成長中の **「人間ゼロで会社を回す」OSS スタック** を紹介します。
本キットでは **公開された 1 次情報のみ** を引用しています。

### Paperclip — AI エージェント会社の OSS オーケストレータ

- リポ: [`paperclipai/paperclip`](https://github.com/paperclipai/paperclip) ⭐️ 65k / MIT
- 公式サイト: <https://paperclip.ing>
- 何？: **「ゼロ人類従業員企業」向けの OSS 会社運営基盤**
- 公式説明:
  > _"If OpenClaw is an _employee_, Paperclip is the _company_."_
  > Node.js サーバ + React UI。AI エージェントのチームに**ゴール**を割り当て、組織図 / 予算 / ガバナンスを管理。
- 対応エージェント: **Claude Code** / OpenClaw / Codex / Cursor / Bash / HTTP
- 関連 MCP サーバ: [`Wizarck/paperclip-mcp`](https://github.com/Wizarck/paperclip-mcp) (16★)、[`darljed/paperclip-mcp`](https://github.com/darljed/paperclip-mcp) (2★)

### OpenClaw — パーソナル AI アシスタント（OSS）

- リポ: [`openclaw/openclaw`](https://github.com/openclaw/openclaw) ⭐️ 371k / MIT
- 公式サイト: <https://openclaw.ai>
- 何？: **自分のデバイスで動かす個人 AI アシスタント** (macOS/iOS/Android/Win)
- 対応チャンネル: WhatsApp / Telegram / Slack / Discord / Signal / iMessage / Teams / LINE 等 22+
- 関連: [`VoltAgent/awesome-openclaw-skills`](https://github.com/VoltAgent/awesome-openclaw-skills) (48k★) — Skills カタログ
- 関連: [`openclaw/clawhub`](https://github.com/openclaw/clawhub) (8.6k★) — 公式 Skill ディレクトリ
- 関連 MCP / アダプタ: [`NousResearch/hermes-paperclip-adapter`](https://github.com/NousResearch/hermes-paperclip-adapter) (1.2k★) — Nous Research の Hermes を Paperclip "従業員" として動かす

### Felix — Nat Eliason の 1 人 AI 起業実験

- 主体: Nat Eliason（クリプト出身の作家・起業家、[@nateliason](https://x.com/nateliason)）
- 公開リポ:
  - [`Nateliason/felixcraft-site`](https://github.com/Nateliason/felixcraft-site) — Felix の企業サイト・ダッシュボード・Stripe/暗号通貨収益自動表示
  - [`Nateliason/paperclip`](https://github.com/Nateliason/paperclip) — Paperclip fork
  - [`Nateliason/sondex-oss`](https://github.com/Nateliason/sondex-oss) (4★) — OpenClaw エージェント用セルフホスト記憶層 (Postgres、クラウド依存なし)
  - [`Nateliason/send-to-openclaw`](https://github.com/Nateliason/send-to-openclaw) (70★) — Chrome 拡張：ページ内容を OpenClaw に送信
- 何？: **「人間の従業員 0 人で売上 100 万ドル」を目標** にした、Paperclip + OpenClaw による 1 人運営 AI スタートアップ実験
- 実績（公開情報）:
  - 2026 年 1 月後半、シード 1,000 ドルで開始
  - 数週間で売上 ≈ 20 万ドル：Stripe 経由 $100,570 + 47.87 ETH（≈ $94,973）
- 学べる点: PRD ベース運営、Stripe/Web3 同時収益、ダッシュボード自動化、AI エージェントへの権限・予算設計
- ケーススタディは Paperclip 公式リポ内 `07-使用案例/案例-Nat Eliason 的 AI 创业实验.md` にも収録

### Ruflo — Claude Code 向けマルチエージェント・オーケストレーション

- リポ: [`ruvnet/ruflo`](https://github.com/ruvnet/ruflo) ⭐️ 50k / MIT / TypeScript
- 公式サイト: <https://cognitum.one> / UI ベータ: <https://flo.ruv.io>
- 著者: rUv ([`@ruvnet`](https://github.com/ruvnet))
- 旧名: **Claude Flow**（リブランドして Ruflo に改名）
- 公式説明:
  > _"Multi-agent AI orchestration for Claude Code. Orchestrate 100+ specialized AI agents across machines, teams, and trust boundaries."_
- 何ができる？:
  - **Swarm（群知能）**: 100+ の専門エージェントが自己組織化
  - **Self-Learning Memory**: タスク毎に学び、セッションを跨いで記憶
  - **Federation**: マシン間で安全にエージェント通信、データ漏洩なし
  - **Hooks system**: タスクを自動ルーティング、成功パターンを学習、バックグラウンドでエージェント調整
- インストール:
  ```bash
  # Path A: Claude Code Plugin（軽量、slash commands のみ）
  /plugin marketplace add ruvnet/ruflo
  /plugin install ruflo-core@ruflo

  # Path B: フルインストール (98 agents / 60+ commands / 30 skills / MCP / hooks)
  npx ruvflo init
  ```
- 関連: [`ruvnet/agentic-flow`](https://github.com/ruvnet/agentic-flow) (697★) — Claude Code / Agent SDK で低コスト代替モデルに切替・クラウドデプロイ

### 関連: ruvnet エコシステム

- [`ruvnet/RuVector`](https://github.com/ruvnet/RuVector) (4k★) — Rust 製の高速ベクトル GNN メモリ DB（Ruflo の記憶層に使われる）
- [`ruvnet/open-claude-code`](https://github.com/ruvnet/open-claude-code) (278★) — Claude Code CLI のリバースエンジニアリング再構築
- [`ruvnet/sparc`](https://github.com/ruvnet/sparc) (456★) — SPARC 開発方法論（Specification, Pseudocode, Architecture, Refinement, Completion）

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
