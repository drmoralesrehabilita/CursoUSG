"use client"

import { useState } from "react"
import { useActionState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { 
  ArrowRight, 
  ArrowLeft, 
  Stethoscope, 
  User, 
  Phone, 
  MapPin, 
  Mail, 
  Lock,
  ChevronRight,
  ShieldCheck,
  CheckCircle2
} from "lucide-react"
import Link from "next/link"
import { signup } from "./actions"

const initialState = {
  message: "",
  errors: {},
}

export default function RegisterPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    fullName: "",
    licenseId: "",
    specialty: "",
    state: "",
    experience: "",
    interest: [] as string[],
    email: "",
    phone: "",
    password: "",
  })

  const [state, dispatch] = useActionState(signup, initialState)

  const handleNext = () => setStep(step + 1)
  const handleBack = () => setStep(step - 1)

  const updateFormData = (updates: any) => {
    setFormData((prev) => ({ ...prev, ...updates }))
  }

  return (
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-sans antialiased selection:bg-primary/30 selection:text-primary">
      
      {/* Header / Brand */}
      <header className="px-6 py-6 lg:px-12 flex justify-between items-center relative z-10">
         <Link href="/" className="flex items-center gap-2 group">
            <span className="material-symbols-outlined text-3xl text-primary relative z-10">sensors</span>
            <div className="flex flex-col items-start translate-y-0.5">
               <span className="text-base font-black tracking-tighter leading-none text-slate-900 dark:text-white">DR. RAÚL</span>
               <span className="text-base font-black tracking-tighter leading-none text-primary -mt-1">MORALES</span>
            </div>
         </Link>
         <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest hidden sm:block">
           Registro de Alumnos
         </p>
      </header>

      {/* Main Register Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 bg-background-light dark:bg-background-dark transition-colors duration-500 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

        <div className="w-full lg:max-w-[500px] flex-1">
          <div className="bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-border/10 shadow-xl overflow-hidden">
            
            {/* Progress Header */}
            <div className="bg-slate-50 dark:bg-background-dark/50 px-6 sm:px-8 py-6 border-b border-slate-100 dark:border-border/5">
               <div className="flex justify-between items-center mb-4">
                  <h2 className="text-sm font-bold uppercase tracking-widest text-primary">Paso {step} de 3</h2>
                  <div className="flex gap-1">
                     {[1, 2, 3].map((s) => (
                       <div key={s} className={`h-1 rounded-full transition-all duration-300 ${s <= step ? 'w-6 bg-primary' : 'w-2 bg-slate-200 dark:bg-white/10'}`} />
                     ))}
                  </div>
               </div>
               <h1 className="text-2xl font-black text-slate-900 dark:text-white leading-tight">
                  {step === 1 && "Información Profesional"}
                  {step === 2 && "Áreas de Interés"}
                  {step === 3 && "Configura tu Cuenta"}
               </h1>
            </div>

            <div className="p-6 sm:p-8">
              {step === 1 && <StepOne formData={formData} updateFormData={updateFormData} onNext={handleNext} />}
              {step === 2 && <StepTwo formData={formData} updateFormData={updateFormData} onNext={handleNext} onBack={handleBack} />}
              {step === 3 && (
                <form action={dispatch}>
                  {/* Hidden inputs to pass data from previous steps */}
                  <input type="hidden" name="fullName" value={formData.fullName} />
                  <input type="hidden" name="licenseId" value={formData.licenseId} />
                  <input type="hidden" name="specialty" value={formData.specialty} />
                  <input type="hidden" name="state" value={formData.state} />
                  <input type="hidden" name="experience" value={formData.experience} />
                  <input type="hidden" name="interest" value={formData.interest.join(',')} />
                  
                  <StepThree formData={formData} updateFormData={updateFormData} onBack={handleBack} serverState={state} />
                </form>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 sm:px-8 py-6 bg-slate-50/50 dark:bg-white/5 border-t border-slate-100 dark:border-border/5 text-center">
               <p className="text-xs text-slate-500 dark:text-slate-400 font-medium tracking-tight">
                 ¿Ya tienes una cuenta? <Link href="/login" className="text-primary font-bold hover:underline">Inicia sesión</Link>
               </p>
            </div>
          </div>
          
          <div className="mt-8 flex items-center justify-center gap-4 text-slate-400 dark:text-slate-500">
             <div className="flex items-center gap-1.5 opacity-60">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Protección SSL</span>
             </div>
             <div className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
             <div className="flex items-center gap-1.5 opacity-60">
                <CheckCircle2 className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Aviso de Privacidad</span>
             </div>
          </div>
        </div>
      </main>
    </div>
  )
}

function StepOne({ formData, updateFormData, onNext }: any) {
  const isComplete = formData.fullName && formData.licenseId && formData.specialty
  
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="text-xs font-bold uppercase tracking-wider text-slate-500">Nombre Completo</Label>
          <div className="relative">
            <Input 
              value={formData.fullName}
              onChange={(e) => updateFormData({ fullName: e.target.value })}
              className="h-12 bg-slate-50 dark:bg-background-dark border-slate-200 dark:border-border/10 rounded-xl pl-10" 
              placeholder="Dr. Roberto Pérez" 
            />
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          </div>
        </div>
        <div className="space-y-2">
          <Label className="text-xs font-bold uppercase tracking-wider text-slate-500">Cédula Profesional</Label>
          <div className="relative">
             <Input 
              value={formData.licenseId}
              onChange={(e) => updateFormData({ licenseId: e.target.value })}
              className="h-12 bg-slate-50 dark:bg-background-dark border-slate-200 dark:border-border/10 rounded-xl pl-10" 
              placeholder="12345678" 
            />
             <CheckCircle2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase tracking-wider text-slate-500">Especialidad</Label>
            <Select value={formData.specialty} onValueChange={(val) => updateFormData({ specialty: val })}>
              <SelectTrigger className="h-12 bg-slate-50 dark:bg-background-dark border-slate-200 dark:border-border/10 rounded-xl">
                 <SelectValue placeholder="Seleccionar" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-slate-200 dark:border-border/10">
                <SelectItem value="rehabil">Rehabilitación</SelectItem>
                <SelectItem value="radio">Radiología</SelectItem>
                <SelectItem value="anest">Anestesiología</SelectItem>
                <SelectItem value="trauma">Traumatología</SelectItem>
                <SelectItem value="other">Otra</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase tracking-wider text-slate-500">Estado / Provincia</Label>
            <div className="relative">
              <Input 
                value={formData.state}
                onChange={(e) => updateFormData({ state: e.target.value })}
                className="h-12 bg-slate-50 dark:bg-background-dark border-slate-200 dark:border-border/10 rounded-xl pl-10" 
                placeholder="CDMX" 
              />
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            </div>
          </div>
        </div>
      </div>
      <Button 
        onClick={onNext} 
        disabled={!isComplete}
        className="w-full h-12 rounded-xl bg-primary hover:bg-blue-600 text-white font-bold group"
      >
        Continuar <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
      </Button>
    </div>
  )
}

