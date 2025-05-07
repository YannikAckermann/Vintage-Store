import type React from "react"
import type { Metadata } from "next"
import { Libre_Baskerville, Montserrat } from "next/font/google"
import "./globals.css"
import { CartProvider } from "@/context/cart-context"
import CartSidebar from "@/components/cart-sidebar"

// Fonts
const serif = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-serif",
})

const sans = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "RetroBloom | Vintage Clothing Store",
  description: "Curated vintage pieces from the 60s to early 2000s",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${serif.variable} ${sans.variable}`}>
        <CartProvider>
          {children}
          <CartSidebar />
        </CartProvider>
      </body>
    </html>
  )
}
