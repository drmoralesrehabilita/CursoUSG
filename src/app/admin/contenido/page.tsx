import { getModules } from "@/lib/data"
import { ContenidoClient } from "./ContenidoClient"

export default async function ContenidoPage() {
  const modules = await getModules()

  // Mapear los datos de getModules al formato esperado por ContenidoClient
  const mappedModules = modules.map(m => ({
    id: m.id,
    title: m.title,
    lessons: m.lessons?.map(l => ({
      id: l.id,
      title: l.title,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      lesson_type: (l as any).lesson_type || 'video',
      is_published: l.is_published || false
    }))
  }))

  return <ContenidoClient modules={mappedModules} />
}
