"use client"
import { useAudio } from "@/context/audio-context"
import { useFullPlayer } from "@/context/full-player-context"
import { cn } from "@/helpers/style"
import { CircleX } from "lucide-react"
import { useEffect, useState } from "react"
import Lyrics from "./lyrics"
import SleepifyFSPlayer from "./sleepify-fs-player"

export default function LyricsPlayer() {
  const { isOpen, handleFullPlayerVisibility } = useFullPlayer()
  const { currentTrack } = useAudio()
  const [lyrics, setLyrics] = useState("Loading lyrics...")

  useEffect(() => {
    const fetchLyrics = async () => {
      if (currentTrack?.artistName && currentTrack?.trackName) {
        try {
          const response = await fetch(
            `https://api.lyrics.ovh/v1/${currentTrack.artistName[0].toLowerCase()}/${currentTrack.trackName.toLowerCase()}`,
          )
          const data = await response.json()
          setLyrics(
            data.lyrics ||
              "Sorry!\r\nSeems like there's not lyrics for this song.\r\nPerhaps try inventing them?",
          )
        } catch (error) {
          console.error(error)
          setLyrics("Failed to load lyrics.")
        }
      }
    }

    fetchLyrics()
  }, [currentTrack])

  if (!isOpen) return null

  return (
    <>
      <div
        className={cn(
          "fixed top-0 z-10 h-screen w-full overflow-auto bg-lightBlue",
          "sm:px-8",
          "lg:flex lg:justify-center lg:gap-32 lg:pt-16",
        )}
      >
        <div className="sm:max-lg:hidden">
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
            <button onClick={handleFullPlayerVisibility}>
              <CircleX />
            </button>
          </div>
          <pre className="mt-10 overflow-auto py-8 lg:m-0">{lyrics}</pre>
        </div>
      </div>
      <Lyrics lyrics={lyrics} />
    </>
  )
}
