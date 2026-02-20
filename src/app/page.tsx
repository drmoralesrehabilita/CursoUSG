"use client"

import Link from "next/link"
import { Logo } from "@/components/ui/logo"
import { 
  Menu, 
  ArrowRight, 
  PlayCircle, 
  Play, 
  Volume2, 
  Maximize, 
  Scan, 
  Eye, 
  Crosshair, 
  BookOpen, 
  Hand, 
  Footprints, 
  Syringe, 
  Download,
  Hospital,
  GraduationCap,
  FlaskConical,
  Dna,
  HeartPulse
} from "lucide-react"
import { Button } from "@/components/ui/button"

export default function LandingPage() {
  return (
    <div className="min-h-screen font-sans bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 overflow-x-hidden antialiased">
      {/* Navbar */}
      <div className="sticky top-0 z-50 w-full border-b border-surface-highlight bg-background-dark/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Logo variant="dark" compact />
          <nav className="hidden md:flex items-center gap-8">
            <Link className="text-slate-300 hover:text-white text-sm font-medium transition-colors" href="#program">Programa</Link>
            <Link className="text-slate-300 hover:text-white text-sm font-medium transition-colors" href="#methodology">Metodología</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
                <Button className="hidden sm:flex h-9 items-center justify-center rounded-lg bg-primary px-4 text-sm font-bold text-white transition hover:bg-primary/90">
                    Inscribirme Ahora
                </Button>
            </Link>
            <button className="sm:hidden text-white">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      <main className="flex flex-col">
        {/* Hero Section */}
        <section className="relative flex min-h-[600px] flex-col justify-center overflow-hidden py-16 lg:py-24">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-linear-to-r from-background-dark via-background-dark/90 to-transparent z-10"></div>
            <div className="absolute inset-0 bg-linear-to-t from-background-dark via-transparent to-transparent z-10"></div>
            <img 
                alt="Doctor performing ultrasound guided procedure in dark room" 
                className="h-full w-full object-cover opacity-60" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLvALLsJGZ5dQL1KrpVdL29z2luaqM1sWjPhoQxywfzZx7BTo-Ku18z5r7z2tc_oCAAJF0NvD_62VJD2V8MolhlHeXrKRdbFupQb7XWmoIm1ioeAYgU4jWcEOaUEFNWRz6tsz-IJ2q_JSOhOk7-UFP2aiqUmd25wQtU6CS6GC6lo83yAKotWdSWtwJitHwjhTJpG2t91D1DL6VJEU393PvV6KsAGD_QuCngHR6aunqn05FVVKRP0j12GBuNwPpkAn-HTSHcs-tBYBr"
            />
          </div>
          <div className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 mb-6 backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                <span className="text-xs font-medium text-primary-300 uppercase tracking-wider">Nueva Cohorte Abierta</span>
              </div>
              <h1 className="text-4xl font-black text-white sm:text-5xl md:text-6xl lg:text-7xl tracking-tighter mb-6 leading-[1.1]">
                Diplomado Internacional de <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-blue-400">Rehabilitación Intervencionista</span>
              </h1>
              <p className="mt-4 max-w-xl text-lg text-slate-300 leading-relaxed mb-8">
                Domina procedimientos guiados por ecografía con la plataforma de aprendizaje de doble perspectiva más avanzada del mundo. Eleva tu práctica con técnicas de precisión.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/login">
                  <button className="h-12 px-8 rounded-lg bg-primary text-white font-bold text-base transition-all hover:bg-blue-600 hover:shadow-[0_0_20px_rgba(23,115,207,0.5)] flex items-center justify-center gap-2 w-full sm:w-auto">
                    <span>Inscribirme Ahora</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
                <button className="h-12 px-8 rounded-lg border border-slate-600 bg-surface-dark/50 backdrop-blur text-white font-medium hover:bg-surface-dark transition-colors flex items-center justify-center gap-2 w-full sm:w-auto">
                  <PlayCircle className="w-5 h-5" />
                  <span>Ver Temario</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Partners Section */}
        <section className="border-y border-surface-highlight bg-surface-dark py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="text-center text-sm font-medium text-slate-500 mb-6 uppercase tracking-widest">Respaldo Científico Por</p>
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5 items-center justify-items-center opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
              <div className="flex items-center gap-2 font-bold text-xl text-white"><Hospital className="w-8 h-8" />ASOC_MED</div>
              <div className="flex items-center gap-2 font-bold text-xl text-white"><GraduationCap className="w-8 h-8" />UNIV_INTL</div>
              <div className="flex items-center gap-2 font-bold text-xl text-white"><FlaskConical className="w-8 h-8" />CONSEJO_CI</div>
              <div className="flex items-center gap-2 font-bold text-xl text-white"><Dna className="w-8 h-8" />NEURO_LAB</div>
              <div className="hidden lg:flex items-center gap-2 font-bold text-xl text-white"><HeartPulse className="w-8 h-8" />INST_CARD</div>
            </div>
          </div>
        </section>

        {/* Methodology Section */}
        <section className="py-20 bg-background-dark relative" id="methodology">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#293038 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1">
                <div className="relative rounded-2xl border border-surface-highlight bg-surface-dark p-2 shadow-2xl shadow-blue-900/20">
                  <div className="flex items-center justify-between px-4 py-2 bg-black/40 rounded-t-lg border-b border-surface-highlight mb-1">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="text-xs text-slate-400 font-mono">LIVE_FEED_01.mp4</div>
                  </div>
                  <div className="grid grid-cols-2 gap-1 h-64 sm:h-80 bg-black">
                    <div className="relative w-full h-full overflow-hidden group">
                      <img alt="Close up of medical procedure on arm" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCx17edKVZNneG8QGArWTBxXXm_CjUvMkyzub-eZJXOLnDiuTBQZgMndaHQHOK005BybDUcvSo79sgwSxtKegTl-fLSUN78d5ubBmbOEIldX7xr8B7liLVWkfQHxGVq1vTc4Wl6TyASF4reBN__fJ24Nor-90ljNFzhLRpxcaZAzxnr7sYg8wUldH7jJah4PxhbyugVOJ7YplhH1J2H6mgBvIYauAw7S1uwLvTdx7pNrlvofECbjXXlwrlQxAQa3q97v0x27pmQowG9"/>
                      <div className="absolute bottom-2 left-2 bg-black/60 px-2 py-1 rounded text-[10px] text-white font-mono border border-white/10">CAM EXT 1</div>
                    </div>
                    <div className="relative w-full h-full overflow-hidden group bg-slate-900">
                      <img alt="Ultrasound monitor screen showing muscle tissue" className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity mix-blend-luminosity" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCXDZvhn7NnXO6vTSXiYm-5Xfqy_x4EVyeEbu3160WICZnXGdp5p7S6JHZPV8b-Qahui3iabA-2gKZrqcHPHYZ_2uWT8jtHChjB4KUIZfoM60tc4zcN_i1bqV3jvtuIKjSShqdhvn3u7E0lb5g-Mm-UI0D5-kflPVJecYJd10pm0ZN2OBQx5SO5JWSKGrHo08_hpz3NbtmQLWE39Xtbt34EotRfrt5fVPM1iCxIcQKIIb7T4veND3v7nPXLPFengz95MRCVnf5xokRL"/>
                      <div className="absolute bottom-2 left-2 bg-black/60 px-2 py-1 rounded text-[10px] text-white font-mono border border-white/10">FEED ECO</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2 flex flex-col gap-6">
                <div className="inline-flex w-fit items-center gap-2 rounded-lg bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                  <Scan className="w-5 h-5" />
                  Tecnología de Doble Pantalla
                </div>
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  La Ventaja de la Pantalla Dual
                </h2>
                <p className="text-lg text-slate-400">
                  Experimenta nuestro exclusivo reproductor de video dual. Observa la anatomía externa y la colocación de la aguja lado a lado con la señal de ultrasonido en tiempo real para una precisión inigualable.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-background-dark py-12 border-t border-surface-highlight">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <Logo variant="dark" compact />
              <div className="text-slate-500 text-sm">
                © 2023 Diplomado en Rehabilitación Intervencionista. Todos los derechos reservados.
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}
