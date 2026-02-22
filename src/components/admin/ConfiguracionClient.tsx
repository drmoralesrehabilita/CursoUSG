"use client"

import { useState } from "react"
import { createBrowserClient } from '@supabase/ssr'
import { useRouter } from 'next/navigation'

type TabType = "perfil" | "sistema" | "roles"

export function ConfiguracionClient({ 
  initialProfiles, 
  initialSettings,
  currentUser 
}: { 
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialProfiles: any[], 
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialSettings: any[],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  currentUser: any
}) {
  const [activeTab, setActiveTab] = useState<TabType>("perfil")
  const [profiles, setProfiles] = useState(initialProfiles)
  const [settings, setSettings] = useState(initialSettings)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  // Supabase Client for client-side ops
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const handleRoleChange = async (userId: string, newRole: string) => {
    setIsLoading(true)
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ role: newRole })
        .eq('id', userId)

      if (error) throw error;
      
      setProfiles(profiles.map(p => p.id === userId ? { ...p, role: newRole } : p))
      router.refresh()
    } catch (error) {
      console.error("Error updating role:", error)
      alert("Error al actualizar el rol")
    } finally {
      setIsLoading(false)
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSettingChange = async (key: string, value: any) => {
    setIsLoading(true)
    try {
       // Si es upsert, usamos UPSERT
       const { error } = await supabase
         .from('app_settings')
         .upsert({ key, value, updated_by: currentUser.id })

       if (error) throw error;

       // Ensure settings exists
       const exists = settings.find(s => s.key === key)
       if (exists) {
         setSettings(settings.map(s => s.key === key ? { ...s, value } : s))
       } else {
         setSettings([...settings, { key, value }])
       }
       
       router.refresh()
    } catch(error) {
       console.error("Error updating setting:", error)
       alert("Error al actualizar el ajuste")
    } finally {
       setIsLoading(false)
    }
  }

  // Helpers to get setting values safely
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getSetting = (key: string, defaultVal: any) => {
    const s = settings.find(s => s.key === key)
    return s ? s.value : defaultVal
  }

  return (
    <div className="flex-1 overflow-y-auto p-6">
      
      {/* TABS HEADER */}
      <div className="flex space-x-2 border-b border-gray-200 dark:border-gray-800 mb-6">
        <button 
          onClick={() => setActiveTab("perfil")}
          className={`pb-3 px-4 font-medium text-sm transition-colors relative ${activeTab === 'perfil' ? 'text-primary' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'}`}
        >
          Mi Perfil
          {activeTab === 'perfil' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-t-full"></div>}
        </button>
        <button 
          onClick={() => setActiveTab("sistema")}
          className={`pb-3 px-4 font-medium text-sm transition-colors relative ${activeTab === 'sistema' ? 'text-primary' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'}`}
        >
          Ajustes del Sistema
          {activeTab === 'sistema' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-t-full"></div>}
        </button>
        <button 
          onClick={() => setActiveTab("roles")}
          className={`pb-3 px-4 font-medium text-sm transition-colors relative ${activeTab === 'roles' ? 'text-primary' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'}`}
        >
          Roles y Seguridad
          {activeTab === 'roles' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-t-full"></div>}
        </button>
      </div>

      {/* TABS CONTENT */}
      <div className="space-y-6 max-w-4xl">
        
        {/* PERFIL TAB */}
        {activeTab === 'perfil' && (
          <div className="bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-secondary dark:text-white mb-4">Información Personal</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">Administra tu identidad y credenciales de acceso como administrador maestro.</p>
            
            <div className="space-y-4 max-w-md">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nombre Completo</label>
                <input 
                  type="text" 
                  defaultValue={currentUser.full_name || ""}
                  disabled
                  className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-2.5 text-gray-900 dark:text-white opacity-70" 
                />
                <p className="text-xs text-gray-500 mt-1">Tu nombre tal como aparece en la plataforma.</p>
              </div>
              
              <div>
                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Correo Electrónico</label>
                 <input 
                   type="email" 
                   defaultValue={currentUser.email || "admin@example.com"}
                   disabled
                   className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-2.5 text-gray-900 dark:text-white opacity-70" 
                 />
              </div>

              <div className="pt-4 mt-4 border-t border-gray-100 dark:border-gray-800">
                <button className="bg-primary hover:bg-cyan-500 text-white font-semibold py-2.5 px-6 rounded-xl transition-colors text-sm" disabled={isLoading}>
                  Cambiar Contraseña
                </button>
              </div>
            </div>
          </div>
        )}

        {/* SISTEMA TAB */}
        {activeTab === 'sistema' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-secondary dark:text-white mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-amber-500">construction</span>
                Modo Mantenimiento
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">Bloquea el acceso temporal a todos los estudiantes mientras realizas actualizaciones en la plataforma.</p>
              
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Activar Modo Mantenimiento</p>
                  <p className="text-xs text-gray-500">Solo administradores podrán iniciar sesión.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={getSetting('maintenance_mode', false)}
                    onChange={(e) => handleSettingChange('maintenance_mode', e.target.checked)}
                    disabled={isLoading}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 dark:peer-focus:ring-primary/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>

            <div className="bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-secondary dark:text-white mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-blue-500">campaign</span>
                Banner de Anuncios
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">Muestra un mensaje importante en la parte superior del Dashboard de estudiantes.</p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={getSetting('announcement_banner', {active: false}).active}
                      onChange={(e) => {
                        const current = getSetting('announcement_banner', {active: false, message: '', type: 'info'})
                        handleSettingChange('announcement_banner', { ...current, active: e.target.checked })
                      }}
                      disabled={isLoading}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">Mostrar Banner</span>
                </div>
                
                {getSetting('announcement_banner', {active: false}).active && (
                  <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Mensaje del Banner</label>
                      <input 
                        type="text" 
                        value={getSetting('announcement_banner', {message: ''}).message || ""}
                        onChange={(e) => {
                           const current = getSetting('announcement_banner', {active: false})
                           setSettings(settings.map(s => s.key === 'announcement_banner' ? { ...s, value: { ...current, message: e.target.value } } : s))
                        }}
                        onBlur={(e) => {
                           const current = getSetting('announcement_banner', {active: false})
                           handleSettingChange('announcement_banner', { ...current, message: e.target.value })
                        }}
                        placeholder="Ej. ¡Nuevo curso disponible la próxima semana!"
                        className="w-full bg-white dark:bg-surface-dark border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-2 text-sm text-gray-900 dark:text-white" 
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ROLES TAB */}
        {activeTab === 'roles' && (
          <div className="bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm overflow-hidden">
             <div className="p-6 border-b border-gray-200 dark:border-gray-800">
                <h3 className="text-lg font-bold text-secondary dark:text-white">Gestión de Roles</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Concede o revoca acceso de administrador a otros usuarios.</p>
             </div>
             
             <div className="overflow-x-auto">
               <table className="w-full text-left border-collapse">
                 <thead>
                   <tr className="bg-gray-50 dark:bg-gray-900/50 text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider">
                     <th className="px-6 py-4 font-semibold">Usuario</th>
                     <th className="px-6 py-4 font-semibold">Especialidad</th>
                     <th className="px-6 py-4 font-semibold">Fecha Registro</th>
                     <th className="px-6 py-4 font-semibold">Rol Actual</th>
                     <th className="px-6 py-4 font-semibold text-right">Acción</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                   {profiles.map(p => (
                     <tr key={p.id} className="hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors">
                       <td className="px-6 py-4">
                         <div className="flex items-center gap-3">
                           <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                             {p.full_name ? p.full_name.substring(0, 2).toUpperCase() : "U"}
                           </div>
                           <div>
                             <p className="text-sm font-medium text-gray-900 dark:text-white">{p.full_name || "Usuario Sin Nombre"}</p>
                             <p className="text-xs text-gray-500">{p.id.substring(0,8)}...</p>
                           </div>
                         </div>
                       </td>
                       <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{p.specialty || "N/A"}</td>
                       <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                         {new Date(p.created_at).toLocaleDateString()}
                       </td>
                       <td className="px-6 py-4">
                         <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                           p.role === 'admin' 
                             ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300' 
                             : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                         }`}>
                           {p.role === 'admin' ? 'Administrador' : 'Estudiante'}
                         </span>
                       </td>
                       <td className="px-6 py-4 text-right">
                         {p.id !== currentUser.id && (
                           <button 
                             onClick={() => handleRoleChange(p.id, p.role === 'admin' ? 'student' : 'admin')}
                             disabled={isLoading}
                             className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-colors disabled:opacity-50 ${
                               p.role === 'admin'
                                 ? 'border-red-200 text-red-600 hover:bg-red-50 dark:border-red-900/30 dark:text-red-400 dark:hover:bg-red-900/20'
                                 : 'border-purple-200 text-purple-600 hover:bg-purple-50 dark:border-purple-900/30 dark:text-purple-400 dark:hover:bg-purple-900/20'
                             }`}
                           >
                             {p.role === 'admin' ? 'Remover Admin' : 'Hacer Admin'}
                           </button>
                         )}
                         {p.id === currentUser.id && (
                           <span className="text-xs text-gray-400 italic">Tú</span>
                         )}
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
          </div>
        )}

      </div>
    </div>
  )
}
