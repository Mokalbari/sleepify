import { useSleepifyAudio } from "./useSleepifyAudio"
import { useSleepifyState } from "./useSleepifyState"

export const useSleepifyPlayer = (
  audioRef: React.RefObject<HTMLAudioElement>,
) => {
  /* *************** */
  /* HOOK SUPERVISOR */
  /* *************** */

  /*
    This hook unites the two subhooks : useSleepifyAudio and useSleepifyState
    it binds together the state and the effects and provides additionals functions
    Those asbtractions are here so that future components do not need to handle low level logic like play pause

    Note: the audio ref is not defined here but in the context calling this hook.
  */

  // state
  const playerState = useSleepifyState()

  // effect
  useSleepifyAudio({ audioRef, playerState })

  /* ****************** */
  /* SUPERVISOR TOOLBOX */
  /* ****************** */

  // navigate to a specific point in the music
  // used in combination with a slider
  const seekTo = (time: number) => {
    const audio = audioRef.current
    if (audio) {
      audio.currentTime = time
    }
  }

  // play pause logic
  const togglePlayPause = () => {
    const audio = audioRef.current
    if (!audio) return

    if (audio.paused) {
      audio.play()
    } else {
      audio.pause()
    }
  }

  // set the volume to a specific point between 0 and 1
  // used with a slider component
  const setAudioVolume = (newVolume: number) => {
    const clampedVolume = Math.max(0, Math.min(1, newVolume))
    const audio = audioRef.current

    if (audio) {
      audio.volume = clampedVolume
    }

    playerState.setAudioVolume(clampedVolume)
  }

  /*
    Returns the whole interface
    As mentionned, it combines the state and the effect + the toolbox
    This integration allows the context to only call a single hook
  */
  return {
    ...playerState,
    togglePlayPause,
    seekTo,
    setAudioVolume,
  }
}
