"use client"

import { useContext } from "react"
import { FullPlayerContext } from "./full-player-context"

export const useFullPlayer = () => {
  const context = useContext(FullPlayerContext)
  if (!context) {
    throw new Error("useFullPlayer must be used within a FullPlayerProvider")
  }
  return context
}
