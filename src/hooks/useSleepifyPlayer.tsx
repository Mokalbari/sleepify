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
  const [skipDirection, setSkipDirection] = useState<"prev" | "next">("next")
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(-1)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(1)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  // The audio ref will be init in the context.
  // Do not init the ref here.
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

  /* SLEEPIFY SKIPPING FUNCTIONS */
  /*
      skipNext() allows the user to move toward the end of the playlist
      It is designed with a state keeping the direction for the useEffect down below
      It handles the next action and handles the logic if the tracks' url is null
      It has an early return if the playlist length is somehow empty (this should not happen...)
      
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
      skipPrevious() works much like skipNext()
      It is designed with a state keeping the direction for the useEffect down below
      It allows the user to skip back a track with a catch:
      The previous track url may be null and if that's the case:
      
      it keeps an internal state with the attempts var = to the playlists length
      it loops from possibles index to find an index where the track's url not null
      attempts is necessary to prevent an infinite loop.
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

  // Navigate in the track's duration
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
      audio.play().then(() => setIsPlaying(true))
    } else {
      if (skipDirection === "prev") skipPrevious()
      skipNext()
    }
  }, [currentTrack, skipDirection, skipNext, skipPrevious])

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
