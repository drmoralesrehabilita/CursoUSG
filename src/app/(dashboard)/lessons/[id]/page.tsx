import { getLesson, getUserEnrollment } from "@/lib/data"
import { createClient } from "@/lib/supabase/server"
import { DualPlayer } from "@/components/player/DualPlayer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { FileText, Download, CheckSquare } from "lucide-react"
import { redirect } from "next/navigation"

interface LessonPageProps {
  params: {
    id: string
  }
}

export default async function LessonPage({ params }: LessonPageProps) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const lesson = await getLesson(params.id)
  const enrollment = await getUserEnrollment(user.id)
  
  // Basic Access Control
  // If enrollment is blocked, redirect or show error
  // Admins bypass
  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
  const isAdmin = profile?.role === 'admin'

  if (enrollment?.status === 'blocked' && !isAdmin) {
      return (
          <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
              <h1 className="text-2xl font-bold mb-4">Acceso Bloqueado</h1>
              <p className="text-muted-foreground">Tu cuenta está bloqueada o pendiente de pago. Contacta a soporte.</p>
          </div>
      )
  }

  if (!lesson) {
      return <div>Lección no encontrada</div>
  }

  // Parse materials JSON
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const materials = (lesson.materials as any) || {}
  const downloadable = materials.downloads || []
  const checklist = materials.checklist || []

  return (
    <div className="flex flex-col gap-6">
       
       <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">{lesson.title}</h1>
          <p className="text-muted-foreground">{lesson.description}</p>
       </div>

       <DualPlayer 
          cameraUrl={lesson.video_url_camera}
          ultrasoundUrl={lesson.video_url_ultrasound}
          title={lesson.title}
       />
       
       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
           {/* Main Content Area (Notes, or specific text if any) - For now assumed to be Video centric */}
           
           {/* Sidebar / Bottom Widgets */}
           <div className="lg:col-span-1 space-y-6">
               <Card>
                   <CardHeader className="pb-3">
                       <CardTitle className="text-lg flex items-center gap-2">
                           <Download className="h-5 w-5 text-primary" />
                           Material Descargable
                       </CardTitle>
                   </CardHeader>
                   <CardContent className="grid gap-2">
                       {downloadable.length > 0 ? (
                           downloadable.map((item: { name: string, url: string }, idx: number) => (
                               <Button key={idx} variant="outline" className="w-full justify-start h-auto py-3" asChild>
                                   <a href={item.url} target="_blank" rel="noopener noreferrer">
                                       <FileText className="mr-2 h-4 w-4" />
                                       <span className="truncate">{item.name}</span>
                                   </a>
                               </Button>
                           ))
                       ) : (
                           <p className="text-sm text-muted-foreground">No hay material adjunto.</p>
                       )}
                   </CardContent>
               </Card>

               <Card>
                   <CardHeader className="pb-3">
                       <CardTitle className="text-lg flex items-center gap-2">
                           <CheckSquare className="h-5 w-5 text-primary" />
                           Checklist de Material
                       </CardTitle>
                   </CardHeader>
                   <CardContent className="space-y-4">
                        {checklist.length > 0 ? (
                           checklist.map((item: { label: string }, idx: number) => (
                               <div key={idx} className="flex items-start space-x-2">
                                   <Checkbox id={`check-${idx}`} />
                                   <label
                                       htmlFor={`check-${idx}`}
                                       className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 pt-0.5"
                                   >
                                       {item.label}
                                   </label>
                               </div>
                           ))
                        ) : (
                            <p className="text-sm text-muted-foreground">No hay checklist para esta lección.</p>
                        )}
                   </CardContent>
               </Card>
           </div>

           <div className="lg:col-span-2">
               {/* Future content: Comments, Q&A, or additional Description */}
               <Separator className="my-6" />
               <h3 className="text-xl font-semibold mb-4">Notas de la Clase</h3>
               <div className="prose dark:prose-invert">
                   <p>Aquí se mostrarán notas adicionales o transcripción de la clase en el futuro.</p>
               </div>
           </div>
       </div>
    </div>
  )
}
