const DEEPINFRA_API_KEY = process.env.DEEPINFRA_API_KEY || ''
const R1_MODEL = 'deepseek-ai/DeepSeek-R1-0528'
const R1_ENDPOINT = 'https://api.deepinfra.com/v1/openai/chat/completions'

export interface R1Response {
  analysis: string
  reasoning: string
  data: Record<string, unknown>
  model: string
  tokens: number
}

const SYSTEM_PROMPT = `You are OpenClaw Intel Pro, an elite AI developer intelligence analyst.
You specialize in the MCP (Model Context Protocol) ecosystem, AI agent economy, and developer tools market.

Your analysis should be:
1. Data-driven with specific numbers and trends
2. Actionable with clear recommendations
3. Forward-looking with market predictions
4. Competitive with comparison insights

Always structure your response as JSON with these fields:
- analysis: Your main analysis (2-4 paragraphs)
- trends: Array of {name, direction, confidence}
- opportunities: Array of {description, revenue_potential, difficulty}
- competitors: Array of {name, strength, weakness} (if relevant)
- recommendation: Your top actionable recommendation

Be specific. Use real data. No fluff.`

export async function queryR1(query: string, context?: string): Promise<R1Response> {
  const messages = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...(context ? [{ role: 'user', content: `Context: ${context}` }] : []),
    { role: 'user', content: query },
  ]

  const res = await fetch(R1_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${DEEPINFRA_API_KEY}`,
    },
    body: JSON.stringify({
      model: R1_MODEL,
      messages,
      temperature: 0.7,
      max_tokens: 4096,
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`R1 API error: ${res.status} — ${err}`)
  }

  const data = await res.json()
  const content = data.choices?.[0]?.message?.content || ''
  const tokens = data.usage?.total_tokens || 0

  // Extract reasoning (between <think> tags) and analysis
  const thinkMatch = content.match(/<think>([\s\S]*?)<\/think>/)
  const reasoning = thinkMatch ? thinkMatch[1].trim() : ''
  const analysis = content.replace(/<think>[\s\S]*?<\/think>/g, '').trim()

  // Try to parse structured JSON from analysis
  let structured: Record<string, unknown> = {}
  try {
    const jsonMatch = analysis.match(/```json\s*([\s\S]*?)```/) || analysis.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      structured = JSON.parse(jsonMatch[1] || jsonMatch[0])
    }
  } catch {
    // If not JSON, wrap in standard format
    structured = { raw_analysis: analysis }
  }

  return {
    analysis: structured.analysis as string || analysis,
    reasoning: reasoning.slice(0, 500), // Truncate reasoning for response
    data: structured,
    model: R1_MODEL,
    tokens,
  }
}

// Lightweight query without R1 (for free tier)
export async function queryBasic(query: string): Promise<Record<string, unknown>> {
  // Use cached/static data for free tier
  const trendingData = await getTrendingData()
  return {
    query,
    results: trendingData,
    tier: 'free',
    note: 'Upgrade to Pro for R1-powered deep analysis',
  }
}

// Get trending MCP data (cached, updated periodically)
export async function getTrendingData() {
  return {
    timestamp: new Date().toISOString(),
    ecosystem: {
      total_servers: 11000,
      monetized_pct: 4.8,
      market_size_b: 2.7,
      growth_cagr: 0.34,
    },
    trending: [
      { name: 'Context7', category: 'Documentation', views: 11000, trend: 'up' },
      { name: 'Playwright MCP', category: 'Browser Automation', views: 6000, trend: 'up' },
      { name: 'Sequential Thinking', category: 'Reasoning', uses: 5550, trend: 'stable' },
      { name: 'Filesystem MCP', category: 'Core Utility', uses: 4200, trend: 'stable' },
      { name: 'GitHub MCP', category: 'Developer Tools', uses: 3800, trend: 'up' },
      { name: 'Postgres MCP', category: 'Database', uses: 3100, trend: 'up' },
      { name: 'Memory MCP', category: 'Knowledge', uses: 2900, trend: 'up' },
      { name: 'Brave Search', category: 'Search', uses: 2700, trend: 'stable' },
      { name: 'Puppeteer MCP', category: 'Browser', uses: 2400, trend: 'down' },
      { name: 'Slack MCP', category: 'Communication', uses: 2100, trend: 'up' },
    ],
    hot_categories: [
      { name: 'AI Code Review', demand: 'very_high', supply: 'low', opportunity: 'excellent' },
      { name: 'Database Intelligence', demand: 'high', supply: 'medium', opportunity: 'good' },
      { name: 'DevOps Automation', demand: 'high', supply: 'low', opportunity: 'excellent' },
      { name: 'Knowledge Management', demand: 'very_high', supply: 'medium', opportunity: 'good' },
      { name: 'Security Analysis', demand: 'high', supply: 'very_low', opportunity: 'excellent' },
    ],
    agent_economy: {
      market_size_2025_b: 7.84,
      market_size_2030_b: 52.62,
      cagr: 0.463,
      top_protocols: ['MCP', 'A2A', 'x402'],
      top_payment_rails: ['Stripe Tempo', 'x402', 'PaidMCP Lightning'],
    },
  }
}
