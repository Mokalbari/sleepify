import SideNav from "@/components/side-nav"
import SleepifyNormalPlayer from "@/components/sleepify-normal-player"
import AudioProvider from "@/context/audio-context"

export default function SleepifyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-lightBlue">
      <SideNav />
      <div className="flex-1">
        <AudioProvider>
          <main>{children}</main>
          <SleepifyNormalPlayer />
        </AudioProvider>
      </div>
    </div>
  )
}
