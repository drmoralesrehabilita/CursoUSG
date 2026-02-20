import { Sidebar } from "./Sidebar"

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 lg:pl-64 min-h-screen transition-all duration-300 ease-in-out">
        <div className="container mx-auto p-4 md:p-6 lg:p-8 pt-16 lg:pt-8 bg-background">
          {children}
        </div>
      </main>
    </div>
  )
}
