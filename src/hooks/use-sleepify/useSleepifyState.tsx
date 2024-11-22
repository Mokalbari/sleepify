"use client"

import { AudioTrack } from "@/lib/types/definitions"
import { useState } from "react"

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

  return {
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
  }
}
