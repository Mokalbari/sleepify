"use client"

import { useFullPlayer } from "@/context/full-player-context"
import { useSleepify } from "@/context/sleepify-context"
import { ChevronDown } from "lucide-react"
import Image from "next/image"
import cover from "../../public/cover-album_placeholder.webp"
import PlayerControlFS from "./ui/player-control-fs"
import ProgressBarFS from "./ui/progress-bar-fs"

export default function SleepifyFSPlayer() {
  const { currentTrack } = useSleepify()
  const { handleFullPlayerVisibility, handleLyricsVisibility } = useFullPlayer()

  return (
    <div className="flex flex-col items-center px-8 lg:p-0">
      <div className="mb-12 mt-6 text-md font-bold uppercase lg:hidden">
        Sleepify
      </div>
      <div className="brutal rounded-md lg:max-w-sm">
        <Image
          src={currentTrack?.previewImage || cover}
          alt={`Cover album ${currentTrack?.trackName || ""}`}
          width={640}
          height={640}
          style={{ borderRadius: "6px" }}
        />
      </div>
      <div className="mt-5 text-center">
        <h3 className="text-md font-bold">
          {currentTrack?.trackName || "Choose a song"}
        </h3>
        <div className="">
          {currentTrack?.artistName.join(", ") || "Choose a song"}
        </div>
      </div>
      <div className="w-full">
        <ProgressBarFS />
        <PlayerControlFS />
      </div>
      <button
        onClick={handleLyricsVisibility}
        className="text-bold mt-5 text-sm font-bold text-accessBlue sm:hidden"
      >
        View Lyrics
      </button>
      <button
        onClick={handleFullPlayerVisibility}
        className="flex flex-col items-center"
      >
        <div className="mt-14 text-black/80">Back to playlist</div>
        <div>
          <ChevronDown />
        </div>
      </button>
    </div>
  )
}
