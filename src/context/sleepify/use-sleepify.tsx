"use client"

import {
  Action,
  AudioTrack,
  ContextProvider,
  LikedSongs,
  PlayerState,
  TrackList,
} from "@/lib/types/definitions"
import {
  createContext,
  Dispatch,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from "react"
import { initialState, reducer } from "./sleepify-state"

// ===============================
// Types
// ===============================

type SleepifyContextType = {
  currentTrack: AudioTrack | null
  isPlaying: boolean
  volume: number
  currentTime: number
  duration: number
  skipNext: () => void
  skipPrevious: () => void
  togglePlayPause: () => void
  seekTo: (time: number) => void
  adjustVolume: (volume: number) => void
  playTrackFromPlaylist: (
    trackId: string,
    trackUrl: string | null,
    playlist: TrackList | LikedSongs,
  ) => void
}

// ===============================
// Context Creation
// ===============================

const SleepifyContext = createContext<SleepifyContextType | null>(null)

// ===============================
// Player Hook
// ===============================

const useSleepifyPlayer = (
  audioRef: React.RefObject<HTMLAudioElement>,
  state: PlayerState,
  dispatch: Dispatch<Action>,
) => {
  // State Extraction
  const {
    currentTrack,
    currentPlaylist,
    currentTrackIndex,
    isPlaying,
    volume,
    currentTime,
    duration,
  } = state

  // Track Management Functions
  const playTrack = (track: AudioTrack) => {
    dispatch({ type: "SET_CURRENT_TRACK", payload: track })
    const index = currentPlaylist.findIndex((t) => t.trackId === track.trackId)
    if (index !== -1) {
      dispatch({ type: "SET_CURRENT_TRACK_INDEX", payload: index })
    }
  }

  const togglePlayPause = () => {
    const audio = audioRef.current
    if (!audio) return

    if (audio.paused) {
      audio.play()
    } else {
      audio.pause()
    }
  }

  const playTrackFromPlaylist = (
    trackId: string,
    trackUrl: string | null,
    playlist: TrackList | LikedSongs,
  ) => {
    if (!trackUrl) return

    const audioPlaylist: AudioTrack[] = playlist.map((track) => ({
      trackId: track.track_id,
      trackUrl: track.music_url ?? null,
      trackName: track.track_name,
      artistName: Array.isArray(track.artist_name)
        ? track.artist_name
        : [track.artist_name],
      previewImage: track.track_image ?? null,
      isFavorite: "is_favorite" in track ? track.is_favorite : false,
    }))

    const index = audioPlaylist.findIndex((track) => track.trackId === trackId)

    if (currentTrack?.trackUrl !== trackUrl) {
      if (index !== -1) {
        const audioTrack = audioPlaylist[index]
        dispatch({ type: "SET_CURRENT_PLAYLIST", payload: audioPlaylist })
        dispatch({ type: "SET_CURRENT_TRACK_INDEX", payload: index })
        playTrack(audioTrack)
      }
    } else {
      togglePlayPause()
    }
  }

  // Navigation Functions
  const skipNext = useCallback(() => {
    dispatch({ type: "SET_SKIP_DIRECTION", payload: "next" })
    if (currentPlaylist.length === 0) return

    const nextIndex = (currentTrackIndex + 1) % currentPlaylist.length

    dispatch({ type: "SET_CURRENT_TRACK", payload: currentPlaylist[nextIndex] })
    dispatch({ type: "SET_CURRENT_TRACK_INDEX", payload: nextIndex })
  }, [currentPlaylist, currentTrackIndex, dispatch])

  const skipPrevious = useCallback(() => {
    dispatch({ type: "SET_SKIP_DIRECTION", payload: "prev" })
    if (currentPlaylist.length === 0) return

    let prevIndex =
      (currentTrackIndex - 1 + currentPlaylist.length) % currentPlaylist.length

    let attempts = currentPlaylist.length
    while (currentPlaylist[prevIndex].trackUrl === null && attempts > 0) {
      prevIndex =
        (prevIndex - 1 + currentPlaylist.length) % currentPlaylist.length
      attempts--
    }

    if (attempts > 0) {
      dispatch({
        type: "SET_CURRENT_TRACK",
        payload: currentPlaylist[prevIndex],
      })
      dispatch({ type: "SET_CURRENT_TRACK_INDEX", payload: prevIndex })
    } else {
      console.warn("No valid previous track found.")
      dispatch({ type: "SET_CURRENT_TRACK", payload: null })
    }
  }, [currentPlaylist, currentTrackIndex, dispatch])

  // Playback Control Functions
  const seekTo = (time: number) => {
    const audio = audioRef.current
    if (audio) {
      audio.currentTime = time
    }
  }

  const adjustVolume = (newVolume: number) => {
    const clampedVolume = Math.max(0, Math.min(1, newVolume))
    const audio = audioRef.current

    if (audio) {
      audio.volume = clampedVolume
    }

    dispatch({ type: "SET_VOLUME", payload: clampedVolume })
  }

  // Effect Handlers
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handlePlay = () => dispatch({ type: "SET_IS_PLAYING", payload: true })
    const handlePause = () =>
      dispatch({ type: "SET_IS_PLAYING", payload: false })
    const handleTimeUpdate = () =>
      dispatch({ type: "SET_CURRENT_TIME", payload: audio.currentTime })
    const handleLoadedMetadata = () =>
      dispatch({ type: "SET_DURATION", payload: audio.duration })
    const handleEnded = () => {
      if (currentPlaylist.length > 0) {
        skipNext()
      }
    }

    audio.addEventListener("play", handlePlay)
    audio.addEventListener("pause", handlePause)
    audio.addEventListener("timeupdate", handleTimeUpdate)
    audio.addEventListener("loadedmetadata", handleLoadedMetadata)
    audio.addEventListener("ended", handleEnded)

    audio.volume = volume

    return () => {
      audio.removeEventListener("play", handlePlay)
      audio.removeEventListener("pause", handlePause)
      audio.removeEventListener("timeupdate", handleTimeUpdate)
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata)
      audio.removeEventListener("ended", handleEnded)
    }
  }, [audioRef, currentPlaylist, volume, skipNext, dispatch])

  useEffect(() => {
    const audio = audioRef.current
    if (audio && currentTrack && currentTrack.trackUrl) {
      audio.src = currentTrack.trackUrl
      audio
        .play()
        .then(() => dispatch({ type: "SET_IS_PLAYING", payload: true }))
    } else {
      skipNext()
    }
  }, [audioRef, currentTrack, state.skipDirection, skipNext, dispatch])

  return {
    currentTrack,
    isPlaying,
    volume,
    currentTime,
    duration,
    skipNext,
    skipPrevious,
    togglePlayPause,
    seekTo,
    adjustVolume,
    playTrackFromPlaylist,
  }
}

// ===============================
// Provider Component
// ===============================

export default function SleepifyProvider({ children }: ContextProvider) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [state, dispatch] = useReducer(reducer, initialState)
  const sleepifyPlayer = useSleepifyPlayer(audioRef, state, dispatch)

  return (
    <SleepifyContext.Provider value={sleepifyPlayer}>
      {children}
      <audio ref={audioRef} />
    </SleepifyContext.Provider>
  )
}

// ===============================
// Context Hook
// ===============================

export const useSleepify = () => {
  const context = useContext(SleepifyContext)
  if (!context) {
    throw new Error("useSleepify must be used within a SleepifyProvider")
  }
  return context
}
