"use client"

import { useAudio } from "@/context/audio-context"
import { Pause, Play } from "lucide-react"
import HeartButton from "./heart-button"

interface Props {
  trackUrl: string
}

export default function CardPlayControl({ trackUrl }: Props) {
  const { audioSource, isPlaying, setAudioSource, togglePlayPause } = useAudio()

  const handlePlayPause = () => {
    // Si la piste est différente, on change la source et démarre la lecture
    if (audioSource !== trackUrl) {
      setAudioSource(trackUrl)
    } else {
      // Sinon, on alterne play/pause pour la piste actuelle
      togglePlayPause()
    }
  }

  return (
    <div className="flex gap-4">
      <HeartButton isFavorite={false} />
      <button onClick={handlePlayPause}>
        {isPlaying && audioSource === trackUrl ? <Pause /> : <Play />}
      </button>
    </div>
  )
}
