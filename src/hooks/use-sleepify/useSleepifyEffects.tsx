"use client"

import { UseSleepifyAudioParams } from "@/lib/types/definitions"
import { useEffect } from "react"

export const useSleepifyEffects = ({
  audioRef,
  playerState,
}: UseSleepifyAudioParams) => {
  /* *************************** */
  /* LIFECYCLE AND EVENT MANAGER */
  /* *************************** */

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

    // Cleanup
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
