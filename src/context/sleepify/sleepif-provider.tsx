"use client"

import { useSleepifyPlayer } from "@/hooks/use-sleepify/useSleepifyPlayer"
import { ContextProvider } from "@/lib/types/definitions"
import { useRef } from "react"
import { SleepifyContext } from "./sleepify-context"

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
