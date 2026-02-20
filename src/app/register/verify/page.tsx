import { Button } from "@/components/ui/button"
<<<<<<< HEAD
import { Mail, ArrowRight } from "lucide-react"
=======
import { CheckCircle2, Mail, ArrowRight } from "lucide-react"
>>>>>>> origin/main
import Link from "next/link"

export default function VerifyPage() {
  return (
<<<<<<< HEAD
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background-light dark:bg-background-dark text-center">
      <div className="max-w-md w-full bg-white dark:bg-surface-dark p-8 rounded-2xl shadow-xl border border-slate-200 dark:border-border/10 flex flex-col items-center gap-6">
        
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
            <Mail className="w-8 h-8" />
        </div>

        <div className="space-y-2">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Confirma tu correo</h1>
            <p className="text-slate-500 dark:text-slate-400">
                Hemos enviado un enlace de confirmación a tu dirección de correo electrónico.
            </p>
        </div>

        <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg text-sm text-slate-600 dark:text-slate-300 w-full">
            <p>Por favor revisa tu bandeja de entrada (y spam) y haz clic en el enlace para activar tu cuenta.</p>
        </div>

        <div className="flex flex-col w-full gap-3 mt-4">
            <Link href="/login" className="w-full">
                <Button className="w-full h-12 text-base font-bold shadow-lg shadow-primary/20">
                    Ir al Login
                    <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </Link>
            
             <Link href="/" className="w-full">
                <Button variant="outline" className="w-full h-12">
                    Volver al Inicio
                </Button>
            </Link>
        </div>
=======
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-sans">
      <div className="w-full max-w-[420px] space-y-8 text-center animate-fade-in-up">
        
        {/* Animated Icon */}
        <div className="relative mx-auto w-24 h-24">
          <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full scale-110 animate-pulse" />
          <div className="relative z-10 w-full h-full bg-white dark:bg-surface-dark rounded-3xl shadow-xl border border-slate-100 dark:border-border/10 flex items-center justify-center">
             <Mail className="w-10 h-10 text-primary animate-bounce-slow" />
          </div>
          <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center border-4 border-white dark:border-background-dark shadow-lg">
             <CheckCircle2 className="w-5 h-5 text-white" />
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl font-black text-slate-900 dark:text-white leading-tight">¡Casi terminamos!</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">
             Hemos enviado un enlace de confirmación a tu correo electrónico. Por favor revisa tu bandeja de entrada y spam.
          </p>
        </div>

        <div className="bg-primary/5 dark:bg-primary/10 rounded-2xl p-6 border border-primary/10 flex flex-col gap-4">
           <div className="flex items-center gap-3 text-left">
              <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary font-bold">1</div>
              <p className="text-sm font-bold text-slate-700 dark:text-slate-300">Abre el correo de confirmación</p>
           </div>
           <div className="flex items-center gap-3 text-left">
              <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary font-bold">2</div>
              <p className="text-sm font-bold text-slate-700 dark:text-slate-300">Haz clic en el enlace para activar tu cuenta</p>
           </div>
           <div className="flex items-center gap-3 text-left">
              <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary font-bold">3</div>
              <p className="text-sm font-bold text-slate-700 dark:text-slate-300">Regresa aquí para iniciar sesión</p>
           </div>
        </div>

        <div className="space-y-4 pt-4">
           <Button asChild className="w-full h-12 rounded-xl bg-primary hover:bg-blue-600 text-white font-bold group">
             <Link href="/login">
               Ir al Inicio de Sesión <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
             </Link>
           </Button>
           <Button variant="ghost" className="text-xs font-bold text-slate-500 uppercase tracking-widest hover:text-primary">
              Volver al inicio
           </Button>
        </div>

>>>>>>> origin/main
      </div>
    </div>
  )
}
