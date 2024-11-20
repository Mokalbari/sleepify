"use client"

import { useAudio } from "@/context/audio-context"
import { useFullPlayer } from "@/context/full-player-context"
import { cn } from "@/helpers/style"
import "@/styles/animations.css"
import { CircleX } from "lucide-react"

type Props = {
  lyrics: string
}
export default function Lyrics({ lyrics }: Props) {
  const { currentTrack } = useAudio()
  const { isLyricsOpen, handleLyricsVisibility } = useFullPlayer()

  if (isLyricsOpen) return null

  return (
    <div
      className={cn(
        "slide-up fixed left-0 top-0 z-20 h-full w-full bg-lightBlue p-4",
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-sm font-bold">
            {currentTrack?.trackName || "Choose a song"}
          </h3>
          <div>{currentTrack?.artistName.join("") || "Choose a song"}</div>
        </div>
        <button onClick={handleLyricsVisibility}>
          <CircleX />
        </button>
      </div>
      <p className="mt-8 whitespace-pre-wrap">{lyrics}</p>
    </div>
  )
}