import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

const badgeVariants = cva(
  "smart-status-pill group/badge inline-flex h-auto w-fit shrink-0 items-center justify-center gap-1.5 overflow-hidden rounded-[var(--smart-radius-full,9999px)] border border-transparent px-2.5 py-1 text-xs font-bold uppercase tracking-[0.05em] font-[family-name:var(--smart-font-family,inherit)] whitespace-nowrap transition-all focus-visible:border-[var(--smart-border-focus)] focus-visible:ring-[3px] focus-visible:ring-[var(--smart-border-focus)]/50 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 aria-invalid:border-[var(--smart-status-danger)] aria-invalid:ring-[var(--smart-status-danger)]/20 [&>svg]:pointer-events-none [&>svg]:size-3!",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--smart-accent-primary)]/20 text-[var(--smart-accent-primary)] border-[var(--smart-accent-primary)]/40",
        running:
          "smart-status-pill--running bg-[rgba(34,197,94,0.15)] text-[var(--smart-status-ok)] border-[var(--smart-status-ok)] shadow-[var(--smart-shadow-glow-green)]",
        warning:
          "smart-status-pill--warning bg-[rgba(245,158,11,0.15)] text-[var(--smart-status-warning)] border-[var(--smart-status-warning)] shadow-[var(--smart-status-warning-glow)]",
        danger:
          "smart-status-pill--danger bg-[rgba(239,68,68,0.15)] text-[var(--smart-status-danger)] border-[var(--smart-status-danger)] shadow-[var(--smart-shadow-glow-red)]",
        off:
          "bg-[rgba(100,116,139,0.15)] text-[var(--smart-status-off)] border-[var(--smart-status-off)]",
        cobot:
          "bg-[rgba(234,88,12,0.15)] text-[var(--smart-accent-cobot)] border-[var(--smart-accent-cobot)]",
        secondary:
          "bg-[var(--smart-bg-surface-hover)] text-[var(--smart-text-primary)] border-[var(--smart-border-color)]",
        destructive:
          "smart-status-pill--danger bg-[rgba(239,68,68,0.15)] text-[var(--smart-status-danger)] border-[var(--smart-status-danger)] shadow-[var(--smart-shadow-glow-red)]",
        outline:
          "border-[var(--smart-border-color)] text-[var(--smart-text-primary)] bg-transparent",
        ghost:
          "border-transparent hover:bg-[var(--smart-bg-surface-hover)] text-[var(--smart-text-secondary)]",
        link:
          "text-[var(--smart-accent-primary)] underline-offset-4 hover:underline border-transparent normal-case tracking-normal",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  render,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant }), className),
      },
      props
    ),
    render,
    state: {
      slot: "badge",
      variant,
    },
  })
}

export { Badge, badgeVariants }
