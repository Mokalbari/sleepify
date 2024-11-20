"use client"

import { CircleX } from "lucide-react"
import { useEffect } from "react"

import { useAudio } from "@/context/audio-context"
import { useFullPlayer } from "@/context/full-player-context"
import { cn } from "@/helpers/style"
import { useLyrics } from "@/hooks/useLyrics"

import Lyrics from "./lyrics"
import SleepifyFSPlayer from "./sleepify-fs-player"

export default function LyricsPlayer() {
  const { isOpen, handleFullPlayerVisibility } = useFullPlayer()
  const { currentTrack } = useAudio()
  const { lyricsData, fetchLyrics } = useLyrics()

  useEffect(() => {
    if (currentTrack?.artistName && currentTrack?.trackName) {
      fetchLyrics(currentTrack.artistName[0], currentTrack.trackName)
    }
  }, [currentTrack, fetchLyrics])

  if (!isOpen) return null

  return (
    <>
      <div
        className={cn(
          "fixed top-0 z-10 h-screen w-full overflow-auto bg-lightBlue",
          "sm:px-8",
          "lg:flex lg:justify-center lg:gap-32 lg:pt-16",
        )}
      >
        <div className="sm:max-lg:hidden">
          <SleepifyFSPlayer />
        </div>

        <div className="ml-5 mt-10 max-w-[45ch] max-sm:hidden lg:m-0">
          <div className="flex items-center justify-between lg:hidden">
            <div className="flex flex-col">
              <h3 className="text-md font-bold">
                {currentTrack?.trackName || "No track selected"}
              </h3>
              <div>
                {currentTrack?.artistName?.join(", ") || "No artist selected"}
              </div>
            </div>

            <button
              onClick={handleFullPlayerVisibility}
              aria-label="Close lyrics"
            >
              <CircleX />
            </button>
          </div>

          <p
            className="mt-10 overflow-auto whitespace-pre-wrap py-8 lg:m-0"
            aria-live="polite"
          >
            {lyricsData.lyrics}
          </p>
        </div>
      </div>

      <Lyrics lyrics={lyricsData.lyrics} />
    </>
  )
}
