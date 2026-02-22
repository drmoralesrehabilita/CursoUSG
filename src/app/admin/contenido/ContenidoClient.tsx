"use client"

import { useState, useEffect } from "react"
import { AdminHeader } from "@/components/admin/AdminHeader"
import { UploadEngine } from "@/components/admin/UploadEngine"
import { QuizBuilder } from "@/components/admin/QuizBuilder"
import { createModule, updateModule, deleteModule, updateLesson, deleteLesson, reorderLessons } from "@/app/actions/contentSetup"
import { toast } from "sonner"
import { RichTextEditor } from "@/components/ui/RichTextEditor"
import MuxPlayer from "@mux/mux-player-react"
import { createBrowserClient } from '@supabase/ssr'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { SortableLessonItem } from "@/components/admin/SortableLessonItem"

type Lesson = {
  id: string
  title: string
  lesson_type: string
  thumbnail_url?: string | null
  materials?: Array<{title: string, url: string}> | null
  duration_minutes?: number | null
  difficulty?: string | null
  prerequisite_lesson_id?: string | null
  mux_asset_id?: string | null
  mux_playback_id?: string | null
  mux_upload_id?: string | null
  is_published: boolean
}

type Module = {
  id: string
  title: string
  description?: string
  thumbnail_url?: string | null
  prerequisite_module_id?: string | null
  lessons?: Lesson[]
}

function LessonIcon({ type }: { type: string }) {
  if (type === "quiz") {
    return <span className="material-symbols-outlined text-violet-400 text-lg">quiz</span>
  }
  if (type === "document") {
    return <span className="material-symbols-outlined text-blue-400 text-lg">description</span>
  }
  return <span className="material-symbols-outlined text-primary text-lg">play_circle</span>
}

function LessonStatus({ status }: { status: boolean }) {
  if (status) {
    return <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">Publicado</span>
  }
  return <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-500/15 text-amber-400 border border-amber-500/20">Borrador</span>
}

