"use client"

import { useSleepify } from "@/context/audio-context"
import { usePlaylistContext } from "@/context/playlist-context"
import { TrackList } from "@/lib/types/definitions"
import { Bug, Pause, Play } from "lucide-react"
import HeartButton from "../../../components/ui/heart-button"

type Props = Pick<TrackList, "music_url" | "is_favorite" | "track_id">

export default function CardPlayControl({
  music_url: trackUrl,
  is_favorite: isFavorite,
  track_id: trackId,
}: Props) {
  const {
    currentTrack,
    isPlaying,
    playTrack,
    togglePlayPause,
    setCurrentPlaylist,
    setCurrentTrackIndex,
  } = useSleepify()

  const { playlist } = usePlaylistContext()

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
        isFavorite: track.is_favorite,
      }))

      const index = audioPlaylist.findIndex(
        (track) => track.trackId === trackId,
      )

      if (index !== -1) {
        const audioTrack = audioPlaylist[index]

        setCurrentPlaylist(audioPlaylist)
        setCurrentTrackIndex(index)
        playTrack(audioTrack)
      }
    } else {
      togglePlayPause()
    }
  }

  return (
    <div className="flex gap-4">
      <HeartButton isFavorite={isFavorite} trackId={trackId} />
      <button
        onClick={handlePlayPause}
        disabled={!trackUrl}
        className={`flex items-center justify-center ${
          !trackUrl ? "cursor-not-allowed opacity-50" : ""
        }`}
      >
        {trackUrl === null ? (
          <Bug />
        ) : isPlaying && currentTrack?.trackUrl === trackUrl ? (
          <Pause />
        ) : (
          <Play />
        )}
      </button>
    </div>
  )
}
