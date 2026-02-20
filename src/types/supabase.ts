export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      enrollments: {
        Row: {
          created_at: string | null
          id: string
          module_id: string | null
          progress: number | null
          status: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          module_id?: string | null
          progress?: number | null
          status?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          module_id?: string | null
          progress?: number | null
          status?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "enrollments_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "modules"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "enrollments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      lessons: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          is_published: boolean | null
          materials: Json | null
          module_id: string | null
          order_index: number | null
          title: string
          video_url_camera: string | null
          video_url_ultrasound: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_published?: boolean | null
          materials?: Json | null
          module_id?: string | null
          order_index?: number | null
          title: string
          video_url_camera?: string | null
          video_url_ultrasound?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_published?: boolean | null
          materials?: Json | null
          module_id?: string | null
          order_index?: number | null
          title?: string
          video_url_camera?: string | null
          video_url_ultrasound?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lessons_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "modules"
            referencedColumns: ["id"]
          },
        ]
      }
      modules: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          is_published: boolean | null
          order_index: number | null
          title: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_published?: boolean | null
          order_index?: number | null
          title: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_published?: boolean | null
          order_index?: number | null
          title?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string | null
          experience_level: string | null
          full_name: string | null
          id: string
          interest_area: string | null
          license_id: string | null
          phone: string | null
          role: string | null
          specialty: string | null
          state: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          experience_level?: string | null
          full_name?: string | null
          id: string
          interest_area?: string | null
          license_id?: string | null
          phone?: string | null
          role?: string | null
          specialty?: string | null
          state?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          experience_level?: string | null
          full_name?: string | null
          id?: string
          interest_area?: string | null
          license_id?: string | null
          phone?: string | null
          role?: string | null
          specialty?: string | null
          state?: string | null
        }
        Relationships: []
      }
    }
  }
}
