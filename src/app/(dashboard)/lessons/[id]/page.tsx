import { getLesson, getUserEnrollment } from "@/lib/data"
import { createClient } from "@/lib/supabase/server"
import { DualPlayer } from "@/components/player/DualPlayer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { FileText, Download, CheckSquare } from "lucide-react"
import { redirect } from "next/navigation"

export default async function LessonPage({ params }: { params: { id: string } }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/login')
  }

  const lesson = await getLesson(id)
  const enrollment = await getUserEnrollment()

  if (!lesson) {
    return <div>Lección no encontrada</div>
  }

  return (
    <div className="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark">
      <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-8">
        
        {/* Header Section */}
        <div className="space-y-2">
           <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider">
              <span>Módulo {lesson.order_index}</span>
              <span className="w-1 h-1 rounded-full bg-primary/40"></span>
              <span>{lesson.title}</span>
           </div>
           <h1 className="text-3xl md:text-4xl font-black text-secondary dark:text-white">
              {lesson.title}
           </h1>
        </div>

        {/* Video Player Section */}
        <div className="w-full">
            <DualPlayer 
              cameraUrl={lesson.video_url_camera} 
              ultrasoundUrl={lesson.video_url_ultrasound} 
              title={lesson.title}
            />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content (Left) */}
          <div className="lg:col-span-2 space-y-8">
             <section className="bg-white dark:bg-surface-dark rounded-2xl p-6 border border-slate-200 dark:border-border/10">
                <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">Descripción de la Clase</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                   {lesson.description || "En esta lección profundizaremos en los aspectos técnicos y clínicos del procedimiento. Se recomienda seguir los materiales adjuntos para una mejor comprensión."}
                </p>
             </section>

             <section className="bg-white dark:bg-surface-dark rounded-2xl p-6 border border-slate-200 dark:border-border/10">
                <div className="flex items-center justify-between mb-6">
                   <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <CheckSquare className="text-primary w-5 h-5" />
                      Objetivos de Aprendizaje
                   </h3>
                </div>
                <ul className="space-y-3">
                   {[
                     "Identificar las estructuras anatómicas clave mediante USG.",
                     "Comprender la técnica de abordaje intervencionista.",
                     "Reconocer las variantes anatómicas más comunes.",
                     "Aplicar los protocolos de seguridad en el procedimiento."
                   ].map((obj, i) => (
                     <li key={i} className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 transition-colors border border-transparent hover:border-slate-100 dark:hover:border-white/5">
                        <Checkbox id={`obj-${i}`} className="mt-1 border-primary data-[state=checked]:bg-primary" />
                        <label htmlFor={`obj-${i}`} className="text-slate-700 dark:text-slate-300 cursor-pointer">
                          {obj}
                        </label>
                     </li>
                   ))}
                </ul>
             </section>
          </div>

          {/* Sidebar / Resources (Right) */}
          <div className="space-y-6">
             <Card className="rounded-2xl border-slate-200 dark:border-border/10 bg-white dark:bg-surface-dark">
                <CardHeader>
                   <CardTitle className="text-lg font-bold flex items-center gap-2">
                      <FileText className="text-primary w-5 h-5" />
                      Materiales de Apoyo
                   </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                   {lesson.materials && (lesson.materials as any[]).length > 0 ? (
                      (lesson.materials as any[]).map((mat, i) => (
                         <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-background-dark border border-slate-100 dark:border-border/10 hover:border-primary/40 transition-all group">
                            <div className="flex items-center gap-3">
                               <div className="p-2 rounded bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                  <FileText className="w-4 h-4" />
                               </div>
                               <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{mat.title}</span>
                            </div>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-400 hover:text-primary">
                               <Download className="h-4 w-4" />
                            </Button>
                         </div>
                      ))
                   ) : (
                      <p className="text-sm text-slate-400 italic">No hay archivos adjuntos.</p>
                   )}
                </CardContent>
             </Card>

             <div className="bg-primary/5 rounded-2xl p-6 border border-primary/10">
                <h4 className="text-sm font-bold text-primary mb-2 uppercase tracking-wide">Progreso del Módulo</h4>
                <div className="h-2 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden mb-3">
                   <div 
                      className="h-full bg-primary rounded-full" 
                      style={{ width: `${enrollment?.progress || 0}%` }}
                   ></div>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                   Has completado el <span className="text-primary font-bold">{enrollment?.progress || 0}%</span> de este módulo.
                </p>
             </div>
          </div>
        </div>

      </div>
    </div>
  )
}
