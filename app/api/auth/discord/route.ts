import { NextRequest, NextResponse } from 'next/server'
import { getOAuthUrl } from '@/lib/discord/oauth'
import { generateState, setOAuthState } from '@/lib/auth/session'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

/**
 * GET /api/auth/discord
 * Generates Discord OAuth URL and redirects the user
 */
export async function GET(request: NextRequest) {
  // Get return URL from referer or query param
  const returnUrl =
    request.nextUrl.searchParams.get('returnUrl') ||
    request.headers.get('referer') ||
    '/'

  // Generate cryptographically secure state
  const state = generateState()

  // Store state and return URL in encrypted cookie
  await setOAuthState(state, returnUrl)

  // Generate OAuth URL and redirect
  const oauthUrl = getOAuthUrl(state)

  return NextResponse.redirect(oauthUrl)
}
