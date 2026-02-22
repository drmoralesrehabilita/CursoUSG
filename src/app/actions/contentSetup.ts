'use server'

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import Mux from "@mux/mux-node";

const mux = new Mux({
  tokenId: process.env.MUX_TOKEN_ID!,
  tokenSecret: process.env.MUX_TOKEN_SECRET!,
});

/**
 * Registra una nueva lección (video) en la base de datos.
 * Este action recibe el Mux Asset ID (generado por el webhook de Mux) y crea el registro.
 * La subida inicial se maneja con createMuxDirectUpload.
 */
export async function createVideoLesson(data: {
  moduleId: string;
  title: string;
  description?: string;
  thumbnailUrl?: string;
  muxAssetId?: string; // Expect Mux Asset ID instead of direct video URLs
  isMasterCamera?: boolean;
}) {
  const supabase = await createClient();

  const { data: user, error: authError } = await supabase.auth.getUser();
  if (authError || !user?.user) return { success: false, error: "Unauthorized" };

  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.user.id).single();
  if (profile?.role !== 'admin') return { success: false, error: "Not an admin" };

  const { error } = await supabase.from("lessons").insert({
    module_id: data.moduleId,
    title: data.title,
    description: data.description || "",
    thumbnail_url: data.thumbnailUrl || null,
    mux_asset_id: data.muxAssetId || null, // Store Mux Asset ID
    lesson_type: "video",
    is_master_camera: data.isMasterCamera !== false,
    is_published: true // o false dependiendondel estado inicial
  });

  if (error) {
    console.error("DB error adding lesson:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/admin/contenido");
  return { success: true };
}

/**
 * Registra un material (documento/pdf) en una lección existente
 */
export async function addDocumentToLesson(data: {
  lessonId: string;
  documentTitle: string;
  documentUrl: string; // URL en Supabase Storage
}) {
  const supabase = await createClient();

  // Verificación de admin
  const { data: user } = await supabase.auth.getUser();
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user?.user?.id).single();
  if (profile?.role !== 'admin') return { success: false, error: "Not an admin" };

  // Obtenemos los materiales previos
  const { data: lesson, error: fetchError } = await supabase.from("lessons").select("materials").eq("id", data.lessonId).single();
  if (fetchError || !lesson) return { success: false, error: "Lección no encontrada" };

  const materials = Array.isArray(lesson.materials) ? lesson.materials : [];
  materials.push({ title: data.documentTitle, url: data.documentUrl });

  const { error } = await supabase.from("lessons").update({
    materials,
    lesson_type: "document"
  }).eq("id", data.lessonId);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/admin/contenido");
  return { success: true };
}

/**
 * Registra un Quiz y sus Preguntas de forma masiva (Quiz Builder)
 */
export async function createQuiz(data: {
  lessonId: string;
  title: string;
  minScore: number;
  questions: Array<{
    questionText: string;
    options: Array<{ id: string; text: string; feedback_clinical?: string }>;
    correctOptionId: string;
    score: number;
    difficulty?: number;
    is_critical?: boolean;
    image_url?: string;
    pearl?: string;
    source_reference?: string;
    findings?: Array<{ type: string; label: string; value: string }>;
  }>;
}) {
  const supabase = await createClient();
  
  const { data: user } = await supabase.auth.getUser();
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user?.user?.id).single();
  if (profile?.role !== 'admin') return { success: false, error: "Not an admin" };

  // 1. Crear el Quiz
  const { data: quizIdData, error: quizError } = await supabase
    .from("quizzes")
    .insert({
      lesson_id: data.lessonId,
      title: data.title,
      min_score_to_pass: data.minScore
    })
    .select("id")
    .single();

  if (quizError || !quizIdData) {
    console.error("Quiz Error:", quizError);
    return { success: false, error: quizError?.message };
  }

  // 2. Marcar la lección como de tipo 'quiz'
  await supabase.from("lessons").update({ lesson_type: "quiz" }).eq("id", data.lessonId);

  // 3. Crear las Preguntas
  const questionsToInsert = data.questions.map((q, index) => ({
    quiz_id: quizIdData.id,
    question_text: q.questionText,
    options: q.options,
    correct_option_id: q.correctOptionId,
    score: q.score,
    order_index: index,
    difficulty: q.difficulty || 1,
    is_critical: q.is_critical || false,
    image_url: q.image_url || null,
    pearl: q.pearl || null,
    source_reference: q.source_reference || null,
    findings: q.findings || []
  }));

  const { error: qtError } = await supabase.from("questions").insert(questionsToInsert);

  if (qtError) {
    console.error("Question Insert Error:", qtError);
    return { success: false, error: "Error insertando preguntas" };
  }

  revalidatePath("/admin/contenido");
  return { success: true, quizId: quizIdData.id };
}

