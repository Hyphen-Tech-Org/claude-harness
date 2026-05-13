# 16. Case Studies — 実例と成功事例（2026 年）

> **すべて 1 次情報のみ。** 公式 GitHub リポ / 公式サイト / 公開 PRD / X 投稿（@nateliason、@papercliping 等）を引用。
> 数値は調査日（2026-05-13）時点の公開値。

---

## 🚀 Case 1: Felix — Nat Eliason の「1 人 AI 起業」実験

### 概要

| 項目 | 内容 |
|---|---|
| 主体 | [Nat Eliason](https://x.com/nateliason) — クリプト出身の作家・起業家 |
| 法人名 | The Masinov Company（マシノフ・カンパニー） |
| ドメイン | <https://felixcraft.ai> |
| エージェント名 | **Felix**（OpenClaw 上で動く「従業員」） |
| オーケストレータ | **Paperclip** |
| 目標 | **人間の従業員 0 人で売上 100 万ドル** |
| 開始 | 2026 年 1 月後半 |
| 初期資金 | $1,000（シード） |
| 数週間後の売上 | **≈ $200,000** |

### 売上の内訳（公開 dashboard / Stripe + Base chain 実数）

```
Stripe (法定通貨)  $100,570
ETH (47.87 ETH)    ≈ $94,973  (ETH ≈ $1,983 換算時点)
                   ─────────
                     合計 ≈ $195,543
```

Stripe アカウントは 4 つ並列稼働:
- `acct_..._Sxs6y` — **Claw Mart**（自社マーケット）
- `acct_..._Swiqt` — **felixcraft.ai** 書籍販売
- `acct_..._SwUyq` — **Polylogue**（自社 SaaS）
- `acct_..._Syslj` — **Felix CM earnings**（マーケ収益）

### Web3 スタック

- 暗号通貨トレジャリー: `masinov.base.eth` (`0x114d...f508`, Base chain)
- 独自トークン **$FELIX** をローンチ（コントラクト: `0xf30B...9b07`）
- USDC / ETH / FELIX の残高をリアルタイムでダッシュボード公開: <https://felixcraft.ai/dashboard>
- トークン burn 量も公開 (`0x000...dEaD` への送付額)

### 公開リポ（実装が読める）

| リポ | 内容 |
|---|---|
| [`Nateliason/felixcraft-site`](https://github.com/Nateliason/felixcraft-site) | LP + ダッシュボード（HTML + Vercel Serverless）|
| [`Nateliason/sondex-oss`](https://github.com/Nateliason/sondex-oss) | OpenClaw 用セルフホスト記憶層 (Postgres、クラウド依存ゼロ) |
| [`Nateliason/send-to-openclaw`](https://github.com/Nateliason/send-to-openclaw) | Chrome 拡張：閲覧ページを OpenClaw に転送 |
| [`Nateliason/paperclip`](https://github.com/Nateliason/paperclip) | Paperclip 本家の fork |
| [`Nateliason/claude-dangerously-skip-review`](https://github.com/Nateliason/claude-dangerously-skip-review) | Claude の GitHub レビュー自律性向上 |

### なぜ示唆的か

1. **ダッシュボードを最初から公開した** — 透明性 = 信頼 = マーケになる
2. **マルチ収益源**（書籍 / SaaS / マーケット / トークン）を **1 つのエージェント** が運営
3. **PRD ベース運営** — 仕様書 (`PRD-dashboard.md` 等) を AI に渡して構築させる方式
4. **クラウド依存を意図的にゼロ** — Sondex（Postgres）で記憶を自前管理
5. **「報酬の自動分配」をスマートコントラクトで処理** — 人間の承認プロセスを最小化

### 学べる教訓

- **目標は「ゴール」で書く、タスクで書かない**（Paperclip 思想）
- **金銭・トークンの動きを自動可視化する**（信頼性 + マーケティングを兼ねる）
- **モデルや API の切替が低コストでできる構成にする**（[`ruvnet/agentic-flow`](https://github.com/ruvnet/agentic-flow) パターン）
- **法人と暗号資産のハイブリッド** — Stripe + Base chain の両方で受け取る

### 関連リンク

- Paperclip 公式リポ内ケーススタディ: `paperclipai/paperclip/07-使用案例/案例-Nat Eliason 的 AI 创业实验.md`
- Nat Eliason の X: <https://x.com/nateliason>
- The Masinov Company: <https://felixcraft.ai>

---

## 🐝 Case 2: Ruflo Swarms — 100+ エージェントの自己組織化

### 概要

| 項目 | 内容 |
|---|---|
| 主体 | rUv ([`@ruvnet`](https://github.com/ruvnet)) |
| 旧名 | Claude Flow |
| リポ | [`ruvnet/ruflo`](https://github.com/ruvnet/ruflo) ⭐️ 50k / MIT |
| 公式 | <https://cognitum.one> / UI: <https://flo.ruv.io> |

### 何が画期的か

通常の Subagent は「親が呼ぶ → 子が返す」の 1:1 関係。
Ruflo は **群（Swarm）として 100+ エージェントが自己組織化** し、
- 役割を動的に分担
- 成功パターンをセッション間で学習（Self-Learning Memory）
- 複数マシン間で安全に通信（Federation）

### 構造図（公式 README より）

```
User → Ruflo (CLI/MCP) → Router → Swarm → Agents → Memory → LLM Providers
                          ↑                         |
                          └──── Learning Loop ──────┘
```

### 応用パターン

| パターン | 使い所 |
|---|---|
| **MCP server を立てて Claude Code に注入** | Claude が `swarm_init`, `agent_spawn`, `memory_store` を呼べる |
| **Plugin marketplace 経由で軽量導入** | `/plugin marketplace add ruvnet/ruflo` でスラッシュコマンド + Skills |
| **`npx ruvflo init` でフル機能** | 98 agents / 60+ commands / 30 skills / MCP / Hooks 一式 |
| **ローカル Postgres + RuVector** | クラウドなしで記憶層を自前運営 |

### 学べる教訓

- **Subagent の数 ≠ 賢さ**。学習ループと記憶のほうが効く
- **MCP は単独動作ではなく orchestration の入口**
- **「Claude Code に脳神経系を与える」設計思想** が次の差別化軸

---

## 🏢 Case 3: Paperclip — 「ゼロ人類従業員企業」のためのオーケストレータ

### 概要

| 項目 | 内容 |
|---|---|
| リポ | [`paperclipai/paperclip`](https://github.com/paperclipai/paperclip) ⭐️ 65k / MIT |
| 公式 | <https://paperclip.ing> |
| 公式キャッチ | _"If OpenClaw is an employee, Paperclip is the company."_ |

### 3 ステップ運営モデル

| Step | 例 |
|---|---|
| 01. ゴール定義 | _"Build the #1 AI note-taking app to $1M MRR."_ |
| 02. チーム雇用 | CEO / CTO / engineer / designer / marketer — 任意の bot、任意のプロバイダ |
| 03. 承認 + 実行 | 戦略レビュー、予算設定、Go ボタンを押し、ダッシュボードで監視 |

### 応用：「タスク管理」ではなく「ゴール管理」

Issue tracker (Linear / Jira) は **タスク** を管理しますが、Paperclip は **ゴール** を管理します:
- タスクから「組織図 / 予算 / ガバナンス / コスト追跡」を生成
- エージェントの heartbeat と承認ワークフローを内蔵
- 「Clipmart」(coming soon) で **会社まるごとテンプレ** をワンクリック起動可能

### Hyphen Tech 内部での応用例（参考）

HT 内部の `Hyphen-Tech-Org/paperclip` は paperclipai/paperclip を取り込み、AI エージェントチームでの業務運営に活用しています（private）。同じパターンを公開 OSS で再現できます。

---

## 🦞 Case 4: OpenClaw — 個人 AI アシスタント OSS の超新星

### 概要

| 項目 | 内容 |
|---|---|
| リポ | [`openclaw/openclaw`](https://github.com/openclaw/openclaw) ⭐️ **371k** / MIT |
| 公式 | <https://openclaw.ai> |
| キャッチ | "EXFOLIATE!" — Your own personal AI assistant |
| 対応 OS | macOS / iOS / Android / Windows (via WSL2) |

### 何が新しいか

「AI アシスタント = ブラウザのチャット」を脱却し、
**自分のデバイスで動き、22+ のチャットチャンネルから話しかけられる** モデル:

WhatsApp / Telegram / Slack / Discord / Google Chat / Signal / iMessage / IRC / Microsoft Teams / Matrix / Feishu / LINE / Mattermost / Nextcloud Talk / Nostr / Synology Chat / Tlon / Twitch / Zalo / Zalo Personal / WeChat / QQ / WebChat

### 関連エコシステム

- [`openclaw/clawhub`](https://github.com/openclaw/clawhub) ⭐️ 8.6k — Skills Registry
- [`VoltAgent/awesome-openclaw-skills`](https://github.com/VoltAgent/awesome-openclaw-skills) ⭐️ 48k — 5,400+ Skills のキュレーション
- Paperclip と組み合わせると「OpenClaw が従業員、Paperclip が会社」構造に

### 応用ヒント

- Claude Code を「コーディング専用」に、OpenClaw を「日常 / コミュニケーション専用」に役割分担
- 同じ Skill を両方に共有可能（Paperclip / Ruflo がブリッジ）

---

## 🧪 Case 5: Superpowers の「Subagent-Driven Development」

[`obra/superpowers`](https://github.com/obra/superpowers) ⭐️ **189k** — Jesse Vincent

### 自律 2 時間連続稼働の仕組み

公式 README より:
> _"Once you say 'go', it launches a subagent-driven-development process, having agents work through each engineering task, inspecting and reviewing their work, and continuing forward. It's not uncommon for Claude to be able to work autonomously for a couple hours at a time without deviating from the plan you put together."_

### Skill チェーンの例

```
brainstorming
  ↓
writing-plans
  ↓
executing-plans
  ↓
subagent-driven-development
  ↓
requesting-code-review
  ↓
receiving-code-review
  ↓
finishing-a-development-branch
```

各 Skill が `description` で「いつ呼ぶか」を明示するため、明示的に呼ばなくても自動発動。

### 応用：自分の業務に置き換える

| 開発 → 業務適用例 |
|---|
| TDD → 議事録ドラフト → ファクトチェック → 法務 → Niki 承認 → 提出 |
| Code review → 提案資料の peer review Skill |
| Git worktree → 並行案件の隔離（営業 × 法務 × 経理） |

---

## 📊 数値サマリ（2026-05-13 GitHub API 実測）

| プロジェクト | ⭐️ | License | 用途 |
|---|---|---|---|
| openclaw/openclaw | 371k | MIT | 個人 AI アシスタント |
| obra/superpowers | 189k | MIT | Skills フレームワーク |
| anthropics/skills | 133k | (NOASSERTION) | Anthropic 公式 Skills |
| anthropics/claude-code | 123k | (NOASSERTION) | Claude Code 本体 |
| paperclipai/paperclip | 65k | MIT | エージェント企業運営 |
| ruvnet/ruflo | 50k | MIT | Multi-agent orchestration |
| VoltAgent/awesome-openclaw-skills | 48k | MIT | OpenClaw Skills まとめ |
| hesreallyhim/awesome-claude-code | 43k | — | Awesome List |
| anthropics/claude-cookbooks | 42k | MIT | Claude API レシピ |
| wshobson/agents | 35k | MIT | マルチエージェント |
| VoltAgent/awesome-claude-code-subagents | 19k | MIT | Subagent 集 |
| openclaw/clawhub | 8.6k | MIT | OpenClaw Skill Registry |
| trailofbits/skills | 5.2k | CC-BY-SA-4.0 | セキュリティ Skills |
| ruvnet/RuVector | 4.0k | MIT | Rust ベクトル GNN DB |
| disler/claude-code-hooks-mastery | 3.7k | — | Hooks 学習 |
| NousResearch/hermes-paperclip-adapter | 1.2k | MIT | Hermes Agent アダプタ |
| hmans/beans | 768 | Apache-2.0 | フラットファイル issue tracker |
| ruvnet/agentic-flow | 697 | — | モデル切替 + デプロイ |
| ruvnet/sparc | 456 | Apache-2.0 | SPARC 方法論 |
| ruvnet/open-claude-code | 278 | MIT | CC CLI リバース |
| Nateliason/send-to-openclaw | 70 | MIT | Chrome 拡張 |
| Nateliason/sondex-oss | 4 | MIT | OpenClaw 記憶層 |

---

## 🧭 自分に置き換える「3 つの問い」

これらの事例を眺めた後、自分のプロジェクトで以下を 3 分で書き出してみてください:

1. **Goal**: 自分は何を「ゴール」として AI に渡せるか？（タスクリストではなく目標）
2. **Team**: そのゴール達成に必要な「役割」を 3〜5 個に分解できるか？（CEO / 営業 / 経理 / 顧客サポート 等）
3. **Transparency**: ダッシュボード化できる指標は何か？（売上 / 顧客数 / モデルコスト 等）

→ この 3 つが書ければ、Paperclip 構造で動かせます。
→ Felix のように **公開してしまう** ことで、製品 × マーケが一体化します。

---

戻る: [`13-ecosystem.md`](./13-ecosystem.md) / [README](../README.md)
