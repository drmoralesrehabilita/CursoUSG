import Link from "next/link"
import { Logo } from "@/components/ui/logo"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background-dark via-secondary to-background-dark">
      <header className="relative z-10 flex items-center justify-between px-6 py-5 border-b border-white/5">
        <Logo variant="dark" compact />
      </header>

      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-3">
          Página no encontrada
        </h1>
        <p className="text-gray-400 text-base sm:text-lg max-w-md mb-10 leading-relaxed">
          Lo sentimos, la página que buscas no existe o ha sido movida.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary hover:bg-primary/90 text-white font-semibold text-sm transition-all shadow-lg"
          >
            Ir al Inicio
          </Link>
        </div>
      </main>

      <footer className="relative z-10 text-center py-6 text-gray-600 text-xs border-t border-white/5">
        © {new Date().getFullYear()} Dr. Raúl Morales — Ecografía Neuromusculoesquelética
      </footer>
    </div>
  )
}
