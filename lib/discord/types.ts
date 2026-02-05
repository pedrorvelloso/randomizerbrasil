export interface DiscordUser {
  id: string
  username: string
  discriminator: string
  avatar: string | null
  global_name: string | null
}

export interface DiscordConnection {
  type: string
  id: string
  name: string
  verified: boolean
  visibility: number
}

export interface TwitchConnection {
  type: 'twitch'
  id: string
  name: string
  verified: boolean
}

export interface DiscordTokenResponse {
  access_token: string
  token_type: string
  expires_in: number
  refresh_token: string
  scope: string
}

export interface GuildCheckResponse {
  in_guild: boolean
}

export class DiscordOAuthError extends Error {
  constructor(
    message: string,
    public code?: string
  ) {
    super(message)
    this.name = 'DiscordOAuthError'
  }
}

export class BotApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number
  ) {
    super(message)
    this.name = 'BotApiError'
  }
}
