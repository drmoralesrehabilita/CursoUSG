import { createClient } from "@/lib/supabase/server"
import { Database } from "@/types/supabase"

export async function getModules() {
  const supabase = await createClient()
  
  const { data: modules, error } = await supabase
    .from('modules')
    .select(`
      *,
      lessons (*)
    `)
    //.order('order_index', { ascending: true }) // Modules order
    //.order('order_index', { foreignTable: 'lessons', ascending: true }) // Lessons order

  if (error) {
    console.error('Error fetching modules:', error)
    return []
  }

  // Sort manually if needed or rely on DB default
  if (modules) {
      modules.sort((a, b) => a.order_index - b.order_index)
      modules.forEach(m => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          if (m.lessons) m.lessons.sort((a: any, b: any) => a.order_index - b.order_index)
      })
  }

  return modules
}

export async function getUserEnrollment(userId: string) {
  const supabase = await createClient()
  
  const { data: enrollment, error } = await supabase
    .from('enrollments')
    .select('*')
    .eq('user_id', userId)
    .single()

  if (error) {
    console.error('Error fetching enrollment:', error)
    return null
  }

  return enrollment
}

export async function getUserProfile() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) return null

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('full_name, email, role, specialty, phone')
    .eq('id', user.id)
    .single()

  if (error) {
    console.error('Error fetching user profile:', error)
    return null
  }

  return profile
}

export async function getLesson(id: string) {
  const supabase = await createClient()
  
  const { data: lesson, error } = await supabase
    .from('lessons')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching lesson:', error)
    return null
  }

  return lesson
}
