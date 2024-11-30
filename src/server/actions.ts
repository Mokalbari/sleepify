"use server"

import { USER_ID } from "@/lib/constants"
import {
  CountSchema,
  TrackListSchema,
  UserInfoSchema,
} from "@/lib/schema/definitions"
import { Count, TrackList, UserInfo } from "@/lib/types/definitions"
import { sql } from "@vercel/postgres"
import { revalidatePath } from "next/cache"
import { cache } from "react"
import { z } from "zod"

/**
 * GET req -- No context
 * These are a collection of requests that are used in the app
 * They are cached with react.cache()
 *
 * They are not dependent on a specific page context but can be used anywhere in the app
 */
export const getUserInfo = cache(
  async (id: string = USER_ID): Promise<UserInfo> => {
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
      return UserInfoSchema.parse(rows[0])
    } catch (error) {
      console.error("Error while fetching user info", error)
      throw new Error("Error while fetching user infos")
    }
  },
)

export const getLikesCount = cache(
  async (id: string = USER_ID): Promise<Count> => {
    try {
      const { rows } = await sql<Count>/*SQL*/ `
      SELECT COUNT(*)::INTEGER FROM favorites WHERE user_id = ${id}
      `
      return CountSchema.parse(rows[0])
    } catch (error) {
      console.error("Error while getting the count of likes:", error)
      throw new Error("Failed to fetch the total counts of likes")
    }
  },
)

export const getTracksCount = cache(async (): Promise<Count> => {
  try {
    const { rows } = await sql<Count>/*SQL*/ `
        SELECT COUNT(*)::INTEGER FROM tracks
        `
    return CountSchema.parse(rows[0])
  } catch (error) {
    console.error("Error while getting the count of tracks", error)
    throw new Error("Failed to fetch the total counts of tracks")
  }
})

export const getPlaylist = cache(async (): Promise<TrackList> => {
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
    ORDER BY track_id ASC
`
    const validatedData = TrackListSchema.parse(rows)
    return validatedData
  } catch (error) {
    console.error(error)
    throw new Error("Error while fetching tracklist")
  }
})

/**
 * POST - Next Actions
 * They are used to mutate the database
 * They are not cached
 */

export const deleteFromLikes = async (
  trackId: string,
): Promise<{ success: boolean }> => {
  const validatedId = z.string().min(1).parse(trackId)

  const result = await sql/*SQL*/ `
    DELETE FROM favorites
    WHERE user_id = ${USER_ID} and track_id = ${validatedId}
  `

  if (result.rowCount === 0) {
    throw new Error("No favorite track found to delete")
  }

  revalidatePath("/likes")
  return { success: true }
}

export const addToLikes = async (
  trackId: string,
): Promise<{ success: boolean }> => {
  const validatedId = z.string().min(1).parse(trackId)

  const result = await sql/*sql*/ `
  INSERT INTO favorites (user_id, track_id)
  VALUES (${USER_ID}, ${validatedId})`

  if (result.rowCount === 0) {
    throw new Error("Failed to add to favorites")
  }
  revalidatePath("/likes")

  return { success: true }
}
