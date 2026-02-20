"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { login } from "./actions"
import Link from "next/link"
import { Mail, Lock, ArrowRight, Eye, EyeOff } from "lucide-react"
import { Logo } from "@/components/ui/logo"
import { useState } from "react"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="min-h-screen flex flex-col lg:flex-row overflow-hidden bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100">
      
      {/* Left Section: Hero Image */}
      <div className="relative hidden lg:flex w-full lg:w-1/2 bg-cover bg-center items-end p-12 lg:p-16" 
           style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCd8e3eM0ipCCVVU-WEi1nHcQ1d50V3obgSMOXphDxWs-5IBjwL-mX-ppHP35XgO4rwdVsb9TO74cBuuoMlq_pjxC-seD-qoM9QhiA4vtTw30RIChGZLJPcxvqQfPifgBbSu4lZtoRU36DIVTafHglUzWPGYoBgMmyhJcVWOXT7P3iGO7xz50820RQGq6bEmIqDiEBnq2HFXwgNdREktZ7WEhS2kgTGHrxDYDaKps5bXm8lnsaSUiPKf158006ZIYzf3j7wpgde1V35")' }}>
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-linear-to-t from-background-dark/90 via-background-dark/40 to-transparent"></div>
        {/* Content over Image */}
        <div className="relative z-10 flex flex-col gap-4 max-w-lg">
          <Logo variant="dark" showSubtitle />
          <h1 className="text-4xl font-black leading-tight text-white tracking-tight">
            Excelencia en educación médica continua.
          </h1>
          <p className="text-slate-300 text-lg leading-relaxed font-medium">
            Acceda a la biblioteca más completa de casos clínicos, simposios y recursos de actualización para especialistas en México.
          </p>
        </div>
      </div>

      {/* Right Section: Login Form */}
      <div className="flex flex-1 flex-col items-center justify-center p-6 bg-background-light dark:bg-background-dark lg:w-1/2">
        <div className="w-full max-w-md flex flex-col gap-8">
          
          {/* Mobile Logo (Visible only on small screens) */}
          <div className="lg:hidden flex justify-center mb-4">
            <Logo variant="light" compact />
          </div>

          {/* Form Header */}
          <div className="flex flex-col gap-2 text-center lg:text-left">
            <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
              Bienvenido, Doctor/a
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-base">
              Ingrese sus credenciales para acceder a la plataforma.
            </p>
          </div>

          {/* Form Fields */}
          <form action={login} className="flex flex-col gap-5">
            {/* Email Input */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                Correo institucional o personal
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-4 text-slate-400">
                  <Mail className="w-5 h-5" />
                </div>
                <Input 
                  id="email" 
                  name="email" 
                  type="email" 
                  required 
                  placeholder="ejemplo@hospital.com" 
                  className="w-full h-12 rounded-lg bg-white dark:bg-[#1c2126] border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white pl-11 pr-4 focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-transparent transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500" 
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label htmlFor="password" className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                  Contraseña
                </label>
              </div>
              <div className="relative flex items-center">
                <div className="absolute left-4 text-slate-400">
                  <Lock className="w-5 h-5" />
                </div>
                <Input 
                  id="password" 
                  name="password" 
                  type={showPassword ? "text" : "password"} 
                  required 
                  placeholder="••••••••" 
                  className="w-full h-12 rounded-lg bg-white dark:bg-[#1c2126] border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white pl-11 pr-12 focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-transparent transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500" 
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 flex items-center"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <div className="flex justify-end mt-1">
                <Link className="text-sm font-semibold text-primary hover:text-blue-500 transition-colors" href="#">
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
            </div>

            {/* Submit Button */}
            <Button type="submit" className="mt-2 w-full h-12 rounded-lg bg-primary hover:bg-blue-600 text-white font-bold text-base transition-colors flex items-center justify-center gap-2 shadow-lg shadow-primary/20">
              <span>Iniciar Sesión</span>
              <ArrowRight className="w-5 h-5" />
            </Button>
          </form>

          {/* Divider */}
          <div className="relative flex items-center py-2">
            <div className="grow border-t border-slate-300 dark:border-slate-700"></div>
            <span className="shrink-0 mx-4 text-slate-400 text-sm">¿Nuevo en la plataforma?</span>
            <div className="grow border-t border-slate-300 dark:border-slate-700"></div>
          </div>

          {/* Create Account Link */}
          <div className="text-center">
            <Link 
              href="/register" 
              className="inline-flex items-center justify-center px-6 py-3 border border-slate-300 dark:border-slate-700 rounded-lg text-sm font-bold text-slate-700 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors w-full"
            >
              Crear una cuenta
            </Link>
          </div>

          {/* Trust Badges / Footer */}
          <div className="mt-auto pt-8 flex flex-col items-center gap-4 opacity-60">
            <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold">Avalado por</p>
            <div className="flex gap-6 items-center grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
              {/* Placeholder logos for medical associations */}
              <div className="h-8 w-auto flex items-center justify-center font-bold text-slate-400 dark:text-slate-500 border border-slate-300 dark:border-slate-700 px-2 rounded">
                ASOC_MED
              </div>
              <div className="h-8 w-auto flex items-center justify-center font-bold text-slate-400 dark:text-slate-500 border border-slate-300 dark:border-slate-700 px-2 rounded">
                FEMECOG
              </div>
              <div className="h-8 w-auto flex items-center justify-center font-bold text-slate-400 dark:text-slate-500 border border-slate-300 dark:border-slate-700 px-2 rounded">
                CMIM
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
