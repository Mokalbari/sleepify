"use client"

import { AudioTrack, LikedSongs, TrackList } from "@/lib/types/definitions"
import { useCallback } from "react"
import { useSleepifyEffects } from "./useSleepifyEffects"
import { useSleepifyState } from "./useSleepifyState"

export const useSleepifyPlayer = (
  audioRef: React.RefObject<HTMLAudioElement>,
) => {
  /* *************** */
  /* HOOK SUPERVISOR */
  /* *************** */

  // State
  const playerState = useSleepifyState()

  // Destructure state and setters
  const {
    currentTrack,
    setCurrentTrack,
    currentPlaylist,
    setCurrentPlaylist,
    skipDirection,
    setSkipDirection,
    currentTrackIndex,
    setCurrentTrackIndex,
    isPlaying,
    setIsPlaying,
    volume,
    setVolume,
    currentTime,
    setCurrentTime,
    duration,
    setDuration,
  } = playerState

  /* ****************** */
  /* PLAYER FUNCTIONS   */
  /* ****************** */

  // Sets a track
  const playTrack = (track: AudioTrack) => {
    setCurrentTrack(track)
    const index = currentPlaylist.findIndex((t) => t.trackId === track.trackId)
    if (index !== -1) {
      setCurrentTrackIndex(index)
    }
  }

  // Skip to the next track
  const skipNext = useCallback(() => {
    setSkipDirection("next")
    if (currentPlaylist.length === 0) return

    const nextIndex = (currentTrackIndex + 1) % currentPlaylist.length

    setCurrentTrack(currentPlaylist[nextIndex])
    setCurrentTrackIndex(nextIndex)
  }, [
    currentPlaylist,
    currentTrackIndex,
    setSkipDirection,
    setCurrentTrack,
    setCurrentTrackIndex,
  ])

  // Skip to the previous track
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
  }, [
    currentPlaylist,
    currentTrackIndex,
    setSkipDirection,
    setCurrentTrack,
    setCurrentTrackIndex,
  ])

  // Sets the volume between 0 and 1
  const setAudioVolume = (newVolume: number) => {
    const clampedVolume = Math.max(0, Math.min(1, newVolume))
    setVolume(clampedVolume)
  }

  // Navigate to a specific point in the music
  const seekTo = (time: number) => {
    const audio = audioRef.current
    if (audio) {
      audio.currentTime = time
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

  // Adjust volume with slider
  const adjustVolume = (newVolume: number) => {
    const clampedVolume = Math.max(0, Math.min(1, newVolume))
    const audio = audioRef.current

    if (audio) {
      audio.volume = clampedVolume
    }

    setAudioVolume(clampedVolume)
  }

  // Play track from playlist
  const playTrackFromPlaylist = (
    trackId: string,
    trackUrl: string | null,
    playlist: TrackList[] | LikedSongs[],
  ) => {
    if (!trackUrl) return

    const audioPlaylist = playlist.map((track) => ({
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

        setCurrentPlaylist(audioPlaylist)
        setCurrentTrackIndex(index)
        playTrack(audioTrack)
      }
    } else {
      togglePlayPause()
    }
  }

  // Effect
  useSleepifyEffects({
    audioRef,
    playerState: {
      ...playerState,
      skipNext,
      skipPrevious,
    },
  })

  /*
    Returns the whole interface
    state + functions
    This integration allows the context to only call a single hook
  */
  return {
    currentTrack,
    currentPlaylist,
    currentTrackIndex,
    isPlaying,
    volume,
    currentTime,
    duration,
    skipDirection,
    // Expose setters as needed
    setCurrentTrack,
    setCurrentPlaylist,
    setCurrentTrackIndex,
    setIsPlaying,
    setAudioVolume,
    setCurrentTime,
    setDuration,
    setSkipDirection,
    // Player functions
    playTrack,
    skipNext,
    skipPrevious,
    togglePlayPause,
    seekTo,
    adjustVolume,
    playTrackFromPlaylist,
  }
}
