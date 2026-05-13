# 14. Troubleshooting — よくあるエラーと対処

## インストール / 起動系

### `claude: command not found`

```bash
# パスが通っていない可能性
# macOS / Linux:
echo $PATH
which claude

# Windows (PowerShell):
$env:Path
Get-Command claude
```

→ インストーラを再実行。Windows は **ターミナル再起動** で PATH が反映されます。

### Windows で日本語が文字化け

- **Windows Terminal** を使う（コマンドプロンプトは CP932 で文字化けしやすい）
- Git Bash 上の `clip.exe` は CP932 化するので、長文は **必ずファイル経由** で受け渡す
- 環境変数: `chcp 65001` で UTF-8 に変更

### ログインループ

```bash
claude --logout
claude
```

それでもダメなら `~/.claude/` 内のセッションファイルをバックアップ取って削除。

## セッション中

### "Context window exceeded"

長いセッションでコンテキストが満杯:
- `/compact` で会話を圧縮
- `/clear` でリセット（必要なコンテキストは `CLAUDE.md` に保存しておく）
- 大量データは Claude に貼り付けずファイルにして `cat ファイル` で読ませる

### Claude が同じことを繰り返す / ループする

- `Esc` × 2 で中断
- Plan Mode (`Shift+Tab`) でいったん計画レビュー
- プロンプトを「もっと具体的に」「やってはいけない範囲も明示」して再投入

### Subagent が暴走する

- `.claude/agents/<name>.md` の `tools:` を狭める
- `description` を厳しめに書き直す
- Plan Mode 経由でしか呼ばないようにする

## Hooks 系

### Hook が動かない

```bash
# 設定の syntax 確認
cat .claude/settings.json | python -m json.tool
# あるいは
cat .claude/settings.json | jq .
```

- JSON 構文ミスがないか
- `matcher` の文字列が合っているか（`Edit` / `Write` / `Bash` 等は大文字小文字に注意）
- スクリプトに実行権限があるか（macOS/Linux: `chmod +x scripts/*.sh`）

### Hook で commit がブロックされる

- `--no-verify` で回避するのは **最終手段**。基本は hook が何を検出したか調べる
- `.husky/` や `.pre-commit-config.yaml` がある場合はそちらが原因かも

## Git / GitHub 系

### `git push --force` を Claude が打とうとする

絶対に承認しない。Plan Mode で `--force` を使わない代替案を考えさせる。
事故ったら `git reflog` で復旧できる場合もある。

### コンフリクトを Claude が雑に解決する

「コンフリクトを解決して」とだけ依頼すると、片方を機械的に採用しがち。
**「両方の意図を理解して、論理的にマージして」**と指示し、diff を目視確認する。

## MCP / Plugin 系

### MCP サーバが繋がらない

```bash
# サーバ単体で動作確認
npx -y @notionhq/notion-mcp-server
# エラーが出る → 環境変数 / API キーを確認
```

- `.mcp.json` の syntax
- 環境変数（API キー）が正しいか
- `~/.claude/.mcp.json` と project 側 `.mcp.json` の優先順位

### Plugin が見つからない

```text
/plugin marketplace list
/plugin marketplace add <owner>/<repo>
/plugin list
```

- マーケットプレイス追加忘れ
- リポ名 / プラグイン名のタイポ

## コスト / 速度

### 速度が遅い

- モデル切替: `/model` で Sonnet に
- コンテキストが大きすぎないか確認
- 並列セッション数を減らす

### コストが急増

```text
/cost
```

で確認。Subagent / 並列実行は消費が増える。Plan Mode で対象を絞る習慣を。

## それでも解決しない時

1. 公式ドキュメント: <https://code.claude.com/docs/en/troubleshooting>
2. GitHub Issues: <https://github.com/anthropics/claude-code/issues>
3. Discord 公式: <https://anthropic.com/discord>
4. `/help` でその場のヘルプ

---

次へ: [`15-glossary.md`](./15-glossary.md)
