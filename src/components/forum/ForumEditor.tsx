import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import Youtube from '@tiptap/extension-youtube'
import { useState, useCallback } from 'react'
import { uploadForumImage } from '@/app/actions/forum'
import { toast } from 'sonner'

interface ForumEditorProps {
  content: string
  onChange: (html: string) => void
  placeholder?: string
  minHeight?: string
}

export function ForumEditor({ content, onChange, placeholder = "Escribe tu mensaje...", minHeight = "200px" }: ForumEditorProps) {
  const [isUploading, setIsUploading] = useState(false)

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: true,
        autolink: true,
      }),
      Image.configure({
        inline: false,
        allowBase64: true,
      }),
      Youtube.configure({
        controls: true,
        nocookie: true,
      }),
    ],
    content: content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: `prose dark:prose-invert prose-sm max-w-none focus:outline-none min-h-[${minHeight}] px-4 py-3`,
      },
    },
  })

  const setLink = useCallback(() => {
    if (!editor) return
    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('URL', previousUrl)

    if (url === null) return
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }, [editor])

  const addYoutubeVideo = useCallback(() => {
    if (!editor) return
    const url = prompt('Ingresa el link del video de YouTube')
    if (url) {
      editor.commands.setYoutubeVideo({ src: url })
    }
  }, [editor])



  const uploadImage = async (file: File) => {
    if (!editor) return
    setIsUploading(true)
    const formData = new FormData()
    formData.append("file", file)
    
    // Add temporary loading state
    const toastId = toast.loading("Subiendo imagen...")
    
    try {
      const res = await uploadForumImage(formData)
      if (res.success && res.url) {
        editor.chain().focus().setImage({ src: res.url }).run()
        toast.success("Imagen subida", { id: toastId })
      } else {
        toast.error(res.error || "Error al subir", { id: toastId })
      }
    } catch {
      toast.error("Error al subir", { id: toastId })
    } finally {
      setIsUploading(false)
    }
  }

  // Handle drag and drop or paste
  if (editor) {
    editor.setOptions({
      editorProps: {
        ...editor.options.editorProps,
        handleDrop: (view, event, slice, moved) => {
          if (!moved && event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files[0]) {
            const file = event.dataTransfer.files[0];
            if (file.type.indexOf('image/') === 0) {
              uploadImage(file)
              return true
            }
          }
          return false
        },
        handlePaste: (_view, event, _slice) => {
          if (event.clipboardData && event.clipboardData.files && event.clipboardData.files[0]) {
            const file = event.clipboardData.files[0]
            if (file.type.indexOf('image/') === 0) {
              uploadImage(file)
              return true
            }
          }
          return false
        }
      }
    })
  }

  if (!editor) {
    return null
  }

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-white dark:bg-[#0b1120] focus-within:border-primary/50 transition-colors">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
        <button
          onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleBold().run() }}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={`p-1.5 rounded-lg transition-colors ${editor.isActive('bold') ? 'bg-primary/20 text-primary' : 'hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400'}`}
          title="Negrita"
        >
          <span className="material-symbols-outlined text-[18px]">format_bold</span>
        </button>
        <button
          onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleItalic().run() }}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={`p-1.5 rounded-lg transition-colors ${editor.isActive('italic') ? 'bg-primary/20 text-primary' : 'hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400'}`}
          title="Cursiva"
        >
          <span className="material-symbols-outlined text-[18px]">format_italic</span>
        </button>
        
        <div className="w-px h-5 bg-gray-300 dark:bg-gray-700 mx-1" />

        <button
          onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleHeading({ level: 2 }).run() }}
          className={`p-1.5 rounded-lg transition-colors ${editor.isActive('heading', { level: 2 }) ? 'bg-primary/20 text-primary' : 'hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400'}`}
          title="Subtítulo"
        >
          <span className="material-symbols-outlined text-[18px]">title</span>
        </button>
        <button
          onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleBulletList().run() }}
          className={`p-1.5 rounded-lg transition-colors ${editor.isActive('bulletList') ? 'bg-primary/20 text-primary' : 'hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400'}`}
          title="Lista"
        >
          <span className="material-symbols-outlined text-[18px]">format_list_bulleted</span>
        </button>
        <button
          onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleOrderedList().run() }}
          className={`p-1.5 rounded-lg transition-colors ${editor.isActive('orderedList') ? 'bg-primary/20 text-primary' : 'hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400'}`}
          title="Lista numerada"
        >
          <span className="material-symbols-outlined text-[18px]">format_list_numbered</span>
        </button>

        <div className="w-px h-5 bg-gray-300 dark:bg-gray-700 mx-1" />

        <button
          onClick={(e) => { e.preventDefault(); setLink() }}
          className={`p-1.5 rounded-lg transition-colors ${editor.isActive('link') ? 'bg-primary/20 text-primary' : 'hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400'}`}
          title="Enlace"
        >
          <span className="material-symbols-outlined text-[18px]">link</span>
        </button>
        
        <label
          className={`p-1.5 rounded-lg transition-colors hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 cursor-pointer ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}
          title="Subir imagen"
        >
          <span className="material-symbols-outlined text-[18px]">image</span>
          <input 
            type="file" 
            accept="image/*" 
            className="hidden" 
            onChange={(e) => {
               if (e.target.files && e.target.files[0]) {
                 uploadImage(e.target.files[0])
               }
            }} 
          />
        </label>
        
        <button
          onClick={(e) => { e.preventDefault(); addYoutubeVideo() }}
          className="p-1.5 rounded-lg transition-colors hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400"
          title="Video YouTube"
        >
          <span className="material-symbols-outlined text-[18px]">ondemand_video</span>
        </button>

        <button
          onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleCodeBlock().run() }}
          className={`p-1.5 rounded-lg transition-colors ${editor.isActive('codeBlock') ? 'bg-primary/20 text-primary' : 'hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400'}`}
          title="Bloque de código"
        >
          <span className="material-symbols-outlined text-[18px]">code</span>
        </button>
      </div>

      {/* Editor Content */}
      <div onClick={() => editor.commands.focus()} className="cursor-text">
        <EditorContent editor={editor} />
        {editor.isEmpty && (
          <div className="absolute top-14 left-4 pointer-events-none text-gray-400 text-sm">
            {placeholder}
          </div>
        )}
      </div>
    </div>
  )
}
