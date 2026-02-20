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
  )
}
