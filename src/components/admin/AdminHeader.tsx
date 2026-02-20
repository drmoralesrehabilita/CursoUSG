"use client"

import { useTheme } from "next-themes"

interface AdminHeaderProps {
  title?: string
  subtitle?: string
}

export function AdminHeader({ title = "Dashboard", subtitle }: AdminHeaderProps) {
  const { setTheme, theme } = useTheme()

  return (
    <header className="h-16 flex items-center justify-between px-6 bg-surface-light dark:bg-[#0f1926] border-b border-gray-200 dark:border-white/5 shadow-sm z-10 font-body transition-colors">
      {/* Mobile menu */}
      <div className="md:hidden flex items-center gap-2">
        <button className="text-gray-500 hover:text-primary">
          <span className="material-symbols-outlined">menu</span>
        </button>
        <span className="font-bold text-secondary dark:text-white text-sm">{title}</span>
      </div>

      {/* Breadcrumb / Title */}
      <div className="hidden md:flex flex-col">
        <h1 className="text-lg font-bold text-gray-900 dark:text-white">{title}</h1>
        {subtitle && (
          <p className="text-xs text-gray-500 dark:text-gray-400">{subtitle}</p>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        {/* Search */}
        <div className="hidden lg:flex items-center bg-gray-100 dark:bg-white/5 rounded-lg px-3 py-2 border border-transparent focus-within:border-primary/30 transition-colors">
          <span className="material-symbols-outlined text-gray-400 text-lg mr-2">search</span>
          <input
            type="text"
            placeholder="Buscar..."
            className="bg-transparent text-sm text-gray-700 dark:text-gray-300 placeholder-gray-400 outline-none w-48"
          />
        </div>

        {/* Notifications */}
        <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 text-gray-500 dark:text-gray-400 relative transition-colors">
          <span className="material-symbols-outlined text-xl">notifications</span>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white dark:ring-[#0f1926]" />
        </button>

        {/* Chat */}
        <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 text-gray-500 dark:text-gray-400 transition-colors">
          <span className="material-symbols-outlined text-xl">chat</span>
        </button>

        {/* Theme Toggle */}
        <button
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 text-gray-500 dark:text-gray-400 transition-colors"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          <span className="material-symbols-outlined text-xl dark:hidden">dark_mode</span>
          <span className="material-symbols-outlined text-xl hidden dark:block text-yellow-400">light_mode</span>
        </button>
      </div>
    </header>
  )
}
