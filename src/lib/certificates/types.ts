// ─────────────────────────────────────────────────
// Certificate Element Types & Utilities
// Shared between client and server components
// ─────────────────────────────────────────────────

export type ElementType =
  | "header"
  | "title"
  | "recipient"
  | "body"
  | "signature"
  | "qr"
  | "folio"
  | "course_name"
  | "course_hours"
  | "date"
  | "divider"
  | "decorative_line"
  | "custom_image"
  | "custom_text"

export type CertElement = {
  id: string
  type: ElementType
  x: number
  y: number
  w: number
  h: number
  visible: boolean
  fontSize?: number
  align?: "left" | "center" | "right"
  imageUrl?: string
  customText?: string
  signerName?: string
  signerRole?: string
  label?: string
}

// ─── Legacy types (backward compatibility) ───
export type ElementLayout = {
  x: number
  y: number
  w: number
  h: number
  visible: boolean
  fontSize?: number
  align?: "left" | "center" | "right"
  imageUrl?: string
}

export type ElementLayoutMap = {
  header: ElementLayout
  title: ElementLayout
  recipient: ElementLayout
  body: ElementLayout
  signature: ElementLayout
  qr: ElementLayout
  folio: ElementLayout
  course_name: ElementLayout
  course_hours: ElementLayout
  date: ElementLayout
  divider: ElementLayout
  decorative_line: ElementLayout
  custom_image: ElementLayout
}

// ─── Migration: legacy → dynamic array ───
export function migrateLayoutToArray(legacy: ElementLayoutMap): CertElement[] {
  return Object.entries(legacy).map(([key, el]) => ({
    id: `legacy_${key}`,
    type: key as ElementType,
    x: el.x,
    y: el.y,
    w: el.w,
    h: el.h,
    visible: el.visible,
    fontSize: el.fontSize,
    align: el.align,
    imageUrl: el.imageUrl,
  }))
}

/**
 * Detect whether element_layout is legacy (object with known keys) or new (array).
 * Returns CertElement[] in either case.
 */
export function normalizeLayout(raw: unknown): CertElement[] | null {
  if (!raw) return null
  if (Array.isArray(raw)) return raw as CertElement[]
  if (typeof raw === "object" && raw !== null && "header" in raw) {
    return migrateLayoutToArray(raw as ElementLayoutMap)
  }
  return null
}
