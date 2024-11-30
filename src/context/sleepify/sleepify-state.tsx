import { Action, PlayerState } from "@/lib/types/definitions"

/**
 * STATE MANAGEMENT
 *
 * This is the state management for the Sleepify player.
 * It is used to manage the state of the player, such as the current track, playlist, and playback controls.
 *
 * The reducer function is used to update the state based on the action type.
 * The initial state is the default state of the player.
 *
 * Both of these are used inside a useReducer hook in the useSleepifyPlayer hook.
 */
export const initialState: PlayerState = {
  currentTrack: null,
  currentPlaylist: [],
  skipDirection: "next",
  currentTrackIndex: -1,
  isPlaying: false,
  volume: 1,
  currentTime: 0,
  duration: 0,
}

export const reducer = (state: PlayerState, action: Action): PlayerState => {
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
