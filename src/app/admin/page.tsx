import { AdminHeader } from "@/components/admin/AdminHeader"

const kpiCards = [
  { label: "Ingresos del Mes", value: "$45,280", change: "+12.5%", positive: true, icon: "payments" },
  { label: "Médicos Inscritos", value: "1,247", change: "+8.3%", positive: true, icon: "groups" },
  { label: "Tasa de Finalización", value: "78%", change: "+5.2%", positive: true, icon: "trending_up" },
  { label: "NPS Score", value: "4.8", change: "+0.3", positive: true, icon: "star" },
]

const recentDoctors = [
  { name: "Dra. María García", specialty: "Traumatología", city: "CDMX", progress: 75, status: "active" },
  { name: "Dr. Carlos López", specialty: "Rehabilitación", city: "Monterrey", progress: 45, status: "active" },
  { name: "Dra. Ana Martínez", specialty: "Medicina del Deporte", city: "Guadalajara", progress: 92, status: "completed" },
  { name: "Dr. Roberto Sánchez", specialty: "Neurología", city: "Puebla", progress: 30, status: "active" },
  { name: "Dra. Laura Torres", specialty: "Fisiatría", city: "Mérida", progress: 10, status: "pending" },
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

export default function AdminDashboardPage() {
  return (
    <div className="flex flex-col h-full">
      <AdminHeader title="Panel Ejecutivo" subtitle="Vista general del rendimiento" />

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {kpiCards.map((card) => (
            <div
              key={card.label}
              className="bg-white dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/5 p-5 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <span className="material-symbols-outlined text-primary text-xl">{card.icon}</span>
                </div>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                  card.positive
                    ? "text-emerald-400 bg-emerald-500/10"
                    : "text-red-400 bg-red-500/10"
                }`}>
                  {card.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{card.value}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{card.label}</p>
            </div>
          ))}
        </div>

        {/* Alert Banner */}
        <div className="bg-gradient-to-r from-amber-500/10 to-amber-500/5 border border-amber-500/20 rounded-xl px-5 py-4 flex items-center gap-3">
          <span className="material-symbols-outlined text-amber-400 text-xl">warning</span>
          <p className="text-sm text-amber-300 font-medium flex-1">
            Hay <strong>5 facturas pendientes</strong> de revisión este mes.
          </p>
          <button className="text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors">
            Ver detalles →
          </button>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sales Chart */}
          <div className="lg:col-span-2 bg-white dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/5 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white">Ventas Mensuales</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">Últimos 6 meses</p>
              </div>
              <select className="bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg text-xs px-3 py-1.5 text-gray-700 dark:text-gray-300 outline-none">
                <option>6 meses</option>
                <option>12 meses</option>
                <option>Este año</option>
              </select>
            </div>
            {/* SVG Chart */}
            <div className="h-48 flex items-end gap-3 px-2">
              {[35, 45, 40, 60, 55, 70].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                  <span className="text-[10px] text-gray-400 font-medium">
                    ${(h * 650).toLocaleString()}
                  </span>
                  <div
                    className="w-full rounded-t-lg bg-gradient-to-t from-primary/80 to-primary transition-all duration-500 hover:from-primary hover:to-cyan-400"
                    style={{ height: `${h * 2.5}px` }}
                  />
                  <span className="text-[10px] text-gray-500">
                    {["Sep", "Oct", "Nov", "Dic", "Ene", "Feb"][i]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Specialty Distribution */}
          <div className="bg-white dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/5 p-6">
            <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1">Distribución por Especialidad</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">Top especialidades</p>

            {/* Simple donut representation */}
            <div className="flex justify-center mb-6">
              <div className="relative w-32 h-32">
                <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                  <circle cx="18" cy="18" r="14" fill="none" stroke="currentColor" strokeWidth="3.5" className="text-gray-100 dark:text-white/5" />
                  <circle cx="18" cy="18" r="14" fill="none" stroke="#00B4D8" strokeWidth="3.5" strokeDasharray="35 65" strokeDashoffset="0" />
                  <circle cx="18" cy="18" r="14" fill="none" stroke="#3b82f6" strokeWidth="3.5" strokeDasharray="25 75" strokeDashoffset="-35" />
                  <circle cx="18" cy="18" r="14" fill="none" stroke="#8b5cf6" strokeWidth="3.5" strokeDasharray="20 80" strokeDashoffset="-60" />
                  <circle cx="18" cy="18" r="14" fill="none" stroke="#f59e0b" strokeWidth="3.5" strokeDasharray="20 80" strokeDashoffset="-80" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-xl font-bold text-gray-900 dark:text-white">1,247</span>
                  <span className="text-[10px] text-gray-400">Total</span>
                </div>
              </div>
            </div>

            <div className="space-y-2.5">
              {[
                { label: "Traumatología", pct: "35%", color: "bg-primary" },
                { label: "Rehabilitación", pct: "25%", color: "bg-blue-500" },
                { label: "Med. Deporte", pct: "20%", color: "bg-violet-500" },
                { label: "Otros", pct: "20%", color: "bg-amber-500" },
              ].map((s) => (
                <div key={s.label} className="flex items-center gap-2.5 text-xs">
                  <span className={`w-2.5 h-2.5 rounded-full ${s.color}`} />
                  <span className="text-gray-600 dark:text-gray-300 flex-1">{s.label}</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{s.pct}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Doctors Table */}
        <div className="bg-white dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/5 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 dark:border-white/5 flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white">Médicos Recientes</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">Últimas inscripciones</p>
            </div>
            <button className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors">
              Ver todos →
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 dark:border-white/5">
                  <th className="text-left text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-6 py-3">Médico</th>
                  <th className="text-left text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-6 py-3">Especialidad</th>
                  <th className="text-left text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-6 py-3">Ciudad</th>
                  <th className="text-left text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-6 py-3">Progreso</th>
                  <th className="text-left text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-6 py-3">Estado</th>
                </tr>
              </thead>
              <tbody>
                {recentDoctors.map((doc) => (
                  <tr key={doc.name} className="border-b border-gray-50 dark:border-white/[0.03] hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-[11px] font-bold text-primary">
                            {doc.name.split(" ").filter(w => w.length > 2).slice(0,2).map(w => w[0]).join("")}
                          </span>
                        </div>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{doc.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-3.5 text-sm text-gray-600 dark:text-gray-300">{doc.specialty}</td>
                    <td className="px-6 py-3.5 text-sm text-gray-600 dark:text-gray-300">{doc.city}</td>
                    <td className="px-6 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="flex-1 h-1.5 bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden max-w-[100px]">
                          <div
                            className="h-full bg-primary rounded-full transition-all"
                            style={{ width: `${doc.progress}%` }}
                          />
                        </div>
                        <span className="text-xs font-medium text-gray-500 dark:text-gray-400 w-8">{doc.progress}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-3.5">
                      <StatusBadge status={doc.status} />
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
