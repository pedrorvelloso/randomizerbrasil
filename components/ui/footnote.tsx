import { cn } from "@/lib/utils"

interface FootnoteProps {
  children: React.ReactNode
  className?: string
}

export function Footnote({ children, className }: FootnoteProps) {
  return (
    <p
      className={cn(
        "text-sm text-muted-foreground border-l-2 border-brand-cyan/50 pl-4 py-2 bg-brand-cyan/5 rounded-r",
        className
      )}
    >
      {children}
    </p>
  )
}
