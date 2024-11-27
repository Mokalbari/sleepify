"use client"
import { useSleepify } from "@/context/sleepify/use-sleepify"
import { Pause, Play, SkipBack, SkipForward } from "lucide-react"

export default function PlayerControlFS() {
  const { isPlaying, skipPrevious, togglePlayPause, skipNext } = useSleepify()

  return (
    <div className="mt-4 flex justify-between">
      <button
        onClick={skipPrevious}
        className="cursor-pointer rounded-md p-2 hover:bg-gray-200"
        aria-label="Skip to previous track"
      >
        <SkipBack />
      </button>

      <button
        onClick={togglePlayPause}
        className="brutal rounded-full bg-deepBlue p-3 hover:bg-blue-700"
        aria-label={isPlaying ? "Pause track" : "Play track"}
      >
        {isPlaying ? (
          <Pause fill="white" stroke="white" />
        ) : (
          <Play fill="white" stroke="white" />
        )}
      </button>

      <button
        onClick={skipNext}
        className="cursor-pointer rounded-md p-2 hover:bg-gray-200"
        aria-label="Skip to next track"
      >
        <SkipForward />
      </button>
    </div>
  )
}
