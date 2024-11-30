"use server"

import { ITEMS_PER_PAGE, USER_ID } from "@/lib/constants"
import { PaginationSchema, TrackSchema } from "@/lib/schema/definitions"
import type { TrackList } from "@/lib/types/definitions"
import { sql } from "@vercel/postgres"
import { cache } from "react"

/**
 * GET req -- Tracks
 * Retrieving from db the tracks and artists associated.
 * if multiple are found for the same tracks, it is returned as an array
 * Also checks if the track is from the favorite.
 *
 * It adopts the constant limit / page with an offset for the pagination system.
 */
export const getTracks = cache(
  async (currentPage: number): Promise<TrackList> => {
    try {
      // Runtime validation for the page and setting the offset values
      const page = PaginationSchema.parse(currentPage)
      const offset = (page - 1) * ITEMS_PER_PAGE

      // SQL Query
      const { rows } = await sql<TrackList>/* SQL */ `
    SELECT 
        tracks.id AS track_id,
        tracks.name AS track_name,
        tracks.preview_url AS music_url,
        tracks.duration_ms AS track_duration,
        tracks.image_url AS track_image,
        ARRAY_AGG(artists.name) AS artist_name,
        EXISTS (
          SELECT 1
          FROM favorites
          WHERE favorites.track_id = tracks.id
          AND favorites.user_id = ${USER_ID}
        ) AS is_favorite
    FROM tracks
    INNER JOIN 
        track_artists ON tracks.id = track_artists.track_id
    INNER JOIN 
        artists ON artists.id = track_artists.artist_id
    GROUP BY 
        tracks.id, tracks.name, tracks.preview_url, tracks.duration_ms, tracks.image_url 
    ORDER BY track_id ASC
    LIMIT ${ITEMS_PER_PAGE}
    OFFSET ${offset}
`
      // Zod parsing data before returning it
      const validatedData = rows.map((row) => TrackSchema.parse(row))
      return validatedData
      // return TrackListSchema.parse(rows)
    } catch (error) {
      console.error(error)
      throw new Error("Error while fetching tracklist")
    }
  },
)

/**
 * GET req -- Count page
 * base on the nb of items per page, it returns the total of pages available
 */
export const getTotalPages = cache(async (): Promise<number> => {
  try {
    const count = await sql/* SQL */ `
    SELECT COUNT(*) FROM tracks`

    return Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE)
  } catch (error) {
    console.error("Error while getting page count", error)
    throw new Error("Failed to fetch the total number of pages.")
  }
})
