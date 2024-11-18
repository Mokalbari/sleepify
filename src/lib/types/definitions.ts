export type TrackList = {
  track_id: string
  track_name: string
  music_url: string | null
  track_duration: number
  track_image: string
  artist_id: string
  artist_name: string[]
  is_favorite: boolean
}

export type UserInfo = {
  id: string
  firstname: string
  lastname: string
  avatar: string
}

export type LikedSongs = {
  track_id: string
  track_name: string
  duration_ms: number
  artists: string[]
  image_url: string
}

export type Count = {
  count: number
}

export type Avatar = {
  avatar: string
}
