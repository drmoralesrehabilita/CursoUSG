"use client"

import { useState } from "react"
import { AdminHeader } from "@/components/admin/AdminHeader"

const statsCards = [
  { label: "Total Inscritos", value: "1,247", icon: "groups", color: "from-primary/20 to-cyan-500/10", iconColor: "text-primary" },
  { label: "Certificados", value: "342", icon: "workspace_premium", color: "from-emerald-500/20 to-emerald-500/10", iconColor: "text-emerald-400" },
  { label: "En Progreso", value: "756", icon: "trending_up", color: "from-blue-500/20 to-blue-500/10", iconColor: "text-blue-400" },
]

export default function AlumnosPage() {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className="flex flex-col h-full">
      <AdminHeader title="Gestión de Alumnos" subtitle="Administra el acceso y progreso de tus estudiantes" />

      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {statsCards.map((card, idx) => (
            <div key={idx} className="bg-white dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/5 p-6 relative overflow-hidden group hover:shadow-lg transition-all">
              <div className={`absolute -right-4 -top-4 w-24 h-24 bg-gradient-to-br ${card.color} rounded-full blur-2xl opacity-50 group-hover:scale-125 transition-transform duration-500`}></div>
              <div className="relative z-10">
                <div className={`w-12 h-12 rounded-xl bg-gray-50 dark:bg-white/5 flex items-center justify-center mb-4 ${card.iconColor}`}>
                  <span className="material-symbols-outlined text-2xl">{card.icon}</span>
                </div>
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">{card.label}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{card.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Content Section */}
        <div className="bg-white dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/5 overflow-hidden">
          {/* List Header */}
          <div className="p-6 border-b border-gray-100 dark:border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">list</span>
              Lista de Alumnos
            </h3>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">search</span>
              <input
                type="text"
                placeholder="Buscar alumno..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-xs text-gray-900 dark:text-white outline-none focus:border-primary/40 transition-colors w-full md:w-64"
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 dark:bg-white/10 border-b border-gray-100 dark:border-white/5">
                <tr>
                  <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Alumno</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Módulos</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Progreso</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Registro</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                {[
                  { name: "Dr. Roberto Jiménez", email: "roberto@medico.mx", progress: 85, modules: "6/8", date: "15 Ene 2024", img: "https://i.pravatar.cc/150?u=rob" },
                  { name: "Dra. Elena Vargas", email: "elena.v@salud.mx", progress: 42, modules: "3/8", date: "18 Ene 2024", img: "https://i.pravatar.cc/150?u=ele" },
                  { name: "Dr. Carlos Ruiz", email: "carlos.ruiz@hgm.mx", progress: 100, modules: "8/8", date: "10 Ene 2024", img: "https://i.pravatar.cc/150?u=car" },
                  { name: "Dra. Sofía Méndez", email: "sofia.m@clinic.mx", progress: 12, modules: "1/8", date: "22 Ene 2024", img: "https://i.pravatar.cc/150?u=sof" },
                ].map((row, i) => (
                  <tr key={i} className="group hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={row.img} alt={row.name} className="w-8 h-8 rounded-full border border-gray-200 dark:border-white/10" />
                        <div>
                          <p className="text-xs font-bold text-gray-900 dark:text-white capitalize">{row.name}</p>
                          <p className="text-[10px] text-gray-400">{row.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-600 dark:text-gray-300 font-medium">
                      {row.modules}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-24 h-1.5 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${row.progress === 100 ? 'bg-emerald-500' : 'bg-primary'}`} style={{ width: `${row.progress}%` }}></div>
                        </div>
                        <span className="text-[10px] font-bold text-gray-500">{row.progress}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[10px] text-gray-400">
                      {row.date}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-primary hover:bg-primary/10 transition-colors">
                          <span className="material-symbols-outlined text-sm">visibility</span>
                        </button>
                        <button className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-emerald-500 hover:bg-emerald-500/10 transition-colors">
                          <span className="material-symbols-outlined text-sm">edit</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer Pagination */}
          <div className="p-4 border-t border-gray-100 dark:border-white/5 flex items-center justify-between">
            <p className="text-[10px] text-gray-400">Mostrando 4 de 1,247 alumnos</p>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-white/10 text-[10px] text-gray-500 hover:bg-gray-100 transition-colors">Anterior</button>
              <div className="h-2 w-2 rounded-full bg-primary"></div>
              <div className="h-2 w-2 rounded-full bg-gray-200 dark:bg-white/10"></div>
              <div className="h-2 w-2 rounded-full bg-gray-200 dark:bg-white/10"></div>
              <button className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-white/10 text-[10px] text-gray-500 hover:bg-gray-100 transition-colors">Siguiente</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
