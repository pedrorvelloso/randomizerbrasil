export interface Runner {
  id: string
  stream_name: string
  source_id: string | null
  source: 'discord' | 'manual'
  created_at: string
}

export interface Database {
  public: {
    Tables: {
      runners: {
        Row: Runner
        Insert: Omit<Runner, 'id' | 'created_at'> & {
          id?: string
          created_at?: string
        }
        Update: Partial<Omit<Runner, 'id'>>
      }
    }
  }
}
