import { getStudentAssignments } from "@/app/actions/assignments"
import TareasStudentClient from "./TareasStudentClient"

export default async function TareasPage() {
  const res = await getStudentAssignments()
  if (!res.success) {
    console.error("Error in getStudentAssignments:", res.error)
  }
  const assignments = res.success ? (res.data || []) : []

  return <TareasStudentClient initialAssignments={assignments} />
}
