import CardPlayControl from "@/app/_components/card-play-control"
import TrackArtistBadge from "@/components/ui/track-artist-badge"

interface Props {
  trackName: string
  artistName: string[]
  trackImage: string
  trackUrl: string | null
}
export default function TrackCard({
  trackName,
  artistName,
  trackImage,
  trackUrl,
}: Props) {
  return (
    <li className="brutal flex items-center justify-between rounded-md bg-white px-6 py-3 sm:py-3">
      <TrackArtistBadge
        trackImage={trackImage}
        trackName={trackName}
        artistName={artistName}
      />
      <CardPlayControl
        trackUrl={trackUrl}
        trackName={trackName}
        artistName={artistName}
        previewImage={trackImage}
      />
    </li>
  )
}
