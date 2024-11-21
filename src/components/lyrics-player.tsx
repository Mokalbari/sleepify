"use client"

import { useFullPlayer } from "@/context/full-player/use-full-player"
import { useSleepify } from "@/context/sleepify/use-sleepify"
import { useLyrics } from "@/hooks/useLyrics"
import { cn } from "@/utils/helpers/style"
import { CircleX } from "lucide-react"
import SleepifyFSPlayer from "./sleepify-fs-player"
import Lyrics from "./ui/lyrics"

export default function LyricsPlayer() {
  const { isOpen, handleFullPlayerVisibility } = useFullPlayer()
  const { currentTrack } = useSleepify()
  const artist = currentTrack?.artistName[0] || ""
  const track = currentTrack?.trackName || ""

  const { data: lyrics, isLoading, isError, error } = useLyrics(artist, track)

  if (!isOpen) return null

  return (
    <div
      className={cn(
        "fixed top-0 z-10 h-screen w-full overflow-auto bg-lightBlue",
        "sm:px-8",
        "lg:flex lg:justify-center lg:gap-32 lg:pt-16",
      )}
    >
      {/* Full-Screen Player */}
      <div className="sm:max-lg:hidden lg:w-fit">
        <SleepifyFSPlayer />
      </div>

      {/* Lyrics Display */}
      <div className="ml-5 mt-10 max-w-[45ch] max-sm:hidden lg:m-0 lg:flex-1">
        {/* Track Info and Close Button */}
        <div className="flex items-center justify-between lg:hidden">
          <div className="flex flex-col">
            <h3 className="text-md font-bold">
              {track || "No track selected"}
            </h3>
            <div>{artist || "No artist selected"}</div>
          </div>
          <button
            onClick={handleFullPlayerVisibility}
            aria-label="Close lyrics"
          >
            <CircleX />
          </button>
        </div>

        {/* Lyrics Content */}
        <p
          className="mt-10 overflow-auto whitespace-pre-wrap py-8 lg:m-0"
          aria-live="polite"
        >
          {isLoading && "Loading lyrics..."}
          {isError && (error as Error).message}
          {lyrics && lyrics}
        </p>
      </div>

      {/* Mobile Lyrics Component */}
      <Lyrics lyrics={lyrics || ""} />
    </div>
  )
}
