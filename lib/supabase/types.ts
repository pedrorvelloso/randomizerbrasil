export type RunnerSourceType = 'discord' | 'manual' | 'website'

export interface Runner {
  id: string
  stream_name: string
  source_id: string | null
  source: RunnerSourceType
  created_at: string
}

export interface RunnerInsert {
  stream_name: string
  source_id?: string | null
  source: RunnerSourceType
  id?: string
  created_at?: string
}

export interface RunnerUpdate {
  stream_name?: string
  source_id?: string | null
  source?: RunnerSourceType
  created_at?: string
}

export interface Database {
  public: {
    Tables: {
      runners: {
        Row: Runner
        Insert: RunnerInsert
        Update: RunnerUpdate
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
  }
}
