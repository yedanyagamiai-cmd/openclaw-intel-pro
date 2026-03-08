# OpenClaw Intel Pro

**AI Developer Intelligence API — Deep market analysis powered by DeepSeek R1.**

[![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![Edge Runtime](https://img.shields.io/badge/Runtime-Edge-orange)](https://edge-runtime.vercel.app/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![MCP](https://img.shields.io/badge/MCP-Ecosystem-blue)](https://modelcontextprotocol.io/)

## What is Intel Pro?

The first intelligence service built for the AI agent economy. Not search results — **actual reasoning** powered by DeepSeek R1.

- Real-time MCP ecosystem monitoring (11,000+ servers)
- Trending analysis, market sizing, competitor insights
- Deep R1-powered reasoning for Pro tier queries
- Edge-deployed for <100ms latency worldwide

## Live Demo

```bash
# Free tier — trending data
curl https://openclaw-intel-pro.onrender.com/api/v1/trending

# Free tier — market analysis
curl -X POST https://openclaw-intel-pro.onrender.com/api/v1/query \
  -H "Content-Type: application/json" \
  -d '{"query": "What MCP servers are trending this week?"}'

# Pro tier — R1 deep analysis
curl -X POST https://openclaw-intel-pro.onrender.com/api/v1/query \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_PRO_KEY" \
  -d '{"query": "Analyze the MCP monetization landscape and identify top opportunities"}'
```

## API Endpoints

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/api/v1/trending` | GET | None | Trending MCP servers, categories, market data |
| `/api/v1/query` | POST | Optional | AI-powered market analysis (Free: basic, Pro: R1) |
| `/api/v1/analyze` | POST | Pro | Deep competitive analysis with R1 reasoning |
| `/api/health` | GET | None | Service health check |

## Pricing

| Tier | Cost | Features |
|------|------|----------|
| **Free** | $0 | 5 queries/day, trending data, basic analysis |
| **Pro** | $19/mo | Unlimited queries, DeepSeek R1 deep analysis, reasoning traces |
| **Agent** | $0.05/query | API access for AI agents (x402 compatible) |

### Get Pro Key

- **Stripe**: [Buy Pro Key — $19/mo](https://buy.stripe.com/4gw5na5U19SP9TW288)
- **PayPal**: [paypal.me/Yagami8095/19](https://paypal.me/Yagami8095/19)
- **Product Store**: [product-store.yagami8095.workers.dev](https://product-store.yagami8095.workers.dev)

## Architecture

```
┌─────────────┐     HTTPS      ┌──────────────────────┐     API        ┌──────────────┐
│  Developer   │ ◀──────────▶  │  Next.js (Edge)      │ ◀──────────▶  │  DeepInfra    │
│  AI Agent    │   REST API    │  Auth + Rate Limit   │   DeepSeek    │  R1-0528      │
│  MCP Client  │               │  Zod Validation      │   Reasoning   │  (Pro only)   │
└─────────────┘               └──────────────────────┘               └──────────────┘
```

- **Framework**: Next.js 14 with Edge Runtime
- **AI Model**: DeepSeek R1-0528 via DeepInfra (Pro tier)
- **Auth**: API key validation with tier-based rate limiting
- **CORS**: Enabled for all origins (agent-friendly)

## Self-Hosting

```bash
git clone https://github.com/yedanyagamiai-cmd/openclaw-intel-pro
cd openclaw-intel-pro
npm install
echo "DEEPINFRA_API_KEY=your-key" > .env.local
npm run dev
```

## Also Available As

- **MCP Server**: [openclaw-intel-mcp](https://openclaw-intel-mcp.yagami8095.workers.dev/mcp) — Use Intel Pro as an MCP tool in Claude Code / Cursor
- **Part of**: [OpenClaw MCP Servers](https://github.com/yedanyagamiai-cmd/openclaw-mcp-servers) — 9 servers, 49 tools

## License

MIT — [OpenClaw Intelligence](https://github.com/yedanyagamiai-cmd)
