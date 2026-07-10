# CLAUDE.md — claude-harness テンプレート

> このファイルは claude-harness のベース CLAUDE.md。
> プロジェクトにコピーして、プロジェクト固有のルールに書き換えて使う。
> 詳細: https://github.com/Hyphen-Tech-Org/claude-harness

## ハーネスエンジニアリングの基本方針

### Context Discipline（コンテキスト規律）

- 生データを会話に流さない。探索はサブエージェントに委譲し、結論だけ受け取る
- 同じ調査を二度しない。`harness/state.json` に記録して重複を防ぐ
- `/clear` はタスク区切りで使う。1タスク = 1セッション原則

### 実行規律

- 不明・未確認は事実で裏を取ってから実行（npm・GitHub Releases・公式ドキュメントが一次情報）
- 証明できないことをするな。前提は実行結果で裏付けてから宣言する
- 依頼されたことは必ず達成する。表面だけなぞる「やった風」は達成ではない

### 品質 > 速度

- Verification Loop: 変更 → typecheck → test → lint → commit
- ツールが動いた ≠ 達成。検証を通すまで Done と言わない

## 毎日の自動改善

`.claude/agents/harness-discovered/` に最新のハーネスパターンが毎日追加・更新される。
`agents/` ディレクトリ内の `.md` は Claude Code が agent doc として自動読み込み。

## コマンド

```bash
node harness/daily.mjs     # デイリーパイプライン実行（research→apply→verify→report）
node harness/verify.mjs    # ハーネス健全性チェックのみ
```

## コードスタイル

- TypeScript: `type` を優先（`interface` は避ける）。`enum` は避ける
- エラーは明示的に処理。サイレント失敗禁止
- 不要な抽象化を作らない。3 行の重複はヘルパーより良い
