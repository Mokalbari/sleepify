"use client"

import { useAudio } from "@/context/audio-context"
import { TrackList } from "@/lib/types/definitions"
import { Bug, Pause, Play } from "lucide-react"
import HeartButton from "../../../components/ui/heart-button"

type Props = Omit<TrackList, "track_id">

export default function CardPlayControl({
  track_name: trackName,
  artist_name: artistName,
  track_image: previewImage,
  music_url: trackUrl,
  is_favorite: isFavorite,
}: Props) {
  const { currentTrack, isPlaying, setAudioTrack, togglePlayPause } = useAudio()

  const handlePlayPause = () => {
    if (!trackUrl) return
    if (currentTrack?.trackUrl !== trackUrl) {
      setAudioTrack({ trackUrl, trackName, artistName, previewImage })
    } else {
      togglePlayPause()
    }
  }

  return (
    <div className="flex gap-4">
      <HeartButton isFavorite={isFavorite} />
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
