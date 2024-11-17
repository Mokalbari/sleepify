export type TrackList = {
  track_id: string
  track_name: string
  music_url: string | null
  track_duration: number
  track_image: string
  artist_id: string
  artist_name: string[]
}

export type UserInfo = {
  id: string
  firstname: string
  lastname: string
  avatar: string
}
