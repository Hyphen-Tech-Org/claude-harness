<div align="center">

# 🤖 Claude Code Starter Kit

**誰でも Claude Code を起動し、自分のタスクに活かせるようになるためのスタータキット。**
_A hands-on starter kit for using Claude Code — Anthropic's agentic CLI — on real work, in 2026._

<br />

[![Claude Code](https://img.shields.io/badge/Claude_Code-Powered-8A2BE2?style=for-the-badge&logo=anthropic&logoColor=white)](https://www.anthropic.com/claude-code)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](./LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=for-the-badge)](./CONTRIBUTING.md)
[![Docs: 日本語](https://img.shields.io/badge/docs-日本語-red?style=for-the-badge)](#-学習ロードマップ)

<br />

**[🎯 目的](#-このリポジトリの目的)** •
**[🚀 5 分クイックスタート](#-5-分クイックスタート)** •
**[📚 学習ロードマップ](#-学習ロードマップ)** •
**[🌏 エコシステム](docs/13-ecosystem.md)** •
**[🤝 Contributing](./CONTRIBUTING.md)**

</div>

---

## 🎯 このリポジトリの目的

> 「営業でも、デザイナーでも、CEO でも、コードを書いたことが無い人でも —
> **今日から Claude Code を起動して、自分の仕事に AI を使える** ようになる。」

Claude Code は Anthropic 公式のエージェント型 CLI（コマンドラインツール）です。
このリポジトリは **2026 年時点の最新機能**（Skills / Subagents / Hooks / MCP / Plugins / Plan Mode / Worktree）を、
公式ドキュメントと信頼できる OSS リポを 1 次情報として参照しながら、
ゼロから 1 ステップずつ学べるように構成しています。

- ✅ ターミナル / Git / GitHub をゼロから解説
- ✅ Claude Code 公式ドキュメント [`code.claude.com`](https://code.claude.com/docs/en/overview) と整合
- ✅ 業界の代表的 OSS（Anthropic skills / Superpowers / awesome-claude-code 等）への動線
- ✅ Plan Mode → Auto-accept → Verification Loop の **Boris 流ワークフロー**
- ✅ 4 窓並列ワークフロー（git worktree）
- ✅ 営業・経理・マーケ・経営など **非エンジニア向けの実用例**

> 💡 **このリポ自体が教材です。**
> `docs/` を上から順に読み、`examples/` で手を動かし、`playground/` で自由に遊んでください。

---

## 🚀 5 分クイックスタート

### 1. Claude Code をインストール

[公式インストーラ](https://code.claude.com/docs/en/setup):

```bash
# macOS / Linux
curl -fsSL https://claude.ai/install.sh | bash

# Windows (PowerShell)
irm https://claude.ai/install.ps1 | iex
```

Homebrew / WinGet を使いたい場合:

```bash
brew install --cask claude-code         # macOS / Linux
winget install Anthropic.ClaudeCode     # Windows
```

> ⚠️ `npm install -g @anthropic-ai/claude-code` は公式に非推奨。新規導入は上記の方法を使ってください。

### 2. このリポを clone して入る

```bash
git clone https://github.com/niki-nakamura/claude-code-starter-kit.git
cd claude-code-starter-kit
```

### 3. Claude Code を起動

```bash
claude
```

最初のプロンプトで、こう打ってみましょう:

```
このリポの README.md と CLAUDE.md を読んで、僕が今日やるべきことを 3 つ提案して。
```

これだけで、Claude はリポを読み、コンテキストを理解し、提案を返します。

### 4. （任意）公式マーケットプレイスから Skills を追加

```text
/plugin marketplace add anthropics/skills
/plugin install example-skills@anthropic-agent-skills
```

> 詳細: [`docs/03-first-session.md`](./docs/03-first-session.md)

---

## 📚 学習ロードマップ

順番に読むのを推奨。**1 章 10〜15 分**、全部で 2〜3 時間で 1 周できます。

| # | ドキュメント | 内容 |
|---|---|---|
| 00 | [Overview](./docs/00-overview.md) | TL;DR / このリポの読み方 |
| 01 | [Prerequisites](./docs/01-prerequisites.md) | ターミナル・コマンドラインの基礎 |
| 02 | [Installation](./docs/02-installation.md) | Win / Mac / Linux 別インストール手順 |
| 03 | [First Session](./docs/03-first-session.md) | 起動・最初の会話・基本キー |
| 04 | [Core Features](./docs/04-core-features.md) | Skills / Subagents / Hooks / MCP / Plugins 概要 |
| 05 | [Skills & Slash Commands](./docs/05-skills-and-commands.md) | 自分用 Skill / `/コマンド` の作り方 |
| 06 | [Subagents](./docs/06-subagents.md) | サブエージェントで並列処理 |
| 07 | [Hooks](./docs/07-hooks.md) | 自動化の決定打：イベントフック |
| 08 | [MCP Servers](./docs/08-mcp.md) | 外部ツール（Notion / GitHub / Drive 等）接続 |
| 09 | [Plugins](./docs/09-plugins.md) | プラグインとマーケットプレイス |
| 10 | [Workflows](./docs/10-workflows.md) | Plan Mode / Auto-accept / Verification Loop |
| 11 | [Multi-window (4 窓)](./docs/11-multi-window.md) | git worktree + 並列セッション |
| 12 | [Best Practices](./docs/12-best-practices.md) | Boris 流・YAGNI・No 過剰抽象化 |
| 13 | [Ecosystem 2026](./docs/13-ecosystem.md) | **公的 OSS リポ・信頼できる情報源カタログ** |
| 14 | [Troubleshooting](./docs/14-troubleshooting.md) | よくあるエラーと対処 |
| 15 | [Glossary](./docs/15-glossary.md) | 用語集 |
| **16** | **[Case Studies](./docs/16-case-studies.md)** | **🆕 実例・成功事例（Felix / Ruflo Swarm / Paperclip / OpenClaw / Superpowers）** |

---

## 🧪 ハンズオン例 (`examples/`)

| 例 | 何を学ぶか | 想定時間 |
|---|---|---|
| [01-hello-world](./examples/01-hello-world/) | Claude Code の初対話、ファイル生成 | 5 分 |
| [02-research-task](./examples/02-research-task/) | サブエージェントで Web リサーチ | 15 分 |
| [03-data-cleanup](./examples/03-data-cleanup/) | CSV クレンジング、表記揺れ統一 | 10 分 |

---

## 🏗️ リポ構造

```
claude-code-starter-kit/
├── README.md                     ← この入口
├── CLAUDE.md                     ← Claude 用プロジェクト指示（テンプレ）
├── LICENSE                       ← MIT
├── CONTRIBUTING.md
├── .gitignore
├── .claude/
│   ├── settings.json             ← 安全な hook 設定（例）
│   ├── agents/researcher.md      ← サブエージェント例
│   ├── skills/daily-note/SKILL.md ← Skill 例
│   └── commands/                 ← 旧 slash commands（互換）
├── docs/                         ← 学習ドキュメント 16 本
├── examples/                     ← ハンズオン
└── playground/                   ← 自由に書き換えてよい遊び場
```

---

## 🌏 もっと知る — Curated Ecosystem

[`docs/13-ecosystem.md`](./docs/13-ecosystem.md) に **2026 年現在で最も信頼できる Claude Code 関連 OSS** をスター数つきで整理してあります。例:

- **公式**: [`anthropics/claude-code`](https://github.com/anthropics/claude-code) / [`anthropics/skills`](https://github.com/anthropics/skills) / [`anthropics/claude-cookbooks`](https://github.com/anthropics/claude-cookbooks)
- **メジャー OSS**: [`obra/superpowers`](https://github.com/obra/superpowers) (189k★, Jesse Vincent の Skills フレームワーク) / [`ruvnet/ruflo`](https://github.com/ruvnet/ruflo) (50k★, Multi-agent for Claude Code) / [`paperclipai/paperclip`](https://github.com/paperclipai/paperclip) (65k★, ゼロ人類従業員企業) / [`wshobson/agents`](https://github.com/wshobson/agents) (35k★, マルチエージェント) / [`hmans/beans`](https://github.com/hmans/beans) (768★, フラットファイル issue tracker)
- **キュレーション**: [`hesreallyhim/awesome-claude-code`](https://github.com/hesreallyhim/awesome-claude-code) / [`VoltAgent/awesome-claude-code-subagents`](https://github.com/VoltAgent/awesome-claude-code-subagents)
- **Hooks**: [`disler/claude-code-hooks-mastery`](https://github.com/disler/claude-code-hooks-mastery)
- **セキュリティ Skills**: [`trailofbits/skills`](https://github.com/trailofbits/skills)

---

## 🤝 Contributing

PR / Issue ともに歓迎です。詳細は [`CONTRIBUTING.md`](./CONTRIBUTING.md)。

このリポは **MIT License**。あなたの社内ハンドブックの叩き台にしてもらって構いません。

---

## 📮 Credits & Sources

すべての引用元は 1 次情報のみ。スター数は 2026-05 時点の公開値（GitHub REST API 実測）。

- [Claude Code 公式ドキュメント](https://code.claude.com/docs/en/overview)
- [Anthropic Engineering — Equipping agents with Skills](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills)
- [Jesse Vincent — Superpowers](https://github.com/obra/superpowers)
