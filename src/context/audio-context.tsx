"use client"
import { useSleepifyPlayer } from "@/hooks/useSleepifyPlayer"
import { ContextProvider } from "@/lib/types/definitions"
import { createContext, useContext } from "react"

type AudioContextType = ReturnType<typeof useSleepifyPlayer>

const AudioContext = createContext<AudioContextType | null>(null)

export default function AudioProvider({ children }: ContextProvider) {
  const sleepifyPlayer = useSleepifyPlayer()

  return (
    <AudioContext.Provider value={sleepifyPlayer}>
      {children}
      <audio ref={sleepifyPlayer.audioRef} />
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