/**
 * Marca una lección como completada por el usuario, actualiza el puntaje.
 * Un trigger en PostgreSQL se encargará de recalcular el porcentaje del módulo y el certificado global.
 */
export async function completeLessonProgress(lessonId: string, score: number | null = null) {
  const supabase = await createClient();
  const { data: user } = await supabase.auth.getUser();
  if (!user?.user?.id) return { success: false, error: "No user found" };

  const { error } = await supabase.from("lesson_progress").upsert({
    user_id: user.user.id,
    lesson_id: lessonId,
    is_completed: true,
    score: score,
    completed_at: new Date().toISOString()
  }, { onConflict: "user_id, lesson_id" });

  if (error) {
    console.error("Error saving progress:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/dashboard");
  return { success: true };
}

// ====== MODULE MANAGEMENT ======

export async function createMuxDirectUpload(module_id: string, title?: string) {
  const supabase = await createClient();
  const { data: user } = await supabase.auth.getUser();
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user?.user?.id).single();
  if (profile?.role !== 'admin') return { success: false, error: "No tienes permiso para subir videos." };

  try {
    const upload = await mux.video.uploads.create({
      cors_origin: "*",
      new_asset_settings: {
        playback_policy: ["public"], // Cambiaremos a ["signed"] cuando protejamos URLs en el futuro
        video_quality: "basic",
        normalize_audio: true,
      },
      test: process.env.NODE_ENV === "development",
    });

    // Guardaremos este uploadId de MUX en BD como lección "Borrador"
    const { data: newLesson, error } = await supabase.from("lessons").insert({
      module_id,
      title: title || "Nueva Lección (Procesando Video...)",
      lesson_type: "video",
      mux_upload_id: upload.id,
      is_published: false
    }).select("id").single();

    if (error) {
      console.error(error);
      return { success: false, error: error.message };
    }

    revalidatePath("/admin/contenido");
    return { success: true, uploadUrl: upload.url, uploadId: upload.id, newLessonId: newLesson.id };
  } catch (error: unknown) {
    console.error("Mux Upload Error:", error);
    return { success: false, error: error instanceof Error ? error.message : "Error conectando con Mux." };
  }
}

export async function createDocumentLesson({ moduleId, title, documentUrl }: { moduleId: string; title: string; documentUrl: string }) {
  const supabase = await createClient();
  const { data: user } = await supabase.auth.getUser();
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user?.user?.id).single();
  if (profile?.role !== 'admin') return { success: false, error: "Not an admin" };

  // Insert the new document lesson
  const { data: newLesson, error } = await supabase.from("lessons").insert({
    module_id: moduleId,
    title: title,
    lesson_type: "document",
    materials: [{ title: title, url: documentUrl }], // Store the document as a material
    is_published: true // Or false, depending on initial state
  }).select("id").single();

  if (error) {
    console.error("DB error adding document lesson:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/admin/contenido");
  return { success: true, newLessonId: newLesson.id };
}

