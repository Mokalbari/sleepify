"use client"

import HeartButton from "@/components/ui/heart-button"
import { useAudio } from "@/context/audio-context"
import { cn } from "@/helpers/style"
import { LikedSongs } from "@/lib/types/definitions"
import { Bug, Pause, Play } from "lucide-react"

type Props = {
  trackUrl: string
  trackId: string
  playlist: LikedSongs[]
}

export default function TablePlayControl({
  trackUrl,
  trackId,
  playlist,
}: Props) {
  const {
    currentTrack,
    isPlaying,
    playTrack,
    togglePlayPause,
    setCurrentPlaylist,
    setCurrentTrackIndex,
  } = useAudio()

  const handlePlayPause = () => {
    if (!trackUrl) return

    if (currentTrack?.trackUrl !== trackUrl) {
      const audioPlaylist = playlist.map((track) => ({
        trackId: track.track_id,
        trackUrl: track.music_url,
        trackName: track.track_name,
        artistName: Array.isArray(track.artist_name)
          ? track.artist_name
          : [track.artist_name],
        previewImage: track.track_image,
      }))

      const index = audioPlaylist.findIndex(
        (track) => track.trackId === trackId,
      )

      if (index !== -1) {
        const audioTrack = audioPlaylist[index]

        setCurrentPlaylist(audioPlaylist)
        setCurrentTrackIndex(index)
        playTrack(audioTrack)
      } else {
        console.error("La piste n'a pas été trouvée dans la playlist.")
      }
    } else {
      togglePlayPause()
    }
  }

  return (
    <>
      <div className="flex justify-end gap-4">
        <HeartButton
          trackId={trackId}
          isFavorite={true}
          className={cn("w-4 sm:w-5 lg:w-6")}
        />

        <button onClick={handlePlayPause}>
          {currentTrack?.trackUrl === null ? (
            <Bug />
          ) : isPlaying && currentTrack?.trackUrl === trackUrl ? (
            <Pause />
          ) : (
            <Play />
          )}
        </button>
      </div>
    </>
  )
}
