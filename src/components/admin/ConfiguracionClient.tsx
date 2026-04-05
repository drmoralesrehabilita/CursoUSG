"use client"

import { useState } from "react"
import { createBrowserClient } from '@supabase/ssr'
import { useRouter } from 'next/navigation'

type TabType = "perfil" | "sistema" | "roles"

// ─── Toggle row component ───────────────────────────────────
function ToggleRow({
  label,
  description,
  settingKey,
  checked,
  disabled,
  onChange,
  dangerWhenOn = false,
}: {
  label: string
  description: string
  settingKey: string
  checked: boolean
  disabled: boolean
  onChange: (key: string, value: boolean) => void
  dangerWhenOn?: boolean
}) {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 gap-4">
      <div className="flex-1 min-w-0">
        <p className="font-medium text-gray-900 dark:text-white text-sm">{label}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 leading-relaxed">{description}</p>
      </div>
      <label className="relative inline-flex items-center cursor-pointer shrink-0">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={checked}
          onChange={(e) => onChange(settingKey, e.target.checked)}
          disabled={disabled}
        />
        <div className={`w-11 h-6 rounded-full peer transition-colors after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full peer-checked:after:border-white bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 ${
          dangerWhenOn ? 'peer-checked:bg-amber-500' : 'peer-checked:bg-primary'
        }`}></div>
      </label>
    </div>
  )
}

// ─── Section card ───────────────────────────────────────────
function SettingsCard({
  icon,
  iconColor,
  title,
  description,
  children,
}: {
  icon: string
  iconColor: string
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <div className="bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
      <h3 className="text-lg font-bold text-secondary dark:text-white mb-1 flex items-center gap-2">
        <span className={`material-symbols-outlined ${iconColor}`}>{icon}</span>
        {title}
      </h3>
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-5">{description}</p>
      <div className="space-y-3">{children}</div>
    </div>
  )
}

