import type { TrackList } from "@/lib/types/definitions"
import { sql } from "@vercel/postgres"

// GET

export const getTracks = async () => {
  try {
    const { rows } = await sql<TrackList>/* SQL */ `
        SELECT 
            tracks.id AS track_id,
            tracks.name AS track_name,
            tracks.preview_url AS music_url,
            tracks.duration_ms AS track_duration,
            tracks.image_url AS track_image,
            artists.id AS artist_id,
            artists.name AS artist_name
        FROM tracks
        INNER JOIN 
            track_artists ON tracks.id = track_artists.track_id
        INNER JOIN 
            artists ON artists.id = track_artists.artist_id
        LIMIT 5
`
    return rows
  } catch (error) {
    console.error(error)
    throw new Error("Error while fetching tracklist")
  }
}
