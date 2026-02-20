"use client"

import { AdminHeader } from "@/components/admin/AdminHeader"

export default function ContenidoPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <AdminHeader title="Contenido del Curso" subtitle="Carga y organiza módulos, clases y materiales" />
      
      <div className="p-6 grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Module List */}
        <div className="xl:col-span-2 space-y-4">
           {[1, 2, 3].map((m) => (
             <div key={m} className="bg-white dark:bg-[#0f1926] rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary font-bold">
                         {m}
                      </div>
                      <div>
                         <h3 className="font-bold text-gray-900 dark:text-white">Módulo {m}: Título del Módulo</h3>
                         <p className="text-xs text-gray-500">4 Clases • 2h 30m de contenido</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-2">
                       <button className="p-2 text-gray-400 hover:text-primary transition-colors">
                          <span className="material-symbols-outlined text-lg">settings</span>
                       </button>
                       <span className="material-symbols-outlined text-gray-300">expand_more</span>
                   </div>
                </div>
             </div>
           ))}
           <button className="w-full py-4 border-2 border-dashed border-gray-200 dark:border-white/5 rounded-2xl flex items-center justify-center gap-2 text-gray-400 hover:text-primary hover:border-primary/50 transition-all">
              <span className="material-symbols-outlined">add_circle</span>
              <span className="text-sm font-bold">Añadir Nuevo Módulo</span>
           </button>
        </div>

        {/* Upload & Stats */}
        <div className="space-y-6">
           <div className="bg-primary rounded-2xl p-6 text-white shadow-lg shadow-primary/20">
              <h3 className="font-bold mb-2">Cargar Nueva Clase</h3>
              <p className="text-xs text-white/80 mb-6">Sube videos en dual-feed y material complementario.</p>
              <div className="border-2 border-dashed border-white/20 rounded-xl p-8 flex flex-col items-center justify-center gap-3 bg-white/5 cursor-pointer hover:bg-white/10 transition-colors">
                  <span className="material-symbols-outlined text-3xl">upload_file</span>
                  <span className="text-xs font-bold uppercase tracking-wider text-center">Arrastra archivos aquí</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  )
}
