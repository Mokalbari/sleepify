"use client"

import BottomNav from "@/components/bottom-nav"
import PlayerControl from "@/components/ui/player-control"
import PlayerTrack from "@/components/ui/player-track"
import ProgressBar from "@/components/ui/progress-bar"
import { useFullPlayer } from "@/context/full-player-context"
import { useSleepify } from "@/context/sleepify-context"
import "@/styles/animations.css"
import { cn } from "@/utils/helpers/style"

export default function SleepifyNormalPlayer() {
  const { handleFullPlayerVisibility } = useFullPlayer()
  const { currentTrack } = useSleepify()
  return (
    <div
      className={cn("sticky bottom-0 left-0 max-sm:mt-12", {
        hidden: !currentTrack,
        "animate-slide-up": currentTrack,
      })}
    >
      <div className="sm:hidden">
        <BottomNav />
      </div>
      <ProgressBar />
      <div className="flex w-full items-center justify-between bg-white px-4 py-3">
        <PlayerTrack />
        <button
          onClick={handleFullPlayerVisibility}
          className="font-bold text-accessBlue hover:cursor-pointer hover:underline max-sm:hidden"
        >
          <span className="max-lg:hidden">View</span> Lyrics
        </button>
        <PlayerControl />
      </div>
    </div>
  )
}
