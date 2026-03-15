"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import type { CertElement, ElementType } from "@/lib/certificates/types"
import { uploadCertificateAsset } from "@/app/actions/certificates"

// ─────────────────────────────────────────────────
// DEFAULT ELEMENTS — initial array
// ─────────────────────────────────────────────────
export const DEFAULT_ELEMENTS: CertElement[] = [
  { id: "el_header",    type: "header",          x: 30,  y: 24,  w: 300, h: 44,  visible: true,  fontSize: 13,  align: "left",   label: "Encabezado" },
  { id: "el_folio",     type: "folio",           x: 580, y: 24,  w: 220, h: 30,  visible: true,  fontSize: 7.5, align: "right",  label: "Folio" },
  { id: "el_title",     type: "title",           x: 0,   y: 80,  w: 842, h: 44,  visible: true,  fontSize: 30,  align: "center", label: "Título" },
  { id: "el_divider",   type: "divider",         x: 341, y: 128, w: 160, h: 4,   visible: true,  fontSize: 2,   align: "center", label: "Divisor Dorado" },
  { id: "el_recipient", type: "recipient",       x: 60,  y: 146, w: 722, h: 56,  visible: true,  fontSize: 24,  align: "center", label: "Destinatario" },
  { id: "el_decoline",  type: "decorative_line", x: 260, y: 206, w: 320, h: 3,   visible: true,  fontSize: 1,   align: "center", label: "Línea Nombre" },
  { id: "el_coursename",type: "course_name",     x: 60,  y: 218, w: 722, h: 30,  visible: true,  fontSize: 14,  align: "center", label: "Nombre Curso" },
  { id: "el_body",      type: "body",            x: 60,  y: 256, w: 722, h: 50,  visible: true,  fontSize: 10,  align: "center", label: "Texto" },
  { id: "el_hours",     type: "course_hours",    x: 60,  y: 312, w: 722, h: 24,  visible: true,  fontSize: 11,  align: "center", label: "Horas del Curso" },
  { id: "el_date",      type: "date",            x: 60,  y: 346, w: 722, h: 24,  visible: true,  fontSize: 9,   align: "center", label: "Fecha de Emisión" },
  { id: "el_signature", type: "signature",       x: 30,  y: 400, w: 160, h: 80,  visible: true,  fontSize: 9,   align: "center", label: "Firma", signerName: "Dr. Raúl Morales", signerRole: "Director del Curso" },
  { id: "el_qr",        type: "qr",              x: 700, y: 400, w: 80,  h: 80,  visible: true,  fontSize: 6,   align: "center", label: "Código QR" },
  { id: "el_img",       type: "custom_image",    x: 350, y: 490, w: 140, h: 60,  visible: false, fontSize: 8,   align: "center", label: "Imagen", imageUrl: "" },
]

// Canvas dimensions (A4 landscape in pts)
const CANVAS_W = 842
const CANVAS_H = 595

// Generate unique ID
function genId() {
  return `el_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`
}

// ─────────────────────────────────────────────────
// ELEMENT META (for icons and colors by TYPE)
// ─────────────────────────────────────────────────
const TYPE_META: Record<ElementType, { icon: string; color: string; defaultLabel: string }> = {
  header:          { icon: "badge",            color: "#3b82f6", defaultLabel: "Encabezado" },
  folio:           { icon: "tag",              color: "#6366f1", defaultLabel: "Folio" },
  title:           { icon: "title",            color: "#8b5cf6", defaultLabel: "Título" },
  divider:         { icon: "horizontal_rule",  color: "#ca8a04", defaultLabel: "Divisor Dorado" },
  recipient:       { icon: "person",           color: "#06b6d4", defaultLabel: "Destinatario" },
  decorative_line: { icon: "remove",           color: "#a855f7", defaultLabel: "Línea Decorativa" },
  course_name:     { icon: "school",           color: "#0891b2", defaultLabel: "Nombre Curso" },
  body:            { icon: "article",          color: "#10b981", defaultLabel: "Texto Institucional" },
  course_hours:    { icon: "schedule",         color: "#f97316", defaultLabel: "Horas del Curso" },
  date:            { icon: "calendar_month",   color: "#ec4899", defaultLabel: "Fecha de Emisión" },
  signature:       { icon: "draw",             color: "#f59e0b", defaultLabel: "Firma" },
  qr:              { icon: "qr_code_2",        color: "#ef4444", defaultLabel: "Código QR" },
  custom_image:    { icon: "image",            color: "#14b8a6", defaultLabel: "Imagen" },
  custom_text:     { icon: "text_fields",      color: "#7c3aed", defaultLabel: "Texto Libre" },
}

