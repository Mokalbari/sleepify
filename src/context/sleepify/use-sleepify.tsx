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
  useMemo,
  useReducer,
  useRef,
} from "react"
import { initialState, reducer } from "./sleepify-state"

/**
 * SLEEPIFY CONTEXT
 *
 * This is the context for the Sleepify player.
 * It provides the player functions to the rest of the application.
 *
 * it also binds the player functions to the audio element while keeping the state in sync.
 * It returns a memoized object of the player functions to prevent unnecessary re-renders.
 *
 * The useSleepify hook is used to access the player functions from the rest of the application.
 */

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
    skipDirection,
  } = state

  // initialize audio element for use in player functions
  const audio = audioRef.current

  // PLAY PAUSE TRACK FUNCTION
  const playTrack = useCallback(
    (track: AudioTrack) => {
      dispatch({ type: "SET_CURRENT_TRACK", payload: track })
      const index = currentPlaylist.findIndex(
        (t) => t.trackId === track.trackId,
      )
      // safeguard against invalid index. If the track index is not found, the index setter will not be called.
      if (index !== -1) {
        dispatch({ type: "SET_CURRENT_TRACK_INDEX", payload: index })
      }
    },
    [currentPlaylist, dispatch],
  )

  const togglePlayPause = useCallback(() => {
    if (!audio) return

    if (audio.paused) {
      audio.play()
    } else {
      audio.pause()
    }
  }, [audio])

  const playTrackFromPlaylist = useCallback(
    (
      trackId: string,
      trackUrl: string | null,
      playlist: TrackList | LikedSongs,
    ) => {
      // prevent undefined trackUrl from causing errors
      if (!trackUrl) return

      /**
       * Map playlist to AudioTrack format
       * This is necessary to:
       * - Convert snake_case to camelCase for consistency
       * - Handle non-array artist names
       * - Add optional properties like isFavorite
       */
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

      const index = audioPlaylist.findIndex(
        (track) => track.trackId === trackId,
      )

      // If track is not currently playing, start playing it
      if (currentTrack?.trackUrl !== trackUrl && index !== -1) {
        const audioTrack = audioPlaylist[index]

        // Update playlist and track info
        dispatch({ type: "SET_CURRENT_PLAYLIST", payload: audioPlaylist })
        dispatch({ type: "SET_CURRENT_TRACK_INDEX", payload: index })
        playTrack(audioTrack)
        return
      }

      // If track is already playing, toggle play/pause
      togglePlayPause()
    },
    [currentTrack, dispatch, togglePlayPause, playTrack],
  )

  // NAVIGATION FUNCTIONS
  const skipNext = useCallback(() => {
    dispatch({ type: "SET_SKIP_DIRECTION", payload: "next" })
    if (currentPlaylist.length === 0) return

    // calculate next index with modulo to prevent out of bounds errors
    // because the playlist length is dynamic, we need to use modulo
    // to wrap around to the beginning of the playlist when the end is reached
    const nextIndex = (currentTrackIndex + 1) % currentPlaylist.length

    // update state
    dispatch({ type: "SET_CURRENT_TRACK", payload: currentPlaylist[nextIndex] })
    dispatch({ type: "SET_CURRENT_TRACK_INDEX", payload: nextIndex })
  }, [currentPlaylist, currentTrackIndex, dispatch])

  // Previous Track Function
  // needs to handle cases where the current track has no audio URL
  // and needs to loop through the playlist to find a valid track to play
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
      // Developer warning NOT PRODUCTION CODE
      console.warn("No valid previous track found.")
      dispatch({ type: "SET_CURRENT_TRACK", payload: null })
    }
  }, [currentPlaylist, currentTrackIndex, dispatch])

  // SEEK TO FUNCTION
  const seekTo = useCallback(
    (time: number) => {
      if (audio) {
        audio.currentTime = time
      }
    },
    [audio],
  )

  // ADJUST VOLUME FUNCTION
  const adjustVolume = useCallback(
    (newVolume: number) => {
      const clampedVolume = Math.max(0, Math.min(1, newVolume))

      if (audio) {
        audio.volume = clampedVolume
      }

      dispatch({ type: "SET_VOLUME", payload: clampedVolume })
    },
    [audio, dispatch],
  )

  // AUDIO EFFECTS HANDLERS
  useEffect(() => {
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
  }, [audio, currentPlaylist, volume, skipNext, dispatch])

  useEffect(() => {
    if (audio && currentTrack && currentTrack.trackUrl) {
      audio.src = currentTrack.trackUrl
      audio
        .play()
        .then(() => dispatch({ type: "SET_IS_PLAYING", payload: true }))
    } else {
      skipNext()
    }
  }, [audio, currentTrack, skipDirection, skipNext, dispatch])

  const playerControls = useMemo(
    () => ({
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
    }),
    [
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
    ],
  )

  return playerControls
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
