"use client"

import { useState } from "react"
import { Logo } from "@/components/ui/logo"
import { requestAccess, signOutAction } from "./actions"

export default function PendingClient({
  name,
  email,
  accessRequested,
}: {
  name: string
  email: string
  accessRequested: boolean
}) {
  const [requested, setRequested] = useState(accessRequested)
  const [loading, setLoading] = useState(false)

  const handleRequest = async () => {
    setLoading(true)
    const result = await requestAccess()
    if (result.success) {
      setRequested(true)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#080B14] flex flex-col items-center justify-center p-6">
      {/* Top bar */}
      <div className="fixed top-0 left-0 right-0 border-b border-white/5 px-6 py-4 flex items-center justify-between bg-[#080B14]/90 backdrop-blur-sm z-10">
        <Logo variant="dark" compact />
        <form action={signOutAction}>
          <button
            type="submit"
            className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-sm">logout</span>
            Cerrar sesión
          </button>
        </form>
      </div>

      <div className="w-full max-w-lg text-center space-y-6 mt-16">
        {/* Icon */}
        <div className={`mx-auto w-20 h-20 rounded-full flex items-center justify-center border ${
          requested
            ? "bg-emerald-500/10 border-emerald-500/20"
            : "bg-amber-500/10 border-amber-500/20"
        }`}>
          <span className={`material-symbols-outlined text-4xl ${
            requested ? "text-emerald-400" : "text-amber-400"
          }`}>
            {requested ? "mark_email_read" : "hourglass_top"}
          </span>
        </div>

        {/* Heading */}
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">
            Bienvenido/a, {name.split(" ")[0]} 👋
          </h1>
          <p className="text-gray-400 leading-relaxed">
            {requested
              ? "Tu solicitud de acceso ha sido enviada. El Director General revisará tu perfil y activará tu cuenta en breve."
              : "Tu cuenta ha sido creada exitosamente. Solicita acceso al curso para que el Director General pueda revisar tu perfil y activar tu cuenta."}
          </p>
        </div>

        {/* Info card */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-left space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
              <span className="material-symbols-outlined text-primary text-base">email</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Correo registrado</p>
              <p className="text-sm text-gray-400">{email}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
              requested ? "bg-emerald-500/10" : "bg-amber-500/10"
            }`}>
              <span className={`material-symbols-outlined text-base ${
                requested ? "text-emerald-400" : "text-amber-400"
              }`}>
                {requested ? "check_circle" : "pending"}
              </span>
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Estado de solicitud</p>
              <p className={`text-sm font-medium ${requested ? "text-emerald-400" : "text-amber-400"}`}>
                {requested ? "Solicitud enviada — En revisión" : "Sin solicitar"}
              </p>
            </div>
          </div>
        </div>

        {/* Request Access Button */}
        {!requested ? (
          <button
            onClick={handleRequest}
            disabled={loading}
            className="w-full py-4 rounded-2xl text-base font-bold flex items-center justify-center gap-3 transition-all active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed bg-gradient-to-r from-primary to-cyan-400 text-white shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:scale-[1.02]"
          >
            {loading ? (
              <>
                <span className="material-symbols-outlined text-xl animate-spin">autorenew</span>
                Enviando solicitud...
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-xl">send</span>
                Solicitar Acceso
              </>
            )}
          </button>
        ) : (
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4 flex items-center gap-3">
            <span className="material-symbols-outlined text-emerald-400 text-2xl shrink-0">task_alt</span>
            <p className="text-sm text-emerald-300 text-left">
              <span className="font-bold">Solicitud enviada.</span>{" "}
              Recibirás acceso una vez que el Director General apruebe tu solicitud.
            </p>
          </div>
        )}

        {/* Steps */}
        <div className="bg-white/3 border border-white/5 rounded-2xl p-5 text-left">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Proceso de acceso</p>
          <div className="space-y-3">
            {[
              { done: true, text: "Registro de cuenta completado" },
              { done: true, text: "Correo de verificación enviado" },
              { done: requested, text: "Solicitud de acceso enviada", active: !requested },
              { done: false, text: "Aprobación por el Director General" },
              { done: false, text: "Acceso completo al diplomado" },
            ].map((step, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                  step.done
                    ? "bg-emerald-500"
                    : step.active
                    ? "bg-primary/30 border-2 border-primary animate-pulse"
                    : "bg-white/10 border border-white/20"
                }`}>
                  {step.done && <span className="material-symbols-outlined text-white text-[12px]">check</span>}
                </div>
                <p className={`text-sm ${
                  step.done ? "text-white" : step.active ? "text-primary font-medium" : "text-gray-500"
                }`}>{step.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact */}
        <p className="text-xs text-gray-600">
          ¿Dudas? Contáctanos a{" "}
          <a href="mailto:drmoralesrehabilita@gmail.com" className="text-primary hover:text-cyan-400 transition-colors underline">
            drmoralesrehabilita@gmail.com
          </a>
        </p>
      </div>
    </div>
  )
}
