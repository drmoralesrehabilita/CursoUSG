"use client"

import { AdminHeader } from "@/components/admin/AdminHeader"

export default function CertificadosPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <AdminHeader title="Certificados" subtitle="Configura la generación automática de certificados" />
      
      <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Editor */}
        <div className="bg-white dark:bg-[#0f1926] rounded-2xl border border-gray-100 dark:border-white/5 p-8 space-y-6">
           <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">edit_document</span>
              Personalizar Plantilla
           </h3>
           
           <div className="space-y-4">
              <div className="space-y-2">
                 <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Título del Certificado</label>
                 <input type="text" defaultValue="Constancia de Acreditación" className="w-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary" />
              </div>
              <div className="space-y-2">
                 <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Nombre del Director</label>
                 <input type="text" defaultValue="Dr. Raúl Morales" className="w-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary" />
              </div>
           </div>

           <div className="pt-6 border-t border-gray-100 dark:border-white/5">
              <button className="bg-primary text-white w-full py-3 rounded-xl font-bold text-sm shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform">
                 Guardar Cambios
              </button>
           </div>
        </div>

        {/* Preview */}
        <div className="flex flex-col gap-4">
           <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider px-2 italic">Vista Previa en Tiempo Real</h3>
           <div className="aspect-[1.414/1] bg-white dark:bg-slate-800 rounded-lg shadow-2xl border-8 border-primary/20 p-12 flex flex-col items-center justify-center text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/5 rounded-full -ml-16 -mb-16" />
              
              <span className="material-symbols-outlined text-5xl text-primary mb-6">workspace_premium</span>
              <h2 className="text-2xl font-serif text-gray-900 dark:text-white mb-2">Diplomado en Rehabilitación Intervencionista</h2>
              <p className="text-sm text-gray-500 italic mb-8">Otorga la presente constancia a:</p>
              <h1 className="text-3xl font-bold text-primary mb-10">[NOMBRE DEL ALUMNO]</h1>
              <div className="w-24 h-0.5 bg-gray-200 mb-4" />
              <p className="text-xs text-gray-400">Dr. Raúl Morales • Director Académico</p>
           </div>
        </div>
      </div>
    </div>
  )
}
