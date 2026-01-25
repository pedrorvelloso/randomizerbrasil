import { createClient, SupabaseClient } from '@supabase/supabase-js'
import type { Database } from './types'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_PUBLISHABLE_DEFAULT_KEY

// Supabase client is null if environment variables are not configured
// This allows the app to run without Supabase (using only static runners list)
export const supabase: SupabaseClient<Database> | null =
  supabaseUrl && supabaseKey
    ? createClient<Database>(supabaseUrl, supabaseKey)
    : null

export function isSupabaseConfigured(): boolean {
  return supabase !== null
}
