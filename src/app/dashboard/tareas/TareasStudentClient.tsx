"use client"

import { useState } from "react"
import { submitAssignment } from "@/app/actions/assignments"
import { toast } from "sonner"
import { createBrowserClient } from '@supabase/ssr'

type Submission = {
  id: string
  status: string
  grade: number | null
  file_url: string
  file_name: string
  feedback: string | null
  submitted_at: string
}

type Assignment = {
  id: string
  title: string
  instructions: string
  due_date: string | null
  module?: { title: string }
  mySubmission: Submission | null
}

export default function TareasStudentClient({ initialAssignments }: { initialAssignments: Assignment[] }) {
  const [assignments, setAssignments] = useState<Assignment[]>(initialAssignments)
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const [uploadingId, setUploadingId] = useState<string | null>(null)

  const pending = assignments.filter(a => !a.mySubmission)
  const completed = assignments.filter(a => a.mySubmission)

  const isLate = (dueDate: string | null) => {
    if (!dueDate) return false
    return new Date(dueDate) < new Date()
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, assignmentId: string) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validar tamaño < 20MB
    if (file.size > 20 * 1024 * 1024) {
      return toast.error("El archivo excede el límite de 20MB")
    }

    setUploadingId(assignmentId)
    const loadingId = toast.loading("Subiendo documento...")

    try {
      const { data: user } = await supabase.auth.getUser()
      if (!user.user) throw new Error("Debes iniciar sesión")

      const fileExt = file.name.split('.').pop()
      const fileName = `${assignmentId}/${user.user.id}_${Date.now()}.${fileExt}`

      const { data, error } = await supabase.storage
        .from('assignment-submissions')
        .upload(fileName, file, { cacheControl: '3600', upsert: true })

      if (error) throw error

      const { data: publicUrlData } = supabase.storage
        .from('assignment-submissions')
        .getPublicUrl(data.path)

      const fileUrl = publicUrlData.publicUrl

      const res = await submitAssignment(assignmentId, fileUrl, file.name)
      if (!res.success) throw new Error(res.error)

      toast.success("Tarea enviada con éxito", { id: loadingId })
      
      // Mover a completadas localmente
      setAssignments(prev => prev.map(a => {
        if (a.id === assignmentId) {
          return {
            ...a,
            mySubmission: {
              id: 'temp-id',
              status: 'submitted',
              file_url: fileUrl,
              file_name: file.name,
              score: null,
              grade: null,
              feedback: null,
              submitted_at: new Date().toISOString()
            }
          }
        }
        return a
      }))

    } catch (err) {
      const error = err as Error
      toast.error(error.message, { id: loadingId })
    } finally {
      setUploadingId(null)
    }
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8 p-4 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500 font-body">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-linear-to-r from-primary to-cyan-400">
            Avisos y Tareas
          </h1>
          <p className="text-gray-400 mt-2 text-sm md:text-base">
            Gestiona tus entregas y revisa las retroalimentaciones del profesor.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* PENDIENTES */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <span className="material-symbols-outlined text-amber-400">pending_actions</span>
            Tareas Pendientes ({pending.length})
          </h2>

          {pending.length === 0 ? (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center text-gray-400">
              <span className="material-symbols-outlined text-4xl opacity-50 mb-3">task_alt</span>
              <p>¡Todo al día! No tienes tareas pendientes.</p>
            </div>
          ) : (
            pending.map(assignment => (
              <div key={assignment.id} className="bg-[#1a2639] border border-white/10 rounded-2xl p-6 hover:border-primary/30 transition-all shadow-lg hover:shadow-primary/10">
                <div className="text-xs text-primary/80 font-bold tracking-wide uppercase mb-2">
                  {assignment.module?.title || "Módulo General"}
                </div>
                <h3 className="text-lg font-bold text-white mb-3">{assignment.title}</h3>
                
                <div className="prose prose-sm prose-invert text-gray-300 mb-6" dangerouslySetInnerHTML={{ __html: assignment.instructions }} />

                <div className="flex flex-wrap items-center justify-between gap-4 mt-4 pt-4 border-t border-white/10">
                  {assignment.due_date ? (
                    <div className={`flex items-center gap-1.5 text-xs font-medium ${isLate(assignment.due_date) ? "text-red-400" : "text-amber-400"}`}>
                      <span className="material-symbols-outlined text-[16px]">schedule</span>
                      Vence: {new Date(assignment.due_date).toLocaleDateString()}
                    </div>
                  ) : (
                    <div className="text-xs text-gray-500 flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px]">infinity</span>
                      Sin fecha límite
                    </div>
                  )}

                  <div className="relative">
                    <input
                      type="file"
                      id={`file-${assignment.id}`}
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, assignment.id)}
                      disabled={uploadingId === assignment.id}
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    />
                    <label 
                      htmlFor={`file-${assignment.id}`}
                      className={`cursor-pointer px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                        uploadingId === assignment.id
                          ? "bg-primary/20 text-primary opacity-50 cursor-not-allowed"
                          : "bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20 flex items-center gap-2"
                      }`}
                    >
                      {uploadingId === assignment.id ? "Subiendo..." : (
                        <>
                          <span className="material-symbols-outlined text-[18px]">upload</span>
                          Subir Entregable
                        </>
                      )}
                    </label>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* COMPLETADAS */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <span className="material-symbols-outlined text-emerald-400">task_alt</span>
            Enviadas y Calificadas ({completed.length})
          </h2>

          {completed.length === 0 ? (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center text-gray-400">
              <p>Aún no has enviado ninguna tarea.</p>
            </div>
          ) : (
            completed.map(assignment => {
              const sub = assignment.mySubmission!
              const isGraded = sub.status === 'graded'

              return (
                <div key={assignment.id} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-colors">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">
                          {assignment.module?.title}
                        </div>
                        <h3 className="font-bold text-white leading-tight">{assignment.title}</h3>
                      </div>
                      
                      {isGraded ? (
                        <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-3 py-1 rounded-xl text-center min-w-[60px]">
                          <div className="text-[10px] uppercase font-bold tracking-widest mb-0.5">Nota</div>
                          <div className="text-xl font-black">{sub.grade}</div>
                        </div>
                      ) : (
                        <div className="bg-amber-500/10 border border-amber-500/20 text-amber-400 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[14px]">hourglass_empty</span>
                          En revisión
                        </div>
                      )}
                    </div>

                    <a
                      href={sub.file_url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-3 p-3 rounded-xl bg-black/20 border border-white/5 hover:border-primary/30 transition-colors group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-[18px]">description</span>
                      </div>
                      <div className="overflow-hidden flex-1">
                        <p className="text-sm font-medium text-white truncate group-hover:text-primary transition-colors">{sub.file_name}</p>
                        <p className="text-xs text-gray-500">Enviado el {new Date(sub.submitted_at).toLocaleDateString()}</p>
                      </div>
                    </a>

                    {isGraded && sub.feedback && (
                      <div className="mt-4 p-4 rounded-xl bg-blue-500/5 border border-blue-500/10">
                        <h4 className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[14px]">forum</span>
                          Retroalimentación del Profesor
                        </h4>
                        <p className="text-sm text-gray-300 italic">&ldquo;{sub.feedback}&rdquo;</p>
                      </div>
                    )}
                  </div>
                </div>
              )
            })
          )}
        </div>

      </div>
    </div>
  )
}
