---
name: Mux Video Pipeline
description: Pipeline completo de video con Mux. Cubre upload directo con UpChunk, procesamiento asíncrono, webhook de Mux, verificación de firma, actualización de playback_id en lecciones, y reproducción con @mux/mux-player-react. Incluye credenciales, signing keys, y troubleshooting.
---

# Mux Video Pipeline

## Flujo Completo (Diagrama)

```
Admin UI → createMuxDirectUpload() → Mux Direct Upload URL
                ↓
         Lección creada en DB con mux_upload_id (borrador, is_published=false)
                ↓
UploadEngine.tsx → @mux/upchunk → sube archivo en chunks de 5MB a Mux
                ↓
Mux procesa el video (encoding, transcoding)
                ↓
Mux envía webhook "video.asset.ready" → /api/webhooks/mux
                ↓
Webhook actualiza la lección: mux_asset_id + mux_playback_id
                ↓
MuxPlayer renderiza con playbackId={lesson.mux_playback_id}
```

## Variables de Entorno

```env
# API Credentials (Access Token con permisos Data, Video, System)
MUX_TOKEN_ID=dea4517a-...
MUX_TOKEN_SECRET=XyjW9XCz...

# Signing Key (para URLs firmadas / DRM futuro)
MUX_SIGNING_KEY_ID=K202uPfw8r...
MUX_SIGNING_KEY_PRIVATE_KEY="LS0tLS1C..." # Base64-encoded RSA private key

# Environment Key (para analytics / Mux Data)
MUX_ENV_KEY=qt7o54u20brr...

# Webhook Secret (para verificar firma HMAC-SHA256)
MUX_WEBHOOK_SECRET=<tu-secret-del-dashboard>
```

> **IMPORTANTE:** Las Signing Keys se generan en **Dashboard → Settings → Signing Keys**. Los Access Tokens en **Dashboard → Settings → Access Tokens** (necesitan permisos Video + Data + System). El webhook secret se obtiene al crear el webhook en **Dashboard → Settings → Webhooks**.

## Esquema de Base de Datos (tabla `lessons`)

| Columna | Tipo | Descripción |
|---|---|---|
| `mux_upload_id` | `text \| null` | ID del Direct Upload. Se usa como foreign key para vincular webhook → lección |
| `mux_asset_id` | `text \| null` | ID del Asset procesado por Mux (se llena vía webhook) |
| `mux_playback_id` | `text \| null` | ID de playback público (se llena vía webhook, se usa en `<MuxPlayer>`) |
| `is_master_camera` | `boolean` | Diferencia video de cámara vs. video de ecógrafo (para DualPlayer) |

## Paso 1: Crear Direct Upload (Server Action)

**Archivo:** `src/app/actions/contentSetup.ts`

```typescript
import Mux from "@mux/mux-node"

const mux = new Mux({
  tokenId: process.env.MUX_TOKEN_ID!,
  tokenSecret: process.env.MUX_TOKEN_SECRET!,
})

export async function createMuxDirectUpload(module_id: string, title?: string) {
  // 1. Crear Direct Upload en Mux API
  const upload = await mux.video.uploads.create({
    cors_origin: "*",
    new_asset_settings: {
      playback_policy: ["public"],  // usar ["signed"] para DRM
      video_quality: "basic",       // "basic"|"plus"|"premium"
      normalize_audio: true,
    },
    test: process.env.NODE_ENV === "development",
  })

  // 2. Guardar lección borrador con mux_upload_id
  await supabase.from("lessons").insert({
    module_id,
    title: title || "Nueva Lección (Procesando Video...)",
    lesson_type: "video",
    mux_upload_id: upload.id,  // ← clave para vincular con webhook
    is_published: false,
  })

  // 3. Retornar URL para que UpChunk suba el archivo
  return { success: true, uploadUrl: upload.url, uploadId: upload.id }
}
```

### Video Quality Tiers
- **basic**: Sin costo de encoding, calidad reducida. Ideal para desarrollo/testing.
- **plus**: Encoding per-title AI, alta calidad. Costo por minuto de video.
- **premium**: Máxima calidad, para contenido cinematográfico.

## Paso 2: Upload con UpChunk (Client Component)

**Archivo:** `src/components/admin/UploadEngine.tsx`

```typescript
import * as UpChunk from '@mux/upchunk'

// Después de obtener uploadUrl del server action:
const upload = UpChunk.createUpload({
  endpoint: uploadUrl,  // URL de Mux
  file: selectedFile,
  chunkSize: 5120,      // 5MB por chunk
})

upload.on('progress', (evt) => {
  // evt.detail es un número 0-100
  setProgress(Math.round(evt.detail))
})

upload.on('error', (err) => {
  console.error('UpChunk error:', err.detail)
  toast.error("Error transfiriendo a Mux")
})

upload.on('success', () => {
  toast.success("Video subido. Se procesará en unos minutos.")
})
```

> **Nota:** UpChunk maneja reintentos automáticos, chunking, y resume de uploads interrumpidos.

## Paso 3: Webhook — video.asset.ready

**Archivo:** `src/app/api/webhooks/mux/route.ts`

