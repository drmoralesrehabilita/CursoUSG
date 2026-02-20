"use client"

import { useState } from "react"
import { AdminHeader } from "@/components/admin/AdminHeader"

const statsCards = [
  { label: "Total Inscritos", value: "1,247", icon: "groups", color: "from-primary/20 to-cyan-500/10", iconColor: "text-primary" },
  { label: "Certificados", value: "342", icon: "workspace_premium", color: "from-emerald-500/20 to-emerald-500/10", iconColor: "text-emerald-400" },
  { label: "En Progreso", value: "756", icon: "trending_up", color: "from-blue-500/20 to-blue-500/10", iconColor: "text-blue-400" },
<<<<<<< HEAD
  { label: "Pendientes", value: "149", icon: "hourglass_top", color: "from-amber-500/20 to-amber-500/10", iconColor: "text-amber-400" },
]

const students = [
  { id: 1, name: "Dra. María García López", email: "maria.garcia@hospital.mx", specialty: "Traumatología", city: "CDMX", progress: 75, status: "active", enrollDate: "15 Ene 2025", lastAccess: "Hace 2 horas" },
  { id: 2, name: "Dr. Carlos López Hernández", email: "carlos.lopez@clinica.mx", specialty: "Rehabilitación", city: "Monterrey", progress: 45, status: "active", enrollDate: "20 Ene 2025", lastAccess: "Hace 1 día" },
  { id: 3, name: "Dra. Ana Martínez Ruiz", email: "ana.martinez@med.mx", specialty: "Medicina del Deporte", city: "Guadalajara", progress: 92, status: "completed", enrollDate: "10 Dic 2024", lastAccess: "Hace 3 horas" },
  { id: 4, name: "Dr. Roberto Sánchez Díaz", email: "roberto.sanchez@salud.mx", specialty: "Neurología", city: "Puebla", progress: 30, status: "active", enrollDate: "01 Feb 2025", lastAccess: "Hace 5 horas" },
  { id: 5, name: "Dra. Laura Torres Vega", email: "laura.torres@hospital.mx", specialty: "Fisiatría", city: "Mérida", progress: 10, status: "pending", enrollDate: "10 Feb 2025", lastAccess: "Nunca" },
  { id: 6, name: "Dr. Miguel Ángel Castro", email: "miguel.castro@clinica.mx", specialty: "Ortopedia", city: "Querétaro", progress: 60, status: "active", enrollDate: "05 Ene 2025", lastAccess: "Hace 12 horas" },
]

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    active: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
    completed: "bg-blue-500/15 text-blue-400 border-blue-500/20",
    pending: "bg-amber-500/15 text-amber-400 border-amber-500/20",
  }
  const labels: Record<string, string> = {
    active: "Activo",
    completed: "Completado",
    pending: "Pendiente",
  }
  return (
    <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border ${styles[status]}`}>
      {labels[status]}
    </span>
  )
}

export default function AlumnosPage() {
  const [selectedStudent, setSelectedStudent] = useState<typeof students[0] | null>(null)

  return (
    <div className="flex flex-col h-full">
      <AdminHeader title="Gestión de Alumnos" subtitle="Administra y monitorea a los médicos inscritos" />

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {statsCards.map((card) => (
            <div
              key={card.label}
              className="bg-white dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/5 p-5 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center`}>
                  <span className={`material-symbols-outlined text-xl ${card.iconColor}`}>{card.icon}</span>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{card.value}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{card.label}</p>
                </div>
=======
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
>>>>>>> origin/main
              </div>
            </div>
          ))}
        </div>

