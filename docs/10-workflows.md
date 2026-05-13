# 10. Workflows — Plan Mode / Auto-Accept / Verification Loop

> Boris Cherny（Claude Code チームリード）のワークフローを公開情報から再構成。

## 全体像

```
[依頼受領]
   │
   ▼
[Plan Mode] ──── Shift+Tab で入る。承認制で計画レビュー
   │
   ▼  (Approve)
[Auto-Accept] ── Tab で切替。承認済プランを高速実行
   │
   ▼
[Verification Loop] ── typecheck → test → lint
   │
   ▼
[Commit] ── Conventional Commits
   │
   ▼
[/grill]  → SHIP IT が出るまで修正
   │
   ▼
[Push / PR]
```

## 1. Plan Mode（`Shift+Tab`）

`Shift+Tab` を 1 回押すと Plan Mode に入ります。Claude は計画だけ出し、コードは書きません。

**メリット**:
- 「思っていたのと違う方向に走られた」を防ぐ
- 3 ステップ以上のタスクは Plan で全体像を握る
- 承認後はノータイムで実行に移れる

**やり方**:
1. `Shift+Tab` で Plan Mode
2. ゴール・完了条件・触るファイルを書いてもらう
3. レビュー → 修正指示 → 再 Plan
4. 納得したら「OK 進めて」/ Plan を Accept

## 2. Auto-Accept（`Tab`）

通常モードでは Claude が「このファイルを書き換えていい？」と都度確認します。
`Tab` で Auto-Accept に入ると、**Plan で合意済みの範囲内では確認なしで実行** されます。

→ 短時間で大量編集が走る。**Plan が雑だと事故るので Plan の品質が肝**。

## 3. Verification Loop（コミット前に必ず）

```
change → typecheck → test → lint → commit
```

これを守るだけで **品質は 2〜3 倍** になります。スキップは時間の節約にはなりません。

| 種類 | プロジェクト例 |
|---|---|
| TypeScript | `npm run typecheck` |
| Python | `mypy .` |
| Test | `npm test` / `pytest` |
| Lint | `npm run lint` / `ruff check` |

Hook で自動化できる部分は hook 化（[`docs/07-hooks.md`](./07-hooks.md) 参照）。

## 4. Quality Gate — `/grill`

実装が終わったら、コミット前にもう一度厳しい目で見る:

```
/grill
```

（コミュニティで広く使われるレビュー用 slash command。Boris の workflow にも組み込まれています）

`SHIP IT` 判定が出るまで修正する。なければ自前で実装してもよい:
- `.claude/skills/grill/SKILL.md` を作って「厳格レビュー → SHIP IT or 修正リスト」を出させる

## 5. Conventional Commits

```
feat:   新機能
fix:    バグ修正
refactor: リファクタ
docs:   ドキュメント
test:   テスト追加 / 修正
chore:  雑務（依存更新、設定変更 等）
```

メリット: 履歴が読みやすく、自動 CHANGELOG 生成も可能。

## 6. Slash Command の例（参考）

| Command | 用途 |
|---|---|
| `/quick-commit` | 小さい変更を 1 行で commit |
| `/commit-push-pr` | commit + push + PR をワンショット |
| `/review-changes` | コミット前の最終チェック |
| `/test-and-fix` | テスト失敗 → 修正のループ |
| `/simplify` | コード簡略化 |
| `/grill` | 厳格レビュー |
| `/worktree` | 並列セッション用 worktree 作成 |

これらは公式組み込みではなく、コミュニティで広く使われる慣習です。自分でも Skill / command として実装できます。

## 7. Boris 流 3 フェーズ（全タスク共通）

すべてのタスクを以下の 3 フェーズで進める:

1. **Plan**: ゴール / 完了条件 / 変更対象を 3〜5 行で提示。承認待ち。
2. **Execute**: Plan に沿って実装。スコープ外の変更禁止。
3. **Verify**: チェックリストで自己検証 → 構造化報告。

「止まらないルール」:
- `[確認]` / `[FYI]` 報告後は返答を待たず次アクションに着手
- 止まっていいのは `[承認]` タグの場合のみ

## 8. Skills と組み合わせる

Superpowers の `writing-plans` → `executing-plans` → `dispatching-parallel-agents` → `requesting-code-review` を **直列に並べる**と、ほぼ無人で 2 時間自律稼働できます（Jesse Vincent 公式 README より）。

```text
/plugin install superpowers@claude-plugins-official
```

を入れておけば、上記の Skill 群が自動発動します。

---

次へ: [`11-multi-window.md`](./11-multi-window.md)
