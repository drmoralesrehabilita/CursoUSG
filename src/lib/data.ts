import { createClient } from "./supabase/server";
import { ModuleWithLessons, Enrollment } from "@/types/app";
import { Database } from "@/types/supabase";

export async function getModules(): Promise<ModuleWithLessons[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("modules")
    .select("*, lessons(*)")
    .order("order_index", { ascending: true });

  if (error) {
    console.error("Error fetching modules:", error);
    return [];
  }

  // Sort lessons by order_index in JS since select order might not apply to subquery
  return (data as ModuleWithLessons[]).map((m) => ({
    ...m,
    lessons: (m.lessons || []).sort((a, b) => (a.order_index || 0) - (b.order_index || 0)),
  }));
}

export async function getUserEnrollment(): Promise<Enrollment | null> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: enrollment, error } = await supabase
    .from("enrollments")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (error) {
    console.error("Error fetching enrollment:", error);
    return null;
  }

  return enrollment as Enrollment;
}

type Profile = Database["public"]["Tables"]["profiles"]["Row"];

export async function getUserProfile(): Promise<Profile | null> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (error) {
    console.error("Error fetching profile:", error);
    return null;
  }

  return profile as Profile;
}

export async function getLesson(id: string) {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("lessons")
      .select("*, modules(*)")
      .eq("id", id)
      .single();
  
    if (error) {
      console.error("Error fetching lesson:", error);
      return null;
    }
  
    return data;
}