// Addable element types
const ADDABLE_TYPES: { type: ElementType; label: string; category: string }[] = [
  { type: "custom_text",     label: "Texto Libre",       category: "Contenido" },
  { type: "signature",       label: "Firma",             category: "Contenido" },
  { type: "custom_image",    label: "Imagen",            category: "Contenido" },
  { type: "divider",         label: "Divisor Dorado",    category: "Decorativo" },
  { type: "decorative_line", label: "Línea Decorativa",  category: "Decorativo" },
]

// ─────────────────────────────────────────────────
// ELEMENT CONTENT RENDERER
// ─────────────────────────────────────────────────
function ElementContent({ el, config, scale }: { el: CertElement; config: Props["config"]; scale: number }) {
  const fs = (size: number) => size * scale

  switch (el.type) {
    case "header":
      return (
        <div className="flex flex-col" style={{ textAlign: (el.align || "left") as "left" | "center" | "right" }}>
          <span style={{ fontSize: fs(el.fontSize || 13), fontWeight: 700, color: config.primary_color }}>{el.customText || "Dr. Raúl Morales"}</span>
          <span style={{ fontSize: fs(7), color: "#64748b", letterSpacing: 1 * scale, marginTop: 1 * scale }}>Ecografía Neuromusculoesquelética</span>
        </div>
      )
    case "title":
      return (
        <span style={{ fontSize: fs(el.fontSize || 30), fontWeight: 700, letterSpacing: 4 * scale, color: "#1e293b", textAlign: (el.align || "center") as "left" | "center" | "right", width: "100%" }}>
          {el.customText || "CERTIFICADO"}
        </span>
      )
    case "divider":
      return <div style={{ width: "100%", height: Math.max(1, fs(el.fontSize || 2)), backgroundColor: "#c9a84c", borderRadius: 1 }} />
    case "decorative_line":
      return <div style={{ width: "100%", height: Math.max(1, fs(el.fontSize || 1)), backgroundColor: "#cbd5e1", borderRadius: 1 }} />
    case "recipient":
      return (
        <div className="flex flex-col items-center w-full" style={{ textAlign: (el.align || "center") as "left" | "center" | "right" }}>
          <span style={{ fontSize: fs(8), color: "#64748b", letterSpacing: 2 * scale, textTransform: "uppercase", marginBottom: 4 * scale }}>Se otorga a</span>
          <span style={{ fontSize: fs(el.fontSize || 24), fontWeight: 700, color: "#0f172a", display: "inline-block" }}>[Nombre del Médico]</span>
        </div>
      )
    case "course_name":
      return (
        <span style={{ fontSize: fs(el.fontSize || 14), fontWeight: 600, color: "#1e293b", textAlign: (el.align || "center") as "left" | "center" | "right", width: "100%", fontStyle: "italic" }}>
          {config.course_name || "Curso de Ecografía Neuromusculoesquelética"}
        </span>
      )
    case "course_hours":
      return (
        <span style={{ fontSize: fs(el.fontSize || 11), color: "#475569", textAlign: (el.align || "center") as "left" | "center" | "right", width: "100%" }}>
          (Duración: {config.course_hours || "120"} horas)
        </span>
      )
    case "body":
      return (
        <span style={{ fontSize: fs(el.fontSize || 10), color: "#334155", lineHeight: 1.7, textAlign: (el.align || "center") as "left" | "center" | "right", width: "100%" }}>
          {el.customText || config.institutional_text || `Por haber completado satisfactoriamente el curso impartido por el Dr. Raúl Morales.`}
        </span>
      )
    case "date":
      return (
        <span style={{ fontSize: fs(el.fontSize || 9), color: "#64748b", textAlign: (el.align || "center") as "left" | "center" | "right", width: "100%" }}>
          {el.customText || `Ciudad de México, a ${new Date().toLocaleDateString("es-MX", { day: "numeric", month: "long", year: "numeric" })}`}
        </span>
      )
    case "folio":
      return (
        <div className="flex flex-col w-full" style={{ textAlign: (el.align || "right") as "left" | "center" | "right" }}>
          <span style={{ fontSize: fs(el.fontSize || 7.5), color: "#64748b" }}>Folio: {config.folio_prefix}0001</span>
          <span style={{ fontSize: fs(el.fontSize || 7.5), color: "#64748b", marginTop: 1 * scale }}>
            Fecha: {new Date().toLocaleDateString("es-MX", { day: "2-digit", month: "short", year: "numeric" })}
          </span>
        </div>
      )
    case "signature":
      return (
        <div className="flex flex-col items-center justify-end w-full h-full" style={{ paddingBottom: 4 * scale }}>
          {el.imageUrl && (
            <img src={el.imageUrl} alt="" style={{ width: "60%", height: "auto", maxHeight: "50%", objectFit: "contain", marginBottom: 3 * scale }} draggable={false} />
          )}
          <div style={{ width: "80%", borderBottom: "1px solid #374151", marginBottom: 3 * scale }} />
          <span style={{ fontSize: fs(el.fontSize || 9), color: "#0f172a", fontWeight: 700, textAlign: "center" }}>{el.signerName || "Nombre"}</span>
          <span style={{ fontSize: fs((el.fontSize || 9) * 0.8), color: "#64748b", textAlign: "center" }}>{el.signerRole || "Cargo"}</span>
        </div>
      )
    case "qr":
      return (
        <div className="flex flex-col items-center justify-center w-full h-full">
          <div className="rounded flex items-center justify-center" style={{ width: Math.min(el.w, el.h - 16) * scale * 0.65, height: Math.min(el.w, el.h - 16) * scale * 0.65, backgroundColor: "#e5e7eb" }}>
            <span className="material-symbols-outlined" style={{ fontSize: Math.min(el.w, el.h - 16) * scale * 0.4, color: "#9ca3af" }}>qr_code_2</span>
          </div>
          <span style={{ fontSize: fs(el.fontSize || 6), color: "#9ca3af", marginTop: 2 * scale }}>Verificar</span>
        </div>
      )
    case "custom_image":
      return el.imageUrl ? (
        <img src={el.imageUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }} draggable={false} />
      ) : (
        <div className="flex flex-col items-center justify-center w-full h-full rounded" style={{ backgroundColor: "#f1f5f9", border: "2px dashed #cbd5e1" }}>
          <span className="material-symbols-outlined" style={{ fontSize: fs(16), color: "#94a3b8" }}>add_photo_alternate</span>
          <span style={{ fontSize: fs(7), color: "#94a3b8", marginTop: 2 * scale }}>Subir imagen</span>
        </div>
      )
    case "custom_text":
      return (
        <span style={{ fontSize: fs(el.fontSize || 10), color: "#334155", textAlign: (el.align || "center") as "left" | "center" | "right", width: "100%", lineHeight: 1.5 }}>
          {el.customText || "[Texto personalizado]"}
        </span>
      )
    default:
      return null
  }
}

