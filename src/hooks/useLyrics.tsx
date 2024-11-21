import { useCallback, useState } from "react"

type LyricsData = {
  lyrics: string
  status: "loading" | "success" | "error"
}

export const useLyrics = () => {
  const [lyricsData, setLyricsData] = useState<LyricsData>({
    lyrics: "Loading lyrics...",
    status: "loading",
  })

  const fetchLyrics = useCallback(
    async (artistName: string, trackName: string) => {
      if (!artistName || !trackName) {
        setLyricsData({
          lyrics: "Choose a song to view lyrics",
          status: "error",
        })
        return
      }

      try {
        const artist = artistName.toLowerCase()
        const track = trackName.toLowerCase()
        const response = await fetch(
          `https://api.lyrics.ovh/v1/${artist}/${track}`,
          { cache: "force-cache" },
        )

        const data = await response.json()
        setLyricsData({
          lyrics: data.lyrics || "No lyrics available for this track.",
          status: "success",
        })
      } catch (error) {
        console.error("Lyrics fetch error:", error)
        setLyricsData({
          lyrics: "Failed to load lyrics. Please try again later.",
          status: "error",
        })
      }
    },
    [],
  )

  return { lyricsData, fetchLyrics }
}
