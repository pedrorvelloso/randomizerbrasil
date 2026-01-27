import { NextResponse } from 'next/server'
import { getCachedStreamers } from '@/lib/twitch/cached'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const streamers = await getCachedStreamers()

    return NextResponse.json({
      success: true,
      data: streamers,
      count: streamers.length,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Streamers API error:', error)

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch streamers',
        data: [],
        count: 0,
      },
      { status: 500 }
    )
  }
}
