"use client"

import { cn } from "@/lib/utils"
// import { Button } from "@/components/ui/button" // Keeping for potential future use or logout
import { ScrollArea } from "@/components/ui/scroll-area"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, PlayCircle, Lock, LogOut } from "lucide-react"
import { Logo } from "@/components/ui/logo"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { ModuleWithLessons } from "@/types/app"
import { Button } from "../ui/button"
import { logout } from "@/app/login/actions"

// Mock Data for initial development since DB might be empty
// Mock Data removed - now fetching from DB

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}

function SidebarContent({ pathname, modules }: { pathname: string, modules: ModuleWithLessons[] }) {
    return (
        <div className="flex bg-background-light dark:bg-[#0f141d] h-full flex-col border-r border-slate-200 dark:border-slate-800">
            <div className="p-6 border-b border-slate-200 dark:border-slate-800">
                <Logo variant="light" compact />
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Progreso General: 15%
                </p>
                <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full mt-2 overflow-hidden">
                    <div className="h-full bg-green-500 w-[15%] rounded-full"></div>
                </div>
            </div>

            <ScrollArea className="flex-1 px-4 py-4">
                <Accordion type="multiple" defaultValue={["m1"]} className="w-full">
                    {modules.map((module) => (
                        <AccordionItem key={module.id} value={module.id} className="border-b-0 mb-4">
                            <AccordionTrigger className="hover:no-underline py-2 px-3 hover:bg-slate-100 dark:hover:bg-slate-800/50 rounded-lg group text-left">
                                <div className="flex flex-col items-start text-left">
                                    <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{module.title}</span>
                                    <span className="text-xs text-slate-500 dark:text-slate-500 font-normal">{module.lessons.length} lecciones</span>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="pt-2 pb-0">
                                <div className="flex flex-col gap-1 pl-2 border-l-2 border-slate-200 dark:border-slate-800 ml-4">
                                    {module.lessons.map((lesson) => {
                                        const isActive = pathname === `/lessons/${lesson.id}`
                                        const isLocked = false // Logic for locking based on progression

                                        return (
                                            <Link
                                                key={lesson.id}
                                                href={isLocked ? "#" : `/lessons/${lesson.id}`}
                                                className={cn(
                                                    "flex items-center gap-3 px-4 py-3 rounded-r-lg text-sm transition-all duration-200 border-l-[3px] -ml-[5px]",
                                                    isActive
                                                        ? "bg-primary/10 text-primary border-primary font-medium"
                                                        : "text-slate-600 dark:text-slate-400 border-transparent hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-100",
                                                    isLocked && "opacity-50 cursor-not-allowed hover:bg-transparent"
                                                )}
                                            >
                                                {isLocked ? (
                                                    <Lock className="w-4 h-4 shrink-0" />
                                                ) : isActive ? (
                                                    <PlayCircle className="w-4 h-4 shrink-0 animate-pulse" />
                                                ) : (
                                                    <div className="w-4 h-4 rounded-full border border-slate-400 dark:border-slate-600 shrink-0"></div>
                                                )}
                                                <span className="line-clamp-1">{lesson.title}</span>
                                            </Link>
                                        )
                                    })}
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </ScrollArea>

            <div className="p-4 border-t border-slate-200 dark:border-slate-800">
                <form action={logout}>
                    <Button
                        type="submit"
                        variant="outline"
                        className="w-full justify-start text-slate-600 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400 hover:border-red-500/30 hover:bg-red-500/5 transition-all duration-200 gap-2 cursor-pointer"
                    >
                        <LogOut className="w-4 h-4" />
                        Cerrar Sesión
                    </Button>
                </form>
            </div>
        </div>
    )
}

export function Sidebar({ className, modules }: SidebarProps & { modules: ModuleWithLessons[] }) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  // Close mobile sheet on navigation
  useEffect(() => {
    setIsOpen(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  return (
    <>
      {/* Mobile Trigger */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="lg:hidden fixed top-4 left-4 z-40 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur border border-slate-200 dark:border-slate-700">
            <Menu className="w-5 h-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-80 border-r-slate-200 dark:border-r-slate-800">
          <SidebarContent pathname={pathname} modules={modules} />
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <div className={cn("hidden lg:block w-80 h-screen sticky top-0 z-30", className)}>
        <SidebarContent pathname={pathname} modules={modules} />
      </div>
    </>
  )
}
