"use client"

import { AdminHeader } from "@/components/admin/AdminHeader"

const stats = [
  { label: "Alumnos Activos", value: "1,248", change: "+12%", icon: "group" },
  { label: "Ventas Mensuales", value: "$42,500", change: "+8.4%", icon: "payments" },
  { label: "Horas de Contenido", value: "164h", change: "+24h", icon: "schedule" },
  { label: "Tasa de Finalización", value: "78%", change: "+5.2%", icon: "verified" },
]

export default function AdminPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <AdminHeader title="Dashboard Ejecutivo" subtitle="Resumen general de la plataforma" />
      
      <div className="p-6 space-y-6">
        {/* KPI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white dark:bg-[#0f1926] p-6 rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-2xl">{stat.icon}</span>
                </div>
                <span className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-lg">
                  {stat.change}
                </span>
              </div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.label}</h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Charts Section placeholder */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-[#0f1926] p-6 rounded-2xl border border-gray-100 dark:border-white/5 h-80 flex flex-col items-center justify-center text-gray-400">
             <span className="material-symbols-outlined text-4xl mb-2 text-primary/40">monitoring</span>
             <p className="text-sm">Gráfica de Ventas Mensuales</p>
          </div>
          <div className="bg-white dark:bg-[#0f1926] p-6 rounded-2xl border border-gray-100 dark:border-white/5 h-80 flex flex-col items-center justify-center text-gray-400">
             <span className="material-symbols-outlined text-4xl mb-2 text-primary/40">pie_chart</span>
             <p className="text-sm">Distribución por Especialidad</p>
          </div>
        </div>
      </div>
    </div>
  )
}
