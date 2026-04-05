import { getModules } from "@/lib/data"
import { createClient } from "@/lib/supabase/server"
import TareasClient from "./TareasClient"

export default async function AdminTareasPage() {
  const supabase = await createClient()

  // Obtener módulos
  const modules = await getModules()

  // Obtener tareas con envíos
  const { data: assignments } = await supabase
    .from("assignments")
    .select(`
      *,
      submissions:assignment_submissions(id, status, grade)
    `)
    .order("created_at", { ascending: false })

  return <TareasClient modules={modules} initialAssignments={assignments || []} />
}
