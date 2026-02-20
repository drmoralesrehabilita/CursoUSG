"use client"

import { AdminHeader } from "@/components/admin/AdminHeader"

const alumnos = [
  { id: 1, name: "Dr. Roberto Jiménez", email: "roberto.j@med.com", specialty: "Traumatología", progress: 85, status: "Activo" },
  { id: 2, name: "Dra. Elena Martínez", email: "elena.mtz@clinic.mx", specialty: "Rehabilitación", progress: 42, status: "En Pausa" },
  { id: 3, name: "Dr. Carlos Ruiz", email: "c.ruiz@hospitalsf.com", specialty: "Anestesiología", progress: 100, status: "Certificado" },
  { id: 4, name: "Dra. Sofía Blanco", email: "s.blanco@rehab.org", specialty: "Deportología", progress: 12, status: "Activo" },
]

export default function AlumnosPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <AdminHeader title="Gestión de Alumnos" subtitle="Administra y monitorea el progreso de los doctores" />
      
      <div className="p-6">
        <div className="bg-white dark:bg-[#0f1926] rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 dark:border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
             <div className="flex items-center gap-4">
                <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2">
                   <span className="material-symbols-outlined text-sm">person_add</span>
                   Nuevo Alumno
                </button>
                <div className="bg-gray-100 dark:bg-white/5 px-4 py-2 rounded-lg text-sm font-medium text-gray-500 dark:text-gray-400 border dark:border-white/5">
                   Total: 1,248
                </div>
             </div>
             <div className="flex items-center gap-2">
                <input type="text" placeholder="Buscar alumno..." className="bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 rounded-lg px-4 py-2 text-sm outline-none focus:border-primary/50 w-64" />
             </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-white/5">
                  <th className="px-6 py-4 font-bold">Alumno</th>
                  <th className="px-6 py-4 font-bold">Especialidad</th>
                  <th className="px-6 py-4 font-bold">Progreso</th>
                  <th className="px-6 py-4 font-bold">Estatus</th>
                  <th className="px-6 py-4 font-bold text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                {alumnos.map((u) => (
                  <tr key={u.id} className="text-sm hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-bold text-gray-900 dark:text-white">{u.name}</p>
                        <p className="text-xs text-gray-500">{u.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{u.specialty}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-24 h-2 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full" style={{ width: `${u.progress}%` }} />
                        </div>
                        <span className="text-xs font-bold text-gray-500">{u.progress}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase ${
                        u.status === 'Certificado' ? 'bg-emerald-500/10 text-emerald-500' : 
                        u.status === 'Activo' ? 'bg-blue-500/10 text-blue-500' : 'bg-amber-500/10 text-amber-500'
                      }`}>
                        {u.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 text-gray-400 hover:text-primary transition-colors">
                        <span className="material-symbols-outlined text-lg">edit</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
