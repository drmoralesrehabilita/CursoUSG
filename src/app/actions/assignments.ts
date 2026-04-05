'use server'

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { SupabaseClient } from "@supabase/supabase-js";

/**
 * Valida si el usuario actual tiene permisos de administrador.
 */
async function verifyAdmin(supabase: SupabaseClient) {
  const { data: user, error: authError } = await supabase.auth.getUser();
  if (authError || !user?.user) return false;
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.user.id).single();
  return profile?.role === 'admin';
}

// --- ADMIN ACTIONS ---

export async function getAssignmentsByModule(moduleId: string) {
  const supabase = await createClient();
  if (!(await verifyAdmin(supabase))) return { success: false, error: "Not an admin" };

  const { data, error } = await supabase
    .from("assignments")
    .select(`
      *,
      submissions:assignment_submissions(id, status, grade)
    `)
    .eq("module_id", moduleId)
    .order("created_at", { ascending: false });

  if (error) return { success: false, error: error.message };
  return { success: true, data };
}

export async function createAssignment(data: {
  moduleId: string;
  title: string;
  instructions: string;
  dueDate: string | null;
  isPublished: boolean;
}) {
  const supabase = await createClient();
  if (!(await verifyAdmin(supabase))) return { success: false, error: "Not an admin" };

  const { data: user } = await supabase.auth.getUser();

  const { error } = await supabase.from("assignments").insert({
    module_id: data.moduleId,
    title: data.title,
    instructions: data.instructions,
    due_date: data.dueDate,
    is_published: data.isPublished,
    created_by: user.user?.id
  });

  if (error) return { success: false, error: error.message };

  revalidatePath("/admin/tareas");
  revalidatePath("/admin/contenido");
  return { success: true };
}

export async function updateAssignment(id: string, data: {
  title: string;
  instructions: string;
  dueDate: string | null;
  isPublished: boolean;
}) {
  const supabase = await createClient();
  if (!(await verifyAdmin(supabase))) return { success: false, error: "Not an admin" };

  const { error } = await supabase.from("assignments").update({
    title: data.title,
    instructions: data.instructions,
    due_date: data.dueDate,
    is_published: data.isPublished,
  }).eq("id", id);

  if (error) return { success: false, error: error.message };

  revalidatePath("/admin/tareas");
  return { success: true };
}

export async function deleteAssignment(id: string) {
  const supabase = await createClient();
  if (!(await verifyAdmin(supabase))) return { success: false, error: "Not an admin" };

  const { error } = await supabase.from("assignments").delete().eq("id", id);

  if (error) return { success: false, error: error.message };

  revalidatePath("/admin/tareas");
  return { success: true };
}

export async function getSubmissionsForAssignment(assignmentId: string) {
  const supabase = await createClient();
  if (!(await verifyAdmin(supabase))) return { success: false, error: "Not an admin" };

  // Obtener submissions juntando con profiles
  const { data, error } = await supabase
    .from("assignment_submissions")
    .select(`
      *,
      profile:profiles!student_id(full_name, email)
    `)
    .eq("assignment_id", assignmentId)
    .order("submitted_at", { ascending: false });

  if (error) return { success: false, error: error.message };
  return { success: true, data };
}

export async function gradeSubmission(submissionId: string, grade: number, feedback: string) {
  const supabase = await createClient();
  if (!(await verifyAdmin(supabase))) return { success: false, error: "Not an admin" };

  const { error } = await supabase.from("assignment_submissions").update({
    grade,
    feedback,
    status: 'graded',
    graded_at: new Date().toISOString()
  }).eq("id", submissionId);

  if (error) return { success: false, error: error.message };

  revalidatePath("/admin/tareas");
  return { success: true };
}


// --- STUDENT ACTIONS ---

export async function getStudentAssignments() {
  const supabase = await createClient();
  const { data: user } = await supabase.auth.getUser();
  if (!user?.user) return { success: false, error: "Not logged in" };

  // Aquí obtenemos las tareas publicadas y sus respectivos envíos por parte del alumno
  const { data, error } = await supabase
    .from("assignments")
    .select(`
      *,
      module:modules(title),
      submissions:assignment_submissions(*)
    `)
    .eq("is_published", true)
    .order("due_date", { ascending: true });

  if (error) return { success: false, error: error.message };

  // Filtramos los submissions para que sean solo del estudiante actual
  const assignments = data.map((assignment: any) => ({
    ...assignment,
    mySubmission: assignment.submissions?.find((s: any) => s.student_id === user.user.id) || null
  }));

  return { success: true, data: assignments };
}

export async function submitAssignment(assignmentId: string, fileUrl: string, fileName: string) {
  const supabase = await createClient();
  const { data: user } = await supabase.auth.getUser();
  if (!user?.user) return { success: false, error: "Not logged in" };

  // Verificar si ya existe (upsert)
  const { data: existing } = await supabase
    .from("assignment_submissions")
    .select("id")
    .eq("assignment_id", assignmentId)
    .eq("student_id", user.user.id)
    .single();

  if (existing) {
    const { error } = await supabase.from("assignment_submissions").update({
      file_url: fileUrl,
      file_name: fileName,
      status: 'submitted',
      submitted_at: new Date().toISOString()
    }).eq("id", existing.id);
    
    if (error) return { success: false, error: error.message };
  } else {
    const { error } = await supabase.from("assignment_submissions").insert({
      assignment_id: assignmentId,
      student_id: user.user.id,
      file_url: fileUrl,
      file_name: fileName,
      status: 'submitted',
      submitted_at: new Date().toISOString()
    });

    if (error) return { success: false, error: error.message };
  }

  revalidatePath("/dashboard/tareas");
  revalidatePath("/dashboard");
  return { success: true };
}
