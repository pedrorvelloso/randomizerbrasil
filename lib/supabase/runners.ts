import { supabase } from './client'
import { users as staticRunners } from '@/data/data'
import type { Runner, RunnerSourceType, RunnerInsert } from './types'

export type RunnerSource = 'db' | 'static'

export interface RunnerWithSource {
  name: string
  source: RunnerSource
  source_id?: string | null
}

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

/**
 * Get all runners with source attribution
 * Combines database entries with static list, with DB taking priority for duplicates
 */
export async function getRunnersWithSource(): Promise<RunnerWithSource[]> {
  const dbRunners = await getRunners()
  const dbNames = new Set(dbRunners.map((r) => r.stream_name))

  // DB runners first (prioritized)
  const result: RunnerWithSource[] = dbRunners.map((r) => ({
    name: r.stream_name,
    source: 'db' as const,
    source_id: r.source_id,
  }))

  // Add static runners that aren't in DB
  for (const name of staticRunners) {
    if (!dbNames.has(name)) {
      result.push({ name, source: 'static' })
    }
  }

  return result
}

/**
 * Check if a runner with the given stream name already exists
 */
export async function isRunnerExists(streamName: string): Promise<boolean> {
  if (!supabase) {
    return false
  }

  const { data } = await supabase
    .from('runners')
    .select('id')
    .ilike('stream_name', streamName)
    .limit(1)
    .single()

  return data !== null
}

/**
 * Create a new runner in the database
 */
export async function createRunner(
  streamName: string,
  sourceId: string,
  source: RunnerSourceType
): Promise<Runner | null> {
  if (!supabase) {
    console.error('Supabase not configured, cannot create runner')
    return null
  }

  const insertData: RunnerInsert = {
    stream_name: streamName,
    source_id: sourceId,
    source: source,
  }

  const { data, error } = await supabase
    .from('runners')
    .insert(insertData as never)
    .select()
    .single()

  if (error) {
    console.error('Error creating runner:', error)
    return null
  }

  return data
}
