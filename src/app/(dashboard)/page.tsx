<<<<<<< HEAD
import { createClient } from "@/lib/supabase/server"
import { getModules } from "@/lib/data"
import { redirect } from "next/navigation"

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const modules = await getModules()
  
  if (modules && modules.length > 0 && modules[0].lessons && modules[0].lessons.length > 0) {
      // Redirect to first lesson of first module
      redirect(`/lessons/${modules[0].lessons[0].id}`)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
      <h1 className="text-3xl font-bold mb-4">Bienvenido al Diplomado</h1>
      <p className="text-muted-foreground">Selecciona un módulo del menú lateral para comenzar.</p>
    </div>
  )
}
=======
/** 
 * ALIAS FOR /dashboard 
 * This ensures the (dashboard) routing group is also functional 
 */
import DashboardPage from "../dashboard/page"
export default DashboardPage
>>>>>>> origin/main
