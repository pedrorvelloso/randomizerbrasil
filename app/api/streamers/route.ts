import { NextResponse } from 'next/server'
import { getOnlineStreamers } from '@/lib/twitch/api'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// Cache for 1 minute to avoid excessive API calls
export const revalidate = 60

export async function GET() {
  try {
    const streamers = await getOnlineStreamers()

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
