# 05. Skills & Slash Commands — 自分専用「魔法」を作る

> 公式: [Creating custom skills](https://support.claude.com/en/articles/12512198-creating-custom-skills) / [What are skills?](https://support.claude.com/en/articles/12512176-what-are-skills) / [anthropics/skills](https://github.com/anthropics/skills)

## Skills とは

> _"Skills are folders of instructions, scripts, and resources that Claude loads dynamically to improve performance on specialized tasks."_ — [anthropics/skills README](https://github.com/anthropics/skills)

つまり、Claude は普段は Skill の中身を**読みません**。
Skill の `description` 欄を見て **「この作業に該当する」と判断したときだけ** 中身をロードします。
これにより **数百個の Skill** を入れてもコンテキストを汚しません。

## 最小の Skill を書く

`.claude/skills/<skill-name>/SKILL.md` を作るだけ。

```markdown
---
name: weekly-report
description: 今週の git log と PR を集計し、週報を週報フォーマットで markdown に書き出す。月曜の朝に使う。
---

# Weekly Report Skill

以下の手順で週報を作成してください:

1. `git log --since="last monday"` で今週のコミットを取得
2. `gh pr list --state merged --search "merged:>$(date -d 'last monday' +%Y-%m-%d)"` で今週マージされた PR を取得
3. 以下のテンプレで `reports/YYYY-WW.md` に書き出す:

   ## 今週やったこと
   - ...
   ## 来週やること
   - ...
   ## 困っていること
   - ...
```

### Frontmatter のルール（公式仕様）

| キー | 必須 | 内容 |
|---|---|---|
| `name` | ✅ | 一意な識別子。小文字＋ハイフン |
| `description` | ✅ | **何をするか + いつ使うか** を明確に。**ここが判定に使われる** |

> 💡 `description` が曖昧だと Claude が呼んでくれません。「いつ呼ぶか」を入れるのがコツ。

## Skill を使う

セッション内で:
```
@weekly-report を使って、今週の活動を週報にまとめて。
```

明示しなくても、Claude が `description` から判断して自動発動することもあります。

## Skill の置き場所

| 場所 | スコープ |
|---|---|
| `.claude/skills/` （リポ内） | **このプロジェクト限定** |
| `~/.claude/skills/` （ホーム） | **全プロジェクト共通** |
| Plugin 経由 | Marketplace から導入 |

## 公式・コミュニティ Skill を使う

```text
/plugin marketplace add anthropics/skills
/plugin install example-skills@anthropic-agent-skills
/plugin install document-skills@anthropic-agent-skills
```

- `example-skills` — Anthropic 公式の参考 Skill 群
- `document-skills` — Excel / PDF / Word / PowerPoint 操作の Skill

その他のメジャーな Skill 集（[`docs/13-ecosystem.md`](./13-ecosystem.md) 参照）:

- [`obra/superpowers`](https://github.com/obra/superpowers) — Jesse Vincent のフラッグシップ Skill 集（TDD / debugging / plan writing / parallel agents 等）
- [`trailofbits/skills`](https://github.com/trailofbits/skills) — セキュリティ研究 Skill
- [`wshobson/agents`](https://github.com/wshobson/agents) — マルチエージェント orchestration

## Slash Commands（旧式）との関係

旧式: `.claude/commands/<name>.md` → `/name` で実行
新式: `.claude/skills/<name>/SKILL.md` → 名前呼び出し or 自動発動

> ℹ️ **新規作成は Skills 推奨**。既存の slash commands も動きますが、機能拡張は Skills 側に寄っています。

組み込み slash commands (`/help`, `/clear`, `/compact`, `/model`, `/plugin`, `/init`, `/review`, `/agents`, `/hooks`, `/permissions` 等) は今後も標準機能として残ります。

## 良い Skill の書き方 5 か条

1. **`description` に「いつ呼ぶか」を必ず入れる**（例: 「月曜の朝に」「PR レビュー前に」）
2. **手順を番号付きリスト**で書く。曖昧な指示は失敗を招く
3. **必要なコマンドを明示**（`gh pr list ...` 等）
4. **出力フォーマットを固定**（テンプレを Skill 内に貼る）
5. **動作確認したものだけ commit**。手で 1 度走らせて成功したものを Skill 化

参考: [Superpowers の `writing-skills` Skill](https://github.com/obra/superpowers/tree/main/skills/writing-skills) — Skill を書く Skill。メタすぎる。

---

次へ: [`06-subagents.md`](./06-subagents.md)
