import { unstable_cache } from 'next/cache'
import { getUserHighlights } from './api'

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
