"use client"

import { useState, useActionState } from "react"
import Link from "next/link"
import { useFormStatus } from "react-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, ArrowLeft, CheckCircle, Smartphone, Mail, Lock, Stethoscope, MapPin, BadgeCheck, School, Users, User, CircleHelp, Loader2 } from "lucide-react"
import { Logo } from "@/components/ui/logo"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { signup, type RegisterState } from "./actions"

const initialState = {
  message: '',
  errors: {}

}

export default function RegisterPage() {
  const [step, setStep] = useState(1)
const totalSteps = 3
  const progress = (step / totalSteps) * 100
  
  // Form Data State
  const [formData, setFormData] = useState({
    fullName: '',
    license: '',
    specialty: '',
    state: '',
    experience: '',
    interest: '',
    email: '',
    phone: '',
    password: ''
  })

  // Server Action State
  // React 19: useActionState returns [state, action, isPending]
  // We don't use isPending here because StepThree uses useFormStatus
  const [state, dispatch] = useActionState(signup, initialState)

  const handleNext = () => {
    if (step < totalSteps) setStep(step + 1)
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const updateFormData = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }))

  }

  return (
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-sans antialiased selection:bg-primary/30 selection:text-primary">
      
{/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-background-dark/5 backdrop-blur-sm sticky top-0 z-10">
        <Logo variant="light" compact />
        <Link href="/login" className="text-sm font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors">
          Ya tengo cuenta
        </Link>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-5xl flex flex-col lg:flex-row gap-12 items-start justify-center">
          
          {/* Left Column: Info (Desktop) */}
          <div className="hidden lg:flex flex-col flex-1 gap-8 pt-10">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4 border border-primary/20">
                Registro de Médicos
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white leading-tight mb-4">
                Únete a la comunidad líder en educación continua.
              </h1>
              <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed max-w-md">
                Accede a diplomados, certificaciones y recursos exclusivos validados por las principales instituciones de salud en México.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="bg-white dark:bg-surface-dark p-4 rounded-xl border border-slate-200 dark:border-border/10 flex flex-col gap-2">
                <School className="text-primary w-8 h-8" />
                <h3 className="font-bold text-slate-900 dark:text-white">Certificaciones</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">Avaladas por consejos</p>
              </div>
              <div className="bg-white dark:bg-surface-dark p-4 rounded-xl border border-slate-200 dark:border-border/10 flex flex-col gap-2">
                <Users className="text-primary w-8 h-8" />
                <h3 className="font-bold text-slate-900 dark:text-white">Networking</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">Conecta con colegas</p>
              </div>
            </div>
          </div>

          {/* Right Column: Registration Form */}
          <div className="w-full lg:max-w-[500px] flex-1">
            <div className="bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-border/10 shadow-xl overflow-hidden">
              
              {/* Progress Header */}
              <div className="p-6 border-b border-slate-100 dark:border-border/10 bg-slate-50 dark:bg-[#151c24]">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-primary">Paso {step} de {totalSteps}</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    {step === 1 && "Información Profesional"}
                    {step === 2 && "Perfil de Interés"}
                    {step === 3 && "Cuenta y Seguridad"}
                  </span>
                </div>
                <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full transition-all duration-500 ease-in-out" 
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Form Content */}
              <div className="p-6 sm:p-8">
                {step === 1 && <StepOne formData={formData} updateFormData={updateFormData} onNext={handleNext} />}
                {step === 2 && <StepTwo formData={formData} updateFormData={updateFormData} onNext={handleNext} onBack={handleBack} />}
                
                {step === 3 && (
                    <form action={dispatch}>
                        {/* Hidden inputs to pass data from previous steps */}
                        <input type="hidden" name="fullName" value={formData.fullName} />
                        <input type="hidden" name="license" value={formData.license} />
                        <input type="hidden" name="specialty" value={formData.specialty} />
                        <input type="hidden" name="state" value={formData.state} />
                        <input type="hidden" name="experience" value={formData.experience} />
                        <input type="hidden" name="interest" value={formData.interest} />
                        
                        <StepThree formData={formData} updateFormData={updateFormData} onBack={handleBack} serverState={state} />
                    </form>
                )}
              </div>

              {/* Footer inside card */}
              <div className="px-6 py-4 bg-slate-50 dark:bg-[#151c24] border-t border-slate-100 dark:border-border/10 text-center">
                <p className="text-xs text-slate-400 dark:text-slate-500">
                  Al registrarte, aceptas nuestros <a className="underline hover:text-slate-600 dark:hover:text-slate-300" href="#">Términos de Servicio</a> y <a className="underline hover:text-slate-600 dark:hover:text-slate-300" href="#">Política de Privacidad</a>.
                </p>
              </div>

            </div>

          </div>
        </div>
      </main>
    </div>
  )
}

