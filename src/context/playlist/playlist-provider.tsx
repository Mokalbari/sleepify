"use client"
import { ContextProvider, TrackList } from "@/lib/types/definitions"
import { useState } from "react"
import { PlaylistContext } from "./playlist-context"

interface Props extends ContextProvider {
  initialPlaylist: TrackList[]
}

export default function PlaylistProvider({ children, initialPlaylist }: Props) {
  const [playlist] = useState(initialPlaylist)

  return (
    <PlaylistContext.Provider value={{ playlist }}>
      {children}
    </PlaylistContext.Provider>
  )
}
