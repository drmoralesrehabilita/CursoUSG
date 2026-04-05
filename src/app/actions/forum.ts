'use server'

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function createForumThread(data: {
  title: string
  body: string
  category: string
}) {
  const supabase = await createClient()
  const { data: user } = await supabase.auth.getUser()
  if (!user?.user?.id) return { success: false, error: "No autenticado" }

  if (!data.title.trim() || !data.body.trim()) {
    return { success: false, error: "El título y el contenido son requeridos." }
  }

  const { data: newThread, error } = await supabase.from("forum_threads").insert({
    author_id: user.user.id,
    title: data.title.trim(),
    body: data.body.trim(),
    category: data.category || "General",
  }).select(`
    id, title, body, category, is_pinned, is_official,
    reply_count, like_count, created_at,
    profiles (full_name, role)
  `).single()

  if (error) {
    console.error("[Forum] Error creating thread:", error)
    return { success: false, error: error.message }
  }

  revalidatePath("/community")
  return { success: true, thread: newThread }
}

export async function createForumPost(data: {
  threadId: string
  body: string
}) {
  const supabase = await createClient()
  const { data: user } = await supabase.auth.getUser()
  if (!user?.user?.id) return { success: false, error: "No autenticado" }

  if (!data.body.trim()) {
    return { success: false, error: "La respuesta no puede estar vacía." }
  }

  const { data: newPost, error } = await supabase.from("forum_posts").insert({
    thread_id: data.threadId,
    author_id: user.user.id,
    body: data.body.trim(),
  }).select(`
    id, body, like_count, created_at,
    profiles (full_name, role)
  `).single()

  if (error) {
    console.error("[Forum] Error creating post:", error)
    return { success: false, error: error.message }
  }

  revalidatePath(`/community/${data.threadId}`)
  revalidatePath("/community")
  return { success: true, post: newPost }
}

export async function toggleThreadLike(threadId: string) {
  const supabase = await createClient()
  const { data: result, error } = await supabase.rpc("toggle_thread_like", {
    p_thread_id: threadId,
  })

  if (error) {
    console.error("[Forum] Error toggling like:", error)
    return { success: false, error: error.message }
  }

  revalidatePath("/community")
  return { success: true, data: result?.[0] }
}

export async function deleteForumThread(threadId: string) {
  const supabase = await createClient()
  const { data: user } = await supabase.auth.getUser()
  if (!user?.user?.id) return { success: false, error: "No autenticado" }

  const { error } = await supabase
    .from("forum_threads")
    .delete()
    .eq("id", threadId)

  if (error) {
    console.error("[Forum] Error deleting thread:", error)
    return { success: false, error: error.message }
  }

  revalidatePath("/community")
  return { success: true }
}

export async function uploadForumImage(formData: FormData) {
  const supabase = await createClient()
  const { data: user } = await supabase.auth.getUser()
  
  if (!user?.user?.id) {
    return { success: false, error: "No autenticado" }
  }

  const file = formData.get("file") as File
  if (!file) {
    return { success: false, error: "No se proporcionó ningún archivo" }
  }

  // Optimize image size if needed before uploading, or just restrict size server side
  if (file.size > 5 * 1024 * 1024) {
    return { success: false, error: "La imagen no debe pesar más de 5MB" }
  }

  const fileExt = file.name.split('.').pop()
  const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`
  const filePath = `${user.user.id}/${fileName}`

  const { error: uploadError } = await supabase.storage
    .from("forum-images")
    .upload(filePath, file)

  if (uploadError) {
    console.error("[Forum] Error uploading image:", uploadError)
    return { success: false, error: uploadError.message }
  }

  const { data: { publicUrl } } = supabase.storage
    .from("forum-images")
    .getPublicUrl(filePath)

  return { success: true, url: publicUrl }
}
