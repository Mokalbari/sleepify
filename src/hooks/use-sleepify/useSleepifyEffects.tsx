"use client"

import { PlayerStateWithActions } from "@/lib/types/definitions"
import { RefObject, useEffect } from "react"

/**
 * EFFECTS AND LIFECYCLE MANAGER - useSleepifyEffects
 * This hook manages the event handling of sleepify.
 * It binds event listeners to the states defined in the state manager.
 *
 * It ensures that state changes in the player (like currentTrack, volume, skipDirection)
 * are reflected in the audio element and vice versa.
 */

type Props = {
  audioRef: RefObject<HTMLAudioElement>
  playerState: PlayerStateWithActions
}

export const useSleepifyEffects = ({ audioRef, playerState }: Props) => {
  // These reflects the state from the state manager.
  const { state, dispatch, skipNext } = playerState
  const { currentTrack, volume, currentPlaylist, skipDirection } = state

  // This useEffect binds utils functions to event listeners
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

    // cleanup func
    return () => {
      audio.removeEventListener("play", handlePlay)
      audio.removeEventListener("pause", handlePause)
      audio.removeEventListener("timeupdate", handleTimeUpdate)
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata)
      audio.removeEventListener("ended", handleEnded)
    }
  }, [audioRef, currentPlaylist, volume, skipNext, dispatch])

  // Updates the audio source and triggers playback when the current track changes
  // handle edge case like if the track url is empty.
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
  }, [audioRef, currentTrack, skipDirection, skipNext, dispatch])
}
