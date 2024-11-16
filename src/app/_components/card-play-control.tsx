"use client"

import { useAudio } from "@/context/audio-context"
import { Bug, Pause, Play } from "lucide-react"
import HeartButton from "../../components/ui/heart-button"

interface Props {
  trackUrl: string | null
}

export default function CardPlayControl({ trackUrl }: Props) {
  const { audioSource, isPlaying, setAudioSource, togglePlayPause } = useAudio()

  const handlePlayPause = () => {
    if (!trackUrl) return
    if (audioSource !== trackUrl) {
      setAudioSource(trackUrl)
    } else {
      togglePlayPause()
    }
  }

  return (
    <div className="flex gap-4">
      <HeartButton isFavorite={false} />
      <button
        onClick={handlePlayPause}
        disabled={!trackUrl}
        className={`flex items-center justify-center ${
          !trackUrl ? "cursor-not-allowed opacity-50" : ""
        }`}
      >
        {trackUrl === null ? (
          <Bug />
        ) : isPlaying && audioSource === trackUrl ? (
          <Pause />
        ) : (
          <Play />
        )}
      </button>
    </div>
  )
}
