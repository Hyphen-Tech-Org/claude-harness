# Example 02 — Research Task with a Subagent

> 想定時間: 15 分
> ゴール: サブエージェント (`researcher`) を使って、Web リサーチを並列化する

## 前提

- このリポをすでに clone してある
- `.claude/agents/researcher.md` が存在する（このリポに同梱済み）

## 手順

### 1. 起動

```bash
cd examples/02-research-task
claude
```

### 2. 1 つだけ走らせてみる

```
researcher で「2026 年に注目されている Claude Code 用 hooks リポ」を調べて、
スター数つきで表にして報告して。
```

→ サブエージェントが Web を調べ、200 ワード以内で報告します。
報告は親 Claude のコンテキストに入りますが、調査の生ログは入りません（= コンテキスト窓を消費しない）。

### 3. 並列で 2 つ走らせる

1 つのメッセージで複数の依頼:

```
以下を並列で:
- researcher: GitHub における Claude Code 関連のスター数トップ 5
- researcher: MCP Server の代表的な公式リファレンス実装の URL 一覧
```

→ 2 つが同時に走り、それぞれの結果が返ります。

### 4. 結果を保存

```
さっき調べた 2 つの結果を、findings.md にまとめて保存して。
```

→ Claude が `findings.md` を作ります。

### 5. 終了

`Ctrl + C` / `git status` / 気に入った変更を commit。

## ハマりどころ

- **researcher が起動しない**: 親 Claude が「自分で答えた方が早い」と判断することも。「必ず researcher に投げて」と明示する
- **報告が長い**: `.claude/agents/researcher.md` で「200 ワード以内」と制限済み。それでも長ければ Skill を書き直す
- **同じものを並列で呼ぶと壊れる**: 同じ subagent を全く同じ引数で並列に走らせると無駄。タスクは少しずつ違う角度にする

## 学べたこと

- ✅ サブエージェントの起動方法
- ✅ コンテキスト窓を温存する技術
- ✅ 並列化で時短する感覚

## 次へ

[`examples/03-data-cleanup/`](../03-data-cleanup/) — CSV を Claude に整形させます。
