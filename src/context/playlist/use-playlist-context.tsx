"use client"

import { useContext } from "react"
import { PlaylistContext } from "./playlist-context"

export const usePlaylistContext = () => {
  const context = useContext(PlaylistContext)
  if (!context) {
    throw new Error("usePlaylistContext must be used within a provider")
  }

  return context
}
