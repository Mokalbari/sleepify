"use client"

import { AudioTrack } from "@/lib/types/definitions"
import { useCallback, useState } from "react"

export const useSleepifyState = () => {
  /* ************* */
  /* STATE MANAGER */
  /* ************* */

  const [currentTrack, setCurrentTrack] = useState<AudioTrack | null>(null)
  const [currentPlaylist, setCurrentPlaylist] = useState<AudioTrack[]>([])
  const [skipDirection, setSkipDirection] = useState<"prev" | "next">("next")
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(-1)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(1)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  /* ********************** */
  /* SLEEPIFY AUDIO TOOLBOX */
  /* ********************** */

  // Sets a track
  const playTrack = (track: AudioTrack) => {
    setCurrentTrack(track)
    const index = currentPlaylist.findIndex((t) => t.trackId === track.trackId)
    if (index !== -1) {
      setCurrentTrackIndex(index)
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
    setSkipDirection("next")
    if (currentPlaylist.length === 0) return

    const nextIndex = (currentTrackIndex + 1) % currentPlaylist.length

    setCurrentTrack(currentPlaylist[nextIndex])
    setCurrentTrackIndex(nextIndex)
  }, [currentPlaylist, currentTrackIndex])

  /*
    Skips to the previous track. If the previous track's URL is null,
    it loops through the playlist to find a valid track, with a maximum
    of `playlist.length` attempts to avoid infinite loops.
  */
  const skipPrevious = useCallback(() => {
    setSkipDirection("prev")

    if (currentPlaylist.length === 0) return

    let prevIndex =
      (currentTrackIndex - 1 + currentPlaylist.length) % currentPlaylist.length

    let attempts = currentPlaylist.length
    while (currentPlaylist[prevIndex].trackUrl === null && attempts > 0) {
      prevIndex =
        (prevIndex - 1 + currentPlaylist.length) % currentPlaylist.length
      attempts--
    }

    // If a valid track is found
    if (attempts > 0) {
      setCurrentTrack(currentPlaylist[prevIndex])
      setCurrentTrackIndex(prevIndex)
    } else {
      console.warn("No valid previous track found.")
      setCurrentTrack(null)
    }
  }, [currentPlaylist, currentTrackIndex])

  /* SLEEPIFY VOLUME FUNCTION */
  // Sets the volume constraints between 0 and 1
  const setAudioVolume = (newVolume: number) => {
    const clampedVolume = Math.max(0, Math.min(1, newVolume))
    setVolume(clampedVolume)
  }

  return {
    currentTrack,
    currentPlaylist,
    currentTrackIndex,
    isPlaying,
    volume,
    currentTime,
    duration,
    setCurrentPlaylist,
    setCurrentTrackIndex,
    playTrack,
    skipNext,
    skipPrevious,
    setAudioVolume,
    setIsPlaying,
    setCurrentTime,
    setDuration,
    skipDirection,
    setSkipDirection,
  }
}
