import SideNav from "@/components/side-nav"
import SleepifyNormalPlayer from "@/components/sleepify-normal-player"
import FullPlayerProvider from "@/context/full-player/full-player-provider"
import LikesProvider from "@/context/likes/likes-provider"
import LyricsProvider from "@/context/lyrics/lyrics-provider"
import SleepifyProvider from "@/context/sleepify/sleepif-provider"
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
        <SideNav tracksCount={tracksCount} userInfo={userInfo} />
        <div className="flex-1">
          <SleepifyProvider>
            <LyricsProvider>
              <FullPlayerProvider>
                <main className="">{children}</main>
                <SleepifyNormalPlayer />
              </FullPlayerProvider>
            </LyricsProvider>
          </SleepifyProvider>
        </div>
      </div>
    </LikesProvider>
  )
}