export async function createModule(data: { title: string; description?: string; thumbnail_url?: string; prerequisite_module_id?: string | null }) {
  const supabase = await createClient();
  const { data: user } = await supabase.auth.getUser();
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user?.user?.id).single();
  if (profile?.role !== 'admin') return { success: false, error: "Not an admin" };

  const { error } = await supabase.from("modules").insert({
    title: data.title,
    description: data.description || "",
    thumbnail_url: data.thumbnail_url || null,
    prerequisite_module_id: data.prerequisite_module_id || null,
    is_published: false
  });

  if (error) return { success: false, error: error.message };
  revalidatePath("/admin/contenido");
  return { success: true };
}

export async function updateModule(id: string, data: { title: string; description?: string; thumbnail_url?: string; prerequisite_module_id?: string | null }) {
  const supabase = await createClient();
  const { data: user } = await supabase.auth.getUser();
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user?.user?.id).single();
  if (profile?.role !== 'admin') return { success: false, error: "Not an admin" };

  const { error } = await supabase.from("modules").update({
    title: data.title,
    description: data.description || "",
    thumbnail_url: data.thumbnail_url !== undefined ? data.thumbnail_url : null,
    prerequisite_module_id: data.prerequisite_module_id !== undefined ? data.prerequisite_module_id : null,
  }).eq("id", id);

  if (error) return { success: false, error: error.message };
  revalidatePath("/admin/contenido");
  return { success: true };
}

export async function deleteModule(id: string) {
  const supabase = await createClient();
  const { data: user } = await supabase.auth.getUser();
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user?.user?.id).single();
  if (profile?.role !== 'admin') return { success: false, error: "Not an admin" };

  const { error } = await supabase.from("modules").delete().eq("id", id);
  if (error) return { success: false, error: error.message };
  revalidatePath("/admin/contenido");
  return { success: true };
}

// ====== LESSON MANAGEMENT ======

export async function updateLesson(id: string, data: { title: string; description?: string; thumbnail_url?: string; is_published: boolean; materials?: Array<{title: string, url: string}>; duration_minutes?: number | null; difficulty?: string | null; prerequisite_lesson_id?: string | null }) {
  const supabase = await createClient();
  const { data: user } = await supabase.auth.getUser();
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user?.user?.id).single();
  if (profile?.role !== 'admin') return { success: false, error: "Not an admin" };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateData: any = {
    title: data.title,
    description: data.description !== undefined ? data.description : null,
    thumbnail_url: data.thumbnail_url !== undefined ? data.thumbnail_url : null,
    is_published: data.is_published,
    duration_minutes: data.duration_minutes !== undefined ? data.duration_minutes : null,
    difficulty: data.difficulty !== undefined ? data.difficulty : null,
    prerequisite_lesson_id: data.prerequisite_lesson_id !== undefined ? data.prerequisite_lesson_id : null,
  };
  
  if (data.materials !== undefined) {
    updateData.materials = data.materials;
  }

  const { error } = await supabase.from("lessons").update(updateData).eq("id", id);

  if (error) return { success: false, error: error.message };
  revalidatePath("/admin/contenido");
  return { success: true };
}

export async function deleteLesson(id: string) {
  const supabase = await createClient();
  const { data: user } = await supabase.auth.getUser();
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user?.user?.id).single();
  if (profile?.role !== 'admin') return { success: false, error: "Not an admin" };

  const { error } = await supabase.from("lessons").delete().eq("id", id);
  if (error) return { success: false, error: error.message };
  revalidatePath("/admin/contenido");
  return { success: true };
}

export async function reorderLessons(lessonIds: string[]) {
  const supabase = await createClient();
  const { data: user } = await supabase.auth.getUser();
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user?.user?.id).single();
  if (profile?.role !== 'admin') return { success: false, error: "Not an admin" };

  // Ejecutamos las promesas en paralelo para actualizar el `order_index` de todos los elementos afectados
  const promises = lessonIds.map((id, index) => 
    supabase.from("lessons").update({ order_index: index }).eq("id", id)
  );

  await Promise.all(promises);
  revalidatePath("/admin/contenido");
  
  return { success: true };
}
