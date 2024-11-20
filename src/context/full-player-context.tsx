"use client"

import { ContextProvider } from "@/lib/types/definitions"
import { createContext, useContext, useState } from "react"

type FullPlayerContextType = {
  isOpen: boolean
  isLyricsOpen: boolean
  handleFullPlayerVisibility: () => void
  handleLyricsVisibility: () => void
}

const FullPlayerContext = createContext<FullPlayerContextType | undefined>(
  undefined,
)

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

export const useFullPlayer = () => {
  const context = useContext(FullPlayerContext)
  if (!context) {
    throw new Error("useFullPlayer must be used within a FullPlayerProvider")
  }
  return context
}
