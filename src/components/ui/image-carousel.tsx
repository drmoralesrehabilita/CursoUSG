"use client"

import { useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface ImageCarouselProps {
  images: { id: string; alt?: string }[]
  autoPlayInterval?: number
  compact?: boolean
}

export function ImageCarousel({ images, autoPlayInterval = 4000, compact = false }: ImageCarouselProps) {
  const [current, setCurrent] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const total = images.length

  const goTo = useCallback((index: number) => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrent((index + total) % total)
    setTimeout(() => setIsTransitioning(false), 500)
  }, [total, isTransitioning])

  const next = useCallback(() => goTo(current + 1), [current, goTo])
  const prev = useCallback(() => goTo(current - 1), [current, goTo])

  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(next, autoPlayInterval)
    return () => clearInterval(timer)
  }, [isPaused, next, autoPlayInterval])

  // Determine which images to show as indicators (show groups of dots)
  const dotGroupSize = 5
  const currentGroup = Math.floor(current / dotGroupSize)
  const totalGroups = Math.ceil(total / dotGroupSize)

  const getImageUrl = (id: string) =>
    `https://lh3.googleusercontent.com/d/${id}=w1200`

  return (
    <div
      className={`relative w-full group ${compact ? "max-w-sm mx-auto" : "max-w-5xl mx-auto"}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Main Image Container */}
      <div className={`relative overflow-hidden rounded-2xl border border-surface-highlight bg-black aspect-3/4 shadow-2xl shadow-blue-900/20 ${compact ? "max-h-[480px]" : "max-h-[700px]"}`}>
        {images.map((img, i) => (
          <div
            key={img.id}
            className="absolute inset-0 transition-all duration-500 ease-in-out"
            style={{
              opacity: i === current ? 1 : 0,
              transform: i === current ? "scale(1)" : "scale(1.05)",
              zIndex: i === current ? 1 : 0,
            }}
          >
            <img
              src={getImageUrl(img.id)}
              alt={img.alt || `Foto del diplomado ${i + 1}`}
              className="w-full h-full object-cover"
              loading={i < 3 ? "eager" : "lazy"}
            />
          </div>
        ))}

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent z-2 pointer-events-none" />

        {/* Counter badge */}
        <div className="absolute top-4 right-4 z-3 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 text-xs text-white font-mono border border-white/10">
          {current + 1} / {total}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prev}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-3 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black/60 hover:scale-110"
          aria-label="Imagen anterior"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={next}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-3 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black/60 hover:scale-110"
          aria-label="Siguiente imagen"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Thumbnail Strip */}
      <div className="mt-4 flex items-center justify-center gap-2">
        {/* Group navigation */}
        {totalGroups > 1 && (
          <button
            onClick={() => goTo(Math.max(0, (currentGroup - 1) * dotGroupSize))}
            className="w-6 h-6 rounded-full flex items-center justify-center text-slate-500 hover:text-white transition-colors"
            aria-label="Grupo anterior"
          >
            <ChevronLeft className="w-3 h-3" />
          </button>
        )}

        {/* Dot indicators for current group */}
        <div className="flex items-center gap-1.5">
          {Array.from({ length: totalGroups }, (_, groupIdx) => {
            const isActiveGroup = groupIdx === currentGroup
            return (
              <button
                key={groupIdx}
                onClick={() => goTo(groupIdx * dotGroupSize)}
                className={`transition-all duration-300 rounded-full ${
                  isActiveGroup
                    ? "w-6 h-2 bg-primary"
                    : "w-2 h-2 bg-slate-600 hover:bg-slate-400"
                }`}
                aria-label={`Ir al grupo ${groupIdx + 1}`}
              />
            )
          })}
        </div>

        {totalGroups > 1 && (
          <button
            onClick={() => goTo(Math.min(total - 1, (currentGroup + 1) * dotGroupSize))}
            className="w-6 h-6 rounded-full flex items-center justify-center text-slate-500 hover:text-white transition-colors"
            aria-label="Siguiente grupo"
          >
            <ChevronRight className="w-3 h-3" />
          </button>
        )}
      </div>
    </div>
  )
}
