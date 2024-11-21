"use client"

import { usePlaylistContext } from "@/context/playlist-context"
import { useSleepify } from "@/context/sleepify-context"
import { TrackList } from "@/lib/types/definitions"
import { Bug, Pause, Play } from "lucide-react"
import HeartButton from "../../../components/ui/heart-button"

type Props = Pick<TrackList, "music_url" | "is_favorite" | "track_id">

export default function CardPlayControl({
  music_url: trackUrl,
  is_favorite: isFavorite,
  track_id: trackId,
}: Props) {
  const { currentTrack, isPlaying, playTrackFromPlaylist } = useSleepify()

  const { playlist } = usePlaylistContext()

  return (
    <div className="flex gap-4">
      <HeartButton isFavorite={isFavorite} trackId={trackId} />
      <button
        onClick={() => playTrackFromPlaylist(trackId, trackUrl, playlist)}
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
