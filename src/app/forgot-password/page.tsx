"use client"

import { useActionState } from "react"
import Link from "next/link"
import { Logo } from "@/components/ui/logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Mail, CheckCircle, AlertCircle } from "lucide-react"
import { resetPassword } from "@/app/login/actions"

export default function ForgotPasswordPage() {
  const [state, formAction, isPending] = useActionState(resetPassword, null)

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
            Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
          </p>

          {state?.success && (
            <div className="flex items-center gap-2 p-4 rounded-xl bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 text-green-700 dark:text-green-400 text-sm font-medium text-left">
              <CheckCircle className="w-5 h-5 shrink-0" />
              <span>¡Listo! Revisa tu correo electrónico para restablecer tu contraseña. Si no lo ves, revisa tu carpeta de spam.</span>
            </div>
          )}

          {state?.error && (
            <div className="flex items-center gap-2 p-4 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-700 dark:text-red-400 text-sm font-medium text-left">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{state.error}</span>
            </div>
          )}

          {!state?.success && (
            <form action={formAction} className="space-y-4 text-left">
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-slate-600 dark:text-slate-300">Correo Electrónico</Label>
                <Input 
                  type="email" 
                  name="email" 
                  placeholder="nombre@correo.com" 
                  required 
                  className="h-11 rounded-xl"
                />
              </div>
              <Button 
                type="submit" 
                disabled={isPending} 
                className="w-full h-11 rounded-xl font-bold gap-2"
              >
                <Mail className="w-4 h-4" />
                {isPending ? "Enviando..." : "Enviar enlace de recuperación"}
              </Button>
            </form>
          )}

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
