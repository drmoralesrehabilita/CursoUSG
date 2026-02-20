"use client"

import { useState } from "react"
import MuxPlayer from "@mux/mux-player-react"
import { Button } from "@/components/ui/button"
import { Repeat } from "lucide-react"

interface DualPlayerProps {
  cameraUrl?: string | null
  ultrasoundUrl?: string | null
  title?: string
}

export function DualPlayer({ cameraUrl, ultrasoundUrl, title }: DualPlayerProps) {
  const [isSwapped, setIsSwapped] = useState(false)

  const handleSwap = () => {
    setIsSwapped(!isSwapped)
  }

  const PlayerA = cameraUrl ? (
    <MuxPlayer
      playbackId={cameraUrl}
      metadata={{
        video_title: `${title} - Cámara`,
      }}
      className="w-full h-full"
    />
  ) : (
    <div className="w-full h-full bg-slate-900 flex items-center justify-center text-slate-500 text-sm">
      Canal de Cámara no disponible
    </div>
  )

  const PlayerB = ultrasoundUrl ? (
    <MuxPlayer
      playbackId={ultrasoundUrl}
      metadata={{
        video_title: `${title} - Ultrasonido`,
      }}
      className="w-full h-full"
    />
  ) : (
    <div className="w-full h-full bg-slate-900 flex items-center justify-center text-slate-500 text-sm">
      Canal de Ultrasonido no disponible
    </div>
  )

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center bg-slate-100 dark:bg-white/5 p-4 rounded-2xl border border-slate-200 dark:border-border/10">
        <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300">Modo de Visualización Dual</h4>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleSwap}
          className="rounded-xl border-primary/20 text-primary hover:bg-primary/10 transition-all font-bold group"
        >
          <Repeat className="w-4 h-4 mr-2 group-hover:rotate-180 transition-transform duration-500" />
          Alternar Fuentes
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Main Viewport 1 */}
        <div className="aspect-video bg-black rounded-3xl overflow-hidden border-4 border-slate-200 dark:border-border/10 shadow-2xl group transition-all duration-500">
           <div className="w-full h-full relative">
              <div className="absolute top-4 left-4 z-10">
                 <div className="px-3 py-1 rounded-full bg-primary/20 backdrop-blur-md border border-white/20 text-[10px] font-black text-primary uppercase tracking-widest">
                    {isSwapped ? "Ultrasonido" : "Cámara"}
                 </div>
              </div>
              {isSwapped ? PlayerB : PlayerA}
           </div>
        </div>

        {/* Main Viewport 2 */}
        <div className="aspect-video bg-black rounded-3xl overflow-hidden border-4 border-slate-200 dark:border-border/10 shadow-2xl group transition-all duration-500">
           <div className="w-full h-full relative">
              <div className="absolute top-4 left-4 z-10">
                 <div className="px-3 py-1 rounded-full bg-blue-500/20 backdrop-blur-md border border-white/20 text-[10px] font-black text-blue-400 uppercase tracking-widest">
                    {isSwapped ? "Cámara" : "Ultrasonido"}
                 </div>
              </div>
              {isSwapped ? PlayerA : PlayerB}
           </div>
        </div>
      </div>
      
      <div className="flex items-center gap-2 p-3 bg-primary/5 rounded-xl border border-primary/10 border-dashed">
         <span className="material-symbols-outlined text-primary text-sm">info</span>
         <p className="text-[10px] text-slate-500 font-medium">Puedes alternar entre la vista de cámara y ultrasonido para un mejor análisis anatómico.</p>
      </div>
    </div>
  )
}
