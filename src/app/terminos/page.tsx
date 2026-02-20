import Link from "next/link"
import { Logo } from "@/components/ui/logo"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export const metadata = {
  title: "Términos de Servicio | Diplomado Dr. Raúl Morales",
  description: "Términos y condiciones de uso del Diplomado en Rehabilitación Intervencionista.",
}

export default function TerminosPage() {
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
        <h1 className="text-3xl font-bold text-secondary dark:text-white mb-2">Términos de Servicio</h1>
        <p className="text-slate-500 dark:text-slate-400 mb-10">Última actualización: {new Date().toLocaleDateString("es-MX", { year: "numeric", month: "long", day: "numeric" })}</p>

        <div className="prose prose-invert max-w-none space-y-8 text-slate-300">
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">1. Aceptación de los términos</h2>
            <p className="text-slate-400 leading-relaxed">
              Al registrarse y utilizar la plataforma del Diplomado en Rehabilitación Intervencionista del Dr. Raúl Morales, usted acepta los presentes términos y condiciones, así como nuestra <Link href="/privacidad" className="text-primary hover:underline">Política de Privacidad</Link>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">2. Uso del servicio</h2>
            <p className="text-slate-400 leading-relaxed mb-2">
              El acceso a los contenidos del curso es exclusivo para usuarios inscritos. No está permitido:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-slate-400">
              <li>Compartir credenciales o dar acceso a terceros</li>
              <li>Descargar, reproducir o redistribuir el material sin autorización</li>
              <li>Utilizar los contenidos con fines comerciales distintos al aprendizaje personal</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">3. Inscripción y pagos</h2>
            <p className="text-slate-400 leading-relaxed">
              La inscripción implica la aceptación de las condiciones de pago establecidas. Las políticas de reembolso y cancelación serán indicadas en el proceso de inscripción.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">4. Propiedad intelectual</h2>
            <p className="text-slate-400 leading-relaxed">
              Todo el contenido audiovisual, textos y materiales del diplomado son propiedad del Dr. Raúl Morales y sus colaboradores. Su uso está restringido al ámbito educativo del curso.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">5. Contacto</h2>
            <p className="text-slate-400 leading-relaxed">
              Para consultas sobre estos términos, contacte a <a href="mailto:drmoralesrehabilita@gmail.com" className="text-primary hover:underline">drmoralesrehabilita@gmail.com</a>.
            </p>
          </section>
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
