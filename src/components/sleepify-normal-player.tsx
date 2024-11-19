"use client"

import BottomNav from "@/components/bottom-nav"
import PlayerControl from "@/components/ui/player-control"
import PlayerTrack from "@/components/ui/player-track"
import ProgressBar from "@/components/ui/progress-bar"

export default function SleepifyNormalPlayer() {
  return (
    <div className="sticky bottom-0 left-0 max-sm:mt-12">
      <div className="sm:hidden">
        <BottomNav />
      </div>
      <ProgressBar />
      <div className="flex w-full items-center justify-between bg-white px-4 py-3">
        <PlayerTrack />
        <button className="font-bold text-[#2664E1] hover:cursor-pointer hover:underline max-sm:hidden">
          <span className="max-lg:hidden">View</span> Lyrics
        </button>
        <PlayerControl />
      </div>
    </div>
  )
}
