
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Logo } from "@/components/ui/logo"
import { logout } from "@/app/login/actions"

interface UserProfile {
  full_name: string | null
  email: string | null
  role: string | null
  specialty: string | null
  phone: string | null
}

const navItems = [
  { href: "/dashboard", icon: "dashboard", label: "Dashboard" },
  { href: "/courses", icon: "school", label: "Mis Cursos" },
  { href: "/progress", icon: "trending_up", label: "Mi Progreso" },
  { href: "/community", icon: "groups", label: "Comunidad", badge: 3 },
  { href: "/certificates", icon: "workspace_premium", label: "Certificados" },
]

function getInitials(name: string | null | undefined): string {
  if (!name) return "U"
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("")
}

function getRoleLabel(role: string | null | undefined): string {
  const roleMap: Record<string, string> = {
    doctor: "Médico",
    super_admin: "Super Admin",
    admin_staff: "Staff Admin",
    administrator: "Administrador",
    admin: "Admin",
    health_staff: "Personal de Salud",
    patient: "Paciente",
    nurse: "Enfermería",
    staff: "Staff",
    administrative_assistant: "Asistente Admin",
  }
  return role ? roleMap[role] || role : "Estudiante"
}

export function Sidebar({ userProfile }: { userProfile: UserProfile | null }) {
  const pathname = usePathname()
  const displayName = userProfile?.full_name || "Usuario"
  const roleLabel = getRoleLabel(userProfile?.role)
  const initials = getInitials(userProfile?.full_name)

  return (
    <aside className="w-64 bg-secondary text-white hidden md:flex flex-col flex-shrink-0 relative overflow-y-auto z-20 shadow-xl font-body sidebar-scroll">
      {/* Logo Section */}
      <div className="p-6 flex flex-col items-center border-b border-white/10">
        <Logo showSubtitle />
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-5 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative",
                isActive
                  ? "bg-white/15 text-white shadow-lg shadow-primary/10 border border-white/10"
                  : "text-gray-300 hover:bg-white/8 hover:text-white"
              )}
            >
              <span
                className={cn(
                  "material-symbols-outlined text-[22px] transition-colors duration-200",
                  isActive ? "text-primary" : "text-gray-400 group-hover:text-primary"
                )}
              >
                {item.icon}
              </span>
              <span className="font-medium text-sm">{item.label}</span>
              {item.badge && (
                <span className="ml-auto bg-primary/90 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
                  {item.badge}
                </span>
              )}
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 bg-primary rounded-r-full" />
              )}
            </Link>
          )
        })}
      </nav>

      {/* Bottom Section */}
      <div className="p-3 border-t border-white/10 space-y-1">
        {/* Settings */}
        <Link
          href="/settings"
          className={cn(
            "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
            pathname === "/settings"
              ? "bg-white/15 text-white shadow-lg shadow-primary/10 border border-white/10"
              : "text-gray-300 hover:bg-white/8 hover:text-white"
          )}
        >
          <span className={cn(
            "material-symbols-outlined text-[22px] transition-colors duration-200",
            pathname === "/settings" ? "text-primary" : "text-gray-400 group-hover:text-primary"
          )}>settings</span>
          <span className="font-medium text-sm">Configuración</span>
        </Link>

        {/* Logout */}
        <form action={logout}>
          <button
            type="submit"
            className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-red-500/10 hover:text-red-400 rounded-xl transition-all duration-200 group cursor-pointer"
          >
            <span className="material-symbols-outlined text-[22px] text-gray-500 group-hover:text-red-400 transition-colors duration-200">logout</span>
            <span className="font-medium text-sm">Cerrar Sesión</span>
          </button>
        </form>
      </div>

      {/* User Profile */}
      <div className="p-3 border-t border-white/10">
        <Link href="/profile" className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/5 transition-all duration-200">
          <div className="w-10 h-10 rounded-full border-2 border-primary bg-primary/20 flex items-center justify-center shadow-md shrink-0">
            <span className="text-sm font-bold text-primary">{initials}</span>
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-semibold text-white truncate">{displayName}</p>
            <p className="text-xs text-gray-400 truncate">{roleLabel}</p>
          </div>
        </Link>
      </div>
    </aside>
  )
}
