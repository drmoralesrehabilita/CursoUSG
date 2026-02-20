
import { cn } from "@/lib/utils"

interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {
  iconClassName?: string
  textClassName?: string
}

export function Logo({ className, iconClassName, textClassName, ...props }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-3", className)} {...props}>
      <span className={cn("material-symbols-outlined text-4xl text-primary", iconClassName)}>sensors</span>
      <div className={cn("flex flex-col", textClassName)}>
        <h1 className="font-bold text-xl tracking-tight leading-none text-primary">Dr. Raúl</h1>
        <h1 className="font-bold text-2xl tracking-tight leading-none text-white">Morales</h1>
      </div>
    </div>
  )
}
