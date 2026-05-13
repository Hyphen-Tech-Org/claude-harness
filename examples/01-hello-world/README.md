# Example 01 — Hello, Claude Code

> 想定時間: 5 分
> ゴール: Claude Code を起動して、ファイル生成・編集を体感する

## 手順

### 1. このフォルダで Claude Code を起動

```bash
cd examples/01-hello-world
claude
```

### 2. 最初の依頼

```
このフォルダに `hello.md` というファイルを作って、
あなた（Claude）の自己紹介を 3 行で書いて。
```

→ Claude が `hello.md` を作るはずです。

### 3. 編集の依頼

```
hello.md に「今日の日付」と「使っているモデル名」を 2 行追加して。
```

→ ファイルを編集して見せてくれます。

### 4. 中身の確認

```bash
cat hello.md
```

### 5. Plan Mode を試す

`Shift + Tab` を押して Plan Mode に入り、こう言ってみる:

```
このフォルダに README.md があるけど、それを補強して、
このサンプルの目的・学びどころ・関連 docs リンクを追加して。
```

→ Claude が計画だけ出してきます。読んで Accept。

### 6. 終了

`Ctrl + C` でセッション終了。
`git status` で変更ファイルを確認。気に入った変更だけ `git add` & commit。

## 学べたこと

- ✅ Claude Code がカレントディレクトリを文脈にすること
- ✅ ファイル生成・編集を自然言語で頼めること
- ✅ Plan Mode で「先に計画を見る」感覚

## 次へ

[`examples/02-research-task/`](../02-research-task/) — サブエージェントを試します。
