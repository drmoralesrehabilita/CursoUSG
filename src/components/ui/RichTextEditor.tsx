"use client"

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'

interface RichTextEditorProps {
  content: string
  onChange: (content: string) => void
  placeholder?: string
}

export function RichTextEditor({ content, onChange, placeholder }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({ 
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-primary underline cursor-pointer',
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'rounded-lg max-w-full',
        },
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'min-h-[150px] w-full px-4 py-3 focus:outline-none dark:text-gray-200 prose-sm tiptap-editor',
      },
    },
    immediatelyRender: false,
  })

  if (!editor) {
    return null
  }

  return (
    <div className="w-full bg-gray-50 dark:bg-black/50 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-primary/50 transition-shadow">
      {/* Barra de herramientas */}
      <div className="flex flex-wrap items-center gap-1 p-2 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/80">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${editor.isActive('bold') ? 'bg-gray-200 dark:bg-gray-700 text-primary' : 'text-gray-600 dark:text-gray-400'}`}
          title="Negrita"
        >
          <span className="material-symbols-outlined text-sm">format_bold</span>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${editor.isActive('italic') ? 'bg-gray-200 dark:bg-gray-700 text-primary' : 'text-gray-600 dark:text-gray-400'}`}
          title="Cursiva"
        >
          <span className="material-symbols-outlined text-sm">format_italic</span>
        </button>
        <div className="w-px h-4 bg-gray-300 dark:bg-gray-600 mx-1" />
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${editor.isActive('heading', { level: 2 }) ? 'bg-gray-200 dark:bg-gray-700 text-primary' : 'text-gray-600 dark:text-gray-400'}`}
          title="Subtítulo"
        >
          <span className="material-symbols-outlined text-sm">format_h2</span>
        </button>
        <div className="w-px h-4 bg-gray-300 dark:bg-gray-600 mx-1" />
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${editor.isActive('bulletList') ? 'bg-gray-200 dark:bg-gray-700 text-primary' : 'text-gray-600 dark:text-gray-400'}`}
          title="Lista de viñetas"
        >
          <span className="material-symbols-outlined text-sm">format_list_bulleted</span>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${editor.isActive('orderedList') ? 'bg-gray-200 dark:bg-gray-700 text-primary' : 'text-gray-600 dark:text-gray-400'}`}
          title="Lista numerada"
        >
          <span className="material-symbols-outlined text-sm">format_list_numbered</span>
        </button>
        <div className="w-px h-4 bg-gray-300 dark:bg-gray-600 mx-1" />
        <button
          type="button"
          onClick={() => {
            const url = window.prompt('URL del enlace:')
            if (url) {
              editor.chain().focus().setLink({ href: url }).run()
            }
          }}
          className={`p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${editor.isActive('link') ? 'bg-gray-200 dark:bg-gray-700 text-primary' : 'text-gray-600 dark:text-gray-400'}`}
          title="Insertar enlace"
        >
          <span className="material-symbols-outlined text-sm">link</span>
        </button>
      </div>

      {/* Editor Content */}
      <div className="bg-transparent" onClick={() => editor.commands.focus()}>
        <EditorContent editor={editor} />
        {editor.isEmpty && placeholder && (
          <div className="absolute top-[52px] left-4 pointer-events-none text-gray-400 text-sm">
            {placeholder}
          </div>
        )}
      </div>
    </div>
  )
}
