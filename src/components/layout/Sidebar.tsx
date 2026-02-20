import { getModules, getUserEnrollment } from "@/lib/data"
import { createClient } from "@/lib/supabase/server"
import { SidebarClient } from "./SidebarClient"

export async function Sidebar() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const modules = await getModules()
  
  let enrollment = null
  let profile = null

  if (user) {
    enrollment = await getUserEnrollment(user.id)
    
    const { data: profileData } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()
    profile = profileData
  }

  // If no user, we might want to show empty or redirect?
  // Layout will render this, so stick to showing locked status if not logged in.
  
  return (
    <SidebarClient 
      modules={modules || []} 
      enrollment={enrollment}
      profile={profile}
    />
  )
}
