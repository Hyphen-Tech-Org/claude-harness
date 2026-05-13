# 08. MCP Servers — 外部ツールに繋ぐ

> 公式仕様: <https://modelcontextprotocol.io/>
> Claude Code 側: <https://code.claude.com/docs/en/mcp>

## MCP とは

**Model Context Protocol (MCP)** — Anthropic 主導で策定された、**AI と外部ツールをつなぐ公開標準**。
2025 年に提唱され、2026 年現在は OpenAI / Google / Microsoft / Mistral 各社の AI も対応中の事実上のデファクト。

| 役割 | これまで | MCP 以降 |
|---|---|---|
| AI が DB を読む | ベンダ別の独自接続 | MCP サーバ 1 つ繋げば OK |
| AI が Slack に投稿する | OpenAI Function calling 等で個別実装 | 公式 / コミュニティの MCP サーバを使う |
| AI が Notion を更新する | ↑同上 | `@notionhq/notion-mcp-server` 1 行 |

## 設定ファイル

| ファイル | スコープ |
|---|---|
| `~/.claude/.mcp.json` | 全プロジェクト共通 |
| `<repo>/.mcp.json` | このプロジェクト限定（チーム共有可） |

## 例: Notion 接続

```json
{
  "mcpServers": {
    "notion": {
      "command": "npx",
      "args": ["-y", "@notionhq/notion-mcp-server"],
      "env": {
        "NOTION_API_KEY": "secret_..."
      }
    }
  }
}
```

> ⚠️ **API キーは `.mcp.json` に書かない**。`.env` から読むラッパーを噛ませる、または `~/.claude/.mcp.json` 側に入れて gitignore する。

## 例: GitHub 接続

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_..."
      }
    }
  }
}
```

これで Claude から GitHub Issue 作成、PR レビュー、Discussion 投稿が直接できます。

## よく使う公式 / 公的 MCP サーバ

| サーバ | リポ |
|---|---|
| GitHub | <https://github.com/modelcontextprotocol/servers> |
| Notion | <https://github.com/makenotion/notion-mcp-server> |
| Google Drive | `@modelcontextprotocol/server-gdrive` |
| Slack | `@modelcontextprotocol/server-slack` |
| Postgres / SQLite | `@modelcontextprotocol/server-postgres` 他 |
| Filesystem | `@modelcontextprotocol/server-filesystem` |
| Puppeteer / Playwright | コミュニティ多数 |

公式リファレンス: <https://github.com/modelcontextprotocol/servers>

## MCP サーバを自作する

公式 SDK（TypeScript / Python / Go / Rust）があります:
<https://github.com/modelcontextprotocol>

最小の TypeScript MCP サーバはおよそ 50 行で書けます。
業務ツール（自社の独自 SaaS や社内 DB）を AI に繋ぐ時の標準解です。

## セッションで使う

```
GitHub MCP 経由で、niki-nakamura/venture-cafe-assets の open issues を一覧して。
```

→ Claude が MCP サーバを呼び、結果をコンテキストに取り込んで返答します。

## 安全運用

- **MCP サーバを信頼すること = そのサーバに渡したデータの安全性を信じること**
- 知らない MCP サーバを `mcp.json` に追加するのは、知らないブラウザ拡張を入れるのと同じ
- 公式リポ / 著名な OSS 以外は注意
- 業務利用では **Read-only モードで開始**し、必要に応じて Write 権限を追加

---

次へ: [`09-plugins.md`](./09-plugins.md)
