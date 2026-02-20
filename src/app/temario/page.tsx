import Link from "next/link"
import { Logo } from "@/components/ui/logo"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Hand,
  Footprints,
  Syringe,
  Scan,
  Activity,
  Calendar,
  BookMarked,
  MessageSquare,
  Video,
  ClipboardCheck,
  Smartphone,
  Download,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const modules = [
  {
    id: "modulo-1",
    num: 1,
    title: "Fundamentos del Intervencionismo",
    weeks: "Semanas 1-2",
    icon: BookOpen,
    image:
      "https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&w=1400&q=80",
    topics: [
      { label: "Teoría", desc: "Historia, objetivos y marco legal." },
      { label: "Seguridad", desc: "Materiales, medicamentos, técnica estéril y manejo de complicaciones." },
      { label: "Fisiología", desc: "Teorías y tipos de dolor." },
    ],
  },
  {
    id: "modulo-2",
    num: 2,
    title: "Técnicas Terapéuticas Complementarias",
    weeks: "Semanas 3-7",
    icon: Syringe,
    image:
      "https://images.unsplash.com/photo-1579165466949-3180a3d056d1?auto=format&fit=crop&w=1400&q=80",
    topics: [
      { label: "Farmacología", desc: "Anestésicos, esteroides, antihomotóxicos y viscosuplementación." },
      { label: "Medicina Regenerativa", desc: "PRP (Plasma Rico en Plaquetas), Colágeno PVP, Proloterapia." },
      { label: "Técnicas", desc: "Punción seca, mesoterapia, terapia neural y glucopuntura." },
    ],
  },
  {
    id: "modulo-3",
    num: 3,
    title: "Extremidad Superior",
    weeks: "Semanas 8-10 + Taller",
    icon: Hand,
    image:
      "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1400&q=80",
    topics: [
      { label: "Regiones", desc: "Hombro, Codo, Muñeca y Mano." },
      { label: "Enfoque", desc: "Anatomía, biomecánica y exploración física dirigida." },
      { label: "Taller 1", desc: "Práctica intensiva en CDMX (Infiltración por referencias anatómicas)." },
    ],
  },
  {
    id: "modulo-4",
    num: 4,
    title: "Extremidad Inferior",
    weeks: "Semanas 11-13 + Taller",
    icon: Footprints,
    image:
      "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=1400&q=80",
    topics: [
      { label: "Regiones", desc: "Cadera, Rodilla, Tobillo y Pie." },
      { label: "Taller 2", desc: "Infiltración por articulación y patologías principales." },
    ],
  },
  {
    id: "modulo-5",
    num: 5,
    title: "Introducción a la Ecografía MSK",
    weeks: "Semanas 14-18 + Taller",
    icon: Scan,
    image:
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1400&q=80",
    topics: [
      { label: "Técnica", desc: "Botonología básica y patrones ecográficos." },
      { label: "Exploración", desc: "Protocolos por regiones (Hombro a Tobillo)." },
      { label: "Taller 3", desc: "Intervencionismo ecoguiado (Hands-on)." },
    ],
  },
  {
    id: "modulo-6",
    num: 6,
    title: "Columna y Nervios Periféricos",
    weeks: "Semanas 19-21",
    icon: Activity,
    image:
      "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=1400&q=80",
    topics: [
      { label: "Anatomía e Imagen", desc: "Cervical, Dorsal y Lumbosacra." },
      { label: "Cierre", desc: "Evaluación final y entrega de diplomas acreditados." },
    ],
  },
]

const features = [
  { icon: Calendar, label: "Calendario Dinámico", desc: "Recordatorios automáticos para las clases de los martes y jueves (6:30 - 8:30 PM)." },
  { icon: ClipboardCheck, label: "Gestor de Talleres", desc: "Sistema de confirmación de asistencia y códigos QR para el check-in en los talleres presenciales de CDMX." },
  { icon: BookMarked, label: "Biblioteca de Bibliografía", desc: "Repositorio organizado por módulos con los PDFs complementarios mencionados en el programa." },
  { icon: MessageSquare, label: "Foro de Discusión", desc: "Espacio integrado para resolver dudas sobre casos clínicos reales." },
]

const technical = [
  { icon: Video, label: "Video Hosting", desc: "Implementación de marcas de agua dinámicas (con el nombre/ID del médico) para evitar la piratería de las clases grabadas." },
  { icon: ClipboardCheck, label: "Evaluaciones", desc: "Módulos de exámenes automáticos al final de cada sección para habilitar el siguiente módulo." },
  { icon: Smartphone, label: "App Móvil", desc: "Notificaciones push 30 minutos antes de cada sesión en vivo." },
]