```typescript
import crypto from "crypto"

function verifyWebhookSignature(payload: string, signatureRaw: string, secret: string) {
  // Formato header: "t=1612461022,v1=5257a869e7ec..."
  const elements = signatureRaw.split(",")
  const t = elements.find(el => el.startsWith("t="))?.split("=")[1]
  const v1 = elements.find(el => el.startsWith("v1="))?.split("=")[1]
  if (!t || !v1) return false

  const expected = crypto
    .createHmac("sha256", secret)
    .update(`${t}.${payload}`)
    .digest("hex")

  return expected === v1
}

export async function POST(req: Request) {
  const rawBody = await req.text()
  const signature = req.headers.get("mux-signature")

  // Verificar firma
  if (webhookSecret && signature) {
    if (!verifyWebhookSignature(rawBody, signature, webhookSecret)) {
      return NextResponse.json({ message: "Invalid signature" }, { status: 401 })
    }
  }

  const event = JSON.parse(rawBody)

  if (event.type === "video.asset.ready") {
    const asset = event.data
    const uploadId = asset.upload_id
    const playbackId = asset.playback_ids?.find(p => p.policy === "public")?.id

    // Actualizar la lección con los IDs finales
    await supabase
      .from('lessons')
      .update({
        mux_asset_id: asset.id,
        mux_playback_id: playbackId,
      })
      .eq('mux_upload_id', uploadId)
  }

  return NextResponse.json({ message: "OK" }, { status: 200 })
}
```

### Eventos de Mux a manejar (actuales y futuros)

| Evento | Cuándo | Acción |
|---|---|---|
| `video.asset.ready` | Video procesado ✅ | Guardar `asset_id` + `playback_id` |
| `video.asset.errored` | Error en procesamiento | Marcar lección como fallida |
| `video.upload.cancelled` | Upload cancelado | Limpiar lección borrador |
| `video.asset.deleted` | Asset eliminado en Mux | Limpiar campos mux_* |

## Paso 4: Reproducción con MuxPlayer

**Package:** `@mux/mux-player-react`

```typescript
import MuxPlayer from "@mux/mux-player-react"

<MuxPlayer
  playbackId={lesson.mux_playback_id}  // ← ID del paso 3
  metadata={{ video_title: lesson.title }}
  className="w-full h-full"
/>
```

### Componentes que usan MuxPlayer

| Componente | Ubicación | Uso |
|---|---|---|
| `DualPlayer` | `src/components/player/DualPlayer.tsx` | Dual cámara/ecógrafo, swap |
| `LessonClient` | `src/app/lessons/[id]/LessonClient.tsx` | Vista de lección principal |
| `MicroLessonFeed` | `src/app/microlearning/MicroLessonFeed.tsx` | Feed de micro-lecciones |
| `MicroLessonViewer` | `src/app/microlearning/[id]/MicroLessonViewer.tsx` | Vista individual micro |
| `ContenidoClient` | `src/app/admin/contenido/ContenidoClient.tsx` | Preview en admin |

## Configuración en Mux Dashboard

### Webhook URL (producción)
```
https://tu-dominio.com/api/webhooks/mux
```

### Netlify (si se usa)
Agregar la ruta a Netlify env: el webhook funciona como API Route de Next.js.

## Troubleshooting

### Video se queda en "Procesando..."
1. Verificar que el webhook esté configurado en Mux Dashboard → Webhooks
2. Verificar `MUX_WEBHOOK_SECRET` en `.env`
3. Revisar logs del webhook: evento `video.asset.ready` debe llegar
4. Confirmar que `mux_upload_id` coincide entre la lección y el evento
5. En desarrollo, usar `ngrok` o similar para exponer localhost

### playback_id es null
- El webhook aún no ha llegado (el video sigue procesándose en Mux)
- El `upload_id` no coincide con ninguna lección en la DB
- El webhook falló silenciosamente (revisar logs de API)

### Error "Mux token invalid"
- Los tokens expiran si se revocan en el dashboard
- Verificar que `MUX_TOKEN_ID` y `MUX_TOKEN_SECRET` sean del Access Token correcto
- Verificar que el token tenga permisos "Video" habilitados

### test: true en producción
- `test: process.env.NODE_ENV === "development"` → assets de prueba se borran tras 24h
- En producción `NODE_ENV=production` → assets son permanentes

## Paquetes npm Requeridos

```json
{
  "@mux/mux-node": "^9.x",           // SDK server-side
  "@mux/upchunk": "^3.x",            // Chunked upload client-side
  "@mux/mux-player-react": "^3.x"    // Player component React
}
```

## Archivos de Referencia

- `src/app/actions/contentSetup.ts` — `createMuxDirectUpload()`, Mux SDK init
- `src/components/admin/UploadEngine.tsx` — UI de upload con UpChunk
- `src/app/api/webhooks/mux/route.ts` — Webhook handler con verificación HMAC
- `src/components/player/DualPlayer.tsx` — Reproductor dual cámara/ecógrafo
- `src/app/lessons/[id]/LessonClient.tsx` — Vista lección con MuxPlayer
- `src/app/microlearning/MicroLessonFeed.tsx` — Feed con MuxPlayer
- `.env` — Credenciales MUX_TOKEN_ID, MUX_TOKEN_SECRET, MUX_SIGNING_KEY_*
