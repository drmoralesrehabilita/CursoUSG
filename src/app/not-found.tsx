import Link from "next/link"
import { Logo } from "@/components/ui/logo"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background-dark via-secondary to-background-dark">
      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px]" />
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-6 py-5 border-b border-white/5">
        <Logo variant="dark" compact />
      </header>

      {/* Content */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 text-center">
        {/* 404 Number */}
        <div className="relative mb-6">
          <span className="text-[10rem] sm:text-[14rem] font-black leading-none text-white/5 select-none">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="material-symbols-outlined text-7xl sm:text-8xl text-primary/60 animate-pulse">
              sensors_off
            </span>
          </div>
        </div>

        {/* Message */}
        <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-3">
          Página no encontrada
        </h1>
        <p className="text-gray-400 text-base sm:text-lg max-w-md mb-10 leading-relaxed">
          Lo sentimos, la página que buscas no existe o ha sido movida. Verifica la URL o regresa al inicio.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary hover:bg-primary/90 text-white font-semibold text-sm transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5"
          >
            <span className="material-symbols-outlined text-lg">home</span>
            Ir al Inicio
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white font-semibold text-sm transition-all backdrop-blur-sm"
          >
            <span className="material-symbols-outlined text-lg">dashboard</span>
            Mi Dashboard
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center py-6 text-gray-600 text-xs border-t border-white/5">
        © {new Date().getFullYear()} Dr. Raúl Morales — Ecografía Neuromusculoesquelética
      </footer>
    </div>
  )
}