function StepTwo({ formData, updateFormData, onNext, onBack }: any) {
  const interests = [
    { id: 'msk', label: 'Musculoesquelético' },
    { id: 'nerv', label: 'Nervio Periférico' },
    { id: 'inter', label: 'Intervencionismo' },
    { id: 'vasc', label: 'Vascular Doppler' },
  ]
  
  const toggleInterest = (id: string) => {
    const current = [...formData.interest]
    const idx = current.indexOf(id)
    if (idx > -1) current.splice(idx, 1)
    else current.push(id)
    updateFormData({ interest: current })
  }

  return (
    <div className="space-y-8">
      <div className="space-y-6">
         <div className="space-y-3">
            <Label className="text-xs font-bold uppercase tracking-wider text-slate-500">Experiencia en USG</Label>
            <div className="grid grid-cols-2 gap-3">
               {['Ninguna', 'Básica', 'Intermedia', 'Avanzada'].map((lvl) => (
                 <button 
                  key={lvl}
                  onClick={() => updateFormData({ experience: lvl })}
                  className={`p-3 text-xs font-bold rounded-xl border transition-all ${
                    formData.experience === lvl 
                      ? "bg-primary/10 border-primary text-primary" 
                      : "bg-slate-50 dark:bg-background-dark border-slate-200 dark:border-border/10 text-slate-500 hover:border-primary/40"
                  }`}
                 >
                   {lvl}
                 </button>
               ))}
            </div>
         </div>

         <div className="space-y-4">
            <Label className="text-xs font-bold uppercase tracking-wider text-slate-500">Áreas de Mayor Interés</Label>
            <div className="space-y-3">
               {interests.map((item) => (
                 <div key={item.id} className="flex items-center gap-3 p-4 rounded-xl border border-slate-100 dark:border-border/5 bg-slate-50/50 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10 transition-colors cursor-pointer group" onClick={() => toggleInterest(item.id)}>
                    <Checkbox checked={formData.interest.includes(item.id)} className="border-slate-300 data-[state=checked]:bg-primary data-[state=checked]:border-primary" />
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-300 group-hover:text-primary transition-colors">{item.label}</span>
                    <ChevronRight className="w-4 h-4 ml-auto text-slate-300 group-hover:text-primary opacity-0 group-hover:opacity-100 transition-all" />
                 </div>
               ))}
            </div>
         </div>
      </div>
      <div className="flex gap-4">
        <Button onClick={onBack} variant="outline" className="h-12 px-6 rounded-xl border-slate-200 dark:border-border/10 font-bold">
           <ArrowLeft className="w-4 h-4 mr-2" /> Atrás
        </Button>
        <Button onClick={onNext} className="flex-1 h-12 rounded-xl bg-primary hover:bg-blue-600 font-bold group">
           Finalizar Perfil <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  )
}

