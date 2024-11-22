"use client"

import { PlayerStateWithActions } from "@/lib/types/definitions"
import { RefObject, useEffect } from "react"

// Define the types of actions and player state
type UseSleepifyEffectsParams = {
  audioRef: RefObject<HTMLAudioElement>
  playerState: PlayerStateWithActions
}

export const useSleepifyEffects = ({
  audioRef,
  playerState,
}: UseSleepifyEffectsParams) => {
  const { state, dispatch, skipNext, skipPrevious } = playerState

  const { currentTrack, volume, currentPlaylist, skipDirection } = state

  /* *************************** */
  /* LIFECYCLE AND EVENT MANAGER */
  /* *************************** */

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

    // Cleanup
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
      if (skipDirection === "prev") {
        skipPrevious()
      } else {
        skipNext()
      }
    }
  }, [audioRef, currentTrack, skipDirection, skipNext, skipPrevious, dispatch])
}
