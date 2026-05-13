# 12. Best Practices — Boris 流 / YAGNI / No 過剰抽象化

> 出典: Anthropic / Claude Code チームの公開ドキュメントとリリースノート、および Boris Cherny の公開発信。

## A. コミュニケーション

### Plan ファースト

3 ステップ以上のタスクは **必ず Plan Mode** に入る。
Plan の段階で「触るファイル」「やらないこと」「完了条件」を明示してもらう。
Plan の精度が、その後の品質を決めます。

### Verification Loop は非交渉

```
change → typecheck → test → lint → commit
```

これは「丁寧にやる」ではなく **必須プロセス**。
スキップしたコミットは後で必ず痛い目を見ます。

### "Trust but verify"

Claude が「やりました」と言っても、**実際の diff / 出力を確認** する。
特に Agent / Subagent の報告は「やったつもり」が混じります。

## B. コード品質

### YAGNI — You Aren't Gonna Need It

「将来必要になるかも」で機能を追加しない。
今のタスクに不要なら、書かない。

### DRY と過剰抽象化のバランス

> _"3 similar lines is better than a premature abstraction."_ — Boris Cherny

**3 行の重複 > 早すぎる抽象化**。
似たコードが 2 箇所あっても、3 箇所目が出るまでは抽象化しない。

### コメントは「なぜ」だけ

- **Don't**: WHAT を書くコメント（コードが自明）
- **Don't**: 「issue #123 で追加」（git blame で見える）
- **Do**: 非自明な制約・workaround の理由

### エラーハンドリング

- システム境界（ユーザ入力 / 外部 API）でだけ検証
- 内部コード同士では trust する
- 起こりえない条件への fallback は書かない（複雑度の元）

### TDD（テスト駆動）

[Superpowers の `test-driven-development`](https://github.com/obra/superpowers) Skill が標準実装している方式:
1. **RED**: 失敗するテストを先に書く
2. **GREEN**: そのテストが通る最小コードを書く
3. **REFACTOR**: 重複を取り除く

LLM が暴走しがちなコード生成タスクに、強い枠を与えます。

## C. Git / リリース

### Conventional Commits

```
feat:     新機能
fix:      バグ修正
refactor: 動作を変えないリファクタ
docs:     ドキュメント
test:     テスト
chore:    雑務
```

### 破壊的操作は人間に確認

Claude は基本的に承認なしで以下をやってはいけません:
- `git push --force` (特に main / master)
- `rm -rf`
- `git reset --hard`
- データベース DROP
- 本番デプロイ
- メッセージ送信（Slack / メール / etc）

`PreToolUse` Hook でブロックを仕込むのが安全。

### 機密情報のチェック

```bash
# commit 前に必ず
git diff --staged | grep -iE "api[_-]?key|secret|password|token"
```

## D. 安全性

### `.env` を Claude に渡さない

`.env.example` を見せる、または `dotenv` で読み込ませて、**値ではなく構造**を共有する。

### MCP / Plugin / Hook を導入する前に

- ソースを 1 度読む
- スター数 / 著者の信頼性を確認
- 不要な権限を求めていないかチェック
- 公式 / 著名 OSS 以外は本番で使わない

### Auto Mode の限界

`--dangerously-skip-permissions` / 各種 auto-accept は、**ローカル / 自分のリポ限定**で使う。
共有環境・他人のリポでは絶対に使わない。

## E. 心構え

### Quality over Speed

> _"A wrong fast answer is slower than a right slow answer."_

間違った速い答えは、正しい遅い答えより遅い。
Plan に 30 秒余分にかけて、後の 30 分を節約する。

### Self-Improvement Loop

ミスをしたら `CLAUDE.md` の Learning Log に追記する。
**同じミスを 2 度しない仕組み**を作る。

### Repetitive な手作業 → Skill 化

「同じプロンプトを 3 回以上書いた」なら Skill にする。
3 度目は `/skill-name` でワンショット。

### 1 リポ = 1 `.claude/`

複数リポを同時に扱う時は `--add-dir` で参照を追加する:
```bash
claude --add-dir ~/src/other-repo
```

各リポは自分の `.claude/` を持つ原則を守る。

---

次へ: [`13-ecosystem.md`](./13-ecosystem.md)
