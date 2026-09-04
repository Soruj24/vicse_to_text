"use client"

import * as React from "react"
import * as ToastPrimitive from "sonner"

const Toaster = ({ ...props }: ToastPrimitive.ToasterProps) => {
  return (
    <ToastPrimitive.Toaster
      theme="dark"
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
