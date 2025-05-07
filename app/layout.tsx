import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import ThemeToggle from "@/components/theme-toggle"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SoftSell - The Easiest Way to Sell Your Software Licenses",
  description:
    "SoftSell helps you quickly and securely sell your unused software licenses for the best price on the market.",
  icons: {
    icon: "/favicon.ico",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
            <div className="container flex h-16 items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold">S</span>
                </div>
                <span className="font-bold text-xl">SoftSell</span>
              </div>
              <nav className="hidden md:flex items-center gap-6">
                <a href="#" className="text-sm font-medium hover:text-primary">
                  Home
                </a>
                <a href="#" className="text-sm font-medium hover:text-primary">
                  How It Works
                </a>
                <a href="#" className="text-sm font-medium hover:text-primary">
                  Why Choose Us
                </a>
                <a href="#" className="text-sm font-medium hover:text-primary">
                  Contact
                </a>
              </nav>
              <div className="flex items-center gap-4">
                <ThemeToggle />
              </div>
            </div>
          </header>
          {children}
          <footer className="border-t py-6 md:py-8">
            <div className="container flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
              <div>
                <p className="text-sm text-muted-foreground">© 2025 SoftSell. All rights reserved.</p>
              </div>
              <div className="flex gap-4 text-sm text-muted-foreground">
                <a href="#" className="hover:text-foreground">
                  Privacy Policy
                </a>
                <a href="#" className="hover:text-foreground">
                  Terms of Service
                </a>
                <a href="#" className="hover:text-foreground">
                  Contact
                </a>
              </div>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  )
}
