"use client"

import { useState } from "react"
import { toast } from "sonner"
import { createClient } from "@/lib/supabase/client"
import { addDocumentToLesson } from '@/app/actions/contentSetup'
import * as UpChunk from '@mux/upchunk'
import { createMuxDirectUpload } from '@/app/actions/contentSetup'

type UploadType = "video" | "document"

interface Module {
  id: string
  title: string
  lessons?: { id: string; title: string }[]
}

export function UploadEngine({ modules = [] }: { modules: Module[] }) {
  const [isOpen, setIsOpen] = useState(false)
  const [uploadType, setUploadType] = useState<UploadType | null>(null)
  
  const [selectedModule, setSelectedModule] = useState("")
  const [selectedLesson, setSelectedLesson] = useState("")
  const [title, setTitle] = useState("")
  const [isMasterCamera, setIsMasterCamera] = useState(true)
  const [file, setFile] = useState<File | null>(null)
  
  const [isUploading, setIsUploading] = useState(false)

  const openModal = (type: UploadType) => {
    setUploadType(type)
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
    setFile(null)
    setTitle("")
    setSelectedModule("")
    setSelectedLesson("")
  }

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>, type: UploadType) => {
    e.preventDefault()
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0])
      openModal(type)
    }
  }

  const doUpload = async () => {
    if (!file) return toast.error("No hay archivo seleccionado")
    if (uploadType === "video" && (!selectedModule || !title)) return toast.error("Faltan campos requeridos")
    if (uploadType === "document" && (!selectedLesson || !title)) return toast.error("Faltan campos requeridos")

    setIsUploading(true)
    const supabase = createClient()
    
    // Server action logic
    if (uploadType === "video") {
      try {
        const { success, uploadUrl, error: muxError } = await createMuxDirectUpload(selectedModule, title)
        if (!success || !uploadUrl) {
          setIsUploading(false)
          return toast.error("Error pidiendo url a Mux: " + muxError)
        }

        const upload = UpChunk.createUpload({
          endpoint: uploadUrl,
          file,
          chunkSize: 5120, // 5MB Upload chunks
        })

        upload.on('error', err => {
          console.error('Mux UpChunk error:', err.detail)
          setIsUploading(false)
          toast.error("Error transfiriendo a Mux. Reintenta.")
        })

        upload.on('progress', () => {
          // Si quisieramos mostrar barra de progreso se haría aquí:
          // console.log(`Progreso: ${progress.detail}%`)
        })

        upload.on('success', () => {
          setIsUploading(false)
          toast.success("El archivo se subió a Mux. Pronto estará disponible tras ser procesado.")
          closeModal()
        })
      } catch (err: unknown) {
        setIsUploading(false)
        console.error(err)
        toast.error("Error configurando Mux Upload.")
      }
    } else {
      // Document upload keeps using Supabase bucket
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`
      const bucket = "docs"
      
      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(fileName, file, { upsert: false })

      if (uploadError) {
        setIsUploading(false)
        return toast.error("Error subiendo el archivo: " + uploadError.message)
      }

      const { data: publicUrlData } = supabase.storage.from(bucket).getPublicUrl(fileName)
      const fileUrl = publicUrlData.publicUrl

      const res = await addDocumentToLesson({
        lessonId: selectedLesson,
        documentTitle: title,
        documentUrl: fileUrl
      })

      setIsUploading(false)
      if (!res.success) {
        toast.error("Error al guardar documento: " + res.error)
      } else {
        toast.success("Documento añadido a la lección")
        closeModal()
      }
    }
    
    setIsUploading(false)
  }

  const activeModule = modules.find(m => m.id === selectedModule)

  return (
    <>
      <div className="bg-white dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/5 p-6 mb-6">
        <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-lg">cloud_upload</span>
          Subir Nuevo Contenido
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Video Dropzone */}
          <div 
            onClick={() => openModal("video")}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleFileDrop(e, "video")}
            className="border-2 border-dashed border-gray-200 dark:border-white/10 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 cursor-pointer group"
          >
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
              <span className="material-symbols-outlined text-primary text-3xl">videocam</span>
            </div>
            <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Arrastra un video aquí o haz click</p>
            <p className="text-xs text-gray-400">MP4, MOV, AVI • Máx. 2GB</p>
          </div>
          {/* Document Dropzone */}
          <div 
            onClick={() => openModal("document")}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleFileDrop(e, "document")}
            className="border-2 border-dashed border-gray-200 dark:border-white/10 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:border-violet-400/40 hover:bg-violet-500/5 transition-all duration-300 cursor-pointer group"
          >
            <div className="w-14 h-14 rounded-2xl bg-violet-500/10 flex items-center justify-center mb-3 group-hover:bg-violet-500/20 transition-colors">
              <span className="material-symbols-outlined text-violet-400 text-3xl">description</span>
            </div>
            <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Arrastra un documento o haz click</p>
            <p className="text-xs text-gray-400">PDF, PPTX, DOCX • Máx. 100MB</p>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-md p-6 border border-gray-200 dark:border-white/10 shadow-xl">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">
                {uploadType === "video" ? "videocam" : "description"}
              </span>
              Subir {uploadType === "video" ? "Video" : "Documento"}
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Archivo</label>
                <div className="border border-gray-200 dark:border-white/10 rounded-lg p-3 text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-black/20">
                  {file ? file.name : (
                    <input 
                      type="file" 
                      accept={uploadType === "video" ? "video/*" : ".pdf,.doc,.docx,.ppt,.pptx"}
                      onChange={(e) => e.target.files && setFile(e.target.files[0])}
                    />
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Título</label>
                <input 
                  type="text" 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)} 
                  className="w-full bg-transparent border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Ej: Anatomía de Hombro"
                />
              </div>

              {uploadType === "video" ? (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Módulo</label>
                    <select 
                      value={selectedModule} 
                      onChange={(e) => setSelectedModule(e.target.value)}
                      className="w-full bg-transparent border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="" disabled className="dark:bg-gray-900">Selecciona un Módulo</option>
                      {modules.map(m => (
                        <option key={m.id} value={m.id} className="dark:bg-gray-900">{m.title}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col gap-2 mt-2">
                    <label className="flex items-center gap-2 text-sm cursor-pointer">
                      <input 
                        type="radio" 
                        checked={isMasterCamera} 
                        onChange={() => setIsMasterCamera(true)}
                        className="text-primary accent-primary"
                      />
                      Este es el Master (Cámara Principal)
                    </label>
                    <label className="flex items-center gap-2 text-sm cursor-pointer">
                      <input 
                        type="radio" 
                        checked={!isMasterCamera} 
                        onChange={() => setIsMasterCamera(false)}
                        className="text-primary accent-primary"
                      />
                      Este es el video de Ecógrafo (Dual)
                    </label>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Módulo</label>
                    <select 
                      value={selectedModule} 
                      onChange={(e) => { setSelectedModule(e.target.value); setSelectedLesson("") }}
                      className="w-full bg-transparent border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="" disabled className="dark:bg-gray-900">Selecciona un Módulo primero</option>
                      {modules.map(m => (
                        <option key={m.id} value={m.id} className="dark:bg-gray-900">{m.title}</option>
                      ))}
                    </select>
                  </div>
                  {selectedModule && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Lección</label>
                      <select 
                        value={selectedLesson} 
                        onChange={(e) => setSelectedLesson(e.target.value)}
                        className="w-full bg-transparent border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="" disabled className="dark:bg-gray-900">Asignar a una lección...</option>
                        {activeModule?.lessons?.map(l => (
                          <option key={l.id} value={l.id} className="dark:bg-gray-900">{l.title}</option>
                        ))}
                      </select>
                    </div>
                  )}
                </>
              )}
            </div>

            <div className="mt-6 flex gap-3 justify-end">
              <button 
                onClick={closeModal} 
                disabled={isUploading}
                className="px-4 py-2 rounded-xl text-sm font-semibold text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
              >
                Cancelar
              </button>
              <button 
                onClick={doUpload}
                disabled={isUploading}
                className="px-4 py-2 rounded-xl text-sm font-semibold bg-primary text-white hover:bg-primary/90 flex items-center gap-2 transition-colors disabled:opacity-50"
              >
                {isUploading ? (
                  <><span className="material-symbols-outlined shrink-0 animate-spin text-sm">progress_activity</span> Subiendo...</>
                ) : (
                  <><span className="material-symbols-outlined shrink-0 text-sm">upload</span> Subir Archivo</>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
