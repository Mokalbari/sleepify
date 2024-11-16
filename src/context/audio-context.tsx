"use client"

import { createContext, ReactNode, useContext, useRef, useState } from "react"

type AudioTrack = {
  trackUrl: string | null
  trackName: string | null
  artistName: string | null
  previewImage: string | null
}

type AudioContextType = {
  isPlaying: boolean
  togglePlayPause: () => void
  setAudioTrack: (track: AudioTrack) => void
  currentTrack: AudioTrack | null
}

type AudioProviderProps = {
  children: ReactNode
}

const AudioContext = createContext<AudioContextType | undefined>(undefined)

export default function AudioProvider({ children }: AudioProviderProps) {
  const [currentTrack, setCurrentTrack] = useState<AudioTrack | null>({
    trackUrl: null,
    trackName: "Sleepify",
    artistName: "Choose a track and start listening",
    previewImage: null,
  })

  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const togglePlayPause = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  const setAudioTrack = (track: AudioTrack) => {
    if (!audioRef.current) return

    if (currentTrack?.trackUrl !== track.trackUrl) {
      setCurrentTrack(track)
      audioRef.current.src = track.trackUrl || ""
      audioRef.current.play()
      setIsPlaying(true)
    }
  }

  return (
    <AudioContext.Provider
      value={{
        isPlaying,
        togglePlayPause,
        setAudioTrack,
        currentTrack,
      }}
    >
      {children}
      <audio
        ref={audioRef}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
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
