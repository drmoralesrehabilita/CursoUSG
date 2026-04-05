"use client"

import { useState } from "react"
import { AdminHeader } from "@/components/admin/AdminHeader"
import { createAssignment, updateAssignment, deleteAssignment, gradeSubmission, getSubmissionsForAssignment } from "@/app/actions/assignments"
import { toast } from "sonner"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { RichTextEditor } from "@/components/ui/RichTextEditor"

type Module = {
  id: string
  title: string
}

type Submission = {
  id: string
  status: string
  grade: number | null
  file_url: string
  file_name: string
  feedback: string | null
  profile?: {
    full_name: string | null
    email: string | null
  }
}

type Assignment = {
  id: string
  module_id: string
  title: string
  instructions: string
  due_date: string | null
  is_published: boolean
  submissions: Submission[]
}

export default function TareasClient({ modules, initialAssignments }: { modules: Module[], initialAssignments: Assignment[] }) {
  const [assignments, setAssignments] = useState<Assignment[]>(initialAssignments)
  const [expandedModule, setExpandedModule] = useState<string | null>(modules[0]?.id || null)

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingAssignment, setEditingAssignment] = useState<Assignment | null>(null)
  
  // Form State
  const [title, setTitle] = useState("")
  const [instructions, setInstructions] = useState("")
  const [dueDate, setDueDate] = useState("")
  const [isPublished, setIsPublished] = useState(true)
  const [selectedModuleId, setSelectedModuleId] = useState("")

  // Sheet State (Gradebook)
  const [gradebookOpen, setGradebookOpen] = useState(false)
  const [currentAssignment, setCurrentAssignment] = useState<Assignment | null>(null)
  const [submissionsList, setSubmissionsList] = useState<Submission[]>([])
  
  // Grading State
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null)
  const [gradeValue, setGradeValue] = useState<string>("")
  const [feedbackValue, setFeedbackValue] = useState<string>("")

  const handleOpenCreate = (moduleId: string) => {
    setSelectedModuleId(moduleId)
    setEditingAssignment(null)
    setTitle("")
    setInstructions("")
    setDueDate("")
    setIsPublished(true)
    setIsModalOpen(true)
  }

  const handleOpenEdit = (assignment: Assignment) => {
    setSelectedModuleId(assignment.module_id)
    setEditingAssignment(assignment)
    setTitle(assignment.title)
    setInstructions(assignment.instructions || "")
    setDueDate(assignment.due_date ? assignment.due_date.substring(0, 16) : "")
    setIsPublished(assignment.is_published)
    setIsModalOpen(true)
  }

  const handleSave = async () => {
    if (!title.trim()) return toast.error("El título es requerido")

    const loadingId = toast.loading(editingAssignment ? "Actualizando tarea..." : "Creando tarea...")
    try {
      if (editingAssignment) {
        const res = await updateAssignment(editingAssignment.id, {
          title,
          instructions,
          dueDate: dueDate ? new Date(dueDate).toISOString() : null,
          isPublished
        })
        if (!res.success) throw new Error(res.error)
        
        // Update local state
        setAssignments(prev => prev.map(a => a.id === editingAssignment.id ? {
          ...a, title, instructions, due_date: dueDate ? new Date(dueDate).toISOString() : null, is_published: isPublished
        } : a))
      } else {
        const res = await createAssignment({
          moduleId: selectedModuleId,
          title,
          instructions,
          dueDate: dueDate ? new Date(dueDate).toISOString() : null,
          isPublished
        })
        if (!res.success) throw new Error(res.error)
        // Refresh page to get assignment logic simple
        window.location.reload()
      }
      toast.success("Tarea guardada exitosamente", { id: loadingId })
      setIsModalOpen(false)
    } catch (err: any) {
      toast.error(err.message, { id: loadingId })
    }
  }

  const handleDelete = async (id: string) => {
    if(!confirm("¿Estás seguro de eliminar esta tarea? Se perderán las entregas de los estudiantes.")) return

    const loadingId = toast.loading("Eliminando...")
    try {
      const res = await deleteAssignment(id)
      if (!res.success) throw new Error(res.error)
      setAssignments(prev => prev.filter(a => a.id !== id))
      toast.success("Eliminada", { id: loadingId })
    } catch (err: any) {
      toast.error(err.message, { id: loadingId })
    }
  }

  const openGradebook = async (assignment: Assignment) => {
    setCurrentAssignment(assignment)
    setGradebookOpen(true)
    setSelectedSubmission(null)

    const loadingId = toast.loading("Cargando entregas...")
    const res = await getSubmissionsForAssignment(assignment.id)
    if (res.success) {
      setSubmissionsList(res.data as Submission[])
      toast.dismiss(loadingId)
    } else {
      toast.error("Error al cargar entregas", { id: loadingId })
    }
  }

  const selectSubmissionForGrading = (sub: Submission) => {
    setSelectedSubmission(sub)
    setGradeValue(sub.grade != null ? sub.grade.toString() : "")
    setFeedbackValue(sub.feedback || "")
  }

  const handleSaveGrade = async () => {
    if (!selectedSubmission) return
    const numGrade = parseFloat(gradeValue)
    if (isNaN(numGrade) || numGrade < 0 || numGrade > 100) {
      return toast.error("Por favor ingresa una calificación válida (0-100)")
    }

    const loadingId = toast.loading("Guardando calificación...")
    try {
      const res = await gradeSubmission(selectedSubmission.id, numGrade, feedbackValue)
      if (!res.success) throw new Error(res.error)
      
      toast.success("Calificación guardada", { id: loadingId })
      
      // Update local gradebook list
      setSubmissionsList(prev => prev.map(s => s.id === selectedSubmission.id ? {
        ...s, grade: numGrade, feedback: feedbackValue, status: 'graded'
      } : s))
      
      // Update main assignment stats
      setAssignments(prev => prev.map(a => {
        if (a.id === currentAssignment?.id) {
          return {
            ...a,
            submissions: a.submissions.map(s => s.id === selectedSubmission.id ? { ...s, status: 'graded', grade: numGrade } : s)
          }
        }
        return a
      }))

      setSelectedSubmission(null)
    } catch(err:any) {
      toast.error(err.message, { id: loadingId })
    }
  }

  return (
    <div className="flex-1 bg-[#0a1628] min-h-screen text-white font-body selection:bg-primary/30 selection:text-white rounded-tl-[2rem] border-l border-t border-white/5 overflow-hidden flex flex-col relative">
      <AdminHeader title="Gestión de Tareas" subtitle="Administra las asignaciones por módulo y revisa entregas" />

      <main className="flex-1 overflow-y-auto p-4 md:p-8 styled-scroll relative z-10 space-y-6">
        
        {modules.map(module => {
          const isExpanded = expandedModule === module.id
          const moduleAssignments = assignments.filter(a => a.module_id === module.id)

          return (
            <div key={module.id} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-xl">
              {/* Header Módulo */}
              <button
                onClick={() => setExpandedModule(isExpanded ? null : module.id)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-white/5 transition-colors duration-200"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined">folder</span>
                  </div>
                  <div className="text-left">
                    <h2 className="text-lg font-bold text-white leading-tight">{module.title}</h2>
                    <p className="text-xs text-gray-400 mt-1">{moduleAssignments.length} Tareas</p>
                  </div>
                </div>
                <span className={`material-symbols-outlined text-gray-400 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}>
                  expand_more
                </span>
              </button>

              {/* Tareas del Módulo */}
              {isExpanded && (
                <div className="p-6 pt-2 space-y-4 border-t border-white/5 bg-black/20">
                  {moduleAssignments.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      No hay tareas creadas en este módulo
                    </div>
                  ) : (
                    <div className="grid gap-3">
                      {moduleAssignments.map(assignment => {
                        const submitted = assignment.submissions.length
                        const graded = assignment.submissions.filter(s => s.status === 'graded').length

                        return (
                          <div key={assignment.id} className="flex items-center justify-between bg-white/5 border border-white/5 rounded-xl p-4 hover:border-primary/30 transition-colors group">
                            <div className="flex flex-col">
                              <h3 className="font-semibold text-white group-hover:text-primary transition-colors">
                                {assignment.title}
                              </h3>
                              <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                                <span className={`px-2 py-0.5 rounded border ${assignment.is_published ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-amber-500/10 text-amber-400 border-amber-500/20"}`}>
                                  {assignment.is_published ? "Publicada" : "Oculta"}
                                </span>
                                <span>• {submitted} Entregas</span>
                                <span>• {graded} Calificadas</span>
                                {assignment.due_date && (
                                  <span>• Límite: {new Date(assignment.due_date).toLocaleDateString()}</span>
                                )}
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => openGradebook(assignment)}
                                className="px-3 py-1.5 bg-primary/10 text-primary hover:bg-primary/20 rounded-lg text-sm font-medium transition-colors"
                              >
                                Gradebook
                              </button>
                              <button
                                onClick={() => handleOpenEdit(assignment)}
                                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                              >
                                <span className="material-symbols-outlined text-[18px]">edit</span>
                              </button>
                              <button
                                onClick={() => handleDelete(assignment.id)}
                                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition-colors"
                              >
                                <span className="material-symbols-outlined text-[18px]">delete</span>
                              </button>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}

                  <button
                    onClick={() => handleOpenCreate(module.id)}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-dashed border-white/20 text-gray-400 hover:text-white hover:border-primary/50 hover:bg-primary/5 transition-all text-sm font-medium"
                  >
                    <span className="material-symbols-outlined text-[18px]">add</span>
                    Añadir Nueva Tarea
                  </button>
                </div>
              )}
            </div>
          )
        })}

      </main>

      {/* Modal Crear/Editar */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-[#0a1628]/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0f1d32] border border-white/10 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-black/20">
              <h2 className="text-xl font-bold">{editingAssignment ? "Editar Tarea" : "Nueva Tarea"}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <div className="p-6 space-y-6 overflow-y-auto styled-scroll">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Título de la Tarea</label>
                <input
                  type="text"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50"
                  placeholder="Ej. Resumen Capítulo 1"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Instrucciones</label>
                <div className="bg-black/20 border border-white/10 rounded-xl overflow-hidden">
                  <RichTextEditor content={instructions} onChange={setInstructions} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">Fecha Límite</label>
                  <input
                    type="datetime-local"
                    value={dueDate}
                    onChange={e => setDueDate(e.target.value)}
                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">Estado</label>
                  <button
                    onClick={() => setIsPublished(!isPublished)}
                    className={`w-full py-3 rounded-xl border flex items-center justify-center gap-2 transition-colors ${
                      isPublished 
                        ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" 
                        : "bg-amber-500/10 border-amber-500/30 text-amber-400"
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {isPublished ? "visibility" : "visibility_off"}
                    </span>
                    {isPublished ? "Pública (Visible)" : "Oculta (Borrador)"}
                  </button>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-white/5 bg-black/20 flex justify-end gap-3">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-2 rounded-xl text-gray-400 hover:text-white"
              >
                Cancelar
              </button>
              <button 
                onClick={handleSave}
                className="px-6 py-2 rounded-xl bg-primary text-white font-medium hover:bg-primary/90 shadow-lg shadow-primary/20"
              >
                Guardar Tarea
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Gradebook Sheet */}
      <Sheet open={gradebookOpen} onOpenChange={setGradebookOpen}>
        <SheetContent side="right" className="bg-[#0a1628] border-white/10 p-0 flex flex-col w-[90vw] sm:max-w-3xl">
          <SheetHeader className="p-6 border-b border-white/5 bg-black/20">
            <SheetTitle className="text-white text-xl">Gradebook: {currentAssignment?.title}</SheetTitle>
          </SheetHeader>
          
          <div className="flex-1 flex overflow-hidden">
            {/* Lista Mestra */}
            <div className={`w-full md:w-1/2 border-r border-white/5 flex flex-col ${selectedSubmission ? 'hidden md:flex' : 'flex'}`}>
              <div className="p-4 border-b border-white/5">
                <input 
                  type="text" 
                  placeholder="Buscar alumno..." 
                  className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-sm text-white"
                />
              </div>
              <div className="flex-1 overflow-y-auto p-2 space-y-1 styled-scroll">
                {submissionsList.length === 0 ? (
                  <p className="text-center text-gray-500 text-sm mt-10">Ningún alumno ha entregado aún.</p>
                ) : (
                  submissionsList.map(sub => (
                    <button
                      key={sub.id}
                      onClick={() => selectSubmissionForGrading(sub)}
                      className={`w-full text-left p-3 rounded-lg border transition-all ${
                        selectedSubmission?.id === sub.id 
                          ? "bg-primary/10 border-primary/30" 
                          : "border-transparent hover:bg-white/5"
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <span className="font-medium text-white truncate block">{sub.profile?.full_name || 'Estudiante Anon'}</span>
                        {sub.status === 'graded' ? (
                          <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-bold">{sub.grade}</span>
                        ) : (
                          <span className="text-xs bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded-full">Por calificar</span>
                        )}
                      </div>
                      <span className="text-xs text-gray-500 block mt-1">{sub.profile?.email}</span>
                      <span className="text-xs text-primary mt-2 block break-all">📁 {sub.file_name}</span>
                    </button>
                  ))
                )}
              </div>
            </div>

            {/* Panel de Detalle / Calificación */}
            <div className={`flex-1 flex col flex-col bg-[#0f1d32] ${!selectedSubmission ? 'hidden md:flex items-center justify-center' : 'flex'}`}>
              {!selectedSubmission ? (
                <div className="text-center text-gray-500">
                  <span className="material-symbols-outlined text-4xl mb-4 opacity-50">grading</span>
                  <p>Selecciona una entrega para calificar</p>
                </div>
              ) : (
                <div className="flex-1 overflow-y-auto p-6 styled-scroll flex flex-col max-h-full">
                  <div className="md:hidden mb-4">
                    <button onClick={() => setSelectedSubmission(null)} className="text-primary text-sm flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                      Volver a la lista
                    </button>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white">{selectedSubmission.profile?.full_name}</h3>
                  <p className="text-gray-400 text-sm mb-6">{selectedSubmission.profile?.email}</p>

                  <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-8 flex items-center justify-between">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <span className="material-symbols-outlined text-primary text-3xl">description</span>
                      <div className="overflow-hidden">
                        <p className="text-sm font-medium text-white truncate">{selectedSubmission.file_name}</p>
                        <p className="text-xs text-gray-500">Documento adjunto</p>
                      </div>
                    </div>
                    <a 
                      href={selectedSubmission.file_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-primary/10 text-primary hover:bg-primary/20 rounded-lg text-sm font-medium shrink-0 flex items-center gap-2"
                    >
                      Ver Archivo <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                    </a>
                  </div>

                  <div className="flex-1 space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-400">Calificación (0-100)</label>
                      <input
                        type="number"
                        min="0" max="100"
                        value={gradeValue}
                        onChange={e => setGradeValue(e.target.value)}
                        className="w-full md:w-1/3 bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white text-2xl font-bold focus:outline-none focus:border-primary/50"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-400">Comentarios (Retroalimentación)</label>
                      <textarea
                        value={feedbackValue}
                        onChange={e => setFeedbackValue(e.target.value)}
                        rows={6}
                        className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-primary/50 resize-none"
                        placeholder="Escribe comentarios o sugerencias sobre el trabajo..."
                      />
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/5">
                    <button 
                      onClick={handleSaveGrade}
                      className="w-full py-4 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 shadow-lg shadow-primary/20"
                    >
                      Guardar Calificación
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>

    </div>
  )
}
