import { z } from "zod"

// Schema Validation with Zod
export const TrackSchema = z.object({
  track_id: z.string(),
  track_name: z.string(),
  music_url: z.string().url().nullable(),
  track_duration: z.number(),
  track_image: z.string().url().nullable(),
  artist_name: z.array(z.string()),
  is_favorite: z.boolean(),
})

export const TrackListSchema = z.array(TrackSchema)

export const PaginationSchema = z.number().int().min(1).default(1)

// Schema Validation with Zod
export const LikesSchema = z.object({
  track_id: z.string(),
  track_name: z.string(),
  music_url: z.string().url().nullable(),
  duration_ms: z.number(),
  track_image: z.string().url().nullable(),
  artist_name: z.array(z.string()),
})

export const LikesListSchema = z.array(LikesSchema)

export const UserInfoSchema = z.object({
  id: z.string(),
  firstname: z.string(),
  lastname: z.string(),
  avatar: z.string().url().nullable(),
})

export const CountSchema = z.object({
  count: z.number(),
})
