<<<<<<< HEAD

"use client"

import { Header } from "@/components/dashboard/header"

export default function ProfilePage() {
  return (
    <>
      <Header title="Mi Perfil" />
      <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-background-light dark:bg-background-dark font-body">
        <div className="relative bg-secondary rounded-2xl shadow-lg p-6 md:p-8 mb-8 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-600/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8">
            <div className="relative">
              <img
                alt="Profile"
                className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-primary shadow-2xl object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD8MYIP6p3bPfy1MXhtDHs8bWhWR2iyZfKLoO4L6Ve1DAEDPYSQfkefxuK7rP7rCfYg1_ctlukp-nxC7NzUE7A-aY3ChhOaO0Hd0wayxa0BAnuk6M5ZMuNKhZ7jjnI-AXWYa4dDzw0sr0Pec3WdvryKi2GGJacdg-HPxZKvCRsmkhBHdzhhtGAxsn0PgpK0VG-S4Uk9XnZxZh7jFqck6-I7qYJ4pAzwTp0WjPfniE_P8fQCWtofHggG66en_3twnIfPXvoONwEDF81E"
              />
              <span className="absolute bottom-2 right-2 bg-green-500 w-5 h-5 rounded-full border-2 border-secondary"></span>
            </div>
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2 justify-center md:justify-start">
                <h1 className="text-3xl font-bold text-white">Dr. Héctor García</h1>
                <span className="bg-primary/20 text-primary border border-primary/30 px-3 py-1 rounded-full text-sm font-semibold inline-flex items-center gap-1 self-center md:self-auto">
                  <span className="material-symbols-outlined text-base">verified</span>
                  Residente 3
                </span>
              </div>
              <p className="text-gray-300 text-lg mb-1">Diplomado Internacional de Rehabilitación Intervencionista</p>
              <p className="text-gray-400 text-sm flex items-center justify-center md:justify-start gap-1">
                <span className="material-symbols-outlined text-base">location_on</span> Ciudad de México, México
              </p>
              <div className="mt-6 flex flex-wrap gap-3 justify-center md:justify-start">
                <button className="bg-primary hover:bg-cyan-500 text-white px-5 py-2.5 rounded-lg font-medium transition-colors flex items-center gap-2 shadow-lg shadow-primary/20">
                  <span className="material-symbols-outlined text-xl">edit_square</span>
                  Editar Perfil
                </button>
                <button className="bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-lg font-medium transition-colors flex items-center gap-2 border border-white/10">
                  <span className="material-symbols-outlined text-xl">history_edu</span>
                  Descargar Historial
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 md:p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-secondary dark:text-white flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">badge</span>
                  Datos Profesionales
                </h3>
                <button className="text-primary hover:text-cyan-400 text-sm font-medium">Actualizar</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Nombre Completo</label>
                  <p className="text-gray-800 dark:text-gray-200 font-medium">Héctor Manuel García López</p>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Correo Electrónico</label>
                  <div className="flex items-center gap-2">
                    <p className="text-gray-800 dark:text-gray-200 font-medium">dr.garcia@medico.mx</p>
                    <span className="material-symbols-outlined text-green-500 text-sm" title="Verificado">check_circle</span>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">WhatsApp</label>
                  <p className="text-gray-800 dark:text-gray-200 font-medium">+52 55 1234 5678</p>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Cédula Profesional</label>
                  <div className="flex items-center gap-2">
                    <p className="text-gray-800 dark:text-gray-200 font-medium tracking-widest">87654321</p>
                    <span className="bg-green-500/10 text-green-500 text-[10px] px-2 py-0.5 rounded border border-green-500/20 font-bold uppercase">Validada</span>
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Institución Actual</label>
                  <p className="text-gray-800 dark:text-gray-200 font-medium">Hospital General de México - Depto. de Rehabilitación</p>
                </div>
              </div>
            </div>
            <div className="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 md:p-8">
              <h3 className="text-xl font-bold text-secondary dark:text-white flex items-center gap-2 mb-6">
                <span className="material-symbols-outlined text-primary">medical_services</span>
                Especialidad y Áreas de Interés
              </h3>
              <div className="mb-6">
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Especialidad Principal</label>
                <div className="bg-background-light dark:bg-background-dark p-3 rounded-lg border border-gray-200 dark:border-gray-700 inline-block">
                  <span className="text-secondary dark:text-white font-medium">Medicina Física y Rehabilitación</span>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Intereses Clínicos (Tags)</label>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1.5 bg-primary/10 text-primary border border-primary/20 rounded-full text-sm font-medium">Ecografía MSK</span>
                  <span className="px-3 py-1.5 bg-secondary/5 dark:bg-white/5 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600 rounded-full text-sm font-medium">Hombro</span>
                  <span className="px-3 py-1.5 bg-secondary/5 dark:bg-white/5 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600 rounded-full text-sm font-medium">Columna</span>
                  <span className="px-3 py-1.5 bg-secondary/5 dark:bg-white/5 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600 rounded-full text-sm font-medium">Intervencionismo</span>
                  <span className="px-3 py-1.5 bg-secondary/5 dark:bg-white/5 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600 rounded-full text-sm font-medium">Dolor Crónico</span>
                  <button className="px-3 py-1.5 border border-dashed border-gray-400 text-gray-400 hover:text-primary hover:border-primary rounded-full text-sm font-medium transition-colors flex items-center gap-1">
                    <span className="material-symbols-outlined text-base">add</span> Añadir
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-1 space-y-8">
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
                    <p className="text-2xl font-bold text-secondary dark:text-white">124h</p>
                    <p className="text-xs text-gray-500">Horas estudiadas</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500">
                    <span className="material-symbols-outlined">school</span>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-secondary dark:text-white">8</p>
                    <p className="text-xs text-gray-500">Cursos completados</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500">
                    <span className="material-symbols-outlined">quiz</span>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-secondary dark:text-white">92%</p>
                    <p className="text-xs text-gray-500">Promedio Quiz</p>
                  </div>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-700">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Próximo Examen</p>
                <div className="bg-gradient-to-r from-secondary to-blue-900 rounded-xl p-4 text-white relative overflow-hidden">
                  <div className="absolute right-0 top-0 w-16 h-16 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-lg"></div>
                  <p className="font-bold text-sm">Certificación Mod. 3</p>
                  <p className="text-xs opacity-80 mb-2">28 de Octubre, 2023</p>
                  <div className="w-full bg-white/20 rounded-full h-1.5 mt-2">
                    <div className="bg-primary h-1.5 rounded-full w-[0%]"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-bold text-secondary dark:text-white flex items-center gap-2 mb-6">
                <span className="material-symbols-outlined text-primary">settings_account_box</span>
                Configuración de Cuenta
              </h3>
              <div className="space-y-4">
                <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group border border-transparent hover:border-gray-200 dark:hover:border-gray-600">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-gray-400 group-hover:text-primary transition-colors">lock</span>
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300 group-hover:text-secondary dark:group-hover:text-white">Cambiar Contraseña</span>
                  </div>
                  <span className="material-symbols-outlined text-gray-300 text-sm">arrow_forward_ios</span>
                </button>
                <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group border border-transparent hover:border-gray-200 dark:hover:border-gray-600">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-gray-400 group-hover:text-primary transition-colors">notifications</span>
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300 group-hover:text-secondary dark:group-hover:text-white">Notificaciones</span>
                  </div>
                  <div className="relative inline-block w-8 h-4 align-middle select-none transition duration-200 ease-in">
                    <input className="toggle-checkbox absolute block w-4 h-4 rounded-full bg-white border-4 appearance-none cursor-pointer checked:right-0 right-4 checked:border-primary border-gray-300" id="toggle" name="toggle" type="checkbox" />
                    <label className="toggle-label block overflow-hidden h-4 rounded-full bg-gray-300 cursor-pointer checked:bg-primary" htmlFor="toggle"></label>
                  </div>
                </button>
                <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group border border-transparent hover:border-gray-200 dark:hover:border-gray-600">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-gray-400 group-hover:text-primary transition-colors">language</span>
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300 group-hover:text-secondary dark:group-hover:text-white">Idioma / Región</span>
                  </div>
                  <span className="text-xs text-gray-400">Español (MX)</span>
                </button>
                <div className="pt-4 mt-2 border-t border-gray-100 dark:border-gray-700">
                  <button className="w-full text-left text-sm text-red-500 hover:text-red-600 font-medium py-2 flex items-center gap-2">
                    <span className="material-symbols-outlined">logout</span>
                    Cerrar Sesión
                  </button>
                </div>
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
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Award, 
  Stethoscope, 
  Activity, 
  Settings as SettingsIcon,
  LogOut,
  ChevronRight,
  TrendingUp,
  Clock,
  CheckCircle2
} from "lucide-react"

export default function ProfilePage() {
  const [activeTab, setActiveTab ] = useState("overview")

  return (
    <div className="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark">
      <div className="max-w-5xl mx-auto p-4 md:p-8 space-y-8">
        
        {/* Profile Header Card */}
        <section className="relative">
           {/* Decorative Banner Background */}
           <div className="h-32 md:h-48 w-full bg-gradient-to-r from-secondary to-primary rounded-3xl overflow-hidden opacity-90 dark:opacity-40">
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 10px 10px, white 1px, transparent 0)', backgroundSize: '30px 30px' }} />
           </div>
           
           <div className="px-6 md:px-10 -mt-12 md:-mt-16 flex flex-col md:flex-row items-center md:items-end gap-6 relative z-10">
              <div className="w-32 h-32 md:w-36 md:h-36 rounded-3xl bg-white dark:bg-surface-dark p-2 shadow-2xl border border-slate-100 dark:border-border/10">
                 <div className="w-full h-full rounded-2xl bg-slate-100 dark:bg-background-dark flex items-center justify-center text-4xl font-black text-primary">
                    RM
                 </div>
              </div>
              <div className="flex-1 text-center md:text-left pb-2 space-y-1">
                 <div className="flex flex-col md:flex-row md:items-center gap-3">
                   <h1 className="text-3xl font-black text-slate-900 dark:text-white">Dr. Raúl Morales</h1>
                   <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 w-fit mx-auto md:mx-0">
                      Médico Especialista
                   </Badge>
                 </div>
                 <p className="text-slate-500 dark:text-slate-400 font-medium flex items-center justify-center md:justify-start gap-2">
                    <MapPin className="w-4 h-4" /> Ciudad de México, MX
                 </p>
              </div>
              <div className="flex gap-3 pb-2">
                 <Button className="rounded-xl bg-primary hover:bg-blue-600 text-white font-bold h-11 px-6 shadow-lg shadow-primary/20">
                    <SettingsIcon className="w-4 h-4 mr-2" /> Editar Perfil
                 </Button>
              </div>
           </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
           
           {/* Left Column: Details & Sidebar */}
           <div className="lg:col-span-4 space-y-6">
              <Card className="rounded-2xl border-slate-200 dark:border-border/10 bg-white dark:bg-surface-dark">
                <CardHeader>
                   <CardTitle className="text-lg font-bold">Datos Profesionales</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                   <div className="flex items-center gap-4 text-sm">
                      <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-background-dark flex items-center justify-center text-slate-400">
                         <Stethoscope className="w-5 h-5 text-primary" />
                      </div>
                      <div className="space-y-0.5">
                         <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Especialidad</p>
                         <p className="font-bold text-slate-700 dark:text-slate-200">Rehabilitación Médica</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-4 text-sm">
                      <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-background-dark flex items-center justify-center text-slate-400">
                         <Award className="w-5 h-5 text-primary" />
                      </div>
                      <div className="space-y-0.5">
                         <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Cédula Profesional</p>
                         <p className="font-bold text-slate-700 dark:text-slate-200">123456789</p>
                      </div>
                   </div>
                   <Separator className="bg-slate-100 dark:bg-white/5" />
                   <div className="space-y-3">
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Áreas de Interés</p>
                      <div className="flex flex-wrap gap-2">
                         {["MSK", "USG", "Intervencionismo"].map((tag) => (
                            <Badge key={tag} variant="secondary" className="rounded-lg bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 border-none font-semibold">
                               {tag}
                            </Badge>
                         ))}
                      </div>
                   </div>
                </CardContent>
              </Card>

              <Card className="rounded-2xl border-slate-200 dark:border-border/10 bg-white dark:bg-surface-dark overflow-hidden">
                 <div className="p-1 space-y-1">
                    {[
                      { icon: Activity, label: "Actividad Académica", id: "overview" },
                      { icon: Mail, label: "Contacto", id: "contact" },
                      { icon: TrendingUp, label: "Resultados", id: "stats" },
                    ].map((item) => (
                      <button 
                         key={item.id}
                         onClick={() => setActiveTab(item.id)}
                         className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 font-bold text-sm ${
                           activeTab === item.id 
                            ? "bg-primary text-white shadow-md shadow-primary/20" 
                            : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5"
                         }`}
                      >
                         <item.icon className="w-4 h-4" />
                         {item.label}
                         {activeTab === item.id && <ChevronRight className="w-4 h-4 ml-auto" />}
                      </button>
                    ))}
                    <button className="w-full flex items-center gap-3 p-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 font-bold text-sm transition-all duration-200 mt-2">
                       <LogOut className="w-4 h-4" /> Cerrar Sesión
                    </button>
                 </div>
              </Card>
           </div>

           {/* Right Column: Main Content */}
           <div className="lg:col-span-8 space-y-8">
              
              {/* Metric Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                 {[
                   { icon: CheckCircle2, label: "Módulos", val: "12/15", color: "text-emerald-500" },
                   { icon: Clock, label: "Horas", val: "84h", color: "text-blue-500" },
                   { icon: TrendingUp, label: "Promedio", val: "94%", color: "text-orange-500" },
                 ].map((stat, i) => (
                    <div key={i} className="bg-white dark:bg-surface-dark p-6 rounded-2xl border border-slate-200 dark:border-border/10 shadow-sm flex items-center gap-4">
                       <div className={`p-3 rounded-xl bg-slate-50 dark:bg-background-dark ${stat.color}`}>
                          <stat.icon className="w-6 h-6" />
                       </div>
                       <div>
                          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">{stat.label}</p>
                          <p className="text-xl font-black text-slate-900 dark:text-white">{stat.val}</p>
                       </div>
                    </div>
                 ))}
              </div>

              {/* Activity Section */}
              <Card className="rounded-2xl border-slate-200 dark:border-border/10 bg-white dark:bg-surface-dark">
                 <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-xl font-black text-slate-900 dark:text-white underline decoration-primary decoration-4 underline-offset-8">
                       Progreso Reciente
                    </CardTitle>
                    <Button variant="ghost" size="sm" className="text-primary font-bold">Ver Todo</Button>
                 </CardHeader>
                 <CardContent className="space-y-6">
                    {[
                      { title: "Módulo 4: Miembro Superior", desc: "Completaste la lección 4.2: Abordaje Hombro", type: "success" },
                      { title: "Módulo 5: Evaluación", desc: "Obtuviste un 98% en el examen teórico", type: "eval" },
                      { title: "Módulo 6: Miembro Inferior", desc: "Iniciaste la lección 6.1: Anatomía Dinámica", type: "prog" },
                    ].map((act, i) => (
                      <div key={i} className="flex gap-4 group cursor-pointer">
                         <div className="flex flex-col items-center">
                            <div className={`w-3 h-3 rounded-full mt-1 ${
                              act.type === 'success' ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 
                              act.type === 'eval' ? 'bg-primary shadow-[0_0_10px_rgba(0,180,216,0.5)]' : 'bg-slate-300 dark:bg-slate-600'
                            }`} />
                            {i < 2 && <div className="w-[2px] flex-1 bg-slate-100 dark:bg-white/5 my-1" />}
                         </div>
                         <div className="pb-6 flex-1">
                            <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">{act.title}</h4>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{act.desc}</p>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-2 flex items-center gap-1">
                               <Clock className="w-3 h-3" /> Hace 2 días
                            </p>
                         </div>
                      </div>
                    ))}
                 </CardContent>
              </Card>

              {/* Account Card (Quick View) */}
              <Card className="rounded-2xl border-slate-200 dark:border-border/10 bg-primary/5 dark:bg-primary/10 overflow-hidden relative">
                 <div className="absolute right-0 top-0 w-32 h-32 bg-primary/20 blur-3xl rounded-full translate-x-12 -translate-y-12" />
                 <CardHeader>
                   <CardTitle className="text-lg font-bold text-primary">Seguridad de la Cuenta</CardTitle>
                   <CardDescription className="text-slate-500 font-medium">Gestiona tu acceso y privacidad</CardDescription>
                 </CardHeader>
                 <CardContent className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 p-4 rounded-xl bg-white/50 dark:bg-background-dark/50 border border-white dark:border-white/5 backdrop-blur-sm">
                       <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-2">Contraseña</p>
                       <p className="font-medium text-slate-700 dark:text-white mb-3">Actualizada hace 3 meses</p>
                       <Button size="sm" variant="outline" className="rounded-lg h-9 font-bold bg-white text-xs border-primary text-primary hover:bg-primary hover:text-white transition-all">Cambiar Password</Button>
                    </div>
                    <div className="flex-1 p-4 rounded-xl bg-white/50 dark:bg-background-dark/50 border border-white dark:border-white/5 backdrop-blur-sm">
                       <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-2">Email Principal</p>
                       <p className="font-medium text-slate-700 dark:text-white mb-3">raul@medico.com</p>
                       <Button size="sm" variant="ghost" className="rounded-lg h-9 font-bold text-xs text-slate-500 hover:bg-slate-100">Administrar Emails</Button>
                    </div>
                 </CardContent>
              </Card>
           </div>
        </div>
      </div>
    </div>
>>>>>>> origin/main
  )
}
