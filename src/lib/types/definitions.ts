import { useSleepifyPlayer } from "@/hooks/use-sleepify/useSleepifyPlayer"
import { ReactNode } from "react"
import { z } from "zod"
import {
  CountSchema,
  LikesListSchema,
  LikesSchema,
  TrackListSchema,
  TrackSchema,
  UserInfoSchema,
} from "../schema/definitions"

export type TrackList = z.infer<typeof TrackListSchema>
export type Track = z.infer<typeof TrackSchema>

export type LikedSongs = z.infer<typeof LikesListSchema>
export type LikedSong = z.infer<typeof LikesSchema>

export type UserInfo = z.infer<typeof UserInfoSchema>

export type Count = z.infer<typeof CountSchema>

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
  previewImage: string | null
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

export type Action =
  | { type: "SET_CURRENT_TRACK"; payload: AudioTrack | null }
  | { type: "SET_CURRENT_PLAYLIST"; payload: AudioTrack[] }
  | { type: "SET_SKIP_DIRECTION"; payload: "prev" | "next" }
  | { type: "SET_CURRENT_TRACK_INDEX"; payload: number }
  | { type: "SET_IS_PLAYING"; payload: boolean }
  | { type: "SET_VOLUME"; payload: number }
  | { type: "SET_CURRENT_TIME"; payload: number }
  | { type: "SET_DURATION"; payload: number }

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

export type PlayerStateWithActions = {
  state: PlayerState
  dispatch: React.Dispatch<Action>
  skipNext: () => void
  skipPrevious: () => void
}
