import TrackCard from "@/app/(main)/_components/track-card"
import PlaylistProvider from "@/context/playlist-context"
import { getPlaylist } from "@/lib/db/actions"
import type { TrackList } from "@/lib/types/definitions"
import { getTracks } from "../actions"

interface Props {
  currentPage: number
}

export default async function TrackList({ currentPage }: Props) {
  const tracks: TrackList[] = await getTracks(currentPage)
  const playlist: TrackList[] = await getPlaylist()

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
