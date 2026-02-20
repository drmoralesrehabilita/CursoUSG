"use client"

import { useState } from "react"
import { AdminHeader } from "@/components/admin/AdminHeader"

const statsCards = [
  { label: "M├│dulos", value: "8", icon: "folder_open", color: "text-primary" },
  { label: "Videos Publicados", value: "64", icon: "play_circle", color: "text-emerald-400" },
  { label: "Evaluaciones", value: "24", icon: "quiz", color: "text-violet-400" },
]

const modules = [
  {
    id: 1,
    title: "M├│dulo 1: Fundamentos de Ecograf├¡a",
    lessons: 8,
    published: 8,
    duration: "4h 30min",
    children: [
      { id: "1-1", title: "1.1 Introducci├│n al Ultrasonido", type: "video", duration: "25 min", status: "published" },
      { id: "1-2", title: "1.2 F├¡sica del Sonido", type: "video", duration: "35 min", status: "published" },
      { id: "1-3", title: "1.3 Transductores y Equipos", type: "video", duration: "40 min", status: "published" },
      { id: "1-4", title: "1.4 Evaluaci├│n del M├│dulo 1", type: "quiz", duration: "20 min", status: "published" },
    ],
  },
  {
    id: 2,
    title: "M├│dulo 2: Anatom├¡a Musculoesquel├®tica",
    lessons: 10,
    published: 7,
    duration: "6h 15min",
    children: [
      { id: "2-1", title: "2.1 Hombro: Anatom├¡a y Abordajes", type: "video", duration: "45 min", status: "published" },
      { id: "2-2", title: "2.2 Codo: Estructuras Clave", type: "video", duration: "35 min", status: "published" },
      { id: "2-3", title: "2.3 Mu├▒eca y Mano", type: "video", duration: "40 min", status: "draft" },
      { id: "2-4", title: "2.4 Evaluaci├│n del M├│dulo 2", type: "quiz", duration: "20 min", status: "draft" },
    ],
  },
  {
    id: 3,
    title: "M├│dulo 3: Patolog├¡a Tendinosa",
    lessons: 6,
    published: 3,
    duration: "3h 45min",
    children: [
      { id: "3-1", title: "3.1 Tendinopat├¡as: Clasificaci├│n", type: "video", duration: "30 min", status: "published" },
      { id: "3-2", title: "3.2 Roturas Tendinosas", type: "video", duration: "35 min", status: "draft" },
    ],
  },
]

function LessonIcon({ type }: { type: string }) {
  if (type === "quiz") {
    return <span className="material-symbols-outlined text-violet-400 text-lg">quiz</span>
  }
  return <span className="material-symbols-outlined text-primary text-lg">play_circle</span>
}

function LessonStatus({ status }: { status: string }) {
  if (status === "published") {
    return <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">Publicado</span>
  }
  return <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-500/15 text-amber-400 border border-amber-500/20">Borrador</span>
}

export default function ContenidoPage() {
  const [expandedModule, setExpandedModule] = useState<number | null>(1)

  return (
    <div className="flex flex-col h-full">
      <AdminHeader title="Gesti├│n de Contenido" subtitle="Administra los m├│dulos, lecciones y evaluaciones del curso" />

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
        <div className="bg-white dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/5 p-6">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-lg">cloud_upload</span>
            Subir Nuevo Contenido
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Video Upload */}
            <div className="border-2 border-dashed border-gray-200 dark:border-white/10 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 cursor-pointer group">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                <span className="material-symbols-outlined text-primary text-3xl">videocam</span>
              </div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Arrastra un video aqu├¡</p>
              <p className="text-xs text-gray-400">MP4, MOV, AVI ÔÇó M├íx. 2GB</p>
            </div>
            {/* Document Upload */}
            <div className="border-2 border-dashed border-gray-200 dark:border-white/10 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:border-violet-400/40 hover:bg-violet-500/5 transition-all duration-300 cursor-pointer group">
              <div className="w-14 h-14 rounded-2xl bg-violet-500/10 flex items-center justify-center mb-3 group-hover:bg-violet-500/20 transition-colors">
                <span className="material-symbols-outlined text-violet-400 text-3xl">description</span>
              </div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Arrastra un documento</p>
              <p className="text-xs text-gray-400">PDF, PPTX, DOCX ÔÇó M├íx. 100MB</p>
            </div>
          </div>
        </div>

        {/* Modules Accordion */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white">Estructura del Curso</h3>
            <button className="px-4 py-2 bg-primary text-white rounded-xl text-xs font-semibold hover:bg-primary/90 transition-colors flex items-center gap-1.5">
              <span className="material-symbols-outlined text-base">add</span>
              Nuevo M├│dulo
            </button>
          </div>

          {modules.map((mod) => {
            const isExpanded = expandedModule === mod.id
            return (
              <div
                key={mod.id}
                className="bg-white dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/5 overflow-hidden"
              >
                {/* Module Header */}
                <button
                  onClick={() => setExpandedModule(isExpanded ? null : mod.id)}
                  className="w-full flex items-center gap-4 px-5 py-4 hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors text-left"
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
                      {mod.published}/{mod.lessons} lecciones ÔÇó {mod.duration}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-20 bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${(mod.published / mod.lessons) * 100}%` }}
                      />
                    </div>
                    <span className="text-[11px] font-medium text-gray-400">{Math.round((mod.published / mod.lessons) * 100)}%</span>
                  </div>
                </button>

                {/* Lessons */}
                {isExpanded && (
                  <div className="border-t border-gray-100 dark:border-white/5">
                    {mod.children.map((lesson) => (
                      <div
                        key={lesson.id}
                        className="flex items-center gap-3 px-5 py-3 pl-16 hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors border-b border-gray-50 dark:border-white/[0.02] last:border-0 cursor-pointer"
                      >
                        <LessonIcon type={lesson.type} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-700 dark:text-gray-200 truncate">{lesson.title}</p>
                          <p className="text-[11px] text-gray-400">{lesson.duration}</p>
                        </div>
                        <LessonStatus status={lesson.status} />
                        <button className="text-gray-400 hover:text-primary transition-colors">
                          <span className="material-symbols-outlined text-lg">edit</span>
                        </button>
                        <button className="text-gray-400 hover:text-red-400 transition-colors">
                          <span className="material-symbols-outlined text-lg">delete</span>
                        </button>
                      </div>
                    ))}
                    {/* Add Lesson Button */}
                    <button className="w-full flex items-center justify-center gap-2 px-5 py-3 text-xs text-primary hover:bg-primary/5 transition-colors font-semibold">
                      <span className="material-symbols-outlined text-base">add</span>
                      Agregar Lecci├│n
                    </button>
                  </div>
                )}
              </div>
            )
          })}

        </div>
      </div>
    </div>
  )
}
