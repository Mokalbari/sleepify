"use client"

import { UseSleepifyAudioParams } from "@/lib/types/definitions"
import { useEffect } from "react"

export const useSleepifyAudio = ({
  audioRef,
  playerState,
}: UseSleepifyAudioParams) => {
  /* *************************** */
  /* LIFECYCLE AND EVENT MANAGER */
  /* *************************** */

  // These should reflect var extracted from the state manager
  const {
    currentTrack,
    volume,
    setIsPlaying,
    setCurrentTime,
    setDuration,
    currentPlaylist,
    skipNext,
    skipPrevious,
    skipDirection,
  } = playerState

  /*
    This effect manages the core feature of Sleepify
    It binds event listeners to the core states defined in the state manager
    It also ensures the volume is always in sync with the state.
  */
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime)
    const handleLoadedMetadata = () => setDuration(audio.duration)
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

    // Cleanup f()
    return () => {
      audio.removeEventListener("play", handlePlay)
      audio.removeEventListener("pause", handlePause)
      audio.removeEventListener("timeupdate", handleTimeUpdate)
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata)
      audio.removeEventListener("ended", handleEnded)
    }
  }, [
    audioRef,
    currentPlaylist,
    volume,
    skipNext,
    setIsPlaying,
    setCurrentTime,
    setDuration,
  ])

  /*
    This effect manages the audio source update
    Like it's parent feature, it keeps the state in sync with events
    It ensures that each tracks keeps flowing depending on the direction state
  */
  useEffect(() => {
    const audio = audioRef.current
    if (audio && currentTrack && currentTrack.trackUrl) {
      audio.src = currentTrack.trackUrl
      audio.play().then(() => setIsPlaying(true))
    } else {
      if (skipDirection === "prev") {
        skipPrevious()
      } else {
        skipNext()
      }
    }
  }, [
    audioRef,
    currentTrack,
    skipDirection,
    skipNext,
    skipPrevious,
    setIsPlaying,
  ])
}