<<<<<<< HEAD
        {/* Filters */}
        <div className="bg-white dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/5 p-4 flex flex-wrap items-center gap-3">
          <div className="flex items-center bg-gray-100 dark:bg-white/5 rounded-lg px-3 py-2 border border-transparent focus-within:border-primary/30 transition-colors flex-1 min-w-[200px]">
            <span className="material-symbols-outlined text-gray-400 text-lg mr-2">search</span>
            <input
              type="text"
              placeholder="Buscar por nombre, email o especialidad..."
              className="bg-transparent text-sm text-gray-700 dark:text-gray-300 placeholder-gray-400 outline-none w-full"
            />
          </div>
          <select className="bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg text-xs px-3 py-2.5 text-gray-700 dark:text-gray-300 outline-none">
            <option>Todas las especialidades</option>
            <option>Traumatología</option>
            <option>Rehabilitación</option>
            <option>Medicina del Deporte</option>
            <option>Neurología</option>
          </select>
          <select className="bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg text-xs px-3 py-2.5 text-gray-700 dark:text-gray-300 outline-none">
            <option>Todas las ciudades</option>
            <option>CDMX</option>
            <option>Monterrey</option>
            <option>Guadalajara</option>
          </select>
          <select className="bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg text-xs px-3 py-2.5 text-gray-700 dark:text-gray-300 outline-none">
            <option>Todos los estados</option>
            <option>Activo</option>
            <option>Completado</option>
            <option>Pendiente</option>
          </select>
        </div>

        <div className="flex gap-6">
          {/* Table */}
          <div className={`bg-white dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/5 overflow-hidden transition-all duration-300 ${selectedStudent ? "flex-1" : "w-full"}`}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100 dark:border-white/5">
                    <th className="text-left text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-5 py-3">Médico</th>
                    <th className="text-left text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-5 py-3">Especialidad</th>
                    <th className="text-left text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-5 py-3 hidden lg:table-cell">Ciudad</th>
                    <th className="text-left text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-5 py-3">Progreso</th>
                    <th className="text-left text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-5 py-3">Estado</th>
                    <th className="text-left text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-5 py-3 w-10"></th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((s) => (
                    <tr
                      key={s.id}
                      onClick={() => setSelectedStudent(s)}
                      className={`border-b border-gray-50 dark:border-white/[0.03] hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors cursor-pointer ${
                        selectedStudent?.id === s.id ? "bg-primary/5 dark:bg-primary/5" : ""
                      }`}
                    >
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                            <span className="text-[11px] font-bold text-primary">
                              {s.name.split(" ").filter(w => w.length > 2).slice(0,2).map(w => w[0]).join("")}
                            </span>
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{s.name}</p>
                            <p className="text-[11px] text-gray-400 truncate">{s.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-sm text-gray-600 dark:text-gray-300">{s.specialty}</td>
                      <td className="px-5 py-3.5 text-sm text-gray-600 dark:text-gray-300 hidden lg:table-cell">{s.city}</td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2.5">
                          <div className="flex-1 h-1.5 bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden max-w-[90px]">
                            <div className="h-full bg-primary rounded-full" style={{ width: `${s.progress}%` }} />
                          </div>
                          <span className="text-xs font-medium text-gray-500 dark:text-gray-400 w-8">{s.progress}%</span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5"><StatusBadge status={s.status} /></td>
                      <td className="px-5 py-3.5">
                        <span className="material-symbols-outlined text-gray-400 text-lg">chevron_right</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Detail Panel */}
          {selectedStudent && (
            <div className="w-80 shrink-0 bg-white dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/5 p-5 space-y-5 hidden xl:block">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white">Detalle del Alumno</h3>
                <button onClick={() => setSelectedStudent(null)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                  <span className="material-symbols-outlined text-lg">close</span>
                </button>
              </div>

              {/* Avatar */}
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-cyan-400 flex items-center justify-center mb-3 shadow-lg shadow-primary/20">
                  <span className="text-xl font-bold text-white">
                    {selectedStudent.name.split(" ").filter(w => w.length > 2).slice(0,2).map(w => w[0]).join("")}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-gray-900 dark:text-white">{selectedStudent.name}</h4>
                <p className="text-xs text-gray-400">{selectedStudent.email}</p>
              </div>

              {/* Details */}
              <div className="space-y-3">
                {[
                  { label: "Especialidad", value: selectedStudent.specialty },
                  { label: "Ciudad", value: selectedStudent.city },
                  { label: "Fecha de Inscripción", value: selectedStudent.enrollDate },
                  { label: "Último Acceso", value: selectedStudent.lastAccess },
                ].map(item => (
                  <div key={item.label} className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">{item.label}</span>
                    <span className="font-medium text-gray-900 dark:text-white">{item.value}</span>
                  </div>
                ))}
              </div>

              {/* Progress */}
              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-500 dark:text-gray-400">Progreso General</span>
                  <span className="font-bold text-primary">{selectedStudent.progress}%</span>
                </div>
                <div className="h-2 bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-primary to-cyan-400 rounded-full transition-all" style={{ width: `${selectedStudent.progress}%` }} />
                </div>
              </div>

              {/* Actions */}
              <div className="pt-2 space-y-2">
                <button className="w-full py-2.5 bg-primary/10 text-primary hover:bg-primary/20 rounded-xl text-xs font-semibold transition-colors">
                  Enviar Mensaje
                </button>
                <button className="w-full py-2.5 bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10 rounded-xl text-xs font-semibold transition-colors">
                  Ver Historial Completo
                </button>
              </div>
            </div>
          )}
=======
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
>>>>>>> origin/main
        </div>
      </div>
    </div>
  )
}
