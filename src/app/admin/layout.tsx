import { redirect } from "next/navigation"
<<<<<<< HEAD
import { getUserProfile } from "@/lib/data"
=======
import { createClient } from "@/lib/supabase/server"
>>>>>>> origin/main
import { AdminSidebar } from "@/components/admin/AdminSidebar"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
<<<<<<< HEAD
  const profile = await getUserProfile()

  // Server-side role check (defense in depth — middleware also checks)
  if (!profile || profile.role !== "admin") {
=======
  const supabase = await createClient()

  // First check if a user is even logged in
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  // Now check their profile role
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single()

  if (profile?.role !== "admin") {
>>>>>>> origin/main
    redirect("/dashboard")
  }

  return (
<<<<<<< HEAD
    <div className="flex h-screen bg-background-light dark:bg-[#0b1120] overflow-hidden">
      <AdminSidebar userProfile={profile} />
      <main className="flex-1 overflow-y-auto">
=======
    <div className="flex h-screen bg-background-light dark:bg-[#0b121b] overflow-hidden">
      <AdminSidebar userProfile={profile as any} />
      <main className="flex-1 flex flex-col overflow-hidden">
>>>>>>> origin/main
        {children}
      </main>
    </div>
  )
}
