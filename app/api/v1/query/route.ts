import { NextRequest, NextResponse } from 'next/server'
import { queryR1, queryBasic } from '@/lib/r1'
import { validateApiKey, checkRateLimit } from '@/lib/auth'

export const runtime = 'edge'

// CORS preflight
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
    // Auth
    const authHeader = req.headers.get('authorization')
    const { valid, config, key, error } = validateApiKey(authHeader)

    if (!valid) {
      return NextResponse.json(
        { success: false, error: error || 'Invalid API key' },
        { status: 401, headers: { 'Access-Control-Allow-Origin': '*' } }
      )
    }

    // Rate limit
    const rl = checkRateLimit(key, config.dailyLimit)
    if (!rl.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: 'Rate limit exceeded',
          tier: config.tier,
          resetAt: new Date(rl.resetAt).toISOString(),
          upgrade: config.tier === 'free' ? 'Upgrade to Pro for unlimited queries: https://openclaw-intel-pro.onrender.com/#pricing' : undefined,
        },
        {
          status: 429,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'X-RateLimit-Remaining': String(rl.remaining),
            'X-RateLimit-Reset': String(Math.ceil(rl.resetAt / 1000)),
          },
        }
      )
    }

    // Parse body
    const body = await req.json().catch(() => ({}))
    const query = body.query || body.q || body.message

    if (!query || typeof query !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Missing "query" field. Example: {"query": "What MCP servers are trending?"}' },
        { status: 400, headers: { 'Access-Control-Allow-Origin': '*' } }
      )
    }

    if (query.length > 2000) {
      return NextResponse.json(
        { success: false, error: 'Query too long (max 2000 characters)' },
        { status: 400, headers: { 'Access-Control-Allow-Origin': '*' } }
      )
    }

    // Execute query
    let result
    if (config.hasR1) {
      // Pro/Agent tier: Use R1 for deep analysis
      result = await queryR1(query, body.context)
    } else {
      // Free tier: Basic analysis
      result = await queryBasic(query)
    }

    return NextResponse.json(
      {
        success: true,
        ...result,
        _meta: {
          tier: config.tier,
          rateLimit: {
            remaining: rl.remaining,
            resetAt: new Date(rl.resetAt).toISOString(),
          },
          model: config.hasR1 ? 'deepseek-r1-0528' : 'basic',
        },
      },
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'X-RateLimit-Remaining': String(rl.remaining),
          'X-Powered-By': 'OpenClaw Intel Pro / DeepSeek R1',
        },
      }
    )
  } catch (error) {
    console.error('Query error:', error)
    return NextResponse.json(
      { success: false, error: 'Analysis failed. Please try again.' },
      { status: 500, headers: { 'Access-Control-Allow-Origin': '*' } }
    )
  }
}