interface RegisterFormData {
  fullName: string
  license: string
  specialty: string
  state: string
  experience: string
  interest: string
  email: string
  phone: string
  password: string
}

function StepOne({ formData, updateFormData, onNext }: { formData: RegisterFormData, updateFormData: (k:string, v:string) => void, onNext: () => void }) {
  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="text-center lg:text-left">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Crear nueva cuenta</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Completa tus datos profesionales para validar tu perfil médico.
        </p>
      </div>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="fullname">Nombre Completo</label>
          <div className="relative">
            <User className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
            <Input 
                id="fullname" 
                placeholder="Dr. Juan Pérez" 
                className="pl-10" 
                value={formData.fullName}
                onChange={(e) => updateFormData('fullName', e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="license">Cédula Profesional</label>
            <CircleHelp className="h-4 w-4 text-slate-400 cursor-help" />
          </div>
          <div className="relative">
            <BadgeCheck className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
            <Input 
                id="license" 
                placeholder="12345678" 
                className="pl-10" 
                value={formData.license}
                onChange={(e) => updateFormData('license', e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Especialidad</label>
          <div className="relative">
             <Stethoscope className="absolute left-3 top-3 h-5 w-5 text-slate-400 z-10" />
             <Select value={formData.specialty} onValueChange={(val) => updateFormData('specialty', val)}>
              <SelectTrigger className="pl-10 w-full">
                <SelectValue placeholder="Selecciona especialidad" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Medicina General">Medicina General</SelectItem>
                <SelectItem value="Radiología">Radiología</SelectItem>
                <SelectItem value="Traumatología">Traumatología</SelectItem>
                <SelectItem value="Rehabilitación">Rehabilitación</SelectItem>
                <SelectItem value="Otra">Otra</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

         <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Estado</label>
          <div className="relative">
             <MapPin className="absolute left-3 top-3 h-5 w-5 text-slate-400 z-10" />
             <Select value={formData.state} onValueChange={(val) => updateFormData('state', val)}>
              <SelectTrigger className="pl-10 w-full">
                <SelectValue placeholder="Selecciona estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Ciudad de México">Ciudad de México</SelectItem>
                <SelectItem value="Jalisco">Jalisco</SelectItem>
                <SelectItem value="Nuevo León">Nuevo León</SelectItem>
                <SelectItem value="Otro">Otro</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <Button onClick={onNext} className="w-full h-12 text-base font-bold shadow-lg shadow-primary/20">
        Siguiente: Personalizar Perfil
        <ArrowRight className="ml-2 h-4 w-4" />

      </Button>
    </div>
  )
}

function StepTwo({ formData, updateFormData, onNext, onBack }: { formData: RegisterFormData, updateFormData: (k:string, v:string) => void, onNext: () => void, onBack: () => void }) {
  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="text-center lg:text-left">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Experiencia</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Ayúdanos a recomendarte el mejor contenido.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300">Nivel de Experiencia en USG</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {['Principiante', 'Intermedio', 'Avanzado'].map((level) => (
                <div 
                    key={level} 
                    className={`border rounded-lg p-4 cursor-pointer transition-all text-center ${formData.experience === level ? 'border-primary bg-primary/10 text-primary font-bold' : 'hover:border-primary hover:bg-primary/5'}`}
                    onClick={() => updateFormData('experience', level)}
                >
                    <span className="block">{level}</span>
                </div>
            ))}
        </div>

        <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300 mt-4">Área de Interés Principal</h3>
        <div className="grid grid-cols-2 gap-3">
             {['Miembro Superior', 'Miembro Inferior', 'Columna', 'Intervencionismo'].map((area) => (
                <div 
                    key={area} 
                    className={`border rounded-lg p-3 cursor-pointer transition-all flex items-center gap-2 ${formData.interest === area ? 'border-primary bg-primary/10 text-primary font-bold' : 'hover:border-primary hover:bg-primary/5'}`}
                    onClick={() => updateFormData('interest', area)}
                >
                    <div className={`h-2 w-2 rounded-full ${formData.interest === area ? 'bg-primary' : 'bg-slate-300'}`}></div>
                    <span className="text-sm">{area}</span>
                </div>
            ))}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mt-4">
          <Button variant="outline" onClick={onBack} className="w-full sm:w-1/3 h-12 flex items-center justify-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Atrás
          </Button>
        <Button onClick={onNext} className="w-full sm:w-2/3 h-12 text-base font-bold shadow-lg shadow-primary/20">
            Siguiente: Cuenta
            <ArrowRight className="ml-2 h-4 w-4" />

        </Button>
      </div>
    </div>
  )
}

