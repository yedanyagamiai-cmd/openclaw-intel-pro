import { NextRequest, NextResponse } from 'next/server'
import { queryR1 } from '@/lib/r1'
import { validateApiKey, checkRateLimit } from '@/lib/auth'

export const runtime = 'edge'

export async function OPTIONS() {
  return new NextResponse(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization')
    const { valid, config, key, error } = validateApiKey(authHeader)

    if (!valid) {
      return NextResponse.json(
        { success: false, error: error || 'Invalid API key' },
        { status: 401, headers: { 'Access-Control-Allow-Origin': '*' } }
      )
    }

    if (!config.hasR1) {
      return NextResponse.json(
        {
          success: false,
          error: 'Deep analysis requires Pro or Agent tier',
          upgrade: 'https://openclaw-intel-pro.onrender.com/#pricing',
          tier: config.tier,
        },
        { status: 403, headers: { 'Access-Control-Allow-Origin': '*' } }
      )
    }

    const rl = checkRateLimit(key, config.dailyLimit)
    if (!rl.allowed) {
      return NextResponse.json(
        { success: false, error: 'Rate limit exceeded', resetAt: new Date(rl.resetAt).toISOString() },
        { status: 429, headers: { 'Access-Control-Allow-Origin': '*' } }
      )
    }

    const body = await req.json().catch(() => ({}))
    const { target, aspect } = body

    if (!target) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing "target" field. Example: {"target": "Context7 MCP server", "aspect": "competitive positioning"}',
        },
        { status: 400, headers: { 'Access-Control-Allow-Origin': '*' } }
      )
    }

    const analysisQuery = `Perform a deep competitive analysis of: ${target}
${aspect ? `Focus on: ${aspect}` : ''}

Analyze:
1. Current market position and adoption metrics
2. Key strengths and differentiation
3. Weaknesses and vulnerabilities
4. Competitive landscape and alternatives
5. Revenue potential and monetization strategy
6. Growth trajectory and prediction

Provide specific numbers, comparisons, and actionable recommendations.`

    const result = await queryR1(analysisQuery, body.context)

    return NextResponse.json(
      {
        success: true,
        target,
        aspect: aspect || 'comprehensive',
        ...result,
        _meta: {
          tier: config.tier,
          type: 'deep_analysis',
          model: 'deepseek-r1-0528',
          rateLimit: { remaining: rl.remaining },
        },
      },
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'X-Powered-By': 'OpenClaw Intel Pro / DeepSeek R1',
        },
      }
    )
  } catch (error) {
    console.error('Analyze error:', error)
    return NextResponse.json(
      { success: false, error: 'Analysis failed. Please try again.' },
      { status: 500, headers: { 'Access-Control-Allow-Origin': '*' } }
    )
  }
}
