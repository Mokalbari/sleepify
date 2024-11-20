import { useCallback, useEffect, useRef, useState } from "react"

export type AudioTrack = {
  trackId: string
  trackUrl: string | null
  trackName: string
  artistName: string[]
  previewImage: string
  isFavorite?: boolean
}

export const useSleepifyPlayer = () => {
  /* ************* */
  /* STATE MANAGER */
  /* ************* */

  const [currentTrack, setCurrentTrack] = useState<AudioTrack | null>(null)
  const [currentPlaylist, setCurrentPlaylist] = useState<AudioTrack[]>([])
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(-1)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(1)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  const audioRef = useRef<HTMLAudioElement | null>(null)

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

  // Depending on the playlist and current track index
  // Allows to get to the next / previous track index
  const skipNext = useCallback(() => {
    if (currentPlaylist.length === 0) return
    const nextIndex = (currentTrackIndex + 1) % currentPlaylist.length
    setCurrentTrack(currentPlaylist[nextIndex])
    setCurrentTrackIndex(nextIndex)
  }, [currentPlaylist, currentTrackIndex])

  const skipPrevious = () => {
    if (currentPlaylist.length === 0) return
    const prevIndex =
      (currentTrackIndex - 1 + currentPlaylist.length) % currentPlaylist.length
    setCurrentTrack(currentPlaylist[prevIndex])
    setCurrentTrackIndex(prevIndex)
  }

  // Navigate in the track's dureation
  const seekTo = (time: number) => {
    const audio = audioRef.current
    if (audio) {
      audio.currentTime = time
    }
  }

  // Sets the volume constraints between 0 and 1
  const setAudioVolume = (newVolume: number) => {
    const clampedVolume = Math.max(0, Math.min(1, newVolume))
    const audio = audioRef.current

    if (audio) {
      audio.volume = clampedVolume
      setVolume(clampedVolume)
    }
  }

  // Toggles between play and pause states for the current track
  const togglePlayPause = () => {
    const audio = audioRef.current
    if (!audio) return

    if (audio.paused) {
      audio.play()
    } else {
      audio.pause()
    }
  }

  /* ********************************* */
  /* LIFECYCLE AND SIDE EFFECT MANAGER */
  /* ********************************* */

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

    // Set initial volume
    audio.volume = volume

    return () => {
      audio.removeEventListener("play", handlePlay)
      audio.removeEventListener("pause", handlePause)
      audio.removeEventListener("timeupdate", handleTimeUpdate)
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata)
      audio.removeEventListener("ended", handleEnded)
    }
  }, [currentPlaylist, volume, skipNext])

  // Update audio source when currentTrack changes
  useEffect(() => {
    const audio = audioRef.current
    if (audio && currentTrack && currentTrack.trackUrl) {
      audio.src = currentTrack.trackUrl
      audio.play()
    }
  }, [currentTrack])

  return {
    isPlaying,
    currentTrack,
    currentPlaylist,
    currentTrackIndex,
    setCurrentPlaylist,
    setCurrentTrackIndex,
    togglePlayPause,
    playTrack,
    skipNext,
    skipPrevious,
    seekTo,
    audioRef,
    currentTime,
    duration,
    volume,
    setAudioVolume,
  }
}
