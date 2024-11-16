"use client"

import { useAudio } from "@/context/audio-context"
import Image from "next/image"
import cover from "../../../public/cover-album_placeholder.webp"
import HeartButton from "./heart-button"

export default function PlayerTrack() {
  const { currentTrack } = useAudio()
  return (
    <div className="flex items-center gap-4 sm:ml-16">
      <div className="brutal w-14 rounded-md sm:w-16">
        <Image
          src={currentTrack?.previewImage || cover}
          width={650}
          height={650}
          alt="cover album"
          style={{ borderRadius: "6px" }}
        />
      </div>
      <div>
        <div className="flex">
          <div className="font-bold sm:text-sm">{currentTrack?.trackName}</div>
          <HeartButton isFavorite={false} className="ml-8 max-sm:hidden" />
        </div>
        <div className="text-xs sm:text-base">{currentTrack?.artistName}</div>
      </div>
    </div>
  )
}
