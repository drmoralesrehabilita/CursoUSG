import { Header } from "@/components/dashboard/header"
import { getUserProfile, getAppSettings } from "@/lib/data"
import { createClient } from "@/lib/supabase/server"
import { CommunityClient } from "./CommunityClient"

const CATEGORIES = ["General", "Casos Clínicos", "Técnica", "Anatomía", "Dudas", "Recursos"]

async function getForumThreads() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("forum_threads")
    .select(`
      id, title, body, category, is_pinned, is_official,
      reply_count, like_count, created_at,
      profiles (full_name, role)
    `)
    .order("is_pinned", { ascending: false })
    .order("created_at", { ascending: false })
    .limit(30)

  if (error) {
    console.error("[Forum] Error fetching threads:", error.message, error.code, error.details)
    return []
  }
  return data || []
}

async function getUserLikedThreadIds(userId: string) {
  const supabase = await createClient()
  const { data } = await supabase
    .from("forum_thread_likes")
    .select("thread_id")
    .eq("user_id", userId)
  return (data || []).map((l: { thread_id: string }) => l.thread_id)
}

export default async function CommunityPage() {
  const profile = await getUserProfile()
  const displayName = profile?.full_name || "Estudiante"

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const [threads, likedIds] = await Promise.all([
    getForumThreads(),
    user?.id ? getUserLikedThreadIds(user.id) : Promise.resolve([]),
  ])

  const currentUserId = user?.id || null
  const isAdmin = profile?.role === "admin"
  const appSettings = await getAppSettings()

  if (!appSettings.enable_community_forum) {
    return (
      <>
        <Header userName={displayName} />
        <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-background-light dark:bg-background-dark font-body">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-4xl text-gray-400">forum</span>
              </div>
              <h2 className="text-2xl font-bold text-secondary dark:text-white mb-3">Foro en Mantenimiento</h2>
              <p className="text-gray-500 dark:text-gray-400 max-w-md">
                El foro de comunidad no está disponible en este momento. Por favor regresa más tarde.
              </p>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Header userName={displayName} />
      <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-background-light dark:bg-background-dark font-body">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary dark:text-white mb-2">
              Comunidad Médica
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
              Conecta con otros especialistas, discute casos clínicos y comparte conocimientos.
            </p>
          </div>

          <CommunityClient
            threads={threads as unknown as React.ComponentProps<typeof CommunityClient>["threads"]}
            likedIds={likedIds}
            currentUserId={currentUserId}
            isAdmin={isAdmin}
            categories={CATEGORIES}
          />
        </div>
      </div>
    </>
  )
}
