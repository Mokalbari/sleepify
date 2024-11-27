"use client"

import { useFullPlayer } from "@/context/full-player/use-full-player"
import { useSleepify } from "@/context/sleepify/use-sleepify"
import Image from "next/image"

export default function PlayerTrack() {
  const { currentTrack } = useSleepify()
  const { handleFullPlayerVisibility } = useFullPlayer()

  const trackName = currentTrack?.trackName
  const artistsNames = currentTrack?.artistName.join(", ")

  return (
    <div
      role="button"
      tabIndex={0}
      className="flex items-center gap-4 sm:ml-8 lg:ml-16"
      onClick={handleFullPlayerVisibility}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault()
          handleFullPlayerVisibility()
        }
      }}
      aria-label={`Open full player for ${trackName} by ${artistsNames}`}
    >
      <div className="brutal w-14 rounded-md sm:w-16">
        <Image
          src={currentTrack?.previewImage || "/cover-album_placeholder.webp"}
          width={650}
          height={650}
          alt={`Cover album ${trackName}`}
          style={{ borderRadius: "6px" }}
        />
      </div>
      <div>
        <div className="flex">
          <div className="text-xs font-bold sm:text-base lg:text-sm">
            {trackName}
          </div>
        </div>
        <div className="text-2xs sm:text-xs">{artistsNames}</div>
      </div>
    </div>
  )
}
