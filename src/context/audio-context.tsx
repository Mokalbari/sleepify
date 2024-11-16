"use client"

import { createContext, ReactNode, useContext, useRef, useState } from "react"

type AudioContext = {
  isPlaying: boolean
  togglePlayPause: () => void
  setAudioSource: (src: string) => void
  audioSource: string | null
}

type AudioProvider = {
  children: ReactNode
}

const AudioContext = createContext<AudioContext | undefined>(undefined)

export default function AudioProvider({ children }: AudioProvider) {
  const [audioSource, setAudioSource] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const togglePlayPause = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  return (
    <AudioContext.Provider
      value={{ isPlaying, togglePlayPause, setAudioSource, audioSource }}
    >
      {children}
      <audio
        ref={audioRef}
        src={audioSource || undefined}
        onEnded={() => setIsPlaying(false)}
      />
    </AudioContext.Provider>
  )
}

export const useAudio = () => {
  const context = useContext(AudioContext)

  if (!context) {
    throw new Error("useAudio must be used within an Audio Provider")
  }
  return context
}
