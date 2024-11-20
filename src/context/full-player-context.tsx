"use client"

import { ContextProvider } from "@/lib/types/definitions"
import { createContext, useContext, useState } from "react"

type FullPlayerContextType = {
  isOpen: boolean
  handleFullPlayerVisibility: () => void
}

const FullPlayerContext = createContext<FullPlayerContextType | undefined>(
  undefined,
)

export default function FullPlayerProvider({ children }: ContextProvider) {
  const [isOpen, setIsOpen] = useState(false)

  const handleFullPlayerVisibility = () => {
    setIsOpen((prev) => !prev)
  }

  return (
    <FullPlayerContext.Provider value={{ isOpen, handleFullPlayerVisibility }}>
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
