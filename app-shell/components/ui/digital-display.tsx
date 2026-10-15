import * as React from "react"
import { cn } from "cn"

export interface DigitalDisplayProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: React.ReactNode
  label?: string
  unit?: string
}

export function DigitalDisplay({
  className,
  value,
  label,
  unit,
  children,
  ...props
}: DigitalDisplayProps) {
  return (
    <div
      data-slot="digital-display"
      className={cn(
        "smart-digital-display inline-flex flex-col bg-[var(--smart-bg-input)] border border-[var(--smart-border-color)] rounded-[var(--smart-radius-sm,4px)] px-[var(--smart-space-md,16px)] py-[var(--smart-space-sm,8px)] font-[family-name:var(--smart-font-mono)] text-[var(--smart-text-digital)] text-xl font-bold tracking-[0.1em] shadow-[0_0_8px_rgba(34,211,238,0.4)] select-none",
        className
      )}
      {...props}
    >
      {label && (
        <span className="text-[0.65rem] font-sans font-semibold tracking-wider uppercase text-[var(--smart-text-secondary)] opacity-80 mb-0.5">
          {label}
        </span>
      )}
      <div className="flex items-baseline gap-1">
        <span>{value ?? children}</span>
        {unit && (
          <span className="text-xs font-sans text-[var(--smart-text-secondary)] font-normal tracking-normal">
            {unit}
          </span>
        )}
      </div>
    </div>
  )
}
