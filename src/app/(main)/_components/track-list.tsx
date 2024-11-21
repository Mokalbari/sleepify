import TrackCard from "@/app/(main)/_components/track-card"
import PlaylistProvider from "@/context/playlist/playlist-provider"
import { getPlaylist } from "@/server/actions"
import { getTracks } from "../actions"

type Props = {
  currentPage: number
}

export default async function TrackList({ currentPage }: Props) {
  const [tracks, playlist] = await Promise.all([
    getTracks(currentPage),
    getPlaylist(),
  ])

  return (
    <PlaylistProvider initialPlaylist={playlist}>
      <section className="mt-10 flex flex-col gap-4 sm:mt-24 lg:mt-32">
        <ul className="flex flex-col gap-4">
          {tracks.map((track) => (
            <TrackCard key={track.track_id} {...track} />
          ))}
        </ul>
      </section>
    </PlaylistProvider>
  )
}
