import { Header } from "@/components/dashboard/header"
import { getUserProfile } from "@/lib/data"
import { logout } from "@/app/login/actions"

export default async function SettingsPage() {
  const profile = await getUserProfile()
  const displayName = profile?.full_name || "Usuario"
  const email = profile?.email || "—"
  const phone = profile?.phone || "—"
  const specialty = profile?.specialty || "No especificada"
  const role = profile?.role || "—"

  return (
    <>
      <Header title="Configuración" userName={displayName} />
      <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-background-light dark:bg-background-dark font-body">
        {/* Page Title */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-secondary dark:text-white mb-1">
            Configuración
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            Administra tu cuenta, preferencias y datos profesionales.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column — Main Settings */}
          <div className="lg:col-span-2 space-y-8">

            {/* Account Settings Card */}
            <div className="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 md:p-8">
              <h3 className="text-xl font-bold text-secondary dark:text-white flex items-center gap-2 mb-6">
                <span className="material-symbols-outlined text-primary">settings_account_box</span>
                Configuración de Cuenta
              </h3>
              <div className="space-y-4">
                {/* Change Password */}
                <button className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group border border-transparent hover:border-gray-200 dark:hover:border-gray-600">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                      <span className="material-symbols-outlined text-blue-500 group-hover:text-primary transition-colors">lock</span>
                    </div>
                    <div className="text-left">
                      <span className="text-sm font-semibold text-gray-700 dark:text-gray-200 group-hover:text-secondary dark:group-hover:text-white block">Cambiar Contraseña</span>
                      <span className="text-xs text-gray-400">Última actualización: hace 30 días</span>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-gray-300 text-sm">arrow_forward_ios</span>
                </button>

                {/* Notifications */}
                <div className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group border border-transparent hover:border-gray-200 dark:hover:border-gray-600">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                      <span className="material-symbols-outlined text-yellow-500 group-hover:text-primary transition-colors">notifications</span>
                    </div>
                    <div className="text-left">
                      <span className="text-sm font-semibold text-gray-700 dark:text-gray-200 group-hover:text-secondary dark:group-hover:text-white block">Notificaciones</span>
                      <span className="text-xs text-gray-400">Recibe alertas sobre nuevas lecciones y eventos</span>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-300 dark:bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary shadow-inner"></div>
                  </label>
                </div>

                {/* Language */}
                <button className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group border border-transparent hover:border-gray-200 dark:hover:border-gray-600">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                      <span className="material-symbols-outlined text-green-500 group-hover:text-primary transition-colors">language</span>
                    </div>
                    <div className="text-left">
                      <span className="text-sm font-semibold text-gray-700 dark:text-gray-200 group-hover:text-secondary dark:group-hover:text-white block">Idioma / Región</span>
                      <span className="text-xs text-gray-400">Configurar idioma preferido</span>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400 font-medium bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">Español (MX)</span>
                </button>

                {/* Logout */}
                <div className="pt-4 mt-2 border-t border-gray-100 dark:border-gray-700">
                  <form action={logout}>
                    <button
                      type="submit"
                      className="w-full flex items-center gap-3 p-4 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
                        <span className="material-symbols-outlined text-red-500">logout</span>
                      </div>
                      <span className="text-sm font-semibold">Cerrar Sesión</span>
                    </button>
                  </form>
                </div>
              </div>
            </div>

            {/* Professional Data Card */}
            <div className="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 md:p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-secondary dark:text-white flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">badge</span>
                  Datos Profesionales
                </h3>
                <button className="text-primary hover:text-cyan-400 text-sm font-medium transition-colors">
                  Editar
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Nombre Completo</label>
                  <p className="text-gray-800 dark:text-gray-200 font-medium">{displayName}</p>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Correo Electrónico</label>
                  <div className="flex items-center gap-2">
                    <p className="text-gray-800 dark:text-gray-200 font-medium">{email}</p>
                    <span className="material-symbols-outlined text-green-500 text-sm" title="Verificado">check_circle</span>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Teléfono / WhatsApp</label>
                  <p className="text-gray-800 dark:text-gray-200 font-medium">{phone}</p>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Especialidad</label>
                  <div className="bg-background-light dark:bg-background-dark p-3 rounded-lg border border-gray-200 dark:border-gray-700 inline-block">
                    <span className="text-secondary dark:text-white font-medium">{specialty}</span>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Rol</label>
                  <div className="bg-primary/10 text-primary border border-primary/20 px-3 py-1 rounded-full text-sm font-semibold inline-flex items-center gap-1">
                    <span className="material-symbols-outlined text-base">verified</span>
                    {role}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column — Activity */}
          <div className="lg:col-span-1 space-y-8">
            {/* Academic Activity */}
            <div className="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-bold text-secondary dark:text-white flex items-center gap-2 mb-6">
                <span className="material-symbols-outlined text-primary">analytics</span>
                Mi Actividad Académica
              </h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                    <span className="material-symbols-outlined">schedule</span>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-secondary dark:text-white">0h</p>
                    <p className="text-xs text-gray-500">Horas estudiadas</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500">
                    <span className="material-symbols-outlined">school</span>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-secondary dark:text-white">0</p>
                    <p className="text-xs text-gray-500">Cursos completados</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500">
                    <span className="material-symbols-outlined">quiz</span>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-secondary dark:text-white">—</p>
                    <p className="text-xs text-gray-500">Promedio Quiz</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-bold text-secondary dark:text-white flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-primary">link</span>
                Accesos Rápidos
              </h3>
              <div className="space-y-2">
                <a href="/profile" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group">
                  <span className="material-symbols-outlined text-gray-400 group-hover:text-primary transition-colors">person</span>
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300 group-hover:text-secondary dark:group-hover:text-white">Ver mi Perfil</span>
                  <span className="material-symbols-outlined text-gray-300 text-sm ml-auto">arrow_forward_ios</span>
                </a>
                <a href="/certificates" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group">
                  <span className="material-symbols-outlined text-gray-400 group-hover:text-primary transition-colors">workspace_premium</span>
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300 group-hover:text-secondary dark:group-hover:text-white">Mis Certificados</span>
                  <span className="material-symbols-outlined text-gray-300 text-sm ml-auto">arrow_forward_ios</span>
                </a>
                <a href="/dashboard" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group">
                  <span className="material-symbols-outlined text-gray-400 group-hover:text-primary transition-colors">dashboard</span>
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300 group-hover:text-secondary dark:group-hover:text-white">Ir al Dashboard</span>
                  <span className="material-symbols-outlined text-gray-300 text-sm ml-auto">arrow_forward_ios</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