// ─────────────────────────────────────────────────
// MAIN DESIGNER COMPONENT
// ─────────────────────────────────────────────────
type Props = {
  layout: CertElement[]
  onLayoutChange: (layout: CertElement[]) => void
  backgroundUrl: string
  onBackgroundChange: (url: string) => void
  config: {
    primary_color: string
    course_name: string
    course_hours: string
    folio_prefix: string
    institutional_text: string
  }
}

export default function CertificateDesigner({ layout, onLayoutChange, backgroundUrl, onBackgroundChange, config }: Props) {
  const [selected, setSelected] = useState<string | null>(null)
  const [dragging, setDragging] = useState<string | null>(null)
  const [resizing, setResizing] = useState<{ id: string; corner: string } | null>(null)
  const [previewMode, setPreviewMode] = useState(false)
  const [showManager, setShowManager] = useState(true)
  const [showAddMenu, setShowAddMenu] = useState(false)
  const [uploading, setUploading] = useState(false)
  const canvasRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const bgInputRef = useRef<HTMLInputElement>(null)
  const dragOffset = useRef({ x: 0, y: 0 })
  const resizeStart = useRef({ mx: 0, my: 0, ow: 0, oh: 0, ox: 0, oy: 0 })
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const updateScale = () => {
      if (canvasRef.current) setScale(canvasRef.current.clientWidth / CANVAS_W)
    }
    updateScale()
    window.addEventListener("resize", updateScale)
    return () => window.removeEventListener("resize", updateScale)
  }, [])

  // ── Element helpers ──
  const getEl = useCallback((id: string) => layout.find(e => e.id === id), [layout])

  const updateElement = useCallback(
    (id: string, updates: Partial<CertElement>) => {
      onLayoutChange(layout.map(e => e.id === id ? { ...e, ...updates } : e))
    },
    [layout, onLayoutChange]
  )

  const addElement = useCallback((type: ElementType) => {
    const meta = TYPE_META[type]
    const defaults: Partial<CertElement> = {
      x: 200, y: 300, w: 200, h: 40, visible: true, fontSize: 10, align: "center",
    }
    if (type === "signature") {
      defaults.w = 160; defaults.h = 80; defaults.signerName = "Nombre"; defaults.signerRole = "Cargo"
    }
    if (type === "custom_image") {
      defaults.w = 140; defaults.h = 60; defaults.imageUrl = ""
    }
    if (type === "custom_text") {
      defaults.customText = "Texto personalizado"
    }
    if (type === "divider") {
      defaults.w = 160; defaults.h = 4; defaults.fontSize = 2
    }
    if (type === "decorative_line") {
      defaults.w = 200; defaults.h = 3; defaults.fontSize = 1
    }
    const newEl: CertElement = {
      id: genId(),
      type,
      label: meta.defaultLabel,
      ...defaults,
    } as CertElement
    const updated = [...layout, newEl]
    onLayoutChange(updated)
    setSelected(newEl.id)
    setShowAddMenu(false)
  }, [layout, onLayoutChange])

  const duplicateElement = useCallback((id: string) => {
    const src = getEl(id)
    if (!src) return
    const dup: CertElement = {
      ...src,
      id: genId(),
      x: Math.min(src.x + 20, CANVAS_W - src.w),
      y: Math.min(src.y + 20, CANVAS_H - src.h),
      label: `${src.label || TYPE_META[src.type].defaultLabel} (copia)`,
    }
    const updated = [...layout, dup]
    onLayoutChange(updated)
    setSelected(dup.id)
  }, [layout, onLayoutChange, getEl])

  const deleteElement = useCallback((id: string) => {
    onLayoutChange(layout.filter(e => e.id !== id))
    setSelected(null)
  }, [layout, onLayoutChange])

  // ── Upload handler ────────────────────────────
  const handleUpload = useCallback(async (file: File, target: "image" | "background") => {
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("folder", target === "background" ? "backgrounds" : "images")
      const result = await uploadCertificateAsset(formData)
      if (result.success && result.url) {
        if (target === "background") {
          onBackgroundChange(result.url)
        } else if (selected) {
          updateElement(selected, { imageUrl: result.url, visible: true })
        }
      }
    } finally {
      setUploading(false)
    }
  }, [selected, updateElement, onBackgroundChange])

  // ── Drag handlers ──────────────────────────────
  const handlePointerDown = useCallback(
    (e: React.PointerEvent, id: string) => {
      if (previewMode) return
      e.preventDefault()
      e.stopPropagation()
      const el = getEl(id)
      if (!el) return
      const rect = canvasRef.current!.getBoundingClientRect()
      const mx = (e.clientX - rect.left) / scale
      const my = (e.clientY - rect.top) / scale
      dragOffset.current = { x: mx - el.x, y: my - el.y }
      setDragging(id)
      setSelected(id)
      ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
    },
    [getEl, scale, previewMode]
  )

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!canvasRef.current) return
      const rect = canvasRef.current.getBoundingClientRect()
      const mx = (e.clientX - rect.left) / scale
      const my = (e.clientY - rect.top) / scale

      if (dragging) {
        const el = getEl(dragging)
        if (!el) return
        let nx = mx - dragOffset.current.x
        let ny = my - dragOffset.current.y
        nx = Math.max(0, Math.min(CANVAS_W - el.w, nx))
        ny = Math.max(0, Math.min(CANVAS_H - el.h, ny))
        updateElement(dragging, { x: Math.round(nx), y: Math.round(ny) })
      }

      if (resizing) {
        const { id, corner } = resizing
        const { mx: smx, my: smy, ow, oh, ox, oy } = resizeStart.current
        const dx = mx - smx
        const dy = my - smy
        let newW = ow, newH = oh, newX = ox, newY = oy
        if (corner.includes("r")) newW = Math.max(30, ow + dx)
        if (corner.includes("l")) { newW = Math.max(30, ow - dx); newX = ox + dx }
        if (corner.includes("b")) newH = Math.max(3, oh + dy)
        if (corner.includes("t")) { newH = Math.max(3, oh - dy); newY = oy + dy }
        newX = Math.max(0, newX); newY = Math.max(0, newY)
        if (newX + newW > CANVAS_W) newW = CANVAS_W - newX
        if (newY + newH > CANVAS_H) newH = CANVAS_H - newY
        updateElement(id, { x: Math.round(newX), y: Math.round(newY), w: Math.round(newW), h: Math.round(newH) })
      }
    },
    [dragging, resizing, getEl, scale, updateElement]
  )

  const handlePointerUp = useCallback(() => { setDragging(null); setResizing(null) }, [])

  const handleResizeStart = useCallback(
    (e: React.PointerEvent, id: string, corner: string) => {
      e.preventDefault(); e.stopPropagation()
      const el = getEl(id)
      if (!el) return
      const rect = canvasRef.current!.getBoundingClientRect()
      const mx = (e.clientX - rect.left) / scale
      const my = (e.clientY - rect.top) / scale
      resizeStart.current = { mx, my, ow: el.w, oh: el.h, ox: el.x, oy: el.y }
      setResizing({ id, corner })
      setSelected(id)
      ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
    },
    [getEl, scale]
  )

  const visibleElements = layout.filter(e => e.visible)
  const selectedEl = selected ? getEl(selected) : null
  const selectedMeta = selectedEl ? TYPE_META[selectedEl.type] : null

  return (
    <div className="space-y-4">
      {/* ── Toolbar ── */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-lg">design_services</span>
          Editor Visual de Certificado
        </h3>
        <div className="flex items-center gap-2 flex-wrap">
          {/* Add element */}
          <div className="relative">
            <button
              onClick={() => setShowAddMenu(!showAddMenu)}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all bg-primary/10 text-primary hover:bg-primary/20"
            >
              <span className="material-symbols-outlined text-sm">add</span>
              Agregar
            </button>
            {showAddMenu && (
              <div className="absolute top-full right-0 mt-1 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-white/10 shadow-xl z-50 min-w-[200px] py-1 animate-in fade-in slide-in-from-top-1 duration-150">
                {["Contenido", "Decorativo"].map(cat => (
                  <div key={cat}>
                    <p className="px-3 py-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">{cat}</p>
                    {ADDABLE_TYPES.filter(a => a.category === cat).map(item => (
                      <button
                        key={item.type + item.label}
                        onClick={() => addElement(item.type)}
                        className="w-full px-3 py-2 text-left text-xs font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/5 flex items-center gap-2"
                      >
                        <span className="material-symbols-outlined text-sm" style={{ color: TYPE_META[item.type].color }}>{TYPE_META[item.type].icon}</span>
                        {item.label}
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
          <button
            onClick={() => setShowManager(!showManager)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${showManager ? "bg-primary/10 text-primary" : "bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/15"}`}
          >
            <span className="material-symbols-outlined text-sm">dashboard_customize</span>
            Elementos
          </button>
          <button
            onClick={() => { setPreviewMode(!previewMode); setSelected(null) }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${previewMode ? "bg-primary text-white" : "bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/15"}`}
          >
            <span className="material-symbols-outlined text-sm">{previewMode ? "edit" : "preview"}</span>
            {previewMode ? "Modo Edición" : "Vista Previa"}
          </button>
          <button
            onClick={() => { onLayoutChange([...DEFAULT_ELEMENTS]); setSelected(null) }}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/15 flex items-center gap-1.5 transition-all"
          >
            <span className="material-symbols-outlined text-sm">restart_alt</span>
            Restablecer
          </button>
          <button
            onClick={() => bgInputRef.current?.click()}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${backgroundUrl ? "bg-teal-500/10 text-teal-600" : "bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/15"}`}
          >
            <span className="material-symbols-outlined text-sm">wallpaper</span>
            {backgroundUrl ? "Cambiar Fondo" : "Fondo"}
          </button>
          {backgroundUrl && (
            <button
              onClick={() => onBackgroundChange("")}
              className="px-2 py-1.5 rounded-lg text-xs font-semibold text-red-500 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 flex items-center gap-1 transition-all"
            >
              <span className="material-symbols-outlined text-sm">delete</span>
            </button>
          )}
        </div>
      </div>

      {/* Hidden file inputs */}
      <input ref={fileInputRef} type="file" accept="image/png,image/jpeg,image/webp,image/svg+xml" className="hidden"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) handleUpload(f, "image"); e.target.value = "" }} />
      <input ref={bgInputRef} type="file" accept="image/png,image/jpeg,image/webp,image/svg+xml" className="hidden"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) handleUpload(f, "background"); e.target.value = "" }} />

      {/* ── Canvas ── */}
      <div className="bg-gray-100 dark:bg-gray-900/50 rounded-xl p-3 overflow-hidden">
        <div style={{ aspectRatio: `${CANVAS_W} / ${CANVAS_H}`, maxWidth: "100%", position: "relative" }}>
          <div
            ref={canvasRef}
            className="w-full h-full relative overflow-hidden select-none"
            style={{ background: backgroundUrl ? `url(${backgroundUrl}) center/cover no-repeat` : "linear-gradient(135deg, #fefcf3 0%, #fdf8e7 100%)", borderRadius: 8, boxShadow: "0 4px 24px rgba(0,0,0,.12), 0 0 0 1px rgba(201,168,76,0.3)" }}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onClick={(e) => { if (e.target === canvasRef.current) { setSelected(null); setShowAddMenu(false) } }}
          >
            {/* Uploading overlay */}
            {uploading && (
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center z-50 rounded-lg">
                <div className="bg-white dark:bg-gray-900 rounded-xl px-6 py-4 flex items-center gap-3 shadow-2xl">
                  <div className="animate-spin w-5 h-5 border-2 border-primary border-t-transparent rounded-full" />
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">Subiendo imagen...</span>
                </div>
              </div>
            )}

            {/* Decorative borders */}
            <div className="absolute" style={{ inset: `${12 * scale}px`, border: "2.5px solid #c9a84c", borderRadius: 4, pointerEvents: "none" }} />
            <div className="absolute" style={{ inset: `${18 * scale}px`, border: "1px solid #c9a84c", borderRadius: 2, pointerEvents: "none" }} />

            {/* Corner ornaments */}
            {[
              { top: 8 * scale, left: 8 * scale, bt: "2px solid #c9a84c", bl: "2px solid #c9a84c" },
              { top: 8 * scale, right: 8 * scale, bt: "2px solid #c9a84c", br: "2px solid #c9a84c" },
              { bottom: 8 * scale, left: 8 * scale, bb: "2px solid #c9a84c", bl: "2px solid #c9a84c" },
              { bottom: 8 * scale, right: 8 * scale, bb: "2px solid #c9a84c", br: "2px solid #c9a84c" },
            ].map((s, i) => (
              <div key={i} className="absolute" style={{
                width: 18 * scale, height: 18 * scale, pointerEvents: "none",
                ...(s.top !== undefined ? { top: s.top } : {}), ...(s.bottom !== undefined ? { bottom: s.bottom } : {}),
                ...(s.left !== undefined ? { left: s.left } : {}), ...(s.right !== undefined ? { right: s.right } : {}),
                borderTop: s.bt, borderBottom: s.bb, borderLeft: s.bl, borderRight: s.br,
              }} />
            ))}

            {/* Center guide when dragging */}
            {dragging && !previewMode && (
              <div className="absolute" style={{ left: "50%", top: 0, bottom: 0, width: 1, background: "rgba(59,130,246,0.25)", pointerEvents: "none", zIndex: 50 }} />
            )}

            {/* ── Draggable elements ── */}
            {visibleElements.map((el, idx) => {
              const meta = TYPE_META[el.type]
              const isSelected = selected === el.id && !previewMode

              return (
                <div
                  key={el.id}
                  className="absolute group"
                  style={{
                    left: el.x * scale, top: el.y * scale, width: el.w * scale, height: el.h * scale,
                    cursor: previewMode ? "default" : dragging === el.id ? "grabbing" : "grab",
                    zIndex: dragging === el.id ? 30 : isSelected ? 20 : idx + 1,
                    touchAction: "none",
                  }}
                  onPointerDown={(e) => handlePointerDown(e, el.id)}
                >
                  {/* Selection border */}
                  {!previewMode && (
                    <div className="absolute inset-0 rounded transition-all" style={{
                      border: isSelected ? `2px solid ${meta.color}` : `1px dashed ${meta.color}33`,
                      backgroundColor: isSelected ? `${meta.color}08` : "transparent",
                    }} />
                  )}

                  {/* Element label */}
                  {!previewMode && (
                    <div className="absolute -top-4 left-0 px-1.5 rounded-t text-[8px] font-bold text-white whitespace-nowrap" style={{
                      backgroundColor: meta.color,
                      fontSize: Math.max(8, 9 * scale), lineHeight: `${Math.max(12, 14 * scale)}px`,
                      transform: `scale(${1 / scale})`, transformOrigin: "bottom left",
                    }}>
                      {el.label || meta.defaultLabel}
                    </div>
                  )}

                  {/* Content */}
                  <div className="w-full h-full flex items-center overflow-hidden px-1" style={{
                    justifyContent: el.align === "center" ? "center" : el.align === "right" ? "flex-end" : "flex-start",
                  }}>
                    <ElementContent el={el} config={config} scale={scale} />
                  </div>

                  {/* Resize handles */}
                  {isSelected && (
                    <>
                      {["tl", "tr", "bl", "br", "t", "b", "l", "r"].map((corner) => {
                        const pos: React.CSSProperties = {}
                        const sz = 8
                        if (corner.includes("t")) pos.top = -sz / 2
                        if (corner.includes("b")) pos.bottom = -sz / 2
                        if (corner.includes("l")) pos.left = -sz / 2
                        if (corner.includes("r")) pos.right = -sz / 2
                        if (corner === "t" || corner === "b") { pos.left = "50%"; pos.transform = "translateX(-50%)" }
                        if (corner === "l" || corner === "r") { pos.top = "50%"; pos.transform = "translateY(-50%)" }
                        const cursors: Record<string, string> = { tl: "nw-resize", tr: "ne-resize", bl: "sw-resize", br: "se-resize", t: "n-resize", b: "s-resize", l: "w-resize", r: "e-resize" }
                        return (
                          <div key={corner} className="absolute rounded-full" style={{
                            ...pos, width: sz, height: sz, backgroundColor: meta.color,
                            border: "2px solid white", cursor: cursors[corner], zIndex: 40,
                            boxShadow: "0 1px 3px rgba(0,0,0,.2)",
                          }} onPointerDown={(e) => handleResizeStart(e, el.id, corner)} />
                        )
                      })}
                    </>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* ── Properties panel ── */}
      {selectedEl && selectedMeta && !previewMode && (
        <div className="bg-white dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/10 p-4 space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-200"
          style={{ borderLeftColor: selectedMeta.color, borderLeftWidth: 3 }}>
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-gray-700 dark:text-gray-200 flex items-center gap-2">
              <span className="material-symbols-outlined text-sm" style={{ color: selectedMeta.color }}>{selectedMeta.icon}</span>
              Propiedades: {selectedEl.label || selectedMeta.defaultLabel}
            </h4>
            <div className="flex items-center gap-1">
              {/* Duplicate */}
              <button onClick={() => duplicateElement(selectedEl.id)} title="Duplicar elemento"
                className="p-1.5 rounded-lg text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                <span className="material-symbols-outlined text-base">content_copy</span>
              </button>
              {/* Delete */}
              <button onClick={() => deleteElement(selectedEl.id)} title="Eliminar elemento"
                className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                <span className="material-symbols-outlined text-base">delete</span>
              </button>
              <button onClick={() => setSelected(null)} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">
                <span className="material-symbols-outlined text-gray-400 text-base">close</span>
              </button>
            </div>
          </div>

          {/* Label */}
          <div>
            <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider block mb-1">Etiqueta</label>
            <input type="text" value={selectedEl.label || ""} placeholder={selectedMeta.defaultLabel}
              onChange={(e) => updateElement(selectedEl.id, { label: e.target.value })}
              className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-gray-900 dark:text-white outline-none" />
          </div>

          {/* Position & Size */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "X", key: "x" as const, max: CANVAS_W - selectedEl.w },
              { label: "Y", key: "y" as const, max: CANVAS_H - selectedEl.h },
              { label: "Ancho", key: "w" as const, max: CANVAS_W - selectedEl.x, min: 30 },
              { label: "Alto", key: "h" as const, max: CANVAS_H - selectedEl.y, min: 3 },
            ].map(({ label, key: k, max, min }) => (
              <div key={k}>
                <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider block mb-1">{label}</label>
                <input type="number" value={selectedEl[k]}
                  onChange={(e) => updateElement(selectedEl.id, { [k]: Math.max(min || 0, Math.min(max, +e.target.value)) })}
                  className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-gray-900 dark:text-white outline-none font-mono" />
              </div>
            ))}
          </div>

          <div className="flex items-center gap-4 flex-wrap pt-1">
            {/* Font size */}
            {selectedEl.type !== "qr" && selectedEl.type !== "divider" && selectedEl.type !== "decorative_line" && selectedEl.type !== "custom_image" && (
              <div className="flex items-center gap-2">
                <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">Tamaño</label>
                <input type="range" min={6} max={40} step={0.5} value={selectedEl.fontSize || 10}
                  onChange={(e) => updateElement(selectedEl.id, { fontSize: +e.target.value })} className="w-20 accent-primary" />
                <span className="text-xs font-mono text-gray-600 dark:text-gray-300 w-8">{selectedEl.fontSize || 10}</span>
              </div>
            )}

            {/* Line thickness for dividers */}
            {(selectedEl.type === "divider" || selectedEl.type === "decorative_line") && (
              <div className="flex items-center gap-2">
                <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">Grosor</label>
                <input type="range" min={1} max={6} step={0.5} value={selectedEl.fontSize || 2}
                  onChange={(e) => updateElement(selectedEl.id, { fontSize: +e.target.value })} className="w-20 accent-primary" />
                <span className="text-xs font-mono text-gray-600 dark:text-gray-300 w-8">{selectedEl.fontSize || 2}px</span>
              </div>
            )}

            {/* Upload for images & signatures */}
            {(selectedEl.type === "custom_image" || selectedEl.type === "signature") && (
              <div className="flex items-center gap-2">
                <button onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-teal-500/10 text-teal-600 hover:bg-teal-500/20 transition-colors">
                  <span className="material-symbols-outlined text-sm">upload</span>
                  {selectedEl.imageUrl ? "Cambiar Imagen" : "Subir Imagen"}
                </button>
                {selectedEl.imageUrl && (
                  <button onClick={() => updateElement(selectedEl.id, { imageUrl: "" })}
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-red-500 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors">
                    <span className="material-symbols-outlined text-sm">delete</span>
                    Quitar
                  </button>
                )}
              </div>
            )}

            {/* Alignment */}
            {selectedEl.type !== "divider" && selectedEl.type !== "decorative_line" && selectedEl.type !== "qr" && selectedEl.type !== "custom_image" && (
              <div className="flex items-center gap-0.5 bg-gray-100 dark:bg-white/10 rounded-lg p-0.5">
                {(["left", "center", "right"] as const).map((a) => (
                  <button key={a} onClick={() => updateElement(selectedEl.id, { align: a })}
                    className={`p-1.5 rounded-md transition-all ${selectedEl.align === a ? "bg-white dark:bg-white/20 shadow-sm text-primary" : "text-gray-400 hover:text-gray-600"}`}>
                    <span className="material-symbols-outlined text-sm">
                      {a === "left" ? "format_align_left" : a === "center" ? "format_align_center" : "format_align_right"}
                    </span>
                  </button>
                ))}
              </div>
            )}

            {/* Visibility toggle */}
            <button onClick={() => { updateElement(selectedEl.id, { visible: false }); setSelected(null) }}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-orange-500 bg-orange-50 dark:bg-orange-900/20 hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors">
              <span className="material-symbols-outlined text-sm">visibility_off</span>
              Ocultar
            </button>
          </div>

          {/* ── Type-specific fields ── */}
          {/* Signature fields */}
          {selectedEl.type === "signature" && (
            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-gray-100 dark:border-white/5">
              <div>
                <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider block mb-1">Nombre del Firmante</label>
                <input type="text" value={selectedEl.signerName || ""}
                  onChange={(e) => updateElement(selectedEl.id, { signerName: e.target.value })}
                  placeholder="Dr. Nombre Apellido"
                  className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-gray-900 dark:text-white outline-none" />
              </div>
              <div>
                <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider block mb-1">Cargo / Rol</label>
                <input type="text" value={selectedEl.signerRole || ""}
                  onChange={(e) => updateElement(selectedEl.id, { signerRole: e.target.value })}
                  placeholder="Director del Curso"
                  className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-gray-900 dark:text-white outline-none" />
              </div>
            </div>
          )}

          {/* Custom text / body text field */}
          {(selectedEl.type === "custom_text" || selectedEl.type === "body" || selectedEl.type === "title" || selectedEl.type === "header" || selectedEl.type === "date") && (
            <div className="pt-2 border-t border-gray-100 dark:border-white/5">
              <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider block mb-1">Contenido del Texto</label>
              <textarea value={selectedEl.customText || ""}
                onChange={(e) => updateElement(selectedEl.id, { customText: e.target.value })}
                placeholder="Escribe el texto aquí..."
                rows={2}
                className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-gray-900 dark:text-white outline-none resize-y" />
            </div>
          )}
        </div>
      )}

      {/* ══════════════════════════════════════════
          ELEMENT MANAGER PANEL
      ══════════════════════════════════════════ */}
      {showManager && (
        <div className="bg-white dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/5 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100 dark:border-white/5 flex items-center justify-between">
            <h4 className="text-xs font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-base">dashboard_customize</span>
              Gestión de Elementos
              <span className="text-[10px] font-normal text-gray-400 ml-1">{visibleElements.length} / {layout.length} visibles</span>
            </h4>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-100 dark:bg-white/5">
            {layout.map((el) => {
              const meta = TYPE_META[el.type]
              const isVis = el.visible
              const isSel = selected === el.id

              return (
                <div key={el.id}
                  className="bg-white dark:bg-gray-950 p-3 flex items-center gap-3 transition-all cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5"
                  style={isSel ? { outline: `2px solid ${meta.color}`, outlineOffset: -2 } : {}}
                  onClick={() => { if (!previewMode) setSelected(el.id) }}
                >
                  {/* Icon */}
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${meta.color}15` }}>
                    <span className="material-symbols-outlined text-base" style={{ color: isVis ? meta.color : "#9ca3af" }}>{meta.icon}</span>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs font-semibold truncate ${isVis ? "text-gray-900 dark:text-white" : "text-gray-400 line-through"}`}>
                      {el.label || meta.defaultLabel}
                    </p>
                    <p className="text-[10px] text-gray-400 truncate">{meta.defaultLabel}</p>
                    {isVis && (
                      <p className="text-[9px] text-gray-300 dark:text-gray-600 font-mono mt-0.5">
                        x:{el.x} y:{el.y} · {el.w}×{el.h}
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-0.5 shrink-0">
                    <button
                      onClick={(e) => { e.stopPropagation(); duplicateElement(el.id) }}
                      className="p-1 rounded-md text-gray-300 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                      title="Duplicar"
                    >
                      <span className="material-symbols-outlined text-sm">content_copy</span>
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); updateElement(el.id, { visible: !isVis }); if (!isVis) setSelected(el.id) }}
                      className={`p-1 rounded-md transition-all ${isVis ? "text-gray-300 hover:text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/20" : "text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20"}`}
                      title={isVis ? "Ocultar" : "Mostrar"}
                    >
                      <span className="material-symbols-outlined text-sm">{isVis ? "visibility" : "visibility_off"}</span>
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); deleteElement(el.id) }}
                      className="p-1 rounded-md text-gray-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                      title="Eliminar"
                    >
                      <span className="material-symbols-outlined text-sm">delete_outline</span>
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      <p className="text-[10px] text-gray-400 text-center">
        {previewMode
          ? "Vista previa • Haz clic en \"Modo Edición\" para modificar la posición de los elementos"
          : "Arrastra los elementos para posicionarlos • Clic para seleccionar • El diseño se aplica al PDF final"}
      </p>
    </div>
  )
}
