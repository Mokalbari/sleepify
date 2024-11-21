"use client"

import HeartButton from "@/components/ui/heart-button"
import { useSleepify } from "@/context/sleepify-context"
import { useErrorPopover } from "@/hooks/useErrorPopover"
import { LikedSongs } from "@/lib/types/definitions"
import { cn } from "@/utils/helpers/style"
import { HeadphoneOff, Pause, Play } from "lucide-react"

type Props = {
  trackUrl: string | null
  trackId: string
  playlist: LikedSongs[]
}

export default function TablePlayControl({
  trackUrl,
  trackId,
  playlist,
}: Props) {
  const { currentTrack, isPlaying, playTrackFromPlaylist } = useSleepify()
  const { isPopoverOpen, openPopover } = useErrorPopover()

  return (
    <div className="flex justify-end gap-4 lg:translate-y-[75%]">
      <HeartButton
        trackId={trackId}
        isFavorite={true}
        className={cn("w-4 sm:w-5 lg:w-6")}
      />

      {trackUrl === null ? (
        <div className="relative">
          <button
            className="flex w-4 cursor-help items-center justify-center opacity-50 sm:w-5 lg:w-6"
            aria-label="Track unavailable"
            onClick={openPopover}
          >
            <HeadphoneOff />
          </button>
          {isPopoverOpen && (
            <div
              className={cn(
                "brutal absolute bottom-10 right-0 z-10 w-80 rounded-md bg-[#FFC6E7] p-4 text-center text-xs font-bold transition-opacity duration-300",
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
          onClick={() => playTrackFromPlaylist(trackId, trackUrl, playlist)}
          className="flex w-4 items-center justify-center sm:w-5 lg:w-6"
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
