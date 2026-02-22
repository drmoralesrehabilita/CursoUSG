import { Database } from "@/types/supabase"

export type ModuleWithLessons = Database['public']['Tables']['modules']['Row'] & {
  lessons: Database['public']['Tables']['lessons']['Row'][]
}

export type Enrollment = Database['public']['Tables']['enrollments']['Row']

export type Certificate = any
export type LiveSession = any
export type Payment = any
export type ActivityLog = any
