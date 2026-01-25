import { games } from '@/data/data'
import { getDeduplicatedRunners } from '@/lib/supabase/runners'
import type { TwitchTokenResponse, TwitchStreamsResponse, StreamerData, TwitchVideosResponse, VideoData } from './types'

const TWITCH_CLIENT_ID = process.env.TWITCH_CLIENT_ID!
const TWITCH_CLIENT_SECRET = process.env.TWITCH_CLIENT_SECRET!

let cachedToken: { token: string; expiresAt: number } | null = null

/**
 * Get OAuth token from Twitch
 */
async function getTwitchToken(): Promise<string> {
  // Return cached token if still valid
  if (cachedToken && Date.now() < cachedToken.expiresAt) {
    return cachedToken.token
  }

  const response = await fetch('https://id.twitch.tv/oauth2/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: TWITCH_CLIENT_ID,
      client_secret: TWITCH_CLIENT_SECRET,
      grant_type: 'client_credentials',
    }),
  })

  if (!response.ok) {
    throw new Error('Failed to get Twitch token')
  }

  const data: TwitchTokenResponse = await response.json()

  // Cache token with 1 hour buffer before expiry
  cachedToken = {
    token: data.access_token,
    expiresAt: Date.now() + (data.expires_in - 3600) * 1000,
  }

  return data.access_token
}

/**
 * Fetch streams from Twitch API
 * Twitch API allows max 100 user_login params per request
 */
async function fetchStreams(usernames: string[], token: string): Promise<TwitchStreamsResponse> {
  const params = new URLSearchParams()

  // Add all usernames to the query (max 100)
  usernames.slice(0, 100).forEach(username => {
    params.append('user_login', username)
  })

  const response = await fetch(`https://api.twitch.tv/helix/streams?${params}`, {
    headers: {
      'Client-ID': TWITCH_CLIENT_ID,
      'Authorization': `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    throw new Error('Failed to fetch streams')
  }

  return response.json()
}

/**
 * Get online streamers from the user list playing games from the game list
 * Merges runners from Supabase database with static list (deduped)
 */
export async function getOnlineStreamers(): Promise<StreamerData[]> {
  try {
    const [token, runners] = await Promise.all([
      getTwitchToken(),
      getDeduplicatedRunners(),
    ])
    const response = await fetchStreams(runners, token)

    // Filter streams by game_id from our games list (O(1) Set lookup)
    const filteredStreams = response.data.filter(stream =>
      games.has(stream.game_id)
    )

    // Transform to our format
    return filteredStreams.map(stream => ({
      id: stream.user_id,
      username: stream.user_login,
      displayName: stream.user_name,
      twitchUrl: `https://twitch.tv/${stream.user_login}`,
      thumbnailUrl: stream.thumbnail_url.replace('{width}', '1280').replace('{height}', '720'),
      streamTitle: stream.title,
      gameName: stream.game_name,
      startedAt: stream.started_at,
      viewerCount: stream.viewer_count,
    }))
  } catch (error) {
    console.error('Error fetching Twitch streams:', error)
    throw error
  }
}

/**
 * Get highlights from a specific user by userId
 */
export async function getUserHighlights(userId: string, limit: number = 20): Promise<VideoData[]> {
  try {
    const token = await getTwitchToken()

    const params = new URLSearchParams({
      user_id: userId,
      type: 'highlight',
      first: limit.toString(),
    })

    const response = await fetch(`https://api.twitch.tv/helix/videos?${params}`, {
      headers: {
        'Client-ID': TWITCH_CLIENT_ID,
        'Authorization': `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch videos')
    }

    const data: TwitchVideosResponse = await response.json()

    // Transform to our format
    return data.data.map(video => ({
      id: video.id,
      username: video.user_login,
      displayName: video.user_name,
      title: video.title,
      thumbnailUrl: video.thumbnail_url.replace('%{width}', '1280').replace('%{height}', '720'),
      url: video.url,
      viewCount: video.view_count,
      createdAt: video.created_at,
      duration: video.duration,
    }))
  } catch (error) {
    console.error('Error fetching Twitch highlights:', error)
    throw error
  }
}
