<<<<<<< HEAD

import { Sidebar } from "@/components/dashboard/sidebar"
import { getUserProfile } from "@/lib/data"
=======
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Sidebar } from "@/components/dashboard/sidebar"
>>>>>>> origin/main

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
<<<<<<< HEAD
  const userProfile = await getUserProfile()

  return (
    <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark text-slate-800 dark:text-slate-200 transition-colors duration-300 font-body">
      <Sidebar userProfile={userProfile} />
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
=======
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single()

  return (
    <div className="flex h-screen bg-surface-light dark:bg-background-dark overflow-hidden font-body">
      <Sidebar userProfile={profile as any} />
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* Glow effect for main content */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
>>>>>>> origin/main
        {children}
      </main>
    </div>
  )
}
