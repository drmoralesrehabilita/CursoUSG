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
      modules: {
        Row: {
          id: string
          created_at: string
          title: string
          description: string | null
          order_index: number
          is_published: boolean
        }
        Insert: {
          id?: string
          created_at?: string
          title: string
          description?: string | null
          order_index: number
          is_published?: boolean
        }
        Update: {
          id?: string
          created_at?: string
          title?: string
          description?: string | null
          order_index?: number
          is_published?: boolean
        }
      }
      lessons: {
        Row: {
          id: string
          created_at: string
          module_id: string
          title: string
          description: string | null
          video_url_camera: string | null
          video_url_ultrasound: string | null
          order_index: number
          is_published: boolean
          materials: Json | null
        }
        Insert: {
          id?: string
          created_at?: string
          module_id: string
          title: string
          description?: string | null
          video_url_camera?: string | null
          video_url_ultrasound?: string | null
          order_index: number
          is_published?: boolean
          materials?: Json | null
        }
        Update: {
          id?: string
          created_at?: string
          module_id?: string
          title?: string
          description?: string | null
          video_url_camera?: string | null
          video_url_ultrasound?: string | null
          order_index?: number
          is_published?: boolean
          materials?: Json | null
        }
      }
      profiles: {
        Row: {
          id: string
          updated_at: string | null
          full_name: string | null
          avatar_url: string | null
          email: string
          role: 'admin' | 'user'
        }
        Insert: {
          id: string
          updated_at?: string | null
          full_name?: string | null
          avatar_url?: string | null
          email: string
          role?: 'admin' | 'user'
        }
        Update: {
          id?: string
          updated_at?: string | null
          full_name?: string | null
          avatar_url?: string | null
          email?: string
          role?: 'admin' | 'user'
        }
      }
      enrollments: {
        Row: {
          id: string
          created_at: string
          user_id: string
          status: 'active' | 'blocked' | 'completed'
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          status: 'active' | 'blocked' | 'completed'
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          status?: 'active' | 'blocked' | 'completed'
        }
      }
    }
  }
}
