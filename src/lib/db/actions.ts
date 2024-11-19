"use server"

import { Count, TrackList, UserInfo } from "@/lib/types/definitions"
import { sql } from "@vercel/postgres"
import { cache } from "react"

const USER_ID = "410544b2-4001-4271-9855-fec4b6a6442a"

// GET
export const getUserInfo = cache(async (id: string = USER_ID) => {
  try {
    const { rows } = await sql<UserInfo>/*SQL*/ `
        SELECT
            id,
            firstname,
            lastname,
            avatar
        FROM users
        WHERE id = ${id}
        `
    return rows[0]
  } catch (error) {
    console.error("Error while fetching user info", error)
    throw new Error("Error while fetching user infos")
  }
})

export const getLikesCount = cache(async (id: string = USER_ID) => {
  try {
    const { rows } = await sql<Count>/*SQL*/ `
      SELECT COUNT(*)::INTEGER FROM favorites WHERE user_id = ${id}
      `
    return rows[0]
  } catch (error) {
    console.error("Error while getting the count of likes:", error)
    throw new Error("Failed to fetch the total counts of likes")
  }
})

export const getTracksCount = cache(async () => {
  try {
    const { rows } = await sql<Count>/*SQL*/ `
        SELECT COUNT(*)::INTEGER FROM tracks
        `
    return rows[0]
  } catch (error) {
    console.error("Error while getting the count of tracks", error)
    throw new Error("Failed to fetch the total counts of tracks")
  }
})

export const getPlaylist = cache(async () => {
  try {
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
`
    return rows
  } catch (error) {
    console.error(error)
    throw new Error("Error while fetching tracklist")
  }
})
