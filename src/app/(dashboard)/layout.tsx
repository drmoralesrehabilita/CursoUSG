<<<<<<< HEAD
import { MainLayout } from "@/components/layout/MainLayout"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <MainLayout>{children}</MainLayout>
}
=======
/** 
 * ALIAS FOR /dashboard 
 * This ensures the (dashboard) routing group is also functional 
 */
import DashboardLayout from "../dashboard/layout"
export default DashboardLayout
>>>>>>> origin/main
