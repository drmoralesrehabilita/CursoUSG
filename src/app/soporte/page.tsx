import Link from "next/link"
import { Logo } from "@/components/ui/logo"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Mail, MessageCircle, BookOpen } from "lucide-react"

export const metadata = {
  title: "Soporte | Diplomado Dr. Raúl Morales",
  description: "Centro de ayuda y soporte del Diplomado en Rehabilitación Intervencionista.",
}

export default function SoportePage() {
  return (
    <div className="min-h-screen font-sans bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 antialiased">
      <div className="sticky top-0 z-50 w-full border-b border-surface-highlight bg-background-dark/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-4 sm:px-6">
          <Logo variant="dark" compact />
          <Link href="/">
            <Button variant="ghost" className="text-slate-300 hover:text-white gap-2">
              <ArrowLeft className="w-4 h-4" />
              Inicio
            </Button>
          </Link>
        </div>
      </div>

      <main className="mx-auto max-w-4xl px-4 sm:px-6 py-12 lg:py-16">
        <h1 className="text-3xl font-bold text-secondary dark:text-white mb-2">Centro de Soporte</h1>
        <p className="text-slate-500 dark:text-slate-400 mb-12">
          Estamos aquí para ayudarte. Elige el canal que prefieras para contactarnos.
        </p>

        <div className="grid gap-6 sm:grid-cols-2">
          <a
            href="mailto:drmoralesrehabilita@gmail.com"
            className="flex gap-4 p-6 rounded-2xl border border-surface-highlight bg-surface-dark hover:border-primary/50 hover:bg-surface-highlight/30 transition-all group"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-semibold text-white mb-1">Correo electrónico</h2>
              <p className="text-sm text-slate-400 mb-2">drmoralesrehabilita@gmail.com</p>
              <p className="text-sm text-slate-400">Respuesta en 24-48 horas hábiles.</p>
            </div>
          </a>

          <a
            href="mailto:drmoralesrehabilita@gmail.com"
            className="flex gap-4 p-6 rounded-2xl border border-surface-highlight bg-surface-dark hover:border-primary/50 hover:bg-surface-highlight/30 transition-all group"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-semibold text-white mb-1">Admisiones</h2>
              <p className="text-sm text-slate-400 mb-2">drmoralesrehabilita@gmail.com</p>
              <p className="text-sm text-slate-400">Consultas sobre inscripción y cohortes.</p>
            </div>
          </a>
        </div>

        <div className="mt-12 p-6 rounded-2xl border border-surface-highlight bg-surface-dark">
          <div className="flex gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-semibold text-white mb-2">Recursos útiles</h2>
              <ul className="space-y-2">
                <li>
                  <Link href="/temario" className="text-primary hover:underline text-sm">
                    Ver temario completo del diplomado
                  </Link>
                </li>
                <li>
                  <Link href="/terminos" className="text-primary hover:underline text-sm">
                    Términos de Servicio
                  </Link>
                </li>
                <li>
                  <Link href="/privacidad" className="text-primary hover:underline text-sm">
                    Política de Privacidad
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-6 p-6 rounded-2xl border border-primary/25 bg-primary/10">
          <h2 className="font-semibold text-white mb-2">Respaldo académico y legal</h2>
          <p className="text-sm text-blue-100 leading-relaxed">
            Si necesitas constancias, información de facturación, requisitos de certificación o documentación sobre términos y privacidad, nuestro equipo te orienta por correo para un seguimiento formal.
          </p>
        </div>

        <div className="mt-12 pt-8 border-t border-surface-highlight">
          <Link href="/">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Volver al inicio
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}
