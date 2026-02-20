"use client"

import * as React from "react"
import MuxPlayer from "@mux/mux-player-react"
import { Button } from "@/components/ui/button"
import { ArrowLeftRight } from "lucide-react"

interface DualPlayerProps {
  cameraUrl: string | null
  ultrasoundUrl: string | null
  title?: string
}

export function DualPlayer({ cameraUrl, ultrasoundUrl, title }: DualPlayerProps) {
  const [swapped, setSwapped] = React.useState(false)
  // const [isPlaying, setIsPlaying] = React.useState(false) // Unused for now
  
  // Refs to control players 
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const primaryRef = React.useRef<any>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const secondaryRef = React.useRef<any>(null)

  // Determine which URL goes where
  const primaryUrl = swapped ? ultrasoundUrl : cameraUrl
  const secondaryUrl = swapped ? cameraUrl : ultrasoundUrl

  // Basic synchronization handler (Placeholder for future sync logic)
  /*
  const handlePlayPause = () => {
    // Sync logic
  }
  */

  // If only one URL is provided, show single player
  if (!cameraUrl && !ultrasoundUrl) return <div className="aspect-video bg-muted flex items-center justify-center">No video sources</div>
  
  if (!cameraUrl || !ultrasoundUrl) {
     return (
        <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-border shadow-lg bg-black">
             <MuxPlayer
                streamType="on-demand"
                playbackId={cameraUrl || ultrasoundUrl || ""}
                metadata={{ video_title: title }}
                primaryColor="#1773cf"
                secondaryColor="#0a0f18"
             />
        </div>
     )
  }

  return (
    <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden group">
      
      {/* Primary Player (Background) */}
      <div className="absolute inset-0 z-0">
         <MuxPlayer
            ref={primaryRef}
            streamType="on-demand"
            playbackId={primaryUrl || ""}
            metadata={{ video_title: `${title} - Primary` }}
            primaryColor="#1773cf"
            secondaryColor="#0a0f18"
            className="w-full h-full object-contain"
            // Hide native controls to use custom overlay? Or keep native.
            // Keeping native controls on primary is easier for MVP.
         />
      </div>

      {/* Secondary Player (Picture-in-Picture style) */}
      <div className="absolute top-4 right-4 z-10 w-1/3 aspect-video rounded-lg overflow-hidden border-2 border-primary shadow-2xl bg-black transition-all hover:scale-105">
         <MuxPlayer
            ref={secondaryRef}
            streamType="on-demand"
            playbackId={secondaryUrl || ""}
            metadata={{ video_title: `${title} - Secondary` }}
            muted={true} // Usually secondary is muted to avoid echo
            className="w-full h-full object-cover"
            // Hide controls on secondary
         />
         
         {/* Overlay on secondary to swap */}
         <div 
            className="absolute inset-0 bg-transparent hover:bg-black/20 cursor-pointer flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
            onClick={() => setSwapped(!swapped)}
         >
            <ArrowLeftRight className="text-white drop-shadow-md w-8 h-8" />
         </div>
      </div>

      {/* Custom Controls Overlay (Optional, if native controls are confusing) */}
      {/* For MVP, let's add a prominent Swap button outside or top-left */}
      <div className="absolute top-4 left-4 z-20">
          <Button 
            variant="secondary" 
            size="sm" 
            className="bg-black/50 backdrop-blur-sm hover:bg-black/70 text-white border-white/10"
            onClick={() => setSwapped(!swapped)}
          >
            <ArrowLeftRight className="mr-2 h-4 w-4" />
            Intercambiar Pantallas
          </Button>
      </div>

    </div>
  )
}
