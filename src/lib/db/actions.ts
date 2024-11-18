"use server"

import { Count, UserInfo } from "@/lib/types/definitions"
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
