"use client"

import { useSleepifyPlayer } from "@/hooks/use-sleepify/useSleepifyPlayer"
import { ContextProvider } from "@/lib/types/definitions"
import { createContext, useContext, useRef } from "react"

type SleepifyContextType = ReturnType<typeof useSleepifyPlayer>

const SleepifyContext = createContext<SleepifyContextType | null>(null)

export default function SleepifyProvider({ children }: ContextProvider) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const sleepifyPlayer = useSleepifyPlayer(audioRef)

  return (
    <SleepifyContext.Provider value={sleepifyPlayer}>
      {children}
      <audio ref={audioRef} />
    </SleepifyContext.Provider>
  )
}

export const useSleepify = () => {
  const context = useContext(SleepifyContext)
  if (!context) {
    throw new Error("useSleepify must be used within a SleepifyProvider")
  }
  return context
}
