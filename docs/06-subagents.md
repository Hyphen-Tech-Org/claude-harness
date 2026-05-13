# 06. Subagents — サブエージェントで並列処理

> 公式: <https://code.claude.com/docs/en/sub-agents>

## サブエージェントとは

親 Claude セッションが、**独立したコンテキスト窓を持つ別の Claude** を呼び出して仕事を任せる仕組み。

```
[親 Claude] ──┬── [Subagent 1: researcher] (Web 調査)
              ├── [Subagent 2: code-reviewer] (PR チェック)
              └── [Subagent 3: test-runner] (テスト実行)
```

**メリット**:
- 親のコンテキスト窓を汚さない（調査の生ログを読み込ませなくて済む）
- **並列実行**で時短
- 専門特化したシステムプロンプトを持たせられる

## サブエージェントを書く

`.claude/agents/<name>.md` に Markdown ファイルを置きます。

```markdown
---
name: researcher
description: Web リサーチ専門。最新の技術トレンドや競合情報を調べて、結論だけ短く報告する。
tools:
  - WebSearch
  - WebFetch
  - Grep
---

# Researcher Agent

あなたは技術リサーチ専門のエージェントです。
- 結論を先に 3 行で
- 必ず引用元 URL を併記
- 200 ワード以内で報告
- 推測は書かず、出典で裏取りできた事実のみ
```

### Frontmatter

| キー | 必須 | 内容 |
|---|---|---|
| `name` | ✅ | 識別子 |
| `description` | ✅ | いつ呼ぶか |
| `tools` | 任意 | このエージェントに許可するツール（限定するほど安全） |

## サブエージェントを呼ぶ

親セッション内で:
```
researcher で「2026 年の Claude Code 周辺 OSS で星 1000 以上のもの」を調べて、表で報告して。
```

または Plan Mode で「これは researcher にやらせる」と Claude 自身が判断することもあります。

## 並列呼び出し

複数のサブエージェントを **1 回のメッセージで** 起動すると並列実行されます:

```
以下を並列で:
- researcher: 競合 A の最新動向
- researcher: 競合 B の最新動向
- code-reviewer: 直近の PR #123 をレビュー
```

→ 3 つが同時に走り、それぞれ結果を返します。

## いつ使う？いつ使わない？

| 使う | 使わない |
|---|---|
| Web 調査・横断検索 | 単一ファイルの編集（直接やった方が早い） |
| 大量のログ解析 | 即答できる質問 |
| コードレビュー（独立した視点） | 親が文脈を持っている連続タスク |
| 並列に走らせたい複数調査 | 結果が小さくて親に直接入れた方が早いもの |

> ⚠️ **やりすぎ注意**: サブエージェントは別セッションを起こす分、コストもかかります。「親で 30 秒で済む」ことを subagent に任せると本末転倒。

## このリポのサンプル

[`.claude/agents/researcher.md`](../.claude/agents/researcher.md) に最小例を置いています。

## 参考リポジトリ

- [`wshobson/agents`](https://github.com/wshobson/agents) — 35k★。マルチエージェント orchestration のリファレンス実装
- [`VoltAgent/awesome-claude-code-subagents`](https://github.com/VoltAgent/awesome-claude-code-subagents) — 19k★。100+ のサブエージェント集
- [`rahulvrane/awesome-claude-agents`](https://github.com/rahulvrane/awesome-claude-agents) — キュレーション

---

次へ: [`07-hooks.md`](./07-hooks.md)
