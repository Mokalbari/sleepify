import { sql } from "@vercel/postgres"

const USER_ID = "410544b2-4001-4271-9855-fec4b6a6442a"

export const getUsersLikes = async () => {
  try {
    const { rows } = await sql/*SQL*/ `
        SELECT 
            t.id AS track_id,
            t.name AS track_name,
            t.duration_ms,
            STRING_AGG(a.name, ', ') AS artists
        FROM 
            favorites f
        INNER JOIN 
            tracks t ON f.track_id = t.id
        INNER JOIN 
            track_artists ta ON t.id = ta.track_id
        INNER JOIN 
            artists a ON ta.artist_id = a.id
        WHERE 
            f.user_id = ${USER_ID} 
        GROUP BY 
            t.id, t.name, t.duration_ms
        ORDER BY 
            t.name
        `
    return rows
  } catch (error) {
    console.error("Error while getting users' liked songs: ", error)
    throw new Error("Failed to fetch users liked songs")
  }
}
