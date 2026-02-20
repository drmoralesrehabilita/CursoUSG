"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ModuleWithLessons, Enrollment } from "@/types/app"
import { CheckCircle, Lock, Menu, PlayCircle, BarChart } from "lucide-react"
import { Database } from "@/types/supabase"

type Profile = Database['public']['Tables']['profiles']['Row']

interface SidebarClientProps {
  modules: ModuleWithLessons[]
  enrollment: Enrollment | null
  profile: Profile | null
  children?: React.ReactNode // For mobile trigger context if needed
}

export function SidebarClient({ modules, enrollment, profile }: SidebarClientProps) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = React.useState(false)

  const isLocked = enrollment?.status === 'blocked' && profile?.role !== 'admin'

  const SidebarContent = () => (
    <div className="flex h-full flex-col border-r bg-sidebar text-sidebar-foreground">
      <div className="flex h-14 items-center border-b px-4">
        <span className="font-semibold px-2">Diplomado Morales</span>
      </div>
      
      {/* User Progress / Status Section - Placeholder */}
      <div className="p-4 border-b bg-sidebar-accent/10">
         <div className="flex items-center gap-2 text-sm">
            <BarChart className="h-4 w-4" />
            <span>Estado: {isLocked ? 'Bloqueado' : 'Activo'}</span>
         </div>
      </div>

      <ScrollArea className="flex-1">
        <Accordion type="single" collapsible className="w-full">
          {modules.map((module) => (
            <AccordionItem key={module.id} value={module.id} className="border-b-0">
              <AccordionTrigger className="px-4 py-3 hover:bg-sidebar-accent/50 hover:no-underline text-left">
                <span className="text-sm font-medium">{module.title}</span>
              </AccordionTrigger>
              <AccordionContent className="pb-0">
                <div className="flex flex-col">
                  {module.lessons?.map((lesson) => {
                    const isActive = pathname === `/lessons/${lesson.id}`
                    return (
                      <Link
                        key={lesson.id}
                        href={isLocked ? '#' : `/lessons/${lesson.id}`}
                        className={cn(
                          "flex items-center gap-2 py-2 px-8 text-sm transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                          isActive && "bg-sidebar-accent text-sidebar-accent-foreground font-medium",
                          isLocked && "opacity-50 cursor-not-allowed hover:bg-transparent"
                        )}
                        onClick={(e) => {
                            if (isLocked) e.preventDefault()
                            setIsOpen(false)
                        }}
                      >
                        {isLocked ? (
                          <Lock className="h-3 w-3" />
                        ) : isActive ? (
                          <PlayCircle className="h-3 w-3 text-primary" />
                        ) : (
                          <CheckCircle className="h-3 w-3 text-muted-foreground" />
                        )}
                        {lesson.title}
                      </Link>
                    )
                  })}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </ScrollArea>
      
      <div className="p-4 border-t text-xs text-muted-foreground text-center">
        &copy; 2024 DeepLuxMed
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile Trigger */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="lg:hidden fixed left-4 top-3 z-40">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-64 bg-sidebar border-r-sidebar-border">
          <SidebarContent />
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 flex-col fixed inset-y-0 z-30">
        <SidebarContent />
      </aside>
    </>
  )
}
