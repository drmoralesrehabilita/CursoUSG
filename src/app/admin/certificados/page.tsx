"use client"

import { useState } from "react"
import { AdminHeader } from "@/components/admin/AdminHeader"

export default function CertificadosPage() {
  const [folioPrefix, setFolioPrefix] = useState("CERT-USG-")
  const [courseHours, setCourseHours] = useState("120")
  const [autoIssue, setAutoIssue] = useState(true)
  const [minProgress, setMinProgress] = useState("100")

  return (
    <div className="flex flex-col h-full">
      <AdminHeader title="Configuración de Certificados" subtitle="Personaliza las plantillas y reglas de emisión" />

      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Left: Settings */}
          <div className="space-y-5">
            {/* Data Variables */}
            <div className="bg-white dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/5 p-6">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-lg">tune</span>
                Datos del Certificado
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 block">Nombre del Curso</label>
                  <input
                    type="text"
                    defaultValue="Curso de Ecografía Neuromusculoesquelética"
                    className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-gray-900 dark:text-white outline-none focus:border-primary/40 transition-colors"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 block">Prefijo de Folio</label>
                    <input
                      type="text"
                      value={folioPrefix}
                      onChange={(e) => setFolioPrefix(e.target.value)}
                      className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-gray-900 dark:text-white outline-none focus:border-primary/40 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 block">Horas del Curso</label>
                    <input
                      type="text"
                      value={courseHours}
                      onChange={(e) => setCourseHours(e.target.value)}
                      className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-gray-900 dark:text-white outline-none focus:border-primary/40 transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 block">Texto Institucional</label>
                  <textarea
                    rows={3}
                    defaultValue="Se otorga el presente certificado por haber completado satisfactoriamente el Curso de Ecografía Neuromusculoesquelética impartido por el Dr. Raúl Morales."
                    className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-gray-900 dark:text-white outline-none focus:border-primary/40 transition-colors resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Digital Signatures */}
            <div className="bg-white dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/5 p-6">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-lg">draw</span>
                Firmas Digitales
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {/* Signature 1 */}
                <div className="border-2 border-dashed border-gray-200 dark:border-white/10 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:border-primary/40 cursor-pointer transition-colors group">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-2 group-hover:bg-primary/20 transition-colors">
                    <span className="material-symbols-outlined text-primary text-2xl">person</span>
                  </div>
                  <p className="text-xs font-semibold text-gray-900 dark:text-white">Dr. Raúl Morales</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">Director del Curso</p>
                  <p className="text-[10px] text-primary mt-2">Subir firma</p>
                </div>
                {/* Signature 2 */}
                <div className="border-2 border-dashed border-gray-200 dark:border-white/10 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:border-primary/40 cursor-pointer transition-colors group">
                  <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-white/5 flex items-center justify-center mb-2 group-hover:bg-primary/10 transition-colors">
                    <span className="material-symbols-outlined text-gray-400 group-hover:text-primary text-2xl transition-colors">add</span>
                  </div>
                  <p className="text-xs font-semibold text-gray-600 dark:text-gray-300">Agregar Firmante</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">Cargo / Institución</p>
                </div>
              </div>
            </div>

            {/* Automation Rules */}
            <div className="bg-white dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/5 p-6">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-lg">bolt</span>
                Reglas de Emisión Automática
              </h3>
              <div className="space-y-4">
                {/* Auto Issue Toggle */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Emisión Automática</p>
                    <p className="text-xs text-gray-400">Emitir certificado al completar el curso</p>
                  </div>
                  <button
                    onClick={() => setAutoIssue(!autoIssue)}
                    className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${autoIssue ? "bg-primary" : "bg-gray-300 dark:bg-white/10"}`}
                  >
                    <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 ${autoIssue ? "left-6" : "left-0.5"}`} />
                  </button>
                </div>

                {/* Min progress */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Progreso Mínimo</p>
                    <p className="text-xs text-gray-400">% requerido para emitir</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={minProgress}
                      onChange={(e) => setMinProgress(e.target.value)}
                      className="w-16 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-3 py-1.5 text-sm text-center text-gray-900 dark:text-white outline-none"
                    />
                    <span className="text-xs text-gray-400">%</span>
                  </div>
                </div>

                {/* Require Eval */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Aprobar Evaluaciones</p>
                    <p className="text-xs text-gray-400">Todas las evaluaciones deben estar aprobadas</p>
                  </div>
                  <button className="relative w-12 h-6 rounded-full bg-primary transition-colors duration-200">
                    <span className="absolute top-0.5 left-6 w-5 h-5 bg-white rounded-full shadow-sm" />
                  </button>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-gray-100 dark:border-white/5 flex justify-end">
                <button className="px-6 py-2.5 bg-primary text-white rounded-xl text-xs font-semibold hover:bg-primary/90 transition-colors flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-base">save</span>
                  Guardar Configuración
                </button>
              </div>
            </div>
          </div>

          {/* Right: Live Preview */}
          <div className="bg-white dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/5 p-6 space-y-4 h-fit sticky top-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-lg">preview</span>
                Vista Previa
              </h3>
              <button className="text-xs text-primary hover:text-primary/80 font-semibold transition-colors">
                Pantalla completa
              </button>
            </div>

            {/* Certificate Preview */}
            <div className="bg-gradient-to-br from-amber-50/80 to-orange-50/50 dark:from-amber-900/10 dark:to-orange-900/5 rounded-xl border-2 border-amber-200/50 dark:border-amber-700/20 p-8 relative overflow-hidden">
              {/* Gold ornamental corners */}
              <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-amber-400/40 rounded-tl-lg" />
              <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-amber-400/40 rounded-tr-lg" />
              <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-amber-400/40 rounded-bl-lg" />
              <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-amber-400/40 rounded-br-lg" />

              {/* Header */}
              <div className="text-center mb-6">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="material-symbols-outlined text-primary text-2xl">sensors</span>
                  <div>
                    <p className="text-primary font-bold text-sm">Dr. Raúl</p>
                    <p className="text-gray-800 dark:text-gray-200 font-bold text-base -mt-0.5">Morales</p>
                  </div>
                </div>
                <p className="text-[8px] text-gray-500 uppercase tracking-[0.2em]">Ecografía Neuromusculoesquelética</p>
              </div>

              {/* Title */}
              <div className="text-center mb-5">
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 tracking-wide">CERTIFICADO</h2>
                <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mt-2" />
              </div>

              {/* Body */}
              <div className="text-center space-y-3 mb-6">
                <p className="text-[10px] text-gray-500 uppercase tracking-wider">Se otorga a</p>
                <p className="text-lg font-bold text-gray-800 dark:text-gray-200 border-b border-gray-300 dark:border-gray-600 pb-1 inline-block px-8">
                  [Nombre del Médico]
                </p>
                <p className="text-[10px] text-gray-600 dark:text-gray-400 leading-relaxed max-w-xs mx-auto">
                  Por haber completado satisfactoriamente el Curso de Ecografía Neuromusculoesquelética ({courseHours} horas)
                </p>
              </div>

              {/* Footer */}
              <div className="flex justify-between items-end mt-8">
                <div className="text-center">
                  <div className="w-24 border-b border-gray-400 dark:border-gray-500 mb-1" />
                  <p className="text-[9px] text-gray-600 dark:text-gray-400 font-medium">Dr. Raúl Morales</p>
                  <p className="text-[8px] text-gray-400">Director del Curso</p>
                </div>
                <div className="text-center">
                  <p className="text-[8px] text-gray-400 mb-1">Folio: {folioPrefix}0001</p>
                  <p className="text-[8px] text-gray-400">Fecha: 19 Feb 2026</p>
                </div>
              </div>
            </div>

            <p className="text-[10px] text-gray-400 text-center">
              Los cambios en los datos se reflejan en tiempo real en la vista previa
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
