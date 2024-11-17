import SideNav from "@/components/side-nav"
import SleepifyNormalPlayer from "@/components/sleepify-normal-player"
import AudioProvider from "@/context/audio-context"
import { getUserInfo } from "@/lib/db/actions"

export default async function SleepifyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const userInfo = await getUserInfo()

  return (
    <div className="flex min-h-screen bg-lightBlue">
      <SideNav {...userInfo} />
      <div className="flex-1">
        <AudioProvider>
          <main>{children}</main>
          <SleepifyNormalPlayer />
        </AudioProvider>
      </div>
    </div>
  )
}
