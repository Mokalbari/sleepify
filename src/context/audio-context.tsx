"use client"
import { useSleepifyPlayer } from "@/hooks/useSleepifyPlayer"
import { createContext, ReactNode, useContext } from "react"

type AudioContextType = ReturnType<typeof useSleepifyPlayer>

type AudioProviderProps = {
  children: ReactNode
}

const AudioContext = createContext<AudioContextType | undefined>(undefined)

export default function AudioProvider({ children }: AudioProviderProps) {
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
