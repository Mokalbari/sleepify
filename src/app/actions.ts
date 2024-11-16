"use server"

import type { TrackList } from "@/lib/types/definitions"
import { sql } from "@vercel/postgres"

const ITEMS_PER_PAGE = 10
// GET
export const getTracks = async (currentPage: number) => {
  try {
    const offset = (currentPage - 1) * ITEMS_PER_PAGE
    const { rows } = await sql<TrackList>/* SQL */ `
    SELECT 
        tracks.id AS track_id,
        tracks.name AS track_name,
        tracks.preview_url AS music_url,
        tracks.duration_ms AS track_duration,
        tracks.image_url AS track_image,
        ARRAY_AGG(artists.name) AS artist_name
    FROM tracks
    INNER JOIN 
        track_artists ON tracks.id = track_artists.track_id
    INNER JOIN 
        artists ON artists.id = track_artists.artist_id
    GROUP BY 
        tracks.id, tracks.name, tracks.preview_url, tracks.duration_ms, tracks.image_url
    LIMIT ${ITEMS_PER_PAGE}
    OFFSET ${offset}
`
    return rows
  } catch (error) {
    console.error(error)
    throw new Error("Error while fetching tracklist")
  }
}

export const getTotalPages = async () => {
  try {
    const count = await sql/* SQL */ `
    SELECT COUNT(*) FROM tracks`

    return Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE)
  } catch (error) {
    console.error("Error while getting page count", error)
    throw new Error("Failed to fetch the total number of pages.")
  }
}
