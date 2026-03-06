import { NextResponse } from 'next/server'

export const runtime = 'edge'

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    service: 'OpenClaw Intel Pro',
    version: '1.0.0',
    endpoints: {
      trending: 'GET /api/v1/trending (free)',
      query: 'POST /api/v1/query (free tier: 5/day, pro: unlimited)',
      analyze: 'POST /api/v1/analyze (pro/agent only)',
    },
    powered_by: 'DeepSeek R1 via DeepInfra',
  })
}
