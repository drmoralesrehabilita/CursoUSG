import { AdminHeader } from "@/components/admin/AdminHeader"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export default function AdminPage() {
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <AdminHeader title="Dashboard de Administración" subtitle="Vista general de métricas y rendimiento del curso" />
      
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
        {/* KPI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard title="Total Alumnos" value="156" trend="+12" icon="group" />
          <KPICard title="Ingresos Mes" value="$12,450" trend="+8.5%" icon="payments" color="emerald" />
          <KPICard title="Completitud Media" value="42%" trend="+5%" icon="analytics" color="amber" />
          <KPICard title="Certificados Emitidos" value="28" trend="+3" icon="workspace_premium" color="indigo" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Chart Area */}
          <Card className="lg:col-span-2 shadow-sm border-white/5 bg-surface-light dark:bg-white/5">
            <CardHeader>
              <CardTitle>Actividad Reciente</CardTitle>
              <CardDescription>Visualización de interacciones de alumnos en los últimos 7 días</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center border-t border-white/5">
              <p className="text-gray-500 text-sm">Espacio para gráfico de actividad</p>
            </CardContent>
          </Card>

          {/* User Status Feed */}
          <Card className="shadow-sm border-white/5 bg-surface-light dark:bg-white/5">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base">Médicos Recientes</CardTitle>
                <CardDescription>Últimas inscripciones</CardDescription>
              </div>
              <button className="text-primary text-xs font-bold hover:underline">Ver todos</button>
            </CardHeader>
            <CardContent className="space-y-4">
              <UserActivityItem name="Dr. Alejandro Ruiz" time="Hace 15 min" role="Inscrito" />
              <UserActivityItem name="Dra. Elena Silva" time="Hace 2 horas" role="Completado Mod 2" />
              <UserActivityItem name="Dr. Roberto Méndez" time="Hace 5 horas" role="Inscrito" />
              <UserActivityItem name="Dra. Monica G." time="Ayer" role="Certificado" />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

function KPICard({ title, value, trend, icon, color = "primary" }: any) {
  const colorMap: any = {
    primary: "text-primary bg-primary/10",
    emerald: "text-emerald-500 bg-emerald-500/10",
    amber: "text-amber-500 bg-amber-500/10",
    indigo: "text-indigo-500 bg-indigo-500/10"
  }

  return (
    <Card className="border-white/5 bg-surface-light dark:bg-white/5">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div className={colorMap[color] + " p-2 rounded-lg"}>
            <span className="material-symbols-outlined">{icon}</span>
          </div>
          <span className="text-emerald-500 text-xs font-bold bg-emerald-500/10 px-2 py-1 rounded-full">{trend}</span>
        </div>
        <div className="mt-4">
            <h3 className="text-gray-500 dark:text-gray-400 text-xs font-bold tracking-widest uppercase">{title}</h3>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{value}</p>
        </div>
      </CardContent>
    </Card>
  )
}

function UserActivityItem({ name, time, role }: any) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-white/10 flex items-center justify-center">
        <span className="material-symbols-outlined text-sm text-gray-500">person</span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-900 dark:text-gray-200 truncate">{name}</p>
        <p className="text-[10px] text-gray-500">{time}</p>
      </div>
      <span className="text-[10px] font-bold text-primary">{role}</span>
    </div>
  )
}
