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
  )
}
