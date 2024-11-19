"use client"
import { useCallback, useEffect, useRef, useState } from "react"

export type AudioTrack = {
  trackId: string
  trackUrl: string | null
  trackName: string
  artistName: string[]
  previewImage: string
}

export const useSleepifyPlayer = () => {
  const [currentTrack, setCurrentTrack] = useState<AudioTrack | null>(null)
  const [currentPlaylist, setCurrentPlaylist] = useState<AudioTrack[]>([])
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(-1)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const initializeAudioRef = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio()
    }

    if (audioRef.current) {
      const handleEnded = () => {
        if (currentPlaylist.length > 0) {
          const nextIndex = (currentTrackIndex + 1) % currentPlaylist.length
          const nextTrack = currentPlaylist[nextIndex]

          if (nextTrack && nextTrack.trackUrl && audioRef.current) {
            audioRef.current.src = nextTrack.trackUrl
            audioRef.current.play()
            setCurrentTrack(nextTrack)
            setCurrentTrackIndex(nextIndex)
          }
        }
      }

      audioRef.current.onplay = () => setIsPlaying(true)
      audioRef.current.onpause = () => setIsPlaying(false)
      audioRef.current.onended = handleEnded
    }

    return audioRef.current
  }, [
    currentPlaylist,
    currentTrackIndex,
    setCurrentTrack,
    setCurrentTrackIndex,
    setIsPlaying,
  ])

  const togglePlayPause = useCallback(() => {
    const audio = initializeAudioRef()
    if (isPlaying) {
      audio.pause()
    } else {
      audio.play()
    }
    setIsPlaying(!isPlaying)
  }, [isPlaying, initializeAudioRef])

  const setAudioTrack = useCallback(
    (track: AudioTrack) => {
      const audio = initializeAudioRef()
      if (!track.trackUrl) return

      setCurrentTrack(track)
      audio.src = track.trackUrl
      audio.play()
      setIsPlaying(true)
    },
    [initializeAudioRef],
  )

  const skipNext = useCallback(() => {
    if (currentPlaylist.length === 0) return

    const nextIndex = (currentTrackIndex + 1) % currentPlaylist.length
    const nextTrack = currentPlaylist[nextIndex]
    setAudioTrack(nextTrack)
    setCurrentTrackIndex(nextIndex)
  }, [currentTrackIndex, currentPlaylist, setAudioTrack])

  const skipPrevious = useCallback(() => {
    if (currentPlaylist.length === 0) return

    const prevIndex =
      (currentTrackIndex - 1 + currentPlaylist.length) % currentPlaylist.length
    const prevTrack = currentPlaylist[prevIndex]
    setAudioTrack(prevTrack)
    setCurrentTrackIndex(prevIndex)
  }, [currentTrackIndex, currentPlaylist, setAudioTrack])

  // Cleanup effect to remove audio event listeners
  useEffect(() => {
    const audio = audioRef.current
    return () => {
      if (audio) {
        audio.pause()
        audio.src = ""
      }
    }
  }, [])

  return {
    isPlaying,
    currentTrack,
    currentPlaylist,
    currentTrackIndex,
    setCurrentPlaylist,
    setCurrentTrackIndex,
    togglePlayPause,
    setAudioTrack,
    skipNext,
    skipPrevious,
    audioRef,
  }
}
