import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import { Logo } from "@/components/ui/logo"

export default async function RegisterLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: settings } = await supabase
    .from('app_settings')
    .select('value')
    .eq('key', 'open_registration')
    .maybeSingle()

  // Default: open. If setting exists and is explicitly false, show closed screen.
  const isOpen = settings ? Boolean(settings.value) : true

  if (!isOpen) {
    return (
      <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-sans antialiased">
        <header className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-background-dark/5 backdrop-blur-sm sticky top-0 z-10">
          <Logo variant="light" compact />
          <Link href="/login" className="text-sm font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors">
            Iniciar sesión
          </Link>
        </header>

        <main className="flex-1 flex flex-col items-center justify-center p-8">
          <div className="max-w-md w-full text-center">
            <div className="w-20 h-20 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mx-auto mb-6">
              <span className="material-symbols-outlined text-4xl text-amber-600 dark:text-amber-400">lock</span>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">
              Registro Cerrado
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-lg mb-8 leading-relaxed">
              Las inscripciones para este programa están temporalmente cerradas.
              Contáctanos para más información sobre próximas fechas de apertura.
            </p>
            <div className="space-y-3">
              <Link
                href="/login"
                className="block w-full bg-primary hover:bg-cyan-500 text-white font-semibold py-3 px-6 rounded-xl shadow-lg shadow-primary/25 transition-colors"
              >
                Iniciar Sesión
              </Link>
              <Link
                href="/"
                className="block w-full bg-white dark:bg-surface-dark text-secondary dark:text-white font-medium py-3 px-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                Ir al inicio
              </Link>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return <>{children}</>
}
