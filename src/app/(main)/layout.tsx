import SideNav from "@/components/side-nav"
import SleepifyNormalPlayer from "@/components/sleepify-normal-player"
import AudioProvider from "@/context/audio-context"
import { getLikesCount, getTracksCount, getUserInfo } from "@/lib/db/actions"

export default async function SleepifyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [userInfo, tracksCount, likedCount] = await Promise.all([
    getUserInfo(),
    getTracksCount(),
    getLikesCount(),
  ])

  return (
    <div className="flex min-h-screen bg-lightBlue">
      <SideNav
        tracksCount={tracksCount}
        likedCount={likedCount}
        userInfo={{
          id: userInfo.id,
          firstname: userInfo.firstname,
          lastname: userInfo.lastname,
          avatar: userInfo.avatar,
        }}
      />
      <div className="flex-1">
        <AudioProvider>
          <main>{children}</main>
          <SleepifyNormalPlayer />
        </AudioProvider>
      </div>
    </div>
  )
}
