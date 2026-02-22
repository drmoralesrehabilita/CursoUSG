import { getLesson, getUserLessonProgress, getLessonQuiz, getUserEnrollment, getModules, getUserProfile } from "@/lib/data"
import { notFound, redirect } from "next/navigation"
import { LessonClient } from "./LessonClient"
import { Header } from "@/components/dashboard/header"

export default async function LessonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const lesson = await getLesson(id)
  
  if (!lesson) {
    notFound()
  }

  const enrollment = await getUserEnrollment()
  
  if (enrollment?.status === "blocked") {
    redirect("/dashboard?error=module_blocked")
  }

  const [progress, profile, allModules] = await Promise.all([
    getUserLessonProgress(id),
    getUserProfile(),
    getModules(),
  ])

  const isCompleted = progress?.is_completed || false
  const userName = profile?.full_name || "Estudiante"

  // Find the module of this lesson and its sibling lessons for navigation
  const currentModule = allModules.find(m => m.id === lesson.module_id)
  const moduleLessons = currentModule?.lessons || []

  // If it's a quiz type lesson, fetch the quiz data
  let quizData = null;
  if (lesson.lesson_type === 'quiz') {
    quizData = await getLessonQuiz(id);
  }

  return (
    <>
      <Header userName={userName} />
      <div className="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark font-body">
        <LessonClient 
          lesson={lesson} 
          isCompleted={isCompleted} 
          quizData={quizData}
          moduleLessons={moduleLessons}
          moduleTitle={currentModule?.title || ""}
        />
      </div>
    </>
  )
}
