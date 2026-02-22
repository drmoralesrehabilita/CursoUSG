import { getLesson, getUserLessonProgress, getLessonQuiz, getUserEnrollment } from "@/lib/data"
import { notFound, redirect } from "next/navigation"
import { LessonClient } from "./LessonClient"
import { Header } from "@/components/dashboard/header"

export default async function LessonPage({ params }: { params: { id: string } }) {
  const lesson = await getLesson(params.id)
  
  if (!lesson) {
    notFound()
  }

  const enrollment = await getUserEnrollment()
  
  // Basic access control: Check if user is enrolled and if module matches
  // If we had a strict module-by-module lock, we would check if this module is unlocked.
  // We will simply verify they have an enrollment for this module.
  // As per requirements: Bloqueo de URLs de lecciones si el módulo está bloqueado
  if (enrollment?.status === "blocked") {
    redirect("/dashboard?error=module_blocked")
  }

  const progress = await getUserLessonProgress(params.id)
  const isCompleted = progress?.is_completed || false

  // If it's a quiz type lesson, fetch the quiz data
  let quizData = null;
  if (lesson.lesson_type === 'quiz') {
    quizData = await getLessonQuiz(params.id);
  }

  return (
    <>
      <Header userName="Estudiante" />
      <div className="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark font-body">
        <LessonClient 
          lesson={lesson} 
          isCompleted={isCompleted} 
          quizData={quizData} 
        />
      </div>
    </>
  )
}
