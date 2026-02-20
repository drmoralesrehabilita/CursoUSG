import Link from "next/link"
import { Logo } from "@/components/ui/logo"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background-dark via-secondary to-background-dark flex flex-col items-center justify-center p-6 sm:p-24 overflow-hidden relative">
      {/* Background decorations */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] -z-10 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-400/10 rounded-full blur-[100px] -z-10" />

      {/* Main Container */}
      <div className="max-w-4xl w-full flex flex-col items-center text-center space-y-12 relative z-10">
        {/* Animated Logo Section */}
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <Logo variant="dark" />
        </div>

        {/* Hero Text */}
        <div className="space-y-6 max-w-2xl animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200">
          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.1]">
            Domina la <span className="text-primary italic">Ecografía</span> Intervencionista
          </h1>
          <p className="text-gray-400 text-lg sm:text-xl leading-relaxed">
            Formación avanzada en rehabilitación y procedimientos mínimamente invasivos guiados por imagen para profesionales de la salud.
          </p>
        </div>

        {/* CTA Section */}
        <div className="flex flex-col sm:flex-row gap-5 w-full max-w-md animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-500">
          <Link 
            href="/login" 
            className="flex-1 px-8 py-4 bg-primary hover:bg-primary/90 text-white font-bold rounded-2xl transition-all shadow-[0_0_20px_rgba(30,174,250,0.3)] hover:shadow-primary/50 hover:-translate-y-1 flex items-center justify-center gap-2 group"
          >
            Comenzar Ahora
            <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span>
          </Link>
          <Link 
            href="/temario" 
            className="flex-1 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold rounded-2xl transition-all backdrop-blur-xl flex items-center justify-center gap-2"
          >
            Ver Temario
          </Link>
        </div>

        {/* Stats/Features */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-16 pt-8 border-t border-white/10 w-full animate-in fade-in duration-1000 delay-700">
          <div className="space-y-1">
            <p className="text-primary text-2xl font-bold">12+</p>
            <p className="text-gray-500 text-xs font-bold tracking-widest uppercase">Módulos</p>
          </div>
          <div className="space-y-1">
            <p className="text-primary text-2xl font-bold">50+</p>
            <p className="text-gray-500 text-xs font-bold tracking-widest uppercase">Lecciones</p>
          </div>
          <div className="hidden sm:block space-y-1">
            <p className="text-primary text-2xl font-bold">HD</p>
            <p className="text-gray-500 text-xs font-bold tracking-widest uppercase">Calidad 4K</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-8 text-gray-600 text-[10px] font-bold tracking-[0.2em] uppercase">
        © {new Date().getFullYear()} Dr. Raúl Morales — Rehabilitación Especializada
      </footer>
    </div>
  )
}
