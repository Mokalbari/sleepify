"use client"
import { useSleepify } from "@/context/audio-context"
import { Pause, Play, SkipBack, SkipForward } from "lucide-react"

export default function PlayerControlFS() {
  const { isPlaying, skipPrevious, togglePlayPause, skipNext } = useSleepify()

  return (
    <div className="mt-4 flex justify-between">
      <button>
        <SkipBack onClick={skipPrevious} className="cursor-pointer" />
      </button>
      <button className="brutal rounded-full bg-deepBlue p-2">
        {isPlaying ? (
          <Pause
            onClick={togglePlayPause}
            className="cursor-pointer"
            fill="white"
            stroke="white"
          />
        ) : (
          <Play
            onClick={togglePlayPause}
            className="cursor-pointer"
            fill="white"
            stroke="white"
          />
        )}
      </button>
      <button>
        <SkipForward onClick={skipNext} className="cursor-pointer" />
      </button>
    </div>
  )
}
