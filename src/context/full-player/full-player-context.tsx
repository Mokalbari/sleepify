"use client"

import { createContext } from "react"

/**
 * FullPlayerProvider manages visibility states for the media player
 * and lyrics section. Use `useFullPlayer` hook to access state and actions.
 */
type FullPlayerContextType = {
  isOpen: boolean
  isLyricsOpen: boolean
  handleFullPlayerVisibility: () => void
  handleLyricsVisibility: () => void
}

export const FullPlayerContext = createContext<
  FullPlayerContextType | undefined
>(undefined)
