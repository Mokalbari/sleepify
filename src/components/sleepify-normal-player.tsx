"use client"

import BottomNav from "@/components/bottom-nav"
import PlayerControl from "@/components/ui/player-control"
import PlayerTrack from "@/components/ui/player-track"
import ProgressBar from "@/components/ui/progress-bar"
import { useAudio } from "@/context/audio-context"
import { cn } from "@/helpers/style"
import "@/styles/animations.css"

export default function SleepifyNormalPlayer() {
  const { currentTrack } = useAudio()
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
        <button className="text-accessBlue font-bold hover:cursor-pointer hover:underline max-sm:hidden">
          <span className="max-lg:hidden">View</span> Lyrics
        </button>
        <PlayerControl />
      </div>
    </div>
  )
}
