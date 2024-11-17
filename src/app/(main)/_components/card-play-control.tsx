"use client"

import { useAudio } from "@/context/audio-context"
import { Bug, Pause, Play } from "lucide-react"
import HeartButton from "../../../components/ui/heart-button"

interface Props {
  trackUrl: string | null
  trackName: string
  artistName: string[]
  previewImage: string
  isFavorite: boolean
}

export default function CardPlayControl({
  trackUrl,
  trackName,
  artistName,
  previewImage,
  isFavorite,
}: Props) {
  const { currentTrack, isPlaying, setAudioTrack, togglePlayPause } = useAudio()

  const handlePlayPause = () => {
    if (!trackUrl) return
    if (currentTrack?.trackUrl !== trackUrl) {
      setAudioTrack({ trackUrl, trackName, artistName, previewImage })
    } else {
      togglePlayPause()
    }
  }

  return (
    <div className="flex gap-4">
      <HeartButton isFavorite={isFavorite} />
      <button
        onClick={handlePlayPause}
        disabled={!trackUrl}
        className={`flex items-center justify-center ${
          !trackUrl ? "cursor-not-allowed opacity-50" : ""
        }`}
      >
        {trackUrl === null ? (
          <Bug />
        ) : isPlaying && currentTrack?.trackUrl === trackUrl ? (
          <Pause />
        ) : (
          <Play />
        )}
      </button>
    </div>
  )
}
