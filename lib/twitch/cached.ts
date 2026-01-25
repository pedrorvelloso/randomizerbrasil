import { unstable_cache } from 'next/cache'
import { getOnlineStreamers, getUserHighlights } from './api'

/**
 * Cached version of getOnlineStreamers
 * Revalidates every 60 seconds
 */
export const getCachedStreamers = unstable_cache(
  async () => getOnlineStreamers(),
  ['twitch-streamers'],
  {
    revalidate: 60, // Cache for 1 minute
    tags: ['streamers'],
  }
)

/**
 * Cached version of getUserHighlights
 * Revalidates every 5 minutes
 */
export const getCachedHighlights = unstable_cache(
  async (userId: string, limit?: number) => getUserHighlights(userId, limit),
  ['twitch-highlights'],
  {
    revalidate: 300, // Cache for 5 minutes
    tags: ['highlights'],
  }
)
