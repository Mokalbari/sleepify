"use client"

import { TrackList } from "@/lib/types/definitions"
import { createContext, ReactNode, useContext, useState } from "react"

type Playlist = {
  playlist: TrackList[]
}
const PlaylistContext = createContext<Playlist | undefined>(undefined)

type Props = { children: ReactNode; initialPlaylist: TrackList[] }

export default function PlaylistProvider({ children, initialPlaylist }: Props) {
  const [playlist] = useState(initialPlaylist)

  return (
    <PlaylistContext.Provider value={{ playlist }}>
      {children}
    </PlaylistContext.Provider>
  )
}

export const usePlaylistContext = () => {
  const context = useContext(PlaylistContext)
  if (!context) {
    throw new Error("usePlaylistContext must be used within a provider")
  }

  return context
}
