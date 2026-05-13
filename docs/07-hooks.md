# 07. Hooks — 「決定的な」自動化

> 公式: <https://code.claude.com/docs/en/hooks>
> 学習リポ: [`disler/claude-code-hooks-mastery`](https://github.com/disler/claude-code-hooks-mastery) (3.6k★)

## Hooks とは

「特定のイベントの前後に**必ず**実行されるシェルコマンド」を仕込む仕組み。
LLM の「気分」に左右されない、**100% 決定的**な動作を担保します。

## 主要イベント一覧（2026 時点）

| イベント | いつ発火 | 用途例 |
|---|---|---|
| `SessionStart` | セッション開始時 | 日付・branch・git status を Claude に渡す |
| `UserPromptSubmit` | ユーザがメッセージ送信時 | プロンプトに前置きを差し込む |
| `PreToolUse` | ツール実行直前 | 危険コマンドをブロック |
| `PostToolUse` | ツール実行直後 | 編集ファイルを prettier 実行 |
| `Stop` | セッション終了時 | 自動コミット / 通知 |
| `PreCompact` | コンテキスト圧縮直前 | 重要ルールを再注入 |
| `Notification` | ユーザに通知を出すとき | サウンド / OS 通知 |

## 設定の置き場

```
.claude/settings.json           ← プロジェクト（チームで共有）
.claude/settings.local.json     ← 個人用 (gitignore 推奨)
~/.claude/settings.json         ← ホーム (全プロジェクト共通)
```

## 例: ファイル保存時に Prettier を自動実行

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "npx prettier --write \"$CLAUDE_FILE_PATHS\""
          }
        ]
      }
    ]
  }
}
```

## 例: 危険コマンドをブロック

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "scripts/deny-check.sh"
          }
        ]
      }
    ]
  }
}
```

`scripts/deny-check.sh` の中で `rm -rf` や `git push --force` を grep し、検出したら exit 1 で拒否する、といった実装。

## 例: セッション開始時に状況をレポート

```json
{
  "hooks": {
    "SessionStart": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "echo \"📅 $(date '+%Y-%m-%d %H:%M')\n🌿 $(git branch --show-current 2>/dev/null)\n📝 $(git log -1 --oneline 2>/dev/null)\""
          }
        ]
      }
    ]
  }
}
```

→ 起動するたびに今日の日付・現在 branch・直近 commit が Claude のコンテキストに入ります。

## 例: Beans（task tracker 連携）

[`hmans/beans`](https://github.com/hmans/beans) はフラットファイルの issue tracker で、Claude Code 連携の公式 hooks 例があります:

```json
{
  "hooks": {
    "SessionStart": [
      { "hooks": [{ "type": "command", "command": "beans prime" }] }
    ],
    "PreCompact": [
      { "hooks": [{ "type": "command", "command": "beans prime" }] }
    ]
  }
}
```

`beans prime` がタスク状態を Claude に注入するので、セッションの最初に常にタスクコンテキストが入ります。

## 安全性

- **hooks スクリプトもバージョン管理する**（`.claude/settings.json` も git に入れる）
- **絶対に秘密情報を hook 出力に含めない**（Claude のコンテキストに入ると履歴に残る可能性）
- 重い処理は **非同期化**（hooks が遅いと体感が悪化）

## 参考

- 公式 docs: <https://code.claude.com/docs/en/hooks>
- 体系的な学習: [`disler/claude-code-hooks-mastery`](https://github.com/disler/claude-code-hooks-mastery)

---

次へ: [`08-mcp.md`](./08-mcp.md)
