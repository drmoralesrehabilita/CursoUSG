"use client"

import { logout } from "@/app/login/actions"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export function ProfileSettingsClient() {
  const router = useRouter()

  return (
    <div className="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-lg font-bold text-secondary dark:text-white flex items-center gap-2 mb-6">
        <span className="material-symbols-outlined text-primary">settings_account_box</span>
        Configuración de Cuenta
      </h3>
      <div className="space-y-4">
        <button 
          onClick={() => router.push('/settings')}
          className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group border border-transparent hover:border-gray-200 dark:hover:border-gray-600"
        >
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-gray-400 group-hover:text-primary transition-colors">lock</span>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300 group-hover:text-secondary dark:group-hover:text-white">Cambiar Contraseña</span>
          </div>
          <span className="material-symbols-outlined text-gray-300 text-sm">arrow_forward_ios</span>
        </button>
        <button 
          className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group border border-transparent hover:border-gray-200 dark:hover:border-gray-600"
          onClick={() => toast.info("Las notificaciones push estarán disponibles próximamente.")}
        >
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-gray-400 group-hover:text-primary transition-colors">notifications</span>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300 group-hover:text-secondary dark:group-hover:text-white">Notificaciones</span>
          </div>
          <span className="text-xs text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full">Próximamente</span>
        </button>
        <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group border border-transparent hover:border-gray-200 dark:hover:border-gray-600 cursor-default">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-gray-400 group-hover:text-primary transition-colors">language</span>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300 group-hover:text-secondary dark:group-hover:text-white">Idioma / Región</span>
          </div>
          <span className="text-xs text-gray-400">Español (MX)</span>
        </button>
        <div className="pt-4 mt-2 border-t border-gray-100 dark:border-gray-700">
          <form action={logout}>
            <button type="submit" className="w-full text-left text-sm text-red-500 hover:text-red-600 font-medium py-2 flex items-center gap-2">
              <span className="material-symbols-outlined">logout</span>
              Cerrar Sesión
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
