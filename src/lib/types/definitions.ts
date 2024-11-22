import { useSleepifyPlayer } from "@/hooks/use-sleepify/useSleepifyPlayer"
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

export type AudioTrack = {
  trackId: string
  trackUrl: string | null
  trackName: string
  artistName: string[]
  previewImage: string
  isFavorite?: boolean
}

export type UseSleepifyAudioParams = {
  audioRef: React.RefObject<HTMLAudioElement>
  playerState: {
    currentTrack: AudioTrack | null
    isPlaying: boolean
    volume: number
    setIsPlaying: (isPlaying: boolean) => void
    setCurrentTime: (time: number) => void
    setDuration: (duration: number) => void
    currentPlaylist: AudioTrack[]
    skipNext: () => void
    skipPrevious: () => void
    skipDirection: "prev" | "next"
  }
}

export type PlayerState = {
  currentTrack: AudioTrack | null
  currentPlaylist: AudioTrack[]
  skipDirection: "prev" | "next"
  currentTrackIndex: number
  isPlaying: boolean
  volume: number
  currentTime: number
  duration: number
}

export type Action =
  | { type: "SET_CURRENT_TRACK"; payload: AudioTrack | null }
  | { type: "SET_CURRENT_PLAYLIST"; payload: AudioTrack[] }
  | { type: "SET_SKIP_DIRECTION"; payload: "prev" | "next" }
  | { type: "SET_CURRENT_TRACK_INDEX"; payload: number }
  | { type: "SET_IS_PLAYING"; payload: boolean }
  | { type: "SET_VOLUME"; payload: number }
  | { type: "SET_CURRENT_TIME"; payload: number }
  | { type: "SET_DURATION"; payload: number }
