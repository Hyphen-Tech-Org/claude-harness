# 03. First Session — 起動・最初の会話・基本キー

## 1. 起動

```bash
cd <作業したいフォルダ>
claude
```

Claude Code は **現在のフォルダ（`pwd`）をプロジェクトルート** として読み込みます。
親方向に `CLAUDE.md` を探し、見つかれば自動的にコンテキストに入れます（hierarchical loading）。

## 2. 最初の会話例

```
このリポの README.md と docs/ を読んで、
僕がまず何を試すべきか 3 つ提案して。
```

```
playground/ の中に「来週の営業ロードマップ.md」というファイルを作って、
箇条書きで仮の項目を 5 つ入れて。
```

```
このリポを GitHub で公開するために、README に足りない要素を指摘して。
```

> 💡 **「ファイル名 + 何をしたいか」** を渡すのが最も伝わりやすいプロンプトのコツ。

## 3. 覚えておくキー / コマンド

| キー / コマンド | 効果 |
|---|---|
| `Enter` | メッセージ送信 |
| `Shift + Enter` | 改行（メッセージは送らない） |
| `Esc` × 2 | 直前の応答を中断 |
| `Ctrl + C` | セッション終了 |
| `↑ / ↓` | 過去メッセージを呼び出し |
| **`Shift + Tab`** | **Plan Mode に切り替え**（重要） |
| `Tab` | Auto-Accept Edit モード切替 |
| `/help` | コマンド一覧 |
| `/clear` | 会話履歴をクリア（コンテキスト圧縮対策） |
| `/compact` | 会話を要約して圧縮 |
| `/model` | モデル切替（Sonnet / Opus / Haiku） |
| `/plugin marketplace add <repo>` | プラグインマーケット追加 |
| `/plugin install <name>@<market>` | プラグイン導入 |

## 4. Plan Mode（★最重要）

`Shift + Tab` を押すと **Plan Mode** に入ります。Claude は **コードを書く前にまず計画を提示** し、あなたの承認を待ちます。

```
[Plan Mode]
1. README.md を読む
2. 不足セクションを洗い出す
3. CONTRIBUTING.md を新規作成
4. 既存 README に新セクション追加
```

承認すると Plan に沿って実行します。「依頼が曖昧で、勝手に色んなところを触られると困る」ときに必須。

詳細: [`docs/10-workflows.md`](./10-workflows.md)

## 5. 安全運用のために知っておくこと

- **トークンを Claude に渡さない**。`.env` を読ませる場合は中身ではなく `.env.example` を見せる。
- **大量データを貼り付けない**。長い CSV はファイルに保存して `cat ファイル名` を Claude に渡す。
- **`rm -rf` を Claude が打とうとしたら止める**。質問して、本当に必要か確認。
- **`git push` の前にコミット内容を確認**。`git diff --staged` で目視チェック。

## 6. セッションを終わるとき

```
お疲れさま。今日やった変更を 5 行でまとめて。
```

→ Claude が要約を出してくれます。
そのまま `git add . && git commit -m "..."`、または `/quick-commit` などのスラッシュコマンドで終了。

---

次へ: [`04-core-features.md`](./04-core-features.md)
