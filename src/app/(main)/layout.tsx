import SideNav from "@/components/side-nav"
import SleepifyNormalPlayer from "@/components/sleepify-normal-player"
import FullPlayerProvider from "@/context/full-player-context"
import LikesProvider from "@/context/likes-context"
import AudioProvider from "@/context/sleepify-context"
import { getLikesCount, getTracksCount, getUserInfo } from "@/server/actions"

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
    <LikesProvider initialCount={likedCount.count}>
      <div className="flex min-h-screen bg-lightBlue">
        <SideNav
          tracksCount={tracksCount}
          userInfo={{
            id: userInfo.id,
            firstname: userInfo.firstname,
            lastname: userInfo.lastname,
            avatar: userInfo.avatar,
          }}
        />
        <div className="flex-1">
          <AudioProvider>
            <FullPlayerProvider>
              <main className="">{children}</main>
              <SleepifyNormalPlayer />
            </FullPlayerProvider>
          </AudioProvider>
        </div>
      </div>
    </LikesProvider>
  )
}
