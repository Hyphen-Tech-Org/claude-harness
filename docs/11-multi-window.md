# 11. 4-Window Workflow — git worktree で並列セッション

> 公式: <https://git-scm.com/docs/git-worktree>
> 関連 Skill: `using-git-worktrees`（Superpowers 内）

## 4 窓ワークフローとは

ターミナル / IDE を **4 つ並べて、それぞれ別ブランチで Claude Code を走らせる** スタイル。
Boris Cherny ら Claude Code チームの公開動画・記事で広く知られた働き方です。

```
┌─────────────────┬─────────────────┐
│ 窓 1: main      │ 窓 2: feature-a │
│ レビュー / 統合 │ 機能 A 実装     │
├─────────────────┼─────────────────┤
│ 窓 3: feature-b │ 窓 4: docs      │
│ 機能 B 実装     │ ドキュメント    │
└─────────────────┴─────────────────┘
```

## なぜ並列にできるのか — git worktree

通常 `git checkout` でブランチを切り替えると、**ワーキングディレクトリが書き換わる** ため、同時に複数ブランチで作業できません。

`git worktree add` は **同じ Git リポを別のフォルダに、別ブランチで複製** します。それぞれの worktree は独立した「別フォルダ」なので、各々で Claude Code を起動できます。

## 基本コマンド

```bash
# 現在のリポに別ブランチの worktree を追加
git worktree add ../my-repo-feature-a feature-a

# 新規ブランチも同時に作成
git worktree add -b feature-b ../my-repo-feature-b

# 一覧
git worktree list

# 不要になった worktree を削除（ブランチは残る）
git worktree remove ../my-repo-feature-a
```

## 推奨：`/worktree` Slash Command

`.claude/commands/worktree.md` または Skill として定義:

```markdown
---
name: worktree
description: 引数で渡したブランチ名で worktree を切り、そこに移動して新しい Claude セッションを起動するための手順を案内する。
---

# /worktree

1. 引数のブランチ名 `$1` で `../<repo>-$1` に worktree を追加
2. 移動コマンドを出力
3. 新セッション起動コマンドを出力
```

## 4 窓運用のコツ

| Tip | 詳細 |
|---|---|
| **1 タスク = 1 セッション** | 1 窓で 2 つのタスクを同時にやらない。混線する |
| **窓 1 を「親 / 統合役」に固定** | main を持つ窓。レビューと merge 専用 |
| **同じファイルを 2 窓で触らない** | コンフリクトの元。タスク分割時に確認 |
| **冒頭で `pwd && git branch --show-current` を実行** | どの窓にいるか毎回確認 |
| **窓の Tab タイトルにブランチ名を付ける** | ターミナルアプリの設定で自動化 |
| **PostToolUse hook で他窓への影響を警告** | 共通設定ファイル編集時に出す |

## メモリ / Token の消費

4 窓並列は気持ちいいですが、コストもかかります:
- Claude Code 4 つ起動 = API コール 4 並列
- Pro プラン (月 $20) では現実的に **2 並列まで** が目安
- Max プラン (月 $100〜) で **4 並列**が安定

`/cost` コマンドで消費を確認できます。

## 競合タスクの場合は worktree でなく Agent Teams

worktree は **独立タスク** の並列に向いています。**協調が必要なタスク**（1 つのファイルを複数人で同時に書く等）は worktree ではなく:
- 単一セッションで Subagent を並列発火
- もしくは Agent Teams 機能（Claude Code 内蔵）

を使う方が、コンフリクトを避けられます。

## Superpowers の `using-git-worktrees`

[Superpowers](https://github.com/obra/superpowers) を入れると、`using-git-worktrees` Skill が自動発動し、worktree 運用のベストプラクティスを Claude が知った上で動きます。

```text
/plugin install superpowers@claude-plugins-official
```

---

次へ: [`12-best-practices.md`](./12-best-practices.md)
