import { Button } from "@/components/ui/button"
import { Mail, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function VerifyPage() {
  return (
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
      </div>
    </div>
  )
}
