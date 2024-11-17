import TrackCard from "@/app/(main)/_components/track-card"
import { getTracks } from "../actions"

interface Props {
  currentPage: number
}

export default async function TrackList({ currentPage }: Props) {
  const tracks = await getTracks(currentPage)

  return (
    <section className="mt-10 flex flex-col gap-4 sm:mt-24 lg:mt-32">
      <ul className="flex flex-col gap-4">
        {tracks.map((track) => (
          <TrackCard
            key={track.track_id}
            trackName={track.track_name}
            artistName={track.artist_name}
            trackImage={track.track_image}
            trackUrl={track.music_url}
          />
        ))}
      </ul>
    </section>
  )
}
