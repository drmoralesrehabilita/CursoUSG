import { cn } from "@/lib/utils"

interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "dark" | "light"
  compact?: boolean
  showSubtitle?: boolean
  iconClassName?: string
  textClassName?: string
}

export function Logo({
  className,
  variant = "dark",
  compact = false,
  showSubtitle = false,
  iconClassName,
  textClassName,
  ...props
}: LogoProps) {
  const secondaryTextColor =
    variant === "dark" ? "text-white" : "text-slate-900 dark:text-white"

  if (compact) {
    return (
      <div className={cn("flex items-center gap-2", className)} {...props}>
        <span
          className={cn(
            "material-symbols-outlined text-2xl text-primary",
            iconClassName
          )}
        >
          sensors
        </span>
        <div className={cn("flex items-baseline gap-1.5", textClassName)}>
          <span className="font-bold text-base tracking-tight text-primary leading-none">
            Dr. Raúl
          </span>
          <span
            className={cn(
              "font-bold text-lg tracking-tight leading-none",
              secondaryTextColor
            )}
          >
            Morales
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className={cn("flex flex-col items-center", className)} {...props}>
      <div className="flex items-center gap-3">
        <span
          className={cn(
            "material-symbols-outlined text-4xl text-primary",
            iconClassName
          )}
        >
          sensors
        </span>
        <div className={cn("flex flex-col", textClassName)}>
          <h1 className="font-bold text-xl tracking-tight leading-none text-primary">
            Dr. Raúl
          </h1>
          <h1
            className={cn(
              "font-bold text-2xl tracking-tight leading-none",
              secondaryTextColor
            )}
          >
            Morales
          </h1>
        </div>
      </div>
      {showSubtitle && (
        <p
          className={cn(
            "text-[10px] text-center font-medium tracking-wider mt-2 opacity-80 uppercase",
            variant === "dark" ? "text-gray-300" : "text-gray-500 dark:text-gray-400"
          )}
        >
          Ecografía Neuromusculoesquelética
        </p>
      )}
    </div>
  )
}
