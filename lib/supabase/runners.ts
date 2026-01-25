import { supabase } from './client'
import { users as staticRunners } from '@/data/data'
import type { Runner } from './types'

/**
 * Fetch all runners from Supabase
 * Returns empty array if Supabase is not configured
 */
export async function getRunners(): Promise<Runner[]> {
  // If Supabase is not configured, return empty array
  if (!supabase) {
    return []
  }

  const { data, error } = await supabase
    .from('runners')
    .select('*')
    .order('created_at', { ascending: true })

  if (error) {
    console.error('Error fetching runners from Supabase:', error)
    return []
  }

  return data ?? []
}

/**
 * Get deduplicated list of runner usernames
 * Combines database entries with static list
 */
export async function getDeduplicatedRunners(): Promise<string[]> {
  const dbRunners = await getRunners()

  return [
    ...new Set([...dbRunners.map((r) => r.stream_name), ...staticRunners]),
  ]
}
