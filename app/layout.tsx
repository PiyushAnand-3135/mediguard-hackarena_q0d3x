import type React from "react"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/contexts/auth-context"
import { ChatWidget } from "@/components/ChatWidget"

export const metadata = {
  title: "MediGuard - Verify Before You Swallow",
  description: "Scan medicine labels or prescriptions to check drug interactions and find alternatives",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
        <ChatWidget />
      </body>
    </html>
  )
}
