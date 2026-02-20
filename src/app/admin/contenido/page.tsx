"use client"

import { useState } from "react"
import { AdminHeader } from "@/components/admin/AdminHeader"

const statsCards = [
  { label: "Módulos", value: "8", icon: "folder_open", color: "text-primary" },
  { label: "Videos Publicados", value: "64", icon: "play_circle", color: "text-emerald-400" },
  { label: "Evaluaciones", value: "24", icon: "quiz", color: "text-violet-400" },
]

export default function ContenidoPage() {
  const [selectedModule, setSelectedModule] = useState(1)

  return (
    <div className="flex flex-col h-full">
      <AdminHeader title="Gestión de Contenido" subtitle="Crea y organiza los módulos de tu diplomado" />

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Header Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {statsCards.map((card, idx) => (
            <div key={idx} className="bg-white dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/5 p-6 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">{card.label}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{card.value}</p>
              </div>
              <div className={`w-12 h-12 rounded-xl bg-gray-50 dark:bg-white/5 flex items-center justify-center ${card.color}`}>
                <span className="material-symbols-outlined text-2xl">{card.icon}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Content Structure */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left: Module List */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/5 p-4">
              <div className="flex items-center justify-between mb-4 px-2">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white">Módulos</h3>
                <button className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-sm">add</span>
                </button>
              </div>
              
              <div className="space-y-2">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((m) => (
                  <button
                    key={m}
                    onClick={() => setSelectedModule(m)}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                      selectedModule === m 
                        ? "bg-primary text-white shadow-lg shadow-primary/20" 
                        : "hover:bg-gray-50 dark:hover:bg-white/5 text-gray-600 dark:text-gray-400"
                    }`}
                  >
                    <span className="text-[10px] font-bold opacity-60">MOD 0{m}</span>
                    <span className="text-xs font-semibold truncate flex-1 text-left">Título del Módulo {m}</span>
                    <span className="material-symbols-outlined text-sm opacity-40">drag_indicator</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Module Details / Lessons */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/5 overflow-hidden">
               {/* Module Header Editor */}
               <div className="p-6 border-b border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-white/5">
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-500 rounded text-[9px] font-bold uppercase border border-emerald-500/20">Publicado</span>
                    <div className="flex gap-2">
                      <button className="w-8 h-8 rounded-lg border border-gray-200 dark:border-white/10 flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-500/30 transition-colors">
                        <span className="material-symbols-outlined text-sm">delete</span>
                      </button>
                      <button className="px-4 py-1.5 bg-primary text-white rounded-lg text-[10px] font-bold hover:bg-primary/90 transition-colors flex items-center gap-1.5 shadow-sm">
                        <span className="material-symbols-outlined text-sm">save</span>
                        Guardar
                      </button>
                    </div>
                  </div>
                  <input 
                    type="text" 
                    defaultValue={`Módulo ${selectedModule}: Fundamentos de USG`}
                    className="w-full bg-transparent border-none text-xl font-bold text-gray-900 dark:text-white outline-none focus:ring-0 p-0 mb-1"
                  />
                  <textarea 
                    rows={2}
                    defaultValue="Introducción a la física del ultrasonido, tipos de transductores y principios básicos de imagenología."
                    className="w-full bg-transparent border-none text-xs text-gray-500 dark:text-gray-400 outline-none focus:ring-0 p-0 resize-none"
                  />
               </div>

               {/* Lessons List */}
               <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                     <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Lecciones del Módulo</h4>
                     <button className="text-xs text-primary font-bold hover:text-primary/80 transition-colors flex items-center gap-1">
                        <span className="material-symbols-outlined opacity-60">add_circle</span>
                        Nueva Lección
                     </button>
                  </div>

                  <div className="space-y-3">
                     {[
                       { title: "1.1 Principios Físicos del Sonido", duration: "12:45", type: "video" },
                       { title: "1.2 Knobología y Botonología", duration: "18:20", type: "video" },
                       { title: "1.3 Artefactos en Ecografía", duration: "15:10", type: "video" },
                       { title: "Evaluación Teórica: Mod 1", duration: "20 min", type: "quiz" },
                     ].map((item, idx) => (
                       <div key={idx} className="group flex items-center gap-4 p-4 rounded-xl border border-gray-100 dark:border-white/5 bg-white dark:bg-transparent hover:border-primary/30 hover:bg-primary/5 transition-all">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.type === 'video' ? 'bg-blue-500/10 text-blue-500' : 'bg-violet-500/10 text-violet-500'}`}>
                             <span className="material-symbols-outlined text-xl">
                                {item.type === 'video' ? 'play_circle' : 'quiz'}
                             </span>
                          </div>
                          <div className="flex-1">
                             <p className="text-xs font-bold text-gray-900 dark:text-white">{item.title}</p>
                             <p className="text-[10px] text-gray-400 flex items-center gap-2">
                                <span className="material-symbols-outlined text-[10px]">schedule</span>
                                {item.duration}
                             </p>
                          </div>
                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                             <button className="w-8 h-8 rounded-lg text-gray-400 hover:text-primary"><span className="material-symbols-outlined text-sm">settings</span></button>
                             <button className="w-8 h-8 rounded-lg text-gray-400 hover:text-red-500"><span className="material-symbols-outlined text-sm">close</span></button>
                          </div>
                          <span className="material-symbols-outlined text-gray-300 text-sm cursor-grab">drag_indicator</span>
                       </div>
                     ))}
                  </div>
               </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
