"use client"
import { useSleepifyPlayer } from "@/hooks/useSleepifyPlayer"
import type { AudioContextType, ContextProvider } from "@/lib/types/definitions"
import { createContext, useContext } from "react"

const AudioContext = createContext<AudioContextType | undefined>(undefined)

export default function AudioProvider({ children }: ContextProvider) {
  const sleepifyPlayer = useSleepifyPlayer()

  return (
    <AudioContext.Provider value={sleepifyPlayer}>
      {children}
      <audio
        ref={sleepifyPlayer.audioRef}
        onPlay={() => sleepifyPlayer.isPlaying}
        onPause={() => sleepifyPlayer.isPlaying}
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
