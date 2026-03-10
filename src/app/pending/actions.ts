"use server"

import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

export async function requestAccess(): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { success: false, error: "No autenticado" }
  }

  const { error } = await supabase
    .from("profiles")
    .update({
      access_requested: true,
      access_requested_at: new Date().toISOString(),
    })
    .eq("id", user.id)

  if (error) {
    console.error("[Pending] requestAccess error:", error)
    return { success: false, error: error.message }
  }

  revalidatePath("/pending")
  revalidatePath("/admin/alumnos")
  return { success: true }
}

export async function signOutAction() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect("/login")
}
