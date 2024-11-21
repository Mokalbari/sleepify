"use client"

import { ContextProvider } from "@/lib/types/definitions"
import { useState } from "react"
import { FullPlayerContext } from "./full-player-context"

export default function FullPlayerProvider({ children }: ContextProvider) {
  const [isOpen, setIsOpen] = useState(false)
  const [isLyricsOpen, setIsLyricsOpen] = useState(false)

  const handleFullPlayerVisibility = () => {
    setIsOpen((prev) => !prev)
  }

  const handleLyricsVisibility = () => {
    setIsLyricsOpen((prev) => !prev)
  }

  return (
    <FullPlayerContext.Provider
      value={{
        isOpen,
        handleFullPlayerVisibility,
        isLyricsOpen,
        handleLyricsVisibility,
      }}
    >
      {children}
    </FullPlayerContext.Provider>
  )
}
