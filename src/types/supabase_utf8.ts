export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      enrollments: {
        Row: {
          id: string
          user_id: string
          status: string
          enrolled_at: string
          expires_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          status?: string
          enrolled_at?: string
          expires_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          status?: string
          enrolled_at?: string
          expires_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "enrollments_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      lessons: {
        Row: {
          id: string
          module_id: string
          title: string
          description: string | null
          video_url: string | null
          order_index: number
          created_at: string
        }
        Insert: {
          id?: string
          module_id: string
          title: string
          description?: string | null
          video_url?: string | null
          order_index?: number
          created_at?: string
        }
        Update: {
          id?: string
          module_id?: string
          title?: string
          description?: string | null
          video_url?: string | null
          order_index?: number
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "lessons_module_id_fkey"
            columns: ["module_id"]
            referencedRelation: "modules"
            referencedColumns: ["id"]
          }
        ]
      }
      modules: {
        Row: {
          id: string
          title: string
          description: string | null
          order_index: number
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          order_index?: number
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          order_index?: number
          created_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          id: string
          full_name: string | null
          role: string
          specialty: string | null
          phone: string | null
          updated_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          role?: string
          specialty?: string | null
          phone?: string | null
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string | null
          role?: string
          specialty?: string | null
          phone?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
