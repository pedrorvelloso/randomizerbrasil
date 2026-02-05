import type { GuildCheckResponse } from './types'
import { BotApiError } from './types'

const BOT_API_URL = process.env.BOT_API_URL

/**
 * Check if a Discord user is a member of the community guild
 */
export async function checkGuildMembership(userId: string): Promise<boolean> {
  if (!BOT_API_URL) {
    console.warn('BOT_API_URL not configured, guild check skipped')
    return true
  }

  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000)

    const response = await fetch(`${BOT_API_URL}/api/in-guild?user_id=${userId}`, {
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      console.error('Bot API error:', response.status, response.statusText)
      throw new BotApiError('Bot API returned an error', response.status)
    }

    const data: GuildCheckResponse = await response.json()
    return data.in_guild
  } catch (error) {
    if (error instanceof BotApiError) {
      throw error
    }

    if (error instanceof Error && error.name === 'AbortError') {
      throw new BotApiError('Bot API request timed out', 408)
    }

    console.error('Bot API unreachable:', error)
    throw new BotApiError('Bot API unavailable')
  }
}
