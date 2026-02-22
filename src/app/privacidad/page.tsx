import Link from "next/link"
import { Logo } from "@/components/ui/logo"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export const metadata = {
  title: "Política de Privacidad | Diplomado Dr. Raúl Morales",
  description: "Política de privacidad y tratamiento de datos del Diplomado en Rehabilitación Intervencionista.",
}

export default function PrivacidadPage() {
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
        <h1 className="text-3xl font-bold text-secondary dark:text-white mb-2">Política de Privacidad</h1>
        <p className="text-slate-500 dark:text-slate-400 mb-10">Última actualización: {new Date().toLocaleDateString("es-MX", { year: "numeric", month: "long", day: "numeric" })}</p>

        <div className="prose prose-invert max-w-none space-y-8 text-slate-300">
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">1. Responsable del tratamiento</h2>
            <p className="text-slate-400 leading-relaxed">
              El Diplomado en Rehabilitación Intervencionista del Dr. Raúl Morales (en adelante, &quot;el Curso&quot;) es responsable del tratamiento de los datos personales que usted nos proporcione a través de esta plataforma educativa.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">2. Datos que recabamos</h2>
            <p className="text-slate-400 leading-relaxed mb-2">
              Recopilamos información que usted nos proporciona de forma voluntaria al registrarse y durante el uso del servicio, tales como:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-slate-400">
              <li>Nombre completo y datos de contacto (correo electrónico, teléfono)</li>
              <li>Información profesional (cédula, especialidad, institución)</li>
              <li>Datos de acceso y uso de la plataforma</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">3. Finalidad del tratamiento</h2>
            <p className="text-slate-400 leading-relaxed">
              Sus datos se utilizan para gestionar su inscripción, dar acceso a los contenidos del diplomado, emitir certificados, enviar recordatorios y comunicaciones relacionadas con el curso, y mejorar nuestros servicios.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">4. Ejercicio de derechos</h2>
            <p className="text-slate-400 leading-relaxed">
              Usted tiene derecho a acceder, rectificar, cancelar u oponerse al tratamiento de sus datos personales. Para ejercer estos derechos, contacte a <a href="mailto:drmoralesrehabilita@gmail.com" className="text-primary hover:underline">drmoralesrehabilita@gmail.com</a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">5. Cambios</h2>
            <p className="text-slate-400 leading-relaxed">
              Nos reservamos el derecho de modificar esta política. Los cambios serán notificados mediante la actualización de la fecha al inicio del documento y, cuando sea relevante, por correo electrónico.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">6. Base legal y conservación de datos</h2>
            <p className="text-slate-400 leading-relaxed">
              Tratamos sus datos con base en su consentimiento, la relación contractual derivada de su inscripción y obligaciones legales aplicables. Los datos se conservan durante el tiempo necesario para fines académicos, administrativos, fiscales y de cumplimiento regulatorio.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">7. Transferencias y terceros</h2>
            <p className="text-slate-400 leading-relaxed">
              Sus datos podrán compartirse con proveedores tecnológicos, plataformas de pago, servicios de soporte y entidades académicas vinculadas al proceso formativo y de certificación, siempre bajo acuerdos de confidencialidad y medidas de seguridad razonables.
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
