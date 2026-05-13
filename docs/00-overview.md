# 00. Overview — このリポの読み方

## TL;DR（3 行）

1. **Claude Code = Anthropic 公式のエージェント型 CLI**。ターミナルで動く AI ペアプログラマ／秘書／調査員。
2. 2026 年は **Skills / Subagents / Hooks / MCP / Plugins** が標準装備。これを組み合わせて自分専用ワークフローを作る。
3. 本リポは公式ドキュメントと信頼できる OSS を引用しながら、**ゼロから 2〜3 時間で 1 周** できる学習ラボ。

## 想定読者

- ターミナルを開いたことが**ほぼ無い**人 〜 **GitHub に少し触れたことがある**人
- 営業 / マーケ / 経理 / 経営など、コーディング業務が中心ではない人
- 「AI を業務に取り入れたい」と思いながらも、何から始めればよいか分からない人

## 読み方の順序

```
00 (本書) → 01 ターミナル → 02 インストール → 03 初セッション
           ↓
       04 主要機能（全体像）
           ↓
       05 Skills → 06 Subagents → 07 Hooks → 08 MCP → 09 Plugins
           ↓
       10 ワークフロー → 11 4窓 → 12 ベストプラクティス
           ↓
       13 エコシステム（参考リンク集）
```

詰まったら 14 Troubleshooting / 15 Glossary を辞書的に。

## 「Claude Code」と他ツールの違い

| ツール | 場所 | 想定ユーザー | 強み |
|---|---|---|---|
| **Claude Code** | ターミナル / IDE / Web (claude.ai/code) | 開発者寄り、ただし非エンジニアも増加 | コード編集・複雑なファイル操作・自動化・複数エージェント |
| Claude Desktop App | デスクトップアプリ | 全ナレッジワーカー | チャット中心、文書作成、データ分析 |
| Cursor / Windsurf / GitHub Copilot | IDE 内蔵 | 開発者 | IDE 統合度が高い |
| ChatGPT / Gemini Web | ブラウザ | 万人 | チャット汎用 |

> 💡 本キットは **Claude Code（CLI）** に焦点を当てています。CLI は「`.claude/` というフォルダで設定をすべて Git 管理できる」という構造が強みで、これにより **チーム全員に同じワークフローを配布** できます。

## このリポの「教材としての」歩き方

| 立場 | 推奨アクション |
|---|---|
| 初学者 | `docs/01` から順に読み、`examples/01-hello-world` で手を動かす |
| 既に Claude Code を使っている | `docs/13-ecosystem.md` で OSS を眺め、`docs/10-workflows.md` の Boris 流を取り入れる |
| 社内に展開したい | このリポを fork → `CLAUDE.md` と `docs/` をあなたの組織用に書き換え → 配布 |

---

次へ: [`01-prerequisites.md`](./01-prerequisites.md)
