import { Sidebar } from "./Sidebar"
import { createClient } from "@/lib/supabase/server"
import { Database } from "@/types/supabase"

type Lesson = Database['public']['Tables']['lessons']['Row']

export async function MainLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()

  const { data: modulesData } = await supabase
    .from('modules')
    .select('*, lessons(*)')
    .order('order_index', { ascending: true })

  // Sort lessons by order_index in JS
  const modules = modulesData?.map((module) => ({
    ...module,
    lessons: (module.lessons as Lesson[]).sort((a, b) => (a.order_index || 0) - (b.order_index || 0))
  })) || []

  return (
    <div className="flex min-h-screen">
      <Sidebar modules={modules} />
      <main className="flex-1 lg:pl-80 min-h-screen transition-all duration-300 ease-in-out">
        <div className="container mx-auto p-4 md:p-6 lg:p-8 pt-16 lg:pt-8">
          {children}
        </div>
      </main>
    </div>
  )
}
