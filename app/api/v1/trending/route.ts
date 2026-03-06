import { NextResponse } from 'next/server'
import { getTrendingData } from '@/lib/r1'

export const runtime = 'edge'

export async function GET() {
  try {
    const data = await getTrendingData()
    return NextResponse.json({
      success: true,
      ...data,
      _meta: {
        service: 'OpenClaw Intel Pro',
        tier: 'free',
        upgrade: 'Add Authorization: Bearer YOUR_KEY for R1-powered deep analysis',
        docs: 'https://openclaw-intel-pro.vercel.app/api/v1/query',
      },
    }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=300', // 5 min cache
      },
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