// ─── Main component ─────────────────────────────────────────
export function ConfiguracionClient({
  initialProfiles,
  initialSettings,
  currentUser,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialProfiles: any[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialSettings: any[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  currentUser: any
}) {
  const [activeTab, setActiveTab] = useState<TabType>("perfil")
  const [profiles, setProfiles] = useState(initialProfiles)
  const [settings, setSettings] = useState(initialSettings)
  const [isLoading, setIsLoading] = useState(false)
  const [savedKey, setSavedKey] = useState<string | null>(null)
  const router = useRouter()

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

      if (error) throw error
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
      const { error } = await supabase
        .from('app_settings')
        .upsert({ key, value, updated_by: currentUser.id })

      if (error) throw error

      const exists = settings.find(s => s.key === key)
      if (exists) {
        setSettings(settings.map(s => s.key === key ? { ...s, value } : s))
      } else {
        setSettings([...settings, { key, value }])
      }

      // Brief "saved" feedback
      setSavedKey(key)
      setTimeout(() => setSavedKey(null), 1500)

      router.refresh()
    } catch (error) {
      console.error("Error updating setting:", error)
      alert("Error al actualizar el ajuste")
    } finally {
      setIsLoading(false)
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getSetting = (key: string, defaultVal: any) => {
    const s = settings.find(s => s.key === key)
    return s ? s.value : defaultVal
  }

  const getBool = (key: string, defaultVal = true) => Boolean(getSetting(key, defaultVal))

  return (
    <div className="flex-1 overflow-y-auto p-6">

      {/* TABS HEADER */}
      <div className="flex space-x-2 border-b border-gray-200 dark:border-gray-800 mb-6">
        {([
          { id: "perfil", label: "Mi Perfil" },
          { id: "sistema", label: "Ajustes del Sistema" },
          { id: "roles", label: "Roles y Seguridad" },
        ] as { id: TabType; label: string }[]).map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-3 px-4 font-medium text-sm transition-colors relative ${activeTab === tab.id ? 'text-primary' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'}`}
          >
            {tab.label}
            {activeTab === tab.id && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-t-full" />}
          </button>
        ))}
      </div>

      {/* TABS CONTENT */}
      <div className="space-y-6 max-w-4xl">

        {/* ── PERFIL TAB ── */}
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

        {/* ── SISTEMA TAB ── */}
        {activeTab === 'sistema' && (
          <div className="space-y-6">

            {/* Saved indicator */}
            {savedKey && (
              <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl px-4 py-2.5 animate-in fade-in slide-in-from-top-2 duration-200">
                <span className="material-symbols-outlined text-base">check_circle</span>
                Ajuste guardado correctamente
              </div>
            )}

            {/* ── 1. SISTEMA ── */}
            <SettingsCard icon="construction" iconColor="text-amber-500" title="Modo Mantenimiento" description="Bloquea el acceso temporal a todos los estudiantes mientras realizas actualizaciones.">
              <ToggleRow
                label="Activar Modo Mantenimiento"
                description="Solo administradores podrán iniciar sesión. Los estudiantes verán una pantalla de mantenimiento."
                settingKey="maintenance_mode"
                checked={getBool('maintenance_mode', false)}
                disabled={isLoading}
                onChange={handleSettingChange}
                dangerWhenOn
              />
            </SettingsCard>

            {/* ── 2. BANNER ── */}
            <SettingsCard icon="campaign" iconColor="text-blue-500" title="Banner de Anuncios" description="Muestra un mensaje importante en la parte superior del Dashboard de estudiantes.">
              <div className="flex items-center gap-3 mb-2">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={getSetting('announcement_banner', { active: false }).active}
                    onChange={(e) => {
                      const current = getSetting('announcement_banner', { active: false, message: '', type: 'info' })
                      handleSettingChange('announcement_banner', { ...current, active: e.target.checked })
                    }}
                    disabled={isLoading}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
                <span className="text-sm font-medium text-gray-900 dark:text-white">Mostrar Banner</span>
              </div>

              {getSetting('announcement_banner', { active: false }).active && (
                <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Mensaje del Banner</label>
                    <input
                      type="text"
                      value={getSetting('announcement_banner', { message: '' }).message || ""}
                      onChange={(e) => {
                        const current = getSetting('announcement_banner', { active: false })
                        setSettings(settings.map(s => s.key === 'announcement_banner' ? { ...s, value: { ...current, message: e.target.value } } : s))
                      }}
                      onBlur={(e) => {
                        const current = getSetting('announcement_banner', { active: false })
                        handleSettingChange('announcement_banner', { ...current, message: e.target.value })
                      }}
                      placeholder="Ej. ¡Nuevo módulo disponible esta semana!"
                      className="w-full bg-white dark:bg-surface-dark border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-2 text-sm text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
              )}
            </SettingsCard>

            {/* ── 3. CERTIFICADOS ── */}
            <SettingsCard icon="workspace_premium" iconColor="text-yellow-500" title="Certificados y Evaluaciones" description="Controla cuándo y cómo se emiten los certificados del curso.">
              <ToggleRow
                label="Emitir Certificados Automáticamente"
                description="Cuando está desactivado, ningún certificado se emite automáticamente al concluir un módulo. Ideal para reactivar cuando hayas subido todos los módulos."
                settingKey="auto_certificates"
                checked={getBool('auto_certificates', true)}
                disabled={isLoading}
                onChange={handleSettingChange}
              />
              <ToggleRow
                label="Requerir Evaluaciones para Certificar"
                description="Los alumnos deben aprobar todos los quizzes del módulo antes de recibir su certificado. Desactiva para certificar solo con ver el contenido."
                settingKey="require_evaluations_for_cert"
                checked={getBool('require_evaluations_for_cert', true)}
                disabled={isLoading}
                onChange={handleSettingChange}
              />
              <ToggleRow
                label="Permitir Descarga de Certificados (PDF)"
                description="Muestra el botón de descarga PDF en el dashboard del alumno. Desactiva si deseas revisar los certificados antes de liberar las descargas."
                settingKey="allow_certificate_download"
                checked={getBool('allow_certificate_download', true)}
                disabled={isLoading}
                onChange={handleSettingChange}
              />
            </SettingsCard>

            {/* ── 4. CONTENIDO ── */}
            <SettingsCard icon="video_library" iconColor="text-purple-500" title="Contenido y Progreso" description="Define cómo los alumnos navegan y visualizan el contenido del curso.">
              <ToggleRow
                label="Habilitar Prerequisitos por Módulo"
                description="Los alumnos deben completar el módulo anterior antes de acceder al siguiente. Desactiva para permitir acceso libre a todos los módulos."
                settingKey="enforce_prerequisites"
                checked={getBool('enforce_prerequisites', true)}
                disabled={isLoading}
                onChange={handleSettingChange}
              />
              <ToggleRow
                label="Mostrar Sección de Micro-Aprendizaje"
                description="Muestra la sección de Micro-Aprendizaje Complementario en el Dashboard del alumno. Desactiva mientras preparas el contenido."
                settingKey="show_microlearning"
                checked={getBool('show_microlearning', true)}
                disabled={isLoading}
                onChange={handleSettingChange}
              />
              <ToggleRow
                label="Mostrar Barra de Progreso al Alumno"
                description="Muestra el porcentaje de avance del módulo activo. Desactiva para un estilo más limpio sin métricas numéricas."
                settingKey="show_progress_bar"
                checked={getBool('show_progress_bar', true)}
                disabled={isLoading}
                onChange={handleSettingChange}
              />
            </SettingsCard>

            {/* ── 5. COMUNIDAD ── */}
            <SettingsCard icon="forum" iconColor="text-green-500" title="Comunidad y Gamificación" description="Configura las funciones sociales y de motivación para los alumnos.">
              <ToggleRow
                label="Habilitar Foro de Comunidad"
                description="Cuando está desactivado, la sección de Comunidad se oculta de la navegación del alumno. Los datos del foro se conservan."
                settingKey="enable_community_forum"
                checked={getBool('enable_community_forum', true)}
                disabled={isLoading}
                onChange={handleSettingChange}
              />
              <ToggleRow
                label="Mostrar Racha de Estudio (🔥 Gamificación)"
                description="Muestra el widget de racha de días consecutivos de estudio en el Dashboard. Desactiva para un estilo más formal sin gamificación."
                settingKey="show_study_streak"
                checked={getBool('show_study_streak', true)}
                disabled={isLoading}
                onChange={handleSettingChange}
              />
            </SettingsCard>

            {/* ── 6. ACCESO ── */}
            <SettingsCard icon="manage_accounts" iconColor="text-red-500" title="Acceso y Registro" description="Controla quién puede acceder y registrarse en la plataforma.">
              <ToggleRow
                label="Registro Abierto al Público"
                description="Cuando está desactivado, la página de registro muestra un mensaje de cierre. Útil para cerrar inscripciones después de un periodo."
                settingKey="open_registration"
                checked={getBool('open_registration', true)}
                disabled={isLoading}
                onChange={handleSettingChange}
                dangerWhenOn={false}
              />
              <ToggleRow
                label="Mostrar Sesiones en Vivo en Dashboard"
                description="Muestra la tarjeta de 'Próxima Sesión en Vivo' en el Dashboard del alumno. Desactiva cuando no hay clases programadas para un dashboard más limpio."
                settingKey="show_live_sessions"
                checked={getBool('show_live_sessions', true)}
                disabled={isLoading}
                onChange={handleSettingChange}
              />
            </SettingsCard>

          </div>
        )}

        {/* ── ROLES TAB ── */}
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
                            <p className="text-xs text-gray-500">{p.id.substring(0, 8)}...</p>
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
