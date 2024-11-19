"use client"
import { useSleepifyPlayer } from "@/hooks/useSleepifyPlayer"
import type { AudioContextType, ContextProvider } from "@/lib/types/definitions"
import { createContext, useContext } from "react"

const AudioContext = createContext<AudioContextType | undefined>(undefined)

export default function AudioProvider({ children }: ContextProvider) {
  const sleepifyPlayerProps = useSleepifyPlayer()

  return (
    <AudioContext.Provider value={sleepifyPlayerProps}>
      {children}
      <audio
        ref={sleepifyPlayerProps.audioRef}
        onPlay={() => sleepifyPlayerProps.isPlaying}
        onPause={() => sleepifyPlayerProps.isPlaying}
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
