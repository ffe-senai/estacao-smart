"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"
import { CircleCheckIcon, InfoIcon, TriangleAlertIcon, OctagonXIcon, Loader2Icon } from "lucide-react"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: (
          <CircleCheckIcon className="size-4 text-[var(--smart-status-ok)]" />
        ),
        info: (
          <InfoIcon className="size-4 text-[var(--smart-accent-primary)]" />
        ),
        warning: (
          <TriangleAlertIcon className="size-4 text-[var(--smart-status-warning)]" />
        ),
        error: (
          <OctagonXIcon className="size-4 text-[var(--smart-status-danger)]" />
        ),
        loading: (
          <Loader2Icon className="size-4 animate-spin text-[var(--smart-text-digital)]" />
        ),
      }}
      style={
        {
          "--normal-bg": "var(--smart-bg-surface)",
          "--normal-text": "var(--smart-text-primary)",
          "--normal-border": "var(--smart-border-color)",
          "--border-radius": "var(--smart-radius-md, 8px)",
          "--success-bg": "var(--smart-bg-surface)",
          "--success-text": "var(--smart-text-primary)",
          "--success-border": "var(--smart-status-ok)",
          "--warning-bg": "var(--smart-bg-surface)",
          "--warning-text": "var(--smart-text-primary)",
          "--warning-border": "var(--smart-status-warning)",
          "--error-bg": "var(--smart-bg-surface)",
          "--error-text": "var(--smart-text-primary)",
          "--error-border": "var(--smart-status-danger)",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: "cn-toast font-[family-name:var(--smart-font-family,inherit)] shadow-[var(--smart-shadow-card)]",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
