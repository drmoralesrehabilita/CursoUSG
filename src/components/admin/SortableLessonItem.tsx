"use client"

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

interface LessonData {
  id: string;
  title: string;
  lesson_type: string;
  duration?: string;
  is_published: boolean;
  [key: string]: any;
}

interface SortableLessonItemProps {
  id: string;
  lesson: LessonData;
  handleOpenEditLesson: (e: React.MouseEvent, lesson: LessonData) => void;
  handleDeleteLesson: (e: React.MouseEvent, id: string) => void;
  LessonIcon: React.FC<{ type: string }>;
  LessonStatus: React.FC<{ status: boolean }>;
}

export function SortableLessonItem({ id, lesson, handleOpenEditLesson, handleDeleteLesson, LessonIcon, LessonStatus }: SortableLessonItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center justify-between p-3 rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-black/40 hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors group relative ${
        isDragging ? 'z-50 shadow-lg ring-2 ring-primary/50' : ''
      }`}
    >
      <div className="flex items-center gap-3">
        {/* Drag Handle */}
        <button
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 cursor-grab active:cursor-grabbing p-1 -ml-1"
          {...attributes}
          {...listeners}
          title="Arrastrar para reordenar"
        >
          <span className="material-symbols-outlined text-sm">drag_indicator</span>
        </button>
        
        <div className="w-8 h-8 rounded-lg bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
          <LessonIcon type={lesson.lesson_type} />
        </div>
        <div>
          <h4 className="font-medium text-gray-900 dark:text-white text-sm">
            {lesson.title}
          </h4>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-xs text-gray-500 capitalize">{lesson.lesson_type}</span>
            <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-700" />
            <span className="text-xs text-gray-500">{lesson.duration || '0 min'}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <LessonStatus status={lesson.is_published} />
        <button
          onClick={(e) => handleOpenEditLesson(e, lesson)}
          className="p-1.5 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
          title="Editar Lección"
        >
          <span className="material-symbols-outlined text-sm">edit</span>
        </button>
        <button
          onClick={(e) => handleDeleteLesson(e, lesson.id)}
          className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
          title="Eliminar Lección"
        >
          <span className="material-symbols-outlined text-sm">delete</span>
        </button>
      </div>
    </div>
  )
}
