"use client"
import { useQuery } from "@tanstack/react-query"

const fetchLyrics = async (
  artistName: string,
  trackName: string,
): Promise<string> => {
  if (!artistName || !trackName) {
    throw new Error("Choose a song to view lyrics")
  }

  const response = await fetch(
    `https://api.lyrics.ovh/v1/${artistName.toLowerCase()}/${trackName.toLowerCase()}`,
    { cache: "force-cache" },
  )

  if (!response.ok) {
    throw new Error("Failed to load lyrics. Please try again later.")
  }

  const data = await response.json()
  return data.lyrics || "No lyrics available for this track."
}

export const useLyrics = (artistName: string, trackName: string) => {
  return useQuery({
    queryKey: ["lyrics", artistName, trackName],
    queryFn: () => fetchLyrics(artistName, trackName),
    enabled: !!artistName && !!trackName,
  })
}
