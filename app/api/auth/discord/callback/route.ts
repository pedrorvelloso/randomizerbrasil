import { NextRequest, NextResponse } from 'next/server'
import {
  exchangeCode,
  getUser,
  getConnections,
  findTwitchConnection,
  getAvatarUrl,
  DiscordOAuthError,
} from '@/lib/discord'
import { checkGuildMembership, BotApiError } from '@/lib/discord'
import {
  validateOAuthState,
  clearOAuthState,
  setPendingConnection,
} from '@/lib/auth/session'
import type { ConnectErrorCode } from '@/lib/auth/types'
import { isRunnerExists } from '@/lib/supabase/runners'
import { getBaseUrl } from '@/lib/utils/get-base-url'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

function redirectWithError(errorCode: ConnectErrorCode): NextResponse {
  const baseUrl = getBaseUrl()
  return NextResponse.redirect(`${baseUrl}/?connect=error&code=${errorCode}`)
}

/**
 * GET /api/auth/discord/callback
 * Handles Discord OAuth callback
 */
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const code = searchParams.get('code')
  const state = searchParams.get('state')
  const error = searchParams.get('error')

  // Handle OAuth denial
  if (error) {
    console.error('OAuth error:', error)
    return redirectWithError('oauth_denied')
  }

  // Validate required parameters
  if (!code || !state) {
    console.error('Missing code or state')
    return redirectWithError('invalid_state')
  }

  // Validate state against stored cookie
  const storedState = await validateOAuthState(state)
  if (!storedState) {
    console.error('Invalid or expired state')
    return redirectWithError('invalid_state')
  }

  // Clear the state cookie
  await clearOAuthState()

  try {
    // Exchange code for access token
    const tokenResponse = await exchangeCode(code)

    // Parallelize independent Discord API calls
    const [discordUser, connections] = await Promise.all([
      getUser(tokenResponse.access_token),
      getConnections(tokenResponse.access_token),
    ])

    // Check guild membership via Bot API (requires discordUser.id)
    try {
      const inGuild = await checkGuildMembership(discordUser.id)
      if (!inGuild) {
        console.log(`User ${discordUser.id} not in guild`)
        return redirectWithError('not_in_guild')
      }
    } catch (error) {
      if (error instanceof BotApiError) {
        console.error('Bot API error:', error.message)
        return redirectWithError('bot_unavailable')
      }
      throw error
    }
    const twitchConnection = findTwitchConnection(connections)

    if (!twitchConnection) {
      console.log(`User ${discordUser.id} has no Twitch connection`)
      return redirectWithError('no_twitch')
    }

    // Check if this Twitch account is already registered
    const exists = await isRunnerExists(twitchConnection.name)
    if (exists) {
      console.log(`Twitch account ${twitchConnection.name} already registered`)
      return redirectWithError('already_connected')
    }

    // Store pending connection in session
    await setPendingConnection({
      discordId: discordUser.id,
      discordUsername: discordUser.global_name || discordUser.username,
      discordAvatar: getAvatarUrl(discordUser),
      twitchId: twitchConnection.id,
      twitchUsername: twitchConnection.name,
    })

    // Redirect to homepage with connect=pending to open modal
    const baseUrl = getBaseUrl()
    return NextResponse.redirect(`${baseUrl}/?connect=pending`)
  } catch (error) {
    if (error instanceof DiscordOAuthError) {
      console.error('Discord OAuth error:', error.message, error.code)
      return redirectWithError('generic')
    }

    console.error('Unexpected error in OAuth callback:', error)
    return redirectWithError('generic')
  }
}
