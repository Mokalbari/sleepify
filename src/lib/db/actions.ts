"use server"

import { UserInfo } from "@/lib/types/definitions"
import { sql } from "@vercel/postgres"

const USER_ID = "410544b2-4001-4271-9855-fec4b6a6442a"

// GET
export const getUserInfo = async (id: string = USER_ID) => {
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
}
