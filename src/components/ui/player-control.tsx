"use client"
import { useSleepify } from "@/context/sleepify-context"
import {
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
} from "lucide-react"
import { useState } from "react"

export default function PlayerControl() {
  const {
    isPlaying,
    togglePlayPause,
    skipNext,
    skipPrevious,
    volume,
    setAudioVolume,
  } = useSleepify()

  const [showVolumeSlider, setShowVolumeSlider] = useState(false)

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value)
    setAudioVolume(newVolume)
  }

  const toggleVolumeSlider = () => {
    setShowVolumeSlider(!showVolumeSlider)
  }

  return (
    <div className="relative">
      {/* Tablet + Desktop version */}
      <div className="flex items-center gap-4 max-sm:hidden">
        <SkipBack onClick={skipPrevious} className="cursor-pointer" />
        {isPlaying ? (
          <Pause onClick={togglePlayPause} className="cursor-pointer" />
        ) : (
          <Play onClick={togglePlayPause} className="cursor-pointer" />
        )}
        <SkipForward onClick={skipNext} className="cursor-pointer" />

        {/* Volume Control */}
        <div className="relative">
          {volume === 0 ? (
            <VolumeX onClick={toggleVolumeSlider} className="cursor-pointer" />
          ) : (
            <Volume2 onClick={toggleVolumeSlider} className="cursor-pointer" />
          )}
          {showVolumeSlider && (
            <div className="absolute bottom-full right-0 mb-2 w-32 rounded-md bg-white p-2 shadow-lg">
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={handleVolumeChange}
                className="w-full"
              />
            </div>
          )}
        </div>
      </div>

      {/* Mobile version */}
      <div className="flex items-center gap-4 sm:hidden">
        {isPlaying ? (
          <Pause onClick={togglePlayPause} className="cursor-pointer" />
        ) : (
          <Play onClick={togglePlayPause} className="cursor-pointer" />
        )}

        {/* Mobile Volume Control */}
        <div className="relative">
          {volume === 0 ? (
            <VolumeX onClick={toggleVolumeSlider} className="cursor-pointer" />
          ) : (
            <Volume2 onClick={toggleVolumeSlider} className="cursor-pointer" />
          )}
          {showVolumeSlider && (
            <div className="absolute bottom-full right-0 mb-2 w-32 rounded-md bg-white p-2 shadow-lg">
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={handleVolumeChange}
                className="w-full"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
