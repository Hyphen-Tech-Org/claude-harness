# 15. Glossary — 用語集

> 五十音 / アルファベット混在で並べています。検索 (`Ctrl+F`) でどうぞ。

| 用語 | 意味 |
|---|---|
| **Agent / エージェント** | AI が自律的にツールを使ってタスクを遂行する形態 |
| **Agent SDK** | Anthropic 公式の、エージェントアプリ構築用 SDK |
| **Anthropic** | Claude を作っている会社 |
| **API Key** | Anthropic API を叩くための認証鍵。**絶対に commit しない** |
| **Auto Mode** | Claude Code が承認を最小化して自律実行するモード |
| **Boris Cherny** | Claude Code チームのリード。ワークフロー思想で著名 |
| **Branch / ブランチ** | Git の並行作業用の分岐線 |
| **CLAUDE.md** | プロジェクト指示書。Claude が起動時に必ず読む |
| **Claude Code** | Anthropic の公式エージェント型 CLI |
| **Claude Cookbooks** | Claude API 公式の Jupyter ノートブック集 |
| **Commit / コミット** | Git の「ここまでを 1 区切り」スナップショット |
| **Conventional Commits** | `feat:`/`fix:` などプレフィックスを揃えた commit 記法 |
| **Context Window / コンテキスト窓** | AI が一度に保持できる情報量。大きいほど多く読める |
| **Cursor** | AI ファーストの IDE |
| **dotenv / .env** | 環境変数を file から読む仕組み。秘密情報を含むため commit しない |
| **Hooks / フック** | 特定イベントの前後で**必ず**実行されるシェルコマンド |
| **IDE** | Integrated Development Environment。VS Code / JetBrains 等 |
| **Issue** | GitHub のチケット |
| **JetBrains** | IntelliJ / PyCharm 等を作る会社 |
| **MCP** | Model Context Protocol。AI と外部ツールを繋ぐ標準 |
| **MCP Server** | MCP に従う、外部ツールへのアダプタ |
| **npm** | Node.js のパッケージマネージャ |
| **Opus / Sonnet / Haiku** | Claude モデルの 3 段階。順に賢い / バランス / 高速軽量 |
| **Plan Mode** | コードを書く前に計画を出す承認制モード。`Shift+Tab` |
| **Plugin** | Skills/Agents/Hooks/MCP をパッケージ化した配布物 |
| **PostToolUse / PreToolUse** | ツール実行の前後 hook |
| **PR (Pull Request)** | 「この変更を main に取り込んで」という GitHub の提案 |
| **Prompt / プロンプト** | AI への指示文 |
| **Prompt Cache** | 同じ前置きを再利用してコスト削減する仕組み（API 側） |
| **Pull / Push** | リモートから取得 / リモートへ送信 |
| **Repository / リポ** | プロジェクトのフォルダ + 履歴 |
| **Routines** | 2026 リサーチプレビューの機能。長期で自律稼働 |
| **Session** | Claude Code を起動してから終了するまでの会話単位 |
| **SHIP IT** | `/grill` レビュー後の合格判定の慣用句 |
| **Skill** | `.claude/skills/<name>/SKILL.md` で定義する作業マニュアル |
| **Slash Command** | `/` で始まる組み込み / カスタムコマンド |
| **Subagent** | 親 Claude が呼ぶ別 Claude セッション |
| **Superpowers** | Jesse Vincent (`obra`) の Skills フレームワーク |
| **TDD** | Test-Driven Development。RED → GREEN → REFACTOR |
| **Token / トークン** | 1. AI のテキスト最小単位。2. 認証用の文字列 |
| **Tool Use** | AI がツール（Bash/Edit/Search 等）を呼ぶ機能 |
| **typecheck** | 型チェック。`tsc --noEmit` / `mypy` 等 |
| **Verification Loop** | typecheck → test → lint → commit のサイクル |
| **WinGet** | Windows のパッケージマネージャ |
| **Worktree / ワークツリー** | `git worktree`。同一リポを複数フォルダで並列展開 |
| **YAGNI** | You Aren't Gonna Need It. 不要な機能は書かない原則 |

---

戻る: [`00-overview.md`](./00-overview.md) / [README](../README.md)
