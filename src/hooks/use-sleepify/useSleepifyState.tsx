"use client"

import { AudioTrack } from "@/lib/types/definitions"
import { useReducer } from "react"

// Define the shape of the player state
type PlayerState = {
  currentTrack: AudioTrack | null
  currentPlaylist: AudioTrack[]
  skipDirection: "prev" | "next"
  currentTrackIndex: number
  isPlaying: boolean
  volume: number
  currentTime: number
  duration: number
}

// Define the types of actions that can be dispatched
type Action =
  | { type: "SET_CURRENT_TRACK"; payload: AudioTrack | null }
  | { type: "SET_CURRENT_PLAYLIST"; payload: AudioTrack[] }
  | { type: "SET_SKIP_DIRECTION"; payload: "prev" | "next" }
  | { type: "SET_CURRENT_TRACK_INDEX"; payload: number }
  | { type: "SET_IS_PLAYING"; payload: boolean }
  | { type: "SET_VOLUME"; payload: number }
  | { type: "SET_CURRENT_TIME"; payload: number }
  | { type: "SET_DURATION"; payload: number }

// Initial state of the player
const initialState: PlayerState = {
  currentTrack: null,
  currentPlaylist: [],
  skipDirection: "next",
  currentTrackIndex: -1,
  isPlaying: false,
  volume: 1,
  currentTime: 0,
  duration: 0,
}

// Reducer function to manage state transitions
const reducer = (state: PlayerState, action: Action): PlayerState => {
  switch (action.type) {
    case "SET_CURRENT_TRACK":
      return { ...state, currentTrack: action.payload }
    case "SET_CURRENT_PLAYLIST":
      return { ...state, currentPlaylist: action.payload }
    case "SET_SKIP_DIRECTION":
      return { ...state, skipDirection: action.payload }
    case "SET_CURRENT_TRACK_INDEX":
      return { ...state, currentTrackIndex: action.payload }
    case "SET_IS_PLAYING":
      return { ...state, isPlaying: action.payload }
    case "SET_VOLUME":
      return { ...state, volume: action.payload }
    case "SET_CURRENT_TIME":
      return { ...state, currentTime: action.payload }
    case "SET_DURATION":
      return { ...state, duration: action.payload }
    default:
      return state
  }
}

// Hook to manage the player state
export const useSleepifyState = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return {
    state,
    dispatch,
  }
}
