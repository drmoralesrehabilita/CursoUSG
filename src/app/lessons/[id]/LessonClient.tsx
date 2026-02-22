"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { toast } from 'sonner'
import { completeLessonProgress } from '@/app/actions/contentSetup'
import MuxPlayer from '@mux/mux-player-react'

type LessonItem = {
  id: string
  title: string
  order_index?: number | null
  lesson_type?: string | null
}

// ============ Sub-components (outside render) ============

type TopBarProps = {
  lesson: { title: string }
  moduleTitle: string
  prevLesson: LessonItem | null
  nextLesson: LessonItem | null
  sidebarOpen: boolean
  setSidebarOpen: (v: boolean) => void
}

function TopBar({ lesson, moduleTitle, prevLesson, nextLesson, sidebarOpen, setSidebarOpen }: TopBarProps) {
  return (
    <div className="flex items-center gap-3 px-4 md:px-8 py-4 border-b border-gray-200 dark:border-gray-800 bg-surface-light dark:bg-surface-dark sticky top-0 z-30">
      <Link href="/dashboard" className="flex items-center gap-2 text-gray-500 hover:text-primary transition-colors mr-2">
        <span className="material-symbols-outlined text-xl">arrow_back</span>
        <span className="hidden sm:inline text-sm font-medium">Dashboard</span>
      </Link>
      <div className="h-5 w-px bg-gray-300 dark:bg-gray-700" />
      {moduleTitle && (
        <>
          <span className="text-sm text-gray-400 truncate max-w-[150px] hidden sm:block">{moduleTitle}</span>
          <span className="material-symbols-outlined text-gray-400 text-sm hidden sm:block">chevron_right</span>
        </>
      )}
      <span className="text-sm font-semibold text-secondary dark:text-white truncate flex-1">{lesson.title}</span>
      <div className="flex items-center gap-2 ml-auto shrink-0">
        {prevLesson && (
          <Link href={`/lessons/${prevLesson.id}`} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 hover:text-primary transition-all" title="Lección anterior">
            <span className="material-symbols-outlined">skip_previous</span>
          </Link>
        )}
        {nextLesson && (
          <Link href={`/lessons/${nextLesson.id}`} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 hover:text-primary transition-all" title="Siguiente lección">
            <span className="material-symbols-outlined">skip_next</span>
          </Link>
        )}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 hover:text-primary transition-all ml-1"
          title={sidebarOpen ? "Ocultar índice" : "Mostrar índice"}
        >
          <span className="material-symbols-outlined">{sidebarOpen ? 'menu_open' : 'menu'}</span>
        </button>
      </div>
    </div>
  )
}

type SidebarProps = {
  sidebarOpen: boolean
  moduleTitle: string
  moduleLessons: LessonItem[]
  currentLessonId: string
}

