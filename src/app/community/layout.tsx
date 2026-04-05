import { Sidebar } from "@/components/dashboard/sidebar"
import { AdminSidebar } from "@/components/admin/AdminSidebar"
import { getUserProfile } from "@/lib/data"
import { SidebarProvider } from "@/components/dashboard/sidebar-context"

export default async function CommunityLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const userProfile = await getUserProfile()
  const isAdmin = userProfile?.role === "admin"

  if (isAdmin) {
    return (
      <SidebarProvider>
        <div className="flex h-screen bg-background-light dark:bg-[#0b1120] overflow-hidden">
          <AdminSidebar userProfile={userProfile} />
          <main className="flex-1 overflow-y-auto">
            {children}
          </main>
        </div>
      </SidebarProvider>
    )
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark text-slate-800 dark:text-slate-200 transition-colors duration-300 font-body">
        <Sidebar userProfile={userProfile} />
        <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
          {children}
        </main>
      </div>
    </SidebarProvider>
  )
}
