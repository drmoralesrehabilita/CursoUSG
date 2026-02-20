
"use client"

import { useTheme } from "next-themes"
import { Logo } from "@/components/ui/logo"

export function Header({ title = "Dashboard", userName }: { title?: string; userName?: string }) {
  const { setTheme, theme } = useTheme()

  return (
    <header className="h-16 flex items-center justify-between px-6 bg-surface-light dark:bg-surface-dark border-b border-gray-200 dark:border-gray-700 shadow-sm z-10 font-body transition-colors">
      <div className="md:hidden flex items-center gap-2">
        <button className="text-gray-500 hover:text-primary">
          <span className="material-symbols-outlined">menu</span>
        </button>
        {userName ? (
          <span className="font-bold text-secondary dark:text-white">{userName}</span>
        ) : (
          <Logo variant="light" compact />
        )}
      </div>

      <div className="hidden md:block">
        <nav aria-label="Breadcrumb" className="flex">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <a href="#" className="inline-flex items-center text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-primary">
                Dashboard
              </a>
            </li>
            {title !== "Dashboard" && (
                <li>
                <div className="flex items-center">
                    <span className="material-symbols-outlined text-gray-400 text-sm">chevron_right</span>
                    <span className="ml-1 text-sm font-medium text-gray-700 dark:text-gray-200 md:ml-2">{title}</span>
                </div>
                </li>
            )}
          </ol>
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-300 relative">
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <button
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-300"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          <span className="material-symbols-outlined dark:hidden">dark_mode</span>
          <span className="material-symbols-outlined hidden dark:block text-yellow-400">light_mode</span>
        </button>
      </div>
    </header>
  )
}
