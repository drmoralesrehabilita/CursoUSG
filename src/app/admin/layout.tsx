import { getUserProfile } from "@/lib/data"
import { AdminSidebar } from "@/components/admin/AdminSidebar"
import { redirect } from "next/navigation"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const profile = await getUserProfile()

  // Server-side role check (defense in depth — middleware also checks)
  if (!profile || profile.role !== "admin") {
    redirect("/dashboard")
  }

  return (
    <div className="flex h-screen bg-background-light dark:bg-[#0b1120] overflow-hidden">
      <AdminSidebar userProfile={profile} />
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}
