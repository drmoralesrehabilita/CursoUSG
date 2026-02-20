import Link from "next/link"
import { Logo } from "@/components/ui/logo"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Mail } from "lucide-react"

export const metadata = {
  title: "Recuperar contraseña | Diplomado Dr. Raúl Morales",
  description: "Recupera el acceso a tu cuenta del Diplomado en Rehabilitación Intervencionista.",
}

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100">
      <header className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800">
        <Logo variant="light" compact />
        <Link href="/login" className="text-sm font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200">
          Volver al inicio de sesión
        </Link>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md text-center space-y-6">
          <div className="flex justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Mail className="w-7 h-7" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-secondary dark:text-white">
            ¿Olvidaste tu contraseña?
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Contacta a nuestro equipo de soporte para recuperar el acceso a tu cuenta. Te responderemos en el menor tiempo posible.
          </p>
          <a
            href="mailto:drmoralesrehabilita@gmail.com?subject=Recuperación%20de%20contraseña"
            className="inline-block"
          >
            <Button className="w-full sm:w-auto gap-2">
              <Mail className="w-4 h-4" />
              Contactar a Soporte
            </Button>
          </a>
          <Link href="/login" className="block text-sm text-primary hover:underline font-medium">
            <span className="flex items-center justify-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Volver al inicio de sesión
            </span>
          </Link>
        </div>
      </main>
    </div>
  )
}
