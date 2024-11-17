import CardPlayControl from "@/app/(main)/_components/card-play-control"
import TrackArtistBadge from "@/components/ui/track-artist-badge"
import { TrackList } from "@/lib/types/definitions"

type Props = Omit<TrackList, "track_id">

export default function TrackCard(props: Props) {
  const { artist_name, track_image, track_name } = props
  return (
    <li className="brutal flex items-center justify-between rounded-md bg-white px-6 py-3 sm:py-3">
      <TrackArtistBadge
        track_image={track_image}
        track_name={track_name}
        artist_name={artist_name}
      />
      <CardPlayControl {...props} />
    </li>
  )
}
