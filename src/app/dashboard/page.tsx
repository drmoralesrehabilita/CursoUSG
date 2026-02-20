<<<<<<< HEAD

import { Header } from "@/components/dashboard/header"
import { getUserProfile } from "@/lib/data"

export default async function DashboardPage() {
  const profile = await getUserProfile()
  const displayName = profile?.full_name || "Estudiante"

  return (
    <>
      <Header userName={displayName} />
      <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-background-light dark:bg-background-dark font-body">
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-secondary dark:text-white mb-2">
              Bienvenido de nuevo, <span className="text-primary">{displayName}</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
              Continúa tu especialización en ecografía intervencionista. Tienes 2 módulos pendientes esta semana.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="text-right">
              <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Tiempo de estudio</p>
              <p className="text-xl font-bold text-secondary dark:text-white">12h 30m</p>
            </div>
            <div className="h-10 w-[1px] bg-gray-300 dark:bg-gray-700 mx-2"></div>
            <div className="text-right">
              <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Cursos Completados</p>
              <p className="text-xl font-bold text-secondary dark:text-white">3/8</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Active Course Card */}
            <div className="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden relative group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="p-6 md:p-8 relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <span className="px-3 py-1 text-xs font-semibold text-primary bg-primary/10 rounded-full border border-primary/20">
                    EN PROGRESO
                  </span>
                  <span className="text-gray-400 text-sm">Actualizado hace 2h</span>
                </div>
                <h3 className="text-2xl font-bold text-secondary dark:text-white mb-2">
                  Módulo 2: Miembro Superior (Hombro)
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-lg">
                  Identificación de estructuras tendinosas del manguito rotador y técnicas de infiltración subacromial guiada por ultrasonido.
                </p>
                <div className="mb-8">
                  <div className="flex justify-between text-sm mb-2 font-medium">
                    <span className="text-secondary dark:text-gray-300">Progreso del módulo</span>
                    <span className="text-primary">65%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <div
                      className="bg-primary h-3 rounded-full shadow-lg shadow-primary/30 transition-all duration-500"
                      style={{ width: "65%" }}
                    ></div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="flex-1 bg-primary hover:bg-cyan-500 text-white font-semibold py-3 px-6 rounded-xl shadow-lg shadow-primary/25 transition-transform active:scale-95 flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined">play_circle</span>
                    Continuar Lección
                  </button>
                  <button className="flex-1 bg-white dark:bg-gray-800 text-secondary dark:text-white font-medium py-3 px-6 rounded-xl border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined">description</span>
                    Ver Material PDF
                  </button>
                </div>
              </div>
            </div>

            {/* Micro Learning */}
            <div>
              <h3 className="text-lg font-semibold text-secondary dark:text-white mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">bolt</span>
                Micro-aprendizaje: Anatomía Ecográfica
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-surface-light dark:bg-surface-dark p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary/50 dark:hover:border-primary/50 transition-all cursor-pointer group shadow-sm">
                  <div className="flex gap-4">
                    <div className="w-16 h-16 rounded-lg bg-gray-200 dark:bg-gray-800 flex items-center justify-center flex-shrink-0 relative overflow-hidden">
                      <span className="material-symbols-outlined text-3xl text-gray-400 group-hover:text-primary transition-colors">
                        accessibility_new
                      </span>
                      <div className="absolute inset-0 bg-secondary/10 dark:bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                    <div>
                      <h4 className="font-bold text-secondary dark:text-white group-hover:text-primary transition-colors">
                        Rodilla: Meniscos
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                        Exploración axial y longitudinal de meniscos medial y lateral.
                      </p>
                      <span className="text-[10px] font-semibold text-gray-400 mt-2 block flex items-center gap-1">
                        <span className="material-symbols-outlined text-[12px]">schedule</span> 12 min
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-surface-light dark:bg-surface-dark p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary/50 dark:hover:border-primary/50 transition-all cursor-pointer group shadow-sm">
                  <div className="flex gap-4">
                    <div className="w-16 h-16 rounded-lg bg-gray-200 dark:bg-gray-800 flex items-center justify-center flex-shrink-0 relative overflow-hidden">
                      <span className="material-symbols-outlined text-3xl text-gray-400 group-hover:text-primary transition-colors">
                        pan_tool
                      </span>
                      <div className="absolute inset-0 bg-secondary/10 dark:bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                    <div>
                      <h4 className="font-bold text-secondary dark:text-white group-hover:text-primary transition-colors">
                        Mano: Túnel Carpiano
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                        Medición del área del nervio mediano y retináculo.
                      </p>
                      <span className="text-[10px] font-semibold text-gray-400 mt-2 block flex items-center gap-1">
                        <span className="material-symbols-outlined text-[12px]">schedule</span> 8 min
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-surface-light dark:bg-surface-dark p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary/50 dark:hover:border-primary/50 transition-all cursor-pointer group shadow-sm">
                  <div className="flex gap-4">
                    <div className="w-16 h-16 rounded-lg bg-gray-200 dark:bg-gray-800 flex items-center justify-center flex-shrink-0 relative overflow-hidden">
                      <span className="material-symbols-outlined text-3xl text-gray-400 group-hover:text-primary transition-colors">
                        foot_bones
                      </span>
                      <div className="absolute inset-0 bg-secondary/10 dark:bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                    <div>
                      <h4 className="font-bold text-secondary dark:text-white group-hover:text-primary transition-colors">
                        Tobillo: Ligamentos
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                        Evaluación del complejo ligamentario lateral tras esguince.
                      </p>
                      <span className="text-[10px] font-semibold text-gray-400 mt-2 block flex items-center gap-1">
                        <span className="material-symbols-outlined text-[12px]">schedule</span> 15 min
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-surface-light dark:bg-surface-dark p-4 rounded-xl border border-dashed border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all cursor-pointer group flex items-center justify-center">
                  <div className="text-center">
                    <span className="material-symbols-outlined text-primary mb-1">add_circle</span>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Ver catálogo completo</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1 space-y-8">
            <div className="bg-secondary rounded-2xl shadow-lg p-6 text-white relative overflow-hidden">
              <div className="absolute top-[-20px] right-[-20px] w-24 h-24 rounded-full bg-primary/20 blur-xl"></div>
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2 relative z-10">
                <span className="material-symbols-outlined text-red-400 animate-pulse">videocam</span>
                Próxima Sesión en Vivo
              </h3>
              <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/10 mb-4">
                <p className="text-xs text-primary font-bold uppercase tracking-wider mb-1">Webinar</p>
                <p className="font-bold text-lg leading-tight mb-2">Infiltración de Cadera Guiada</p>
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <span className="material-symbols-outlined text-base">calendar_month</span>
                  <span>24 Oct, 18:00 hrs</span>
                </div>
              </div>
              <button className="w-full bg-white text-secondary font-bold py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors">
                Inscribirse
              </button>
            </div>

            {/* Performance Chart Placeholder */}
            <div className="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-secondary dark:text-white">Rendimiento Semanal</h3>
                <button className="text-gray-400 hover:text-primary">
                  <span className="material-symbols-outlined">more_horiz</span>
                </button>
              </div>
              <div className="flex items-end justify-between h-32 gap-2 mb-2">
                <div className="w-full bg-primary/20 dark:bg-primary/10 rounded-t-sm relative group h-[40%]">
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-800 text-white text-xs px-2 py-1 rounded">2h</div>
                </div>
                <div className="w-full bg-primary/20 dark:bg-primary/10 rounded-t-sm relative group h-[60%]">
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-800 text-white text-xs px-2 py-1 rounded">3h</div>
                </div>
                <div className="w-full bg-primary rounded-t-sm relative group h-[85%] shadow-[0_0_15px_rgba(0,180,216,0.5)]">
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-secondary text-white text-xs px-2 py-1 rounded font-bold">4.2h</div>
                </div>
                <div className="w-full bg-primary/20 dark:bg-primary/10 rounded-t-sm relative group h-[30%]"></div>
                <div className="w-full bg-primary/20 dark:bg-primary/10 rounded-t-sm relative group h-[50%]"></div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-t-sm h-[10%]"></div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-t-sm h-[10%]"></div>
              </div>
              <div className="flex justify-between text-xs text-gray-400 font-medium px-1">
                <span>L</span><span>M</span><span>X</span><span>J</span><span>V</span><span>S</span><span>D</span>
              </div>
            </div>

            {/* Recent Certificates */}
            <div className="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="font-bold text-secondary dark:text-white mb-4">Certificados Recientes</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center text-yellow-600 dark:text-yellow-400">
                    <span className="material-symbols-outlined">workspace_premium</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-secondary dark:text-gray-200">Fundamentos Eco</p>
                    <p className="text-xs text-gray-500">Completado: 10 Oct</p>
                  </div>
                  <button className="text-primary hover:bg-primary/10 p-1 rounded transition-colors">
                    <span className="material-symbols-outlined text-lg">download</span>
                  </button>
                </div>
                <div className="flex items-center gap-3 opacity-60">
                  <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400">
                    <span className="material-symbols-outlined">lock</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-secondary dark:text-gray-200">Intervencionismo I</p>
                    <p className="text-xs text-gray-500">Bloqueado</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
=======
import { Header } from "@/components/dashboard/header"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("id", user?.id)
    .single()

  const { data: modules } = await supabase
    .from("modules")
    .select("*, lessons(id)")
    .order("order_index")

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <Header title="Dashboard" userName={profile?.full_name || undefined} />
      
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-8 animate-in fade-in duration-500">
        {/* Welcome Section */}
        <div className="relative overflow-hidden rounded-3xl bg-secondary p-8 sm:p-12 text-white shadow-2xl shadow-secondary/20">
            <div className="relative z-10 max-w-2xl">
                <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4 leading-tight">
                    Hola, <span className="text-primary">{profile?.full_name?.split(' ')[0] || 'Doctor'}</span>. 👋
                </h2>
                <p className="text-gray-300 text-lg sm:text-xl leading-relaxed mb-8">
                    Bienvenido de nuevo a tu formación avanzada en Rehabilitación Intervencionista. Tienes 3 lecciones nuevas esperando.
                </p>
                <Link href="/courses" className="inline-flex items-center gap-2 px-8 py-4 bg-primary hover:bg-primary/90 rounded-2xl font-bold transition-all hover:-translate-y-1 shadow-lg shadow-primary/25">
                    Continuar Aprendizaje
                    <span className="material-symbols-outlined">play_circle</span>
                </Link>
            </div>
            {/* Geometric decoration */}
            <div className="absolute top-0 right-0 h-full w-1/3 bg-gradient-to-l from-primary/20 to-transparent skew-x-12 translate-x-10" />
            <div className="absolute -bottom-10 -right-10 w-48 h-48 border-[20px] border-white/5 rounded-full" />
        </div>

        {/* Modules Slider Label */}
        <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">video_library</span>
                Módulos del Curso
            </h3>
            <button className="text-sm font-bold text-primary hover:underline">Ver todos</button>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {modules?.map((module, idx) => (
            <Link key={module.id} href={`/courses?module=${module.id}`}>
              <Card className="group border-gray-200 dark:border-gray-800 bg-surface-light dark:bg-surface-dark hover:border-primary/50 transition-all duration-300 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1">
                <div className="h-40 bg-gray-200 dark:bg-gray-800 relative flex items-center justify-center overflow-hidden">
                    <span className="material-symbols-outlined text-6xl text-gray-400 group-hover:scale-110 transition-transform duration-500 opacity-20">movie</span>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <span className="absolute bottom-4 left-4 text-white text-[10px] font-black uppercase tracking-widest bg-primary/80 px-2 py-1 rounded">Módulo {idx + 1}</span>
                </div>
                <CardContent className="p-6">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2 line-clamp-1 group-hover:text-primary transition-colors">{module.title}</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mb-6 h-8 leading-relaxed">
                    {module.description || "Explora los fundamentos y técnicas avanzadas de intervención guiada por ecografía."}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-gray-500 dark:text-gray-500 uppercase tracking-tighter">
                        <span className="material-symbols-outlined text-base">format_list_bulleted</span>
                        {module.lessons?.length || 0} Lecciones
                    </div>
                    <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
>>>>>>> origin/main
  )
}
