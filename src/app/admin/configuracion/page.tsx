import { createClient } from "@/lib/supabase/server"
import { AdminHeader } from "@/components/admin/AdminHeader"
import { ConfiguracionClient } from "@/components/admin/ConfiguracionClient"

export default async function ConfiguracionPage() {
  const supabase = await createClient()

  // Get current user robustly using the auth identity
  const { data: { user } } = await supabase.auth.getUser()

  let currentUserProfile = null;

  if (user) {
     const { data: profile } = await supabase
       .from('profiles')
       .select('*')
       .eq('id', user.id)
       .single()
     
     currentUserProfile = profile
  }

  // Get all profiles for the Roles Table
  const { data: profiles } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false })

  // Get App Settings
  // Note: this assumes the user has created the app_settings table via SQL.
  // We use maybeSingle or catch errors so it doesn't crash if table is missing during dev.
  const { data: settings, error: settingsError } = await supabase
    .from('app_settings')
    .select('*')

  if (settingsError && settingsError.code === '42P01') {
      // 42P01 is relation does not exist / table missing
      console.warn("Table app_settings does not exist yet. Please run the SQL migration.");
  }

  return (
    <div className="flex flex-col h-full bg-background-light dark:bg-background-dark">
      <AdminHeader 
        title="Configuración del Sistema" 
        subtitle="Administra tu perfil, ajustes globales y roles de usuarios" 
      />
      
      {currentUserProfile ? (
         <ConfiguracionClient 
            initialProfiles={profiles || []} 
            initialSettings={settings || []} 
            currentUser={currentUserProfile}
         />
      ) : (
         <div className="p-6 flex items-center justify-center text-gray-500">
            No se pudo cargar el perfil del administrador activo.
         </div>
      )}
    </div>
  )
}
