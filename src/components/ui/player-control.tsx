"use client"

import { useAudio } from "@/context/audio-context"
import { Pause, Play, SkipBack, SkipForward } from "lucide-react"
import HeartButton from "./heart-button"

export default function PlayerControl() {
  const { isPlaying, togglePlayPause, skipNext, skipPrevious, currentTrack } =
    useAudio()

  return (
    <>
      {/* Tablet + Desktop version */}
      <div className="flex gap-4 max-sm:hidden">
        <SkipBack onClick={skipPrevious} className="cursor-pointer" />
        {isPlaying ? (
          <Pause onClick={togglePlayPause} className="cursor-pointer" />
        ) : (
          <Play onClick={togglePlayPause} className="cursor-pointer" />
        )}
        <SkipForward onClick={skipNext} className="cursor-pointer" />
      </div>

      {/* Mobile version */}
      <div className="flex gap-4 sm:hidden">
        <HeartButton
          trackId={currentTrack?.trackId || ""}
          isFavorite={currentTrack?.isFavorite || false}
        />

        {isPlaying ? (
          <Pause onClick={togglePlayPause} className="cursor-pointer" />
        ) : (
          <Play onClick={togglePlayPause} className="cursor-pointer" />
        )}
      </div>
    </>
  )
}
