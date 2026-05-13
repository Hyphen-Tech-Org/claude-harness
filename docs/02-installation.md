# 02. Installation — Claude Code をインストールする

> 公式: <https://code.claude.com/docs/en/setup>
> 公式 README: <https://github.com/anthropics/claude-code>

## 1. プラン

Claude Code を本格的に使うには **Claude の有料プラン** が便利です（2026-05 時点）:

| プラン | 月額目安 | コメント |
|---|---|---|
| Free | $0 | 試用には十分。月の使用量に上限 |
| Pro | $20 | 個人利用の標準。Sonnet 中心 |
| Max | $100〜 | Opus を厚く使える。長時間ヘビーユーザ向け |
| API 従量課金 | 〜 | エンジニアが内部ツールに組み込む用途 |

> 💡 まずは Free で動作確認 → 業務で使うなら Pro/Max が現実的。詳細・最新価格は <https://www.anthropic.com/pricing>。

## 2. インストール

### macOS / Linux

**公式インストーラ（推奨）**:
```bash
curl -fsSL https://claude.ai/install.sh | bash
```

**Homebrew**:
```bash
brew install --cask claude-code
```

### Windows

**公式インストーラ（PowerShell、推奨）**:
```powershell
irm https://claude.ai/install.ps1 | iex
```

**WinGet**:
```powershell
winget install Anthropic.ClaudeCode
```

> ℹ️ Windows ユーザは **Windows Terminal**（Microsoft Store 無料）を入れると体験が向上します。

### NPM（非推奨）

`npm install -g @anthropic-ai/claude-code` は公式に非推奨化されました。新規導入では使わないでください。

## 3. ログイン

```bash
claude
```

初回起動時にブラウザが開き、Claude アカウントでログインします。API キーを手で扱う必要はありません。

## 4. 動作確認

```bash
claude --version
# 例: claude 1.x.x
```

リポを作って起動してみる:
```bash
mkdir hello-claude && cd hello-claude
git init
claude
```

プロンプトで:
```
README.md を作って、このディレクトリの目的を 3 行で書いて。
```

→ ファイルが生成されれば成功です。

## 5. IDE 連携（任意）

| エディタ | 拡張機能 / 統合 |
|---|---|
| VS Code | Anthropic 公式の Claude Code 拡張機能 |
| JetBrains 系（IntelliJ / PyCharm 等） | 公式プラグイン |
| Cursor / Windsurf | 内蔵 AI とは別に `claude` CLI も呼べる |

詳細は <https://code.claude.com/docs/en/ide>。

## 6. （任意）GitHub と連携

GitHub Issue や PR で `@claude` メンションすると Claude が応答する **Claude GitHub App** があります。
リポジトリ Settings → Integrations から有効化。
詳細: <https://code.claude.com/docs/en/github>

---

次へ: [`03-first-session.md`](./03-first-session.md)
