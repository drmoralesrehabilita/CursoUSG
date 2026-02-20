"use client"

import { Header } from "@/components/dashboard/header"

export default function ProfilePage() {
  return (
    <>
      <Header title="Mi Perfil" />
      <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-background-light dark:bg-background-dark font-body">
        <div className="relative bg-secondary rounded-2xl shadow-lg p-6 md:p-8 mb-8 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-600/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8">
            <div className="relative">
              <img
                alt="Profile"
                className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-primary shadow-2xl object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD8MYIP6p3bPfy1MXhtDHs8bWhWR2iyZfKLoO4L6Ve1DAEDPYSQfkefxuK7rP7rCfYg1_ctlukp-nxC7NzUE7A-aY3ChhOaO0Hd0wayxa0BAnuk6M5ZMuNKhZ7jjnI-AXWYa4dDzw0sr0Pec3WdvryKi2GGJacdg-HPxZKvCRsmkhBHdzhhtGAxsn0PgpK0VG-S4Uk9XnZxZh7jFqck6-I7qYJ4pAzwTp0WjPfniE_P8fQCWtofHggG66en_3twnIfPXvoONwEDF81E"
              />
              <span className="absolute bottom-2 right-2 bg-green-500 w-5 h-5 rounded-full border-2 border-secondary"></span>
            </div>
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2 justify-center md:justify-start">
                <h1 className="text-3xl font-bold text-white">Dr. H├®ctor Garc├¡a</h1>
                <span className="bg-primary/20 text-primary border border-primary/30 px-3 py-1 rounded-full text-sm font-semibold inline-flex items-center gap-1 self-center md:self-auto">
                  <span className="material-symbols-outlined text-base">verified</span>
                  Residente 3
                </span>
              </div>
              <p className="text-gray-300 text-lg mb-1">Diplomado Internacional de Rehabilitaci├│n Intervencionista</p>
              <p className="text-gray-400 text-sm flex items-center justify-center md:justify-start gap-1">
                <span className="material-symbols-outlined text-base">location_on</span> Ciudad de M├®xico, M├®xico
              </p>
              <div className="mt-6 flex flex-wrap gap-3 justify-center md:justify-start">
                <button className="bg-primary hover:bg-cyan-500 text-white px-5 py-2.5 rounded-lg font-medium transition-colors flex items-center gap-2 shadow-lg shadow-primary/20">
                  <span className="material-symbols-outlined text-xl">edit_square</span>
                  Editar Perfil
                </button>
                <button className="bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-lg font-medium transition-colors flex items-center gap-2 border border-white/10">
                  <span className="material-symbols-outlined text-xl">history_edu</span>
                  Descargar Historial
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 md:p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-secondary dark:text-white flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">badge</span>
                  Datos Profesionales
                </h3>
                <button className="text-primary hover:text-cyan-400 text-sm font-medium">Actualizar</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Nombre Completo</label>
                  <p className="text-gray-800 dark:text-gray-200 font-medium">H├®ctor Manuel Garc├¡a L├│pez</p>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Correo Electr├│nico</label>
                  <div className="flex items-center gap-2">
                    <p className="text-gray-800 dark:text-gray-200 font-medium">dr.garcia@medico.mx</p>
                    <span className="material-symbols-outlined text-green-500 text-sm" title="Verificado">check_circle</span>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">WhatsApp</label>
                  <p className="text-gray-800 dark:text-gray-200 font-medium">+52 55 1234 5678</p>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">C├®dula Profesional</label>
                  <div className="flex items-center gap-2">
                    <p className="text-gray-800 dark:text-gray-200 font-medium tracking-widest">87654321</p>
                    <span className="bg-green-500/10 text-green-500 text-[10px] px-2 py-0.5 rounded border border-green-500/20 font-bold uppercase">Validada</span>
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Instituci├│n Actual</label>
                  <p className="text-gray-800 dark:text-gray-200 font-medium">Hospital General de M├®xico - Depto. de Rehabilitaci├│n</p>
                </div>
              </div>
            </div>
            <div className="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 md:p-8">
              <h3 className="text-xl font-bold text-secondary dark:text-white flex items-center gap-2 mb-6">
                <span className="material-symbols-outlined text-primary">medical_services</span>
                Especialidad y ├üreas de Inter├®s
              </h3>
              <div className="mb-6">
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Especialidad Principal</label>
                <div className="bg-background-light dark:bg-background-dark p-3 rounded-lg border border-gray-200 dark:border-gray-700 inline-block">
                  <span className="text-secondary dark:text-white font-medium">Medicina F├¡sica y Rehabilitaci├│n</span>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Intereses Cl├¡nicos (Tags)</label>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1.5 bg-primary/10 text-primary border border-primary/20 rounded-full text-sm font-medium">Ecograf├¡a MSK</span>
                  <span className="px-3 py-1.5 bg-secondary/5 dark:bg-white/5 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600 rounded-full text-sm font-medium">Hombro</span>
                  <span className="px-3 py-1.5 bg-secondary/5 dark:bg-white/5 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600 rounded-full text-sm font-medium">Columna</span>
                  <span className="px-3 py-1.5 bg-secondary/5 dark:bg-white/5 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600 rounded-full text-sm font-medium">Intervencionismo</span>
                  <span className="px-3 py-1.5 bg-secondary/5 dark:bg-white/5 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600 rounded-full text-sm font-medium">Dolor Cr├│nico</span>
                  <button className="px-3 py-1.5 border border-dashed border-gray-400 text-gray-400 hover:text-primary hover:border-primary rounded-full text-sm font-medium transition-colors flex items-center gap-1">
                    <span className="material-symbols-outlined text-base">add</span> A├▒adir
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-bold text-secondary dark:text-white flex items-center gap-2 mb-6">
                <span className="material-symbols-outlined text-primary">analytics</span>
                Mi Actividad Acad├®mica
              </h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                    <span className="material-symbols-outlined">schedule</span>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-secondary dark:text-white">124h</p>
                    <p className="text-xs text-gray-500">Horas estudiadas</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500">
                    <span className="material-symbols-outlined">school</span>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-secondary dark:text-white">8</p>
                    <p className="text-xs text-gray-500">Cursos completados</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500">
                    <span className="material-symbols-outlined">quiz</span>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-secondary dark:text-white">92%</p>
                    <p className="text-xs text-gray-500">Promedio Quiz</p>
                  </div>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-700">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Pr├│ximo Examen</p>
                <div className="bg-gradient-to-r from-secondary to-blue-900 rounded-xl p-4 text-white relative overflow-hidden">
                  <div className="absolute right-0 top-0 w-16 h-16 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-lg"></div>
                  <p className="font-bold text-sm">Certificaci├│n Mod. 3</p>
                  <p className="text-xs opacity-80 mb-2">28 de Octubre, 2023</p>
                  <div className="w-full bg-white/20 rounded-full h-1.5 mt-2">
                    <div className="bg-primary h-1.5 rounded-full w-[0%]"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-bold text-secondary dark:text-white flex items-center gap-2 mb-6">
                <span className="material-symbols-outlined text-primary">settings_account_box</span>
                Configuraci├│n de Cuenta
              </h3>
              <div className="space-y-4">
                <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group border border-transparent hover:border-gray-200 dark:hover:border-gray-600">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-gray-400 group-hover:text-primary transition-colors">lock</span>
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300 group-hover:text-secondary dark:group-hover:text-white">Cambiar Contrase├▒a</span>
                  </div>
                  <span className="material-symbols-outlined text-gray-300 text-sm">arrow_forward_ios</span>
                </button>
                <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group border border-transparent hover:border-gray-200 dark:hover:border-gray-600">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-gray-400 group-hover:text-primary transition-colors">notifications</span>
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300 group-hover:text-secondary dark:group-hover:text-white">Notificaciones</span>
                  </div>
                  <div className="relative inline-block w-8 h-4 align-middle select-none transition duration-200 ease-in">
                    <input className="toggle-checkbox absolute block w-4 h-4 rounded-full bg-white border-4 appearance-none cursor-pointer checked:right-0 right-4 checked:border-primary border-gray-300" id="toggle" name="toggle" type="checkbox" />
                    <label className="toggle-label block overflow-hidden h-4 rounded-full bg-gray-300 cursor-pointer checked:bg-primary" htmlFor="toggle"></label>
                  </div>
                </button>
                <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group border border-transparent hover:border-gray-200 dark:hover:border-gray-600">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-gray-400 group-hover:text-primary transition-colors">language</span>
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300 group-hover:text-secondary dark:group-hover:text-white">Idioma / Regi├│n</span>
                  </div>
                  <span className="text-xs text-gray-400">Espa├▒ol (MX)</span>
                </button>
                <div className="pt-4 mt-2 border-t border-gray-100 dark:border-gray-700">
                  <button className="w-full text-left text-sm text-red-500 hover:text-red-600 font-medium py-2 flex items-center gap-2">
                    <span className="material-symbols-outlined">logout</span>
                    Cerrar Sesi├│n
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>

  )
}
