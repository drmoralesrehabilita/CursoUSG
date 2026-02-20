
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Logo } from "@/components/ui/logo"

const navItems = [
  { href: "/dashboard", icon: "dashboard", label: "Dashboard" },
  { href: "/courses", icon: "school", label: "Mis Cursos" }, // Keeping specific routes for now
  { href: "/progress", icon: "trending_up", label: "Mi Progreso" },
  { href: "/community", icon: "groups", label: "Comunidad" },
  { href: "/certificates", icon: "workspace_premium", label: "Certificados" },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-secondary text-white hidden md:flex flex-col flex-shrink-0 relative overflow-y-auto z-20 shadow-xl font-body">
      <div className="p-6 flex flex-col items-center border-b border-white/10">
        <Logo className="mb-2" />
        <p className="text-[10px] text-center text-gray-300 font-medium tracking-wide mt-2 opacity-80">
          ECOGRAFÍA NEUROMUSCULOESQUELÉTICA
        </p>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all",
                isActive
                  ? "bg-white/10 text-white border-l-4 border-primary"
                  : "text-gray-300 hover:bg-white/5 hover:text-white"
              )}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-white/10">
        <Link
          href="/settings"
          className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-white/5 hover:text-white rounded-lg transition-all"
        >
          <span className="material-symbols-outlined">settings</span>
          <span className="font-medium">Configuración</span>
        </Link>
        <div className="mt-4 flex items-center gap-3 px-4 py-2">
          {/* Placeholder for User Profile - will need to be dynamic later */}
          <Link href="/profile" className="flex items-center gap-3 w-full">
            <img
              alt="Profile"
              className="w-10 h-10 rounded-full border-2 border-primary object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD8MYIP6p3bPfy1MXhtDHs8bWhWR2iyZfKLoO4L6Ve1DAEDPYSQfkefxuK7rP7rCfYg1_ctlukp-nxC7NzUE7A-aY3ChhOaO0Hd0wayxa0BAnuk6M5ZMuNKhZ7jjnI-AXWYa4dDzw0sr0Pec3WdvryKi2GGJacdg-HPxZKvCRsmkhBHdzhhtGAxsn0PgpK0VG-S4Uk9XnZxZh7jFqck6-I7qYJ4pAzwTp0WjPfniE_P8fQCWtofHggG66en_3twnIfPXvoONwEDF81E"
            />
            <div className="overflow-hidden">
              <p className="text-sm font-semibold text-white truncate">Dr. García</p>
              <p className="text-xs text-gray-400 truncate">Residente 3</p>
            </div>
          </Link>
        </div>
      </div>
    </aside>
  )
}
