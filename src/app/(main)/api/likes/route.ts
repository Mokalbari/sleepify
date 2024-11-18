import { sql } from "@vercel/postgres"
import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"

const USER_ID = "410544b2-4001-4271-9855-fec4b6a6442a"

export async function DELETE(req: Request) {
  try {
    const { track_id } = await req.json()

    if (!track_id) {
      return NextResponse.json(
        {
          success: false,
          error: "A track ID must be provided to handle this request",
        },
        { status: 400 },
      )
    }

    const result = await sql/*SQL*/ `
  DELETE FROM favorites
  WHERE user_id = ${USER_ID} and track_id = ${track_id}
  `
    if (result.rowCount === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "There was no favorite track to delete matching theses ID",
        },
        { status: 404 },
      )
    }

    revalidatePath("/likes")
    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    let message = "Unknown Error"
    if (error instanceof Error) message = error.message
    else message = String(error)
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 },
    )
  }
}

export async function POST(req: Request) {
  try {
    const { track_id } = await req.json()

    if (!track_id) {
      return NextResponse.json(
        {
          success: false,
          error: "The track id is required to create a new favorite track",
        },
        { status: 400 },
      )
    }

    const { rows } = await sql/*sql*/ `
    SELECT COUNT(*)::INTEGER 
    FROM favorites
    WHERE user_id = ${USER_ID} AND track_id = ${track_id}`

    const isAlreadyFavorite = rows[0]?.count > 0

    if (isAlreadyFavorite) {
      return NextResponse.json(
        { success: false, message: "This track is already liked" },
        { status: 400 },
      )
    }

    const result = await sql/*sql*/ `
    INSERT INTO favorites (user_id, track_id)
    VALUES (${USER_ID}, ${track_id})
    RETURNING *
    `
    revalidatePath("/")
    revalidatePath("/likes")
    return NextResponse.json(
      {
        success: true,
        data: result.rows[0],
      },
      { status: 201 },
    )
  } catch (error) {
    let message = "Unknown Error"
    if (error instanceof Error) message = error.message
    else message = String(error)
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 },
    )
  }
}
