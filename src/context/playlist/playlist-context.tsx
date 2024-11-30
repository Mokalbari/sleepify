"use client"

import { TrackList } from "@/lib/types/definitions"
import { createContext } from "react"

type Playlist = {
  playlist: TrackList
}

export const PlaylistContext = createContext<Playlist | undefined>(undefined)
