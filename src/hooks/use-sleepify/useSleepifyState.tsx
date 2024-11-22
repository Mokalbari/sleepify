"use client"

import type { Action, PlayerState } from "@/lib/types/definitions"
import { useReducer } from "react"

/**
 * STATE MANAGER -- useSleepifyState
 * This hook is the backbone state management system of Sleepify.
 * it maintains every states related to music the music player.
 *
 * This keeps track of: tracks (eh.), playlist, volume, duration...
 * It's easily scalable thanks to the React useReducer.
 *
 * A hook is exported to dispatch the initialState and the reducer
 */

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

export const useSleepifyState = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return {
    state,
    dispatch,
  }
}