export default function TemarioPage() {
  return (
    <div className="min-h-screen font-sans bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 overflow-x-hidden antialiased">
      {/* Navbar */}
      <div className="sticky top-0 z-50 w-full border-b border-surface-highlight bg-background-dark/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Logo variant="dark" compact />
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" className="text-slate-300 hover:text-white hover:bg-white/5 gap-2">
                <ArrowLeft className="w-4 h-4" />
                Inicio
              </Button>
            </Link>
            <Link href="/login">
              <Button className="h-9 rounded-lg bg-primary px-4 text-sm font-bold text-white hover:bg-primary/90">
                Inscribirme Ahora
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <main className="flex flex-col">
        {/* Hero */}
        <section className="relative py-16 lg:py-24 bg-background-dark overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(#293038 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
          <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-black text-white sm:text-5xl lg:text-6xl tracking-tight mb-4">
              Diplomado en Rehabilitación Intervencionista
            </h1>
            <p className="text-xl text-slate-400 mb-6">Dr. Raúl Morales</p>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-8">
              Este plan integra el temario académico del Dr. Raúl Morales con una infraestructura tecnológica de alto nivel para médicos especialistas y residentes.
            </p>
            <nav className="flex flex-wrap justify-center gap-2">
              <a href="#concepto" className="px-3 py-1.5 rounded-lg bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 text-sm transition-colors">Concepto</a>
              <a href="#modulos" className="px-3 py-1.5 rounded-lg bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 text-sm transition-colors">Módulos</a>
              <a href="#funcionalidades" className="px-3 py-1.5 rounded-lg bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 text-sm transition-colors">Funcionalidades</a>
              <a href="#tecnicos" className="px-3 py-1.5 rounded-lg bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 text-sm transition-colors">Aspectos Técnicos</a>
              <a
                href="https://sgpxbajxvpvcsyxhcnbg.supabase.co/storage/v1/object/public/infoPublic/DR%20MORALES%20curso%20comprimido.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-primary/20 text-primary hover:text-white hover:bg-primary/50 text-sm transition-colors inline-flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Plan.pdf
              </a>
            </nav>
          </div>
        </section>

        {/* Concepto del Producto */}
        <section id="concepto" className="py-16 bg-surface-dark border-t border-surface-highlight">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-white mb-6">1. Concepto</h2>
            <Card className="bg-background-dark border-surface-highlight">
              <CardContent className="pt-6">
                <p className="text-slate-300 leading-relaxed">
                  Una plataforma educativa híbrida que gestiona el aprendizaje asincrónico (clases grabadas) y la logística de los talleres presenciales, enfocada en la seguridad del paciente y la precisión técnica.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Módulos */}
        <section id="modulos" className="py-16 bg-background-dark">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-white mb-10 text-center">2. Temario Académico Detallado</h2>
            <div className="space-y-8">
              {modules.map((mod) => (
                <div key={mod.id} id={mod.id} className="scroll-mt-24">
                  <Card className="bg-surface-dark border-surface-highlight overflow-hidden">
                    <div className="relative h-44 w-full overflow-hidden border-b border-surface-highlight/50">
                      <img
                        src={mod.image}
                        alt={`Imagen del módulo ${mod.num}: ${mod.title}`}
                        className="h-full w-full object-cover opacity-75"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-background-dark/85 via-background-dark/20 to-transparent" />
                    </div>
                    <CardHeader className="border-b border-surface-highlight/50">
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                          <mod.icon className="w-6 h-6" />
                        </div>
                        <div>
                          <CardTitle className="text-xl text-white">Módulo {mod.num}: {mod.title}</CardTitle>
                          <p className="text-sm text-slate-400 mt-1">{mod.weeks}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <ul className="space-y-3">
                        {mod.topics.map((t) => (
                          <li key={t.label} className="flex gap-3">
                            <span className="font-semibold text-primary shrink-0">{t.label}:</span>
                            <span className="text-slate-400">{t.desc}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Funcionalidades */}
        <section id="funcionalidades" className="py-16 bg-surface-dark border-t border-surface-highlight">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-white mb-10">3. Comportamiento y Funcionalidades del Sistema</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {features.map((f) => (
                <Card key={f.label} className="bg-background-dark border-surface-highlight">
                  <CardContent className="pt-6 flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <f.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">{f.label}</h3>
                      <p className="text-sm text-slate-400">{f.desc}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Aspectos Técnicos */}
        <section id="tecnicos" className="py-16 bg-background-dark">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-white mb-10">4. Aspectos Técnicos</h2>
            <div className="grid gap-6 sm:grid-cols-3">
              {technical.map((t) => (
                <Card key={t.label} className="bg-surface-dark border-surface-highlight">
                  <CardContent className="pt-6 flex flex-col gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <t.icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-semibold text-white">{t.label}</h3>
                    <p className="text-sm text-slate-400">{t.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-primary relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551601651-2a8555f1a136?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] opacity-10 bg-cover bg-center mix-blend-overlay" />
          <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl mb-6">
              ¿Listo para comenzar?
            </h2>
            <p className="text-lg text-blue-100 mb-10 max-w-2xl mx-auto">
              Inscríbete al Diplomado en Rehabilitación Intervencionista y potencia tu práctica con técnicas de precisión.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/login">
                <Button size="lg" className="bg-white text-primary hover:bg-blue-50 shadow-lg gap-2">
                  Inscribirme Ahora
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="/">
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 gap-2">
                  <ArrowLeft className="w-5 h-5" />
                  Volver al inicio
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-background-dark py-8 border-t border-surface-highlight">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <Logo variant="dark" compact />
            <div className="flex gap-6">
              <Link href="/privacidad" className="text-slate-400 hover:text-white text-sm transition-colors">Privacidad</Link>
              <Link href="/terminos" className="text-slate-400 hover:text-white text-sm transition-colors">Términos</Link>
              <Link href="/soporte" className="text-slate-400 hover:text-white text-sm transition-colors">Soporte</Link>
            </div>
            <p className="text-slate-500 text-sm">© {new Date().getFullYear()} Diplomado Dr. Raúl Morales</p>
          </div>
        </footer>
      </main>
    </div>
  )
}
