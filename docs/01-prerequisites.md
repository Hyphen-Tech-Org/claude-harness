# 01. Prerequisites — ターミナルとコマンドラインの基礎

> 「黒い画面」が苦手でも大丈夫。ここでは **最低限の 10 個のコマンドだけ** 押さえれば、Claude Code に入門できます。

## 🖥️ ターミナル（Terminal）とは

ターミナル＝**コンピュータに「文字で命令を出す」窓**。マウスの代わりにキーボードで指示を出す画面です。
GUI（マウス操作）より早く、複雑なことができます。Claude Code はこの窓の中で動きます。

| OS | 標準ターミナル | 推奨（より使いやすい） |
|---|---|---|
| **macOS** | ターミナル.app | iTerm2 / Warp |
| **Windows** | PowerShell / コマンドプロンプト | **Windows Terminal**（Microsoft Store） / Git Bash |
| **Linux** | GNOME Terminal 等 | そのままで OK |

## 🔧 最低限の 10 コマンド

| コマンド | 意味 | 例 |
|---|---|---|
| `pwd` | 今いる場所を表示 (Print Working Directory) | `pwd` → `/Users/niki/projects` |
| `ls` | 中身を一覧 | `ls` / `ls -la`（隠しファイルも） |
| `cd <dir>` | 場所を移動 (Change Directory) | `cd docs/` / `cd ..`（1 つ上） |
| `mkdir <name>` | フォルダ作成 | `mkdir new-project` |
| `touch <file>` | 空ファイル作成 | `touch hello.md` |
| `cat <file>` | ファイル内容を表示 | `cat README.md` |
| `cp src dst` | コピー | `cp a.txt b.txt` |
| `mv src dst` | 移動 / 名前変更 | `mv a.txt docs/` |
| `rm <file>` | 削除（**戻せない！**） | `rm temp.txt` |
| `echo "text"` | テキスト出力 | `echo "hi" > hi.txt` |

> ⚠️ **`rm -rf` は人類最強の自爆ボタン** — `/` を消しに行くと PC が起動不能になります。Claude Code は安全対策がありますが、自分で打つ時は深呼吸してから。

## 🌿 Git とは（バージョン管理）

Git = **「ファイルの履歴を全部記録できるタイムマシン」**。
「3 日前の状態に戻す」「複数人で同じファイルを編集してもケンカしない」を実現します。

| 用語 | 意味 |
|---|---|
| **Repository（リポ／repo）** | プロジェクトのフォルダ + 全履歴の置き場 |
| **Commit** | 「ここまでを 1 区切り」と記録するスナップショット |
| **Branch（ブランチ）** | 並行作業用の分岐線。`main` が幹 |
| **Merge（マージ）** | 別ブランチの変更を取り込む |
| **Remote（リモート）** | GitHub などの「クラウド側の保管庫」 |
| **Pull / Push** | リモートから取得 / リモートへ送信 |

### 🌳 Worktree（ワークツリー）— ★ 4 窓ワークフローの肝

通常 `git checkout` でブランチを切り替えると、フォルダの中身が**書き換わる**ため、複数の作業を同時にできません。
`git worktree add` を使うと、**同じリポを別のフォルダに、別ブランチで複製** できるので、**並列に Claude Code を 4 つ起動** できます。

```bash
# 別ブランチ用に worktree を切り出す
git worktree add ../my-repo-feature-x feature-x
# その worktree を移動して別 Claude セッション起動
cd ../my-repo-feature-x && claude
```

詳細は [`docs/11-multi-window.md`](./11-multi-window.md)。

## 🐙 GitHub とは

GitHub = **Git のリモート保管庫を SaaS にしたもの**。世界中の開発者の共通リポジトリ置き場。

| 用語 | 意味 |
|---|---|
| Issue | バグ・要望のチケット |
| Pull Request (PR) | 「この変更を main に取り込んで」という提案 |
| Fork | 他人のリポを自分用にコピー |
| Clone | リポを自分の PC にダウンロード |

## ✅ チェック

ターミナルを開いて、以下が動けば準備 OK:

```bash
pwd          # 現在地が出る
git --version    # 例: git version 2.43.0
gh --version     # 例: gh version 2.40.0 (GitHub CLI / 任意)
```

`git` が無ければ:
- macOS: `brew install git`
- Windows: <https://git-scm.com/download/win>
- Linux: `sudo apt install git` 等

---

次へ: [`02-installation.md`](./02-installation.md)