function Sidebar({ sidebarOpen, moduleTitle, moduleLessons, currentLessonId }: SidebarProps) {
  const iconMap: Record<string, string> = {
    quiz: 'quiz',
    document: 'description',
  }

  return (
    <aside
      className={`${sidebarOpen ? 'w-72 opacity-100' : 'w-0 opacity-0 overflow-hidden'} transition-all duration-300 shrink-0 bg-surface-light dark:bg-surface-dark border-l border-gray-200 dark:border-gray-800 flex flex-col`}
    >
      <div className="p-4 border-b border-gray-200 dark:border-gray-800">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Módulo</p>
        <h3 className="text-sm font-semibold text-secondary dark:text-white leading-tight">{moduleTitle}</h3>
        <p className="text-xs text-gray-400 mt-1">{moduleLessons.length} lecciones</p>
      </div>
      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        {moduleLessons.length === 0 && (
          <p className="text-sm text-gray-400 text-center py-6 px-2">Las lecciones se mostrarán cuando sean publicadas.</p>
        )}
        {moduleLessons.map((l, i) => {
          const isActive = l.id === currentLessonId
          const icon = iconMap[l.lesson_type || ''] || 'play_circle'

          return (
            <Link
              key={l.id}
              href={`/lessons/${l.id}`}
              className={`flex items-center gap-3 p-3 rounded-xl text-sm transition-all ${isActive ? 'bg-primary/10 text-primary border border-primary/20' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-secondary dark:hover:text-white'}`}
            >
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold ${isActive ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-500'}`}>
                {i + 1}
              </div>
              <span className="flex-1 line-clamp-2 leading-snug">{l.title}</span>
              <span className={`material-symbols-outlined text-base shrink-0 ${isActive ? 'text-primary' : 'text-gray-400'}`}>{icon}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}

// ============ Main Component ============

export function LessonClient({
  lesson,
  isCompleted,
  quizData,
  moduleLessons = [],
  moduleTitle = "",
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  lesson: any
  isCompleted: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  quizData: any
  moduleLessons?: LessonItem[]
  moduleTitle?: string
}) {
  const router = useRouter()
  const [marking, setMarking] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({})
  const [showResults, setShowResults] = useState(false)
  const [score, setScore] = useState(0)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const currentIndex = moduleLessons.findIndex(l => l.id === lesson.id)
  const prevLesson = currentIndex > 0 ? moduleLessons[currentIndex - 1] : null
  const nextLesson = currentIndex < moduleLessons.length - 1 ? moduleLessons[currentIndex + 1] : null

  const handleComplete = async (quizScore?: number) => {
    setMarking(true)
    const res = await completeLessonProgress(lesson.id, quizScore)
    setMarking(false)
    if (res?.success) {
      toast.success(quizScore !== undefined ? '¡Cuestionario aprobado!' : '¡Lección completada!')
      router.refresh()
    } else {
      toast.error('Error al guardar progreso: ' + res?.error)
    }
  }

  const handleQuizSubmit = () => {
    if (!quizData || !quizData.questions) return
    let correctCount = 0
    let totalScore = 0
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    quizData.questions.forEach((q: any) => {
      totalScore += q.score || 1
      if (selectedOptions[q.id] === q.correct_option_id) correctCount += q.score || 1
    })
    const percentage = Math.round((correctCount / totalScore) * 100)
    setScore(percentage)
    setShowResults(true)
    if (percentage >= (quizData.min_score_to_pass || 80)) {
      handleComplete(percentage)
    } else {
      toast.error(`Calificación: ${percentage}%. Necesitas al menos ${quizData.min_score_to_pass || 80}% para aprobar.`)
    }
  }

  const sharedTopBarProps = { lesson, moduleTitle, prevLesson, nextLesson, sidebarOpen, setSidebarOpen }
  const sharedSidebarProps = { sidebarOpen, moduleTitle, moduleLessons, currentLessonId: lesson.id }

  // ----------- DOCUMENT VIEW -----------
  if (lesson.lesson_type === 'document') {
    const docs = lesson.materials || []
    return (
      <div className="flex flex-col h-full">
        <TopBar {...sharedTopBarProps} />
        <div className="flex flex-1 overflow-hidden">
          <main className="flex-1 overflow-y-auto p-6 md:p-8">
            <h1 className="text-3xl font-bold text-secondary dark:text-white mb-3">{lesson.title}</h1>
            <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-2xl">{lesson.description}</p>
            <div className="bg-surface-light dark:bg-surface-dark border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm mb-8 max-w-2xl">
              <h2 className="text-xl font-semibold mb-4 text-secondary dark:text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">folder_open</span>
                Documentos de Lectura
              </h2>
              {docs.length > 0 ? (
                <div className="space-y-3">
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                  {docs.map((doc: any, i: number) => (
                    <a key={i} href={doc.url} target="_blank" rel="noreferrer" className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-600">
                      <span className="material-symbols-outlined text-red-500 text-3xl">picture_as_pdf</span>
                      <span className="font-medium flex-1 dark:text-gray-200">{doc.title}</span>
                      <span className="material-symbols-outlined text-primary">download</span>
                    </a>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No hay documentos disponibles.</p>
              )}
            </div>
            <div className="flex flex-col sm:flex-row gap-3 max-w-2xl">
              <button
                onClick={() => handleComplete()}
                disabled={isCompleted || marking}
                className={`flex-1 px-8 py-3 rounded-xl font-bold shadow-lg flex items-center justify-center gap-2 transition-transform active:scale-95 ${isCompleted ? 'bg-green-500 text-white cursor-not-allowed' : 'bg-primary hover:bg-cyan-500 text-white shadow-primary/20'}`}
              >
                <span className="material-symbols-outlined">{isCompleted ? 'check_circle' : 'done_all'}</span>
                {isCompleted ? 'Completado' : (marking ? 'Guardando...' : 'Marcar como Leído')}
              </button>
              {nextLesson && (
                <Link href={`/lessons/${nextLesson.id}`} className="flex-1 bg-gray-100 dark:bg-gray-800 text-secondary dark:text-white font-semibold px-6 py-3 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-2">
                  Siguiente <span className="material-symbols-outlined">arrow_forward</span>
                </Link>
              )}
            </div>
          </main>
          <Sidebar {...sharedSidebarProps} />
        </div>
      </div>
    )
  }

  // ----------- QUIZ VIEW -----------
  if (lesson.lesson_type === 'quiz' && quizData) {
    const isPassed = showResults && score >= (quizData.min_score_to_pass || 80)
    return (
      <div className="flex flex-col h-full">
        <TopBar {...sharedTopBarProps} />
        <div className="flex flex-1 overflow-hidden">
          <main className="flex-1 overflow-y-auto p-6 md:p-8">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-3xl">quiz</span>
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-secondary dark:text-white">{quizData.title || lesson.title}</h1>
                  <p className="text-gray-500">Mínimo para aprobar: {quizData.min_score_to_pass || 80}%</p>
                </div>
              </div>
              {showResults && (
                <div className={`mb-8 p-6 rounded-2xl border ${isPassed ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'}`}>
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white ${isPassed ? 'bg-green-500' : 'bg-red-500'}`}>
                      <span className="material-symbols-outlined">{isPassed ? 'check' : 'close'}</span>
                    </div>
                    <div>
                      <h3 className={`text-xl font-bold ${isPassed ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}`}>{isPassed ? '¡Aprobado!' : 'No Aprobado'}</h3>
                      <p className={isPassed ? 'text-green-600 dark:text-green-300' : 'text-red-600 dark:text-red-300'}>Tu calificación: {score}%</p>
                    </div>
                  </div>
                </div>
              )}
              <div className="space-y-8">
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {quizData.questions?.map((q: any, i: number) => (
                  <div key={q.id} className="bg-surface-light dark:bg-surface-dark p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
                    {q.image_url && (
                      <div className="mb-6 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/question_images/${q.image_url}`} alt="Case" className="w-full max-h-[400px] object-contain bg-black/5" />
                      </div>
                    )}
                    <h3 className="text-lg font-bold text-secondary dark:text-white mb-4">{i + 1}. {q.question_text}</h3>
                    {q.findings && q.findings.length > 0 && (
                      <div className="mb-6 p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700">
                        <h4 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Hallazgos Clínicos</h4>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                          {q.findings.map((f: any, idx: number) => (
                            <div key={idx} className="flex justify-between border-b border-gray-100 dark:border-gray-800 pb-1">
                              <span className="text-gray-500 font-medium">{f.label}</span>
                              <span className="text-gray-900 dark:text-gray-100">{f.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    <div className="space-y-3">
                      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                      {q.options?.map((opt: any) => {
                        const isSelected = selectedOptions[q.id] === opt.id
                        let cls = "border-gray-200 dark:border-gray-600 hover:border-primary/50"
                        if (showResults) {
                          if (opt.id === q.correct_option_id) cls = "bg-green-100 dark:bg-green-900/40 border-green-500 text-green-800 dark:text-green-200 font-medium"
                          else if (isSelected) cls = "bg-red-100 dark:bg-red-900/40 border-red-500 text-red-800 dark:text-red-200"
                          else cls = "opacity-50 border-gray-200 dark:border-gray-700"
                        } else if (isSelected) {
                          cls = "border-primary bg-primary/5 dark:bg-primary/10 ring-1 ring-primary"
                        }
                        return (
                          <div key={opt.id} className="space-y-2">
                            <div onClick={() => { if (!showResults) setSelectedOptions(p => ({ ...p, [q.id]: opt.id })) }} className={`p-4 rounded-xl border-2 cursor-pointer flex items-center gap-3 transition-all ${cls}`}>
                              <div className={`w-5 h-5 rounded-full border-2 flex shrink-0 items-center justify-center ${showResults && opt.id === q.correct_option_id ? 'border-green-500' : isSelected ? 'border-primary' : 'border-gray-300 dark:border-gray-500'}`}>
                                {isSelected && !showResults && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                                {showResults && opt.id === q.correct_option_id && <div className="w-2.5 h-2.5 rounded-full bg-green-500" />}
                              </div>
                              <span className="flex-1">{opt.text}</span>
                            </div>
                            {showResults && isSelected && opt.feedback_clinical && (
                              <div className={`p-3 text-sm rounded-lg ml-8 ${opt.id === q.correct_option_id ? 'bg-green-50 text-green-800 border-l-4 border-green-500 dark:bg-green-900/20 dark:text-green-200' : 'bg-red-50 text-red-800 border-l-4 border-red-500 dark:bg-red-900/20 dark:text-red-200'}`}>
                                <span className="font-bold">Feedback:</span> {opt.feedback_clinical}
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                    {showResults && (q.pearl || q.source_reference) && (
                      <div className="mt-6 p-5 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-xl space-y-4">
                        {q.pearl && <div><h4 className="flex items-center gap-2 font-bold text-blue-900 dark:text-blue-200 mb-1"><span className="material-symbols-outlined text-sm">tips_and_updates</span>Perla Clínica</h4><p className="text-sm text-blue-800 dark:text-blue-300">{q.pearl}</p></div>}
                        {q.source_reference && <div><h4 className="flex items-center gap-2 font-bold text-blue-900 dark:text-blue-200 mb-1"><span className="material-symbols-outlined text-sm">menu_book</span>Bibliografía</h4><p className="text-xs text-blue-800/80 dark:text-blue-300/80 italic">{q.source_reference}</p></div>}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-8 flex justify-end">
                {!showResults || !isPassed ? (
                  <button
                    onClick={showResults ? () => { setShowResults(false); setSelectedOptions({}) } : handleQuizSubmit}
                    disabled={marking || (!showResults && Object.keys(selectedOptions).length < quizData.questions?.length)}
                    className="bg-primary hover:bg-cyan-500 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-primary/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {showResults ? 'Reintentar' : 'Enviar Respuestas'}
                  </button>
                ) : nextLesson ? (
                  <Link href={`/lessons/${nextLesson.id}`} className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-green-500/20 flex items-center gap-2">
                    Siguiente Lección <span className="material-symbols-outlined">arrow_forward</span>
                  </Link>
                ) : (
                  <Link href="/dashboard" className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-green-500/20 flex items-center gap-2">
                    <span className="material-symbols-outlined">school</span> Continuar Curso
                  </Link>
                )}
              </div>
            </div>
          </main>
          <Sidebar {...sharedSidebarProps} />
        </div>
      </div>
    )
  }

  // ----------- VIDEO VIEW (default) -----------
  const hasMux = !!lesson.mux_playback_id
  const legacyVideoUrl = lesson.is_master_camera ? lesson.video_url_camera : (lesson.video_url_ultrasound || lesson.video_url_camera)

  return (
    <div className="flex flex-col h-full">
      <TopBar {...sharedTopBarProps} />
      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 overflow-y-auto">
          {/* Video Player */}
          <div className="bg-black w-full aspect-video">
            {hasMux ? (
              <MuxPlayer
                playbackId={lesson.mux_playback_id}
                className="w-full h-full"
                onEnded={() => { if (!isCompleted && !marking) handleComplete() }}
                accentColor="#00b4d8"
                style={{ aspectRatio: '16/9' }}
                streamType="on-demand"
              />
            ) : legacyVideoUrl ? (
              <video
                controls
                className="w-full h-full"
                src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/videos/${legacyVideoUrl}`}
                onEnded={() => { if (!isCompleted && !marking) handleComplete() }}
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-500 gap-3">
                <span className="material-symbols-outlined text-5xl opacity-30">videocam_off</span>
                <p className="text-sm">Video no disponible todavía</p>
              </div>
            )}
          </div>

          {/* Details */}
          <div className="p-6 md:p-8 max-w-4xl">
            <div className="flex flex-col md:flex-row md:items-start gap-4 mb-6">
              <div className="flex-1">
                <h1 className="text-2xl md:text-3xl font-bold text-secondary dark:text-white mb-2">{lesson.title}</h1>
                {lesson.description && <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{lesson.description}</p>}
              </div>
              <button
                onClick={() => handleComplete()}
                disabled={isCompleted || marking}
                className={`shrink-0 px-6 py-3 rounded-xl font-bold text-sm shadow-lg flex items-center gap-2 transition-all active:scale-95 whitespace-nowrap ${isCompleted ? 'bg-green-500 text-white cursor-not-allowed' : 'bg-primary hover:bg-cyan-500 text-white shadow-primary/30'}`}
              >
                <span className="material-symbols-outlined text-xl">{isCompleted ? 'check_circle' : 'done_all'}</span>
                {isCompleted ? 'Completada' : (marking ? 'Guardando...' : 'Marcar Completada')}
              </button>
            </div>

            {/* Prev / Next navigation */}
            <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-800">
              {prevLesson && (
                <Link href={`/lessons/${prevLesson.id}`} className="flex-1 max-w-xs bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-secondary dark:text-white font-medium px-4 py-3 rounded-xl flex items-center gap-2 transition-colors text-sm">
                  <span className="material-symbols-outlined text-primary">arrow_back</span>
                  <span className="truncate">{prevLesson.title}</span>
                </Link>
              )}
              {nextLesson && (
                <Link href={`/lessons/${nextLesson.id}`} className="flex-1 max-w-xs ml-auto bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-secondary dark:text-white font-medium px-4 py-3 rounded-xl flex items-center justify-end gap-2 transition-colors text-sm">
                  <span className="truncate">{nextLesson.title}</span>
                  <span className="material-symbols-outlined text-primary">arrow_forward</span>
                </Link>
              )}
            </div>

            {/* Downloadable Materials */}
            {lesson.materials && lesson.materials.length > 0 && (
              <div className="mt-8 bg-surface-light dark:bg-surface-dark border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
                <h3 className="font-bold text-secondary dark:text-white mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">folder_open</span>
                  Recursos Descargables
                </h3>
                <div className="space-y-3">
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                  {lesson.materials.map((mat: any, i: number) => (
                    <a key={i} href={mat.url} target="_blank" rel="noreferrer" className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors border border-gray-100 dark:border-gray-700">
                      <span className="material-symbols-outlined text-red-500">picture_as_pdf</span>
                      <span className="font-medium text-sm flex-1 truncate dark:text-gray-300">{mat.title}</span>
                      <span className="material-symbols-outlined text-gray-400 text-sm">download</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </main>

        <Sidebar {...sharedSidebarProps} />
      </div>
    </div>
  )
}
