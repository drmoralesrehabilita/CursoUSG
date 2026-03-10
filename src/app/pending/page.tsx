import { createClient } from "@/lib/supabase/server"
import PendingClient from "./PendingClient"

export default async function PendingPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Use a resilient query — access_requested may not exist yet if migration hasn't been applied
  let name = "Doctor/a"
  let email = ""
  let accessRequested = false

  if (user) {
    const { data: profile, error } = await supabase
      .from("profiles")
      .select("full_name, email, access_requested")
      .eq("id", user.id)
      .single()

    if (error) {
      // Fallback: try without access_requested (column might not exist yet)
      const { data: fallback } = await supabase
        .from("profiles")
        .select("full_name, email")
        .eq("id", user.id)
        .single()

      name = fallback?.full_name || "Doctor/a"
      email = fallback?.email || user.email || ""
      accessRequested = false
    } else {
      name = profile?.full_name || "Doctor/a"
      email = profile?.email || user.email || ""
      accessRequested = profile?.access_requested ?? false
    }
  }

  return (
    <PendingClient
      name={name}
      email={email}
      accessRequested={accessRequested}
    />
  )
}
