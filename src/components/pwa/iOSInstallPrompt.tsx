'use client'

import React, { useState, useEffect } from 'react'
import { Share, PlusSquare, X } from 'lucide-react'

export function IOSInstallPrompt() {
  const [showPrompt, setShowPrompt] = useState(false)

  useEffect(() => {
    // Detect iOS
    const userAgent = window.navigator.userAgent.toLowerCase()
    const isIOSDevice = /iphone|ipad|ipod/.test(userAgent)

    // Detect if running as standalone PWA
    // window.navigator.standalone is specific to iOS Safari
    const isStandaloneMode = window.matchMedia('(display-mode: standalone)').matches || 
                           ('standalone' in window.navigator && (window.navigator as any).standalone === true)

    // If it's an iOS device inside a regular Safari tab, show prompt
    if (isIOSDevice && !isStandaloneMode) {
      // Check if user previously dismissed it
      const hasDismissed = localStorage.getItem('ios_install_prompt_dismissed')
      if (!hasDismissed) {
        setTimeout(() => setShowPrompt(true), 1000) // Delay to avoid synchronous render and feel less intrusive
      }
    }
  }, [])

  const handleDismiss = () => {
    setShowPrompt(false)
    localStorage.setItem('ios_install_prompt_dismissed', 'true')
  }

  if (!showPrompt) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 pb-[env(safe-area-inset-bottom,16px)] animate-in slide-in-from-bottom-10 fade-in duration-300">
      <div className="bg-popover text-popover-foreground border shadow-lg rounded-xl p-4 relative">
        <button 
          onClick={handleDismiss}
          className="absolute top-2 right-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-5 h-5" />
          <span className="sr-only">Cerrar</span>
        </button>
        
        <h3 className="font-semibold text-lg mb-2">Instala nuestra App</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Para recibir notificaciones y tener la mejor experiencia a pantalla completa, instala la aplicación en tu inicio.
        </p>
        
        <ol className="text-sm space-y-3 font-medium bg-muted/50 rounded-lg p-3">
          <li className="flex items-center gap-3">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 text-primary text-xs">1</span>
            Toca el ícono de compartir
            <Share className="w-5 h-5 text-primary ml-auto" />
          </li>
          <li className="flex items-center gap-3">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 text-primary text-xs">2</span>
            Selecciona <strong>Agregar a inicio</strong>
            <PlusSquare className="w-5 h-5 text-primary ml-auto" />
          </li>
        </ol>
      </div>
    </div>
  )
}
