<<<<<<< HEAD
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
=======
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { 
  Bell, 
  Lock, 
  Globe, 
  Moon, 
  Shield, 
  CreditCard,
  LogOut,
  Smartphone,
  ChevronRight,
  ShieldCheck,
  Languages
} from "lucide-react"

export default function SettingsPage() {
  const [isDarkMode, setIsDarkMode] = useState(true)

  return (
    <div className="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark">
      <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-8">
        
        {/* Header */}
        <div className="space-y-1">
           <h1 className="text-3xl font-black text-secondary dark:text-white">Configuración</h1>
           <p className="text-slate-500 dark:text-slate-400 font-medium">Gestiona tu cuenta, preferencias y seguridad.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
           
           {/* Navigation Sidebar */}
           <div className="lg:col-span-4 space-y-6">
              <div className="bg-white dark:bg-surface-dark rounded-2xl border border-slate-200 dark:border-border/10 p-2 overflow-hidden shadow-sm">
                 {[
                   { icon: Lock, label: "Seguridad", color: "text-blue-500", active: true },
                   { icon: Bell, label: "Notificaciones", color: "text-orange-500" },
                   { icon: Globe, label: "Idioma", color: "text-emerald-500" },
                   { icon: CreditCard, label: "Suscripción", color: "text-violet-500" },
                 ].map((item, i) => (
                   <button 
                     key={i}
                     className={`w-full flex items-center gap-3 p-3 rounded-xl font-bold text-sm transition-all ${
                       item.active 
                        ? "bg-primary/10 text-primary border border-primary/20" 
                        : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 border border-transparent"
                     }`}
                   >
                     <item.icon className={`w-4 h-4 ${item.active ? 'text-primary' : item.color}`} />
                     {item.label}
                     <ChevronRight className={`w-4 h-4 ml-auto opacity-50 ${item.active ? 'opacity-100' : ''}`} />
                   </button>
                 ))}
                 <Separator className="my-2 bg-slate-100 dark:bg-white/5" />
                 <button className="w-full flex items-center gap-3 p-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 font-bold text-sm transition-all group">
                    <LogOut className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Cerrar Sesión
                 </button>
              </div>

              <div className="bg-secondary p-6 rounded-2xl relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl rounded-full translate-x-12 -translate-y-12" />
                 <ShieldCheck className="w-8 h-8 text-primary mb-4" />
                 <h4 className="text-white font-bold mb-2">Estado de Privacidad</h4>
                 <p className="text-xs text-blue-100/60 leading-relaxed mb-4">Tu cuenta cumple con todos los protocolos de seguridad actuales.</p>
                 <Button className="w-full bg-white/10 hover:bg-white/20 text-white border-white/10 rounded-xl h-9 text-xs font-bold">Revisar Protocolos</Button>
              </div>
           </div>

           {/* Main Content Area */}
           <div className="lg:col-span-8 space-y-6">
              
              {/* Security Section */}
              <Card className="rounded-2xl border-slate-200 dark:border-border/10 bg-white dark:bg-surface-dark shadow-sm">
                 <CardHeader>
                    <CardTitle className="text-lg font-bold">Cambiar Contraseña</CardTitle>
                    <CardDescription className="font-medium">Te recomendamos usar una combinación de letras, números y símbolos.</CardDescription>
                 </CardHeader>
                 <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       <div className="space-y-2">
                          <Label className="text-xs font-bold uppercase tracking-wider text-slate-500">Contraseña Actual</Label>
                          <Input type="password" placeholder="••••••••" className="h-11 rounded-xl bg-slate-50 dark:bg-background-dark border-slate-200 dark:border-border/10" />
                       </div>
                       <div className="space-y-2" />
                       <div className="space-y-2">
                          <Label className="text-xs font-bold uppercase tracking-wider text-slate-500">Nueva Contraseña</Label>
                          <Input type="password" placeholder="••••••••" className="h-11 rounded-xl bg-slate-50 dark:bg-background-dark border-slate-200 dark:border-border/10" />
                       </div>
                       <div className="space-y-2">
                          <Label className="text-xs font-bold uppercase tracking-wider text-slate-500">Confirmar Contraseña</Label>
                          <Input type="password" placeholder="••••••••" className="h-11 rounded-xl bg-slate-50 dark:bg-background-dark border-slate-200 dark:border-border/10" />
                       </div>
                    </div>
                    <Button className="rounded-xl bg-primary hover:bg-blue-600 text-white font-bold h-11 px-8 shadow-lg shadow-primary/20 mt-2">
                       Actualizar Contraseña
                    </Button>
                 </CardContent>
              </Card>

              {/* Preferences Section */}
              <Card className="rounded-2xl border-slate-200 dark:border-border/10 bg-white dark:bg-surface-dark shadow-sm">
                 <CardHeader>
                    <CardTitle className="text-lg font-bold">Preferencias</CardTitle>
                 </CardHeader>
                 <CardContent className="space-y-0">
                    <div className="flex items-center justify-between py-4 group">
                       <div className="flex items-center gap-4">
                          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-background-dark text-slate-400 group-hover:text-primary transition-colors">
                             <Moon className="w-5 h-5" />
                          </div>
                          <div>
                             <p className="text-sm font-bold text-slate-700 dark:text-white">Modo Oscuro</p>
                             <p className="text-xs text-slate-500 dark:text-slate-400">Alternar tema visual de la aplicación</p>
                          </div>
                       </div>
                       <Switch checked={isDarkMode} onCheckedChange={setIsDarkMode} className="data-[state=checked]:bg-primary" />
                    </div>
                    
                    <Separator className="bg-slate-100 dark:bg-white/5" />

                    <div className="flex items-center justify-between py-4 group">
                       <div className="flex items-center gap-4">
                          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-background-dark text-slate-400 group-hover:text-primary transition-colors">
                             <Bell className="w-5 h-5" />
                          </div>
                          <div>
                             <p className="text-sm font-bold text-slate-700 dark:text-white">Notificaciones Push</p>
                             <p className="text-xs text-slate-500 dark:text-slate-400">Recibir avisos de nuevas lecciones</p>
                          </div>
                       </div>
                       <Switch defaultChecked className="data-[state=checked]:bg-primary" />
                    </div>

                    <Separator className="bg-slate-100 dark:bg-white/5" />

                    <div className="flex items-center justify-between py-4 group">
                       <div className="flex items-center gap-4">
                          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-background-dark text-slate-400 group-hover:text-primary transition-colors">
                             <Smartphone className="w-5 h-5" />
                          </div>
                          <div>
                             <p className="text-sm font-bold text-slate-700 dark:text-white">Verificación en Dos Pasos</p>
                             <p className="text-xs text-slate-500 dark:text-slate-400">Aumentar la seguridad de tu acceso</p>
                          </div>
                       </div>
                       <Button size="sm" variant="outline" className="rounded-lg h-9 font-bold bg-white text-[10px] uppercase tracking-wider text-slate-400 border-slate-200">Desactivado</Button>
                    </div>
                 </CardContent>
              </Card>

              {/* Danger Zone */}
              <div className="p-6 rounded-2xl bg-red-500/5 border border-red-500/20 flex items-center justify-between group">
                 <div>
                    <h4 className="text-sm font-bold text-red-600 mb-1">Zona de Peligro</h4>
                    <p className="text-xs text-red-500/70 font-medium">Una vez eliminada la cuenta, no hay vuelta atrás. Por favor ten cuidado.</p>
                 </div>
                 <Button variant="ghost" className="h-10 px-6 rounded-xl text-red-600 hover:bg-red-500 hover:text-white font-bold text-xs transition-all">Eliminar Cuenta</Button>
              </div>

           </div>
        </div>
      </div>
    </div>
>>>>>>> origin/main
  )
}
