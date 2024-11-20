"use client"
import { useAudio } from "@/context/audio-context"
import { CircleX } from "lucide-react"
import SleepifyFSPlayer from "./sleepify-fs-player"

export default function LyricsPlayer() {
  const { currentTrack } = useAudio()
  return (
    <div className="fixed top-0 z-10 h-screen w-full overflow-auto bg-lightBlue lg:flex lg:justify-center lg:gap-16 lg:pt-16">
      <div className="sm-max-lg:hidden">
        <SleepifyFSPlayer />
      </div>
      <div className="ml-5 mt-10 max-w-[45ch] max-sm:hidden lg:m-0">
        <div className="flex items-center justify-between lg:hidden">
          <div className="flex flex-col">
            <h3 className="text-md font-bold">
              {currentTrack?.trackName || "Choose a song"}
            </h3>
            <div className="">
              {currentTrack?.artistName.join("") || "Choose a song"}
            </div>
          </div>
          <CircleX />
        </div>
        <p className="mt-10 lg:m-0">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Error rerum
          temporibus delectus iure possimus. Animi laudantium, totam enim
          debitis ab dicta. Beatae voluptate ipsam officiis quo harum vero
          repellat suscipit rem amet, nam, et voluptatum. Pariatur accusantium
          illum inventore placeatt. Lorem ipsum dolor, sit amet consectetur
          adipisicing elit. Error rerum temporibus delectus iure possimus. Animi
          laudantium, totam enim debitis ab dicta. Beatae voluptate ipsam
          officiis quo harum vero repellat suscipit rem amet, nam, et
          voluptatum. Pariatur accusantium illum inventore placeatt.
        </p>
      </div>
    </div>
  )
}