export function ContenidoClient({ modules }: { modules: Module[] }) {
  const [localModules, setLocalModules] = useState<Module[]>(modules)
  const [expandedModule, setExpandedModule] = useState<string | null>(modules[0]?.id || null)

  useEffect(() => {
    setLocalModules(modules)
  }, [modules])

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragEnd = async (event: DragEndEvent, moduleId: string) => {
    const { active, over } = event
    if (over && active.id !== over.id) {
      const moduleIndex = localModules.findIndex(m => m.id === moduleId)
      if (moduleIndex === -1) return
      
      const targetModule = localModules[moduleIndex]
      const lessons = targetModule.lessons || []
      
      const oldIndex = lessons.findIndex((l) => l.id === active.id)
      const newIndex = lessons.findIndex((l) => l.id === over.id)
      
      if (oldIndex !== -1 && newIndex !== -1) {
        const newLessons = arrayMove(lessons, oldIndex, newIndex)
        
        // Optimistic UI update
        const newModules = [...localModules]
        newModules[moduleIndex] = { ...targetModule, lessons: newLessons }
        setLocalModules(newModules)
        
        // Backend update
        const lessonIds = newLessons.map(l => l.id)
        const res = await reorderLessons(lessonIds)
        if (!res?.success) {
          toast.error("Error al guardar el nuevo orden")
          setLocalModules(modules) // revert
        } else {
          toast.success("Orden actualizado")
        }
      }
    }
  }

  // Module Modal State
  const [isModuleModalOpen, setIsModuleModalOpen] = useState(false)
  const [editingModule, setEditingModule] = useState<{ id?: string, title: string, description: string, thumbnail_url: string, prerequisite_module_id: string | null } | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [uploadingMaterial, setUploadingMaterial] = useState(false)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'module' | 'lesson') => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingImage(true)
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `thumbnails/${fileName}`

      // Require a 'public' bucket named 'thumbnails'
      const { error: uploadError } = await supabase.storage
        .from('thumbnails') // Assuming this bucket exists
        .upload(filePath, file)

      if (uploadError) throw uploadError

      const { data } = supabase.storage.from('thumbnails').getPublicUrl(filePath)
      
      if (type === 'module' && editingModule) {
        setEditingModule({ ...editingModule, thumbnail_url: data.publicUrl })
      } else if (type === 'lesson' && editingLesson) {
         setEditingLesson({ ...editingLesson, thumbnail_url: data.publicUrl })
      }
    } catch (error) {
      toast.error('Error al subir imagen: ' + (error as Error).message)
    } finally {
      setUploadingImage(false)
    }
  }

  const handleMaterialUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !editingLesson) return

    setUploadingMaterial(true)
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `material_${Math.random()}.${fileExt}`
      const filePath = `documents/${fileName}`

      // We'll use the specific bucket for materials/documents
      const { error: uploadError } = await supabase.storage
        .from('docs') 
        .upload(filePath, file)

      if (uploadError) throw uploadError

      const { data } = supabase.storage.from('docs').getPublicUrl(filePath)
      
      const currentMaterials = editingLesson.materials || []
      const newMaterial = { title: file.name, url: data.publicUrl }
      
      setEditingLesson({ ...editingLesson, materials: [...currentMaterials, newMaterial] })
      toast.success('Documento subido correctamente')
    } catch (error) {
       toast.error('Error al subir documento: ' + (error as Error).message)
    } finally {
      setUploadingMaterial(false)
    }
  }

  // Lesson Modal State
  const [isLessonModalOpen, setIsLessonModalOpen] = useState(false)
  const [editingLesson, setEditingLesson] = useState<{ id: string, title: string, lesson_type: string, is_published: boolean, thumbnail_url: string, description: string, materials: Array<{title: string, url: string}>, duration_minutes: number | null, difficulty: string | null, prerequisite_lesson_id: string | null, mux_playback_id: string | null, mux_upload_id: string | null } | null>(null)
  const [isSubmittingLesson, setIsSubmittingLesson] = useState(false)

  const handleOpenNewModule = () => {
    setEditingModule({ title: "", description: "", thumbnail_url: "", prerequisite_module_id: null })
    setIsModuleModalOpen(true)
  }

  const handleOpenEditModule = (e: React.MouseEvent, mod: Module) => {
    e.stopPropagation()
    setEditingModule({ id: mod.id, title: mod.title, description: mod.description || "", thumbnail_url: mod.thumbnail_url || "", prerequisite_module_id: mod.prerequisite_module_id || null })
    setIsModuleModalOpen(true)
  }

  const handleSaveModule = async () => {
    if (!editingModule || !editingModule.title.trim()) return
    setIsSubmitting(true)
    let res;
    if (editingModule.id) {
      res = await updateModule(editingModule.id, { title: editingModule.title, description: editingModule.description, thumbnail_url: editingModule.thumbnail_url, prerequisite_module_id: editingModule.prerequisite_module_id })
    } else {
      res = await createModule({ title: editingModule.title, description: editingModule.description, thumbnail_url: editingModule.thumbnail_url, prerequisite_module_id: editingModule.prerequisite_module_id })
    }
    setIsSubmitting(false)
    if (res?.success) {
      toast.success(editingModule.id ? "Módulo actualizado" : "Módulo creado")
      setIsModuleModalOpen(false)
    } else {
      toast.error(res?.error || "Error al guardar")
    }
  }

  const handleDeleteModule = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation()
    if (!confirm("¿Seguro que deseas eliminar este módulo? Se perderán todas sus lecciones.")) return
    
    const res = await deleteModule(id)
    if (res?.success) {
      toast.success("Módulo eliminado")
    } else {
      toast.error(res?.error || "Error al eliminar")
    }
  }

  const handleOpenEditLesson = (e: React.MouseEvent, lesson: Lesson) => {
    e.stopPropagation()
    // Type definition needs description added later when lessons data is fetched, but for now it's okay:
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setEditingLesson({ id: lesson.id, title: lesson.title, lesson_type: lesson.lesson_type, is_published: lesson.is_published, thumbnail_url: lesson.thumbnail_url || "", description: (lesson as any).description || "", materials: lesson.materials || [], duration_minutes: lesson.duration_minutes || null, difficulty: lesson.difficulty || null, prerequisite_lesson_id: lesson.prerequisite_lesson_id || null, mux_playback_id: lesson.mux_playback_id || null, mux_upload_id: lesson.mux_upload_id || null })
    setIsLessonModalOpen(true)
  }

  const handleSaveLesson = async () => {
    if (!editingLesson || !editingLesson.title.trim()) return
    setIsSubmittingLesson(true)
    
    const res = await updateLesson(editingLesson.id, { 
      title: editingLesson.title, 
      description: editingLesson.description,
      thumbnail_url: editingLesson.thumbnail_url,
      materials: editingLesson.materials,
      is_published: editingLesson.is_published,
      duration_minutes: editingLesson.duration_minutes !== null ? editingLesson.duration_minutes : undefined,
      difficulty: editingLesson.difficulty !== null ? editingLesson.difficulty : undefined,
      prerequisite_lesson_id: editingLesson.prerequisite_lesson_id !== null ? editingLesson.prerequisite_lesson_id : undefined
    })
    
    setIsSubmittingLesson(false)
    if (res?.success) {
      toast.success("Lección actualizada")
      setIsLessonModalOpen(false)
    } else {
      toast.error(res?.error || "Error al actualizar")
    }
  }

  const handleDeleteLesson = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation()
    if (!confirm("¿Seguro que deseas eliminar esta lección?")) return
    
    const res = await deleteLesson(id)
    if (res?.success) {
      toast.success("Lección eliminada")
    } else {
      toast.error(res?.error || "Error al eliminar")
    }
  }

  const totalModules = localModules.length
  const totalLessons = localModules.reduce((acc, m) => acc + (m.lessons?.length || 0), 0)
  const totalQuizzes = localModules.reduce((acc, m) => acc + (m.lessons?.filter(l => l.lesson_type === 'quiz').length || 0), 0)

  const statsCards = [
    { label: "Módulos", value: totalModules.toString(), icon: "folder_open", color: "text-primary" },
    { label: "Lecciones", value: totalLessons.toString(), icon: "play_circle", color: "text-emerald-400" },
    { label: "Evaluaciones", value: totalQuizzes.toString(), icon: "quiz", color: "text-violet-400" },
  ]

  return (
    <div className="flex flex-col h-full">
      <AdminHeader title="Gestión de Contenido" subtitle="Administra los módulos, lecciones y evaluaciones del curso" />

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {statsCards.map((card) => (
            <div
              key={card.label}
              className="bg-white dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/5 p-5 flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-white/10 dark:bg-white/5 flex items-center justify-center">
                <span className={`material-symbols-outlined text-2xl ${card.color}`}>{card.icon}</span>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{card.value}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{card.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Upload Zone */}
        <UploadEngine modules={localModules} />

        {/* Modules Accordion */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white">Estructura del Curso</h3>
            <button 
              onClick={handleOpenNewModule}
              className="px-4 py-2 bg-primary text-white rounded-xl text-xs font-semibold hover:bg-primary/90 transition-colors flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-base">add</span>
              Nuevo Módulo
            </button>
          </div>

          {localModules.map((mod) => {
            const isExpanded = expandedModule === mod.id
            const lessonsCount = mod.lessons?.length || 0
            const publishedCount = mod.lessons?.filter(l => l.is_published).length || 0
            const progressPercent = lessonsCount > 0 ? Math.round((publishedCount / lessonsCount) * 100) : 0

            return (
              <div
                key={mod.id}
                className="bg-white dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/5 overflow-hidden"
              >
                {/* Module Header */}
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => setExpandedModule(isExpanded ? null : mod.id)}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setExpandedModule(isExpanded ? null : mod.id) }}
                  className="w-full flex items-center gap-4 px-5 py-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors text-left cursor-pointer"
                >
                  <span className={`material-symbols-outlined text-lg text-gray-400 transition-transform duration-200 ${isExpanded ? "rotate-90" : ""}`}>
                    chevron_right
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-primary text-xl">folder_open</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{mod.title}</p>
                    <p className="text-[11px] text-gray-400">
                      {publishedCount}/{lessonsCount} lecciones publicadas
                    </p>
                  </div>

                  {/* Edit/Delete Module Buttons */}
                  <div className="flex items-center gap-2 mr-4">
                    <button 
                      onClick={(e) => handleOpenEditModule(e, mod)}
                      className="text-gray-400 hover:text-primary transition-colors p-1"
                      title="Editar módulo"
                    >
                      <span className="material-symbols-outlined text-[20px]">edit</span>
                    </button>
                    <button 
                      onClick={(e) => handleDeleteModule(e, mod.id)}
                      className="text-gray-400 hover:text-red-400 transition-colors p-1"
                      title="Eliminar módulo"
                    >
                      <span className="material-symbols-outlined text-[20px]">delete</span>
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-20 bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all duration-500"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                    <span className="text-[11px] font-medium text-gray-400">{progressPercent}%</span>
                  </div>
                </div>

                {/* Lessons */}
                {isExpanded && (
                  <div className="border-t border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-black/10">
                    <div className="p-3">
                      <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={(e) => handleDragEnd(e, mod.id)}
                      >
                        <SortableContext
                          items={mod.lessons?.map(l => l.id) || []}
                          strategy={verticalListSortingStrategy}
                        >
                          <div className="space-y-2">
                            {mod.lessons?.map((lesson) => (
                              <SortableLessonItem
                                key={lesson.id}
                                id={lesson.id}
                                lesson={lesson}
                                handleOpenEditLesson={handleOpenEditLesson}
                                handleDeleteLesson={handleDeleteLesson}
                                LessonIcon={LessonIcon}
                                LessonStatus={LessonStatus}
                              />
                            ))}
                          </div>
                        </SortableContext>
                      </DndContext>
                    </div>

                    {/* Add Lesson Button - Maybe just open UploadEngine modal? Or a separate basic lesson creator */}
                    <div className="p-4 bg-gray-50 dark:bg-black/20 border-t border-gray-200 dark:border-white/5">
                       <QuizBuilder modules={[mod]} />
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Module Modal */}
      {isModuleModalOpen && editingModule && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white dark:bg-gray-900 rounded-3xl w-full max-w-md overflow-hidden border border-gray-100 dark:border-gray-800 shadow-2xl">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                {editingModule.id ? "Editar Módulo" : "Nuevo Módulo"}
              </h2>
              <div className="space-y-4">
                {editingModule.thumbnail_url && (
                  <div className="mb-4">
                     {/* eslint-disable-next-line @next/next/no-img-element */}
                     <img src={editingModule.thumbnail_url} alt="Portada Módulo" className="w-full h-32 object-cover rounded-xl" />
                  </div>
                )}
                <div className="flex items-center gap-3">
                   <label className="bg-primary/10 text-primary hover:bg-primary/20 cursor-pointer px-4 py-2 rounded-xl text-sm font-semibold transition-colors flex items-center gap-2">
                     <span className="material-symbols-outlined text-lg">image</span>
                     {uploadingImage ? 'Subiendo...' : (editingModule.thumbnail_url ? 'Cambiar Portada' : 'Añadir Portada')}
                     <input type="file" accept="image/*" className="hidden" disabled={uploadingImage} onChange={(e) => handleImageUpload(e, 'module')} />
                   </label>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Título del Módulo</label>
                  <input
                    type="text"
                    value={editingModule.title}
                    onChange={(e) => setEditingModule({ ...editingModule, title: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-black/50 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/50 text-gray-900 dark:text-white placeholder-gray-400"
                    placeholder="Ej. Introducción a USG"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Descripción (opcional)</label>
                  <RichTextEditor
                    content={editingModule.description}
                    onChange={(content) => setEditingModule({ ...editingModule, description: content })}
                    placeholder="Escribe una descripción enriquecida del módulo..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Módulo Prerrequisito (opcional)</label>
                  <select
                    value={editingModule.prerequisite_module_id || ""}
                    onChange={(e) => setEditingModule({ ...editingModule, prerequisite_module_id: e.target.value || null })}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-black/50 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/50 text-gray-900 dark:text-white"
                  >
                    <option value="">Ninguno</option>
                    {localModules.filter(m => m.id !== editingModule.id).map(m => (
                      <option key={m.id} value={m.id}>{m.title}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="p-6 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-800 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsModuleModalOpen(false)}
                className="px-6 py-2.5 rounded-xl font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleSaveModule}
                disabled={isSubmitting || !editingModule.title.trim()}
                className="px-6 py-2.5 bg-primary hover:bg-cyan-500 text-white rounded-xl font-semibold shadow-lg shadow-primary/25 transition-all disabled:opacity-50"
              >
                {isSubmitting ? "Guardando..." : "Guardar Módulo"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lesson Modal */}
      {isLessonModalOpen && editingLesson && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white dark:bg-gray-900 rounded-3xl w-full max-w-md overflow-hidden border border-gray-100 dark:border-gray-800 shadow-2xl">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Editar Lección
              </h2>
              <div className="space-y-4">
                {editingLesson.thumbnail_url && (
                  <div className="mb-4">
                     {/* eslint-disable-next-line @next/next/no-img-element */}
                     <img src={editingLesson.thumbnail_url} alt="Portada Lección" className="w-full h-32 object-cover rounded-xl" />
                  </div>
                )}
                <div className="flex items-center gap-3">
                   <label className="bg-primary/10 text-primary hover:bg-primary/20 cursor-pointer px-4 py-2 rounded-xl text-sm font-semibold transition-colors flex items-center gap-2">
                     <span className="material-symbols-outlined text-lg">image</span>
                     {uploadingImage ? 'Subiendo...' : (editingLesson.thumbnail_url ? 'Cambiar Portada' : 'Añadir Portada')}
                     <input type="file" accept="image/*" className="hidden" disabled={uploadingImage} onChange={(e) => handleImageUpload(e, 'lesson')} />
                   </label>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Título de la Lección</label>
                  <input
                    type="text"
                    value={editingLesson.title}
                    onChange={(e) => setEditingLesson({ ...editingLesson, title: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-black/50 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/50 text-gray-900 dark:text-white placeholder-gray-400"
                    placeholder="Ej. Anatomía Muscular"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Duración (minutos)</label>
                    <input
                      type="number"
                      min="0"
                      value={editingLesson.duration_minutes || ""}
                      onChange={(e) => setEditingLesson({ ...editingLesson, duration_minutes: e.target.value ? parseInt(e.target.value) : null })}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-black/50 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/50 text-gray-900 dark:text-white"
                      placeholder="Ej. 15"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Dificultad</label>
                    <select
                      value={editingLesson.difficulty || ""}
                      onChange={(e) => setEditingLesson({ ...editingLesson, difficulty: e.target.value || null })}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-black/50 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/50 text-gray-900 dark:text-white"
                    >
                      <option value="">Seleccionar...</option>
                      <option value="Principiante">Principiante</option>
                      <option value="Intermedio">Intermedio</option>
                      <option value="Avanzado">Avanzado</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Lección Prerrequisito (opcional)</label>
                  <select
                    value={editingLesson.prerequisite_lesson_id || ""}
                    onChange={(e) => setEditingLesson({ ...editingLesson, prerequisite_lesson_id: e.target.value || null })}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-black/50 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/50 text-gray-900 dark:text-white"
                  >
                    <option value="">Ninguna</option>
                    {localModules.flatMap(m => m.lessons || []).filter(l => l.id !== editingLesson.id).map(l => (
                      <option key={l.id} value={l.id}>{l.title}</option>
                    ))}
                  </select>
                </div>

                {editingLesson.lesson_type !== 'quiz' ? (
                  <>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Descripción de la Lección</label>
                      <RichTextEditor
                        content={editingLesson.description}
                        onChange={(content) => setEditingLesson({ ...editingLesson, description: content })}
                        placeholder="Contenido enriquecido adicional..."
                      />
                    </div>

                    <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Video de la Lección</label>
                      </div>
                      
                      {editingLesson.lesson_type === 'video' ? (
                        editingLesson.mux_playback_id ? (
                           <div className="bg-black rounded-xl overflow-hidden aspect-video relative shadow-inner">
                             <MuxPlayer
                               streamType="on-demand"
                               playbackId={editingLesson.mux_playback_id}
                               metadata={{
                                 video_id: editingLesson.id,
                                 video_title: editingLesson.title,
                               }}
                               primaryColor="#2DD4BF"
                             />
                           </div>
                        ) : (
                           <div className="w-full h-32 bg-gray-100 dark:bg-white/5 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700 flex flex-col items-center justify-center gap-2">
                              {editingLesson.mux_upload_id ? (
                                <>
                                  <span className="material-symbols-outlined text-amber-500 animate-spin">sync</span>
                                  <p className="text-gray-500 text-sm font-medium">El video se está procesando en Mux...</p>
                                  <p className="text-gray-400 text-[11px] text-center px-4">Por favor espera unos minutos. La página o el video se actualizará automáticamente cuando finalice.</p>
                                </>
                              ) : (
                                <>
                                  <span className="material-symbols-outlined text-gray-400">video_file</span>
                                  <p className="text-gray-500 text-sm font-medium">No hay video procesado aún.</p>
                                  <p className="text-gray-400 text-[11px] text-center px-4">Sube un video usando el botón en la lista principal de lecciones.</p>
                                </>
                              )}
                           </div>
                        )
                      ) : null }
                    </div>

                    <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Recursos Adjuntos (PDFs u otros)</label>
                        <label className="text-xs bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1.5 rounded-lg cursor-pointer transition-colors flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[14px]">upload_file</span>
                          <span>{uploadingMaterial ? 'Subiendo...' : 'Añadir Archivo'}</span>
                          <input type="file" className="hidden" disabled={uploadingMaterial} onChange={handleMaterialUpload} />
                        </label>
                      </div>
                      
                      {(!editingLesson.materials || editingLesson.materials.length === 0) ? (
                        <div className="text-sm text-gray-500 py-3 text-center border border-dashed border-gray-300 dark:border-gray-700 rounded-xl">
                          No hay recursos adjuntos.
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {editingLesson.materials.map((mat, idx) => (
                            <div key={idx} className="flex justify-between items-center text-sm p-3 bg-gray-50 dark:bg-black/30 border border-gray-200 dark:border-gray-800 rounded-xl">
                              <span className="font-medium text-gray-700 dark:text-gray-300 truncate mr-3">{mat.title}</span>
                              <button
                                type="button"
                                onClick={() => {
                                  const newMats = [...editingLesson.materials];
                                  newMats.splice(idx, 1);
                                  setEditingLesson({...editingLesson, materials: newMats});
                                }}
                                className="text-red-500 hover:text-red-600 bg-red-500/10 hover:bg-red-500/20 p-1.5 rounded-lg transition-colors shrink-0"
                                title="Eliminar recurso"
                              >
                                <span className="material-symbols-outlined text-sm">delete</span>
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                    <div className="flex items-center justify-between p-4 bg-violet-500/10 border border-violet-500/20 rounded-xl">
                      <div>
                        <h4 className="font-bold text-violet-700 dark:text-violet-300 flex items-center gap-2">
                          <span className="material-symbols-outlined text-lg">quiz</span>
                          Lección de Evaluación
                        </h4>
                        <p className="text-xs text-violet-600/70 dark:text-violet-400 mt-1">
                          Las preguntas y opciones se gestionan desde el Constructor de Evaluaciones. Puedes cambiar el estado de publicación abajo.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="flex items-center gap-3 mt-4 bg-gray-50 dark:bg-black/20 p-4 rounded-xl border border-gray-200 dark:border-gray-800">
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">Estado de Publicación</p>
                    <p className="text-xs text-gray-500">Haz que esta lección sea visible para los alumnos.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer"
                      checked={editingLesson.is_published}
                      onChange={(e) => setEditingLesson({ ...editingLesson, is_published: e.target.checked })}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/50 dark:peer-focus:ring-primary/30 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                  </label>
                </div>
              </div>
            </div>
            <div className="p-6 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-800 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsLessonModalOpen(false)}
                className="px-6 py-2.5 rounded-xl font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleSaveLesson}
                disabled={isSubmittingLesson || !editingLesson.title.trim()}
                className="px-6 py-2.5 bg-primary hover:bg-cyan-500 text-white rounded-xl font-semibold shadow-lg shadow-primary/25 transition-all disabled:opacity-50"
              >
                {isSubmittingLesson ? "Guardando..." : "Guardar Lección"}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
