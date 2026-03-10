"use server"

import { createClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { revalidatePath } from "next/cache"

export async function toggleStudentStatus(
  userId: string,
  isActive: boolean
): Promise<{ success: boolean; error?: string }> {
  // Verify the caller is an admin using the session-based client
  const supabase = await createClient()
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    return { success: false, error: "No autenticado" }
  }

  const { data: callerProfile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single()

  if (profileError || callerProfile?.role !== "admin") {
    return { success: false, error: "Sin permisos de administrador" }
  }

  // Use service role client (bypasses ALL RLS) for the actual update
  const adminClient = createAdminClient()

  const { data, error } = await adminClient
    .from("profiles")
    .update({ is_active: isActive })
    .eq("id", userId)
    .select("id, is_active")

  if (error) {
    console.error("[Admin] toggleStudentStatus error:", JSON.stringify(error))
    return { success: false, error: error.message }
  }

  if (!data || data.length === 0) {
    console.error("[Admin] toggleStudentStatus: no rows updated for userId:", userId)
    return { success: false, error: "No se encontró el usuario" }
  }

  console.log("[Admin] toggleStudentStatus success:", data)
  revalidatePath("/admin/alumnos")
  return { success: true }
}

export async function approveAccessRequest(
  userId: string
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    return { success: false, error: "No autenticado" }
  }

  const { data: callerProfile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single()

  if (profileError || callerProfile?.role !== "admin") {
    return { success: false, error: "Sin permisos de administrador" }
  }

  const adminClient = createAdminClient()

  const { data, error } = await adminClient
    .from("profiles")
    .update({ is_active: true })
    .eq("id", userId)
    .select("id, is_active")

  if (error) {
    console.error("[Admin] approveAccessRequest error:", JSON.stringify(error))
    return { success: false, error: error.message }
  }

  if (!data || data.length === 0) {
    console.error("[Admin] approveAccessRequest: no rows updated for userId:", userId)
    return { success: false, error: "No se encontró el usuario" }
  }

  console.log("[Admin] approveAccessRequest success:", data)
  revalidatePath("/admin/alumnos")
  return { success: true }
}

export async function deleteStudent(
  userId: string
): Promise<{ success: boolean; error?: string }> {
  // Verify the caller is an admin using the session-based client
  const supabase = await createClient()
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    return { success: false, error: "No autenticado" }
  }

  const { data: callerProfile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single()

  if (profileError || callerProfile?.role !== "admin") {
    return { success: false, error: "Sin permisos de administrador" }
  }

  // Prevent self-deletion
  if (user.id === userId) {
    return { success: false, error: "No puedes eliminar tu propia cuenta" }
  }

  const adminClient = createAdminClient()

  // Delete related data first (lesson_progress, enrollments)
  await adminClient.from("lesson_progress").delete().eq("user_id", userId)
  await adminClient.from("enrollments").delete().eq("user_id", userId)

  // Delete the profile
  const { error: profileDeleteError } = await adminClient
    .from("profiles")
    .delete()
    .eq("id", userId)

  if (profileDeleteError) {
    console.error("[Admin] deleteStudent profile error:", JSON.stringify(profileDeleteError))
    return { success: false, error: profileDeleteError.message }
  }

  // Delete the auth user
  const { error: authDeleteError } = await adminClient.auth.admin.deleteUser(userId)

  if (authDeleteError) {
    console.error("[Admin] deleteStudent auth error:", JSON.stringify(authDeleteError))
    return { success: false, error: authDeleteError.message }
  }

  console.log("[Admin] deleteStudent success for userId:", userId)
  revalidatePath("/admin/alumnos")
  return { success: true }
}
