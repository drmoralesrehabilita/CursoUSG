"use client"

import { useActionState } from "react"
import { useTheme } from "next-themes"
import { changePassword } from "@/app/login/actions"
import { logout } from "@/app/login/actions"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { 
  Lock, 
  Moon, 
  LogOut,
  ShieldCheck,
  CheckCircle,
  AlertCircle
} from "lucide-react"

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const isDarkMode = theme === "dark"

  const [state, formAction, isPending] = useActionState(changePassword, null)

  return (
    <div className="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark">
      <div className="max-w-3xl mx-auto p-4 md:p-8 space-y-8">
        
        {/* Header */}
        <div className="space-y-1">
           <h1 className="text-3xl font-black text-secondary dark:text-white">Configuración</h1>
           <p className="text-slate-500 dark:text-slate-400 font-medium">Gestiona tu cuenta, preferencias y seguridad.</p>
        </div>

        {/* Security Section */}
        <Card className="rounded-2xl border-slate-200 dark:border-border/10 bg-white dark:bg-surface-dark shadow-sm">
           <CardHeader>
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <Lock className="w-5 h-5 text-primary" />
                Cambiar Contraseña
              </CardTitle>
              <CardDescription className="font-medium">Te recomendamos usar una combinación de letras, números y símbolos.</CardDescription>
           </CardHeader>
           <CardContent>
              {state?.success && (
                <div className="mb-4 flex items-center gap-2 p-3 rounded-xl bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 text-green-700 dark:text-green-400 text-sm font-medium">
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  Contraseña actualizada exitosamente.
                </div>
              )}
              {state?.error && (
                <div className="mb-4 flex items-center gap-2 p-3 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-700 dark:text-red-400 text-sm font-medium">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {state.error}
                </div>
              )}
              <form action={formAction} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <div className="space-y-2">
                      <Label className="text-xs font-bold uppercase tracking-wider text-slate-500">Nueva Contraseña</Label>
                      <Input 
                        type="password" 
                        name="newPassword"
                        placeholder="••••••••" 
                        required
                        minLength={6}
                        className="h-11 rounded-xl bg-slate-50 dark:bg-background-dark border-slate-200 dark:border-border/10" 
                      />
                   </div>
                   <div className="space-y-2">
                      <Label className="text-xs font-bold uppercase tracking-wider text-slate-500">Confirmar Contraseña</Label>
                      <Input 
                        type="password" 
                        name="confirmPassword"
                        placeholder="••••••••" 
                        required
                        minLength={6}
                        className="h-11 rounded-xl bg-slate-50 dark:bg-background-dark border-slate-200 dark:border-border/10" 
                      />
                   </div>
                </div>
                <Button 
                  type="submit"
                  disabled={isPending}
                  className="rounded-xl bg-primary hover:bg-blue-600 text-white font-bold h-11 px-8 shadow-lg shadow-primary/20 mt-2"
                >
                   {isPending ? "Actualizando..." : "Actualizar Contraseña"}
                </Button>
              </form>
           </CardContent>
        </Card>

        {/* Preferences Section */}
        <Card className="rounded-2xl border-slate-200 dark:border-border/10 bg-white dark:bg-surface-dark shadow-sm">
           <CardHeader>
              <CardTitle className="text-lg font-bold">Preferencias</CardTitle>
           </CardHeader>
           <CardContent className="space-y-0">
              <div className="flex items-center justify-between py-4 group">
                 <div className="flex items-center gap-4">
                    <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-background-dark text-slate-400 group-hover:text-primary transition-colors">
                       <Moon className="w-5 h-5" />
                    </div>
                    <div>
                       <p className="text-sm font-bold text-slate-700 dark:text-white">Modo Oscuro</p>
                       <p className="text-xs text-slate-500 dark:text-slate-400">Alternar tema visual de la aplicación</p>
                    </div>
                 </div>
                 <Switch 
                   checked={isDarkMode} 
                   onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")} 
                   className="data-[state=checked]:bg-primary" 
                 />
              </div>
           </CardContent>
        </Card>

        {/* Privacy Status */}
        <div className="bg-secondary p-6 rounded-2xl relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl rounded-full translate-x-12 -translate-y-12" />
           <ShieldCheck className="w-8 h-8 text-primary mb-4 relative z-10" />
           <h4 className="text-white font-bold mb-2 relative z-10">Estado de Privacidad</h4>
           <p className="text-xs text-blue-100/60 leading-relaxed relative z-10">Tu cuenta cumple con todos los protocolos de seguridad actuales.</p>
        </div>

        {/* Logout */}
        <form action={logout}>
          <button 
            type="submit"
            className="w-full p-4 rounded-2xl bg-red-500/5 border border-red-500/20 flex items-center gap-3 hover:bg-red-500/10 transition-colors group"
          >
            <LogOut className="w-5 h-5 text-red-500 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-bold text-red-600">Cerrar Sesión</span>
          </button>
        </form>

      </div>
    </div>
  )
}
