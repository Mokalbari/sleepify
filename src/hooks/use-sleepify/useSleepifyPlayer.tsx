import { LikedSongs, TrackList } from "@/lib/types/definitions"
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
    Those asbtractions are here so that future components do not need
    to handle low level logic like play pause functions

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

  // If the selected track !== current trac, the playlist is updated
  // it sets the current track and index and starts playback
  // but if the selected track is already active, it juste uses the toggle play pause f()
  const playTrackFromPlaylist = (
    trackId: string,
    trackUrl: string | null,
    playlist: TrackList[] | LikedSongs[],
  ) => {
    if (!trackUrl) return

    const audioPlaylist = playlist.map((track) => ({
      trackId: track.track_id,
      trackUrl: track.music_url,
      trackName: track.track_name,
      artistName: Array.isArray(track.artist_name)
        ? track.artist_name
        : [track.artist_name],
      previewImage: track.track_image,
      isFavorite: "is_favorite" in track ? track.is_favorite : false,
    }))

    const index = audioPlaylist.findIndex((track) => track.trackId === trackId)

    if (playerState.currentTrack?.trackUrl !== trackUrl) {
      if (index !== -1) {
        const audioTrack = audioPlaylist[index]

        playerState.setCurrentPlaylist(audioPlaylist)
        playerState.setCurrentTrackIndex(index)
        playerState.playTrack(audioTrack)
      }
    } else {
      togglePlayPause()
    }
  }

  /*
    Returns the whole interface
    state + effect + toolbox
    This integration allows the context to only call a single hook
  */
  return {
    ...playerState,
    togglePlayPause,
    seekTo,
    setAudioVolume,
    playTrackFromPlaylist,
  }
}
