"use client"
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react"

export type AudioTrack = {
  trackId: string
  trackUrl: string | null
  trackName: string
  artistName: string[]
  previewImage: string
}

type AudioContextType = {
  isPlaying: boolean
  currentTrack: AudioTrack | null
  currentPlaylist: AudioTrack[]
  currentTrackIndex: number
  togglePlayPause: () => void
  setAudioTrack: (track: AudioTrack) => void
  skipNext: () => void
  skipPrevious: () => void
  setCurrentPlaylist: (playlist: AudioTrack[]) => void
  setCurrentTrackIndex: (index: number) => void
}

type AudioProviderProps = {
  children: ReactNode
}

const AudioContext = createContext<AudioContextType | undefined>(undefined)

export default function AudioProvider({ children }: AudioProviderProps) {
  const [currentTrack, setCurrentTrack] = useState<AudioTrack | null>(null)
  const [currentPlaylist, setCurrentPlaylist] = useState<AudioTrack[]>([])
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(-1)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const togglePlayPause = useCallback(() => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }, [isPlaying])

  const setAudioTrack = useCallback((track: AudioTrack) => {
    if (!audioRef.current || !track.trackUrl) return

    setCurrentTrack(track)
    audioRef.current.src = track.trackUrl
    audioRef.current.play()
    setIsPlaying(true)
  }, [])

  const skipNext = useCallback(() => {
    if (!audioRef.current || currentPlaylist.length === 0) return

    const nextIndex = (currentTrackIndex + 1) % currentPlaylist.length
    const nextTrack = currentPlaylist[nextIndex]

    setAudioTrack(nextTrack)
    setCurrentTrackIndex(nextIndex)
  }, [currentTrackIndex, currentPlaylist, setAudioTrack])

  const skipPrevious = useCallback(() => {
    if (!audioRef.current || currentPlaylist.length === 0) return

    const prevIndex =
      (currentTrackIndex - 1 + currentPlaylist.length) % currentPlaylist.length
    const prevTrack = currentPlaylist[prevIndex]

    setAudioTrack(prevTrack)
    setCurrentTrackIndex(prevIndex)
  }, [currentTrackIndex, currentPlaylist, setAudioTrack])

  // Auto-play next track when current track ends
  useEffect(() => {
    const audioElement = audioRef.current

    const handleEnded = () => {
      skipNext()
    }

    if (audioElement) {
      audioElement.addEventListener("ended", handleEnded)
      return () => {
        audioElement.removeEventListener("ended", handleEnded)
      }
    }
  }, [skipNext])

  return (
    <AudioContext.Provider
      value={{
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
      }}
    >
      {children}
      <audio
        ref={audioRef}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
    </AudioContext.Provider>
  )
}

export const useAudio = () => {
  const context = useContext(AudioContext)
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider")
  }
  return context
}
