import type {
  DiscordTokenResponse,
  DiscordUser,
  DiscordConnection,
  TwitchConnection,
} from './types'
import { DiscordOAuthError } from './types'

const DISCORD_API_BASE = 'https://discord.com/api/v10'
const DISCORD_OAUTH_BASE = 'https://discord.com/oauth2'

const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID!
const DISCORD_CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET!
const DISCORD_REDIRECT_URI = process.env.DISCORD_REDIRECT_URI!

const SCOPES = ['identify', 'connections']

/**
 * Generate Discord OAuth URL with state parameter
 */
export function getOAuthUrl(state: string): string {
  const params = new URLSearchParams({
    client_id: DISCORD_CLIENT_ID,
    redirect_uri: DISCORD_REDIRECT_URI,
    response_type: 'code',
    scope: SCOPES.join(' '),
    state,
    prompt: 'consent',
  })

  return `${DISCORD_OAUTH_BASE}/authorize?${params}`
}

/**
 * Exchange authorization code for access token
 */
export async function exchangeCode(code: string): Promise<DiscordTokenResponse> {
  const response = await fetch(`${DISCORD_API_BASE}/oauth2/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: DISCORD_CLIENT_ID,
      client_secret: DISCORD_CLIENT_SECRET,
      grant_type: 'authorization_code',
      code,
      redirect_uri: DISCORD_REDIRECT_URI,
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    console.error('Discord token exchange failed:', error)
    throw new DiscordOAuthError('Failed to exchange authorization code', 'TOKEN_EXCHANGE_FAILED')
  }

  return response.json()
}

/**
 * Get current user info from Discord
 */
export async function getUser(accessToken: string): Promise<DiscordUser> {
  const response = await fetch(`${DISCORD_API_BASE}/users/@me`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  if (!response.ok) {
    throw new DiscordOAuthError('Failed to get user info', 'USER_FETCH_FAILED')
  }

  return response.json()
}

/**
 * Get user's connected accounts from Discord
 */
export async function getConnections(accessToken: string): Promise<DiscordConnection[]> {
  const response = await fetch(`${DISCORD_API_BASE}/users/@me/connections`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  if (!response.ok) {
    throw new DiscordOAuthError('Failed to get connections', 'CONNECTIONS_FETCH_FAILED')
  }

  return response.json()
}

/**
 * Find Twitch connection from list of Discord connections
 */
export function findTwitchConnection(connections: DiscordConnection[]): TwitchConnection | null {
  const twitch = connections.find((c) => c.type === 'twitch' && c.verified)

  if (!twitch) {
    return null
  }

  return {
    type: 'twitch',
    id: twitch.id,
    name: twitch.name,
    verified: twitch.verified,
  }
}

/**
 * Get Discord avatar URL
 */
export function getAvatarUrl(user: DiscordUser, size: number = 128): string | null {
  if (!user.avatar) {
    return null
  }

  const ext = user.avatar.startsWith('a_') ? 'gif' : 'png'
  return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${ext}?size=${size}`
}
