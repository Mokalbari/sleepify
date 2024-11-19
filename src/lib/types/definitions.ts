import { useSleepifyPlayer } from "@/hooks/useSleepifyPlayer"
import { ReactNode } from "react"

export type TrackList = {
  track_id: string
  track_name: string
  music_url: string | null
  track_duration: number
  track_image: string
  artist_id: string
  artist_name: string[]
  is_favorite: boolean
}

export type UserInfo = {
  id: string
  firstname: string
  lastname: string
  avatar: string
}

export type LikedSongs = {
  track_id: string
  track_name: string
  duration_ms: number
  artist_name: string[]
  track_image: string
  music_url: string
}

export type Count = {
  count: number
}

export type Avatar = {
  avatar: string
}

export type AudioContextType = ReturnType<typeof useSleepifyPlayer>

export interface ContextProvider {
  children: ReactNode
}

export type LikesContextType = {
  likedCount: Count
  incrementLikes: () => void
  decrementLikes: () => void
}
