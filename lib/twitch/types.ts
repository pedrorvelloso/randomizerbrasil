export interface TwitchTokenResponse {
  access_token: string
  expires_in: number
  token_type: string
}

export interface TwitchStream {
  id: string
  user_id: string
  user_login: string
  user_name: string
  game_id: string
  game_name: string
  type: 'live' | ''
  title: string
  viewer_count: number
  started_at: string
  language: string
  thumbnail_url: string
  tag_ids: string[]
  is_mature: boolean
}

export interface TwitchStreamsResponse {
  data: TwitchStream[]
  pagination: {
    cursor?: string
  }
}

export interface StreamerData {
  id: string
  username: string
  displayName: string
  twitchUrl: string
  thumbnailUrl: string
  streamTitle: string
  gameName: string
  startedAt: string
  /**
   * Precomputed on the server to avoid client-side hydration mismatches.
   * Format: H:MM (e.g. 5:07)
   */
  liveDuration: string
  viewerCount: number
}

export interface TwitchVideo {
  id: string
  stream_id: string | null
  user_id: string
  user_login: string
  user_name: string
  title: string
  description: string
  created_at: string
  published_at: string
  url: string
  thumbnail_url: string
  viewable: string
  view_count: number
  language: string
  type: 'upload' | 'archive' | 'highlight'
  duration: string
}

export interface TwitchVideosResponse {
  data: TwitchVideo[]
  pagination: {
    cursor?: string
  }
}

export interface VideoData {
  id: string
  username: string
  displayName: string
  title: string
  thumbnailUrl: string
  url: string
  viewCount: number
  createdAt: string
  duration: string
}
