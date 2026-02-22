import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import crypto from "crypto";
import type { Database } from "@/types/supabase";

const webhookSecret = process.env.MUX_WEBHOOK_SECRET;

// Inicializamos el cliente Supabase usando la service_role key para ignorar RLS en el webhooks
const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

function verifyWebhookSignature(payload: string, signatureRaw: string, secret: string) {
  // Extract timestamp (t) and signature (v1) from the signature header
  // format: t=1612461022,v1=5257a869e7ecebea0d8051152d2b591b702ecbc21fde7a68....
  const elements = signatureRaw.split(",");
  const tStr = elements.find(el => el.startsWith("t="));
  const v1Str = elements.find(el => el.startsWith("v1="));

  if (!tStr || !v1Str) return false;

  const t = tStr.split("=")[1];
  const v1 = v1Str.split("=")[1];

  const payloadWithTime = `${t}.${payload}`;

  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(payloadWithTime)
    .digest("hex");

  return expectedSignature === v1;
}

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const headersList = req.headers;
    const signature = headersList.get("mux-signature");

    if (webhookSecret && signature) {
      if (!verifyWebhookSignature(rawBody, signature, webhookSecret)) {
        console.error("Firma de webhook de Mux no válida");
        return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
      }
    }

    const event = JSON.parse(rawBody);

    console.log(`[Mux Webhook] Recibido evento: ${event.type}`);

    // Cuando el video ha terminado de procesarse
    if (event.type === "video.asset.ready") {
      const asset = event.data;
      const uploadId = asset.upload_id;
      const playbackId = asset.playback_ids?.find((p: { policy: string, id: string }) => p.policy === "public")?.id;

      if (!uploadId || !playbackId) {
         return NextResponse.json({ message: "No playback ID / uploadId found" }, { status: 400 });
      }

      // Buscamos la lección creada como "Borrador" vinculada a este `upload_id` y actualizamos el asset
      const { error } = await supabase
        .from('lessons')
        .update({
          mux_asset_id: asset.id,
          mux_playback_id: playbackId,
        } as any)
        .eq('mux_upload_id', uploadId);

      if (error) {
         console.error("Error al actualizar lección con Mux Info:", error);
         return NextResponse.json({ message: "Database Error" }, { status: 500 });
      }
      
      console.log(`Lección actualizada con éxito. Playback ID insertado para: ${uploadId}`);
    }

    return NextResponse.json({ message: "OK" }, { status: 200 });

  } catch (error: unknown) {
    console.error("Mux Webhook Server Error:", error);
    return NextResponse.json({ message: error instanceof Error ? error.message : "Desconocido" }, { status: 500 });
  }
}
