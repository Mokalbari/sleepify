"use client"

import HeartButton from "@/components/ui/heart-button"
import { usePlaylistContext } from "@/context/playlist/use-playlist-context"
import { useSleepify } from "@/context/sleepify/use-sleepify"
import { useErrorPopover } from "@/hooks/useErrorPopover"
import { Track } from "@/lib/types/definitions"
import "@/styles/animations.css"
import { cn } from "@/utils/helpers/style"
import { HeadphoneOff, Pause, Play } from "lucide-react"

type Props = Pick<Track, "music_url" | "is_favorite" | "track_id">

export default function CardPlayControl({
  music_url: trackUrl,
  is_favorite: isFavorite,
  track_id: trackId,
}: Props) {
  const { currentTrack, isPlaying, playTrackFromPlaylist } = useSleepify()
  const { playlist } = usePlaylistContext()
  const { isPopoverOpen, openPopover } = useErrorPopover()

  const isATrackPlaying = isPlaying && currentTrack?.trackUrl === trackUrl

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
            <HeadphoneOff className="wiggle" />
          </button>
          {isPopoverOpen && (
            <div
              className={cn(
                "brutal absolute bottom-10 right-0 z-10 w-80 rounded-md bg-[#FFC6E7] p-4 text-xs font-bold transition-opacity duration-300",
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
          aria-label={isATrackPlaying ? "Pause track" : "Play track"}
        >
          {isATrackPlaying ? <Pause /> : <Play className="play" />}
        </button>
      )}
    </div>
  )
}
