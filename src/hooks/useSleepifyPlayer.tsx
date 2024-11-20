import { useSleepifyAudio } from "./useSleepifyDependencies/useSleepifyAudio"
import { useSleepifyState } from "./useSleepifyDependencies/useSleepifyState"

export const useSleepifyPlayer = (
  audioRef: React.RefObject<HTMLAudioElement>,
) => {
  const playerState = useSleepifyState()

  useSleepifyAudio({ audioRef, playerState })

  const seekTo = (time: number) => {
    const audio = audioRef.current
    if (audio) {
      audio.currentTime = time
    }
  }

  const togglePlayPause = () => {
    const audio = audioRef.current
    if (!audio) return

    if (audio.paused) {
      audio.play()
    } else {
      audio.pause()
    }
  }

  const setAudioVolume = (newVolume: number) => {
    const clampedVolume = Math.max(0, Math.min(1, newVolume))
    const audio = audioRef.current

    if (audio) {
      audio.volume = clampedVolume
    }

    playerState.setAudioVolume(clampedVolume)
  }

  return {
    ...playerState,
    togglePlayPause,
    seekTo,
    setAudioVolume,
  }
}
