import { NextResponse } from 'next/server'
import {
  getConnectSession,
  markConnectionComplete,
  clearConnectSession,
} from '@/lib/auth/session'
import { createRunner, isRunnerExists } from '@/lib/supabase/runners'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

/**
 * POST /api/auth/connect
 * Confirms and persists the connection to Supabase
 */
export async function POST() {
  // Get pending connection from session
  const session = await getConnectSession()

  if (!session?.pendingConnection) {
    return NextResponse.json(
      {
        success: false,
        error: 'No pending connection found',
        code: 'no_session',
      },
      { status: 400 }
    )
  }

  const { discordId, twitchUsername } = session.pendingConnection

  // Double-check that the Twitch account isn't already registered
  const exists = await isRunnerExists(twitchUsername)
  if (exists) {
    await clearConnectSession()
    return NextResponse.json(
      {
        success: false,
        error: 'This Twitch account is already registered',
        code: 'already_connected',
      },
      { status: 409 }
    )
  }

  // Create the runner in Supabase
  const runner = await createRunner(twitchUsername, discordId, 'website')

  if (!runner) {
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to save connection. Please try again.',
        code: 'database_error',
      },
      { status: 500 }
    )
  }

  // Mark connection as complete
  await markConnectionComplete()

  return NextResponse.json({
    success: true,
    data: {
      id: runner.id,
      stream_name: runner.stream_name,
      source: runner.source,
      created_at: runner.created_at,
    },
    timestamp: new Date().toISOString(),
  })
}

/**
 * DELETE /api/auth/connect
 * Cancels the pending connection
 */
export async function DELETE() {
  await clearConnectSession()

  return NextResponse.json({
    success: true,
    message: 'Session cleared',
  })
}