function StepThree({ formData, updateFormData, onBack, serverState }: { formData: RegisterFormData, updateFormData: (k:string, v:string) => void, onBack: () => void, serverState: RegisterState }) {
    const { pending } = useFormStatus()


    return (
      <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-right-4 duration-300">
        <div className="text-center lg:text-left">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Cuenta y Seguridad</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Establece tus credenciales de acceso.
          </p>
        </div>
  
        <div className="space-y-4">
            {serverState?.message && (
                <div className="p-3 rounded-lg bg-red-100 border border-red-200 text-red-700 text-sm">
                    {serverState.message}
                </div>
            )}

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="email">Correo Electrónico</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
              <Input 
                id="email" 
                name="email"
                type="email" 
                placeholder="nombre@correo.com" 
                className="pl-10" 
                value={formData.email}
                onChange={(e) => updateFormData('email', e.target.value)}
              />
            </div>
            {serverState?.errors?.email && (
                <p className="text-xs text-red-500">{serverState.errors.email[0]}</p>
            )}
          </div>
  
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="phone">Celular</label>
            <div className="relative">
              <Smartphone className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
              <Input 
                id="phone" 
                name="phone"
                type="tel" 
                placeholder="55 1234 5678" 
                className="pl-10" 
                value={formData.phone}
                onChange={(e) => updateFormData('phone', e.target.value)}
              />
            </div>
            {serverState?.errors?.phone && (
                <p className="text-xs text-red-500">{serverState.errors.phone[0]}</p>
            )}
          </div>
  
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="password">Contraseña</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
              <Input 
                id="password" 
                name="password"
                type="password" 
                placeholder="••••••••" 
                className="pl-10"
                value={formData.password}
                onChange={(e) => updateFormData('password', e.target.value)}
              />
            </div>
            {serverState?.errors?.password && (
                <p className="text-xs text-red-500">{serverState.errors.password[0]}</p>
            )}
          </div>
        </div>
  
        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          <Button variant="outline" type="button" onClick={onBack} disabled={pending} className="w-full sm:w-1/3 h-12">
              Atrás
          </Button>
          <Button disabled={pending} type="submit" className="w-full sm:w-2/3 h-12 text-base font-bold bg-green-600 hover:bg-green-700 shadow-lg shadow-green-600/20">
              {pending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Registrando...
                  </>
              ) : (
                  <>
                    Finalizar Registro
                    <CheckCircle className="ml-2 h-4 w-4" />
                  </>
              )}
          </Button>
        </div>
      </div>
    )
  }


