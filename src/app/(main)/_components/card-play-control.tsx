"use client"

import { usePlaylistContext } from "@/context/playlist-context"
import { useSleepify } from "@/context/sleepify-context"
import { useErrorPopover } from "@/hooks/useErrorPopover"
import { TrackList } from "@/lib/types/definitions"
import { cn } from "@/utils/helpers/style"
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
  const { isPopoverOpen, openPopover } = useErrorPopover()

  return (
    <div className="flex gap-4">
      <HeartButton isFavorite={isFavorite} trackId={trackId} />

      {trackUrl === null ? (
        <div className="relative">
          <button
            className="flex cursor-help items-center justify-center opacity-50"
            aria-label="Track unavailable"
            onClick={openPopover}
          >
            <Bug />
          </button>
          {isPopoverOpen && (
            <div
              className={cn(
                "brutal absolute bottom-10 right-0 z-10 w-80 rounded-md bg-deepBlue p-4 text-xs font-bold text-white transition-opacity duration-300",
                "lg:text-base",
                {
                  "opacity-100": isPopoverOpen,
                  "pointer-events-none opacity-0": !isPopoverOpen,
                },
              )}
              role="tooltip"
            >
              Oops! Seems like this track is missing. We&apos;re on it!
            </div>
          )}
        </div>
      ) : (
        <button
          onClick={() => {
            playTrackFromPlaylist(trackId, trackUrl, playlist)
          }}
          className="flex items-center justify-center"
          aria-label={
            isPlaying && currentTrack?.trackUrl === trackUrl
              ? "Pause track"
              : "Play track"
          }
        >
          {isPlaying && currentTrack?.trackUrl === trackUrl ? (
            <Pause />
          ) : (
            <Play />
          )}
        </button>
      )}
    </div>
  )
}