function StepThree({ formData, updateFormData, onBack, serverState }: any) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="text-xs font-bold uppercase tracking-wider text-slate-500">Correo Electrónico</Label>
          <div className="relative">
            <Input 
              name="email"
              type="email"
              value={formData.email}
              onChange={(e) => updateFormData({ email: e.target.value })}
              className="h-12 bg-slate-50 dark:bg-background-dark border-slate-200 dark:border-border/10 rounded-xl pl-10" 
              placeholder="raul@medico.com" 
              required
            />
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          </div>
        </div>
        <div className="space-y-2">
          <Label className="text-xs font-bold uppercase tracking-wider text-slate-500">Teléfono (WhatsApp)</Label>
          <div className="relative">
            <Input 
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => updateFormData({ phone: e.target.value })}
              className="h-12 bg-slate-50 dark:bg-background-dark border-slate-200 dark:border-border/10 rounded-xl pl-10" 
              placeholder="+52 55..." 
              required
            />
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          </div>
        </div>
        <div className="space-y-2">
          <Label className="text-xs font-bold uppercase tracking-wider text-slate-500">Crear Contraseña</Label>
          <div className="relative">
            <Input 
              name="password"
              type="password"
              value={formData.password}
              onChange={(e) => updateFormData({ password: e.target.value })}
              className="h-12 bg-slate-50 dark:bg-background-dark border-slate-200 dark:border-border/10 rounded-xl pl-10" 
              placeholder="••••••••" 
              required
            />
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          </div>
          <p className="text-[10px] text-slate-400 font-medium">Mínimo 8 caracteres, incluye una letra y un número.</p>
        </div>
      </div>

      {serverState?.message && (
        <div className="p-3 rounded-lg bg-red-50 border border-red-100 text-red-600 text-xs font-bold flex items-center gap-2 animate-shake">
           <span className="material-symbols-outlined text-base">error</span>
           {serverState.message}
        </div>
      )}

      <div className="flex gap-4 pt-2">
        <Button type="button" onClick={onBack} variant="outline" className="h-12 px-6 rounded-xl border-slate-200 font-bold">
           <ArrowLeft className="w-4 h-4 mr-2" />
        </Button>
        <Button type="submit" className="flex-1 h-12 rounded-xl bg-primary hover:bg-blue-600 font-bold shadow-lg shadow-primary/20">
           Crear Cuenta <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
      
      <p className="text-[10px] text-center text-slate-400 leading-relaxed max-w-xs mx-auto">
        Al hacer clic en crear cuenta, aceptas nuestros <Link href="#" className="underline">Términos de Servicio</Link> y <Link href="#" className="underline">Política de Privacidad</Link>.
      </p>
    </div>
  )
}
