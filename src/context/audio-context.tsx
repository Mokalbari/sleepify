"use client"

import { createContext, ReactNode, useContext, useRef, useState } from "react"

type AudioContextType = {
  isPlaying: boolean
  togglePlayPause: () => void
  setAudioSource: (src: string) => void
  audioSource: string | null
}

type AudioProviderProps = {
  children: ReactNode
}

const AudioContext = createContext<AudioContextType | undefined>(undefined)

export default function AudioProvider({ children }: AudioProviderProps) {
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

  const handleSetAudioSource = (src: string) => {
    if (!audioRef.current) return

    setAudioSource(src)
    audioRef.current.src = src
    audioRef.current.play()
    setIsPlaying(true)
  }

  return (
    <AudioContext.Provider
      value={{
        isPlaying,
        togglePlayPause,
        setAudioSource: handleSetAudioSource,
        audioSource,
      }}
    >
      {children}
      <audio
        ref={audioRef}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
      />
    </AudioContext.Provider>
  )
}

export const useAudio = () => {
  const context = useContext(AudioContext)
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider")
  }
  return context
}
