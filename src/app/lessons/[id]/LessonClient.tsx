"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { toast } from 'sonner'
import { completeLessonProgress } from '@/app/actions/contentSetup'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function LessonClient({ lesson, isCompleted, quizData }: { lesson: any, isCompleted: boolean, quizData: any }) {
  const router = useRouter()
  const [marking, setMarking] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({})
  const [showResults, setShowResults] = useState(false)
  const [score, setScore] = useState(0)

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
      if (selectedOptions[q.id] === q.correct_option_id) {
        correctCount += q.score || 1
      }
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

  // Si es Documento
  if (lesson.lesson_type === 'document') {
    const docs = lesson.materials || []
    return (
      <div className="max-w-4xl mx-auto p-6 md:p-8">
        <Link href="/dashboard" className="text-primary hover:underline mb-6 inline-flex items-center gap-2">
          <span className="material-symbols-outlined">arrow_back</span>
          Volver al Dashboard
        </Link>
        <h1 className="text-3xl font-bold text-secondary dark:text-white mb-2">{lesson.title}</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">{lesson.description}</p>
        
        <div className="bg-surface-light dark:bg-surface-dark border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm mb-8">
          <h2 className="text-xl font-semibold mb-4 text-secondary dark:text-white">Documentos de Lectura</h2>
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

        <div className="flex justify-end">
           <button 
             onClick={() => handleComplete()} 
             disabled={isCompleted || marking}
             className={`px-8 py-3 rounded-xl font-bold shadow-lg flex items-center gap-2 transition-transform active:scale-95 ${isCompleted ? 'bg-green-500 text-white cursor-not-allowed shadow-green-500/20' : 'bg-primary hover:bg-cyan-500 text-white shadow-primary/20'}`}
           >
             <span className="material-symbols-outlined">{isCompleted ? 'check_circle' : 'done_all'}</span>
             {isCompleted ? 'Completado' : (marking ? 'Guardando...' : 'Marcar como Leído')}
           </button>
        </div>
      </div>
    )
  }

  // Si es Quiz
  if (lesson.lesson_type === 'quiz' && quizData) {
    const isPassed = showResults && score >= (quizData.min_score_to_pass || 80)
    
    return (
      <div className="max-w-3xl mx-auto p-6 md:p-8">
        <Link href="/dashboard" className="text-primary hover:underline mb-6 inline-flex items-center gap-2">
          <span className="material-symbols-outlined">arrow_back</span>
          Volver al Dashboard
        </Link>
        <div className="bg-surface-light dark:bg-surface-dark border border-gray-200 dark:border-gray-700 rounded-3xl p-8 shadow-lg">
          <div className="flex items-center gap-4 mb-6">
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
                   <h3 className={`text-xl font-bold ${isPassed ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}`}>
                     {isPassed ? '¡Aprobado!' : 'No Aprobado'}
                   </h3>
                   <p className={isPassed ? 'text-green-600 dark:text-green-300' : 'text-red-600 dark:text-red-300'}>
                     Tu calificación: {score}%
                   </p>
                 </div>
              </div>
            </div>
          )}

          <div className="space-y-8">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {quizData.questions?.map((q: any, i: number) => (
               <div key={q.id} className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-2xl border border-gray-100 dark:border-gray-700">
                 
                 {/* Image Support */}
                 {q.image_url && (
                   <div className="mb-6 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                     {/* eslint-disable-next-line @next/next/no-img-element */}
                     <img 
                       src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/question_images/${q.image_url}`} 
                       alt="Clinical Case" 
                       className="w-full max-h-[400px] object-contain bg-black/5"
                     />
                   </div>
                 )}

                 <h3 className="text-lg font-bold text-secondary dark:text-white mb-4">
                   {i + 1}. {q.question_text}
                 </h3>

                 {/* Findings Support */}
                 {q.findings && q.findings.length > 0 && (
                   <div className="mb-6 p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700">
                     <h4 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Hallazgos Clínicos</h4>
                     <div className="grid grid-cols-2 gap-2 text-sm">
                       {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                       {q.findings.map((finding: any, idx: number) => (
                         <div key={idx} className="flex justify-between border-b border-gray-100 dark:border-gray-800 pb-1">
                           <span className="text-gray-500 font-medium">{finding.label}</span>
                           <span className="text-gray-900 dark:text-gray-100">{finding.value}</span>
                         </div>
                       ))}
                     </div>
                   </div>
                 )}

                 <div className="space-y-3">
                   {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                   {q.options?.map((opt: any) => {
                     const isSelected = selectedOptions[q.id] === opt.id
                     // Analizar colores si se muestran resultados
                     let optClasses = "border-gray-200 dark:border-gray-600 hover:border-primary/50"
                     
                     if (showResults) {
                       if (opt.id === q.correct_option_id) {
                         optClasses = "bg-green-100 dark:bg-green-900/40 border-green-500 text-green-800 dark:text-green-200 font-medium"
                       } else if (isSelected) {
                         optClasses = "bg-red-100 dark:bg-red-900/40 border-red-500 text-red-800 dark:text-red-200"
                       } else {
                         optClasses = "opacity-50 border-gray-200 dark:border-gray-700"
                       }
                     } else if (isSelected) {
                       optClasses = "border-primary bg-primary/5 dark:bg-primary/10 ring-1 ring-primary"
                     }

                     return (
                       <div key={opt.id} className="space-y-2">
                         <div 
                           onClick={() => {
                             if (!showResults) setSelectedOptions(prev => ({ ...prev, [q.id]: opt.id }))
                           }}
                           className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex items-center gap-3 ${optClasses}`}
                         >
                           <div className={`w-5 h-5 rounded-full border-2 flex flex-shrink-0 items-center justify-center ${
                             showResults && opt.id === q.correct_option_id ? 'border-green-500' :
                             isSelected ? 'border-primary' : 'border-gray-300 dark:border-gray-500'
                           }`}>
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

                 {/* Pearl and References */}
                 {showResults && (q.pearl || q.source_reference) && (
                   <div className="mt-6 p-5 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-xl space-y-4">
                     {q.pearl && (
                       <div>
                         <h4 className="flex items-center gap-2 font-bold text-blue-900 dark:text-blue-200 mb-1">
                           <span className="material-symbols-outlined text-sm">tips_and_updates</span>
                           Perla Clínica
                         </h4>
                         <p className="text-sm text-blue-800 dark:text-blue-300 leading-relaxed">{q.pearl}</p>
                       </div>
                     )}
                     {q.source_reference && (
                       <div>
                         <h4 className="flex items-center gap-2 font-bold text-blue-900 dark:text-blue-200 mb-1">
                           <span className="material-symbols-outlined text-sm">menu_book</span>
                           Bibliografía
                         </h4>
                         <p className="text-xs text-blue-800/80 dark:text-blue-300/80 italic">{q.source_reference}</p>
                       </div>
                     )}
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
            ) : (
              <Link href="/dashboard" className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-green-500/20 transition-all flex items-center gap-2">
                <span className="material-symbols-outlined">school</span>
                Continuar Curso
              </Link>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Por defecto (Video)
  const videoUrl = lesson.is_master_camera ? lesson.video_url_camera : (lesson.video_url_ultrasound || lesson.video_url_camera)
  const fallbackVideo = "https://www.w3schools.com/html/mov_bbb.mp4"

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      <Link href="/dashboard" className="text-primary hover:underline mb-6 inline-flex items-center gap-2">
        <span className="material-symbols-outlined">arrow_back</span>
        Volver al Dashboard
      </Link>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-black rounded-2xl overflow-hidden aspect-video shadow-xl relative border border-gray-800">
            {/* Implementación real requeriría presigned url si es privado en Supabase */}
            <video 
              controls 
              className="w-full h-full object-cover" 
              src={videoUrl ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/videos/${videoUrl}` : fallbackVideo}
              onEnded={() => {
                if (!isCompleted && !marking) handleComplete()
              }}
            >
              Tu navegador no soporta el video.
            </video>
          </div>
          
          <div>
            <h1 className="text-3xl font-bold text-secondary dark:text-white mb-2">{lesson.title}</h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">{lesson.description}</p>
          </div>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <div className="bg-surface-light dark:bg-surface-dark border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm">
             <div className="flex justify-between items-center mb-6">
               <h3 className="font-bold text-secondary dark:text-white">Progreso</h3>
               <span className={`px-3 py-1 text-xs font-bold rounded-full border ${isCompleted ? 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800' : 'bg-gray-100 text-gray-600 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700'}`}>
                 {isCompleted ? 'COMPLETADO' : 'PENDIENTE'}
               </span>
             </div>
             
             <p className="text-sm text-gray-500 mb-6 font-medium">
               El avance se guardará automáticamente al finalizar el video, o puedes marcarlo manualmente abajo.
             </p>

             <button 
               onClick={() => handleComplete()} 
               disabled={isCompleted || marking}
               className={`w-full py-4 rounded-xl font-bold text-sm shadow-lg flex items-center justify-center gap-2 transition-all active:scale-95 ${isCompleted ? 'bg-green-500 text-white cursor-not-allowed shadow-none' : 'bg-primary hover:bg-cyan-500 text-white shadow-primary/30'}`}
             >
               <span className="material-symbols-outlined text-xl">{isCompleted ? 'check_circle' : 'done_all'}</span>
               {isCompleted ? 'Lección Completada' : (marking ? 'Guardando...' : 'Marcar como Completado')}
             </button>
          </div>

          {lesson.materials && lesson.materials.length > 0 && (
            <div className="bg-surface-light dark:bg-surface-dark border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm">
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
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
