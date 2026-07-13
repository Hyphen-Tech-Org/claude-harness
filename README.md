# claude-harness

**ハーネスエンジニアリング（＝AIエージェントを動かす枠組みの設計・改善技術）駆動の Claude Code スターターキット。**
自分の Claude Code に接続するだけで、毎日最前線のパターンが自動適用される。

by [Hyphen Technologies](https://hyphen-tech.co.jp) — MIT License

---

## 📊 今日の最前線（最終更新: <!--LAST_UPDATED-->2026-07-13

<!--FINDINGS_START-->
### 動向
（本日は記録なし）
<!--FINDINGS_END-->

---

## コンセプト

```
fork → secrets を設定 → 毎朝 08:00 JST に自動更新
```

1. **Research**: `@anthropic-ai/claude-code` の最新リリース・GitHub Releases・Cookbook を毎朝調査
2. **Apply**: 新パターンを `.claude/agents/harness-discovered/` に即時反映
3. **Verify**: ハーネス構成の健全性チェック（7 項目）
4. **Report**: README を自動更新。Discord 連携も可能

---

## セットアップ

### 1. Fork する

```bash
gh repo fork Hyphen-Tech-Org/claude-harness
```

### 2. GitHub Secrets を設定

| Secret | 説明 |
|--------|------|
| `ANTHROPIC_API_KEY` | Anthropic API キー（分析に使用） |
| `GITHUB_TOKEN` | 自動付与（設定不要） |
| `DISCORD_BOT_TOKEN` | (オプション) Discord 通知用 Bot トークン |

### 3. Claude Code に接続

```bash
# このリポジトリを Claude Code の --add-dir で参照
claude --add-dir /path/to/claude-harness

# または .claude/ をプロジェクトにコピー
cp -r .claude/ /path/to/your-project/
```

### 4. ローカル実行（テスト）

```bash
export ANTHROPIC_API_KEY=your-key
node harness/daily.mjs
```

---

## ディレクトリ構造

```
claude-harness/
├── .claude/
│   ├── agents/
│   │   └── harness-discovered/   # 毎日自動更新
│   ├── hooks/
│   │   └── harness-discovered/   # 発見されたフック提案
│   └── skills/
│       └── harness-discovered/   # 発見されたスキル提案
├── harness/
│   ├── daily.mjs       # エントリポイント
│   ├── research.mjs    # 調査
│   ├── apply.mjs       # 適用
│   ├── verify.mjs      # 検証
│   ├── report.mjs      # Discord + README 更新
│   └── state.json      # 適用済みパターン記録
├── CLAUDE.md           # Claude Code 設定テンプレート
└── .github/
    └── workflows/
        └── harness-daily.yml
```

---

## 設計原則

- **state.json が知識の正典** — どのパターンを適用したか、バージョン履歴を管理
- **pending なし、human_review なし** — 全提案を即時適用。システム内で完結
- **ephemeral reports** — 日次レポートはローカルのみ（git 管理しない）。README と Discord がアーカイブ
- **topic-based overwrite** — ファイルはトピック名で上書き更新（日付単位で蓄積しない）

---

_このリポジトリは毎日 08:00 JST に自己更新されます。_
_[ハイフンテクノロジーズ株式会社](https://hyphen-tech.co.jp) が Boris 式 AI 駆動経営の一環として開発・維持。_
