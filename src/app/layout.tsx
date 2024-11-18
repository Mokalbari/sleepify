import { montserrat } from "@/styles/font"
import "@/styles/globals.css"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sleepify",
  description: "Like the 90s, but more tired",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} text-base antialiased`}>
        {children}
      </body>
    </html>
  )
}
