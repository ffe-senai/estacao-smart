import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

const buttonVariants = cva(
  "smart-btn enabled:cursor-pointer group/button inline-flex shrink-0 items-center justify-center rounded-[var(--smart-radius-sm,4px)] border border-transparent bg-clip-padding text-sm font-semibold tracking-[0.05em] uppercase font-[family-name:var(--smart-font-family,inherit)] whitespace-nowrap transition-all duration-[var(--smart-transition-fast,0.15s)] outline-none select-none focus-visible:border-[var(--smart-border-focus)] focus-visible:ring-3 focus-visible:ring-[var(--smart-border-focus)]/40 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-[var(--smart-status-danger)] aria-invalid:ring-3 aria-invalid:ring-[var(--smart-status-danger)]/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "smart-btn--primary bg-[var(--smart-accent-primary)] text-white hover:bg-[var(--smart-accent-primary-hover)]",
        primary:
          "smart-btn--primary bg-[var(--smart-accent-primary)] text-white hover:bg-[var(--smart-accent-primary-hover)]",
        emergency:
          "smart-btn--emergency bg-gradient-to-br from-[#dc2626] to-[#991b1b] text-white border-2 border-[#fca5a5] shadow-[0_0_12px_rgba(239,68,68,0.5)] font-extrabold hover:from-[#ef4444] hover:to-[#b91c1c] hover:shadow-[0_0_20px_rgba(239,68,68,0.8)]",
        cobot:
          "bg-[var(--smart-accent-cobot)] text-white hover:brightness-110 shadow-xs",
        outline:
          "border-[var(--smart-border-color)] bg-[var(--smart-bg-surface)] text-[var(--smart-text-primary)] hover:bg-[var(--smart-bg-surface-hover)] hover:text-white hover:border-[var(--smart-border-focus)]",
        secondary:
          "bg-[var(--smart-bg-surface-hover)] text-[var(--smart-text-primary)] hover:bg-[var(--smart-border-color)] border border-[var(--smart-border-color)]",
        ghost:
          "text-[var(--smart-text-secondary)] hover:bg-[var(--smart-bg-surface-hover)] hover:text-[var(--smart-text-primary)]",
        destructive:
          "bg-[rgba(239,68,68,0.15)] text-[var(--smart-status-danger)] border border-[var(--smart-status-danger)] hover:bg-[rgba(239,68,68,0.25)] shadow-[var(--smart-shadow-glow-red)]",
        link:
          "text-[var(--smart-accent-primary)] underline-offset-4 hover:underline normal-case tracking-normal font-medium",
      },
      size: {
        default:
          "h-9 gap-2 px-4.5 py-2.5 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",
        emergency:
          "h-12 gap-2.5 px-6 py-3.5 text-base font-extrabold",
        xs: "h-6 gap-1 rounded-[var(--smart-radius-sm,4px)] px-2 text-xs in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1 rounded-[var(--smart-radius-sm,4px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-10 gap-2 px-5 text-base has-data-[icon=inline-end]:pr-3.5 has-data-[icon=inline-start]:pl-3.5",
        icon: "size-8",
        "icon-xs":
          "size-6 rounded-[var(--smart-radius-sm,4px)] in-data-[slot=button-group]:rounded-md [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-7 rounded-[var(--smart-radius-sm,4px)] in-data-[slot=button-group]:rounded-md",
        "icon-lg": "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export type ButtonProps = ButtonPrimitive.Props & VariantProps<typeof buttonVariants>

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonProps) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
