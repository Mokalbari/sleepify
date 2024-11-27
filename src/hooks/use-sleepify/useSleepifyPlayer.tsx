"use client"

import { AudioTrack, LikedSongs, TrackList } from "@/lib/types/definitions"
import { useCallback } from "react"
import { useSleepifyEffects } from "./useSleepifyEffects"
import { useSleepifyState } from "./useSleepifyState"

/**
 * *****************
 * PLAYER HOOK - useSleepifyPlayer
 * *****************
 *
 * This hook encapsulates all the core player logic of Sleepify.
 * It integrates state management + effect management
 * It also provides a toolbox used to interact with the music.
 *
 * It's main goal is to simplify the interaction with the state and effects
 * by dispatching some utils function and by returning an interface to the context.
 * Those asbtractions are here so that future components do not need
 * to handle low level logic like play pause functions
 */

export const useSleepifyPlayer = (
  audioRef: React.RefObject<HTMLAudioElement>,
) => {
  /**
   * **********
   * STATE INIT
   * **********
   *
   * Extracting getter from the state
   */
  const { state, dispatch } = useSleepifyState()
  const {
    currentTrack,
    currentPlaylist,
    currentTrackIndex,
    isPlaying,
    volume,
    currentTime,
    duration,
  } = state

  /**
   * *******
   * TOOLBOX
   * *******
   */

  /* SLEEPIFY PLAYING FUNCTIONS */
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
    playlist: TrackList[] | LikedSongs[],
  ) => {
    if (!trackUrl) return

    const audioPlaylist: AudioTrack[] = playlist.map((track) => ({
      trackId: track.track_id,
      trackUrl: track.music_url,
      trackName: track.track_name,
      artistName: Array.isArray(track.artist_name)
        ? track.artist_name
        : [track.artist_name],
      previewImage: track.track_image,
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

  /* SLEEPIFY SKIPPING FUNCTIONS */
  /*
      skipNext() allows the user to move toward the end of the playlist
      It is designed with a state keeping the direction. It will later be used in useSleepifyAudio hook
      It handles the next action and handles the logic if the tracks' url is null
      It has an early return if the playlist length is somehow empty (this should not happen, it's a failsafe)
      
      The next index is calculated with a modulo, keeping the range between 0 and -1
        (Without this the index would go crazy when getting to last index)
        for ex in a 5 tracks playlist (0,1,2,3,4)
          nextIndex = (4 + 1) % 5;
          nextIndex = 5 % 5;
          nextIndex = 0;
  */
  const skipNext = useCallback(() => {
    dispatch({ type: "SET_SKIP_DIRECTION", payload: "next" })
    if (currentPlaylist.length === 0) return

    const nextIndex = (currentTrackIndex + 1) % currentPlaylist.length

    dispatch({ type: "SET_CURRENT_TRACK", payload: currentPlaylist[nextIndex] })
    dispatch({ type: "SET_CURRENT_TRACK_INDEX", payload: nextIndex })
  }, [currentPlaylist, currentTrackIndex, dispatch])

  /*
    Skips to the previous track. If the previous track's URL is null,
    it loops through the playlist to find a valid track, with a maximum
    of `playlist.length` attempts to avoid infinite loops.
  */
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

  /* SLEEPIFY MUSIC REAL-TIME NAVIGATION */
  const seekTo = (time: number) => {
    const audio = audioRef.current
    if (audio) {
      audio.currentTime = time
    }
  }

  /* SLEEPIFY VOLUME FUNCTION */
  const adjustVolume = (newVolume: number) => {
    const clampedVolume = Math.max(0, Math.min(1, newVolume))
    const audio = audioRef.current

    if (audio) {
      audio.volume = clampedVolume
    }

    dispatch({ type: "SET_VOLUME", payload: clampedVolume })
  }

  /**
   * **********
   * EFFECT INIT
   * **********
   *
   * Binding the player functions to the DOM events and state
   */
  useSleepifyEffects({
    audioRef,
    playerState: {
      state,
      dispatch,
      skipNext,
      skipPrevious,
    },
  })

  /*
    Exposes part of the state and utils functions
    This integration allows the context to only call a single hook
    while maintaining intern functions private
  */
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
