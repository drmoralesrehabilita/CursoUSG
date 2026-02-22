import { Header } from "@/components/dashboard/header"
import { getUserProfile, getUserEnrollment, getModules, getLiveSessions, getUserCertificates } from "@/lib/data"
import Link from "next/link"
import { CertificateGenerator } from "@/components/student/CertificateGenerator"

export default async function DashboardPage() {
  const profile = await getUserProfile()
  const displayName = profile?.full_name || "Estudiante"
  
  const enrollment = await getUserEnrollment()
  const modules = await getModules()
  const liveSessions = await getLiveSessions()
  const certificates = await getUserCertificates()
  
  const activeModule = modules.find(m => m.id === enrollment?.module_id) || modules[0];
  const progressPercent = enrollment?.progress || 0;
  
  // Encontrar la primera lección del módulo para el botón de continuar
  const firstLesson = activeModule?.lessons?.[0];
  const firstLessonId = firstLesson?.id;

  // Extraer el material PDF si existe en la lección
  let pdfActivityUrl = "";
  if (firstLesson?.materials && Array.isArray(firstLesson.materials) && firstLesson.materials.length > 0) {
    const materials = firstLesson.materials as unknown as { title?: string, url?: string }[];
    const pdfMaterial = materials.find(m => m.url);
    if (pdfMaterial && pdfMaterial.url) {
      pdfActivityUrl = pdfMaterial.url;
    }
  }

  return (
    <>
      <Header userName={displayName} />
      <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-background-light dark:bg-background-dark font-body">
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-secondary dark:text-white mb-2">
              Bienvenido de nuevo, <span className="text-primary">{displayName}</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
              Continúa tu especialización en ecografía intervencionista. Tienes 2 módulos pendientes esta semana.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="text-right">
              <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Tiempo de estudio</p>
              <p className="text-xl font-bold text-secondary dark:text-white">12h 30m</p>
            </div>
            <div className="h-10 w-[1px] bg-gray-300 dark:bg-gray-700 mx-2"></div>
            <div className="text-right">
              <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Cursos Completados</p>
              <p className="text-xl font-bold text-secondary dark:text-white">{progressPercent === 100 ? 1 : 0}/{modules.length || 8}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Active Course Card */}
            <div className="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden relative group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="p-6 md:p-8 relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <span className="px-3 py-1 text-xs font-semibold text-primary bg-primary/10 rounded-full border border-primary/20">
                    EN PROGRESO
                  </span>
                  <span className="text-gray-400 text-sm">Actualizado hace 2h</span>
                </div>
                <h3 className="text-2xl font-bold text-secondary dark:text-white mb-2">
                  {activeModule ? activeModule.title : "Módulo 2: Miembro Superior (Hombro)"}
                </h3>
                <div 
                  className="text-gray-600 dark:text-gray-300 mb-6 max-w-lg [&>p]:mb-2"
                  dangerouslySetInnerHTML={{ 
                    __html: activeModule?.description || "Identificación de estructuras tendinosas del manguito rotador y técnicas de infiltración subacromial guiada por ultrasonido." 
                  }}
                />
                <div className="mb-8">
                  <div className="flex justify-between text-sm mb-2 font-medium">
                    <span className="text-secondary dark:text-gray-300">Progreso del módulo</span>
                    <span className="text-primary">{progressPercent}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <div
                      className="bg-primary h-3 rounded-full shadow-lg shadow-primary/30 transition-all duration-500"
                      style={{ width: `${progressPercent}%` }}
                    ></div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  {firstLessonId ? (
                    <Link href={`/lessons/${firstLessonId}`} className="flex-1 bg-primary hover:bg-cyan-500 text-white font-semibold py-3 px-6 rounded-xl shadow-lg shadow-primary/25 transition-transform active:scale-95 flex items-center justify-center gap-2">
                      <span className="material-symbols-outlined">play_circle</span>
                      Continuar Lección
                    </Link>
                  ) : (
                    <button className="flex-1 bg-primary/50 text-white font-semibold py-3 px-6 rounded-xl cursor-not-allowed flex items-center justify-center gap-2">
                      <span className="material-symbols-outlined">play_circle</span>
                      Próximamente
                    </button>
                  )}
                  {pdfActivityUrl ? (
                    <a 
                      href={pdfActivityUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-white dark:bg-gray-800 text-secondary dark:text-white font-medium py-3 px-6 rounded-xl border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <span className="material-symbols-outlined">description</span>
                      Ver Material PDF
                    </a>
                  ) : (
                    <button disabled className="flex-1 bg-white dark:bg-gray-800 text-secondary dark:text-white font-medium py-3 px-6 rounded-xl border border-gray-200 dark:border-gray-600 opacity-50 cursor-not-allowed flex items-center justify-center gap-2">
                      <span className="material-symbols-outlined">description</span>
                      Ver Material PDF
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Micro Learning */}
            <div>
              <h3 className="text-lg font-semibold text-secondary dark:text-white mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">bolt</span>
                Micro-aprendizaje: Anatomía Ecográfica
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-surface-light dark:bg-surface-dark p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary/50 dark:hover:border-primary/50 transition-all cursor-pointer group shadow-sm">
                  <div className="flex gap-4">
                    <div className="w-16 h-16 rounded-lg bg-gray-200 dark:bg-gray-800 flex items-center justify-center flex-shrink-0 relative overflow-hidden">
                      <span className="material-symbols-outlined text-3xl text-gray-400 group-hover:text-primary transition-colors">
                        accessibility_new
                      </span>
                      <div className="absolute inset-0 bg-secondary/10 dark:bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                    <div>
                      <h4 className="font-bold text-secondary dark:text-white group-hover:text-primary transition-colors">
                        Rodilla: Meniscos
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                        Exploración axial y longitudinal de meniscos medial y lateral.
                      </p>
                      <span className="text-[10px] font-semibold text-gray-400 mt-2 block flex items-center gap-1">
                        <span className="material-symbols-outlined text-[12px]">schedule</span> 12 min
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-surface-light dark:bg-surface-dark p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary/50 dark:hover:border-primary/50 transition-all cursor-pointer group shadow-sm">
                  <div className="flex gap-4">
                    <div className="w-16 h-16 rounded-lg bg-gray-200 dark:bg-gray-800 flex items-center justify-center flex-shrink-0 relative overflow-hidden">
                      <span className="material-symbols-outlined text-3xl text-gray-400 group-hover:text-primary transition-colors">
                        pan_tool
                      </span>
                      <div className="absolute inset-0 bg-secondary/10 dark:bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                    <div>
                      <h4 className="font-bold text-secondary dark:text-white group-hover:text-primary transition-colors">
                        Mano: Túnel Carpiano
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                        Medición del Área del nervio mediano y retináculo.
                      </p>
                      <span className="text-[10px] font-semibold text-gray-400 mt-2 block flex items-center gap-1">
                        <span className="material-symbols-outlined text-[12px]">schedule</span> 8 min
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-surface-light dark:bg-surface-dark p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary/50 dark:hover:border-primary/50 transition-all cursor-pointer group shadow-sm">
                  <div className="flex gap-4">
                    <div className="w-16 h-16 rounded-lg bg-gray-200 dark:bg-gray-800 flex items-center justify-center flex-shrink-0 relative overflow-hidden">
                      <span className="material-symbols-outlined text-3xl text-gray-400 group-hover:text-primary transition-colors">
                        foot_bones
                      </span>
                      <div className="absolute inset-0 bg-secondary/10 dark:bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                    <div>
                      <h4 className="font-bold text-secondary dark:text-white group-hover:text-primary transition-colors">
                        Tobillo: Ligamentos
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                        Evaluación del complejo ligamentario lateral tras esguince.
                      </p>
                      <span className="text-[10px] font-semibold text-gray-400 mt-2 block flex items-center gap-1">
                        <span className="material-symbols-outlined text-[12px]">schedule</span> 15 min
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-surface-light dark:bg-surface-dark p-4 rounded-xl border border-dashed border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all cursor-pointer group flex items-center justify-center">
                  <div className="text-center">
                    <span className="material-symbols-outlined text-primary mb-1">add_circle</span>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Ver catálogo completo</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1 space-y-8">
            <div className="bg-secondary rounded-2xl shadow-lg p-6 text-white relative overflow-hidden">
              <div className="absolute top-[-20px] right-[-20px] w-24 h-24 rounded-full bg-primary/20 blur-xl"></div>
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2 relative z-10">
                <span className="material-symbols-outlined text-red-400 animate-pulse">videocam</span>
                Próxima Sesión en Vivo
              </h3>
              
              {liveSessions.length > 0 ? (
                liveSessions.map((session) => (
                  <div key={session.id} className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/10 mb-4">
                    <p className="text-xs text-primary font-bold uppercase tracking-wider mb-1">Webinar</p>
                    <p className="font-bold text-lg leading-tight mb-2">{session.title}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <span className="material-symbols-outlined text-base">calendar_month</span>
                      <span>{new Date(session.session_date).toLocaleString('es-MX', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })} hrs</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/10 mb-4">
                  <p className="text-sm text-gray-300">No hay sesiones en vivo programadas próximamente.</p>
                </div>
              )}
              
              <button disabled={liveSessions.length === 0} className="w-full bg-white text-secondary font-bold py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                {liveSessions.length > 0 ? "Inscribirse" : "No disponible"}
              </button>
            </div>

            {/* Performance Chart Placeholder */}
            <div className="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-secondary dark:text-white">Rendimiento Semanal</h3>
                <button className="text-gray-400 hover:text-primary">
                  <span className="material-symbols-outlined">more_horiz</span>
                </button>
              </div>
              <div className="flex items-end justify-between h-32 gap-2 mb-2">
                <div className="w-full bg-primary/20 dark:bg-primary/10 rounded-t-sm relative group h-[40%]">
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-800 text-white text-xs px-2 py-1 rounded">2h</div>
                </div>
                <div className="w-full bg-primary/20 dark:bg-primary/10 rounded-t-sm relative group h-[60%]">
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-800 text-white text-xs px-2 py-1 rounded">3h</div>
                </div>
                <div className="w-full bg-primary rounded-t-sm relative group h-[85%] shadow-[0_0_15px_rgba(0,180,216,0.5)]">
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-secondary text-white text-xs px-2 py-1 rounded font-bold">4.2h</div>
                </div>
                <div className="w-full bg-primary/20 dark:bg-primary/10 rounded-t-sm relative group h-[30%]"></div>
                <div className="w-full bg-primary/20 dark:bg-primary/10 rounded-t-sm relative group h-[50%]"></div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-t-sm h-[10%]"></div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-t-sm h-[10%]"></div>
              </div>
              <div className="flex justify-between text-xs text-gray-400 font-medium px-1">
                <span>L</span><span>M</span><span>X</span><span>J</span><span>V</span><span>S</span><span>D</span>
              </div>
            </div>

            {/* Recent Certificates */}
            <div className="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="font-bold text-secondary dark:text-white mb-4">Certificados Recientes</h3>
              <div className="space-y-4">
                {certificates.length > 0 ? certificates.map((cert) => {
                  const certModule = modules.find(m => m.id === cert.module_id);
                  const isGlobal = !cert.module_id;
                  return (
                    <div key={cert.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700/50">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isGlobal ? 'bg-primary/20 text-primary' : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400'}`}>
                          <span className="material-symbols-outlined text-2xl">{isGlobal ? 'school' : 'workspace_premium'}</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-bold text-secondary dark:text-gray-200">{isGlobal ? "Diplomado Compl. en Rehabilitación Intervencionista" : (certModule?.title || "Módulo Completado")}</p>
                          <p className="text-xs text-gray-500">Emitido: {cert.issue_date ? new Date(cert.issue_date).toLocaleDateString('es-MX', { day: '2-digit', month: 'short', year: 'numeric' }) : 'N/A'}</p>
                        </div>
                      </div>
                      <CertificateGenerator studentName={displayName} date={cert.issue_date || undefined} />
                    </div>
                  );
                }) : (
                  <div className="flex items-center gap-3 opacity-60">
                    <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400">
                      <span className="material-symbols-outlined">lock</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-secondary dark:text-gray-200">Aún no hay certificados</p>
                      <p className="text-xs text-gray-500">Completa módulos para obtenerlos</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>

  )
}
