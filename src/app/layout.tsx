import SideNav from "@/components/side-nav"
import SleepifyNormalPlayer from "@/components/sleepify-normal-player"
import AudioProvider from "@/context/audio-context"
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
      <body
        className={`${montserrat.className} bg-lightBlue text-base antialiased`}
      >
        <div className="flex min-h-screen">
          <SideNav />
          <div className="flex-1">
            <AudioProvider>
              <main>{children}</main>
              <SleepifyNormalPlayer />
            </AudioProvider>
          </div>
        </div>
      </body>
    </html>
  )
}
