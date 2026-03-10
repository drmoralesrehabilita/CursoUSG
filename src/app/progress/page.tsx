import { Header } from "@/components/dashboard/header"
import { getUserProfile, getUserEnrollment, getModules, getUserCompletedLessons, getRecentActivity } from "@/lib/data"

export default async function ProgressPage() {
  const profile = await getUserProfile()
  const displayName = profile?.full_name || "Estudiante"
  
  const enrollment = await getUserEnrollment()
  const modules = await getModules()
  const completedLessons = await getUserCompletedLessons()
  const recentActivity = await getRecentActivity(5)
  
  const progressPercent = enrollment?.progress || 0;

  // Calcular módulos realmente completados
  const completedModulesCount = modules.filter(mod => {
    const publishedLessons = mod.lessons?.filter(l => l.is_published) || [];
    return publishedLessons.length > 0 && publishedLessons.every(l => completedLessons.includes(l.id));
  }).length;
  
  return (
    <>
      <Header userName={displayName} />
      <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-background-light dark:bg-background-dark font-body">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary dark:text-white mb-2">
            Mi Progreso
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
            Revisa tu avance detallado en los diplomados y módulos.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Resumen General */}
            <div className="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 md:p-8">
              <h3 className="text-xl font-bold text-secondary dark:text-white mb-6">Resumen del Diplomado</h3>
              
              <div className="flex items-center gap-6 mb-8">
                <div className="relative w-32 h-32 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="currentColor" strokeWidth="8" className="text-gray-200 dark:text-gray-700" />
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="currentColor" strokeWidth="8" strokeDasharray={`${progressPercent * 2.51} 251.2`} className="text-primary transition-all duration-1000 ease-out" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold text-secondary dark:text-white">{progressPercent}%</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-lg text-secondary dark:text-white">Progreso Global</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Has completado el {progressPercent}% de los requisitos para tu certificado general.</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700/50">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Módulos</p>
                  <p className="text-2xl font-bold text-secondary dark:text-white">{completedModulesCount} <span className="text-sm text-gray-400 font-normal">/ {modules.length}</span></p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700/50">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Lecciones</p>
                  <p className="text-2xl font-bold text-secondary dark:text-white">{completedLessons.length} </p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700/50">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Horas de Estudio</p>
                  <p className="text-2xl font-bold text-secondary dark:text-white">{(completedLessons.length * 15 / 60).toFixed(1)}h</p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700/50">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Certificados</p>
                  <p className="text-2xl font-bold text-secondary dark:text-white">{completedModulesCount > 0 ? completedModulesCount : 0}</p>
                </div>
              </div>
            </div>

            {/* Progreso por Módulo */}
            <div className="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 md:p-8">
              <h3 className="text-xl font-bold text-secondary dark:text-white mb-6">Progreso por Módulo</h3>
              <div className="space-y-6">
                {modules.length > 0 ? modules.map((module) => {
                  const publishedLessons = module.lessons?.filter(l => l.is_published) || [];
                  const completedInModule = publishedLessons.filter(l => completedLessons.includes(l.id)).length;
                  const totalInModule = publishedLessons.length;
                  const modProgress = totalInModule > 0 ? Math.round((completedInModule / totalInModule) * 100) : 0;
                  const isModCompleted = totalInModule > 0 && completedInModule === totalInModule;
                  const isActive = enrollment?.module_id === module.id;

                  return (
                    <div key={module.id} className="group">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className={`font-medium ${isActive ? 'text-primary' : 'text-secondary dark:text-white'}`}>
                          {module.title}
                        </h4>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-400">{completedInModule}/{totalInModule}</span>
                          <span className="text-sm font-bold text-gray-600 dark:text-gray-300">{modProgress}%</span>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-500 ${isModCompleted ? 'bg-green-500' : isActive ? 'bg-primary shadow-[0_0_10px_rgba(0,180,216,0.4)]' : modProgress > 0 ? 'bg-primary/60' : 'bg-gray-400 dark:bg-gray-600'}`}
                          style={{ width: `${modProgress}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                }) : (
                  <p className="text-gray-500">No hay módulos disponibles en este momento.</p>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1 space-y-8">
            {/* Actividad Reciente */}
            <div className="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="font-bold text-secondary dark:text-white mb-6">Actividad Reciente</h3>
              {recentActivity.length > 0 ? (
                <div className="space-y-6 border-l-2 border-gray-100 dark:border-gray-800 ml-3">
                  {recentActivity.map((act) => {
                    const timeAgo = act.completed_at ? (() => {
                      const diff = Date.now() - new Date(act.completed_at).getTime();
                      const mins = Math.floor(diff / 60000);
                      if (mins < 60) return `Hace ${mins} min`;
                      const hrs = Math.floor(mins / 60);
                      if (hrs < 24) return `Hace ${hrs}h`;
                      const days = Math.floor(hrs / 24);
                      return `Hace ${days} días`;
                    })() : '';
                    return (
                      <div key={act.lesson_id} className="relative pl-6">
                        <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7.5px] top-1"></div>
                        <p className="text-sm font-bold text-secondary dark:text-white">{act.lesson_title}</p>
                        <p className="text-xs text-primary mt-1">
                          {act.score !== null ? `Calificación: ${act.score}%` : 'Completada'}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">{timeAgo}</p>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-6">
                  <span className="material-symbols-outlined text-3xl text-gray-300 mb-2 block">history</span>
                  <p className="text-sm text-gray-400">No hay actividad reciente</p>
                  <p className="text-xs text-gray-500 mt-1">Completa lecciones para ver tu historial</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
